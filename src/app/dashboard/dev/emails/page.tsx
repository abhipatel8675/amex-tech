export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Mail, BellOff } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { leadsDb } from "@/lib/leads";
import { TEMPLATES, type LeadEmail } from "@/lib/leadEmails";
import { setUnsubscribed } from "./actions";

export const metadata: Metadata = { title: "Emails", robots: { index: false, follow: false } };

const inputCls = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#B8860B]/50";
const card = "bg-white border border-slate-200 rounded-2xl";
const when = (iso: string) => new Date(iso).toLocaleString("en-US", { timeZone: "America/Los_Angeles", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();
const label = (key: string) => TEMPLATES.find((t) => t.key === key)?.label ?? key;

export default async function EmailsPage({ searchParams }: { searchParams: Promise<{ q?: string; t?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (user.email !== process.env.DEVELOPER_EMAIL) redirect("/dashboard/client");

  const { q = "", t = "" } = await searchParams;
  const db = leadsDb();
  const [emailsRes, offRes, leadsRes] = db
    ? await Promise.all([
        db.from("lead_emails").select("id, lead_id, to_email, subject, body, template, created_at").order("created_at", { ascending: false }).limit(500),
        db.from("email_unsubscribes").select("email, source, created_at").order("created_at", { ascending: false }),
        db.from("leads").select("id, company, name"),
      ])
    : [{ data: [], error: { message: "SUPABASE_SERVICE_ROLE_KEY is not set" } }, { data: [] }, { data: [] }];
  const error = emailsRes.error?.message;
  const names = new Map((leadsRes.data ?? []).map((l: { id: string; company: string | null; name: string | null }) => [l.id, l.company || l.name || ""]));
  const all = (emailsRes.data ?? []) as LeadEmail[];
  const needle = q.trim().toLowerCase();
  const emails = all.filter((e) => (!t || e.template === t) && (!needle || [e.to_email, e.subject, names.get(e.lead_id ?? "")].some((v) => v?.toLowerCase().includes(needle))));
  const weekAgo = daysAgo(7);
  const off = (offRes.data ?? []) as { email: string; source: string; created_at: string }[];

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-1">Emails</h1>
      <p className="text-slate-600 mb-8">Every email sent to a lead from this dashboard, newest first. To write one, open a lead and press Email.</p>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Couldn&apos;t load emails: {error}. Run <code>supabase/migrations/20261103000000_lead_emails.sql</code> in the Supabase SQL editor.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Sent in the last 7 days", value: all.filter((e) => e.created_at >= weekAgo).length },
          { label: "Sent in total", value: all.length },
          { label: "Unsubscribed", value: off.length },
        ].map((s) => (
          <div key={s.label} className={`${card} p-4`}>
            <div className="text-2xl font-bold mb-1">{s.value}</div>
            <div className="text-xs text-slate-600">{s.label}</div>
          </div>
        ))}
      </div>

      <form className="grid md:grid-cols-[1fr_220px_auto] gap-2 mb-4">
        <input name="q" defaultValue={q} placeholder="Search by email, subject or business" className={inputCls} />
        <select name="t" defaultValue={t} aria-label="Type" className={inputCls}>
          <option value="">All types</option>
          {TEMPLATES.map((x) => <option key={x.key} value={x.key}>{x.label}</option>)}
        </select>
        <button type="submit" className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:border-slate-300">Filter</button>
      </form>

      <ul className={`${card} divide-y divide-slate-100 mb-10`}>
        {emails.length === 0 && (
          <li className="p-10 text-center">
            <Mail className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600">{q || t ? "No emails match." : "No emails sent yet."} <Link href="/dashboard/dev/leads" className="text-[#7A5807] underline">Open Leads</Link> and press Email on a lead.</p>
          </li>
        )}
        {emails.map((e) => (
          <li key={e.id} className="px-5 py-3 text-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium break-words">{e.subject}</p>
                <p className="text-xs text-slate-600 break-all">To {e.to_email}{e.lead_id && names.get(e.lead_id) ? ` · ${names.get(e.lead_id)}` : ""}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs rounded-full bg-slate-100 text-slate-600 px-2.5 py-1">{label(e.template)}</span>
                <span className="text-xs text-slate-500">{when(e.created_at)}</span>
              </div>
            </div>
            <details className="mt-1">
              <summary className="text-xs text-[#B8860B] cursor-pointer select-none">View email</summary>
              <p className="mt-2 whitespace-pre-wrap break-words rounded-lg bg-slate-50 p-3 text-[13px] text-slate-800">{e.body}</p>
            </details>
          </li>
        ))}
      </ul>

      <section className={card}>
        <div className="px-5 py-3 border-b border-slate-100">
          <p className="font-semibold">Unsubscribed ({off.length})</p>
          <p className="text-xs text-slate-600">Nobody on this list can be emailed from the dashboard. Add anyone who replies &quot;stop&quot; or &quot;not interested&quot;.</p>
        </div>
        <form action={setUnsubscribed} className="flex flex-wrap gap-2 px-5 py-3">
          <input name="email" type="email" required placeholder="name@company.com" className={`${inputCls} flex-1 min-w-[220px]`} />
          <button type="submit" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:border-slate-300"><BellOff className="w-4 h-4" /> Unsubscribe</button>
        </form>
        <ul className="divide-y divide-slate-100">
          {off.map((u) => (
            <li key={u.email} className="flex flex-wrap items-center justify-between gap-2 px-5 py-2 text-sm">
              <span className="break-all">{u.email} <span className="text-xs text-slate-500">· {when(u.created_at)}</span></span>
              <form action={setUnsubscribed}>
                <input type="hidden" name="email" value={u.email} />
                <input type="hidden" name="remove" value="1" />
                <button type="submit" className="text-xs text-slate-600 hover:text-slate-900 underline">Undo</button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
