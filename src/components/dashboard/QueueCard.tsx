"use client";

import { useState, useTransition } from "react";
import { Sparkles, Loader2, Pencil, Check, ChevronDown } from "lucide-react";
import type { QueueState } from "@/lib/outreachWorker";
import { aiRewrite, removeEmail, saveEmail } from "@/app/dashboard/dev/queue/actions";
import PendingButton from "./PendingButton";

type Item = QueueState["queue"][number];

const inputCls = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#B8860B]/50";
const btnCls = "text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all disabled:opacity-50";
const btnStyle = { background: "linear-gradient(135deg, #B8860B, #9C7208)" };
const when = (iso: string) => (/^\d{4}-/.test(iso) ? new Date(iso).toLocaleString("en-US", { timeZone: "America/Los_Angeles", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) + " LA" : "earlier");

const PROBLEMS: Record<string, string> = {
  no_https: "no HTTPS (\"Not secure\")",
  no_mobile: "no phone layout",
  old_copyright: "old © year",
  no_title: "no page title",
  default_title: "default WordPress title",
  generic_title: "generic page title",
  no_phone: "no phone number",
  phone_not_tappable: "phone number can't be tapped",
  covid_notice: "old Covid-19 notice",
  placeholder_text: "placeholder text",
};
const problemText = (p: string) => p.split(/,\s*/).map((x) => PROBLEMS[x] ?? x).join(", ");

function Status({ item }: { item: Item }) {
  const [text, tone] = item.sent
    ? [`Sent ${when(item.sent)}`, "bg-emerald-50 text-emerald-700"]
    : item.skipped
      ? ["Skipped", "bg-slate-100 text-slate-600"]
      : item.approved
        ? ["Approved", "bg-amber-50 text-amber-800"]
        : ["Draft", "bg-sky-50 text-sky-700"];
  return <span className={`text-xs font-medium rounded-full px-2.5 py-1 whitespace-nowrap ${tone}`}>{text}</span>;
}

export default function QueueCard({ item, tab }: { item: Item; tab: string }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState(item.subject);
  const [body, setBody] = useState(item.body);
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, start] = useTransition();
  const editable = !item.sent;
  const preview = item.body.replace(/^hi[^,\n]*,\s*/i, "").replace(/\s+/g, " ").slice(0, 140);

  const ai = () =>
    start(async () => {
      setMsg("");
      const r = await aiRewrite({ business: item.business, first_name: item.first_name ?? "", problem: item.problem ?? "", subject, body, note });
      if (!r.ok) return setMsg(r.error);
      setSubject(r.subject);
      setBody(r.body);
      setMsg(r.warnings.length ? `Check before saving: ${r.warnings.join("; ")}` : "New version written. Read it, then press Save.");
    });

  return (
    <li id={item.id} className="scroll-mt-24">
      <div className="flex flex-wrap sm:flex-nowrap items-start gap-3 px-4 py-3">
        <button type="button" onClick={() => setOpen(!open)} className="min-w-0 flex-1 basis-full sm:basis-auto text-left" aria-expanded={open}>
          <p className="text-sm font-semibold text-slate-900 truncate">{item.business} <span className="font-normal text-slate-500">· {item.email}</span></p>
          <p className="text-sm text-slate-800 truncate">{item.subject}</p>
          <p className="text-xs text-slate-500 truncate">{item.skipped ? `Skipped: ${item.skipped}` : preview}</p>
        </button>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Status item={item} />
          {editable && !item.skipped && (
            <form action={saveEmail}>
              <input type="hidden" name="tab" value={tab} />
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="subject" value={item.subject} />
              <input type="hidden" name="body" value={item.body} />
              {!item.approved && <input type="hidden" name="approved" value="on" />}
              <PendingButton className={`inline-flex items-center gap-1 text-xs font-semibold rounded-lg px-2.5 py-1.5 border ${item.approved ? "border-slate-200 text-slate-600 hover:border-slate-300" : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"}`}>
                {item.approved ? "Unapprove" : <><Check className="w-3.5 h-3.5" /> Approve</>}
              </PendingButton>
            </form>
          )}
          <button type="button" onClick={() => setOpen(!open)} className="inline-flex items-center gap-1 text-xs font-semibold text-[#7A5807] border border-[#B8860B]/40 rounded-lg px-2.5 py-1.5 hover:bg-[#B8860B]/10">
            {editable ? <><Pencil className="w-3.5 h-3.5" /> Edit</> : <><ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} /> Read</>}
          </button>
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4">
          {item.problem && <p className="text-xs text-slate-500 mb-2">Problem found on their site: {problemText(item.problem)}{item.website ? ` · ${item.website}` : ""}</p>}
          {!editable ? (
            <p className="whitespace-pre-wrap break-words rounded-lg bg-slate-50 p-3 text-[13px] text-slate-800">{item.body}</p>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write with AI: say what to change (e.g. shorter, mention only the phone problem)" className={inputCls} />
                <button type="button" onClick={ai} disabled={busy} className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-[#7A5807] border border-[#B8860B]/40 bg-white rounded-lg px-3 py-2 hover:bg-[#B8860B]/10 disabled:opacity-50 whitespace-nowrap">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} {busy ? "Writing…" : "Rewrite with AI"}
                </button>
              </div>
              <form action={saveEmail} className="space-y-2" onSubmit={() => setMsg("")}>
                <input type="hidden" name="tab" value={tab} />
                <input type="hidden" name="id" value={item.id} />
                <input name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} aria-label="Subject" className={`${inputCls} font-medium`} />
                <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)} rows={7} maxLength={5000} aria-label="Email text" className={inputCls} />
                <p className="text-xs text-slate-500">&quot;Best, Abhi Patel&quot; and the address footer are added when it is sent.</p>
                {msg && <p className={`text-sm rounded-lg p-2.5 ${msg.startsWith("Check") ? "bg-amber-50 text-amber-800" : "bg-white text-slate-700 border border-slate-200"}`}>{msg}</p>}
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="approved" defaultChecked={item.approved} className="size-4 accent-[#B8860B]" /> Approved to send
                  </label>
                  <PendingButton className={btnCls} style={btnStyle}>Save</PendingButton>
                  <PendingButton formAction={removeEmail} onClick={(e) => { if (!confirm(`Remove the email to ${item.business}?`)) e.preventDefault(); }} className="ml-auto text-xs text-red-700 hover:underline">Remove from queue</PendingButton>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
