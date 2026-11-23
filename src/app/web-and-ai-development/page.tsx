import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { services } from "@/data/services";
import s from "@/components/agency/agency.module.css";

const BASE_URL = "https://amextechnology.com";
const url = `${BASE_URL}/web-and-ai-development`;
const title = "Websites & AI for Businesses Worldwide";
const description =
  "Websites, web apps, AI assistants, business automation and search visibility for growing businesses worldwide.";

const seoTitle = "Websites & AI for Businesses Worldwide | Amex Technology";

export const metadata: Metadata = {
  title: { absolute: seoTitle },
  description,
  alternates: { canonical: url },
  openGraph: { title: seoTitle, description, url },
  twitter: { title: seoTitle, description },
};

// Places we actively serve; used for the visible list and areaServed.
const areas = ["United States", "United Kingdom", "Australia", "Canada", "New Zealand", "United Arab Emirates", "Europe", "India"];

const reasons = [
  {
    title: "One clear point of contact",
    body: "You deal directly with our founder, Abhi Patel, and a small team. We schedule calls around your time zone.",
  },
  {
    title: "Affordable for growing businesses",
    body: "We keep projects affordable for small and mid-sized businesses without cutting corners on quality.",
  },
  {
    title: "Work while you sleep",
    body: "For many clients the time difference works in your favor: work you approve in the afternoon is often built overnight and ready to review the next morning.",
  },
  {
    title: "Everything in your name",
    body: "Your website, domain, hosting and Google Business Profile stay in accounts you own, so you're never locked in.",
  },
];

const needs = [
  "Restaurants, cafes and food businesses that need online ordering, booking or a faster website",
  "Clinics, salons and studios losing bookings to a clunky website or missed calls",
  "Contractors and home-service businesses that don't appear in the Google map pack",
  "Apparel, print and e-commerce brands that need a store or an order portal",
  "Real estate, legal and professional firms that need a credible, fast website",
  "Startups and founders building a first version of their product, or fixing an app built with an AI app builder",
];

const faq = [
  {
    question: "Where does Amex Technology work?",
    answer:
      "Amex Technology works with businesses worldwide, entirely online. You work directly with our founder, Abhi Patel, and calls are arranged in your time zone.",
  },
  {
    question: "Why work with you instead of a big agency?",
    answer:
      "You get direct access to the people doing the work. Our structure lets small and mid-sized businesses get a professional website, app or automation within a realistic budget.",
  },
  {
    question: "Do you help with local SEO and Google Business Profile?",
    answer:
      "Yes. We set up or improve your Google Business Profile, make your business details consistent across directories, and build pages that match how people in your area search, so you show up in local and map results.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We work online with businesses around the world, including the US, UK, Australia, Canada, New Zealand, the Middle East, Europe and India.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send us a message with what you need. We reply with questions or a time for a short call, then send a written, itemised quote before any work starts.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${url}#service`,
  name: "Websites & AI for businesses worldwide",
  url,
  description,
  provider: { "@id": `${BASE_URL}/#organization` },
  areaServed: "Worldwide",
  serviceType: services.map((s) => s.title),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Websites & AI", item: url },
  ],
};

const localLinks = [
  { label: "Law firm web design", href: "/law-firm-web-design" },
  { label: "Affordable web design", href: "/affordable-web-design" },
  { label: "Google Business Profile setup", href: "/google-business-profile-setup" },
  { label: "Websites for trade businesses", href: "/trade-business-websites" },
];

const quoteHref = "/contact";

export default function WebAndAiDevelopmentPage() {
  return (
    <div className={s.site}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main id="main-content">
        <section className={`${s.pageHero} ${s.pageHeroCompact}`}>
          <div className={s.wrap}>
            <Breadcrumb
              variant="inline"
              className={s.crumbs}
              items={[{ label: "Home", href: "/" }, { label: "Websites & AI" }]}
            />
            <p className={s.eyebrow}>Worldwide</p>
            <h1>Websites & AI for Businesses Worldwide</h1>
            <p className={s.intro} style={{ maxWidth: 640 }}>
              Amex Technology builds websites, web apps, AI assistants and business automations for companies around the world, and helps
              them get found on Google and in AI assistants. You work directly with our founder, Abhi Patel: a clear
              contact, at a cost small and mid-sized businesses can manage.
            </p>
            <div className={s.actions}>
              <Link href={quoteHref} className={s.button}>
                Get a free quote <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <h2 className={s.heading}>How we work with you</h2>
            </div>
            <div className={`${s.serviceGrid} ${s.twoGrid}`}>
              {reasons.map((r, i) => (
                <article key={r.title} className={s.service}>
                  <div className={s.serviceTop}>
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.section} border-t border-[#dadcd1]`}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <h2 className={s.heading}>What we do</h2>
            </div>
            <div className={s.serviceGrid}>
              {services.map((svc) => (
                <Link key={svc.slug} href={`/services/${svc.slug}`} className={s.service}>
                  <h3>{svc.title}</h3>
                  <p>{svc.shortDesc}</p>
                  <span className={s.textLink}>
                    Explore service <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.band}`}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <h2 className={s.heading}>Common projects for small businesses</h2>
            </div>
            <ul className={s.checks}>
              {needs.map((n) => (
                <li key={n}>
                  <Check size={18} aria-hidden="true" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
            <p className={`${s.sectionText} mt-8`} style={{ maxWidth: 640 }}>
              Not sure where to start? Run your website through our free{" "}
              <Link href="/tools/app-checker" className={s.goldLink}>
                App Checker
              </Link>{" "}
              or browse our{" "}
              <Link href="/portfolio" className={s.goldLink}>
                portfolio
              </Link>
              .
            </p>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <h2 className={`${s.heading} mb-6`}>Popular services</h2>
            <div className={s.chips}>
              {localLinks.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.flushTop}`}>
          <div className={s.wrap}>
            <h2 className={`${s.heading} mb-6`}>Where our clients are</h2>
            <div className={s.chips}>
              {areas.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>
        </section>

        <section className={`${s.section} border-t border-[#dadcd1]`}>
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

        <section className={s.cta}>
          <div className={`${s.wrap} ${s.ctaInner}`}>
            <div>
              <h2 className={s.heading}>Ready to get started?</h2>
              <p>
                Tell us what you&apos;re building. We&apos;ll respond with a clear plan, honest scope estimate, and a
                timeline — no obligations.
              </p>
            </div>
            <Link href={quoteHref} className={s.button}>
              Get a free quote <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
