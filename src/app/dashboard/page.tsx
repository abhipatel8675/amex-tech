export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { roleFor } from "@/lib/access";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const role = roleFor(user.email);
  redirect(role === "dev" ? "/dashboard/dev" : role === "sales" ? "/dashboard/sales" : "/dashboard/client");
}
