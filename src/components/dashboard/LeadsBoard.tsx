"use client";

import { useMemo, useState, useTransition } from "react";
import { Plus, Search, Mail, Phone, Globe, CalendarClock, DollarSign, Inbox, Trophy, Flame, Trash2, ChevronLeft, ChevronRight, CreditCard, Copy, Check, MessageCircle } from "lucide-react";
import { LEAD_STATUSES, LEAD_SOURCES, LEAD_SOURCE_LABEL as SOURCE_LABEL, type Lead, type LeadStatus } from "@/lib/leadTypes";
import { updateLead, addLead, deleteLead, createLeadPaymentLink } from "@/app/dashboard/dev/leads/actions";
import type { LeadPayment } from "@/lib/razorpay";

const STATUS_META: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: "New", color: "#2563eb" },
  contacted: { label: "Contacted", color: "#7c3aed" },
  replied: { label: "Replied", color: "#0891b2" },
  call: { label: "Call", color: "#f59e0b" },
  quoted: { label: "Quoted", color: "#CC9A1A" },
  won: { label: "Won", color: "#16a34a" },
  lost: { label: "Lost", color: "#94a3b8" },
};

const OPEN: LeadStatus[] = ["new", "contacted", "replied", "call", "quoted"];
const PAGE_SIZE = 20;

const inputCls = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#B8860B]/50";
const btnCls = "text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all disabled:opacity-50";
const btnStyle = { background: "linear-gradient(135deg, #B8860B, #9C7208)" };

const today = () => new Date().toLocaleDateString("en-CA");
const usd = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

function StatusPill({ status }: { status: LeadStatus }) {
  const s = STATUS_META[status];
  return (
    <span className="text-xs px-2.5 py-1 rounded-full border flex-shrink-0" style={{ borderColor: `${s.color}40`, color: s.color, background: `${s.color}10` }}>
      {s.label}
    </span>
  );
}

const PAY_STATUS: Record<LeadPayment["status"], string> = {
  created: "text-[#7A5807] bg-[#B8860B]/10",
  paid: "text-green-700 bg-green-50",
  cancelled: "text-slate-500 bg-slate-100",
  expired: "text-slate-500 bg-slate-100",
};

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? "Copied" : "Copy"}
    </button>
  );
}

