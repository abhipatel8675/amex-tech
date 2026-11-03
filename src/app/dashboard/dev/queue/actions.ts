"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { aiDraft, outreachQueue } from "@/lib/outreachWorker";

async function requireDev() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.DEVELOPER_EMAIL) throw new Error("Unauthorized");
}

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : "");

export async function saveEmail(formData: FormData) {
  await requireDev();
  await outreachQueue({ id: str(formData.get("id")), subject: str(formData.get("subject")), body: str(formData.get("body")), approved: formData.get("approved") === "on" });
  revalidatePath("/dashboard/dev/queue");
}

export async function removeEmail(formData: FormData) {
  await requireDev();
  await outreachQueue({ id: str(formData.get("id")), remove: true });
  revalidatePath("/dashboard/dev/queue");
}

export async function approveAll() {
  await requireDev();
  await outreachQueue({ approve_all: true });
  revalidatePath("/dashboard/dev/queue");
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
