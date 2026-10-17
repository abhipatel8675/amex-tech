"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Lock, ShieldAlert, Search, Gauge, Wrench } from "lucide-react";
import type { ScanPreview, Severity } from "@/lib/appChecker/scan";
import { APP_CHECKER, appCheckerFixHref, appCheckerReportRequestHref } from "@/data/appChecker";

type Result = ScanPreview & { paymentsEnabled: boolean };

const SEVERITY_STYLE: Record<Severity, string> = {
  critical: "bg-red-50 text-red-700 border-red-200",
  high: "bg-orange-50 text-orange-700 border-orange-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-slate-50 text-slate-600 border-slate-200",
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
  const [paying, setPaying] = useState(false);

  async function runCheck(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
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

  async function unlock() {
    if (!result) return;
    track("app_check_unlock_click", result.finalUrl);
    setPaying(true);
    setError("");
    try {
      const res = await fetch("/api/app-check/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: result.url }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout isn't available right now.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout isn't available right now.");
      setPaying(false);
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
            className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
          />
          <button
            type="submit"
            disabled={loading || !consent}
            className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all btn-glow disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B89225 100%)" }}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {loading ? "Checking…" : "Check my app free"}
          </button>
        </div>
        <label className="mt-4 flex items-start gap-2 text-sm text-slate-600 cursor-pointer">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#B89225]" />
          <span>I own this app or have permission to check it. We only read public pages; we never log in or touch your data.</span>
        </label>
        {loading && <p className="mt-4 text-sm text-slate-500">{STEPS[step]}… this takes about 15–30 seconds.</p>}
        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      </form>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="p-6 md:p-8 rounded-2xl border border-slate-200 bg-white grid md:grid-cols-[auto_1fr] gap-6 items-center">
            <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-8" style={{ borderColor: scoreColor(result.score) }}>
              <span className="text-4xl font-bold" style={{ color: scoreColor(result.score) }}>
                {result.score}
              </span>
              <span className="text-xs text-slate-500">Grade {result.grade}</span>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1 break-all">{result.finalUrl}</p>
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
                <p className="text-sm text-slate-500">
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
                  <p className="text-sm text-slate-600 leading-relaxed">{f.detail}</p>
                </div>
              ))}
            </div>
          )}

          {result.total > 0 && (
            <div className="p-6 md:p-8 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06]">
              <div className="flex items-start gap-3 mb-4">
                <Lock className="w-5 h-5 text-[#806010] shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {locked > 0 ? `Unlock ${locked} more ${locked === 1 ? "issue" : "issues"} and every fix` : "Unlock step-by-step fixes"}
                  </h3>
                  <p className="text-slate-600 mt-1">
                    The full report shows every problem, exactly where we found it (exposed keys are masked), and how to fix each one in your stack.
                  </p>
                </div>
              </div>
              <ul className="grid sm:grid-cols-3 gap-3 mb-6 text-sm text-slate-600">
                <li className="flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-[#806010]" /> Security issues + evidence</li>
                <li className="flex items-center gap-2"><Search className="w-4 h-4 text-[#806010]" /> SEO &amp; AI-search fixes</li>
                <li className="flex items-center gap-2"><Gauge className="w-4 h-4 text-[#806010]" /> Speed improvements</li>
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                {result.paymentsEnabled ? (
                  <button
                    onClick={unlock}
                    disabled={paying}
                    className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all btn-glow disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B89225 100%)" }}
                  >
                    {paying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                    Get the full report: {APP_CHECKER.price}
                  </button>
                ) : (
                  <Link
                    href={appCheckerReportRequestHref(result.finalUrl)}
                    onClick={() => track("app_check_report_request", result.finalUrl)}
                    className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all btn-glow"
                    style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B89225 100%)" }}
                  >
                    Email me the full report <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  href={appCheckerFixHref(result.finalUrl, result.total)}
                  onClick={() => track("app_check_fix_click", result.finalUrl)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
                >
                  <Wrench className="w-4 h-4" /> Or have us fix everything for you
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
