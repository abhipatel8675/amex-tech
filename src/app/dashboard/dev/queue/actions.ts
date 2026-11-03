"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { aiDraft, outreachQueue } from "@/lib/outreachWorker";

async function requireDev() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.DEVELOPER_EMAIL) throw new Error("Unauthorized");
}

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : "");

async function change(formData: FormData | null, body: Record<string, unknown>) {
  await requireDev();
  const tab = formData ? str(formData.get("tab")) : "";
  let error = "";
  try {
    await outreachQueue(body);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }
  revalidatePath("/dashboard/dev/queue");
  if (error) redirect(`/dashboard/dev/queue?${new URLSearchParams({ ...(tab ? { tab } : {}), error: `Not saved: ${error}. Try again.` })}`);
}

export async function saveEmail(formData: FormData) {
  await change(formData, { id: str(formData.get("id")), subject: str(formData.get("subject")), body: str(formData.get("body")), approved: formData.get("approved") === "on" });
}

export async function removeEmail(formData: FormData) {
  await change(formData, { id: str(formData.get("id")), remove: true });
}

export async function approveAll() {
  await change(null, { approve_all: true });
}

export async function aiRewrite(input: { business: string; first_name: string; problem: string; subject: string; body: string; note: string }): Promise<{ ok: true; subject: string; body: string; warnings: string[] } | { ok: false; error: string }> {
  await requireDev();
  try {
    const d = (await aiDraft({ mode: "cold", lead: { business: input.business, first_name: input.first_name, problem: input.problem }, current: { subject: input.subject, body: input.body }, note: input.note })) as { subject: string; body: string; warnings?: string[] };
    return { ok: true, subject: d.subject, body: d.body, warnings: d.warnings ?? [] };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
