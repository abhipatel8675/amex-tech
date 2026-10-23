"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { projects as staticProjects } from "@/data/projects";
import { IMAGE_TYPES, LIMITS, validateProject, type ProjectInput } from "@/lib/portfolio/limits";

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

const BUCKET = "portfolio";

async function requireAdmin() {
  const admin = process.env.DEVELOPER_EMAIL?.toLowerCase();
  if (!admin) throw new Error("DEVELOPER_EMAIL is not configured.");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email || user.email.toLowerCase() !== admin) throw new Error("Not authorised.");
}

// Plain service-role client with no user cookies, so the user's session
// can never replace the service key on these requests.
function service() {
  return createServiceClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function publicPrefix() {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`;
}

function isAllowedImage(src: string) {
  return src.startsWith(publicPrefix()) || /^\/images\/portfolio\/[\w./-]+$/.test(src);
}

function revalidatePortfolio() {
  revalidatePath("/portfolio");
  revalidatePath("/portfolio/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

async function guard<T>(fn: () => Promise<Result<T>>): Promise<Result<T>> {
  try {
    await requireAdmin();
    return await fn();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong." };
  }
}

export async function createUploadUrl(
  type: string,
  size: number,
): Promise<Result<{ path: string; token: string; publicUrl: string }>> {
  return guard<{ path: string; token: string; publicUrl: string }>(async () => {
    const ext = IMAGE_TYPES[type];
    if (!ext) return { ok: false, error: "Only JPG, PNG, WebP or AVIF images are allowed." };
    if (!Number.isFinite(size) || size <= 0 || size > LIMITS.imageBytes)
      return { ok: false, error: "Images must be 8 MB or smaller." };

    const path = `${new Date().getFullYear()}/${randomUUID()}.${ext}`;
    const { data, error } = await service().storage.from(BUCKET).createSignedUploadUrl(path);
    if (error || !data) return { ok: false, error: error?.message ?? "Could not prepare upload." };
    return { ok: true, path: data.path, token: data.token, publicUrl: publicPrefix() + data.path };
  });
}

function clean(list: string[]) {
  return [...new Set(list.map((s) => s.trim()).filter(Boolean))];
}

export async function saveProject(input: ProjectInput): Promise<Result<{ id: string }>> {
  return guard<{ id: string }>(async () => {
    const p: ProjectInput = {
      ...input,
      title: input.title.trim(),
      slug: input.slug.trim(),
      tags: clean(input.tags),
      technologies: clean(input.technologies),
      results: clean(input.results),
      shortDesc: input.shortDesc.trim(),
      description: input.description.trim(),
      problem: input.problem.trim(),
      liveUrl: input.liveUrl.trim(),
      images: input.images.map((i) => ({
        src: i.src,
        alt: (i.alt || input.title).trim().slice(0, 200),
        caption: (i.caption ?? "").trim().slice(0, 200),
      })),
    };
    const errors = validateProject(p);
    if (p.images.some((i) => !isAllowedImage(i.src))) errors.push("One of the images has an invalid source.");
    if (errors.length) return { ok: false, error: errors.join(" ") };

    const row = {
      slug: p.slug,
      title: p.title,
      category: p.category,
      tags: p.tags,
      short_desc: p.shortDesc,
      description: p.description,
      problem: p.problem,
      results: p.results,
      technologies: p.technologies,
      live_url: p.liveUrl || null,
      images: p.images,
      cover_index: p.coverIndex,
      published: p.published,
      updated_at: new Date().toISOString(),
    };

    const db = service().from("portfolio_projects");
    let id = p.id;
    if (id) {
      const { error } = await db.update(row).eq("id", id);
      if (error) return { ok: false, error: friendly(error.message) };
    } else {
      // New projects go to the top of the grid.
      const { data: first } = await service()
        .from("portfolio_projects")
        .select("sort_order")
        .order("sort_order", { ascending: true })
        .limit(1)
        .maybeSingle();
      const { data, error } = await db
        .insert({ ...row, sort_order: (first?.sort_order ?? 0) - 1 })
        .select("id")
        .single();
      if (error || !data) return { ok: false, error: friendly(error?.message) };
      id = data.id as string;
    }
    revalidatePortfolio();
    return { ok: true, id: id! };
  });
}

export async function setPublished(id: string, published: boolean): Promise<Result> {
  return guard(async () => {
    const { error } = await service().from("portfolio_projects").update({ published }).eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePortfolio();
    return { ok: true };
  });
}

export async function deleteProject(id: string): Promise<Result> {
  return guard(async () => {
    const sb = service();
    const { data, error } = await sb.from("portfolio_projects").delete().eq("id", id).select("images").single();
    if (error) return { ok: false, error: error.message };
    const prefix = publicPrefix();
    const files = ((data?.images ?? []) as { src: string }[])
      .map((i) => i.src)
      .filter((s) => s.startsWith(prefix))
      .map((s) => s.slice(prefix.length));
    if (files.length) await sb.storage.from(BUCKET).remove(files);
    revalidatePortfolio();
    return { ok: true };
  });
}

/** One-time copy of the built-in projects into the database. */
export async function importStaticProjects(): Promise<Result<{ count: number }>> {
  return guard<{ count: number }>(async () => {
    const sb = service();
    const { count } = await sb.from("portfolio_projects").select("id", { count: "exact", head: true });
    if (count) return { ok: false, error: "Projects already exist in the database." };

    const rows = staticProjects.map((p, i) => {
      const images = [
        ...(p.image ? [{ src: p.image, alt: p.title, caption: "" }] : []),
        ...(p.gallery ?? [])
          .filter((g) => g.src !== p.image)
          .map((g) => ({ src: g.src, alt: g.alt, caption: g.caption })),
      ];
      return {
        slug: p.slug,
        title: p.title,
        category: p.category,
        tags: p.tags,
        short_desc: p.shortDesc,
        description: p.description,
        problem: p.problem,
        solution: p.solution,
        results: p.results,
        technologies: p.technologies,
        live_url: p.liveUrl ?? null,
        images,
        cover_index: 0,
        gradient_from: p.gradientFrom,
        gradient_to: p.gradientTo,
        published: true,
        sort_order: i,
      };
    });
    const { error } = await sb.from("portfolio_projects").insert(rows);
    if (error) return { ok: false, error: error.message };
    revalidatePortfolio();
    return { ok: true, count: rows.length };
  });
}

function friendly(msg?: string) {
  if (msg?.includes("duplicate key") && msg.includes("slug")) return "Another project already uses this URL slug.";
  return msg ?? "Could not save the project.";
}
