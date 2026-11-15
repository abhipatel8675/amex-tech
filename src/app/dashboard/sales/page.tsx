export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/access";
import ProspectFeed from "@/components/dashboard/ProspectFeed";

export const metadata: Metadata = { title: "Prospecting", robots: { index: false, follow: false } };

export default async function SalesFeedPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  if (user.role === "client") redirect("/dashboard/client");
  return <ProspectFeed isDev={user.role === "dev"} />;
}
