"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { leadsDb, saveLead, LEAD_STATUSES, LEAD_SOURCES, type LeadStatus, type LeadSource } from "@/lib/leads";

// Server Functions are reachable by direct POST, so every one re-checks the user.
async function requireDev() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.DEVELOPER_EMAIL) throw new Error("Unauthorized");
  const db = leadsDb();
  if (!db) throw new Error("Supabase service role is not configured");
  return db;
}

const text = (v: FormDataEntryValue | null) => (typeof v === "string" && v.trim() ? v.trim() : null);

function money(v: FormDataEntryValue | null): number | null {
  const n = Number(text(v)?.replace(/[$,]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function date(v: FormDataEntryValue | null): string | null {
  const s = text(v);
  return s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}

export async function updateLead(formData: FormData) {
  const db = await requireDev();
  const id = text(formData.get("id"));
  const status = text(formData.get("status")) as LeadStatus | null;
  if (!id || !status || !LEAD_STATUSES.includes(status)) throw new Error("Invalid lead update");

  const { error } = await db
    .from("leads")
    .update({
      status,
      quote_amount: money(formData.get("quote_amount")),
      next_follow_up: date(formData.get("next_follow_up")),
      notes: text(formData.get("notes")),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/dev/leads");
}

export async function addLead(formData: FormData) {
  await requireDev();
  const source = (text(formData.get("source")) ?? "manual") as LeadSource;
  const status = (text(formData.get("status")) ?? "new") as LeadStatus;
  if (!LEAD_SOURCES.includes(source) || !LEAD_STATUSES.includes(status)) throw new Error("Invalid lead");

  await saveLead({
    source,
    status,
    name: text(formData.get("name")),
    company: text(formData.get("company")),
    email: text(formData.get("email")),
    phone: text(formData.get("phone")),
    website: text(formData.get("website")),
    service: text(formData.get("service")),
    quote_amount: money(formData.get("quote_amount")),
    next_follow_up: date(formData.get("next_follow_up")),
    notes: text(formData.get("notes")),
  });
  revalidatePath("/dashboard/dev/leads");
}

export async function deleteLead(formData: FormData) {
  const db = await requireDev();
  const id = text(formData.get("id"));
  if (!id) throw new Error("Missing id");
  const { error } = await db.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/dev/leads");
}
