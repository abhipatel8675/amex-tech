"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";


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
      className={`border-b border-slate-200 last:border-b-0 rounded-xl transition-colors duration-300 ${isOpen ? "bg-[#D4AF37]/[0.04]" : ""}`}
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
              background: isOpen ? "rgba(212,175,55,0.12)" : "rgba(15,23,42,0.04)",
              border: `1px solid ${isOpen ? "rgba(212,175,55,0.25)" : "rgba(15,23,42,0.06)"}`,
              transition: "all 0.2s",
            }}
          >
            {num}
          </span>
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#806010] transition-colors leading-snug">
            {faq.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`shrink-0 mt-0.5 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 ring-2 ring-[#D4AF37]/10"
              : "border-slate-200 bg-slate-50 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/5 group-hover:ring-2 group-hover:ring-[#D4AF37]/10"
          }`}
        >
          <Plus className={`w-3.5 h-3.5 transition-colors ${isOpen ? "text-[#806010]" : "text-slate-500 group-hover:text-[#806010]"}`} />
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
            <p className="pb-5 px-3 pl-12 text-slate-500 leading-7 text-[14px]">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const half = Math.ceil(faqs.length / 2);
  const col1 = faqs.slice(0, half);
  const col2 = faqs.slice(half);

  return (
    <section aria-label="Frequently asked questions" className="py-10 md:py-14 border-t border-slate-200">
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
            className="mb-4 font-semibold uppercase text-[#806010]"
            style={{ fontSize: 11, letterSpacing: "0.15em" }}
          >
            Common Questions
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5"
            style={{ letterSpacing: "-0.025em" }}
          >
            Common questions, answered.
          </h2>
          <p className="text-lg leading-8" style={{ color: "#475569" }}>
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
              <FAQItem key={i + half} faq={faq} index={i + half} openIndex={openIndex} setOpenIndex={setOpenIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
