"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { leadsDb, saveLead, LEAD_STATUSES, LEAD_SOURCES, type Lead, type LeadStatus, type LeadSource } from "@/lib/leads";
import { createPaymentLink, razorpayConfigured, PAYMENT_CURRENCIES, type LeadPayment, type PaymentCurrency } from "@/lib/razorpay";

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

// Creates a Razorpay Payment Link for a lead and stores it in meta.payments.
// The webhook (/api/razorpay/webhook) marks it paid and moves the lead to Won.
export async function createLeadPaymentLink(formData: FormData): Promise<{ url?: string; error?: string }> {
  const db = await requireDev();
  if (!razorpayConfigured()) return { error: "Razorpay keys are not set in Vercel yet." };
  const id = text(formData.get("id"));
  const amount = money(formData.get("amount"));
  const currency = (text(formData.get("currency")) ?? "USD") as PaymentCurrency;
  if (!id || !amount || amount < 1 || !PAYMENT_CURRENCIES.includes(currency)) return { error: "Enter an amount of at least 1." };

  const { data: lead, error } = await db.from("leads").select("*").eq("id", id).single<Lead>();
  if (error || !lead) return { error: "Lead not found." };
  const description = text(formData.get("description")) ?? `${lead.service || "Website"} - Amex Technology`;

  try {
    const link = await createPaymentLink({
      leadId: id,
      amount,
      currency,
      description,
      customer: { name: lead.name || lead.company, email: lead.email, phone: lead.phone },
    });
    const payments = (Array.isArray(lead.meta?.payments) ? lead.meta.payments : []) as LeadPayment[];
    payments.push({
      link_id: link.id,
      short_url: link.short_url,
      amount,
      currency,
      description,
      status: "created",
      created_at: new Date().toISOString(),
    });
    const { error: saveError } = await db
      .from("leads")
      .update({
        meta: { ...lead.meta, payments },
        status: ["new", "contacted", "replied", "call"].includes(lead.status) ? "quoted" : lead.status,
        quote_amount: lead.quote_amount ?? amount,
      })
      .eq("id", id);
    if (saveError) return { url: link.short_url, error: `Link created but not saved: ${saveError.message}` };
    revalidatePath("/dashboard/dev/leads");
    return { url: link.short_url };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Razorpay request failed" };
  }
}
