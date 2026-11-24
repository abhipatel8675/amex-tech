"use client";

import { useState } from "react";
import { CalendarCheck, CheckCircle2, Loader2, Mail, Search, XCircle } from "lucide-react";
import type { GradePreview } from "@/lib/siteGrader/grade";

const BOOKING_URL = process.env.NEXT_PUBLIC_CAL_LINK || "/contact?service=Website";
const STEPS = ["Loading your homepage", "Checking phone and speed basics", "Checking what Google sees", "Scoring"];
const inputCls =
  "min-w-0 px-4 py-3 rounded-xl border border-[#c9cbbf] bg-white text-[#111111] placeholder:text-[#8a8e82] focus:outline-none focus:ring-2 focus:ring-[#9a722a]/50";
const btnCls =
  "inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all btn-glow disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";
const btnStyle = { background: "linear-gradient(135deg, #9a722a 0%, #9C7208 100%)" };

function track(event: string, label: string) {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") gtag("event", event, { event_category: "website_grader", event_label: label });
}

const scoreColor = (score: number) => (score >= 80 ? "#15803d" : score >= 60 ? "#b45309" : "#b91c1c");

export default function WebsiteGrader({ initialUrl = "" }: { initialUrl?: string }) {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GradePreview | null>(null);
  const [form, setForm] = useState({ email: "", name: "", business: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  async function grade(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setSent(false);
    setLoading(true);
    setStep(0);
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 2500);
    track("grader_start", url);
    try {
      const res = await fetch("/api/site-grade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setResult(data);
      track("grader_complete", `${data.grade}:${data.score}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  }

  async function emailReport(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/site-grade/email-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: result.url, ...form, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "We couldn't send the email. Please try again.");
      setSent(true);
      track("generate_lead", "website_grader");
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "We couldn't send the email. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <div>
      <form onSubmit={grade} className="p-6 md:p-8 rounded-2xl border border-[#dadcd1] bg-[#f7f6f2]">
        <label htmlFor="site-url" className="block text-sm font-semibold text-[#111111] mb-2">
          Your business website
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="site-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourbusiness.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className={`flex-1 ${inputCls}`}
          />
          <button type="submit" disabled={loading} className={btnCls} style={btnStyle}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {loading ? "Grading…" : "Grade my website"}
          </button>
        </div>
        {loading && <p className="mt-4 text-sm text-[#4d554b]">{STEPS[step]}… about 10 seconds.</p>}
        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      </form>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="p-6 md:p-8 rounded-2xl border border-[#dadcd1] bg-white grid md:grid-cols-[auto_1fr] gap-6 items-center">
            <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-8 mx-auto" style={{ borderColor: scoreColor(result.score) }}>
              <span className="text-4xl font-bold" style={{ color: scoreColor(result.score) }}>{result.score}</span>
              <span className="text-xs text-[#4d554b]">Grade {result.grade}</span>
            </div>
            <div>
              <p className="text-sm text-[#4d554b] mb-1 break-all">{result.host}</p>
              <h2 className="text-2xl font-bold text-[#111111] mb-2">
                {result.failedCount === 0 ? "Your site passed every check" : `${result.failedCount} things are costing you customers`}
              </h2>
              <p className="text-sm text-[#4d554b]">
                {result.passed} checks passed · responded in {(result.stats.responseMs / 1000).toFixed(1)}s
                {result.stats.builder ? ` · built with ${result.stats.builder}` : ""}
              </p>
            </div>
          </div>

          {result.top.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#111111]">Biggest problems</h3>
              {result.top.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl border border-[#dadcd1] bg-white flex gap-3">
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-[#626960] uppercase tracking-wider mb-1">{c.group}</p>
                    <p className="font-semibold text-[#111111] mb-1">{c.title}</p>
                    <p className="text-sm text-[#3d453b] leading-relaxed">{c.why}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-6 md:p-8 rounded-2xl border border-[#9a722a]/30 bg-[#9a722a]/[0.06]">
            <div className="flex items-start gap-3 mb-5">
              <Mail className="w-5 h-5 text-[#7A5807] shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[#111111]">Get the full report with every fix, free</h3>
                <p className="text-[#3d453b] mt-1">All {result.passed + result.failedCount} checks, why each one matters, and exactly how to fix it.</p>
              </div>
            </div>
            {sent ? (
              <div className="space-y-4" role="status">
                <p className="flex items-center gap-2 text-[#111111] font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Sent! Check your inbox (and spam folder).
                </p>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("grader_book_click", result.host)} className={btnCls} style={btnStyle}>
                  <CalendarCheck className="w-4 h-4" /> Book a free 15-minute call
                </a>
              </div>
            ) : (
              <form onSubmit={emailReport} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="email" required autoComplete="email" placeholder="you@business.com" value={form.email} onChange={set("email")} aria-label="Email address" className={inputCls} />
                  <input type="text" autoComplete="given-name" placeholder="First name (optional)" value={form.name} onChange={set("name")} aria-label="First name" className={inputCls} />
                  <input type="text" autoComplete="organization" placeholder="Business name (optional)" value={form.business} onChange={set("business")} aria-label="Business name" className={inputCls} />
                  <input type="tel" autoComplete="tel" placeholder="Phone (optional)" value={form.phone} onChange={set("phone")} aria-label="Phone" className={inputCls} />
                </div>
                <label className="flex items-start gap-2 text-sm text-[#3d453b] cursor-pointer">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#9C7208]" />
                  <span>Email me the report. I may get one personal reply about these results; unsubscribe anytime.</span>
                </label>
                <button type="submit" disabled={sending || !consent} className={btnCls} style={btnStyle}>
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />} Email me my report
                </button>
                {sendError && <p className="text-sm text-red-700">{sendError}</p>}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
