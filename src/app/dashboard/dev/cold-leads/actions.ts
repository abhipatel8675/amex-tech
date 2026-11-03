"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { addToQueue, draftOneLead } from "@/lib/outreachWorker";

async function requireDev() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.DEVELOPER_EMAIL) throw new Error("Unauthorized");
}

type Result = { ok: true; message: string } | { ok: false; message: string };
const fail = (e: unknown): Result => ({ ok: false, message: e instanceof Error ? e.message : String(e) });

export async function aiDraftLead(id: string): Promise<Result> {
  await requireDev();
  try {
    const r = await draftOneLead(id);
    if (r.skip) return { ok: false, message: `No email written: ${r.skip}.` };
    revalidatePath("/dashboard/dev/cold-leads");
    revalidatePath("/dashboard/dev/queue");
    return { ok: true, message: `Added to the Queue as a draft: "${r.subject}".` };
  } catch (e) {
    return fail(e);
  }
}

export async function writeToQueue(input: { id: string; subject: string; body: string; approved: boolean }): Promise<Result> {
  await requireDev();
  try {
    await addToQueue(input);
    revalidatePath("/dashboard/dev/cold-leads");
    revalidatePath("/dashboard/dev/queue");
    return { ok: true, message: input.approved ? "Added to the Queue, approved to send." : "Added to the Queue as a draft." };
  } catch (e) {
    return fail(e);
  }
}
