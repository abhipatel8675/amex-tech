import type { SupabaseClient } from "@supabase/supabase-js";
import { mergeSettings, pacificDay, AUTO_SOURCES, type AutoSource, type Prospect, type ProspectSettings, type ScheduledSource } from "./types";
import { classifyProspect, aiConfigured } from "./ai";
import { fetchReddit, fetchHn, redditConfigured, apifyConfigured, apifyInput, startApifyRun, collectApifyRun, normalizeApifyItem, type RawPost } from "./sources";

export async function loadSettings(db: SupabaseClient): Promise<ProspectSettings> {
  const { data } = await db.from("prospect_settings").select("data").eq("id", 1).maybeSingle();
  return mergeSettings(data?.data);
}

const lower = (p: RawPost) => `${p.title ?? ""}\n${p.body ?? ""}`.toLowerCase();

// Cheap keyword gate before anything is stored or sent to the AI.
export function passesKeywords(p: RawPost, s: ProspectSettings): boolean {
  const text = lower(p);
  if (s.exclude.some((k) => k && text.includes(k.toLowerCase()))) return false;
  return s.keywords.some((k) => k && text.includes(k.toLowerCase()));
}

// Inserts new posts, skipping URLs already stored. Returns how many were new.
export async function storePosts(db: SupabaseClient, posts: RawPost[], s: ProspectSettings, maxAgeHours = 48): Promise<number> {
  const cutoff = Date.now() - maxAgeHours * 3600000;
  const seen = new Set<string>();
  const keep = posts.filter((p) => {
    if (seen.has(p.url)) return false;
    seen.add(p.url);
    if (p.posted_at && new Date(p.posted_at).getTime() < cutoff) return false;
    return passesKeywords(p, s);
  });
  if (!keep.length) return 0;
  const { data, error } = await db
    .from("prospects")
    .upsert(keep.map((p) => ({ ...p, origin: "auto", status: "pending_ai" })), { onConflict: "url", ignoreDuplicates: true })
    .select("id");
  if (error) throw new Error(error.message);
  return data?.length ?? 0;
}

// ---------- Scheduling ----------

function hourAndWeekdayPT(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", hourCycle: "h23", weekday: "short" }).formatToParts(now);
  const hour = Number(parts.find((x) => x.type === "hour")?.value ?? 0);
  const weekday = parts.find((x) => x.type === "weekday")?.value ?? "Mon";
  return { hour, weekend: weekday === "Sat" || weekday === "Sun" };
}

function inWindow(cfg: ScheduledSource, now: Date) {
  const { hour, weekend } = hourAndWeekdayPT(now);
  if (cfg.weekdaysOnly && weekend) return false;
  return hour >= cfg.hoursPT[0] && hour < cfg.hoursPT[1];
}

async function lastRunAt(db: SupabaseClient, source: AutoSource): Promise<number> {
  const { data } = await db.from("prospect_runs").select("created_at").eq("source", source).order("created_at", { ascending: false }).limit(1).maybeSingle();
  return data ? new Date(data.created_at).getTime() : 0;
}

export async function apifySpendThisMonth(db: SupabaseClient): Promise<number> {
  const start = new Date();
  start.setUTCDate(1);
  start.setUTCHours(0, 0, 0, 0);
  const { data } = await db.from("prospect_runs").select("cost_usd").in("source", ["x", "linkedin"]).gte("created_at", start.toISOString());
  return (data ?? []).reduce((n, r) => n + Number(r.cost_usd || 0), 0);
}

type RunLog = { source: AutoSource; result: string };

async function logRun(db: SupabaseClient, row: Record<string, unknown>) {
  const { error } = await db.from("prospect_runs").insert(row);
  if (error) console.error("prospect_runs:", error.message);
}

