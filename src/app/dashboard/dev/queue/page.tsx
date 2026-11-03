export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Inbox } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { outreachQueue, type QueueState } from "@/lib/outreachWorker";
import { approveAll } from "./actions";
import QueueCard from "@/components/dashboard/QueueCard";
import PendingButton from "@/components/dashboard/PendingButton";

export const metadata: Metadata = { title: "Email queue", robots: { index: false, follow: false } };

const TABS = [
  { key: "waiting", label: "Waiting to send" },
  { key: "drafts", label: "Drafts to review" },
  { key: "skipped", label: "Skipped" },
  { key: "sent", label: "Sent" },
] as const;
type Tab = (typeof TABS)[number]["key"];
type Item = QueueState["queue"][number];
const inTab = (q: Item, tab: Tab) =>
  tab === "sent" ? !!q.sent : q.sent ? false : tab === "skipped" ? !!q.skipped : !q.skipped && (tab === "waiting" ? q.approved : !q.approved);

export default async function QueuePage({ searchParams }: { searchParams: Promise<{ tab?: string; error?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (user.email !== process.env.DEVELOPER_EMAIL) redirect("/dashboard/client");

  let state: QueueState | null = null;
  let error = "";
  try {
    state = await outreachQueue();
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }
  const queue = state?.queue ?? [];
  const count = (t: Tab) => queue.filter((q) => inTab(q, t)).length;
  const params = await searchParams;
  const asked = params.tab as Tab | undefined;
  const tab: Tab = TABS.some((t) => t.key === asked) ? asked! : count("drafts") ? "drafts" : "waiting";
  const shown = queue.filter((q) => inTab(q, tab)).sort((a, b) => (tab === "sent" ? b.sent.localeCompare(a.sent) : 0));

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Email queue</h1>
          <p className="text-sm text-slate-600 mt-1">Cold emails: one approved email goes out every 10 minutes from 8 AM Los Angeles time (9:30 PM India), Monday to Saturday.</p>
        </div>
        {count("drafts") > 0 && (
          <form action={approveAll}>
            <PendingButton className="text-white font-semibold px-4 py-2 rounded-lg text-sm" style={{ background: "linear-gradient(135deg, #B8860B, #9C7208)" }}>Approve all {count("drafts")} drafts</PendingButton>
          </form>
        )}
      </div>

      {params.error && <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">{params.error.slice(0, 300)}</div>}
      {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Could not load the queue: {error}</div>}

      {state && (
        <>
          {!state.enabled && <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">Sending is paused. Nothing goes out until it is turned back on.</div>}
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Sent today", value: `${state.sent_today} / ${state.daily_limit}` },
              { label: "Emailed in total", value: state.emailed_total },
              { label: "Replies", value: state.replied_total },
              { label: "Leads left to email", value: state.not_contacted },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-xl px-4 py-3">
                <dd className="text-xl font-bold text-slate-900">{s.value}</dd>
                <dt className="text-xs text-slate-600">{s.label}</dt>
              </div>
            ))}
          </dl>

          <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 mb-4" aria-label="Queue sections">
            {TABS.map((t) => (
              <Link key={t.key} href={`/dashboard/dev/queue?tab=${t.key}`} aria-current={tab === t.key ? "page" : undefined} className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${tab === t.key ? "border-[#B8860B] text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
                {t.label} <span className="ml-1 text-xs rounded-full bg-slate-100 px-1.5 py-0.5 text-slate-600">{count(t.key)}</span>
              </Link>
            ))}
          </nav>

          {shown.length === 0 ? (
            <div className="text-center py-14 bg-white border border-slate-200 rounded-2xl">
              <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 text-sm">{tab === "drafts" ? "No drafts to review. New ones are written every morning (7:30 PM India time)." : tab === "waiting" ? "Nothing approved is waiting." : tab === "skipped" ? "Nothing skipped." : "Nothing sent from this queue yet."}</p>
            </div>
          ) : (
            <ul className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
              {shown.map((q) => <QueueCard key={q.id} item={q} tab={tab} />)}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
