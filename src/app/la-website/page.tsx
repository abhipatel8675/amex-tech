import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Clock, Globe, FileText, Smartphone, Search, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import WebsiteGrader from "@/components/tools/WebsiteGrader";

// Landing page for LA trade businesses (plumbers, handymen, HVAC, contractors).
// Outreach links here with ?site=theirsite.com so the free scan is prefilled.

const PRICE = "$299";
const pageUrl = "https://amextechnology.com/la-website";
const title = "Website for LA Trade Businesses";
const description =
  "A new website for Los Angeles plumbers, handymen, HVAC and contractors: your own domain, a quote request form, and Google setup. $299 one-time, live in about 5 days.";

export const metadata: Metadata = {
  title: { absolute: `${title}: ${PRICE}, Live in 5 Days | Amex Technology` },
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: `${title} | Amex Technology`, description, url: pageUrl },
  twitter: { title: `${title} | Amex Technology`, description },
};

const contactHref = `/contact?service=${encodeURIComponent("Websites & Web Apps")}&message=${encodeURIComponent(
  `I'm interested in the ${PRICE} LA trade business website.\n\nBusiness name:\nCurrent website (if any):\nBest phone number:`
)}`;

const included = [
  { icon: FileText, title: "5-page website", body: "Home, Services, Gallery, Reviews and Contact, written for your trade and your area." },
  { icon: Globe, title: "Your own domain", body: "Move off the free builder address to yourname.com. The domain is registered in your name, about $12 a year." },
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
    question: `What does ${PRICE} include?`,
    answer:
      "A 5-page website, your own domain connected, a quote request form, mobile design, Google Search Console and sitemap setup, and moving your existing photos, services and reviews. The only extra cost is the domain itself, about $12 a year, paid directly by you so it's in your name.",
  },
  { question: "Are there monthly fees?", answer: "No. Hosting is included with no monthly bill. Ongoing updates and local SEO are optional, and only if you want them." },
  { question: "How do I pay?", answer: "Half to start and half when the site is live and you're happy with it." },
  { question: "I already have a website. Can you redo it?", answer: "Yes. Run the free scan above to see what's holding it back, and we'll rebuild it on your own domain." },
  { question: "Which businesses is this for?", answer: "Plumbers, handymen, HVAC, electricians, contractors, cleaners, landscapers and other local service businesses in Los Angeles." },
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
  areaServed: { "@type": "City", name: "Los Angeles" },
  provider: { "@type": "Organization", name: "Amex Technology", url: "https://amextechnology.com" },
  offers: { "@type": "Offer", price: "299", priceCurrency: "USD" },
};

function CTA({ label = "Get my new website" }: { label?: string }) {
  return (
    <Link
      href={contactHref}
      className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:opacity-90"
      style={{ background: "linear-gradient(135deg, #B8860B, #9C7208)" }}
    >
      {label} <ArrowRight className="w-4 h-4" />
    </Link>
  );
}

export default async function LaWebsitePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { site } = await searchParams;
  const initialUrl = typeof site === "string" ? site.slice(0, 300) : "";

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "LA Trade Websites" }]} />

        <section className="pt-8 pb-12 max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-wider mb-4">For Los Angeles plumbers, handymen, HVAC & contractors</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            A website that turns Google searches into job requests.
          </h1>
          <p className="text-slate-700 text-xl leading-8 mb-8">
            Your own domain, a quote form that sends every request to your phone, and Google set up properly.{" "}
            <span className="font-semibold text-slate-900">{PRICE} one-time.</span> Live in about 5 days.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <CTA />
            <span className="flex items-center gap-1.5 text-slate-600 text-sm">
              <Clock className="w-4 h-4" /> We reply within a few hours
            </span>
          </div>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <div className="p-6 md:p-8 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 className="text-2xl font-bold mb-2">Free: check your current website</h2>
            <p className="text-slate-600 mb-6">
              Paste your website address. In about 10 seconds you&apos;ll see your score and what&apos;s costing you calls.
            </p>
            <WebsiteGrader initialUrl={initialUrl} />
          </div>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Sound familiar?</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {problems.map((p) => (
              <li key={p} className="flex gap-3 p-4 rounded-xl border border-slate-200">
                <span className="text-red-600 font-bold">✕</span>
                <span className="text-slate-700">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-2">Everything included for {PRICE}</h2>
          <p className="text-slate-600 mb-6">One price, no monthly bill, no surprises.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {included.map(({ icon: Icon, title: t, body }) => (
              <div key={t} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <Icon className="w-5 h-5 text-[#7A5807] mb-3" />
                <h3 className="text-lg font-semibold mb-2">{t}</h3>
                <p className="text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">How it works</h2>
          <ol className="grid md:grid-cols-3 gap-4">
            {steps.map((step, i) => (
              <li key={step.title} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <span className="text-sm font-semibold text-[#7A5807]">Step {i + 1}</span>
                <h3 className="text-lg font-semibold mt-2 mb-2">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <div className="p-8 rounded-2xl text-center border border-[#B8860B]/25 bg-[#B8860B]/5">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready for a website that brings in work?</h2>
            <p className="text-slate-700 mb-6">{PRICE} one-time. Half to start, half when you&apos;re happy.</p>
            <CTA label="Start my website" />
          </div>
        </section>

        <section className="pb-24 max-w-5xl mx-auto px-6">
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
      </main>
      <Footer />
    </div>
  );
}
