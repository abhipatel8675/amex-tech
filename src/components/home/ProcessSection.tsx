"use client";

import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Discovery", desc: "Deep dive into your goals, constraints, users, and success criteria." },
  { number: "02", title: "Planning", desc: "Architecture, tech stack, scope definition, and milestone timeline." },
  { number: "03", title: "Design", desc: "Wireframes and high-fidelity UI before a line of code is written." },
  { number: "04", title: "Build", desc: "Iterative development with weekly demos and clear progress updates." },
  { number: "05", title: "QA", desc: "Functional testing, performance audits, and cross-device coverage." },
  { number: "06", title: "Deploy", desc: "Zero-downtime launch with CI/CD, monitoring, and rollback ready." },
  { number: "07", title: "Support", desc: "Post-launch partnership: updates, performance, and feature iteration." },
];

export default function ProcessSection() {
  return (
    <section className="py-32 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-20"
        >
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">
            How We Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-5">
            A process designed for clarity and speed.
          </h2>
          <p className="text-slate-300 text-lg leading-8">
            No surprises. No scope creep. A structured workflow that delivers quality software on time, every engagement.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-5 lg:gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative"
            >
              {/* Connector line (desktop, not last) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-6 left-[calc(50%+28px)] right-0 h-px"
                  style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.3), rgba(99,102,241,0.05))" }}
                />
              )}

              <div className="flex flex-col items-center lg:items-center text-left lg:text-center gap-4">
                {/* Number badge */}
                <div
                  className="relative w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: "linear-gradient(145deg, #141E33 0%, #0F172A 100%)",
                    borderColor: "rgba(99,102,241,0.3)",
                    boxShadow: "0 0 20px rgba(99,102,241,0.1)",
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #818CF8, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
