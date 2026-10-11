"use client";

import Link from "next/link";
import { ArrowRight, Check, Wrench } from "lucide-react";
import { FIX_OFFER, getFixHref } from "@/data/fixOffer";

type Props = { topic: string; source: string; variant: "inline" | "full"; showHowItWorks?: boolean };

export default function FixItCTA({ topic, source, variant, showHowItWorks = true }: Props) {
  const href = getFixHref(source, topic);

  const trackClick = () => {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === "function") {
      gtag("event", "fix_cta_click", {
        event_category: "fix_offer",
        event_label: source,
        placement: variant,
      });
    }
  };

  const contactButton = (
    <Link
      href={href}
      onClick={trackClick}
      className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all btn-glow whitespace-nowrap"
      style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B89225 100%)" }}
    >
      Contact Us <ArrowRight className="w-3.5 h-3.5" />
    </Link>
  );

  if (variant === "inline") {
    return (
      <div className="mb-12 flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.05]">
        <div className="flex items-start gap-3 flex-1">
          <Wrench className="w-5 h-5 text-[#9A7614] shrink-0 mt-0.5" />
          <p className="text-slate-600 leading-relaxed">
            <strong className="text-slate-900">No time to debug this {topic} issue?</strong>{" "}Tell us what&apos;s broken and
            our developers will get it working, usually within 24 hours.
          </p>
        </div>
        {contactButton}
      </div>
    );
  }

  return (
    <div className="mt-14 p-8 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.05]">
      <p className="text-sm font-semibold text-[#9A7614] uppercase tracking-wider mb-3">{FIX_OFFER.name}</p>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">Still stuck? We&apos;ll fix your {topic} error for you.</h3>
      <p className="text-slate-600 mb-6 leading-relaxed">
        Skip the hours of trial and error. Send us the error and access to your project, and a senior developer
        will get it working, usually within 24 hours. We&apos;ll review it for free before any work starts.
      </p>
      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-7">
        {FIX_OFFER.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
            <Check className="w-4 h-4 text-[#9A7614] shrink-0 mt-0.5" /> {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-4">
        {contactButton}
        {showHowItWorks && (
          <Link href="/fix" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            How it works
          </Link>
        )}
        <Link href="/contact" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          Bigger project? Get a free quote
        </Link>
      </div>
    </div>
  );
}
