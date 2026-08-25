"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Website Development", href: "/services#web-development" },
  { label: "Web Application Development", href: "/services#web-app-development" },
  { label: "Mobile App Development", href: "/services#mobile-app-development" },
  { label: "SaaS Development", href: "/services#saas-development" },
  { label: "DevOps & Cloud", href: "/services#devops-deployment" },
  { label: "UI/UX Design", href: "/services#ui-ux-design" },
  { label: "SEO Services", href: "/services#seo-services" },
  { label: "AI Services", href: "/services#ai-services" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setFeedback("You're subscribed! 🎉");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <>
      <footer
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0B0F19 0%, #080C14 100%)" }}
      >
        {/* Top gradient border line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-[92rem] mx-auto px-6 pt-16 pb-10">

          {/* Newsletter strip */}
          <div className="mb-14 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="text-sm font-semibold text-white mb-0.5">Get development tips in your inbox</p>
              <p className="text-xs" style={{ color: "rgba(148,163,184,0.55)" }}>
                Practical insights on web, mobile, and product — no spam, ever.
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <form
                onSubmit={handleSubscribe}
                className="flex items-center gap-2 w-full sm:w-auto"
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="you@example.com"
                  required
                  disabled={status === "loading"}
                  aria-label="Email address"
                  className="flex-1 sm:w-56 text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-slate-300 placeholder-slate-600 outline-none transition-all focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="text-sm font-semibold text-white px-4 py-2.5 rounded-xl transition-all btn-glow flex-shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B89225 100%)" }}
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
              {feedback && (
                <p
                  role="status"
                  aria-live="polite"
                  className="text-xs mt-2 text-left sm:text-right"
                  style={{ color: status === "error" ? "#f87171" : "#34d399" }}
                >
                  {feedback}
                </p>
              )}
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.4fr_1fr] gap-10 mb-14">

            {/* Brand column */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-5">
                <LogoMark size={32} />
                <span className="flex items-baseline gap-1">
                  <span
                    className="font-bold text-xl tracking-tight"
                    style={{
                      background: "linear-gradient(135deg, #E1BC4A, #D4AF37)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Amex
                  </span>
                  <span className="text-white font-semibold text-xl tracking-tight">Technology</span>
                </span>
              </Link>
              <p className="text-sm leading-7 mb-5 max-w-[220px]" style={{ color: "rgba(148,163,184,0.7)" }}>
                Building digital products that drive real business growth.
              </p>
              <p className="text-xs" style={{ color: "rgba(100,116,139,0.6)" }}>
                Based in India · Serving clients globally · Est. 2019
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="text-xs font-semibold text-white uppercase tracking-widest mb-6"
                style={{ letterSpacing: "0.12em" }}
              >
                Company
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "rgba(148,163,184,0.6)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4
                className="text-xs font-semibold text-white uppercase tracking-widest mb-6"
                style={{ letterSpacing: "0.12em" }}
              >
                Services
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "rgba(148,163,184,0.6)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="text-xs font-semibold text-white uppercase tracking-widest mb-6"
                style={{ letterSpacing: "0.12em" }}
              >
                Contact
              </h4>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "rgba(100,116,139,0.65)", letterSpacing: "0.10em" }}>
                    Email
                  </p>
                  <a
                    href="mailto:abhipatel8675@gmail.com"
                    className="text-sm flex items-center gap-1 transition-colors hover:text-white group"
                    style={{ color: "rgba(148,163,184,0.65)" }}
                  >
                    abhipatel8675@gmail.com
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "rgba(100,116,139,0.65)", letterSpacing: "0.10em" }}>
                    Availability
                  </p>
                  <p className="text-sm" style={{ color: "rgba(148,163,184,0.65)" }}>
                    Mon – Sat, 9am – 8pm IST
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "rgba(100,116,139,0.65)", letterSpacing: "0.10em" }}>
                    Response time
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-sm" style={{ color: "rgba(148,163,184,0.65)" }}>Within 4 hours</p>
                  </div>
                </div>
              </div>
              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[#E1BC4A] hover:text-[#D4AF37] transition-colors group"
              >
                Start a project
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Separator + bottom bar */}
          <div className="border-t border-white/[0.06] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-xs" style={{ color: "rgba(100,116,139,0.55)" }}>
                © {new Date().getFullYear()} Amex Technology. All rights reserved.
              </p>
              <span className="text-xs" style={{ color: "rgba(100,116,139,0.4)" }}>·</span>
              <a
                href="https://www.instagram.com/amextechnology/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amex Technology on Instagram"
                className="transition-colors hover:text-white"
                style={{ color: "rgba(148,163,184,0.6)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.upwork.com/agencies/2067871097204619852/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amex Technology on Upwork"
                className="transition-colors hover:text-white"
                style={{ color: "rgba(148,163,184,0.6)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06a2.834 2.834 0 0 1 2.833 2.833 2.834 2.834 0 0 1-2.834 2.572zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.15-4.036-2.699-5.892H7.548v7.112c-.002 1.406-1.144 2.548-2.55 2.548-1.405 0-2.547-1.142-2.549-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.283 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.557l1.213-5.71c1.063.679 2.285 1.109 3.664 1.109h.02c3.045-.028 5.526-2.53 5.526-5.582 0-3.061-2.481-5.577-5.526-5.577z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/amex-technology/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amex Technology on LinkedIn"
                className="transition-colors hover:text-white"
                style={{ color: "rgba(148,163,184,0.6)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs hover:text-slate-300 transition-colors"
                style={{ color: "rgba(100,116,139,0.55)" }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs hover:text-slate-300 transition-colors"
                style={{ color: "rgba(100,116,139,0.55)" }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
