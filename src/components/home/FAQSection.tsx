"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How much does custom software development cost?",
    answer:
      "Project costs vary based on scope, complexity, and timeline. A simple website starts from $2,000–$5,000, a web application from $8,000–$25,000, and a full SaaS platform from $20,000+. We provide a detailed, itemized quote after a discovery call at no charge.",
  },
  {
    question: "How long does it take to build a web application?",
    answer:
      "A typical web application takes 6–12 weeks from kickoff to launch. Simple websites can be completed in 2–4 weeks, while complex SaaS platforms with custom features can take 3–6 months. We share a detailed project timeline during the proposal stage.",
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Yes — the majority of our clients are based in North America, Europe, and Australia. We work fully remotely and are comfortable with time zone differences. All communication is in English and we maintain overlapping hours with clients across time zones.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "Our core stack is Next.js, React, TypeScript, Node.js, and PostgreSQL (via Supabase). For mobile, we use React Native and Expo. We also work with Tailwind CSS, Prisma, Stripe, and various AI APIs. We choose the right technology for each project rather than forcing a single stack.",
  },
  {
    question: "Do you offer maintenance after launch?",
    answer:
      "Yes. We offer retainer-based maintenance and support plans after every project. This covers bug fixes, dependency updates, performance monitoring, and feature additions. Plans start from a few hours per month to full ongoing development retainers.",
  },
  {
    question: "Can you work with an existing codebase?",
    answer:
      "Absolutely. We regularly inherit and extend existing codebases — including projects built by other agencies, no-code platforms like Lovable or Bubble, or internal teams. We conduct a code audit first, document what we find, and propose a clear path forward.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-label="Frequently asked questions" className="py-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">FAQ</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Common questions
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-white/[0.06]">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              className="w-full flex items-center justify-between gap-4 py-6 text-left group"
            >
              <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <p className="pb-6 text-slate-400 leading-7">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
