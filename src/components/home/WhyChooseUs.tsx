"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Code2, Clock, Lock, GitMerge, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: Code2,
    title: "Clean, Maintainable Code",
    desc: "We write code for humans first. Every project is structured, documented, and easy for your next developer to pick up.",
  },
  {
    icon: ShieldCheck,
    title: "Modern Tech Stack",
    desc: "We use battle-tested, actively maintained technologies — no legacy frameworks or half-baked trends.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "We respect your timeline. Clear milestones, regular updates, and no surprise delays.",
  },
  {
    icon: Lock,
    title: "Secure by Default",
    desc: "Security isn't an afterthought. Auth, data isolation, input validation, and dependency audits are standard.",
  },
  {
    icon: GitMerge,
    title: "CI/CD From Day One",
    desc: "Automated deployments, staging environments, and rollback capability — built in from the start.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnership",
    desc: "We think beyond the handoff. We're available for support, iteration, and growth after launch.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-14"
        >
          <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Built for businesses, not just demos.
          </h2>
          <p className="mt-4 text-[#555] text-base leading-relaxed">
            We've seen what separates products that scale from ones that break. These principles
            guide every project we take on.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="p-6 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#2a2a2a] transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#111] border border-[#1f1f1f] flex items-center justify-center mb-4 group-hover:border-[#00dc82]/20 transition-colors">
                  <Icon className="w-4 h-4 text-[#00dc82]" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{reason.title}</h3>
                <p className="text-sm text-[#555] leading-relaxed">{reason.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
