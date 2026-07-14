"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const codeLines = [
  "const result = await db",
  "  .from('users')",
  "  .select('*')",
  "  .eq('active', true);",
  "",
  "// Row-level security enforced",
  "// Types auto-generated",
  "return result.data ?? [];",
];

function CodeTyper() {
  const [display, setDisplay] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (lineIdx >= codeLines.length) {
      timerRef.current = setTimeout(() => {
        setDisplay([]);
        setLineIdx(0);
        setCharIdx(0);
      }, 2400);
      return;
    }
    const line = codeLines[lineIdx];
    if (charIdx <= line.length) {
      timerRef.current = setTimeout(() => {
        setDisplay((prev) => {
          const next = [...prev];
          next[lineIdx] = line.slice(0, charIdx);
          return next;
        });
        setCharIdx((c) => c + 1);
      }, charIdx === 0 && line === "" ? 80 : 22);
    } else {
      timerRef.current = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, line === "" ? 0 : 60);
    }
    return () => clearTimeout(timerRef.current);
  }, [lineIdx, charIdx]);

  return (
    <pre className="text-xs leading-6 font-mono text-left overflow-hidden" style={{ color: "#a5b4fc" }}>
      {display.map((line, i) => (
        <span key={i} className="block">
          {line.startsWith("//") ? (
            <span style={{ color: "rgba(100,116,139,0.7)" }}>{line}</span>
          ) : line.startsWith("  ") ? (
            <span>
              {"  "}
              <span style={{ color: "#93c5fd" }}>{line.slice(2)}</span>
            </span>
          ) : (
            <span style={{ color: "#e2e8f0" }}>{line}</span>
          )}
        </span>
      ))}
      <span className="inline-block w-0.5 h-3.5 ml-0.5 align-middle bg-indigo-400 animate-pulse" />
    </pre>
  );
}

// Geometric SVG icons
const HexagonIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
    <path d="M14 2L25 8.5V19.5L14 26L3 19.5V8.5L14 2Z" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M14 8L20 11.5V17.5L14 21L8 17.5V11.5L14 8Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
  </svg>
);

const ClockIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
    <circle cx="14" cy="14" r="11" stroke={color} strokeWidth="1.5" />
    <path d="M14 8V14L18 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="14" cy="14" r="1.5" fill={color} />
  </svg>
);

const CircuitIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
    <rect x="3" y="3" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.5" />
    <rect x="17" y="3" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.5" />
    <rect x="3" y="17" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.5" />
    <rect x="17" y="17" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.5" />
    <path d="M11 7H17M21 11V17M7 11V17M11 21H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14" cy="14" r="2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
  </svg>
);

const RocketIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
    <path d="M14 4C14 4 9 10 9 16C9 19.3 11.7 22 15 22H15C18.3 22 21 19.3 21 16C21 10 16 4 14 4Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
    <circle cx="14" cy="15" r="2.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" />
    <path d="M9 18L6 22M19 18L22 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 22H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const features = [
  {
    id: "code",
    title: "Clean, Maintainable Code",
    desc: "We write code for the next engineer, not just today's deadline. Every project ships well-structured, documented, and easy to extend.",
    accent: "#818CF8",
    size: "large",
  },
  {
    id: "security",
    title: "Secure by Default",
    desc: "Auth, data isolation, input validation, and OWASP standards — baked in from day one, not bolted on after.",
    accent: "#A78BFA",
    size: "normal",
    icon: HexagonIcon,
  },
  {
    id: "delivery",
    title: "On-Time Delivery",
    desc: "Clear milestones, weekly demos, transparent communication. We respect your timeline.",
    accent: "#38BDF8",
    size: "normal",
    icon: ClockIcon,
  },
  {
    id: "tech",
    title: "Modern Tech Stack",
    desc: "Battle-tested, actively maintained technologies chosen for reliability and long-term viability.",
    accent: "#34D399",
    size: "normal",
    icon: CircuitIcon,
  },
  {
    id: "cicd",
    title: "CI/CD From Day One",
    desc: "Automated deployments, staging environments, rollback capability. Your team ships with confidence.",
    accent: "#FB923C",
    size: "normal",
    icon: RocketIcon,
  },
  {
    id: "partnership",
    title: "Long-Term Partnership",
    desc: "We think beyond the handoff. Our best relationships are ongoing — iterating, improving, scaling together.",
    accent: "#F472B6",
    size: "wide",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-10 md:py-16"
      style={{ background: "linear-gradient(180deg, #0B0F19 0%, #0D1220 50%, #0B0F19 100%)" }}
    >
      <div className="max-w-[92rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10"
        >
          <p
            className="mb-4 font-semibold uppercase"
            style={{ fontSize: 11, letterSpacing: "0.15em", color: "#818CF8" }}
          >
            Why Choose Us
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
            style={{ letterSpacing: "-0.025em" }}
          >
            Built for businesses, not demos.
          </h2>
          <p className="text-lg leading-8" style={{ color: "rgba(203,213,225,0.75)" }}>
            These aren&apos;t just values — they&apos;re commitments we make to every client on every project.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* Large card: Clean Code with code typer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="group relative lg:col-span-2 rounded-2xl border border-white/[0.07] p-7 overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.06) 100%)" }}
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "inset 0 0 0 1px rgba(129,140,248,0.2)" }}
            />
            <div className="grid sm:grid-cols-2 gap-8 items-start">
              <div>
                <h3
                  className="text-xl font-bold text-white mb-3 leading-snug"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  Clean, Maintainable Code
                </h3>
                <p className="text-sm leading-7" style={{ color: "rgba(148,163,184,0.8)" }}>
                  We write code for the next engineer, not just today&apos;s deadline. Every project is well-structured, documented, and easy to extend — because software outlives the sprint.
                </p>
              </div>
              <div
                className="rounded-xl p-4 border border-white/[0.06] overflow-hidden"
                style={{ background: "rgba(10,14,26,0.8)" }}
              >
                <CodeTyper />
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <BentoCell feature={features[1]} delay={0.07} />

          {/* Delivery */}
          <BentoCell feature={features[2]} delay={0.14} />

          {/* Tech Stack */}
          <BentoCell feature={features[3]} delay={0.21} />

          {/* CI/CD */}
          <BentoCell feature={features[4]} delay={0.28} />

          {/* Wide card: Long-Term Partnership with timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="group relative lg:col-span-3 rounded-2xl border border-white/[0.07] p-7 overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(244,114,182,0.07) 0%, rgba(168,85,247,0.05) 100%)" }}
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "inset 0 0 0 1px rgba(244,114,182,0.2)" }}
            />
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3
                  className="text-xl font-bold text-white mb-3 leading-snug"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  Long-Term Partnership
                </h3>
                <p className="text-sm leading-7" style={{ color: "rgba(148,163,184,0.8)" }}>
                  We think beyond the handoff. Our best client relationships are ongoing — iterating, improving, and scaling together. We&apos;re your technical co-founder for the long run.
                </p>
              </div>
              {/* Timeline */}
              <div className="flex items-center gap-0 overflow-x-auto pb-1">
                {["2019", "2020", "2021", "2022", "2023", "2024", "2025"].map((year, i, arr) => (
                  <div key={year} className="flex items-center">
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                        className="w-3 h-3 rounded-full border-2"
                        style={{
                          borderColor: "#F472B6",
                          background: i === arr.length - 1 ? "#F472B6" : "transparent",
                        }}
                      />
                      <span className="text-xs text-slate-500 font-mono">{year}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.05, duration: 0.3 }}
                        className="h-px w-10 sm:w-14 origin-left shrink-0"
                        style={{ background: "linear-gradient(90deg, #F472B6, rgba(244,114,182,0.2))" }}
                      />
                    )}
                  </div>
                ))}
                <div className="ml-2 shrink-0">
                  <span className="text-xs font-semibold text-pink-400">Present</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BentoCell({
  feature,
  delay,
}: {
  feature: { id: string; title: string; desc: string; accent: string; icon?: React.ComponentType<{ color: string }> };
  delay: number;
}) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 overflow-hidden transition-all duration-300"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-6 h-px rounded-full opacity-50"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)` }}
      />
      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${feature.accent}30` }}
      />
      {/* Hover bg glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 20% 20%, ${feature.accent}08, transparent 60%)` }}
      />
      {Icon && (
        <div
          className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-105"
          style={{ background: `${feature.accent}12`, borderColor: `${feature.accent}25` }}
        >
          <Icon color={feature.accent} />
        </div>
      )}
      <h3 className="relative text-base font-bold text-white mb-2.5 leading-snug">{feature.title}</h3>
      <p className="relative text-sm leading-6.5" style={{ color: "rgba(148,163,184,0.75)" }}>
        {feature.desc}
      </p>
    </motion.div>
  );
}
