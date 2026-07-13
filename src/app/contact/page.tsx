import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Mail, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Start a Project — Get a Free Quote",
  description:
    "Ready to build something great? Get a free project quote from Amex Technology. Tell us what you're building and we'll respond within 24 hours with an honest plan.",
  alternates: {
    canonical: "https://amextechnology.com/contact",
  },
  openGraph: {
    title: "Start a Project — Get a Free Quote | Amex Technology",
    description:
      "Get a free project quote from Amex Technology. Tell us what you're building and we'll respond within 24 hours.",
    url: "https://amextechnology.com/contact",
  },
  twitter: {
    title: "Start a Project — Get a Free Quote | Amex Technology",
    description:
      "Get a free project quote from Amex Technology. Tell us what you're building and we'll respond within 24 hours.",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      {/* Hero */}
      <section className="pt-8 pb-16 max-w-7xl mx-auto px-6">
        <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-5">
          Contact Us
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-2xl mb-6 leading-tight">
          Let's build something great together.
        </h1>
        <p className="text-slate-300 text-xl max-w-xl leading-8">
          Tell us what you're working on. We'll come back with an honest assessment and a clear
          plan — within 24 hours.
        </p>
      </section>

      {/* Main content */}
      <section className="pb-28 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8 md:p-10">
            <h2 className="text-xl font-bold text-white mb-7">Tell us about your project</h2>
            <ContactForm />
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Contact details */}
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-7">
              <h3 className="text-base font-semibold text-white mb-6">Contact Info</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Email</p>
                    <a
                      href="mailto:abhipatel8675@gmail.com"
                      className="text-base text-slate-300 hover:text-white transition-colors"
                    >
                      abhipatel8675@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Response Time</p>
                    <p className="text-base text-slate-300">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Availability</p>
                    <p className="text-base text-slate-300">Mon – Sat, 9am – 8pm IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-7">
              <h3 className="text-base font-semibold text-white mb-6">Common Questions</h3>
              <div className="flex flex-col gap-6">
                {[
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
                  {
                    q: "Do you offer ongoing maintenance?",
                    a: "Yes — we offer retainer-based support plans after project completion.",
                  },
                ].map((item) => (
                  <div key={item.q}>
                    <p className="text-sm font-semibold text-white mb-2">{item.q}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
