export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, CalendarClock, DollarSign, Flame, Inbox, Package, Trophy } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { leadsDb, LEAD_SOURCE_LABEL as SOURCE_LABEL, type Lead, type LeadSource } from "@/lib/leads";

export const metadata: Metadata = {
  title: "Overview",
  robots: { index: false, follow: false },
};

const OPEN = ["new", "contacted", "replied", "call", "quoted"];
// Server-rendered on every request, so the cutoff is fresh each load.
const daysAgo = (days: number) => new Date(Date.now() - days * 86400000).toISOString();
const usd = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export default async function DevOverviewPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (user.email !== process.env.DEVELOPER_EMAIL) redirect("/dashboard/client");

  const db = leadsDb();
  const [{ data: leadRows }, { data: orderRows }] = await Promise.all([
    db ? db.from("leads").select("*").order("created_at", { ascending: false }).limit(1000) : Promise.resolve({ data: null }),
    supabase.from("orders").select("id, service, package_name, price, status, client_email, created_at").order("created_at", { ascending: false }),
  ]);
  const leads = (leadRows as Lead[]) || [];
  const orders = orderRows || [];

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
  const monthAgo = daysAgo(30);
  const due = leads.filter((l) => l.next_follow_up && OPEN.includes(l.status) && l.next_follow_up <= today);
  const sum = (ls: Lead[]) => ls.reduce((n, l) => n + Number(l.quote_amount ?? 0), 0);

  const stats = [
    { label: "New leads (30 days)", value: leads.filter((l) => l.created_at >= monthAgo).length, icon: Inbox, color: "#2563eb" },
    { label: "Follow-ups due", value: due.length, icon: CalendarClock, color: due.length ? "#d97706" : "#64748b" },
    { label: "Quoted pipeline", value: usd(sum(leads.filter((l) => l.status === "quoted"))), icon: Flame, color: "#9C7208" },
    { label: "Won from leads", value: usd(sum(leads.filter((l) => l.status === "won"))), icon: Trophy, color: "#16a34a" },
    { label: "Active orders", value: orders.filter((o) => o.status === "in_progress" || o.status === "pending").length, icon: Package, color: "#0f172a" },
    { label: "Order revenue", value: usd(orders.filter((o) => o.status === "completed").reduce((n, o) => n + Number(o.price), 0)), icon: DollarSign, color: "#16a34a" },
  ];

  const bySource = Object.entries(
    leads.reduce<Record<string, { total: number; won: number }>>((acc, l) => {
      acc[l.source] ??= { total: 0, won: 0 };
      acc[l.source].total++;
      if (l.status === "won") acc[l.source].won++;
      return acc;
    }, {})
  ).sort((a, b) => b[1].total - a[1].total);
  const maxSource = Math.max(1, ...bySource.map(([, v]) => v.total));

  const card = "bg-white border border-slate-200 rounded-2xl p-5";

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Overview</h1>
        <p className="text-slate-600">Leads, follow-ups and orders at a glance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-4">
              <Icon className="w-4 h-4 text-slate-600 mb-2" />
              <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-slate-600">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <section className={card}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Follow up today</h2>
            <Link href="/dashboard/dev/leads" className="text-sm text-[#7A5807] hover:underline">All leads</Link>
          </div>
          {due.length === 0 ? (
            <p className="text-sm text-slate-600">Nothing due. You&apos;re caught up.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {due.slice(0, 6).map((l) => (
                <li key={l.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
                  <span className="truncate font-medium">{l.company || l.name || l.email}</span>
                  <span className="text-xs text-amber-700 flex-shrink-0">{l.next_follow_up === today ? "Today" : `Since ${l.next_follow_up}`}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={card}>
          <h2 className="font-semibold mb-4">Where leads come from</h2>
          {bySource.length === 0 ? (
            <p className="text-sm text-slate-600">No leads yet.</p>
          ) : (
            <ul className="space-y-3">
              {bySource.map(([source, v]) => (
                <li key={source} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span>{SOURCE_LABEL[source as LeadSource] ?? source}</span>
                    <span className="text-slate-600">{v.total}{v.won ? ` · ${v.won} won` : ""}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-[#B8860B]" style={{ width: `${(v.total / maxSource) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <section className={card}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Newest leads</h2>
            <Link href="/dashboard/dev/leads" className="text-sm text-[#7A5807] hover:underline inline-flex items-center gap-1">Open <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          {leads.length === 0 ? (
            <p className="text-sm text-slate-600">No leads yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {leads.slice(0, 6).map((l) => (
                <li key={l.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
                  <span className="truncate">
                    <span className="font-medium">{l.company || l.name || l.email}</span>
                    <span className="text-slate-500"> · {SOURCE_LABEL[l.source] ?? l.source}</span>
                  </span>
                  <span className="text-xs text-slate-500 flex-shrink-0">{new Date(l.created_at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={card}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent orders</h2>
            <Link href="/dashboard/dev/orders" className="text-sm text-[#7A5807] hover:underline inline-flex items-center gap-1">Open <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-sm text-slate-600">No orders yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {orders.slice(0, 6).map((o) => (
                <li key={o.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
                  <span className="truncate font-medium">{o.service} · {o.package_name}</span>
                  <span className="text-[#7A5807] font-semibold flex-shrink-0">${o.price}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
