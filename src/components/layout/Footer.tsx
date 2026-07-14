"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

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

// Social icon SVGs
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterXIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Footer() {
  // TODO: wire up newsletter subscription (e.g. via ConvertKit / Mailchimp API or a route handler)
  const [email, setEmail] = useState("");

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
              "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 50%, transparent 100%)",
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: implement newsletter subscription
              }}
              className="flex items-center gap-2 w-full sm:w-auto"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                aria-label="Email address"
                className="flex-1 sm:w-56 text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-slate-300 placeholder-slate-600 outline-none transition-all focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30"
              />
              <button
                type="submit"
                className="text-sm font-semibold text-white px-4 py-2.5 rounded-xl transition-all btn-glow flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.4fr_1fr] gap-10 mb-14">

            {/* Brand column */}
            <div>
              <Link href="/" className="flex items-center gap-1 mb-5">
                <span
                  className="font-bold text-xl tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #818CF8, #A78BFA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Amex
                </span>
                <span className="text-white font-semibold text-xl tracking-tight">Technology</span>
              </Link>
              <p className="text-sm leading-7 mb-5 max-w-[220px]" style={{ color: "rgba(148,163,184,0.7)" }}>
                Building digital products that drive real business growth.
              </p>
              <p className="text-xs mb-6" style={{ color: "rgba(100,116,139,0.6)" }}>
                Based in India · Serving clients globally · Est. 2019
              </p>
              {/* Social links */}
              <div className="flex items-center gap-2.5">
                {[
                  { href: "https://linkedin.com/company/amex-technology", label: "LinkedIn", icon: <LinkedInIcon /> },
                  { href: "https://x.com/amextechnology", label: "X / Twitter", icon: <TwitterXIcon /> },
                  { href: "https://github.com/amex-technology", label: "GitHub", icon: <GitHubIcon /> },
                ].map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.08] text-slate-500 transition-all duration-200 hover:text-indigo-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:scale-110 hover:shadow-[0_0_12px_rgba(99,102,241,0.35)]"
                  >
                    {icon}
                  </a>
                ))}
              </div>
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
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
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
              <p className="text-xs" style={{ color: "rgba(100,116,139,0.45)" }}>
                Made with ❤️ in India
              </p>
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
