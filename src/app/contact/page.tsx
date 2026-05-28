import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Amex Technology. Tell us what you're building and we'll respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 max-w-6xl mx-auto px-6">
        <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-4">
          Contact Us
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-xl mb-5">
          Let's build something great together.
        </h1>
        <p className="text-[#555] text-base md:text-lg max-w-xl leading-relaxed">
          Tell us what you're working on. We'll come back with an honest assessment and a clear
          plan — within 24 hours.
        </p>
      </section>

      {/* Main content */}
      <section className="pb-24 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form — takes up more space */}
          <div className="lg:col-span-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-7 md:p-9">
            <h2 className="text-lg font-bold text-white mb-6">Tell us about your project</h2>
            <ContactForm />
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Contact details */}
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-5">Contact Info</h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111] border border-[#1f1f1f] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#00dc82]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#444] mb-0.5">Email</p>
                    <a
                      href="mailto:contact@amextechnology.com"
                      className="text-sm text-[#666] hover:text-white transition-colors"
                    >
                      contact@amextechnology.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111] border border-[#1f1f1f] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#00dc82]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#444] mb-0.5">Response Time</p>
                    <p className="text-sm text-[#666]">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111] border border-[#1f1f1f] flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-3.5 h-3.5 text-[#00dc82]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#444] mb-0.5">Availability</p>
                    <p className="text-sm text-[#666]">Mon – Sat, 9am – 8pm IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-5">Common Questions</h3>
              <div className="flex flex-col gap-5">
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
                    <p className="text-xs font-semibold text-white mb-1">{item.q}</p>
                    <p className="text-xs text-[#555] leading-relaxed">{item.a}</p>
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
