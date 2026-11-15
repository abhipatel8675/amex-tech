import type { Platform, ProspectSettings } from "./types";

// A post as fetched, before filtering and AI.
export type RawPost = {
  platform: Platform;
  url: string;
  external_id: string | null;
  author: string | null;
  author_url: string | null;
  title: string | null;
  body: string | null;
  posted_at: string | null;
  community: string | null;
};

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
const UA = process.env.REDDIT_USER_AGENT || "web:amextechnology-prospects:v1.0";

// ---------- Reddit (official API, app-only OAuth; free) ----------

export const redditConfigured = () => Boolean(process.env.REDDIT_CLIENT_ID && process.env.REDDIT_CLIENT_SECRET);

async function redditToken(): Promise<string> {
  const basic = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded", "User-Agent": UA },
    body: "grant_type=client_credentials",
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Reddit auth ${res.status}`);
  const token = (await res.json()).access_token;
  if (!token) throw new Error("Reddit auth returned no token");
  return token;
}

type RedditChild = { data: Record<string, unknown> };

function redditPost(d: Record<string, unknown>): RawPost | null {
  const permalink = str(d.permalink);
  if (!permalink || d.stickied === true) return null;
  const author = str(d.author);
  return {
    platform: "reddit",
    url: `https://www.reddit.com${permalink}`,
    external_id: str(d.name),
    author: author ? `u/${author}` : null,
    author_url: author && author !== "[deleted]" ? `https://www.reddit.com/user/${author}` : null,
    title: [str(d.link_flair_text) ? `[${d.link_flair_text}]` : null, str(d.title)].filter(Boolean).join(" ") || null,
    body: str(d.selftext),
    posted_at: typeof d.created_utc === "number" ? new Date(d.created_utc * 1000).toISOString() : null,
    community: str(d.subreddit) ? `r/${d.subreddit}` : null,
  };
}

