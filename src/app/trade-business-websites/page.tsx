import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CheckCircle2, ArrowUpRight, Clock, Globe, FileText, Smartphone, Search, ShieldCheck, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import WebsiteGrader from "@/components/tools/WebsiteGrader";
import s from "@/components/agency/agency.module.css";

// Landing page for trade businesses (plumbers, handymen, HVAC, contractors).
// Outreach links here with ?site=theirsite.com so the free scan is prefilled.

const pageUrl = "https://amextechnology.com/trade-business-websites";
const title = "Website for Trade Businesses";
const description =
  "A new website for plumbers, handymen, HVAC engineers and contractors anywhere: your own domain, a quote request form, and Google setup. Fixed quote up front, live in about 5 days.";

export const metadata: Metadata = {
  title: { absolute: "Trade Business Website in 5 Days | Amex Technology" },
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: `${title} | Amex Technology`, description, url: pageUrl },
  twitter: { title: `${title} | Amex Technology`, description },
};

const contactHref = `/contact?service=${encodeURIComponent("Websites & Web Apps")}&message=${encodeURIComponent(
  `I'm interested in a trade business website.\n\nBusiness name:\nCurrent website (if any):\nBest phone number:`
)}`;

const included = [
  { icon: FileText, title: "5-page website", body: "Home, Services, Gallery, Reviews and Contact, written for your trade and your area." },
  { icon: Globe, title: "Your own domain", body: "Move off the free builder address to yourname.com. The domain is registered in your name." },
  { icon: CheckCircle2, title: "Quote request form", body: "Every request goes straight to your email and phone, so you get jobs even when you can't pick up." },
  { icon: Smartphone, title: "Built for phones", body: "Most customers find you on their phone. Tap-to-call and the quote form sit on every page." },
  { icon: Search, title: "Google basics", body: "Search Console, sitemap, page titles and local business details, so you show up for searches in your area." },
  { icon: ShieldCheck, title: "No monthly hosting fee", body: "Fast, secure hosting with no monthly bill. You own the site and the domain." },
];

const problems = [
  "Your site is on a free builder address like yourname.ueniweb.com or yourname.wixsite.com",
  "There's no quote form, so visitors who don't want to call just leave",
  "It looks broken or tiny on a phone",
  "You don't show up when people search for your trade near you",
];

const steps = [
  { title: "Tell us about your business", body: "Send your current site (if you have one), your services and your service area. Takes 5 minutes." },
  { title: "We build it", body: "We reuse your photos, services and reviews and build the new site. You see a preview before it goes live." },
  { title: "Go live in about 5 days", body: "We connect your domain, test the quote form with you and submit the site to Google." },
];

const faq = [
  {
    question: "What is included?",
    answer:
      "A 5-page website, your own domain connected, a quote request form, mobile design, Google Search Console and sitemap setup, and moving your existing photos, services and reviews. The domain is registered directly in your name so you always own it.",
  },
  { question: "Are there monthly fees?", answer: "No. Hosting is included with no monthly bill. Ongoing updates and local SEO are optional, and only if you want them." },
  { question: "How do I pay?", answer: "Half to start and half when the site is live and you're happy with it." },
  { question: "I already have a website. Can you redo it?", answer: "Yes. Run the free scan above to see what's holding it back, and we'll rebuild it on your own domain." },
  { question: "Which businesses is this for?", answer: "Plumbers, handymen, HVAC, electricians, contractors, cleaners, landscapers and other local service businesses, wherever you are." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: title,
  description,
  url: pageUrl,
  areaServed: "Worldwide",
  provider: { "@id": "https://amextechnology.com/#organization" },
};

function CTA({ label = "Get my new website" }: { label?: string }) {
  return (
    <Link href={contactHref} className={s.button}>
      {label} <ArrowUpRight size={17} />
    </Link>
  );
}

export default async function TradeBusinessWebsitesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { site } = await searchParams;
  const initialUrl = typeof site === "string" ? site.slice(0, 300) : "";

  return (
    <div className={s.site}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main id="main-content">
        <section className={`${s.pageHero} ${s.pageHeroCompact}`}>
          <div className={s.wrap}>
            <Breadcrumb
              variant="inline"
              className={s.crumbs}
              items={[{ label: "Home", href: "/" }, { label: "Trade Business Websites" }]}
            />
            <p className={s.eyebrow}>For plumbers, handymen, HVAC & contractors</p>
            <h1>A website that turns Google searches into job requests.</h1>
            <p className={s.intro} style={{ maxWidth: 640 }}>
              Your own domain, a quote form that sends every request to your phone, and Google set up properly.{" "}
              <strong className="font-semibold text-[#1a211d]">Fixed quote before we start.</strong> Live in about 5 days.
            </p>
            <div className={s.actions}>
              <CTA />
            </div>
            <p className={s.heroNote}>
              <Clock size={14} aria-hidden="true" /> We reply within a few hours
            </p>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <div className={s.panel}>
              <h2 className={`${s.heading} mb-2`} style={{ fontSize: "clamp(26px, 3vw, 36px)" }}>
                Free: check your current website
              </h2>
              <p className={`${s.sectionText} mb-6`} style={{ maxWidth: 640 }}>
                Paste your website address. In about 10 seconds you&apos;ll see your score and what&apos;s costing you calls.
              </p>
              <WebsiteGrader initialUrl={initialUrl} />
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.band}`}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <h2 className={s.heading}>Sound familiar?</h2>
            </div>
            <ul className={s.checks}>
              {problems.map((p) => (
                <li key={p}>
                  <X size={18} aria-hidden="true" style={{ color: "#9b3b2b" }} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <h2 className={s.heading}>Everything you get</h2>
              <p className={s.sectionText}>A clear written quote, no surprises.</p>
            </div>
            <div className={s.serviceGrid}>
              {included.map(({ icon: Icon, title: t, body }, i) => (
                <article key={t} className={s.service}>
                  <div className={s.serviceTop}>
                    <Icon aria-hidden="true" />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{t}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.section} border-t border-[#dadcd1]`}>
          <div className={s.wrap}>
            <h2 className={s.heading}>How it works</h2>
            <ol
              className={`${s.process} ${s.processAuto}`}
              style={{ "--cols": steps.length } as CSSProperties}
            >
              {steps.map((step, i) => (
                <li key={step.title} className={s.processStep}>
                  <span>0{i + 1} /</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.cta}>
          <div className={`${s.wrap} ${s.ctaInner}`}>
            <div>
              <h2 className={s.heading}>Ready for a website that brings in work?</h2>
              <p>Send us your business name and we&apos;ll reply with a plan and a written quote.</p>
            </div>
            <CTA label="Start my website" />
          </div>
        </section>

        <section className={s.section}>
          <div className={`${s.wrap} ${s.faqGrid}`}>
            <div>
              <p className={s.eyebrow}>Questions</p>
              <h2 className={s.heading}>Questions</h2>
            </div>
            <div className={s.faq}>
              {faq.map((q) => (
                <details key={q.question}>
                  <summary>{q.question}</summary>
                  <p>{q.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
