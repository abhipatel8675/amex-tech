"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

// Main services shown on the page
const mainServiceSlugs = [
  "web-development",
  "web-app-development",
  "mobile-app-development",
  "saas-development",
  "devops-deployment",
  "ui-ux-design",
  "seo-services",
  "ai-services",
];

// Inline SVG illustrations per service
function WebsiteIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="w-full h-full" aria-hidden>
      <rect x="10" y="10" width="260" height="160" rx="8" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
      <rect x="10" y="10" width="260" height="32" rx="8" fill="rgba(59,130,246,0.06)" />
      <circle cx="30" cy="26" r="6" fill="rgba(255,95,87,0.5)" />
      <circle cx="50" cy="26" r="6" fill="rgba(254,188,46,0.5)" />
      <circle cx="70" cy="26" r="6" fill="rgba(40,200,64,0.5)" />
      <rect x="90" y="18" width="120" height="16" rx="4" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
      <rect x="20" y="52" width="80" height="8" rx="2" fill="rgba(59,130,246,0.3)" />
      <rect x="20" y="68" width="120" height="5" rx="2" fill="rgba(255,255,255,0.07)" />
      <rect x="20" y="80" width="100" height="5" rx="2" fill="rgba(255,255,255,0.05)" />
      <rect x="20" y="92" width="110" height="5" rx="2" fill="rgba(255,255,255,0.06)" />
      <rect x="20" y="110" width="60" height="24" rx="4" fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
      <rect x="160" y="52" width="100" height="90" rx="6" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
      <rect x="170" y="62" width="80" height="50" rx="3" fill="rgba(59,130,246,0.08)" />
      {/* Cursor */}
      <motion.g
        animate={{ x: [0, 8, 0], y: [0, 4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M195 95L195 115L199 109L205 118L208 117L202 108L210 108Z" fill="rgba(59,130,246,0.7)" />
      </motion.g>
    </svg>
  );
}

function WebAppIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="w-full h-full" aria-hidden>
      <rect x="10" y="10" width="260" height="160" rx="8" stroke="rgba(139,92,246,0.25)" strokeWidth="1.5" />
      <rect x="10" y="10" width="60" height="160" rx="8" fill="rgba(139,92,246,0.04)" />
      <rect x="10" y="10" width="60" height="32" rx="8" fill="rgba(139,92,246,0.08)" />
      {[40, 62, 84, 106, 128].map((y, i) => (
        <rect key={i} x="18" y={y} width="44" height="16" rx="4" fill={i === 0 ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.04)"} />
      ))}
      <rect x="80" y="18" width="60" height="8" rx="2" fill="rgba(139,92,246,0.2)" />
      <rect x="80" y="38" width="180" height="28" rx="4" fill="rgba(139,92,246,0.06)" stroke="rgba(139,92,246,0.12)" strokeWidth="1" />
      <rect x="90" y="44" width="40" height="16" rx="2" fill="rgba(139,92,246,0.15)" />
      <rect x="140" y="44" width="40" height="16" rx="2" fill="rgba(139,92,246,0.08)" />
      <rect x="190" y="44" width="40" height="16" rx="2" fill="rgba(139,92,246,0.08)" />
      {[80, 104, 128, 152].map((y, i) => {
        const heights = [65, 85, 45, 70, 55, 90];
        return (
          <g key={y}>
            {heights.map((h, j) => (
              <rect key={j} x={80 + j * 28} y={y + (28 - h * 0.28)} width="20" height={h * 0.28} rx="2" fill={i === 1 && j === 5 ? "rgba(139,92,246,0.6)" : "rgba(139,92,246,0.15)"} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function MobileIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="w-full h-full" aria-hidden>
      <rect x="100" y="8" width="80" height="164" rx="16" stroke="rgba(236,72,153,0.3)" strokeWidth="2" fill="rgba(236,72,153,0.04)" />
      <rect x="118" y="8" width="44" height="8" rx="4" fill="rgba(236,72,153,0.15)" />
      <rect x="108" y="20" width="64" height="110" rx="4" fill="rgba(236,72,153,0.06)" />
      <rect x="112" y="24" width="56" height="8" rx="2" fill="rgba(236,72,153,0.2)" />
      <rect x="112" y="36" width="40" height="5" rx="2" fill="rgba(255,255,255,0.07)" />
      <rect x="112" y="44" width="48" height="5" rx="2" fill="rgba(255,255,255,0.05)" />
      <rect x="112" y="60" width="56" height="30" rx="4" fill="rgba(236,72,153,0.1)" />
      <rect x="112" y="96" width="24" height="24" rx="4" fill="rgba(236,72,153,0.15)" />
      <rect x="140" y="96" width="28" height="24" rx="4" fill="rgba(236,72,153,0.08)" />
      <rect x="108" y="136" width="64" height="1" rx="0.5" fill="rgba(255,255,255,0.06)" />
      <rect x="112" y="140" width="12" height="12" rx="2" fill="rgba(236,72,153,0.2)" />
      <rect x="128" y="140" width="12" height="12" rx="2" fill="rgba(255,255,255,0.05)" />
      <rect x="144" y="140" width="12" height="12" rx="2" fill="rgba(255,255,255,0.05)" />
      <rect x="160" y="140" width="12" height="12" rx="2" fill="rgba(255,255,255,0.05)" />
      {/* Second phone suggestion */}
      <rect x="30" y="30" width="60" height="120" rx="12" stroke="rgba(236,72,153,0.12)" strokeWidth="1.5" fill="rgba(236,72,153,0.02)" strokeDasharray="4 4" />
      <rect x="190" y="30" width="60" height="120" rx="12" stroke="rgba(236,72,153,0.12)" strokeWidth="1.5" fill="rgba(236,72,153,0.02)" strokeDasharray="4 4" />
    </svg>
  );
}

function SaaSIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="w-full h-full" aria-hidden>
      {/* Central platform */}
      <rect x="110" y="70" width="60" height="40" rx="8" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.35)" strokeWidth="1.5" />
      <rect x="120" y="80" width="40" height="6" rx="2" fill="rgba(16,185,129,0.3)" />
      <rect x="120" y="90" width="30" height="4" rx="2" fill="rgba(16,185,129,0.15)" />
      <rect x="120" y="98" width="35" height="4" rx="2" fill="rgba(16,185,129,0.12)" />
      {/* User nodes */}
      {[
        { cx: 40, cy: 40, label: "User 1" },
        { cx: 240, cy: 40, label: "User 2" },
        { cx: 40, cy: 140, label: "User 3" },
        { cx: 240, cy: 140, label: "User 4" },
        { cx: 140, cy: 20, label: "Admin" },
      ].map(({ cx, cy }, i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="16" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
          <circle cx={cx} cy={cy - 4} r="5" fill="rgba(16,185,129,0.25)" />
          <rect x={cx - 8} y={cy + 3} width="16" height="8" rx="4" fill="rgba(16,185,129,0.15)" />
          {/* Animated connection line */}
          <motion.line
            x1={cx} y1={cy}
            x2={140} y2={90}
            stroke="rgba(16,185,129,0.2)"
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -8] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </g>
      ))}
    </svg>
  );
}

function DevOpsIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="w-full h-full" aria-hidden>
      {[
        { label: "Build", x: 15, color: "#F59E0B" },
        { label: "Test", x: 95, color: "#F59E0B" },
        { label: "Deploy", x: 175, color: "#F59E0B" },
      ].map(({ label, x, color }, i) => (
        <g key={label}>
          <rect x={x} y="60" width="70" height="60" rx="6" fill={`rgba(245,158,11,0.06)`} stroke={`rgba(245,158,11,0.25)`} strokeWidth="1.5" />
          <rect x={x + 10} y="74" width="50" height="6" rx="2" fill={`rgba(245,158,11,0.2)`} />
          <rect x={x + 10} y="84" width="35" height="4" rx="2" fill={`rgba(245,158,11,0.12)`} />
          <rect x={x + 10} y="91" width="42" height="4" rx="2" fill={`rgba(245,158,11,0.1)`} />
          <text x={x + 35} y={100} textAnchor="middle" style={{ fontSize: 8, fill: color, opacity: 0.5 }}>{label}</text>
          {i < 2 && (
            <motion.g
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              <path d={`M${x + 74} 90 L${x + 84} 90`} stroke={`rgba(245,158,11,0.4)`} strokeWidth="1.5" strokeLinecap="round" />
              <path d={`M${x + 81} 87 L${x + 84} 90 L${x + 81} 93`} stroke={`rgba(245,158,11,0.4)`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          )}
        </g>
      ))}
      {/* Checkmark at end */}
      <motion.g
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <circle cx="255" cy="90" r="12" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
        <path d="M249 90L253 94L261 86" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

function UIUXIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="w-full h-full" aria-hidden>
      {/* Figma-like frame */}
      <rect x="20" y="10" width="240" height="160" rx="8" stroke="rgba(217,70,239,0.2)" strokeWidth="1.5" fill="rgba(217,70,239,0.03)" />
      {/* Layer panel */}
      <rect x="20" y="10" width="55" height="160" rx="8" fill="rgba(217,70,239,0.04)" />
      {["Component", "Frame", "Text", "Button", "Icon"].map((layer, i) => (
        <rect key={layer} x="26" y={22 + i * 22} width="43" height="14" rx="3" fill={i === 3 ? "rgba(217,70,239,0.2)" : "rgba(255,255,255,0.03)"} />
      ))}
      {/* Canvas */}
      <rect x="85" y="18" width="165" height="144" rx="6" fill="rgba(217,70,239,0.04)" />
      {/* Component rectangles */}
      <rect x="95" y="26" width="145" height="40" rx="4" stroke="rgba(217,70,239,0.3)" strokeWidth="1" fill="rgba(217,70,239,0.06)" strokeDasharray="3 3" />
      <rect x="95" y="72" width="68" height="30" rx="4" stroke="rgba(217,70,239,0.2)" strokeWidth="1" fill="rgba(217,70,239,0.04)" />
      <rect x="170" y="72" width="70" height="30" rx="4" stroke="rgba(217,70,239,0.2)" strokeWidth="1" fill="rgba(217,70,239,0.04)" />
      {/* Color palette */}
      <g transform="translate(95, 114)">
        {["rgba(217,70,239,0.8)", "rgba(139,92,246,0.8)", "rgba(59,130,246,0.8)", "rgba(16,185,129,0.8)", "rgba(245,158,11,0.8)"].map((c, i) => (
          <rect key={i} x={i * 18} y={0} width="14" height="14" rx="3" fill={c} />
        ))}
      </g>
    </svg>
  );
}

function SEOIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="w-full h-full" aria-hidden>
      {/* Search bar */}
      <rect x="20" y="20" width="200" height="28" rx="14" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5" />
      <circle cx="38" cy="34" r="7" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" fill="none" />
      <line x1="43" y1="39" x2="47" y2="43" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="54" y="28" width="80" height="12" rx="3" fill="rgba(34,197,94,0.12)" />
      {/* Rank #1 badge */}
      <rect x="234" y="20" width="28" height="28" rx="8" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5" />
      <text x="248" y="38" textAnchor="middle" style={{ fontSize: 12, fill: "#22c55e", fontWeight: 700 }}>#1</text>
      {/* Search result rows */}
      {[60, 90, 120, 150].map((y, i) => (
        <g key={y}>
          <rect x="20" y={y} width="240" height="22" rx="4" fill={i === 0 ? "rgba(34,197,94,0.07)" : "rgba(255,255,255,0.02)"} stroke={i === 0 ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)"} strokeWidth="1" />
          <rect x="28" y={y + 7} width={i === 0 ? 100 : 80 - i * 10} height="8" rx="2" fill={i === 0 ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.08)"} />
          <rect x="28" y={y + 7} width="6" height="8" rx="1" fill={i === 0 ? "rgba(34,197,94,0.6)" : "rgba(255,255,255,0.12)"} />
          <text x="30" y={y + 15} style={{ fontSize: 7, fill: i === 0 ? "#22c55e" : "rgba(100,116,139,0.6)" }}>#{i + 1}</text>
        </g>
      ))}
      {/* Upward trend arrow */}
      <motion.path
        d="M220 155 L235 135 L250 125"
        stroke="rgba(34,197,94,0.6)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -8] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="250" cy="125" r="4" fill="rgba(34,197,94,0.5)" />
    </svg>
  );
}

