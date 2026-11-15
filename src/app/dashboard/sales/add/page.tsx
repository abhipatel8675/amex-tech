export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/access";
import QuickAddForm from "@/components/dashboard/QuickAddForm";

export const metadata: Metadata = { title: "Quick add", robots: { index: false, follow: false } };

export default async function QuickAddPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const user = await currentUser();
  if (!user) redirect("/login");
  if (user.role === "client") redirect("/dashboard/client");
  const sp = await searchParams;
  const one = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string).slice(0, 4000) : "");
  return <QuickAddForm initial={{ url: one("url"), body: one("text"), title: one("title") }} />;
}
