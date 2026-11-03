export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { leadsDb, type Lead } from "@/lib/leads";
import type { LeadEmail } from "@/lib/leadEmails";
import LeadsBoard from "@/components/dashboard/LeadsBoard";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ f?: string; q?: string; open?: string }> }) {
  const { f = "all", q = "", open = "" } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  if (user.email !== process.env.DEVELOPER_EMAIL) redirect("/dashboard/client");

  const db = leadsDb();
  const { data: leads, error } = db
    ? await db.from("leads").select("*").order("created_at", { ascending: false }).limit(1000)
    : { data: null, error: { message: "SUPABASE_SERVICE_ROLE_KEY is not set" } };

  const { data: emails } = db
    ? await db.from("lead_emails").select("id, lead_id, to_email, subject, body, template, created_at").order("created_at", { ascending: false }).limit(1000)
    : { data: [] };

  return <LeadsBoard leads={(leads as Lead[]) || []} emails={(emails as LeadEmail[]) || []} loadError={error?.message ?? null} initialFilter={f} initialQuery={q} openId={open} />;
}
