import type { OutreachQueueItem } from "@/lib/outreach";

const WORKER_URL = process.env.OUTREACH_WORKER_URL || "https://amex-outreach.WORKERS_SUBDOMAIN.workers.dev";

export type QueueState = {
  queue: (OutreachQueueItem & { problem?: string; city?: string; category?: string; website?: string })[];
  enabled: boolean;
  sent_today: number;
  daily_limit: number;
  emailed_total: number;
  replied_total: number;
  not_contacted: number;
};

export async function outreachQueue(change?: Record<string, unknown>): Promise<QueueState> {
  const res = await fetch(`${WORKER_URL}/queue`, {
    method: change ? "POST" : "GET",
    cache: "no-store",
    headers: { Authorization: `Bearer ${process.env.OUTREACH_SYNC_TOKEN}`, "Content-Type": "application/json" },
    body: change ? JSON.stringify(change) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Outreach worker answered ${res.status}`);
  return data as QueueState;
}
