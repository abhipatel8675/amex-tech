"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We dig into your goals, constraints, and user needs. Every product decision starts here.",
  },
  {
    number: "02",
    title: "Planning",
    desc: "Architecture decisions, tech stack selection, scope definition, and timeline with clear milestones.",
  },
  {
    number: "03",
    title: "UI/UX Design",
    desc: "Wireframes and high-fidelity designs before a line of code is written. You approve, we build.",
  },
  {
    number: "04",
    title: "Development",
    desc: "Iterative development with weekly demos. You always know what's been built and what's next.",
  },
  {
    number: "05",
    title: "Testing & QA",
    desc: "Functional testing, edge case coverage, performance audits, and cross-device checks.",
  },
  {
    number: "06",
    title: "Deployment",
    desc: "Zero-downtime deployment to production with CI/CD, monitoring, and rollback ready.",
  },
  {
    number: "07",
    title: "Maintenance",
    desc: "Post-launch support, updates, performance monitoring, and iterating based on real user data.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-16"
        >
          <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-3">
            How We Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            A process designed for clarity and speed.
          </h2>
          <p className="mt-4 text-[#555] text-base leading-relaxed">
            No surprises. No scope creep. Just a structured process that delivers quality software on
            time, every time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1f1f1f] to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative flex flex-col"
              >
                {/* Step number bubble */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center mb-4 self-start lg:self-center">
                  <span className="text-[#00dc82] font-bold text-sm">{step.number}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 lg:text-center">{step.title}</h3>
                <p className="text-xs text-[#555] leading-relaxed lg:text-center">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
