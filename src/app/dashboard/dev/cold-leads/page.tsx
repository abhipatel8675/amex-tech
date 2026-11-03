export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { coldLeads, type ColdLead } from "@/lib/outreachWorker";
import ColdLeadActions from "@/components/dashboard/ColdLeadActions";

export const metadata: Metadata = { title: "Cold leads", robots: { index: false, follow: false } };

const FILTERS = [
  { key: "waiting", label: "Not emailed yet", match: (l: ColdLead) => l.status === "new" },
  { key: "queue", label: "In the queue", match: (l: ColdLead) => l.status.startsWith("queue_") },
  { key: "emailed", label: "Emailed", match: (l: ColdLead) => ["contacted", "followed_up", "done"].includes(l.status) },
  { key: "replied", label: "Replied", match: (l: ColdLead) => l.status === "replied" },
  { key: "skipped", label: "Skipped", match: (l: ColdLead) => ["skipped", "bounced", "optout"].includes(l.status) },
  { key: "all", label: "All", match: () => true },
] as const;

const STATUS: Record<string, [string, string]> = {
  new: ["Not emailed yet", "bg-sky-50 text-sky-700"],
  queue_draft: ["Draft in queue", "bg-sky-50 text-sky-700"],
  queue_approved: ["Approved, sending soon", "bg-amber-50 text-amber-800"],
  contacted: ["Emailed", "bg-violet-50 text-violet-700"],
  followed_up: ["Followed up", "bg-violet-50 text-violet-700"],
  done: ["Done", "bg-slate-100 text-slate-600"],
  replied: ["Replied", "bg-emerald-50 text-emerald-700"],
  optout: ["Opted out", "bg-slate-100 text-slate-600"],
  bounced: ["Bounced", "bg-red-50 text-red-700"],
  skipped: ["Skipped", "bg-slate-100 text-slate-600"],
};
const PAGE = 50;
const title = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const day = (iso: string) => (iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "");

export default async function ColdLeadsPage({ searchParams }: { searchParams: Promise<{ f?: string; q?: string; p?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (user.email !== process.env.DEVELOPER_EMAIL) redirect("/dashboard/client");

  const { f = "waiting", q = "", p = "1" } = await searchParams;
  let leads: ColdLead[] = [];
  let error = "";
  try {
    leads = (await coldLeads()).leads;
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }
  const filter = FILTERS.find((x) => x.key === f) ?? FILTERS[0];
  const needle = q.trim().toLowerCase();
  const list = leads.filter(filter.match).filter((l) => !needle || [l.business, l.email, l.city, l.category, l.website].some((v) => v?.toLowerCase().includes(needle)));
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const page = Math.min(pages, Math.max(1, Number(p) || 1));
  const shown = list.slice((page - 1) * PAGE, page * PAGE);
  const href = (o: Record<string, string>) => `/dashboard/dev/cold-leads?${new URLSearchParams({ f: filter.key, ...(q ? { q } : {}), ...o })}`;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Cold leads</h1>
          <p className="text-sm text-slate-600 mt-1">Every business found for cold email. The AI picks from &quot;Not emailed yet&quot; each morning and drafts emails into the Queue.</p>
        </div>
        <Link href="/dashboard/dev/lead-sources" className="text-sm font-semibold text-[#7A5807] border border-[#B8860B]/40 rounded-lg px-3 py-2 hover:bg-[#B8860B]/10">Find more leads</Link>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">Could not load leads: {error}</div>}

      <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 mb-4" aria-label="Lead status">
        {FILTERS.map((x) => (
          <Link key={x.key} href={`/dashboard/dev/cold-leads?${new URLSearchParams({ f: x.key, ...(q ? { q } : {}) })}`} aria-current={x.key === filter.key ? "page" : undefined} className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${x.key === filter.key ? "border-[#B8860B] text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            {x.label} <span className="ml-1 text-xs rounded-full bg-slate-100 px-1.5 py-0.5 text-slate-600">{leads.filter(x.match).length}</span>
          </Link>
        ))}
      </nav>

      <form className="mb-4">
        <input type="hidden" name="f" value={filter.key} />
        <input name="q" defaultValue={q} placeholder="Search business, email, city or trade" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#B8860B]/50" />
      </form>

      {shown.length === 0 ? (
        <p className="text-center py-14 bg-white border border-slate-200 rounded-2xl text-sm text-slate-600">No leads here.</p>
      ) : (
        <ul className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
          {shown.map((l) => {
            const [label, tone] = STATUS[l.status] ?? [l.status, "bg-slate-100 text-slate-600"];
            return (
              <li key={l.id} className="px-4 py-3 flex flex-wrap items-start gap-x-3 gap-y-2">
                <div className="min-w-0 flex-1 basis-full sm:basis-auto">
                  <p className="text-sm font-semibold truncate">{l.business}{l.first_name ? <span className="font-normal text-slate-500"> · {l.first_name}</span> : null}</p>
                  <p className="text-xs text-slate-600 truncate">{l.email} · {l.city || "?"} · {title(l.category || "")} · {l.source}</p>
                  {(l.status === "skipped" || l.status === "bounced") && l.notes && <p className="text-xs text-slate-500 truncate">{l.notes}</p>}
                  {l.last_sent_at && <p className="text-xs text-slate-500 truncate">Emailed {day(l.last_sent_at)}{l.subject ? `: "${l.subject}"` : ""}{l.replied_at ? ` · replied ${day(l.replied_at)}` : ""}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {l.status.startsWith("queue_") ? (
                    <Link href={`/dashboard/dev/queue?tab=${l.status === "queue_approved" ? "waiting" : "drafts"}#${l.id}`} className={`text-xs font-medium rounded-full px-2.5 py-1 whitespace-nowrap hover:underline ${tone}`}>{label} →</Link>
                  ) : (
                    <span className={`text-xs font-medium rounded-full px-2.5 py-1 whitespace-nowrap ${tone}`}>{label}</span>
                  )}
                  {l.website && (
                    <a href={l.website.startsWith("http") ? l.website : `https://${l.website}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${l.business} website`} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
                {l.status === "new" && <ColdLeadActions id={l.id} business={l.business} firstName={l.first_name} />}
              </li>
            );
          })}
        </ul>
      )}

      {pages > 1 && (
        <div className="flex items-center justify-between gap-3 mt-4 text-sm">
          <p className="text-slate-600">{(page - 1) * PAGE + 1}–{Math.min(page * PAGE, list.length)} of {list.length}</p>
          <div className="flex items-center gap-2">
            {page > 1 && <Link href={href({ p: String(page - 1) })} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300"><ChevronLeft className="w-4 h-4" /> Prev</Link>}
            <span className="text-slate-600">Page {page} of {pages}</span>
            {page < pages && <Link href={href({ p: String(page + 1) })} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300">Next <ChevronRight className="w-4 h-4" /></Link>}
          </div>
        </div>
      )}
    </main>
  );
}
