"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { finderSettings, startFinder } from "@/lib/outreachWorker";

async function requireDev() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.DEVELOPER_EMAIL) throw new Error("Unauthorized");
}

const done = (params: Record<string, string>) => {
  revalidatePath("/dashboard/dev/lead-sources");
  redirect(`/dashboard/dev/lead-sources?${new URLSearchParams(params)}`);
};

export async function saveSources(formData: FormData) {
  await requireDev();
  let error = "";
  try {
    await finderSettings({ cities: String(formData.get("cities") || ""), trades: String(formData.get("trades") || ""), weekly_target: Number(formData.get("weekly_target")), max_pages_per_run: Number(formData.get("max_pages_per_run")) });
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }
  done(error ? { error } : { saved: "1" });
}

export async function runNow() {
  await requireDev();
  let error = "";
  try {
    await startFinder();
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }
  done(error ? { error } : { started: "1" });
}
