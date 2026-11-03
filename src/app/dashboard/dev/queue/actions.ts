"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { outreachQueue } from "@/lib/outreachWorker";

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
