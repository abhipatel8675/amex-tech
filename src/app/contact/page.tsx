import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Mail, Clock, MessageSquare, ShieldCheck, Gift, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Start a Project — Get a Free Quote",
  description:
    "Get a free project quote from Amex Technology. Tell us what you're building and we'll respond within 4 hours.",
  alternates: {
    canonical: "https://amextechnology.com/contact",
  },
  openGraph: {
    title: "Start a Project — Get a Free Quote | Amex Technology",
    description:
      "Get a free project quote from Amex Technology. Tell us what you're building and we'll respond within 4 hours.",
    url: "https://amextechnology.com/contact",
  },
  twitter: {
    title: "Start a Project — Get a Free Quote | Amex Technology",
    description:
      "Get a free project quote from Amex Technology. Tell us what you're building and we'll respond within 4 hours.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://amextechnology.com/contact" },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Amex Technology",
  url: "https://amextechnology.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Amex Technology",
    url: "https://amextechnology.com",
    email: "abhipatel8675@gmail.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "abhipatel8675@gmail.com",
      availableLanguage: "English",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
    },
  },
};

const trustItems = [
  {
    icon: Clock,
    title: "4-hour response time",
    desc: "We typically respond within 4 hours during business hours — not 24.",
    color: "#818CF8",
  },
  {
    icon: Gift,
    title: "Free, no-obligation consultation",
    desc: "Our initial scoping call is completely free. You get honest advice either way.",
    color: "#A78BFA",
  },
  {
    icon: ShieldCheck,
    title: "Secure & confidential",
    desc: "Your project details stay private. We never share client information with third parties.",
    color: "#38BDF8",
  },
  {
    icon: MessageSquare,
    title: "Mon–Sat, 9am–8pm IST",
    desc: "We're available across time zones and can schedule calls to suit your schedule.",
    color: "#F472B6",
  },
];

const nextSteps = [
  { step: "01", label: "We review your submission", desc: "Our team reads every inquiry carefully — no auto-replies." },
  { step: "02", label: "We reach out within 4 hours", desc: "Expect a direct reply from a real engineer, not a sales rep." },
  { step: "03", label: "Discovery call", desc: "We align on scope, timeline, and budget — then send a clear proposal." },
];

const faqItems = [
  {
    q: "How quickly can you start?",
    a: "Typically within 1–3 business days of scoping alignment, depending on current workload.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes. We've helped founders go from idea to live product and understand the constraints of pre-seed budgets.",
  },
  {
    q: "What does the process look like?",
    a: "Discovery → Proposal → Design → Build → QA → Deploy. We keep you informed every step of the way.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ContactPage() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

        {/* Hero */}
        <section className="relative pt-8 pb-12 overflow-hidden">
          <div className="grid-pattern absolute inset-0 opacity-40 pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-6 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #6366F1, transparent 70%)" }} />
          <div className="relative max-w-7xl mx-auto px-6">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-5">Contact Us</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl mb-6 leading-[1.05]">
              Let&apos;s build something{" "}
              <span style={{ background: "linear-gradient(135deg, #818CF8, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                great together.
              </span>
            </h1>
            <p className="text-slate-300 text-xl max-w-xl leading-8">
              Tell us what you&apos;re working on. We&apos;ll come back with an honest assessment and a clear plan — within 4 hours.
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="pb-16 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* Left column: trust + next steps */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Trust items */}
              <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 overflow-hidden">
                <div className="absolute top-0 inset-x-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #818CF870, transparent)" }} />
                <h2 className="text-base font-semibold text-white mb-7">Why work with us</h2>
                <div className="flex flex-col gap-6">
                  {trustItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border" style={{ background: `${item.color}12`, borderColor: `${item.color}28` }}>
                          <Icon style={{ color: item.color, width: "16px", height: "16px" }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                          <p className="text-sm text-slate-400 leading-6">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* What happens next */}
              <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 overflow-hidden">
                <div className="absolute top-0 inset-x-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #A78BFA70, transparent)" }} />
                <h2 className="text-base font-semibold text-white mb-7">What happens next</h2>
                <div className="flex flex-col gap-5">
                  {nextSteps.map((item, i) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-indigo-400">{item.step}</span>
                        </div>
                        {i < nextSteps.length - 1 && <div className="w-px flex-1 bg-white/[0.06] mt-2" />}
                      </div>
                      <div className="pb-5">
                        <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
                        <p className="text-sm text-slate-400 leading-6">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email direct */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
                <h2 className="text-base font-semibold text-white mb-4">Or email us directly</h2>
                <a
                  href="mailto:abhipatel8675@gmail.com"
                  className="group inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  abhipatel8675@gmail.com
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right column: form */}
            <div className="lg:col-span-3 relative rounded-2xl border border-white/[0.1] bg-white/[0.025] p-8 md:p-10 overflow-hidden">
              <div className="absolute top-0 inset-x-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #6366F180, transparent)" }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.05), transparent 60%)" }} />
              <div className="relative">
                <h2 className="text-xl font-bold text-white mb-2">Tell us about your project</h2>
                <p className="text-sm text-slate-400 mb-8">Fill in the details below and we&apos;ll get back to you within 4 hours.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ strip */}
        <section className="pb-20 max-w-7xl mx-auto px-6">
          <div className="border-t border-white/[0.06] pt-14">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 tracking-tight">Common questions</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {faqItems.map((item) => (
                <div
                  key={item.q}
                  className="relative p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.11] transition-all duration-200 overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #818CF840, transparent)" }} />
                  <p className="text-sm font-semibold text-white mb-3">{item.q}</p>
                  <p className="text-sm text-slate-400 leading-6">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
