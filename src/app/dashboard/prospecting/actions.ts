"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/access";
import { leadsDb } from "@/lib/leads";
import { classifyProspect, aiConfigured } from "@/lib/prospects/ai";
import { loadSettings, apifySpendThisMonth, tick } from "@/lib/prospects/engine";
import { PLATFORMS, AUTO_SOURCES, mergeSettings, pacificDay, platformFromUrl, type Platform, type Prospect, type ProspectSettings } from "@/lib/prospects/types";

// Server Functions are reachable by direct POST, so every one re-checks the user.
async function requireTeam() {
  const user = await currentUser();
  if (!user || (user.role !== "dev" && user.role !== "sales")) throw new Error("Unauthorized");
  const db = leadsDb();
  if (!db) throw new Error("Supabase service role is not configured");
  return { db, user };
}

async function requireDevRole() {
  const ctx = await requireTeam();
  if (ctx.user.role !== "dev") throw new Error("Unauthorized");
  return ctx;
}

const clean = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);

export type FeedView = "new" | "followup" | "sent" | "replied" | "skipped";

export type FeedQuery = { view: FeedView; platform: Platform | "all"; maxAgeHours: number; minScore: number };

export type FeedStats = {
  todayFound: number;
  sentToday: Partial<Record<Platform, number>>;
  caps: Partial<Record<Platform, number>>;
  repliedToday: number;
  skippedToday: number;
  followUpsDue: number;
  waitingForAi: number;
  apifySpend: number;
  apifyBudget: number;
  lastRuns: { source: string; created_at: string; status: string; kept: number; error: string | null }[];
};

const startOfPacificDayIso = () => {
  // Midnight Pacific expressed in UTC: take today's PT date and its UTC offset.
  const now = new Date();
  const pt = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const offsetMs = now.getTime() - pt.getTime();
  const midnightPt = new Date(pt.getFullYear(), pt.getMonth(), pt.getDate()).getTime();
  return new Date(midnightPt + offsetMs).toISOString();
};

export async function listProspects(q: FeedQuery): Promise<{ items: Prospect[]; stats: FeedStats }> {
  const { db } = await requireTeam();
  const s = await loadSettings(db);
  const today = pacificDay();
  const dayStart = startOfPacificDayIso();

  let query = db.from("prospects").select("*").limit(150);
  if (q.platform !== "all" && PLATFORMS.includes(q.platform)) query = query.eq("platform", q.platform);
  if (q.view === "new") {
    query = query.eq("status", "new").gte("score", Math.max(0, q.minScore || 0));
    if (q.maxAgeHours > 0) query = query.gte("created_at", new Date(Date.now() - q.maxAgeHours * 3600000).toISOString());
    query = query.order("created_at", { ascending: false });
  } else if (q.view === "followup") {
    query = query.eq("status", "sent").lte("follow_up_at", today).order("follow_up_at", { ascending: true });
  } else if (q.view === "sent") {
    query = query.eq("status", "sent").order("sent_at", { ascending: false });
  } else if (q.view === "replied") {
    query = query.eq("status", "replied").order("replied_at", { ascending: false });
  } else {
    query = query.in("status", ["skipped", "expired", "lost"]).order("updated_at", { ascending: false });
  }
  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const [found, sent, replied, skipped, due, waiting, runs, spend] = await Promise.all([
    db.from("prospects").select("id", { count: "exact", head: true }).gte("created_at", dayStart).not("status", "in", "(pending_ai,filtered)"),
    db.from("prospects").select("platform").gte("sent_at", dayStart),
    db.from("prospects").select("id", { count: "exact", head: true }).gte("replied_at", dayStart),
    db.from("prospects").select("id", { count: "exact", head: true }).eq("status", "skipped").gte("updated_at", dayStart),
    db.from("prospects").select("id", { count: "exact", head: true }).eq("status", "sent").lte("follow_up_at", today),
    db.from("prospects").select("id", { count: "exact", head: true }).eq("status", "pending_ai"),
    db.from("prospect_runs").select("source, created_at, status, kept, error").order("created_at", { ascending: false }).limit(20),
    apifySpendThisMonth(db),
  ]);

  const sentToday: Partial<Record<Platform, number>> = {};
  for (const r of sent.data ?? []) sentToday[r.platform as Platform] = (sentToday[r.platform as Platform] ?? 0) + 1;
  const latest = new Map<string, FeedStats["lastRuns"][number]>();
  for (const r of runs.data ?? []) if (!latest.has(r.source)) latest.set(r.source, r);

  return {
    items: (data as Prospect[]) ?? [],
    stats: {
      todayFound: found.count ?? 0,
      sentToday,
      caps: s.dailyCaps,
      repliedToday: replied.count ?? 0,
      skippedToday: skipped.count ?? 0,
      followUpsDue: due.count ?? 0,
      waitingForAi: waiting.count ?? 0,
      apifySpend: spend,
      apifyBudget: s.monthlyBudgetUsd,
      lastRuns: AUTO_SOURCES.map((src) => latest.get(src)).filter((r): r is FeedStats["lastRuns"][number] => Boolean(r)),
    },
  };
}

