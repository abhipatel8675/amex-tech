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

const offerLinks = [
  { label: "AI Assistant for Manufacturers", href: "/ai-operations-agent" },
  { label: "Websites for Trade Businesses", href: "/trade-business-websites" },
  { label: "24-Hour App Fix", href: "/fix" },
  { label: "Free Website Grader", href: "/tools/website-grader" },
  { label: "Free App Checker", href: "/tools/app-checker" },
];

const laLinks = [
  { label: "Websites & AI for Businesses", href: "/web-and-ai-development" },
  { label: "Law Firm Web Design", href: "/law-firm-web-design" },
  { label: "Affordable Web Design", href: "/affordable-web-design" },
  {
    label: "Google Business Profile Setup",
    href: "/google-business-profile-setup",
  },
];

const linkClass =
  "inline-flex min-h-[32px] items-center text-sm text-[#626960] transition-colors hover:text-[#7a5807]";
const headingClass =
  "mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#1a211d]";

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

const serviceLinks = services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }));

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
    <footer className="border-t border-[#dadcd1] bg-[#f7f6f2] text-[#1a211d]">
      <div className="mx-auto w-[min(1280px,calc(100%-96px))] pt-16 pb-10 max-[1100px]:w-[calc(100%-64px)] max-[520px]:w-[calc(100%-40px)]">
        {/* Newsletter */}
        <div className="mb-14 flex flex-col items-start justify-between gap-5 rounded-lg border border-[#dddfd3] bg-white p-8 max-[520px]:p-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-[15px] font-semibold text-[#1a211d]">
              Get development tips in your inbox
            </p>
            <p className="text-sm text-[#626960]">
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
                placeholder="you@example.com"
                required
                disabled={status === "loading"}
                aria-label="Email address"
                className="min-h-[50px] min-w-0 flex-1 rounded-[5px] border border-[#dadcd1] bg-white px-4 text-sm text-[#1a211d] placeholder-[#6d7266] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#936a20] disabled:opacity-60 sm:w-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="min-h-[50px] flex-shrink-0 rounded-[5px] bg-[#202a23] px-5 text-sm font-medium text-white transition-colors hover:bg-[#3d493d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#936a20] disabled:cursor-not-allowed disabled:opacity-70"
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
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Link
              href="/"
              className="mb-5 flex items-center gap-2.5"
              aria-label="Amex Technology home"
            >
              <LogoMark size={40} />
              <span className="flex flex-col text-[19px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#1a211d]">
                Amex Technology
                <small className="mt-1 text-[10px] font-medium uppercase tracking-[0.23em] text-[#7a5807]">
                  Ideas into impact
                </small>
              </span>
            </Link>
            <p className="mb-4 max-w-[240px] text-sm leading-7 text-[#626960]">
              Websites, apps and AI tools for businesses worldwide.
            </p>
            <address className="mb-2 max-w-[260px] text-sm not-italic leading-6 text-[#626960]">
              {COMPANY_ADDRESS_LINE}
            </address>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={UPWORK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amex Technology on Upwork, Top Rated Plus"
                className="inline-flex items-center rounded-full border border-[#dadcd1] bg-white px-3 py-1.5 text-xs font-medium text-[#3d453b] transition-colors hover:border-[#9a722a] hover:text-[#7a5807]"
              >
                Upwork · Top Rated Plus
              </a>
              <a
                href={CLUTCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amex Technology on Clutch"
                className="inline-flex items-center rounded-full border border-[#dadcd1] bg-white px-3 py-1.5 text-xs font-medium text-[#3d453b] transition-colors hover:border-[#9a722a] hover:text-[#7a5807]"
              >
                Clutch · Our profile
              </a>
            </div>
          </div>

          <LinkColumn title="Company" links={quickLinks} />
          <LinkColumn title="Services" links={serviceLinks} />
          <LinkColumn title="Offers & tools" links={offerLinks} />

          <div className="flex flex-col gap-10">
            <LinkColumn title="Popular Services" links={laLinks} />
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
              <p className="mt-2 text-sm leading-6 text-[#626960]">
                Office: Monday–Saturday, {OFFICE_HOURS_IST}
              </p>
              <p className="text-sm leading-6 text-[#626960]">
                US line: Monday–Saturday, US business hours
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
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#dadcd1] pt-7 sm:flex-row">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs text-[#626960]">
              © {new Date().getFullYear()} Amex Technology. An independent agency, not affiliated with American Express.
            </p>
            <span className="text-xs text-[#626960]" aria-hidden="true">·</span>
              <a
                href="https://www.instagram.com/amextechnology/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amex Technology on Instagram"
                className="inline-flex min-h-[32px] min-w-[32px] items-center justify-center text-[#626960] transition-colors hover:text-[#7a5807]"
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
                className="inline-flex min-h-[32px] min-w-[32px] items-center justify-center text-[#626960] transition-colors hover:text-[#7a5807]"
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
                className="inline-flex min-h-[32px] min-w-[32px] items-center justify-center text-[#626960] transition-colors hover:text-[#7a5807]"
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
          <div className="flex flex-wrap items-center gap-6">
            {[
              ["Privacy Policy", "/privacy"],
              ["Terms of Service", "/terms"],
              ["Refund Policy", "/refund-policy"],
              ["Delivery Policy", "/delivery-policy"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex min-h-[32px] items-center text-xs text-[#626960] transition-colors hover:text-[#7a5807]"
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
