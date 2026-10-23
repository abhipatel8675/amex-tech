export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { projects as staticProjects } from "@/data/projects";
import type { ProjectRow } from "@/lib/portfolio/data";
import PortfolioAdmin from "@/components/admin/PortfolioAdmin";

export const metadata: Metadata = {
  title: "Portfolio admin",
  robots: { index: false, follow: false },
};

export default async function PortfolioAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const admin = process.env.DEVELOPER_EMAIL?.toLowerCase();
  if (!admin || user.email?.toLowerCase() !== admin) redirect("/dashboard");

  const service = createServiceClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await service
    .from("portfolio_projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <PortfolioAdmin
      email={user.email!}
      rows={(data ?? []) as ProjectRow[]}
      setupError={error ? error.message : null}
      staticCount={staticProjects.length}
    />
  );
}
