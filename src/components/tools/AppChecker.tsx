"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Mail, ShieldAlert, Search, Gauge, Wrench } from "lucide-react";
import type { ScanPreview, Severity } from "@/lib/appChecker/scan";
import { appCheckerFixHref } from "@/data/appChecker";

type Result = ScanPreview & { paymentsEnabled: boolean };

const SEVERITY_STYLE: Record<Severity, string> = {
  critical: "bg-red-50 text-red-700 border-red-200",
  high: "bg-orange-50 text-orange-700 border-orange-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-slate-50 text-slate-700 border-slate-200",
};

const STEPS = ["Loading your homepage", "Reading your JavaScript bundles", "Looking for exposed keys", "Checking SEO and speed"];

function track(event: string, label: string) {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") gtag("event", event, { event_category: "app_checker", event_label: label });
}

function scoreColor(score: number) {
  return score >= 75 ? "#15803d" : score >= 50 ? "#b45309" : "#b91c1c";
}

export default function AppChecker({ initialUrl = "" }: { initialUrl?: string }) {
  const [url, setUrl] = useState(initialUrl);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailConsent, setEmailConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  async function runCheck(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setEmailSent(false);
    setEmailError("");
    setLoading(true);
    setStep(0);
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 3500);
    track("app_check_start", url);
    try {
      const res = await fetch("/api/app-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setResult(data);
      track("app_check_complete", `${data.grade}:${data.total}`);
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
    track("app_check_email_report", result.finalUrl);
    setSending(true);
    setEmailError("");
    try {
      const res = await fetch("/api/app-check/email-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: result.url, email, name, consent: emailConsent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "We couldn't send the email. Please try again.");
      setEmailSent(true);
      track("generate_lead", "app_checker");
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "We couldn't send the email. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const locked = result ? result.total - result.preview.length : 0;

  return (
    <div>
      <form onSubmit={runCheck} className="p-6 md:p-8 rounded-2xl border border-slate-200 bg-slate-50">
        <label htmlFor="app-url" className="block text-sm font-semibold text-slate-900 mb-2">
          Your app&apos;s address
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="app-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="myapp.lovable.app or myapp.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50"
          />
          <button
            type="submit"
            disabled={loading || !consent}
            className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all btn-glow disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #B8860B 0%, #9C7208 100%)" }}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {loading ? "Checking…" : "Check my app free"}
          </button>
        </div>
        <label className="mt-4 flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#9C7208]" />
          <span>I own this app or have permission to check it. We only read public pages; we never log in or touch your data.</span>
        </label>
        {loading && <p className="mt-4 text-sm text-slate-600">{STEPS[step]}… this takes about 15–30 seconds.</p>}
        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      </form>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="p-6 md:p-8 rounded-2xl border border-slate-200 bg-white grid md:grid-cols-[auto_1fr] gap-6 items-center">
            <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-8" style={{ borderColor: scoreColor(result.score) }}>
              <span className="text-4xl font-bold" style={{ color: scoreColor(result.score) }}>
                {result.score}
              </span>
              <span className="text-xs text-slate-600">Grade {result.grade}</span>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1 break-all">{result.finalUrl}</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                {result.total === 0 ? "No problems found. Nice work!" : `We found ${result.total} ${result.total === 1 ? "issue" : "issues"}`}
              </h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {(["critical", "high", "medium", "low"] as Severity[]).map((s) =>
                  result.counts[s] > 0 ? (
                    <span key={s} className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${SEVERITY_STYLE[s]}`}>
                      {result.counts[s]} {s}
                    </span>
                  ) : null
                )}
              </div>
              {result.stack.length > 0 && (
                <p className="text-sm text-slate-600">
                  Built with: <span className="text-slate-700">{result.stack.join(", ")}</span>
                </p>
              )}
            </div>
          </div>

          {result.preview.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Most serious problems</h3>
              {result.preview.map((f) => (
                <div key={f.id} className="p-5 rounded-2xl border border-slate-200 bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${SEVERITY_STYLE[f.severity]}`}>{f.severity}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">{f.category}</span>
                  </div>
                  <p className="font-semibold text-slate-900 mb-1">{f.title}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{f.detail}</p>
                </div>
              ))}
            </div>
          )}

          <div className="p-6 md:p-8 rounded-2xl border border-[#B8860B]/30 bg-[#B8860B]/[0.06]">
            <div className="flex items-start gap-3 mb-4">
              <Mail className="w-5 h-5 text-[#7A5807] shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {result.total === 0
                    ? "Get a copy of this report by email"
                    : locked > 0
                      ? `Get all ${result.total} issues and every fix, free by email`
                      : "Get step-by-step fixes, free by email"}
                </h3>
                <p className="text-slate-700 mt-1">
                  The full report shows every problem, exactly where we found it (exposed keys are masked), and how to fix each one in your stack.
                </p>
              </div>
            </div>
            <ul className="grid sm:grid-cols-3 gap-3 mb-6 text-sm text-slate-700">
              <li className="flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-[#7A5807]" /> Security issues + evidence</li>
              <li className="flex items-center gap-2"><Search className="w-4 h-4 text-[#7A5807]" /> SEO &amp; AI-search fixes</li>
              <li className="flex items-center gap-2"><Gauge className="w-4 h-4 text-[#7A5807]" /> Speed improvements</li>
            </ul>
            {emailSent ? (
              <p className="flex items-center gap-2 text-slate-800 font-semibold" role="status">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Sent! Check your inbox (and spam folder) for your full report.
              </p>
            ) : (
              <form onSubmit={emailReport} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50"
                  />
                  <input
                    type="text"
                    autoComplete="given-name"
                    placeholder="First name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-label="First name"
                    className="sm:w-48 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50"
                  />
                  <button
                    type="submit"
                    disabled={sending || !emailConsent}
                    className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all btn-glow disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg, #B8860B 0%, #9C7208 100%)" }}
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                    Email me my report
                  </button>
                </div>
                <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={emailConsent} onChange={(e) => setEmailConsent(e.target.checked)} className="mt-0.5 accent-[#9C7208]" />
                  <span>Send me the report, plus a follow-up or two about these results. Unsubscribe anytime.</span>
                </label>
                {emailError && <p className="text-sm text-red-700">{emailError}</p>}
              </form>
            )}
            {result.total > 0 && (
              <Link
                href={appCheckerFixHref(result.finalUrl, result.total)}
                onClick={() => track("app_check_fix_click", result.finalUrl)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                <Wrench className="w-4 h-4" /> Or have us fix everything for you <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
