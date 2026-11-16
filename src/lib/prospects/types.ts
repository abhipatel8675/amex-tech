// Shared by server code and the dashboard UI; keep free of server imports.

export const PLATFORMS = ["reddit", "x", "linkedin", "hn", "bluesky", "jobboard", "craigslist", "facebook", "discord", "slack", "nextdoor", "indiehackers", "other"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const PLATFORM_LABEL: Record<Platform, string> = {
  reddit: "Reddit",
  x: "X",
  linkedin: "LinkedIn",
  hn: "Hacker News",
  bluesky: "Bluesky",
  jobboard: "Job board",
  craigslist: "Craigslist",
  facebook: "Facebook",
  discord: "Discord",
  slack: "Slack",
  nextdoor: "Nextdoor",
  indiehackers: "Indie Hackers",
  other: "Other",
};

export const PLATFORM_COLOR: Record<Platform, string> = {
  reddit: "#FF4500",
  x: "#0f172a",
  linkedin: "#0A66C2",
  hn: "#FF6600",
  bluesky: "#1185FE",
  jobboard: "#0F766E",
  craigslist: "#5A2D82",
  facebook: "#1877F2",
  discord: "#5865F2",
  slack: "#4A154B",
  nextdoor: "#00B246",
  indiehackers: "#1F364D",
  other: "#64748b",
};

// Sources fetched automatically. Everything else arrives through Quick add.
export const AUTO_SOURCES = ["reddit", "hn", "bluesky", "jobs", "x", "linkedin"] as const;
export type AutoSource = (typeof AUTO_SOURCES)[number];

export const PROSPECT_STATUSES = ["pending_ai", "filtered", "new", "sent", "replied", "skipped", "lost", "expired"] as const;
export type ProspectStatus = (typeof PROSPECT_STATUSES)[number];

export type ProspectAi = {
  is_buyer?: boolean;
  need?: string;
  category?: string;
  budget?: string | null;
  urgency?: "high" | "medium" | "low";
  reason?: string;
  error?: string;
};

export type Prospect = {
  id: string;
  created_at: string;
  updated_at: string;
  platform: Platform;
  origin: "auto" | "manual";
  url: string;
  external_id: string | null;
  author: string | null;
  author_url: string | null;
  title: string | null;
  body: string | null;
  posted_at: string | null;
  community: string | null;
  status: ProspectStatus;
  score: number | null;
  ai: ProspectAi;
  draft: string | null;
  ai_attempts: number;
  sent_at: string | null;
  sent_by: string | null;
  follow_up_at: string | null;
  followed_up_at: string | null;
  replied_at: string | null;
  lead_id: string | null;
  notes: string | null;
};

export type ScheduledSource = {
  enabled: boolean;
  everyMin: number;
  // Pacific-time hour window [start, end); outside it the source is skipped.
  hoursPT: [number, number];
  weekdaysOnly: boolean;
};

export type ProspectSettings = {
  reddit: ScheduledSource & { subreddits: string[]; search: string };
  hn: ScheduledSource;
  bluesky: ScheduledSource & { queries: string[] };
  // RemoteOK, Remotive and We Work Remotely: contract / freelance / part-time dev roles only.
  jobs: ScheduledSource;
  x: ScheduledSource & { actor: string; query: string; maxItems: number; pricePerItem: number };
  linkedin: ScheduledSource & { actor: string; queries: string[]; maxPosts: number; pricePerItem: number };
  // A post must contain at least one of these (case-insensitive) to reach the AI.
  keywords: string[];
  // Posts containing any of these are dropped (developers advertising themselves).
  exclude: string[];
  monthlyBudgetUsd: number;
  dailyCaps: Partial<Record<Platform, number>>;
  followUpDays: number;
  // Real projects the AI may mention in drafted replies. One per line.
  projects: string[];
};

export const DEFAULT_SETTINGS: ProspectSettings = {
  reddit: {
    enabled: true,
    everyMin: 3,
    hoursPT: [0, 24],
    weekdaysOnly: false,
    subreddits: [
      "forhire", "slavelabour", "hiring", "jobbit", "freelance_forhire",
      "startups", "SaaS", "Entrepreneur", "smallbusiness", "cofounder",
      "AppDevelopers", "webdev", "lovable", "boltnewbuilders", "replit",
      "cursor", "vibecoding", "Supabase", "nextjs", "reactnative",
      "gohighlevel", "shopify", "Wordpress", "Wix", "LosAngeles",
    ],
    search: '"looking for a developer" OR "need a developer" OR "hire a developer" OR "technical cofounder" OR "need a web developer" OR "looking for an app developer"',
  },
  hn: { enabled: true, everyMin: 15, hoursPT: [0, 24], weekdaysOnly: false },
  bluesky: {
    enabled: true,
    everyMin: 10,
    hoursPT: [0, 24],
    weekdaysOnly: false,
    queries: ["need a developer", "looking for a developer", "hire a developer", "looking for a dev", "technical cofounder", "need a web developer"],
  },
  jobs: { enabled: true, everyMin: 60, hoursPT: [0, 24], weekdaysOnly: false },
  x: {
    enabled: true,
    everyMin: 120,
    hoursPT: [7, 21],
    weekdaysOnly: false,
    actor: "apidojo~tweet-scraper",
    query: '("looking for a developer" OR "need a developer" OR "hire a developer" OR "looking for a dev" OR "need a web developer" OR "technical cofounder" OR "recommend a developer") -filter:retweets lang:en',
    maxItems: 50,
    pricePerItem: 0.0004,
  },
  linkedin: {
    enabled: true,
    everyMin: 180,
    hoursPT: [7, 19],
    weekdaysOnly: true,
    actor: "harvestapi~linkedin-post-search",
    queries: ["looking for a developer", "need a web developer"],
    maxPosts: 10,
    pricePerItem: 0.002,
  },
  keywords: [
    "[hiring]", "hiring", "looking for a developer", "looking for a dev", "looking for an app developer",
    "need a developer", "need a dev", "need a web developer", "need someone to build", "hire a developer",
    "hire someone", "freelance developer", "technical cofounder", "technical co-founder", "will pay",
    "paid gig", "budget", "recommend a developer", "anyone know a good developer", "build my app",
    "build an mvp", "fix my app", "help me fix", "won't deploy", "can't deploy", "broken", "stuck",
    "contract", "freelance",
  ],
  exclude: ["[for hire]", "for hire", "i am a developer", "i'm a developer offering", "available for work", "seeking work", "hire me", "my portfolio"],
  monthlyBudgetUsd: 15,
  dailyCaps: { reddit: 20, x: 30, linkedin: 15, hn: 10, bluesky: 20, jobboard: 10 },
  followUpDays: 3,
  projects: [
    "GoSwiftFund (goswiftfund.com): business funding marketplace, Next.js + Supabase + Plaid",
    "Molar AI (molarai.studio): GPT-4 content platform for dental practices with an accuracy check",
    "HourSheets (hoursheets.org): time-tracking SaaS with dashboards and approvals",
    "MoveEmpire: 62-screen app redesign for a US moving company, shipped on a branch with daily backups",
    "Fixes for Lovable / Bolt / Replit apps: Supabase RLS, auth, deploys to Vercel",
  ],
};

// Settings stored in the DB are merged over the defaults one level deep, so a
// new default field shows up without a migration.
export function mergeSettings(stored: unknown): ProspectSettings {
  const s = (stored && typeof stored === "object" ? stored : {}) as Record<string, unknown>;
  const out = { ...DEFAULT_SETTINGS } as Record<string, unknown>;
  for (const [k, v] of Object.entries(DEFAULT_SETTINGS)) {
    const sv = s[k];
    if (sv === undefined || sv === null) continue;
    out[k] = v && typeof v === "object" && !Array.isArray(v) && typeof sv === "object" && !Array.isArray(sv) ? { ...v, ...sv } : sv;
  }
  return out as ProspectSettings;
}

export function platformFromUrl(url: string): Platform {
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "other";
  }
  if (host.endsWith("reddit.com") || host === "redd.it") return "reddit";
  if (host === "x.com" || host.endsWith("twitter.com")) return "x";
  if (host.endsWith("linkedin.com")) return "linkedin";
  if (host === "news.ycombinator.com") return "hn";
  if (host === "bsky.app") return "bluesky";
  if (["remoteok.com", "remotive.com", "weworkremotely.com", "wellfound.com"].some((h) => host.endsWith(h))) return "jobboard";
  if (host.endsWith("craigslist.org")) return "craigslist";
  if (host.endsWith("facebook.com") || host === "fb.com") return "facebook";
  if (host.endsWith("discord.com") || host.endsWith("discord.gg")) return "discord";
  if (host.endsWith("slack.com")) return "slack";
  if (host.endsWith("nextdoor.com")) return "nextdoor";
  if (host.endsWith("indiehackers.com")) return "indiehackers";
  return "other";
}

export const pacificDay = (d: Date = new Date()) => d.toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
