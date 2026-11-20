import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { services } from "@/data/services";
import s from "@/components/agency/agency.module.css";

const BASE_URL = "https://amextechnology.com";
const url = `${BASE_URL}/los-angeles`;
const title = "Web & AI Development for Los Angeles Businesses";
const description =
  "Websites, web apps, AI agents, CRM automation and local SEO, serving Los Angeles and South Bay businesses from our Ahmedabad, India team. Founder in LA.";

const seoTitle = "Web & AI Development for LA Businesses | Amex Technology";

export const metadata: Metadata = {
  title: { absolute: seoTitle },
  description,
  alternates: { canonical: url },
  openGraph: { title: seoTitle, description, url },
  twitter: { title: seoTitle, description },
};

// Places we actively serve; used for the visible list and areaServed.
const areas = [
  "Torrance",
  "Hawthorne",
  "Inglewood",
  "Carson",
  "Redondo Beach",
  "Manhattan Beach",
  "El Segundo",
  "Long Beach",
  "Downtown Los Angeles",
  "Culver City",
  "Santa Monica",
];

const reasons = [
  {
    title: "A local point of contact",
    body: "Our founder, Abhi Patel, is based in Los Angeles. You get a contact on Pacific time who knows the LA market.",
  },
  {
    title: "Development team in Ahmedabad",
    body: "Amex Technology is based in Ahmedabad, India, where our development team works. That's how we keep projects affordable for small and mid-sized LA businesses without cutting corners on quality.",
  },
  {
    title: "Work while you sleep",
    body: "The time difference means work you approve in the afternoon is often built overnight and ready to review the next morning.",
  },
  {
    title: "Everything in your name",
    body: "Your code, domain, hosting and Google Business Profile stay in accounts you own, so you're never locked in.",
  },
];

const needs = [
  "Restaurants, cafes and food trucks that need online ordering, booking or a faster website",
  "Clinics, salons and studios losing bookings to a clunky website or missed calls",
  "Contractors and home-service businesses that don't appear in the Google map pack",
  "Apparel, print and e-commerce brands that need a store or an order portal",
  "Real estate, legal and professional firms that need a credible, fast website",
  "Startups and founders building an MVP or fixing an app made in Lovable, Bolt or Replit",
];

const faq = [
  {
    question: "Where is Amex Technology based?",
    answer:
      "Amex Technology is a web, app and AI development company based in Ahmedabad, India, serving Los Angeles businesses. Our founder, Abhi Patel, is in Los Angeles, so LA clients have a contact on Pacific time.",
  },
  {
    question: "Why work with you instead of an LA agency?",
    answer:
      "You get a local point of contact with the cost of an India-based development team. LA agency rates are among the highest in the US; our structure lets small and mid-sized businesses get a professional website, app or automation within a realistic budget.",
  },
  {
    question: "Do you help with local SEO and Google Business Profile?",
    answer:
      "Yes. We set up or optimise your Google Business Profile, make your business details consistent across directories, and build pages that match how people in your area search, so you show up in local and map results.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Businesses across Los Angeles County, especially the South Bay (Torrance, Hawthorne, Carson, Redondo Beach), Downtown LA, Inglewood, Culver City, Santa Monica and Long Beach. We also work remotely with clients across the US.",
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
  name: "Web & AI Development serving Los Angeles businesses",
  url,
  description,
  provider: { "@id": `${BASE_URL}/#organization` },
  areaServed: [
    { "@type": "City", name: "Los Angeles", containedInPlace: { "@type": "State", name: "California" } },
    ...areas.filter((a) => a !== "Downtown Los Angeles").map((name) => ({ "@type": "City", name })),
  ],
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
    { "@type": "ListItem", position: 2, name: "Los Angeles", item: url },
  ],
};

const localLinks = [
  { label: "Law firm web design", href: "/law-firm-web-design-los-angeles" },
  { label: "Affordable web design", href: "/affordable-web-design-los-angeles" },
  { label: "Google Business Profile setup", href: "/google-business-profile-setup-los-angeles" },
  { label: "Websites for trade businesses", href: "/la-website" },
];

const quoteHref = "/contact?service=Los%20Angeles%20project";

export default function LosAngelesPage() {
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
              items={[{ label: "Home", href: "/" }, { label: "Los Angeles" }]}
            />
            <p className={s.eyebrow}>Los Angeles · South Bay</p>
            <h1>Web & AI Development for Los Angeles Businesses</h1>
            <p className={s.intro} style={{ maxWidth: 640 }}>
              Amex Technology builds websites, web apps, AI agents and CRM automations for Los Angeles businesses, and helps
              them get found on Google and in AI assistants. We're based in Ahmedabad, India, and our founder, Abhi
              Patel, is in Los Angeles: a contact on Pacific time, at a cost small and mid-sized businesses can manage.
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
              <h2 className={s.heading}>How we work with LA businesses</h2>
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
              <h2 className={s.heading}>Common projects for local businesses</h2>
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
            <h2 className={`${s.heading} mb-6`}>Los Angeles services</h2>
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
            <h2 className={`${s.heading} mb-6`}>Areas we serve</h2>
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
              <h2 className={s.heading}>Ready to build your next digital product?</h2>
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
