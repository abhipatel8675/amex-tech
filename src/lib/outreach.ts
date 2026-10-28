import type { SupabaseClient } from "@supabase/supabase-js";

// Cold-outreach data pushed here by the amex-outreach GitHub Actions runs. It's
// stored as one private JSON file in Supabase Storage (no table to migrate),
// and replies are copied into the leads table so they enter the pipeline.

export type OutreachContact = {
  id: string;
  segment: string;
  business: string;
  email: string;
  city: string;
  category: string;
  website: string;
  problem: string;
  subject: string;
  status: string; // new | contacted | followed_up | done | replied | optout | bounced | skipped
  last_sent_at: string;
  replied_at: string;
  notes: string;
  reply_snippet?: string;
};

export type OutreachSnapshot = {
  synced_at: string;
  enabled: boolean;
  from_email: string;
  contacts: OutreachContact[];
};

const BUCKET = "internal";
const PATH = "outreach/latest.json";

export async function saveOutreachSnapshot(db: SupabaseClient, snapshot: OutreachSnapshot): Promise<void> {
  const body = new Blob([JSON.stringify(snapshot)], { type: "application/json" });
  let { error } = await db.storage.from(BUCKET).upload(PATH, body, { upsert: true, contentType: "application/json" });
  if (error && /not found/i.test(error.message)) {
    await db.storage.createBucket(BUCKET, { public: false });
    ({ error } = await db.storage.from(BUCKET).upload(PATH, body, { upsert: true, contentType: "application/json" }));
  }
  if (error) throw new Error(`Saving outreach snapshot: ${error.message}`);
}

export async function loadOutreachSnapshot(db: SupabaseClient): Promise<OutreachSnapshot | null> {
  const { data, error } = await db.storage.from(BUCKET).download(PATH);
  if (error || !data) return null;
  try {
    return JSON.parse(await data.text()) as OutreachSnapshot;
  } catch {
    return null;
  }
}
