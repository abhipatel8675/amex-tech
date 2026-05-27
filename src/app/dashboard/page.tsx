export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const isDev = user.email === process.env.DEVELOPER_EMAIL;
  redirect(isDev ? "/dashboard/dev" : "/dashboard/client");
}
