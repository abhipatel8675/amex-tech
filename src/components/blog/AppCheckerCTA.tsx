"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

// Shown on troubleshooting posts: readers fixing one error often have others
// (exposed keys, SEO gaps), and the free App Checker surfaces them.
export default function AppCheckerCTA({ topic, source }: { topic: string; source: string }) {
  const trackClick = () => {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === "function") gtag("event", "app_checker_cta_click", { event_category: "app_checker", event_label: source });
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50">
      <div className="flex items-start gap-3 flex-1">
        <ShieldCheck className="w-5 h-5 text-[#7A5807] shrink-0 mt-0.5" />
        <p className="text-slate-700 leading-relaxed">
          <strong className="text-slate-900">Fixed it? Check the rest of your {topic === "app" ? "app" : `${topic} app`} for free.</strong>{" "}
          Our App Checker scans for exposed API keys, public Supabase service keys, SEO problems and slow loading in about 30 seconds.
        </p>
      </div>
      <Link
        href="/tools/app-checker"
        onClick={trackClick}
        className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-900 border border-slate-300 bg-white hover:border-slate-400 px-5 py-2.5 rounded-xl transition-all whitespace-nowrap"
      >
        Check my app free <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