async function getProspect(db: NonNullable<ReturnType<typeof leadsDb>>, id: string) {
  const { data, error } = await db.from("prospects").select("*").eq("id", id).single<Prospect>();
  if (error || !data) throw new Error("Post not found");
  return data;
}

const addDays = (days: number) => pacificDay(new Date(Date.now() + days * 86400000));

export async function markSent(id: string, finalText: string | null): Promise<{ error?: string }> {
  const { db, user } = await requireTeam();
  const p = await getProspect(db, id);
  const s = await loadSettings(db);
  const cap = s.dailyCaps[p.platform];
  if (cap) {
    const { count } = await db.from("prospects").select("id", { count: "exact", head: true }).eq("platform", p.platform).gte("sent_at", startOfPacificDayIso());
    if ((count ?? 0) >= cap) return { error: `Daily limit reached for this platform (${cap}). Keeps the account safe; try again tomorrow.` };
  }
  const { error } = await db
    .from("prospects")
    .update({ status: "sent", sent_at: new Date().toISOString(), sent_by: user.email, follow_up_at: addDays(s.followUpDays), draft: clean(finalText, 2000) ?? p.draft })
    .eq("id", id);
  return error ? { error: error.message } : {};
}

export async function markFollowedUp(id: string): Promise<{ error?: string }> {
  const { db } = await requireTeam();
  const s = await loadSettings(db);
  const { error } = await db.from("prospects").update({ followed_up_at: new Date().toISOString(), follow_up_at: addDays(s.followUpDays) }).eq("id", id).eq("status", "sent");
  return error ? { error: error.message } : {};
}

// A reply means a real conversation: copy it into the leads pipeline for Abhi.
export async function markReplied(id: string, note: string | null): Promise<{ error?: string }> {
  const { db, user } = await requireTeam();
  const p = await getProspect(db, id);
  let leadId = p.lead_id;
  if (!leadId) {
    const { data, error } = await db
      .from("leads")
      .insert({
        source: "social",
        status: "replied",
        name: clean(p.author, 120),
        website: null,
        service: clean(p.ai?.need, 120),
        budget: clean(p.ai?.budget, 60),
        message: clean([p.title, p.body].filter(Boolean).join("\n\n"), 5000),
        notes: clean([`${p.platform} post: ${p.url}`, p.author_url ? `Profile: ${p.author_url}` : null, `Replied (marked by ${user.email})`, note].filter(Boolean).join("\n"), 5000),
        next_follow_up: pacificDay(),
        meta: { prospect_id: p.id, platform: p.platform, url: p.url, author_url: p.author_url },
      })
      .select("id")
      .single();
    if (error) return { error: error.message };
    leadId = data.id;
  }
  const { error } = await db
    .from("prospects")
    .update({ status: "replied", replied_at: new Date().toISOString(), lead_id: leadId, notes: clean(note, 2000) ?? p.notes })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/dashboard/dev/leads");
  return {};
}

export async function setProspectStatus(id: string, status: "skipped" | "new" | "lost"): Promise<{ error?: string }> {
  const { db } = await requireTeam();
  const { error } = await db.from("prospects").update({ status }).eq("id", id);
  return error ? { error: error.message } : {};
}

export async function saveDraft(id: string, draft: string): Promise<{ error?: string }> {
  const { db } = await requireTeam();
  const { error } = await db.from("prospects").update({ draft: clean(draft, 2000) }).eq("id", id);
  return error ? { error: error.message } : {};
}

export async function redraft(id: string): Promise<{ draft?: string | null; error?: string }> {
  const { db } = await requireTeam();
  if (!aiConfigured()) return { error: "NVIDIA_API_KEY is not set in Vercel yet." };
  const p = await getProspect(db, id);
  const s = await loadSettings(db);
  try {
    const c = await classifyProspect(p, s, 40000);
    await db.from("prospects").update({ ai: c.ai, score: c.score, draft: c.draft ?? p.draft }).eq("id", id);
    return { draft: c.draft ?? p.draft };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "AI request failed" };
  }
}