export async function fetchReddit(s: ProspectSettings["reddit"]): Promise<RawPost[]> {
  const token = await redditToken();
  const headers = { Authorization: `Bearer ${token}`, "User-Agent": UA };
  const get = async (path: string) => {
    const res = await fetch(`https://oauth.reddit.com${path}`, { headers, signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`Reddit ${res.status} on ${path.split("?")[0]}`);
    return ((await res.json()).data?.children ?? []) as RedditChild[];
  };

  const subs = s.subreddits.map((x) => x.replace(/^r\//i, "").trim()).filter(Boolean);
  const calls: Promise<RedditChild[]>[] = [];
  // Reddit caps a multireddit URL, so ask for the newest posts in chunks.
  for (let i = 0; i < subs.length; i += 25) calls.push(get(`/r/${subs.slice(i, i + 25).join("+")}/new?limit=100&raw_json=1`));
  if (s.search.trim()) calls.push(get(`/search?q=${encodeURIComponent(s.search)}&sort=new&t=day&limit=50&raw_json=1&type=link`));

  const results = await Promise.allSettled(calls);
  const ok = results.filter((r): r is PromiseFulfilledResult<RedditChild[]> => r.status === "fulfilled");
  if (!ok.length) throw (results[0] as PromiseRejectedResult).reason;
  return ok.flatMap((r) => r.value.map((c) => redditPost(c.data))).filter((p): p is RawPost => p !== null);
}

// ---------- Hacker News (Algolia API; free) ----------

const stripHtml = (html: string) =>
  html
    .replace(/<p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#x2F;/g, "/")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .trim();

// Top-level comments in the newest "Who is hiring?" thread that mention contract
// or freelance work. Full-time-only posts are left to the keyword filter + AI.
export async function fetchHn(sinceUnix: number): Promise<RawPost[]> {
  const stories = await fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story,author_whoishiring&hitsPerPage=5", { signal: AbortSignal.timeout(10000) }).then((r) => r.json());
  const thread = (stories.hits ?? []).find((h: { title?: string }) => h.title?.startsWith("Ask HN: Who is hiring?"));
  if (!thread) return [];
  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=comment,story_${thread.objectID}&numericFilters=created_at_i>${sinceUnix}&hitsPerPage=200`;
  const data = await fetch(url, { signal: AbortSignal.timeout(10000) }).then((r) => r.json());
  return ((data.hits ?? []) as Record<string, unknown>[])
    .filter((h) => String(h.parent_id) === String(thread.objectID))
    .map((h) => {
      const body = stripHtml(String(h.comment_text ?? ""));
      return {
        platform: "hn" as const,
        url: `https://news.ycombinator.com/item?id=${h.objectID}`,
        external_id: String(h.objectID),
        author: str(h.author),
        author_url: str(h.author) ? `https://news.ycombinator.com/user?id=${h.author}` : null,
        title: body.split("\n")[0].slice(0, 200) || null,
        body,
        posted_at: str(h.created_at),
        community: "Who is hiring?",
      };
    })
    .filter((p) => /\b(contract|contractor|freelanc|part[- ]time|consult)/i.test(p.body));
}

// ---------- X and LinkedIn (Apify actors; paid per result) ----------
// Runs are started on one tick and collected on a later one, so no request has
// to wait for a scraper to finish.

export const apifyConfigured = () => Boolean(process.env.APIFY_TOKEN);
const APIFY = "https://api.apify.com/v2";
const tokenQs = () => `token=${encodeURIComponent(process.env.APIFY_TOKEN ?? "")}`;

export function apifyInput(source: "x" | "linkedin", s: ProspectSettings): Record<string, unknown> {
  if (source === "x") {
    const since = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    return { searchTerms: [`${s.x.query} since:${since}`], sort: "Latest", maxItems: s.x.maxItems, tweetLanguage: "en" };
  }
  return { searchQueries: s.linkedin.queries, maxPosts: s.linkedin.maxPosts, postedLimit: "24h", sortBy: "date" };
}

export async function startApifyRun(actor: string, input: Record<string, unknown>): Promise<string> {
  const res = await fetch(`${APIFY}/acts/${encodeURIComponent(actor)}/runs?${tokenQs()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Apify start ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const id = (await res.json()).data?.id;
  if (!id) throw new Error("Apify returned no run id");
  return id;
}

export type ApifyRunState = { status: "running" | "done" | "failed"; items: Record<string, unknown>[]; usageUsd: number; error?: string };

export async function collectApifyRun(runId: string): Promise<ApifyRunState> {
  const run = await fetch(`${APIFY}/actor-runs/${runId}?${tokenQs()}`, { signal: AbortSignal.timeout(10000) }).then((r) => r.json());
  const d = run.data ?? {};
  if (["READY", "RUNNING"].includes(d.status)) return { status: "running", items: [], usageUsd: 0 };
  const usageUsd = Number(d.usageTotalUsd) || 0;
  if (d.status !== "SUCCEEDED") return { status: "failed", items: [], usageUsd, error: `Apify run ${d.status ?? "unknown"}` };
  const items = await fetch(`${APIFY}/datasets/${d.defaultDatasetId}/items?clean=true&format=json&${tokenQs()}`, { signal: AbortSignal.timeout(15000) }).then((r) => r.json());
  return { status: "done", items: Array.isArray(items) ? items : [], usageUsd };
}

// Actors name their fields differently; read whichever is present so another
// actor can be swapped in from Settings without a code change.
const pick = (o: Record<string, unknown>, paths: string[]): unknown => {
  for (const p of paths) {
    const v = p.split(".").reduce<unknown>((acc, k) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[k] : undefined), o);
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
};

const toIso = (v: unknown): string | null => {
  if (v === undefined || v === null || v === "") return null;
  const d = typeof v === "number" ? new Date(v < 1e12 ? v * 1000 : v) : new Date(String(v));
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

export function normalizeApifyItem(platform: "x" | "linkedin", o: Record<string, unknown>): RawPost | null {
  const url = str(pick(o, platform === "x" ? ["url", "twitterUrl", "tweetUrl"] : ["linkedinUrl", "url", "postUrl", "shareUrl"]));
  const body = str(pick(o, ["fullText", "text", "content", "postText", "commentary"]));
  if (!url || !body) return null;
  const handle = str(pick(o, ["author.userName", "author.username", "author.screen_name", "user.screen_name"]));
  const name = str(pick(o, ["author.name", "author.fullName", "authorName", "author.firstName", "user.name"]));
  return {
    platform,
    url,
    external_id: str(pick(o, ["id", "tweetId", "urn", "entityId"])?.toString()),
    author: platform === "x" && handle ? `@${handle}` : name ?? handle,
    author_url: str(pick(o, ["author.url", "author.linkedinUrl", "author.profileUrl", "authorProfileUrl"])) ?? (platform === "x" && handle ? `https://x.com/${handle}` : null),
    title: null,
    body,
    posted_at: toIso(pick(o, ["createdAt", "postedAt.date", "postedAt.timestamp", "postedAt", "postedDate", "date", "timestamp"])),
    community: null,
  };
}
