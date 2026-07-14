"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

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

// Small inline SVG icons per service (40x40 viewport)
const serviceIcons: Record<string, React.ReactNode> = {
  "web-development": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="1" y="3" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 7h20" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4.5" cy="5" r="1" fill="currentColor" />
      <circle cx="7.5" cy="5" r="1" fill="currentColor" />
      <path d="M5 11h5M5 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "web-app-development": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="1" y="1" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="1" width="5" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 7h8M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "mobile-app-development": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="6" y="1" width="10" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 4h10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "saas-development": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 6L9 9M16 6L13 9M6 16L9 13M16 16L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "devops-deployment": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M4 14a6 6 0 0 1 6-10 6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 10a4 4 0 0 1 0 8H6a4 4 0 0 1 0-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 15V9M8 12l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "ui-ux-design": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 2v4M11 16v4M2 11h4M16 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11" cy="11" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "seo-services": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.5 13.5L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 9h6M9 6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "ai-services": (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="3" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7V5a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" />
      <circle cx="14" cy="12" r="1.5" fill="currentColor" />
      <path d="M8 17v2M14 17v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const mainServices = services.filter((s) => mainServiceSlugs.includes(s.slug));

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function ServicesPageContent() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-12 pb-14 overflow-hidden">
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
            className="font-semibold uppercase mb-5"
            style={{ fontSize: 11, letterSpacing: "0.15em", color: "#818CF8" }}
          >
            Our Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold text-white leading-tight mb-5"
            style={{
              fontSize: "clamp(40px, 4.5vw, 68px)",
              letterSpacing: "-0.03em",
            }}
          >
            What We Build.
          </motion.h1>

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

      {/* Services grid */}
      <section className="pb-28 max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {mainServices.map((service) => {
            const icon = serviceIcons[service.slug];
            return (
              <motion.div
                key={service.slug}
                id={service.slug}
                variants={cardVariants}
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 flex flex-col overflow-hidden transition-all duration-300 hover:border-white/[0.13]"
                style={{
                  // subtle per-card accent glow on hover handled via pseudo via box shadow trick below
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 inset-x-8 h-px rounded-full opacity-60 group-hover:opacity-90 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)`,
                  }}
                />

                {/* Hover glow border overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${service.accentColor}30` }}
                />

                {/* Hover bg radial */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 0% 0%, ${service.accentColor}07, transparent 55%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-6 border shrink-0 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `${service.accentColor}14`,
                    borderColor: `${service.accentColor}28`,
                    color: service.accentColor,
                  }}
                >
                  {icon}
                </div>

                {/* Title */}
                <h2
                  className="relative text-xl font-bold text-white mb-3 leading-snug"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  {service.title}
                </h2>

                {/* Description */}
                <p
                  className="relative text-sm leading-7 mb-6 flex-1"
                  style={{ color: "rgba(148,163,184,0.8)" }}
                >
                  {service.description}
                </p>

                {/* Tech pills */}
                <div className="relative flex flex-wrap gap-1.5 mb-6">
                  {service.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-lg border"
                      style={{
                        color: "rgba(148,163,184,0.7)",
                        background: "rgba(255,255,255,0.03)",
                        borderColor: "rgba(255,255,255,0.07)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="relative group/link inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
                  style={{ color: service.accentColor }}
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </>
  );
}
