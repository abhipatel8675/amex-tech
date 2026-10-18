import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FixItCTA from "@/components/blog/FixItCTA";
import { FIX_OFFER } from "@/data/fixOffer";
import { blogPosts } from "@/data/blog";

const title = "Fix Your App Error in 24 Hours";
const description =
  "Stuck on a Supabase, Firebase, Lovable, Next.js or Vercel error? Our senior developers fix it, usually within 24 hours. Get a free assessment.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Amex Technology` },
  description,
  alternates: { canonical: "https://amextechnology.com/fix" },
  openGraph: { title: `${title} | Amex Technology`, description, url: "https://amextechnology.com/fix" },
  twitter: { title: `${title} | Amex Technology`, description },
};

const steps = [
  { title: "Contact us", body: "Tell us what's broken. We'll review it for free and reply within a few hours." },
  {
    title: "Share access",
    body: "Once you're happy with the plan, share the error message, a screenshot and access to your repo or project.",
  },
  {
    title: "We fix it, usually within 24 hours",
    body: "A senior developer finds the root cause, fixes it, and sends you a short write-up of what changed.",
  },
];

const stacks = ["Supabase", "Firebase", "Lovable", "Bolt.new", "Replit", "Next.js", "React", "Vercel", "Cloudflare & DNS", "Resend & email"];

const faq = [
  {
    question: "What kind of problems do you fix?",
    answer:
      "Failing builds, auth errors, RLS policies blocking inserts, broken deploys, CORS errors, DNS and domain issues, and most other errors in Supabase, Firebase, Lovable, Bolt, Replit, Next.js and Vercel projects.",
  },
  {
    question: "How much does it cost?",
    answer: "It depends on the problem. Contact us with the details and we'll give you a free assessment and a quote before any work starts.",
  },
  {
    question: "What access do you need?",
    answer:
      "Usually read/write access to your GitHub repo plus the dashboard involved (Supabase, Firebase, Vercel, Lovable, etc.). We'll tell you exactly what's needed, and you can revoke access once the fix is done.",
  },
  {
    question: "When does the 24 hours start?",
    answer: "As soon as we have the error details and access to your project.",
  },
  {
    question: "My project needs more than one fix.",
    answer: "Get a free quote for bigger work and we'll scope it with you.",
  },
];

const troubleshootingPosts = blogPosts.filter((p) => p.slug.startsWith("fix-")).slice(0, 8);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: FIX_OFFER.name,
  description,
  url: "https://amextechnology.com/fix",
  provider: { "@type": "Organization", name: "Amex Technology", url: "https://amextechnology.com" },
  areaServed: "Worldwide",
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
    { "@type": "ListItem", position: 2, name: "24-Hour Bug Fix", item: "https://amextechnology.com/fix" },
  ],
};

export default function FixPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "24-Hour Bug Fix" }]} />

        <section className="pt-8 pb-12 max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-wider mb-4">{FIX_OFFER.name}</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Your app is broken. We&apos;ll get it working again, fast.
          </h1>
          <p className="text-slate-700 text-xl leading-8 mb-8">
            Stop losing days to an error message. Send it to our developers and get your project working again,
            usually within 24 hours.
          </p>
          <div className="flex flex-wrap gap-2">
            {stacks.map((s) => (
              <span
                key={s}
                className="text-sm text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg"
              >
                {s}
              </span>
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
          <FixItCTA topic="app" source="fix-page" variant="full" showHowItWorks={false} />
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
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

        {troubleshootingPosts.length > 0 && (
          <section className="pb-24 max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-2">Prefer to fix it yourself?</h2>
            <p className="text-slate-600 mb-6">
              Our free step-by-step guides cover the most common errors. Not sure what&apos;s wrong?{" "}
              <Link href="/tools/app-checker" className="font-semibold text-[#7A5807] hover:underline">
                Run the free App Checker
              </Link>
              .
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {troubleshootingPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group p-5 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100 transition-all duration-200"
                >
                  <p className="font-semibold text-slate-900 group-hover:text-[#7A5807] transition-colors leading-snug">
                    {post.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
