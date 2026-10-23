import { createClient } from "@supabase/supabase-js";
import { projects as staticProjects, type Project } from "@/data/projects";

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  short_desc: string;
  description: string;
  problem: string;
  solution: string;
  results: string[];
  technologies: string[];
  live_url: string | null;
  images: { src: string; alt: string; caption: string }[];
  cover_index: number;
  gradient_from: string;
  gradient_to: string;
  published: boolean;
  sort_order: number;
};

export function rowToProject(r: ProjectRow): Project {
  const cover = r.images[r.cover_index] ?? r.images[0];
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    tags: r.tags,
    shortDesc: r.short_desc,
    description: r.description,
    problem: r.problem,
    solution: r.solution,
    results: r.results,
    technologies: r.technologies,
    gradientFrom: r.gradient_from,
    gradientTo: r.gradient_to,
    featured: false,
    liveUrl: r.live_url ?? undefined,
    image: cover?.src,
    gallery: r.images,
  };
}

// Cookie-less anon client: RLS only exposes published rows, and keeping
// cookies out lets the portfolio pages stay statically rendered.
function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

/**
 * Published portfolio projects. Falls back to the built-in list until the
 * database has been set up and populated from the admin panel.
 */
export async function getProjects(): Promise<Project[]> {
  const supabase = publicClient();
  if (!supabase) return staticProjects;
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[portfolio] falling back to static projects:", error.message);
    return staticProjects;
  }
  if (!data?.length) return staticProjects;
  return (data as ProjectRow[]).map(rowToProject);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}
