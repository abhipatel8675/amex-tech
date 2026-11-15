export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/access";
import { leadsDb } from "@/lib/leads";
import { loadSettings } from "@/lib/prospects/engine";
import { DEFAULT_SETTINGS } from "@/lib/prospects/types";
import ProspectSettingsForm from "@/components/dashboard/ProspectSettingsForm";

export const metadata: Metadata = { title: "Prospect settings", robots: { index: false, follow: false } };

export default async function ProspectSettingsPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  if (user.role !== "dev") redirect("/dashboard");
  const db = leadsDb();
  const settings = db ? await loadSettings(db) : DEFAULT_SETTINGS;
  const keys = {
    reddit: Boolean(process.env.REDDIT_CLIENT_ID && process.env.REDDIT_CLIENT_SECRET),
    apify: Boolean(process.env.APIFY_TOKEN),
    nvidia: Boolean(process.env.NVIDIA_API_KEY),
    cron: Boolean(process.env.CRON_SECRET),
    sales: (process.env.SALES_EMAILS ?? "").split(",").map((s) => s.trim()).filter(Boolean),
  };
  return <ProspectSettingsForm settings={settings} keys={keys} />;
}
