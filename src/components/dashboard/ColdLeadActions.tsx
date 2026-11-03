"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Loader2, PenLine, X } from "lucide-react";
import { aiDraftLead, writeToQueue } from "@/app/dashboard/dev/cold-leads/actions";

const inputCls = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#B8860B]/50";
const small = "inline-flex items-center gap-1 text-xs font-semibold rounded-lg px-2.5 py-1.5 border disabled:opacity-50";

export default function ColdLeadActions({ id, business, firstName }: { id: string; business: string; firstName: string }) {
  const router = useRouter();
  const [busy, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [writing, setWriting] = useState(false);
  const [subject, setSubject] = useState(`${business} website`);
  const [body, setBody] = useState(`Hi${firstName ? ` ${firstName}` : ""},\n\n`);
  const [approved, setApproved] = useState(false);

  const ai = () =>
    start(async () => {
      setMsg(null);
      const r = await aiDraftLead(id);
      setMsg({ ok: r.ok, text: r.message });
      if (r.ok) router.refresh();
    });

  const save = () =>
    start(async () => {
      const r = await writeToQueue({ id, subject, body, approved });
      setMsg({ ok: r.ok, text: r.message });
      if (r.ok) {
        setWriting(false);
        router.refresh();
      }
    });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 justify-end">
        <button type="button" onClick={ai} disabled={busy} className={`${small} border-[#B8860B]/40 text-[#7A5807] hover:bg-[#B8860B]/10`}>
          {busy && !writing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} {busy && !writing ? "Checking site…" : "AI draft"}
        </button>
        <button type="button" onClick={() => setWriting(!writing)} disabled={busy} className={`${small} border-slate-200 text-slate-700 hover:border-slate-300`}>
          <PenLine className="w-3.5 h-3.5" /> Write email
        </button>
      </div>
      {msg && (
        <p className={`mt-2 text-xs rounded-lg px-2.5 py-1.5 ${msg.ok ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
          {msg.text} {msg.ok && <Link href="/dashboard/dev/queue?tab=drafts" className="underline font-semibold">Open Queue</Link>}
        </p>
      )}
      {writing && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-600">Email to {business}. It goes into the Queue and is sent in LA business hours.</p>
            <button type="button" onClick={() => setWriting(false)} aria-label="Close" className="p-1 rounded text-slate-500 hover:bg-slate-100"><X className="w-4 h-4" /></button>
          </div>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} aria-label="Subject" className={`${inputCls} font-medium`} />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={7} maxLength={5000} aria-label="Email text" className={inputCls} />
          <p className="text-xs text-slate-500">&quot;Best, Abhi Patel&quot; and the address footer are added when it is sent. No links or prices in cold emails.</p>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={approved} onChange={(e) => setApproved(e.target.checked)} className="size-4 accent-[#B8860B]" /> Approved to send</label>
            <button type="button" onClick={save} disabled={busy} className="text-white font-semibold px-4 py-2 rounded-lg text-sm disabled:opacity-50" style={{ background: "linear-gradient(135deg, #B8860B, #9C7208)" }}>
              {busy ? "Saving…" : "Add to Queue"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
