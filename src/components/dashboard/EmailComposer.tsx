"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Send, X, Loader2 } from "lucide-react";
import type { Lead } from "@/lib/leadTypes";
import { TEMPLATES, fillTemplate, type LeadEmail } from "@/lib/leadEmails";
import { sendLeadEmail, writeWithAI } from "@/app/dashboard/dev/emails/actions";

const inputCls = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#B8860B]/50";
const btnCls = "inline-flex items-center gap-1.5 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all disabled:opacity-50";
const btnStyle = { background: "linear-gradient(135deg, #B8860B, #9C7208)" };
const when = (iso: string) => new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export default function EmailComposer({ lead, history, onClose }: { lead: Lead; history: LeadEmail[]; onClose: () => void }) {
  const router = useRouter();
  const start = history.length ? "followup" : lead.status === "quoted" ? "quote" : "inquiry";
  const first = fillTemplate(start, lead, history[0]);
  const [template, setTemplate] = useState<string>(start);
  const [to, setTo] = useState(lead.email ?? "");
  const [subject, setSubject] = useState(first.subject);
  const [body, setBody] = useState(first.body);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [aiBusy, startAi] = useTransition();
  const [sending, startSend] = useTransition();

  const pick = (key: string) => {
    setTemplate(key);
    const t = fillTemplate(key, lead, history[0]);
    setSubject(t.subject);
    setBody(t.body);
  };

  const ai = () =>
    startAi(async () => {
      setError("");
      const r = await writeWithAI({ leadId: lead.id, note, template });
      if (!r.ok) return setError(r.error);
      setSubject(r.subject);
      setBody(r.body);
    });

  const send = () =>
    startSend(async () => {
      setError("");
      const r = await sendLeadEmail({ leadId: lead.id, to, subject, body, template });
      if (!r.ok) return setError(r.error);
      setDone(true);
      router.refresh();
    });

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/40 flex items-start justify-center overflow-y-auto p-4 sm:p-8" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={`Email ${lead.company || lead.name || lead.email}`}>
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-200">
          <div className="min-w-0">
            <p className="font-semibold truncate">Email {lead.company || lead.name || lead.email}</p>
            <p className="text-xs text-slate-500">Sent from abhi@amextech.org. Replies arrive in your Zoho inbox.</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"><X className="w-5 h-5" /></button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <p className="text-lg font-semibold mb-1">Sent to {to}</p>
            <p className="text-sm text-slate-600 mb-5">The lead is marked Contacted, with a follow-up in 7 days.</p>
            <button onClick={onClose} className={btnCls} style={btnStyle}>Done</button>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((t) => (
                <button key={t.key} type="button" onClick={() => pick(t.key)} className={`text-sm px-3 py-1.5 rounded-lg border ${template === t.key ? "border-[#B8860B] bg-[#B8860B]/10 text-[#7A5807]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-[#B8860B]/30 bg-[#B8860B]/5 p-3 space-y-2">
              <label className="text-xs font-medium text-[#7A5807] flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Write with AI: tell it what the email should say</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="e.g. Thank them, say a 5-page site is $1,200 and takes 2 weeks, ask for a call this week" className={inputCls} />
              <button type="button" onClick={ai} disabled={aiBusy} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A5807] border border-[#B8860B]/40 rounded-lg px-3 py-1.5 hover:bg-white disabled:opacity-50">
                {aiBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} {aiBusy ? "Writing…" : "Write it"}
              </button>
            </div>

            <div className="space-y-2">
              <input value={to} onChange={(e) => setTo(e.target.value)} type="email" aria-label="To" placeholder="To" className={inputCls} />
              <input value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Subject" placeholder="Subject" className={`${inputCls} font-medium`} />
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={12} aria-label="Message" className={inputCls} />
              <p className="text-xs text-slate-500">Anything in [square brackets] must be filled in before it can be sent.</p>
            </div>

            {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}

            <div className="flex justify-end">
              <button type="button" onClick={send} disabled={sending || aiBusy} className={btnCls} style={btnStyle}>
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} {sending ? "Sending…" : "Send"}
              </button>
            </div>

            {history.length > 0 && (
              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs font-medium text-slate-600 mb-2">Emails already sent to this lead</p>
                <ul className="space-y-2">
                  {history.map((h) => (
                    <li key={h.id} className="text-sm">
                      <details>
                        <summary className="cursor-pointer select-none"><span className="font-medium">{h.subject}</span> <span className="text-xs text-slate-500">· {when(h.created_at)}</span></summary>
                        <p className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-[13px] text-slate-700">{h.body}</p>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
