"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import SocialLinks from "@/components/site/SocialLinks";
import { primaryLinks } from "@/components/site/nav-data";
import { services } from "@/data/services";
import {
  COMPANY_ADDRESS_LINE,
  OFFICE_PHONE,
  US_PHONE,
  OFFICE_HOURS_IST,
  CLUTCH_URL,
  UPWORK_URL,
} from "@/data/company";
import s from "./footer.module.css";

const companyLinks = [{ label: "Home", href: "/" }, ...primaryLinks.map((l) => ({ label: l.label, href: l.href }))];

const toolLinks = [
  { label: "AI operations agent", href: "/ai-operations-agent" },
  { label: "Hire developers", href: "/hire-developers" },
  { label: "24-hour app fix", href: "/fix" },
  { label: "Free website grader", href: "/tools/website-grader" },
  { label: "Free app checker", href: "/tools/app-checker" },
];

const serviceLinks = services.map((x) => ({ label: x.title, href: `/services/${x.slug}` }));

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className={s.colTitle}>{title}</h2>
      <ul className={s.list}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
      setFeedback("You're subscribed. Thank you.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.top}>
          <div className={s.tile}>
          <svg className={s.mark} viewBox="0 0 512 512" role="img" aria-label="Amex Technology mark">
            <defs>
              <linearGradient id="amex-mark" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffc247" />
                <stop offset="1" stopColor="#ff7a3a" />
              </linearGradient>
            </defs>
            <path
              d="M120 420 L256 112 L392 420"
              fill="none"
              stroke="url(#amex-mark)"
              strokeWidth="84"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          </div>

          <div className={s.newsletter}>
            <h2 className={s.big}>Clear advice, a few times a month.</h2>
            <p className={s.lead}>
              Short, plain-English notes on getting more from your website, apps and AI. No spam, ever.
            </p>
            <form onSubmit={handleSubscribe} className={s.form} aria-label="Newsletter signup">
              <label htmlFor="footer-email" className={s.srOnly}>
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="you@company.com"
                required
                disabled={status === "loading"}
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
            {feedback && (
              <p role="status" aria-live="polite" className={s.feedback} data-status={status}>
                {feedback}
              </p>
            )}
          </div>
        </div>

        <div className={s.columns}>
          <Column title="Company" links={companyLinks} />
          <Column title="What we do" links={serviceLinks} />
          <Column title="Tools and offers" links={toolLinks} />
          <div>
            <h2 className={s.colTitle}>Contact</h2>
            <address className={s.address}>
              <a href="mailto:abhi@amextech.org">abhi@amextech.org</a>
              <a href={`tel:${OFFICE_PHONE.tel}`}>{OFFICE_PHONE.display} (office)</a>
              <a href={`tel:${US_PHONE.tel}`}>{US_PHONE.display} (US)</a>
              <span>{COMPANY_ADDRESS_LINE}</span>
              <span>Monday to Saturday, {OFFICE_HOURS_IST}</span>
            </address>
            <ul className={s.list}>
              <li>
                <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer">
                  Upwork, Top Rated Plus
                </a>
              </li>
              <li>
                <a href={CLUTCH_URL} target="_blank" rel="noopener noreferrer">
                  Clutch profile
                </a>
              </li>
            </ul>
            <Link href="/contact" className={s.button}>
              Start a project <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={s.bottom}>
          <p>
            © {new Date().getFullYear()} Amex Technology. An independent agency, not affiliated with American Express.
          </p>
          <ul className={s.legal}>
            {[
              ["Privacy policy", "/privacy"],
              ["Terms of service", "/terms"],
              ["Refund policy", "/refund-policy"],
              ["Delivery policy", "/delivery-policy"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