export async function addManualProspect(formData: FormData): Promise<{ error?: string; id?: string }> {
  const { db, user } = await requireTeam();
  const url = clean(formData.get("url"), 1000);
  const body = clean(formData.get("body"), 8000);
  if (!url || !/^https?:\/\//i.test(url)) return { error: "Paste the full post link (starting with https://)." };
  if (!body) return { error: "Paste the post text so the AI can draft a reply." };
  const chosen = clean(formData.get("platform"), 20) as Platform | null;
  const platform = chosen && PLATFORMS.includes(chosen) ? chosen : platformFromUrl(url);

  const { data, error } = await db
    .from("prospects")
    .upsert(
      {
        platform,
        origin: "manual",
        url,
        author: clean(formData.get("author"), 160),
        author_url: clean(formData.get("author_url"), 1000),
        title: clean(formData.get("title"), 300),
        body,
        community: clean(formData.get("community"), 120),
        posted_at: new Date().toISOString(),
        notes: clean([clean(formData.get("notes"), 2000), `Added by ${user.email}`].filter(Boolean).join("\n"), 2000),
        status: aiConfigured() ? "pending_ai" : "new",
      },
      { onConflict: "url", ignoreDuplicates: true },
    )
    .select("id");
  if (error) return { error: error.message };
  if (!data?.length) return { error: "This post is already in the feed." };
  return { id: data[0].id };
}

// ---------- Dev only ----------

const lines = (v: FormDataEntryValue | null) => String(v ?? "").split("\n").map((x) => x.trim()).filter(Boolean);
const num = (v: FormDataEntryValue | null, fallback: number, min: number, max: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;
};

export async function saveProspectSettings(formData: FormData): Promise<{ error?: string }> {
  const { db } = await requireDevRole();
  const cur = await loadSettings(db);
  const on = (k: string) => formData.get(k) === "on";

  const next: ProspectSettings = mergeSettings({
    ...cur,
    reddit: { ...cur.reddit, enabled: on("reddit_enabled"), everyMin: num(formData.get("reddit_every"), 3, 2, 1440), subreddits: lines(formData.get("reddit_subs")), search: String(formData.get("reddit_search") ?? "").trim() },
    hn: { ...cur.hn, enabled: on("hn_enabled"), everyMin: num(formData.get("hn_every"), 15, 5, 1440) },
    bluesky: { ...cur.bluesky, enabled: on("bsky_enabled"), everyMin: num(formData.get("bsky_every"), 10, 3, 1440), queries: lines(formData.get("bsky_queries")) },
    jobs: { ...cur.jobs, enabled: on("jobs_enabled"), everyMin: num(formData.get("jobs_every"), 60, 15, 1440) },
    x: { ...cur.x, enabled: on("x_enabled"), everyMin: num(formData.get("x_every"), 120, 15, 1440), query: String(formData.get("x_query") ?? "").trim() || cur.x.query, maxItems: num(formData.get("x_max"), 50, 10, 500) },
    linkedin: { ...cur.linkedin, enabled: on("li_enabled"), everyMin: num(formData.get("li_every"), 180, 30, 1440), queries: lines(formData.get("li_queries")), maxPosts: num(formData.get("li_max"), 10, 5, 100) },
    keywords: lines(formData.get("keywords")),
    exclude: lines(formData.get("exclude")),
    monthlyBudgetUsd: num(formData.get("budget"), 15, 0, 1000),
    followUpDays: num(formData.get("follow_up_days"), 3, 1, 30),
    // Only platforms shown in the form are posted; 0 means no limit (kept as 0 so the default doesn't come back).
    dailyCaps: { ...cur.dailyCaps, ...Object.fromEntries(PLATFORMS.filter((p) => formData.has(`cap_${p}`)).map((p) => [p, num(formData.get(`cap_${p}`), 0, 0, 500)])) },
    projects: lines(formData.get("projects")),
  });
  if (!next.keywords.length) return { error: "Keep at least one keyword, or nothing will be collected." };

  const { error } = await db.from("prospect_settings").upsert({ id: 1, data: next, updated_at: new Date().toISOString() });
  if (error) return { error: error.message };
  revalidatePath("/dashboard/dev/prospecting/settings");
  return {};
}

// Runs one scheduler tick now (for testing setup without waiting for the cron).
export async function runProspectTickNow(): Promise<{ summary?: string; error?: string }> {
  const { db } = await requireDevRole();
  try {
    const r = await tick(db, Date.now() + 45000);
    const parts = r.runs.map((x) => `${x.source}: ${x.result}`);
    return { summary: [...(parts.length ? parts : ["No source was due (or keys are missing)."]), `AI screened: ${r.classified}`].join(" · ") };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
