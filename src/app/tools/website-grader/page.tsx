import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import WebsiteGrader from "@/components/tools/WebsiteGrader";

const title = "Free Website Grader for Local Businesses";
const description =
  "Is your website losing you calls? Get a free score in 10 seconds: mobile, tap-to-call, quote form, Google basics, speed and security. Built for contractors and local service businesses.";
const pageUrl = "https://amextechnology.com/tools/website-grader";

export const metadata: Metadata = {
  title: { absolute: `${title} | Amex Technology` },
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: `${title} | Amex Technology`, description, url: pageUrl },
  twitter: { title: `${title} | Amex Technology`, description },
};

const checks = [
  { heading: "Turning visitors into calls", items: ["Works on phones", "Tap-to-call phone number", "Quote or contact form"] },
  { heading: "Getting found on Google", items: ["Google title and description", "Your city and service area", "Main heading", "Local business details for map results", "Image descriptions"] },
  { heading: "Trust & speed", items: ['HTTPS (no "Not Secure" warning)', "Server speed and page weight", "Up-to-date footer", "Preview image when shared"] },
];

const faq = [
  { question: "Is it really free?", answer: "Yes. You see your score and biggest problems right away, and the full report with every fix is free by email." },
  { question: "Who is it for?", answer: "Plumbers, roofers, HVAC, electricians, cleaners, landscapers and other local service businesses that get customers from their website and Google." },
  { question: "Do you change anything on my site?", answer: "No. We only read your public homepage, the same way a visitor's browser does." },
  { question: "Can you fix the problems for me?", answer: "Yes. Book a free 15-minute call after your report and we'll tell you what's worth fixing first and what it costs." },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Website Grader",
    url: pageUrl,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Amex Technology", url: "https://amextechnology.com" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
      { "@type": "ListItem", position: 2, name: "Website Grader", item: pageUrl },
    ],
  },
];

export default async function WebsiteGraderPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { url } = await searchParams;
  const initialUrl = typeof url === "string" ? url.slice(0, 300) : "";

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Navbar />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Website Grader" }]} />

        <section className="pt-8 pb-10 max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-wider mb-4">Free tool</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">Is your website losing you calls?</h1>
          <p className="text-slate-700 text-xl leading-8 mb-8">
            Enter your business website. In about 10 seconds you&apos;ll see your score and the problems that stop visitors from calling you.
          </p>
          <WebsiteGrader initialUrl={initialUrl} />
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">What we check</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {checks.map((group) => (
              <div key={group.heading} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <h3 className="text-lg font-semibold mb-3">{group.heading}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-slate-700 leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
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
