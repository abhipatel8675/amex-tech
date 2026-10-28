export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Send, MessageSquareReply, AlertTriangle, UserX, Clock, Ban } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { leadsDb } from "@/lib/leads";
import { loadOutreachSnapshot, type OutreachContact } from "@/lib/outreach";

export const metadata: Metadata = {
  title: "Outreach",
  robots: { index: false, follow: false },
};

const EMAILED = ["contacted", "followed_up", "done", "replied", "optout", "bounced"];
const pct = (n: number, d: number) => (d ? `${Math.round((n / d) * 1000) / 10}%` : "–");
const day = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
// Server-rendered on every request, so "today" is fresh each load.
const lastDays = (n: number) => Array.from({ length: n }, (_, i) => day(new Date(Date.now() - (n - 1 - i) * 86400000).toISOString()));
const title = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function breakdown(contacts: OutreachContact[], key: "category" | "city") {
  const rows = new Map<string, { sent: number; replied: number }>();
  for (const c of contacts) {
    if (!EMAILED.includes(c.status)) continue;
    const k = c[key] || "Unknown";
    const r = rows.get(k) ?? { sent: 0, replied: 0 };
    r.sent++;
    if (c.status === "replied") r.replied++;
    rows.set(k, r);
  }
  return [...rows.entries()].sort((a, b) => b[1].replied - a[1].replied || b[1].sent - a[1].sent).slice(0, 10);
}

export default async function OutreachPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (user.email !== process.env.DEVELOPER_EMAIL) redirect("/dashboard/client");

  const db = leadsDb();
  const snap = db ? await loadOutreachSnapshot(db) : null;
  const contacts = snap?.contacts ?? [];
  const emailed = contacts.filter((c) => EMAILED.includes(c.status));
  const count = (s: string) => contacts.filter((c) => c.status === s).length;
  const replied = count("replied");
  const bounced = count("bounced");

  const stats = [
    { label: "Emailed", value: emailed.length, sub: `${count("new")} waiting to send`, icon: Send, color: "#0f172a" },
    { label: "Replied", value: replied, sub: `${pct(replied, emailed.length)} reply rate`, icon: MessageSquareReply, color: "#16a34a" },
    { label: "Bounced", value: bounced, sub: `${pct(bounced, emailed.length)} (keep under 2%)`, icon: AlertTriangle, color: bounced / Math.max(1, emailed.length) > 0.02 ? "#dc2626" : "#64748b" },
    { label: "Opted out", value: count("optout"), sub: pct(count("optout"), emailed.length), icon: UserX, color: "#64748b" },
    { label: "Skipped", value: count("skipped"), sub: "site fixed, no mail server, role address…", icon: Ban, color: "#64748b" },
  ];

  // Sends per day for the last 14 days.
  const days = lastDays(14);
  const perDay = days.map((d) => ({ d, n: contacts.filter((c) => c.last_sent_at && day(c.last_sent_at) === d).length }));
  const maxDay = Math.max(1, ...perDay.map((p) => p.n));

  const replies = contacts
    .filter((c) => c.status === "replied")
    .sort((a, b) => (b.replied_at || "").localeCompare(a.replied_at || ""))
    .slice(0, 10);
  const card = "bg-white border border-slate-200 rounded-2xl p-5";

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Outreach</h1>
          <p className="text-slate-600">Cold email results, updated automatically after every run.</p>
        </div>
        {snap && (
          <div className="text-right text-sm">
            <p className={`font-semibold ${snap.enabled ? "text-emerald-700" : "text-amber-700"}`}>Sending {snap.enabled ? "on" : "paused"}</p>
            <p className="text-slate-500 flex items-center gap-1 justify-end"><Clock className="w-3.5 h-3.5" /> Updated {new Date(snap.synced_at).toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "medium", timeStyle: "short" })}</p>
          </div>
        )}
      </div>

      {!snap ? (
        <div className={`${card} text-slate-600`}>No outreach data yet. It appears after the next outreach run.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-4">
                  <Icon className="w-4 h-4 text-slate-600 mb-2" />
                  <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-slate-700">{s.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
                </div>
              );
            })}
          </div>

          <section className={`${card} mb-4`}>
            <h2 className="font-semibold mb-4">Emails sent, last 14 days</h2>
            <div className="flex items-end gap-1.5 h-32" role="img" aria-label="Emails sent per day">
              {perDay.map((p) => (
                <div key={p.d} className="flex-1 flex flex-col items-center justify-end h-full" title={`${p.d}: ${p.n}`}>
                  {p.n > 0 && <span className="text-[10px] text-slate-500 mb-0.5">{p.n}</span>}
                  <div className="w-full rounded-t bg-[#B8860B]" style={{ height: `${(p.n / maxDay) * 100}%`, minHeight: p.n ? 2 : 0 }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
              <span>{days[0].slice(5)}</span>
              <span>{days[13].slice(5)}</span>
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {(["category", "city"] as const).map((key) => (
              <section key={key} className={card}>
                <h2 className="font-semibold mb-3">{key === "category" ? "By trade" : "By city"}</h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500">
                      <th className="font-medium pb-2">{key === "category" ? "Trade" : "City"}</th>
                      <th className="font-medium pb-2 text-right">Sent</th>
                      <th className="font-medium pb-2 text-right">Replies</th>
                      <th className="font-medium pb-2 text-right">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {breakdown(contacts, key).map(([name, r]) => (
                      <tr key={name}>
                        <td className="py-1.5">{title(name)}</td>
                        <td className="py-1.5 text-right tabular-nums">{r.sent}</td>
                        <td className="py-1.5 text-right tabular-nums">{r.replied}</td>
                        <td className="py-1.5 text-right tabular-nums text-slate-600">{pct(r.replied, r.sent)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ))}
          </div>

          <section className={card}>
            <h2 className="font-semibold mb-3">Replies</h2>
            {replies.length === 0 ? (
              <p className="text-sm text-slate-600">No replies yet.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {replies.map((c) => (
                  <li key={c.id} className="py-2.5 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="font-medium truncate">{c.business || c.email}</span>
                      <span className="text-xs text-slate-500 flex-shrink-0">{c.replied_at ? day(c.replied_at) : ""}</span>
                    </div>
                    <p className="text-xs text-slate-600 truncate">{c.reply_snippet || c.subject}</p>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-xs text-slate-500 mt-3">Every reply is also added to Leads automatically, with a follow-up due the same day.</p>
          </section>
        </>
      )}
    </main>
  );
}
