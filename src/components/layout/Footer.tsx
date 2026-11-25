"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { services } from "@/data/services";
import {
  COMPANY_ADDRESS_LINE,
  OFFICE_PHONE,
  US_PHONE,
  OFFICE_HOURS_IST,
  CLUTCH_URL,
  UPWORK_URL,
  FIVERR_URL,
} from "@/data/company";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Hire Developers", href: "/hire-developers" },
  { label: "Our Work", href: "/portfolio" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

const socials = [
  {
    label: "Amex Technology on Upwork",
    href: UPWORK_URL,
    icon: (
      <svg {...iconProps} fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06a2.834 2.834 0 0 1 2.833 2.833 2.834 2.834 0 0 1-2.834 2.572zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.15-4.036-2.699-5.892H7.548v7.112c-.002 1.406-1.144 2.548-2.55 2.548-1.405 0-2.547-1.142-2.549-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.283 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.557l1.213-5.71c1.063.679 2.285 1.109 3.664 1.109h.02c3.045-.028 5.526-2.53 5.526-5.582 0-3.061-2.481-5.577-5.526-5.577z" />
      </svg>
    ),
  },
  {
    label: "Amex Technology on Fiverr",
    href: FIVERR_URL,
    icon: (
      <svg {...iconProps} fill="currentColor">
        <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z" />
      </svg>
    ),
  },
  {
    label: "Amex Technology on Clutch",
    href: CLUTCH_URL,
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M18.4 7.2A8 8 0 1 0 18.4 16.8" />
        <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Amex Technology on LinkedIn",
    href: "https://www.linkedin.com/company/amex-technology/",
    icon: (
      <svg {...iconProps} fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Amex Technology on Instagram",
    href: "https://www.instagram.com/amextechnology/",
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const linkClass =
  "inline-flex min-h-[32px] items-center text-sm text-[#111111] transition-colors hover:text-[#7a5807]";
const headingClass =
  "mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#111111]";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className={headingClass}>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Same six services, in the same order, as the homepage "What we build" grid.
const FOOTER_SERVICE_SLUGS = [
  "web-development",
  "seo-services",
  "ai-services",
  "saas-development",
  "mobile-app-development",
  "crm-automation",
];
const serviceLinks = [
  ...FOOTER_SERVICE_SLUGS.map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s))
    .map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  { label: "All services", href: "/services" },
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
      setFeedback("You're subscribed.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <footer className="border-t border-[#dadcd1] bg-[#f7f6f2] text-[#111111]">
      <div className="mx-auto w-[min(1280px,calc(100%-96px))] pt-16 pb-10 max-[1100px]:w-[calc(100%-64px)] max-[520px]:w-[calc(100%-40px)]">
        {/* Newsletter */}
        <div className="mb-14 flex flex-col items-start justify-between gap-5 rounded-lg border border-[#dddfd3] bg-white p-8 max-[520px]:p-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-[15px] font-semibold text-[#111111]">
              Get development tips in your inbox
            </p>
            <p className="text-sm text-[#111111]">
              Practical insights on web, mobile, and product — no spam, ever.
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <form
              onSubmit={handleSubscribe}
              className="flex w-full items-center gap-2 sm:w-auto"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="abhi@amextech.org"
                required
                disabled={status === "loading"}
                aria-label="Email address"
                className="min-h-[50px] min-w-0 flex-1 rounded-[5px] border border-[#dadcd1] bg-white px-4 text-sm text-[#111111] placeholder-[#666666] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#936a20] disabled:opacity-60 sm:w-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="min-h-[50px] flex-shrink-0 rounded-[5px] bg-[#1a1a1a] px-5 text-sm font-medium text-white transition-colors hover:bg-[#3d493d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#936a20] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
            {feedback && (
              <p
                role="status"
                aria-live="polite"
                className="mt-2 text-left text-sm sm:text-right"
                style={{ color: status === "error" ? "#b42318" : "#2f6b45" }}
              >
                {feedback}
              </p>
            )}
          </div>
        </div>

        {/* Main grid */}
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Link
              href="/"
              className="mb-5 flex items-center gap-2.5"
              aria-label="Amex Technology home"
            >
              <LogoMark size={40} />
              <span className="flex flex-col text-[19px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#111111]">
                Amex Technology
                <small className="mt-1 text-[12px] font-medium uppercase tracking-[0.23em] text-[#7a5807]">
                  Ideas into impact
                </small>
              </span>
            </Link>
            <p className="mb-4 max-w-[240px] text-sm leading-7 text-[#111111]">
              Websites, apps and AI tools for businesses worldwide.
            </p>
            <address className="mb-2 max-w-[260px] text-sm not-italic leading-6 text-[#111111]">
              {COMPANY_ADDRESS_LINE}
            </address>
            <ul className="mt-5 flex flex-wrap items-center gap-2.5" aria-label="Amex Technology profiles">
              {socials.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[#dadcd1] bg-white text-[#111111] transition-colors hover:border-[#9a722a] hover:text-[#7a5807] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#936a20]"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <LinkColumn title="Company" links={quickLinks} />
          <LinkColumn title="Services" links={serviceLinks} />

          <div className="flex flex-col gap-10">
            <div>
              <h2 className={headingClass}>Contact</h2>
              <div className="flex flex-col items-start">
              <a
                href="mailto:abhi@amextech.org"
                className={`${linkClass} break-all`}
              >
                abhi@amextech.org
              </a>
              <a href={`tel:${OFFICE_PHONE.tel}`} className={linkClass}>
                {OFFICE_PHONE.display} (Office)
              </a>
              <a href={`tel:${US_PHONE.tel}`} className={linkClass}>
                {US_PHONE.display} (US)
              </a>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#111111]">
                Office: Monday–Saturday, {OFFICE_HOURS_IST}
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex min-h-[32px] items-center gap-1.5 text-sm font-semibold text-[#7a5807] hover:underline"
              >
                Start a project
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#dadcd1] pt-7 sm:flex-row">
          <p className="text-xs text-[#111111]">© {new Date().getFullYear()} Amex Technology.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6">
            {[
              ["Privacy Policy", "/privacy"],
              ["Terms of Service", "/terms"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex min-h-[32px] items-center text-xs text-[#111111] transition-colors hover:text-[#7a5807]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
