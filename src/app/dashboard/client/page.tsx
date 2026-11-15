export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { roleFor } from "@/lib/access";
import ClientDashboard from "@/components/dashboard/ClientDashboard";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const role = roleFor(user.email);
  if (role === "dev") redirect("/dashboard/dev");
  if (role === "sales") redirect("/dashboard/sales");

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("client_email", user.email)
    .order("created_at", { ascending: false });

  return <ClientDashboard user={user} orders={orders || []} />;
}
