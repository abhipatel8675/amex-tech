"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, margin: "-20% 0px" });

  return (
    <section className="py-10 md:py-16 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[92rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14"
        >
          <p
            className="mb-4 font-semibold uppercase"
            style={{ fontSize: 11, letterSpacing: "0.15em", color: "#818CF8" }}
          >
            How We Work
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
            style={{ letterSpacing: "-0.025em" }}
          >
            A process built for clarity and speed.
          </h2>
          <p className="text-lg leading-8" style={{ color: "rgba(203,213,225,0.75)" }}>
            No surprises. No scope creep. A structured workflow that delivers quality software on time, every engagement.
          </p>
        </motion.div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block">
          <div ref={lineRef} className="relative">
            {/* Connecting line */}
            <div className="absolute top-[22px] left-0 right-0 h-px bg-white/[0.06]">
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  background: "linear-gradient(90deg, #6366F1, #A78BFA, #8B5CF6)",
                  right: isInView ? "0%" : "100%",
                  transition: isInView ? "right 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : undefined,
                }}
              />
            </div>

            {/* Steps */}
            <div className="grid grid-cols-7 gap-2">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex flex-col items-center text-center gap-4"
                >
                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.3, type: "spring", stiffness: 300, damping: 20 }}
                    className="relative w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] z-10"
                    style={{
                      background: "linear-gradient(145deg, #141E33 0%, #0F172A 100%)",
                      borderColor: "rgba(99,102,241,0.4)",
                      boxShadow: "0 0 16px rgba(99,102,241,0.12)",
                    }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{
                        background: "linear-gradient(135deg, #818CF8, #A78BFA)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {step.number}
                    </span>
                  </motion.div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                    <p className="text-xs leading-5" style={{ color: "rgba(100,116,139,0.9)" }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Vertical timeline */}
        <div className="lg:hidden relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-white/[0.06]">
            <motion.div
              className="absolute inset-x-0 top-0"
              style={{ background: "linear-gradient(180deg, #6366F1, #A78BFA)" }}
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </div>

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative flex gap-5 items-start"
              >
                {/* Node */}
                <div
                  className="absolute -left-8 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border z-10"
                  style={{
                    background: "linear-gradient(145deg, #141E33 0%, #0F172A 100%)",
                    borderColor: "rgba(99,102,241,0.4)",
                    top: 0,
                  }}
                >
                  <span
                    className="text-[9px] font-bold"
                    style={{
                      background: "linear-gradient(135deg, #818CF8, #A78BFA)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-sm leading-6" style={{ color: "rgba(100,116,139,0.9)" }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
