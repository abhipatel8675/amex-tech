"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Tell Us What You Need",
    desc: "Fill the contact form or book a free 30-min call. Describe your project, stack, deadline, and budget.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Get a Clear Proposal",
    desc: "We respond within 24 hours with a detailed scope, timeline, and fixed price. No surprises.",
  },
  {
    icon: Code2,
    step: "03",
    title: "We Build & Update You",
    desc: "Work starts immediately after payment. You get progress updates every 24-48 hours via email or Slack.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Deliver & Deploy",
    desc: "You receive clean code on GitHub + live deployed URL. Revisions included until you're 100% satisfied.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs text-indigo-400 bg-[#B8860B]/10 border border-[#B8860B]/20 px-3 py-1.5 rounded-full mb-4">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple 4-Step Process</h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            From first message to live product. No agencies, no middlemen — you work directly with the developer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[60%] right-0 h-px bg-gradient-to-r from-slate-200 to-transparent" />
                )}
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="text-2xl font-bold text-slate-200">{s.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
