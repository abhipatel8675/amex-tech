export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DevDashboard from "@/components/dashboard/DevDashboard";

export default async function DevDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  if (user.email !== process.env.DEVELOPER_EMAIL) redirect("/dashboard/client");

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return <DevDashboard user={user} orders={orders || []} />;
}
