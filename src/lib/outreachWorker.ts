import type { OutreachQueueItem } from "@/lib/outreach";

const WORKER_URL = process.env.OUTREACH_WORKER_URL || "https://amex-outreach.ipoai.workers.dev";

export type QueueState = {
  queue: (OutreachQueueItem & { problem?: string; city?: string; category?: string; website?: string })[];
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
