import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { services } from "@/data/services";

const BASE_URL = "https://amextechnology.com";
const url = `${BASE_URL}/los-angeles`;
const title = "Web & AI Development for Los Angeles Businesses";
const description =
  "Websites, web apps, AI agents, CRM automation and local SEO for Los Angeles and South Bay businesses. LA-based founder, India-based development team.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Amex Technology` },
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | Amex Technology`, description, url },
  twitter: { title: `${title} | Amex Technology`, description },
};

// Places we actively serve; used for the visible list and areaServed.
const areas = [
  "Gardena",
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
    body: "Our founder, Abhi Patel, lives in Gardena. You get a contact on Pacific time who knows the LA market, and in-person meetings around Los Angeles can be arranged.",
  },
  {
    title: "Development team in India",
    body: "Amex Technology's development team is based in India. That's how we keep projects affordable for small and mid-sized LA businesses without cutting corners on quality.",
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
    question: "Is Amex Technology based in Los Angeles?",
    answer:
      "Amex Technology is a software and AI agency with its development team in India. Our founder, Abhi Patel, lives in Gardena in the Los Angeles area, so LA clients have a local contact on Pacific time, and in-person meetings can be arranged.",
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
      "Businesses across Los Angeles County, especially the South Bay (Gardena, Torrance, Hawthorne, Carson, Redondo Beach), Downtown LA, Inglewood, Culver City, Santa Monica and Long Beach. We also work remotely with clients across the US.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send us a message with what you need. We reply with questions or a time for a short call, then send a written, itemised quote before any work starts.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${url}#service`,
  name: "Amex Technology — Web & AI Development for Los Angeles",
  url,
  description,
  parentOrganization: { "@id": `${BASE_URL}/#organization` },
  areaServed: [
    { "@type": "City", name: "Los Angeles", containedInPlace: { "@type": "State", name: "California" } },
    ...areas.filter((a) => a !== "Downtown Los Angeles").map((name) => ({ "@type": "City", name })),
  ],
  knowsAbout: services.map((s) => s.title),
  founder: { "@id": `${BASE_URL}/#founder` },
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

export default function LosAngelesPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Los Angeles" }]} />

        <section className="pt-8 pb-12 max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-wider mb-4">Los Angeles · South Bay</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Web & AI Development for Los Angeles Businesses
          </h1>
          <p className="text-slate-700 text-lg md:text-xl leading-8 mb-5">
            Amex Technology builds websites, web apps, AI agents and CRM automations for Los Angeles businesses, and helps
            them get found on Google and in AI assistants. Our founder, Abhi Patel, lives in Gardena, and our development
            team is in India: a local contact on Pacific time, at a cost small and mid-sized businesses can manage.
          </p>
          <Link
            href="/contact?service=Los%20Angeles%20project"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white bg-[#111827] hover:bg-black transition-colors"
          >
            Get a free quote <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">How we work with LA businesses</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {reasons.map((r) => (
              <div key={r.title} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <h3 className="text-lg font-semibold mb-2">{r.title}</h3>
                <p className="text-slate-600 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">What we do</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group p-5 rounded-xl border border-slate-200 bg-white hover:border-[#B8860B] transition-colors"
              >
                <p className="font-semibold group-hover:text-[#7A5807] transition-colors">{s.title}</p>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{s.shortDesc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Common projects for local businesses</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {needs.map((n) => (
              <li key={n} className="flex gap-3 text-slate-700 leading-relaxed">
                <Check className="w-5 h-5 mt-0.5 shrink-0 text-[#B8860B]" aria-hidden />
                {n}
              </li>
            ))}
          </ul>
          <p className="text-slate-600 mt-6 leading-relaxed">
            Not sure where to start? Run your website through our free{" "}
            <Link href="/tools/app-checker" className="font-semibold text-[#7A5807] hover:underline">
              App Checker
            </Link>{" "}
            or browse our{" "}
            <Link href="/portfolio" className="font-semibold text-[#7A5807] hover:underline">
              portfolio
            </Link>
            .
          </p>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Areas we serve</h2>
          <div className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <span key={a} className="text-sm text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                {a}
              </span>
            ))}
          </div>
        </section>

        <section className="pb-20 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Questions</h2>
          <div className="space-y-4">
            {faq.map((q) => (
              <div key={q.question} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <h3 className="font-semibold mb-2">{q.question}</h3>
                <p className="text-slate-600 leading-relaxed">{q.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
