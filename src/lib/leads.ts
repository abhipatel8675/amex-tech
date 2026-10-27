import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { LeadSource, LeadStatus } from "./leadTypes";

export * from "./leadTypes";

export type NewLead = {
  source: LeadSource;
  status?: LeadStatus;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  website?: string | null;
  service?: string | null;
  budget?: string | null;
  message?: string | null;
  quote_amount?: number | null;
  next_follow_up?: string | null;
  notes?: string | null;
  meta?: Record<string, unknown>;
};

// Service-role client without cookies: leads has RLS on and no policies, so
// only server code can touch it.
export function leadsDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createSupabaseClient(url, key, { auth: { persistSession: false } });
}

const clip = (v: unknown, max: number) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

// Best-effort: a lead that fails to save must never break the form that sent it.
export async function saveLead(lead: NewLead): Promise<void> {
  const db = leadsDb();
  if (!db) return;
  try {
    const { error } = await db.from("leads").insert({
      source: lead.source,
      status: lead.status ?? "new",
      name: clip(lead.name, 120),
      email: clip(lead.email, 200)?.toLowerCase() ?? null,
      phone: clip(lead.phone, 40),
      company: clip(lead.company, 160),
      website: clip(lead.website, 300),
      service: clip(lead.service, 120),
      budget: clip(lead.budget, 60),
      message: clip(lead.message, 5000),
      quote_amount: lead.quote_amount ?? null,
      next_follow_up: lead.next_follow_up ?? null,
      notes: clip(lead.notes, 5000),
      meta: lead.meta ?? {},
    });
    if (error) console.error("saveLead:", error.message);
  } catch (err) {
    console.error("saveLead:", err);
  }
}