function AIIllustration() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="w-full h-full" aria-hidden>
      {/* Central brain/AI node */}
      <circle cx="140" cy="90" r="28" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" />
      <circle cx="140" cy="90" r="16" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.4)" strokeWidth="1" />
      <text x="140" y="95" textAnchor="middle" style={{ fontSize: 14, fill: "rgba(168,85,247,0.9)" }}>AI</text>
      {/* Tool nodes around it */}
      {[
        { cx: 55,  cy: 45,  label: "n8n",    color: "#a855f7" },
        { cx: 225, cy: 45,  label: "Zapier", color: "#a855f7" },
        { cx: 30,  cy: 130, label: "Make",   color: "#a855f7" },
        { cx: 250, cy: 130, label: "GPT",    color: "#a855f7" },
        { cx: 140, cy: 155, label: "Agents", color: "#a855f7" },
      ].map(({ cx, cy, label, color }, i) => (
        <g key={i}>
          <motion.line
            x1={cx} y1={cy} x2={140} y2={90}
            stroke={`rgba(168,85,247,0.2)`}
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -8] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
          />
          <rect x={cx - 22} y={cy - 12} width={44} height={24} rx="6" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />
          <text x={cx} y={cy + 5} textAnchor="middle" style={{ fontSize: 8, fill: color, opacity: 0.9 }}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

const serviceIllustrations: Record<string, React.ComponentType> = {
  "web-development": WebsiteIllustration,
  "web-app-development": WebAppIllustration,
  "mobile-app-development": MobileIllustration,
  "saas-development": SaaSIllustration,
  "devops-deployment": DevOpsIllustration,
  "ui-ux-design": UIUXIllustration,
  "seo-services": SEOIllustration,
  "ai-services": AIIllustration,
};

import { services } from "@/data/services";

const mainServices = services.filter((s) => mainServiceSlugs.includes(s.slug));

export default function ServicesPageContent() {
  return (
    <>
      {/* Page Hero — large editorial header */}
      <section className="relative pt-12 pb-0 overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-40 pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #6366F1, transparent 70%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-semibold uppercase mb-6"
            style={{ fontSize: 11, letterSpacing: "0.15em", color: "#818CF8" }}
          >
            Our Services
          </motion.p>
        </div>

        {/* Display heading */}
        <div className="max-w-7xl mx-auto px-6 mb-5">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold text-white leading-tight"
            style={{
              fontSize: "clamp(40px, 4.5vw, 68px)",
              letterSpacing: "-0.03em",
            }}
          >
            What We Build.
          </motion.h1>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pb-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl leading-8"
            style={{ color: "rgba(203,213,225,0.75)" }}
          >
            From concept to production — we handle the full technology lifecycle so you can focus on your business.
          </motion.p>
        </div>
      </section>

      {/* Services — alternating layout */}
      <section className="pb-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-0">
          {mainServices.map((service, i) => {
            const Illustration = serviceIllustrations[service.slug];
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={service.slug}
                id={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group py-16 border-b border-white/[0.06] last:border-0"
              >
                <div
                  className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    !isEven ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Text side */}
                  <div className={!isEven ? "md:[direction:ltr]" : ""}>
                    {/* Eyebrow */}
                    <p
                      className="mb-4 font-semibold uppercase"
                      style={{ fontSize: 10, letterSpacing: "0.15em", color: service.accentColor }}
                    >
                      {String(i + 1).padStart(2, "0")} — {service.shortDesc}
                    </p>
                    <h2
                      className="text-3xl md:text-4xl font-bold text-white mb-5 leading-snug"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {service.title}
                    </h2>
                    <p className="text-base leading-8 mb-7" style={{ color: "rgba(203,213,225,0.75)" }}>
                      {service.description}
                    </p>

                    {/* Benefits */}
                    <ul className="flex flex-col gap-3 mb-7">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: `${service.accentColor}15` }}
                          >
                            <Check style={{ color: service.accentColor, width: 11, height: 11 }} />
                          </div>
                          <span className="text-sm leading-6" style={{ color: "rgba(203,213,225,0.8)" }}>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="text-sm text-slate-300 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded-lg cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="group/link inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                      style={{ color: service.accentColor }}
                    >
                      Discuss this service
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  {/* Visual side */}
                  <div className={!isEven ? "md:[direction:ltr]" : ""}>
                    <div
                      className="relative rounded-2xl border border-white/[0.07] overflow-hidden transition-all duration-500 group-hover:border-white/[0.14]"
                      style={{
                        background: `linear-gradient(135deg, ${service.accentColor}06 0%, transparent 60%)`,
                        height: 200,
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(ellipse at 50% 50%, ${service.accentColor}06, transparent 70%)` }}
                      />
                      {Illustration && <Illustration />}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
