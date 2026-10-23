"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Check, Eye, EyeOff, ExternalLink, ImagePlus, Loader2, Plus, Star, Trash2, X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ProjectRow } from "@/lib/portfolio/data";
import { TechIcon, KNOWN_TECH } from "@/components/portfolio/TechStack";
import {
  IMAGE_TYPES, LIMITS, PORTFOLIO_CATEGORIES, countWords, slugify, validateProject, type ProjectInput,
} from "@/lib/portfolio/limits";
import {
  createUploadUrl, deleteProject, importStaticProjects, saveProject, setPublished,
} from "@/app/admin/portfolio/actions";

const EMPTY: ProjectInput = {
  title: "",
  slug: "",
  category: "Web",
  tags: [],
  technologies: [],
  shortDesc: "",
  description: "",
  problem: "",
  results: [""],
  liveUrl: "",
  images: [],
  coverIndex: 0,
  published: true,
};

function rowToInput(r: ProjectRow): ProjectInput {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    category: r.category,
    tags: r.tags,
    technologies: r.technologies,
    shortDesc: r.short_desc,
    description: r.description,
    problem: r.problem,
    results: r.results.length ? r.results : [""],
    liveUrl: r.live_url ?? "",
    images: r.images,
    coverIndex: r.cover_index,
    published: r.published,
  };
}

const field =
  "w-full rounded-xl bg-white px-4 py-2.5 text-[15px] text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition";

function Label({ children, hint }: { children: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <span className="text-sm font-medium text-slate-800">{children}</span>
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </div>
  );
}

function WordCount({ text, max }: { text: string; max: number }) {
  const n = countWords(text);
  return <span className={n > max ? "text-red-600 font-medium" : undefined}>{n} / {max} words</span>;
}

