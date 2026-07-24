"use client";

import { motion } from "framer-motion";
import { AnimatedLogoDraw } from "@/components/ui/AnimatedLogoDraw";

// Geometric SVG icons
const HexagonIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
    <path d="M14 2L25 8.5V19.5L14 26L3 19.5V8.5L14 2Z" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M14 8L20 11.5V17.5L14 21L8 17.5V11.5L14 8Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" />
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
    <circle cx="14" cy="14" r="2" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1" />
  </svg>
);

const RocketIcon = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
    <path d="M14 4C14 4 9 10 9 16C9 19.3 11.7 22 15 22H15C18.3 22 21 19.3 21 16C21 10 16 4 14 4Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.12" />
    <circle cx="14" cy="15" r="2.5" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1" />
    <path d="M9 18L6 22M19 18L22 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 22H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const features = [
  {
    id: "code",
    title: "Clean, Maintainable Code",
    desc: "We write code for the next engineer, not just today's deadline. Every project ships well-structured, documented, and easy to extend — because software outlives the sprint.",
    accent: "#818CF8",
    size: "large",
  },
  {
    id: "security",
    title: "Secure by Default",
    desc: "Auth, row-level data isolation, input sanitization, and OWASP Top 10 protections — built in from day one. You never pay to retrofit security.",
    accent: "#A78BFA",
    size: "normal",
    icon: HexagonIcon,
  },
  {
    id: "delivery",
    title: "On-Time Delivery",
    desc: "Clear milestones, weekly demos, and async updates. Your launch date isn't a target — it's a commitment we make at kick-off.",
    accent: "#38BDF8",
    size: "normal",
    icon: ClockIcon,
  },
  {
    id: "tech",
    title: "Modern Tech Stack",
    desc: "We choose battle-tested, actively maintained frameworks — not trend-chasing. Your codebase stays upgradeable and hireable for years.",
    accent: "#34D399",
    size: "normal",
    icon: CircuitIcon,
  },
  {
    id: "cicd",
    title: "CI/CD From Day One",
    desc: "Automated pipelines, staging environments, and one-click rollback — so your team ships fearlessly without waiting on manual deploys.",
    accent: "#FB923C",
    size: "normal",
    icon: RocketIcon,
  },
  {
    id: "partnership",
    title: "Long-Term Partnership",
    desc: "We think past the handoff. Our best client relationships are ongoing — iterating, scaling, and improving together as your business grows.",
    accent: "#F472B6",
    size: "wide",
  },
];

// Timeline years 2019–2026
const timelineYears = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];

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
            className="mb-3 font-semibold uppercase"
            style={{ fontSize: 11, letterSpacing: "0.15em", color: "#818CF8" }}
          >
            Why Clients Choose Us
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
            className="group relative lg:col-span-2 rounded-2xl border border-white/[0.07] p-7 overflow-hidden transition-all duration-300 hover:border-indigo-500/30"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.06) 100%)" }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 inset-x-8 h-px rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(90deg, transparent, #818CF8, transparent)" }}
            />
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "0 0 0 1px rgba(129,140,248,0.25), 0 0 32px rgba(99,102,241,0.08) inset" }}
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
                className="rounded-xl p-4 border border-white/[0.06] overflow-hidden flex items-center justify-center"
                style={{ background: "rgba(10,14,26,0.85)" }}
              >
                <AnimatedLogoDraw size={32} textClassName="text-lg" />
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
            className="group relative lg:col-span-3 rounded-2xl border border-white/[0.07] p-7 overflow-hidden transition-all duration-300 hover:border-pink-500/30"
            style={{ background: "linear-gradient(135deg, rgba(244,114,182,0.07) 0%, rgba(168,85,247,0.05) 100%)" }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 inset-x-8 h-px rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(90deg, transparent, #F472B6, transparent)" }}
            />
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "0 0 0 1px rgba(244,114,182,0.22), 0 0 32px rgba(244,114,182,0.06) inset" }}
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
                  We think beyond the handoff. Our best client relationships are ongoing — iterating, improving, and scaling together. We&apos;re your technical partner for the long run.
                </p>
              </div>
              {/* Timeline 2019–2026 */}
              <div className="flex items-center gap-0 overflow-x-auto pb-1">
                {timelineYears.map((year, i, arr) => (
                  <div key={year} className="flex items-center">
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.09, type: "spring", stiffness: 300 }}
                        className="w-3 h-3 rounded-full border-2"
                        style={{
                          borderColor: "#F472B6",
                          background: i === arr.length - 1 ? "#F472B6" : "transparent",
                          boxShadow: i === arr.length - 1 ? "0 0 8px rgba(244,114,182,0.6)" : "none",
                        }}
                      />
                      <span className="text-xs text-slate-500 font-mono">{year}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.09 + 0.05, duration: 0.3 }}
                        className="h-px w-8 sm:w-12 origin-left shrink-0"
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
      className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 overflow-hidden transition-all duration-300"
      style={
        {
          "--accent": feature.accent,
        } as React.CSSProperties
      }
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-6 h-px rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)` }}
      />
      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none"
        style={{ boxShadow: `0 0 0 1px ${feature.accent}40, 0 0 28px ${feature.accent}0a inset` }}
      />
      {/* Hover bg glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 15% 15%, ${feature.accent}0a, transparent 60%)` }}
      />
      {Icon && (
        <div
          className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-105"
          style={{ background: `${feature.accent}14`, borderColor: `${feature.accent}28` }}
        >
          <Icon color={feature.accent} />
        </div>
      )}
      <h3 className="relative text-base font-bold text-white mb-2.5 leading-snug">{feature.title}</h3>
      <p className="relative text-sm leading-7" style={{ color: "rgba(148,163,184,0.78)" }}>
        {feature.desc}
      </p>
    </motion.div>
  );
}
