export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { outreachQueue, type QueueState } from "@/lib/outreachWorker";
import { approveAll, removeEmail, saveEmail } from "./actions";

export const metadata: Metadata = { title: "Email queue", robots: { index: false, follow: false } };

const inputCls = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#B8860B]/50";
const btnCls = "text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all disabled:opacity-50";
const btnStyle = { background: "linear-gradient(135deg, #B8860B, #9C7208)" };
const card = "bg-white border border-slate-200 rounded-2xl p-5";
const when = (iso: string) => (/^\d{4}-/.test(iso) ? new Date(iso).toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "medium", timeStyle: "short" }) + " LA" : "earlier");

export default async function QueuePage() {
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
  const open = state?.queue.filter((q) => !q.sent) ?? [];
  const sent = (state?.queue.filter((q) => q.sent) ?? []).sort((a, b) => b.sent.localeCompare(a.sent));
  const waiting = open.filter((q) => q.approved && !q.skipped).length;
  const drafts = open.filter((q) => !q.approved).length;

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-1">Email queue</h1>
      <p className="text-slate-600 mb-8">Edit and approve the next cold emails. One approved email goes out every 10 minutes from 8 AM Los Angeles time, Monday to Saturday.</p>

      {error && <div className={`${card} mb-6 text-red-700`}>Could not load the queue: {error}</div>}

      {state && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Sent today", value: `${state.sent_today} / ${state.daily_limit}` },
              { label: "Approved, waiting", value: waiting },
              { label: "Drafts to review", value: drafts },
              { label: "Emailed in total", value: state.emailed_total, sub: `${state.replied_total} replied` },
              { label: "Leads not contacted", value: state.not_contacted },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="text-2xl font-bold mb-1 text-slate-900">{s.value}</div>
                <div className="text-xs text-slate-700">{s.label}</div>
                {s.sub && <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>}
              </div>
            ))}
          </div>
          {!state.enabled && <div className={`${card} mb-6 text-amber-800`}>Sending is paused (config.json &quot;enabled&quot; is false). Nothing goes out until it is turned back on.</div>}

          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <h2 className="font-semibold">To send ({open.length})</h2>
            {drafts > 0 && (
              <form action={approveAll}>
                <button type="submit" className={btnCls} style={btnStyle}>Approve all {drafts}</button>
              </form>
            )}
          </div>
          {open.length === 0 && <p className={`${card} text-slate-600 mb-8`}>Nothing waiting. Ask Claude for the next batch of drafts.</p>}
          <div className="space-y-4 mb-10">
            {open.map((q) => (
              <section key={q.id} className={card}>
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <p className="font-semibold break-words">{q.business}</p>
                    <p className="text-xs text-slate-600 break-all">{q.email}{q.website ? ` · ${q.website}` : ""}</p>
                    {q.problem && <p className="text-xs text-slate-500 mt-0.5">Problem found: {q.problem}</p>}
                  </div>
                  <span className={`text-xs font-medium rounded-full px-2.5 py-1 ${q.skipped ? "bg-slate-100 text-slate-600" : q.approved ? "bg-amber-50 text-amber-800" : "bg-slate-100 text-slate-600"}`}>
                    {q.skipped ? `Skipped: ${q.skipped}` : q.approved ? "Approved, waiting" : "Draft"}
                  </span>
                </div>
                <form action={saveEmail} className="space-y-2">
                  <input type="hidden" name="id" value={q.id} />
                  <input name="subject" defaultValue={q.subject} maxLength={200} aria-label="Subject" className={`${inputCls} font-medium`} />
                  <textarea name="body" defaultValue={q.body} rows={8} maxLength={5000} aria-label="Email text" className={inputCls} />
                  <p className="text-xs text-slate-500">&quot;Best, Abhi Patel&quot; and the address footer are added when it is sent.</p>
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="approved" defaultChecked={q.approved} className="size-4 accent-[#B8860B]" /> Approved to send
                    </label>
                    <button type="submit" className={btnCls} style={btnStyle}>Save</button>
                  </div>
                </form>
                <form action={removeEmail} className="mt-2">
                  <input type="hidden" name="id" value={q.id} />
                  <button type="submit" className="text-xs text-red-700 hover:underline">Remove from queue</button>
                </form>
              </section>
            ))}
          </div>

          <h2 className="font-semibold mb-3">Sent ({sent.length})</h2>
          <ul className={`${card} divide-y divide-slate-100`}>
            {sent.length === 0 && <li className="text-sm text-slate-600">Nothing sent from this batch yet.</li>}
            {sent.map((q) => (
              <li key={q.id} className="py-3 text-sm">
                <div className="flex flex-wrap justify-between gap-2">
                  <span className="font-medium break-words">{q.subject}</span>
                  <span className="text-xs text-emerald-700">Sent {when(q.sent)}</span>
                </div>
                <p className="text-xs text-slate-600 break-all">{q.business} · {q.email}</p>
                <details className="mt-1">
                  <summary className="text-xs text-[#B8860B] cursor-pointer select-none">Read email</summary>
                  <p className="mt-2 whitespace-pre-wrap break-words rounded-lg bg-slate-50 p-3 text-[13px] text-slate-800">{q.body}</p>
                </details>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
