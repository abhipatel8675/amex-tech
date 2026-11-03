export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Play } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { finderSettings, type FinderState } from "@/lib/outreachWorker";
import PendingButton from "@/components/dashboard/PendingButton";
import { runNow, saveSources } from "./actions";

export const metadata: Metadata = { title: "Lead sources", robots: { index: false, follow: false } };

const inputCls = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#B8860B]/50";
const card = "bg-white border border-slate-200 rounded-2xl p-5";
const gold = { background: "linear-gradient(135deg, #B8860B, #9C7208)" };

export default async function LeadSourcesPage({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string; started?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (user.email !== process.env.DEVELOPER_EMAIL) redirect("/dashboard/client");

  const params = await searchParams;
  let s: FinderState | null = null;
  let loadError = "";
  try {
    s = await finderSettings();
  } catch (e) {
    loadError = e instanceof Error ? e.message : String(e);
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Lead sources</h1>
      <p className="text-sm text-slate-600 mt-1 mb-6">Where new businesses to email come from, and which cities and trades the lead finder searches.</p>

      {params.error && <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">{params.error.slice(0, 400)}</div>}
      {params.saved && <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">Saved. The next run searches these cities and trades.</div>}
      {params.started && <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">The lead finder is running. New leads appear here in 10 to 30 minutes.</div>}
      {loadError && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">Could not load the lead finder: {loadError}</div>}

      {s && (
        <>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Leads waiting to be emailed", value: s.waiting_total },
              { label: "Found by the lead finder", value: s.found_total },
              { label: "Lists searched", value: `${s.searched} / ${s.total}` },
              { label: "Runs by itself", value: "Mondays" },
            ].map((x) => (
              <div key={x.label} className="bg-white border border-slate-200 rounded-xl px-4 py-3">
                <dd className="text-xl font-bold text-slate-900">{x.value}</dd>
                <dt className="text-xs text-slate-600">{x.label}</dt>
              </div>
            ))}
          </dl>

          <section className={`${card} mb-6`}>
            <h2 className="font-semibold mb-2">How it works</h2>
            <ol className="text-sm text-slate-700 space-y-1 list-decimal pl-5">
              <li>For every city and trade below, it opens expertise.com&apos;s &quot;best [trade] in [city], California&quot; list.</li>
              <li>For each business on the list it visits their own website and picks up their email address. Businesses without one are dropped.</li>
              <li>New businesses go to the lead list. Each morning the AI checks their websites and drafts emails for the Queue.</li>
            </ol>
            <p className="text-xs text-slate-500 mt-2">Each run searches up to the number of lists below and stops at the weekly amount of new leads. Lists already searched are skipped, so adding a city only searches the new one.</p>
          </section>

          <form action={saveSources} className={`${card} mb-6 space-y-4`}>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium">Cities <span className="text-slate-500 font-normal">({s.cities.length}, one per line, California)</span></span>
                <textarea name="cities" rows={12} defaultValue={s.cities.join("\n")} className={`${inputCls} mt-1 font-mono text-[13px]`} />
                <span className="text-xs text-slate-500">Write it like the web address: long-beach, santa-ana, rancho-cucamonga.</span>
              </label>
              <label className="block">
                <span className="text-sm font-medium">Trades <span className="text-slate-500 font-normal">({s.trades.length}, one per line)</span></span>
                <textarea name="trades" rows={12} defaultValue={s.trades.join("\n")} className={`${inputCls} mt-1 font-mono text-[13px]`} />
                <span className="text-xs text-slate-500">As expertise.com names them: plumbing, roofing, hvac, electricians…</span>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <label className="block">
                <span className="text-sm font-medium">New leads per run</span>
                <input name="weekly_target" type="number" min={10} max={500} defaultValue={s.weekly_target} className={`${inputCls} mt-1`} />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Lists per run</span>
                <input name="max_pages_per_run" type="number" min={10} max={300} defaultValue={s.max_pages_per_run} className={`${inputCls} mt-1`} />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <PendingButton className="text-white font-semibold px-5 py-2 rounded-lg text-sm" style={gold}>Save</PendingButton>
              <PendingButton formAction={runNow} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A5807] border border-[#B8860B]/40 rounded-lg px-4 py-2 hover:bg-[#B8860B]/10"><Play className="w-4 h-4" /> Run now</PendingButton>
              <span className="text-xs text-slate-500">Save first if you changed anything, then Run now.</span>
            </div>
          </form>

          <section className={card}>
            <h2 className="font-semibold mb-3">Leads found per city</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500">
                  <th className="font-medium pb-2">City</th>
                  <th className="font-medium pb-2 text-right">Found</th>
                  <th className="font-medium pb-2 text-right">Not emailed yet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {s.by_city.map((c) => (
                  <tr key={c.city}>
                    <td className="py-1.5">{c.city}</td>
                    <td className="py-1.5 text-right tabular-nums">{c.total}</td>
                    <td className="py-1.5 text-right tabular-nums text-slate-600">{c.waiting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {s.cities_done.length > 0 && <p className="text-xs text-slate-500 mt-3">Fully searched: {s.cities_done.join(", ")}. Add new cities to keep finding leads.</p>}
          </section>
        </>
      )}
    </main>
  );
}
