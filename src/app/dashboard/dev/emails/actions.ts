"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { leadsDb } from "@/lib/leads";
import { aiDraft, sendViaZoho } from "@/lib/outreachWorker";

// Server Functions are reachable by direct POST, so every one re-checks the user.
async function requireDev() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.DEVELOPER_EMAIL) throw new Error("Unauthorized");
  const db = leadsDb();
  if (!db) throw new Error("Supabase service role is not configured");
  return db;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inAWeek = () => new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });

export type SendResult = { ok: true } | { ok: false; error: string };

export async function sendLeadEmail(input: { leadId: string | null; to: string; subject: string; body: string; template: string }): Promise<SendResult> {
  const db = await requireDev();
  const to = input.to.trim().toLowerCase();
  if (!EMAIL.test(to)) return { ok: false, error: "Enter a valid email address." };
  if (!input.subject.trim() || !input.body.trim()) return { ok: false, error: "Write a subject and a message first." };
  if (/\[[^\]\n]{2,40}\]/.test(input.body)) return { ok: false, error: "Fill in the [placeholders] before sending." };
  const { data: off } = await db.from("email_unsubscribes").select("email").eq("email", to).maybeSingle();
  if (off) return { ok: false, error: `${to} asked not to be emailed. Remove them from the unsubscribe list first if they changed their mind.` };

  let messageId = "";
  try {
    messageId = (await sendViaZoho(to, input.subject, input.body)).messageId;
  } catch (e) {
    return { ok: false, error: `Not sent: ${e instanceof Error ? e.message : String(e)}` };
  }
  const { error } = await db.from("lead_emails").insert({ lead_id: input.leadId, to_email: to, subject: input.subject.trim(), body: input.body.trim(), template: input.template.slice(0, 40), zoho_message_id: messageId || null });
  if (error) console.error("lead_emails insert:", error.message);
  if (input.leadId) {
    const { data: lead } = await db.from("leads").select("status").eq("id", input.leadId).maybeSingle();
    await db.from("leads").update({ status: lead?.status === "new" ? "contacted" : lead?.status, next_follow_up: inAWeek(), updated_at: new Date().toISOString() }).eq("id", input.leadId);
  }
  revalidatePath("/dashboard/dev/leads");
  revalidatePath("/dashboard/dev/emails");
  return { ok: true };
}

export async function writeWithAI(input: { leadId: string | null; note: string; template: string }): Promise<{ ok: true; subject: string; body: string } | { ok: false; error: string }> {
  const db = await requireDev();
  const [{ data: lead }, { data: history }] = input.leadId
    ? await Promise.all([
        db.from("leads").select("name, company, email, website, service, budget, message, status, quote_amount, notes, source").eq("id", input.leadId).maybeSingle(),
        db.from("lead_emails").select("subject, body, created_at").eq("lead_id", input.leadId).order("created_at", { ascending: false }).limit(3),
      ])
    : [{ data: null }, { data: [] }];
  try {
    const d = await aiDraft({ lead: lead ?? {}, history: history ?? [], note: input.note, template: input.template });
    return { ok: true, ...d };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function setUnsubscribed(formData: FormData) {
  const db = await requireDev();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!EMAIL.test(email)) throw new Error("Enter a valid email address.");
  if (formData.get("remove") === "1") await db.from("email_unsubscribes").delete().eq("email", email);
  else await db.from("email_unsubscribes").upsert({ email, source: "admin" });
  revalidatePath("/dashboard/dev/emails");
}