// One scheduler tick (called every few minutes by the Cloudflare Worker cron).
export async function tick(db: SupabaseClient, deadline: number): Promise<{ runs: RunLog[]; classified: number; housekeeping: Record<string, number> }> {
  const s = await loadSettings(db);
  const now = new Date();
  const runs: RunLog[] = [];

  // 1) Collect Apify runs started on earlier ticks.
  const { data: running } = await db.from("prospect_runs").select("*").eq("status", "running").limit(10);
  for (const r of running ?? []) {
    const source = r.source as "x" | "linkedin";
    try {
      const state = await collectApifyRun(r.apify_run_id);
      if (state.status === "running") {
        // Give up on runs stuck for over an hour.
        if (Date.now() - new Date(r.created_at).getTime() > 3600000) await db.from("prospect_runs").update({ status: "failed", error: "Timed out waiting for Apify" }).eq("id", r.id);
        continue;
      }
      const posts = state.items.map((i) => normalizeApifyItem(source, i)).filter((p): p is RawPost => p !== null);
      const kept = state.status === "done" ? await storePosts(db, posts, s) : 0;
      const cost = Math.max(state.usageUsd, state.items.length * s[source].pricePerItem);
      await db.from("prospect_runs").update({ status: state.status, found: state.items.length, kept, cost_usd: cost, error: state.error ?? null }).eq("id", r.id);
      runs.push({ source, result: `collected ${state.items.length} → ${kept} new` });
    } catch (err) {
      await db.from("prospect_runs").update({ status: "failed", error: err instanceof Error ? err.message : String(err) }).eq("id", r.id);
    }
  }

  // 2) Start whichever sources are due.
  const spend = await apifySpendThisMonth(db);
  for (const source of AUTO_SOURCES) {
    const cfg = s[source];
    if (!cfg.enabled || !inWindow(cfg, now)) continue;
    const last = await lastRunAt(db, source);
    // Small grace so a 3-minute cron doesn't skip a 3-minute interval.
    if (Date.now() - last < cfg.everyMin * 60000 - 20000) continue;

    try {
      if (source === "reddit") {
        if (!redditConfigured()) continue;
        const posts = await fetchReddit(s.reddit);
        const kept = await storePosts(db, posts, s);
        await logRun(db, { source, found: posts.length, kept });
        runs.push({ source, result: `${posts.length} → ${kept} new` });
      } else if (source === "hn") {
        const since = Math.floor((last || Date.now() - 86400000) / 1000) - 60;
        const posts = await fetchHn(since);
        const kept = await storePosts(db, posts, s, 24 * 31);
        await logRun(db, { source, found: posts.length, kept });
        runs.push({ source, result: `${posts.length} → ${kept} new` });
      } else {
        if (!apifyConfigured()) continue;
        if (spend >= s.monthlyBudgetUsd) {
          runs.push({ source, result: `paused: $${spend.toFixed(2)} of $${s.monthlyBudgetUsd} budget used` });
          continue;
        }
        // Only one Apify run per source at a time.
        if ((running ?? []).some((r) => r.source === source && r.status === "running")) continue;
        const runId = await startApifyRun(s[source].actor, apifyInput(source, s));
        await logRun(db, { source, status: "running", apify_run_id: runId });
        runs.push({ source, result: "started" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await logRun(db, { source, status: "failed", error: msg.slice(0, 500) });
      runs.push({ source, result: `error: ${msg}` });
    }
  }

  // 3) AI screening for whatever is waiting, until the time budget runs out.
  const classified = await classifyPending(db, s, deadline);

  // 4) Expire stale posts and close leads that never answered a follow-up.
  const housekeeping = await housekeep(db);

  return { runs, classified, housekeeping };
}

export async function classifyPending(db: SupabaseClient, s: ProspectSettings, deadline: number): Promise<number> {
  if (!aiConfigured()) return 0;
  let done = 0;
  while (Date.now() < deadline - 8000) {
    const { data } = await db
      .from("prospects")
      .select("*")
      .eq("status", "pending_ai")
      .lt("ai_attempts", 3)
      .order("created_at", { ascending: false })
      .limit(3);
    const batch = (data as Prospect[]) ?? [];
    if (!batch.length) break;
    const timeout = Math.max(5000, Math.min(25000, deadline - Date.now() - 3000));
    await Promise.all(
      batch.map(async (p) => {
        try {
          const c = await classifyProspect(p, s, timeout);
          // Hand-added posts always reach the feed; the AI only drafts for them.
          const status = p.origin === "manual" || c.ai.is_buyer ? "new" : "filtered";
          await db.from("prospects").update({ ai: c.ai, score: c.score, draft: c.draft, status, ai_attempts: p.ai_attempts + 1 }).eq("id", p.id);
          done++;
        } catch (err) {
          const attempts = p.ai_attempts + 1;
          const msg = err instanceof Error ? err.message : String(err);
          // After 3 failures, show it anyway (unscored) rather than lose it.
          await db
            .from("prospects")
            .update({ ai_attempts: attempts, ai: { ...p.ai, error: msg }, ...(attempts >= 3 ? { status: "new" } : {}) })
            .eq("id", p.id);
        }
      }),
    );
  }
  return done;
}

async function housekeep(db: SupabaseClient) {
  const today = pacificDay();
  const threeDaysAgo = new Date(Date.now() - 3 * 86400000).toISOString();
  // Unanswered posts go cold fast.
  const expired = await db.from("prospects").update({ status: "expired" }).eq("status", "new").lt("created_at", threeDaysAgo).select("id");
  // Sent + already followed up once + follow-up date passed without a reply → lost.
  const lost = await db
    .from("prospects")
    .update({ status: "lost" })
    .eq("status", "sent")
    .not("followed_up_at", "is", null)
    .lt("follow_up_at", today)
    .select("id");
  // Old filtered rows are only kept to stop duplicates; trim after 30 days.
  await db.from("prospects").delete().eq("status", "filtered").lt("created_at", new Date(Date.now() - 30 * 86400000).toISOString());
  return { expired: expired.data?.length ?? 0, lost: lost.data?.length ?? 0 };
}