function LimitedText({
  label, value, onChange, max, rows, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; max: number; rows: number; placeholder: string }) {
  const over = countWords(value) > max;
  return (
    <label className="block">
      <Label hint={<WordCount text={value} max={max} />}>{label}</Label>
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${field} resize-y leading-relaxed ${over ? "ring-red-300 focus:ring-red-500" : ""}`}
      />
    </label>
  );
}

function Editor({ initial, onDone }: { initial: ProjectInput; onDone: () => void }) {
  const [p, setP] = useState<ProjectInput>(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));
  const [techDraft, setTechDraft] = useState("");
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const set = <K extends keyof ProjectInput>(k: K, v: ProjectInput[K]) => setP((prev) => ({ ...prev, [k]: v }));
  const problems = useMemo(() => validateProject({ ...p, results: p.results.filter((r) => r.trim()) }), [p]);

  function addTech(name: string) {
    const t = name.trim();
    if (!t || p.technologies.includes(t) || p.technologies.length >= LIMITS.technologies) return;
    set("technologies", [...p.technologies, t]);
    setTechDraft("");
  }

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setError(null);
    const room = LIMITS.images - p.images.length;
    const list = Array.from(files).slice(0, room);
    if (files.length > room) setError(`Only ${LIMITS.images} images are allowed per project.`);
    const supabase = createClient();
    setUploading((n) => n + list.length);
    for (const file of list) {
      try {
        if (!IMAGE_TYPES[file.type]) throw new Error(`${file.name}: only JPG, PNG, WebP or AVIF.`);
        if (file.size > LIMITS.imageBytes) throw new Error(`${file.name}: larger than 8 MB.`);
        const res = await createUploadUrl(file.type, file.size);
        if (!res.ok) throw new Error(res.error);
        const { error: upErr } = await supabase.storage
          .from("portfolio")
          .uploadToSignedUrl(res.path, res.token, file, { contentType: file.type });
        if (upErr) throw new Error(upErr.message);
        setP((prev) => ({ ...prev, images: [...prev.images, { src: res.publicUrl, alt: prev.title, caption: "" }] }));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed.");
      } finally {
        setUploading((n) => n - 1);
      }
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeImage(i: number) {
    setP((prev) => {
      const images = prev.images.filter((_, j) => j !== i);
      let cover = prev.coverIndex;
      if (i === cover) cover = 0;
      else if (i < cover) cover -= 1;
      return { ...prev, images, coverIndex: Math.min(cover, Math.max(images.length - 1, 0)) };
    });
  }

  function save() {
    setError(null);
    startSaving(async () => {
      const res = await saveProject({ ...p, results: p.results.filter((r) => r.trim()) });
      if (!res.ok) return setError(res.error);
      router.refresh();
      onDone();
    });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <button onClick={onDone} className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> All projects
      </button>
      <h1 className="mb-10 text-3xl font-semibold tracking-[-0.03em]">{p.id ? `Edit ${initial.title}` : "New project"}</h1>

      <div className="space-y-12">
        {/* Basics */}
        <section className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <Label hint={`${p.title.length} / ${LIMITS.titleChars}`}>Project name</Label>
            <input
              className={field}
              value={p.title}
              maxLength={LIMITS.titleChars}
              placeholder="e.g. FirmsLedger"
              onChange={(e) => {
                const title = e.target.value;
                setP((prev) => ({ ...prev, title, slug: slugTouched ? prev.slug : slugify(title) }));
              }}
            />
          </label>
          <label className="block">
            <Label>Page URL</Label>
            <div className="flex items-center rounded-xl ring-1 ring-slate-200 bg-slate-50 focus-within:ring-2 focus-within:ring-slate-900">
              <span className="pl-4 text-sm text-slate-400">/portfolio/</span>
              <input
                className="w-full bg-transparent px-1 py-2.5 text-[15px] focus:outline-none"
                value={p.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", slugify(e.target.value));
                }}
              />
            </div>
          </label>
          <label className="block">
            <Label>Category</Label>
            <select className={field} value={p.category} onChange={(e) => set("category", e.target.value)}>
              {PORTFOLIO_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <Label hint="Optional">Live link</Label>
            <input className={field} type="url" placeholder="https://" value={p.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} />
          </label>
          <label className="block">
            <Label hint={`Optional · up to ${LIMITS.tags}, comma separated`}>Tags</Label>
            <input
              className={field}
              placeholder="Fintech, Business Funding"
              defaultValue={p.tags.join(", ")}
              onChange={(e) => set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
            />
          </label>
        </section>

        {/* Images */}
        <section>
          <Label hint={`${p.images.length} / ${LIMITS.images} · JPG, PNG, WebP, AVIF · max 8 MB · 16:10 looks best`}>
            Images
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {p.images.map((img, i) => {
              const isCover = i === p.coverIndex;
              return (
                <div
                  key={img.src}
                  className={`group relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 ring-2 transition ${isCover ? "ring-slate-900" : "ring-transparent"}`}
                >
                  <Image src={img.src} alt={img.alt} fill sizes="240px" className="object-cover" />
                  <button
                    type="button"
                    onClick={() => set("coverIndex", i)}
                    className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-md transition ${
                      isCover ? "bg-slate-900 text-white" : "bg-white/85 text-slate-700 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Star className="w-3 h-3" fill={isCover ? "currentColor" : "none"} /> {isCover ? "Cover" : "Set as cover"}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    aria-label="Remove image"
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/85 text-slate-700 opacity-0 backdrop-blur-md transition hover:text-red-600 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
            {Array.from({ length: uploading }).map((_, i) => (
              <div key={`up-${i}`} className="grid aspect-[16/10] place-items-center rounded-xl bg-slate-100">
                <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
              </div>
            ))}
            {p.images.length + uploading < LIMITS.images && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="grid aspect-[16/10] place-items-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400 transition hover:border-slate-400 hover:text-slate-600"
              >
                <span className="flex flex-col items-center gap-1.5 text-sm">
                  <ImagePlus className="w-5 h-5" /> Add images
                </span>
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept={Object.keys(IMAGE_TYPES).join(",")}
            multiple
            hidden
            onChange={(e) => upload(e.target.files)}
          />
          <p className="mt-3 text-xs text-slate-400">The cover is shown on the portfolio grid and first in the slider.</p>
        </section>

        {/* Tech stack */}
        <section>
          <Label hint={`${p.technologies.length} / ${LIMITS.technologies}`}>Tech stack</Label>
          {p.technologies.length > 0 && (
            <ul className="mb-3 flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <li key={t} className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-2.5 pr-1.5 text-sm ring-1 ring-slate-200">
                  <TechIcon name={t} />
                  {t}
                  <button
                    type="button"
                    aria-label={`Remove ${t}`}
                    onClick={() => set("technologies", p.technologies.filter((x) => x !== t))}
                    className="grid h-5 w-5 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2">
            <input
              className={field}
              list="known-tech"
              placeholder="Type a technology and press Enter, e.g. Next.js"
              value={techDraft}
              onChange={(e) => setTechDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addTech(techDraft);
                }
              }}
            />
            <button type="button" onClick={() => addTech(techDraft)} className="rounded-xl px-4 text-sm font-medium ring-1 ring-slate-200 hover:bg-slate-50">
              Add
            </button>
          </div>
          <datalist id="known-tech">
            {KNOWN_TECH.filter((t) => !p.technologies.includes(t)).map((t) => <option key={t} value={t} />)}
          </datalist>
          <p className="mt-2 text-xs text-slate-400">Suggested names show their brand icon on the site; anything else gets a letter badge.</p>
        </section>

        {/* Writing */}
        <section className="space-y-6">
          <LimitedText
            label="Card description (shown on the portfolio grid)"
            value={p.shortDesc}
            onChange={(v) => set("shortDesc", v)}
            max={LIMITS.shortDescWords}
            rows={2}
            placeholder="One or two sentences on what the product is."
          />
          <LimitedText
            label="About the project"
            value={p.description}
            onChange={(v) => set("description", v)}
            max={LIMITS.descriptionWords}
            rows={4}
            placeholder="Who it's for, what it does, and what we built."
          />
          <LimitedText
            label="What we solved"
            value={p.problem}
            onChange={(v) => set("problem", v)}
            max={LIMITS.problemWords}
            rows={4}
            placeholder="The problem the client had before we stepped in."
          />
          <div>
            <Label hint={`Optional · up to ${LIMITS.results}, ${LIMITS.resultWords} words each`}>Results / fixes</Label>
            <div className="space-y-2">
              {p.results.map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  <input
                    className={`${field} ${countWords(r) > LIMITS.resultWords ? "ring-red-300" : ""}`}
                    value={r}
                    placeholder="e.g. Page load cut from 6s to 1.2s"
                    onChange={(e) => set("results", p.results.map((x, j) => (j === i ? e.target.value : x)))}
                  />
                  <button
                    type="button"
                    aria-label="Remove result"
                    onClick={() => set("results", p.results.length > 1 ? p.results.filter((_, j) => j !== i) : [""])}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {p.results.length < LIMITS.results && (
              <button type="button" onClick={() => set("results", [...p.results, ""])} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">
                <Plus className="w-4 h-4" /> Add result
              </button>
            )}
          </div>
        </section>

        <label className="flex items-center gap-3">
          <input type="checkbox" checked={p.published} onChange={(e) => set("published", e.target.checked)} className="h-4 w-4 accent-slate-900" />
          <span className="text-sm text-slate-700">Published (visible on the site)</span>
        </label>
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 -mx-6 mt-12 border-t border-slate-200 bg-white/90 px-6 py-4 backdrop-blur-md">
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        {!error && problems.length > 0 && <p className="mb-3 text-sm text-slate-500">{problems[0]}</p>}
        <div className="flex justify-end gap-3">
          <button onClick={onDone} className="rounded-full px-5 py-2.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving || uploading > 0 || problems.length > 0}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />} {p.id ? "Save changes" : "Publish project"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioAdmin({
  email, rows, setupError, staticCount,
}: { email: string; rows: ProjectRow[]; setupError: string | null; staticCount: number }) {
  const [editing, setEditing] = useState<ProjectInput | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function run(key: string, fn: () => Promise<{ ok: boolean; error?: string }>) {
    setBusy(key);
    setMessage(null);
    const res = await fn();
    setBusy(null);
    if (!res.ok) setMessage(res.error ?? "Something went wrong.");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <p className="text-sm font-medium">Amex Technology · <span className="text-slate-500">Portfolio admin</span></p>
          <div className="flex items-center gap-5 text-sm text-slate-500">
            <span className="hidden sm:inline">{email}</span>
            <a href="/portfolio" target="_blank" className="inline-flex items-center gap-1 hover:text-slate-900">
              View site <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {editing ? (
          <Editor key={editing.id ?? "new"} initial={editing} onDone={() => setEditing(null)} />
        ) : (
          <>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-[-0.03em]">Projects</h1>
                <p className="mt-1 text-sm text-slate-500">{rows.length} in the database</p>
              </div>
              <button
                onClick={() => setEditing(EMPTY)}
                disabled={Boolean(setupError)}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-40"
              >
                <Plus className="w-4 h-4" /> New project
              </button>
            </div>

            {setupError && (
              <div className="mb-8 rounded-2xl bg-amber-50 p-5 text-sm text-amber-900 ring-1 ring-amber-200">
                The portfolio table isn&rsquo;t set up yet. Run <code>supabase/migrations/20261023_portfolio_projects.sql</code> in
                the Supabase SQL editor, then reload. <span className="text-amber-700">({setupError})</span>
              </div>
            )}
            {message && <p className="mb-6 text-sm text-red-600">{message}</p>}

            {!setupError && rows.length === 0 && (
              <div className="rounded-2xl bg-slate-50 p-10 text-center ring-1 ring-slate-200">
                <p className="text-lg font-medium">No projects in the database yet</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  The site is currently showing the {staticCount} built-in projects. Import them to manage everything from here.
                </p>
                <button
                  onClick={() => run("import", importStaticProjects)}
                  disabled={busy === "import"}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
                >
                  {busy === "import" && <Loader2 className="w-4 h-4 animate-spin" />} Import {staticCount} existing projects
                </button>
              </div>
            )}

            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {rows.map((r) => {
                const cover = r.images[r.cover_index] ?? r.images[0];
                return (
                  <li key={r.id} className="flex items-center gap-5 py-4">
                    <div className="relative h-14 w-[90px] shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                      {cover && <Image src={cover.src} alt="" fill sizes="90px" className="object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{r.title}</p>
                      <p className="truncate text-sm text-slate-500">
                        {r.category} · {r.technologies.slice(0, 4).join(", ")}
                      </p>
                    </div>
                    <span className={`hidden sm:inline rounded-full px-2.5 py-1 text-xs font-medium ${r.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {r.published ? "Published" : "Hidden"}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => run(r.id, () => setPublished(r.id, !r.published))}
                        aria-label={r.published ? "Hide" : "Publish"}
                        title={r.published ? "Hide from site" : "Publish"}
                        className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      >
                        {r.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setEditing(rowToInput(r))} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${r.title}"? This also deletes its uploaded images.`)) run(r.id, () => deleteProject(r.id));
                        }}
                        aria-label="Delete"
                        className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                      >
                        {busy === r.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
