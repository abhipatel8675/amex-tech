import type { OutreachQueueItem } from "@/lib/outreach";

const WORKER_URL = process.env.OUTREACH_WORKER_URL || "https://amex-outreach.ipoai.workers.dev";

export type QueueState = {
  queue: (OutreachQueueItem & { problem?: string; city?: string; category?: string; website?: string; first_name?: string })[];
  enabled: boolean;
  sent_today: number;
  daily_limit: number;
  emailed_total: number;
  replied_total: number;
  not_contacted: number;
};

async function callWorker<T>(path: string, body?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${WORKER_URL}${path}`, {
    method: body ? "POST" : "GET",
    cache: "no-store",
    headers: { Authorization: `Bearer ${process.env.OUTREACH_SYNC_TOKEN}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Outreach worker answered ${res.status}`);
  return data as T;
}

export const outreachQueue = (change?: Record<string, unknown>) => callWorker<QueueState>("/queue", change);
export const sendViaZoho = (to: string, subject: string, body: string) => callWorker<{ ok: boolean; messageId: string }>("/send", { to, subject, body });
export const aiDraft = (input: Record<string, unknown>) => callWorker<{ subject: string; body: string }>("/ai", input);

export type FinderState = {
  cities: string[];
  trades: string[];
  weekly_target: number;
  max_pages_per_run: number;
  searched: number;
  total: number;
  found_total: number;
  waiting_total: number;
  by_city: { city: string; total: number; waiting: number }[];
  cities_done: string[];
};

export const finderSettings = (change?: Record<string, unknown>) => callWorker<FinderState>("/finder", change);
export const startFinder = () => callWorker<{ ok: boolean }>("/finder/run", {});

export type ColdLead = {
  id: string;
  business: string;
  first_name: string;
  email: string;
  city: string;
  category: string;
  website: string;
  status: string;
  source: string;
  notes: string;
  last_sent_at: string;
  replied_at: string;
  subject: string;
};

export const coldLeads = () => callWorker<{ leads: ColdLead[] }>("/leads");

export const draftOneLead = (id: string) => callWorker<{ ok?: boolean; subject?: string; skip?: string }>("/draft-one", { id });
export const addToQueue = (add: { id: string; subject: string; body: string; approved: boolean }) => callWorker<QueueState>("/queue", { add });
