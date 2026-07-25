"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "How much does custom software development cost?",
    answer:
      "Cost depends on scope, complexity, and timeline. A professional website starts from $500–$2,000, a web application from $3,000–$10,000, and a full SaaS platform from $5,000+. We provide a detailed, itemised quote after a free discovery call — no commitment required.",
  },
  {
    question: "How long does it take to build a web application?",
    answer:
      "Most web applications take 6–12 weeks from kickoff to launch. A simple website can be delivered in 2–4 weeks. A complex SaaS platform with custom features typically takes 3–6 months. We share a milestone-by-milestone timeline during the proposal stage so you always know what's next.",
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Yes — the majority of our clients are based in North America, Europe, and Australia. We work fully remotely and are comfortable with time zone differences. All communication is in English and we maintain overlapping working hours with every client.",
  },
  {
    question: "What technologies do you specialise in?",
    answer:
      "Our core stack is Next.js, React, TypeScript, Node.js, and PostgreSQL (via Supabase). For mobile, we use React Native and Expo. For AI automation, we work with n8n, Zapier, Make, and the OpenAI and LangChain APIs. We choose the right technology for the job rather than forcing a single stack.",
  },
  {
    question: "Do you offer SEO and AI automation services?",
    answer:
      "Yes. We offer full technical SEO — audits, on-page optimisation, Core Web Vitals, and schema markup — as well as AI-powered workflow automation using tools like n8n, Zapier, Make, and custom LangChain agents. These services can be standalone or delivered alongside a development project.",
  },
  {
    question: "Can you build a SaaS product from scratch?",
    answer:
      "Absolutely. We've built multiple SaaS platforms from idea to production — covering multi-tenant architecture, subscription billing with Stripe, role-based access control, usage analytics dashboards, and automated onboarding flows. We handle the full stack so you can focus on your customers.",
  },
  {
    question: "Do you offer maintenance and support after launch?",
    answer:
      "Yes. Every project includes a post-launch support period, and we offer ongoing retainer plans for maintenance, bug fixes, dependency updates, performance monitoring, and feature development. Plans are flexible — from a few hours per month to a full ongoing development partnership.",
  },
  {
    question: "Can you work with an existing codebase or fix a broken project?",
    answer:
      "Yes. We regularly inherit codebases from other agencies, internal teams, and no-code platforms like Bubble or Lovable. We start with a thorough code audit, document what we find, and propose a clear, costed path forward. We don't rewrite unless it's genuinely necessary.",
  },
  {
    question: "How do you handle project communication and updates?",
    answer:
      "We use a structured process: weekly video calls, a shared project board (Notion or Linear), and a dedicated Slack channel for async communication. You'll always know the current status, what's in progress, and what's coming next — no chasing required.",
  },
  {
    question: "Do you sign NDAs and protect client IP?",
    answer:
      "Yes. We sign NDAs before any sensitive discussions and our contracts include full IP assignment — everything we build for you is yours. We also follow secure development practices including environment isolation, secret management, and role-based access on all repositories.",
  },
];

function FAQItem({ faq, index, openIndex, setOpenIndex }: {
  faq: { question: string; answer: string };
  index: number;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}) {
  const isOpen = openIndex === index;
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={`border-b border-white/[0.06] last:border-b-0 rounded-xl transition-colors duration-300 ${isOpen ? "bg-[#D4AF37]/[0.04]" : ""}`}
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-4 py-5 px-3 text-left group"
      >
        <div className="flex items-start gap-3">
          {/* Number badge */}
          <span
            className="shrink-0 mt-0.5 text-[11px] font-bold tabular-nums px-1.5 py-0.5 rounded-md"
            style={{
              color: isOpen ? "#E1BC4A" : "#4B5568",
              background: isOpen ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${isOpen ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.06)"}`,
              transition: "all 0.2s",
            }}
          >
            {num}
          </span>
          <h3 className="text-base font-semibold text-white group-hover:text-[#E1BC4A] transition-colors leading-snug">
            {faq.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`shrink-0 mt-0.5 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 ring-2 ring-[#D4AF37]/10"
              : "border-white/[0.10] bg-white/[0.03] group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/5 group-hover:ring-2 group-hover:ring-[#D4AF37]/10"
          }`}
        >
          <Plus className={`w-3.5 h-3.5 transition-colors ${isOpen ? "text-[#E1BC4A]" : "text-slate-400 group-hover:text-[#E1BC4A]"}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 px-3 pl-12 text-slate-400 leading-7 text-[14px]">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const col1 = faqs.slice(0, 5);
  const col2 = faqs.slice(5);

  return (
    <section aria-label="Frequently asked questions" className="py-10 md:py-14 border-t border-white/[0.06]">
      <div className="max-w-[92rem] mx-auto px-6">
        {/* Header — left-aligned, matching other sections */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10"
        >
          <p
            className="mb-4 font-semibold uppercase text-[#E1BC4A]"
            style={{ fontSize: 11, letterSpacing: "0.15em" }}
          >
            Common Questions
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
            style={{ letterSpacing: "-0.025em" }}
          >
            Common questions, answered.
          </h2>
          <p className="text-lg leading-8" style={{ color: "rgba(203,213,225,0.75)" }}>
            Everything you need to know before starting a project with us.
          </p>
        </motion.div>

        {/* Two-column FAQ grid */}
        <div className="grid md:grid-cols-2 gap-x-16">
          <div>
            {col1.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
            ))}
          </div>
          <div>
            {col2.map((faq, i) => (
              <FAQItem key={i + 5} faq={faq} index={i + 5} openIndex={openIndex} setOpenIndex={setOpenIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
