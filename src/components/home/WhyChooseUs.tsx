"use client";

import { motion } from "framer-motion";
import { Code2, ShieldCheck, Clock, Lock, GitMerge, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: Code2,
    title: "Clean, Maintainable Code",
    desc: "We write code for the next engineer, not just for today's deadline. Every project is well-structured, documented, and easy to extend.",
    gradient: "from-indigo-500/20 to-purple-500/20",
    border: "border-indigo-500/20",
    iconColor: "#818CF8",
  },
  {
    icon: ShieldCheck,
    title: "Modern Tech Stack",
    desc: "We use battle-tested, actively maintained technologies — chosen for reliability and long-term viability, not hype.",
    gradient: "from-violet-500/20 to-fuchsia-500/20",
    border: "border-violet-500/20",
    iconColor: "#A78BFA",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "We respect your timeline. Clear milestones, regular demos, and transparent communication throughout every engagement.",
    gradient: "from-sky-500/20 to-cyan-500/20",
    border: "border-sky-500/20",
    iconColor: "#38BDF8",
  },
  {
    icon: Lock,
    title: "Secure by Default",
    desc: "Security is never bolted on after the fact. Auth, data isolation, input validation, and OWASP standards are built in from day one.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
    iconColor: "#34D399",
  },
  {
    icon: GitMerge,
    title: "CI/CD From Day One",
    desc: "Automated deployments, staging environments, and rollback capability. Your team ships with confidence, not fear.",
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/20",
    iconColor: "#FB923C",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnership",
    desc: "We think beyond the handoff. Our best client relationships are ongoing — iterating, improving, and scaling together.",
    gradient: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/20",
    iconColor: "#F472B6",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28" style={{ background: "linear-gradient(180deg, #0B0F19 0%, #0D1220 50%, #0B0F19 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-16"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
            Built for businesses, not just demos.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            These aren't just values — they're commitments we make to every client on every project.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className={`group relative p-6 rounded-2xl border bg-gradient-to-br ${reason.gradient} ${reason.border} hover:scale-[1.01] transition-all duration-300 overflow-hidden`}
              >
                {/* Subtle glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 30%, ${reason.iconColor}10, transparent 70%)` }}
                />
                <div
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-5 border"
                  style={{ background: `${reason.iconColor}15`, borderColor: `${reason.iconColor}30` }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: reason.iconColor, width: "18px", height: "18px" }} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{reason.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{reason.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