// Opens WhatsApp with the link prefilled. Only numbers with a country code (11+ digits)
// are used, since a bare 10-digit number could be US or Indian.
function WhatsAppButton({ lead, p }: { lead: Lead; p: { short_url: string; amount: number; currency: string; description: string } }) {
  const phone = lead.phone?.replace(/\D/g, "") ?? "";
  const hi = lead.name ? `Hi ${lead.name.split(" ")[0]}` : "Hi";
  const msg = `${hi}, here is the payment link for ${p.description} (${p.currency} ${p.amount}): ${p.short_url}\n\nThank you!\nAbhi, Amex Technology`;
  return (
    <a
      href={`https://wa.me/${phone.length >= 11 ? phone : ""}?text=${encodeURIComponent(msg)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-xs text-green-700 hover:text-green-800"
    >
      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
    </a>
  );
}

function PaymentPanel({ lead }: { lead: Lead }) {
  const payments = (Array.isArray(lead.meta?.payments) ? lead.meta.payments : []) as LeadPayment[];
  const [result, setResult] = useState<{ url?: string; error?: string } | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="border border-slate-200 rounded-xl p-4 space-y-3">
      <p className="flex items-center gap-1.5 text-sm font-semibold"><CreditCard className="w-4 h-4" /> Razorpay payment link</p>
      <form
        action={(fd) => startTransition(async () => setResult(await createLeadPaymentLink(fd)))}
        className="grid md:grid-cols-[110px_90px_1fr_auto] gap-2"
      >
        <input type="hidden" name="id" value={lead.id} />
        <input name="amount" inputMode="decimal" defaultValue={lead.quote_amount ?? 299} placeholder="299" className={inputCls} />
        <select name="currency" defaultValue="USD" className={inputCls}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
        <input name="description" placeholder={`${lead.service || "Website"} - Amex Technology`} className={inputCls} />
        <button type="submit" disabled={pending} className={btnCls} style={btnStyle}>{pending ? "Creating…" : "Create link"}</button>
      </form>
      {result?.error && <p className="text-sm text-red-600">{result.error}</p>}
      {result?.url && (
        <p className="flex flex-wrap items-center gap-2 text-sm">
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-[#7A5807] underline">{result.url}</a>
          <CopyButton value={result.url} />
        </p>
      )}
      {payments.length > 0 && (
        <ul className="divide-y divide-slate-100 text-sm">
          {[...payments].reverse().map((p) => (
            <li key={p.link_id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <span className="flex items-center gap-2 min-w-0">
                <span className={`text-xs px-2 py-0.5 rounded-full ${PAY_STATUS[p.status]}`}>{p.status}</span>
                <span className="font-semibold">{p.currency} {p.amount}</span>
                <span className="text-slate-600 truncate">{p.description}</span>
              </span>
              <span className="flex items-center gap-3 text-xs text-slate-600">
                {p.paid_at ? `Paid ${new Date(p.paid_at).toLocaleDateString()}` : new Date(p.created_at).toLocaleDateString()}
                {p.status === "created" && <CopyButton value={p.short_url} />}
                {p.status === "created" && <WhatsAppButton lead={lead} p={p} />}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const [expanded, setExpanded] = useState(false);
  const due = lead.next_follow_up && OPEN.includes(lead.status) && lead.next_follow_up <= today();
  const title = lead.company || lead.name || lead.email || "Unnamed lead";

  return (
    <div className={`bg-white border rounded-2xl overflow-hidden transition-all ${due ? "border-amber-300" : "border-slate-200 hover:border-slate-300"}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-4 min-w-0">
          <StatusPill status={lead.status} />
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{title}{lead.service ? ` · ${lead.service}` : ""}</p>
            <p className="text-xs text-slate-600 truncate">
              {SOURCE_LABEL[lead.source] ?? lead.source}
              {lead.company && lead.name ? ` · ${lead.name}` : ""}
              {lead.email ? ` · ${lead.email}` : ""}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          {lead.quote_amount != null && <p className="font-bold text-[#7A5807]">{usd(Number(lead.quote_amount))}</p>}
          {due ? (
            <p className="text-xs font-semibold text-amber-600">Follow up {lead.next_follow_up === today() ? "today" : `(overdue ${lead.next_follow_up})`}</p>
          ) : (
            <p className="text-xs text-slate-600">{new Date(lead.created_at).toLocaleDateString()}</p>
          )}
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-slate-200 pt-4 space-y-4">
          <div className="flex flex-wrap gap-4 text-sm">
            {lead.email && <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"><Mail className="w-4 h-4" />{lead.email}</a>}
            {lead.phone && <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"><Phone className="w-4 h-4" />{lead.phone}</a>}
            {lead.website && <a href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"><Globe className="w-4 h-4" />{lead.website}</a>}
            {lead.budget && <span className="flex items-center gap-1.5 text-slate-600"><DollarSign className="w-4 h-4" />Budget: {lead.budget}</span>}
          </div>

          {lead.message && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <p className="text-xs text-slate-600 mb-1">Message:</p>
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{lead.message}</p>
            </div>
          )}

          <PaymentPanel lead={lead} />

          <form action={updateLead} className="space-y-3">
            <input type="hidden" name="id" value={lead.id} />
            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">Status</label>
                <select name="status" defaultValue={lead.status} className={inputCls}>
                  {LEAD_STATUSES.map((s) => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">Quote ($)</label>
                <input name="quote_amount" inputMode="decimal" defaultValue={lead.quote_amount ?? ""} placeholder="299" className={inputCls} />
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">Next follow-up</label>
                <input name="next_follow_up" type="date" defaultValue={lead.next_follow_up ?? ""} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">Notes</label>
              <textarea name="notes" rows={3} defaultValue={lead.notes ?? ""} placeholder="Called, wants a quote form and own domain…" className={inputCls} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <button type="submit" className={btnCls} style={btnStyle}>Save</button>
              <button
                type="submit"
                formAction={deleteLead}
                onClick={(e) => { if (!confirm(`Delete ${title}?`)) e.preventDefault(); }}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function AddLeadForm({ onDone }: { onDone: () => void }) {
  return (
    <form
      action={async (fd) => { await addLead(fd); onDone(); }}
      className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 space-y-3"
    >
      <div className="grid md:grid-cols-3 gap-3">
        <input name="company" placeholder="Business (I Pipe And Construct)" className={inputCls} />
        <input name="name" placeholder="Contact name" className={inputCls} />
        <input name="email" type="email" placeholder="Email" className={inputCls} />
        <input name="phone" placeholder="Phone" className={inputCls} />
        <input name="website" placeholder="Website" className={inputCls} />
        <input name="service" placeholder="Service (Website, SEO…)" className={inputCls} />
        <select name="source" defaultValue="manual" className={inputCls}>
          {LEAD_SOURCES.map((s) => <option key={s} value={s}>{SOURCE_LABEL[s]}</option>)}
        </select>
        <select name="status" defaultValue="new" className={inputCls}>
          {LEAD_STATUSES.map((s) => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
        </select>
        <input name="quote_amount" inputMode="decimal" placeholder="Quote ($)" className={inputCls} />
      </div>
      <div className="grid md:grid-cols-[1fr_200px] gap-3">
        <textarea name="notes" rows={2} placeholder="Notes" className={inputCls} />
        <div>
          <label className="text-xs text-slate-600 mb-1.5 block">Next follow-up</label>
          <input name="next_follow_up" type="date" className={inputCls} />
        </div>
      </div>
      <button type="submit" className={btnCls} style={btnStyle}>Add lead</button>
    </form>
  );
}

export default function LeadsBoard({ leads, loadError }: { leads: Lead[]; loadError: string | null }) {
  const [filter, setFilter] = useState<"all" | "due" | LeadStatus>("all");
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);
  const [page, setPage] = useState(1);

  const t = today();
  const isDue = (l: Lead) => !!l.next_follow_up && OPEN.includes(l.status) && l.next_follow_up <= t;

  const stats = useMemo(() => {
    const sum = (ls: Lead[]) => ls.reduce((n, l) => n + Number(l.quote_amount ?? 0), 0);
    return {
      fresh: leads.filter((l) => l.status === "new").length,
      due: leads.filter(isDue).length,
      pipeline: sum(leads.filter((l) => l.status === "quoted")),
      won: sum(leads.filter((l) => l.status === "won")),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads, t]);

  const q = query.trim().toLowerCase();
  const filtered = leads
    .filter((l) => (filter === "all" ? true : filter === "due" ? isDue(l) : l.status === filter))
    .filter((l) => !q || [l.name, l.company, l.email, l.phone, l.website, l.service, l.notes].some((v) => v?.toLowerCase().includes(q)));
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const shown = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <>
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Leads</h1>
            <p className="text-slate-600">Every form submission and outreach reply, in one pipeline.</p>
          </div>
          <button onClick={() => setAdding(!adding)} className={`${btnCls} flex items-center gap-1.5`} style={btnStyle}>
            <Plus className="w-4 h-4" /> {adding ? "Close" : "Add lead"}
          </button>
        </div>

        {loadError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Couldn&apos;t load leads: {loadError}. Run <code>supabase/migrations/20261027000000_leads.sql</code> in Supabase and set <code>SUPABASE_SERVICE_ROLE_KEY</code>.
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "New", value: stats.fresh, icon: Inbox, color: "#2563eb" },
            { label: "Follow-ups due", value: stats.due, icon: CalendarClock, color: stats.due ? "#d97706" : "#64748b" },
            { label: "Quoted pipeline", value: usd(stats.pipeline), icon: Flame, color: "#CC9A1A" },
            { label: "Won", value: usd(stats.won), icon: Trophy, color: "#16a34a" },
          ].map((s) => {
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

        {adding && <AddLeadForm onDone={() => setAdding(false)} />}

        <div className="relative mb-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search name, business, email, notes…" className={`${inputCls} pl-9`} />
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "due", ...LEAD_STATUSES] as const).map((f) => {
            const count = f === "all" ? leads.length : f === "due" ? stats.due : leads.filter((l) => l.status === f).length;
            const label = f === "all" ? "All" : f === "due" ? "Follow-up due" : STATUS_META[f].label;
            return (
              <button
                key={f}
                onClick={() => { setFilter(f); setPage(1); }}
                className={`text-sm px-3 py-1.5 rounded-lg border transition-all ${
                  filter === f ? "border-[#B8860B] bg-[#B8860B]/10 text-[#7A5807]" : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
            <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No leads here</h3>
            <p className="text-slate-600">Form submissions show up automatically. Add outreach replies with &quot;Add lead&quot;.</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {shown.map((lead) => <LeadRow key={lead.id} lead={lead} />)}
            </div>
            {pages > 1 && (
              <div className="flex items-center justify-between gap-3 mt-6 text-sm">
                <p className="text-slate-600">
                  {(current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPage(current - 1)} disabled={current === 1} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 disabled:opacity-40">
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <span className="text-slate-600">Page {current} of {pages}</span>
                  <button onClick={() => setPage(current + 1)} disabled={current === pages} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 disabled:opacity-40">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
