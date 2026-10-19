"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { serviceIcon } from "@/components/services/serviceIcons";



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
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function ServicesPageContent() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-12 pb-14 overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-40 pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #B8860B, transparent 70%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-semibold uppercase mb-5"
            style={{ fontSize: 11, letterSpacing: "0.15em", color: "#7A5807" }}
          >
            Our Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold text-slate-900 leading-tight mb-5"
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
            style={{ color: "#475569" }}
          >
            AI agents, modern websites and apps, and search visibility on Google and AI assistants: everything you need to grow, built by one team.
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => {
            const Icon = serviceIcon(service.iconName);
            return (
              <motion.div
                key={service.slug}
                id={service.slug}
                variants={cardVariants}
                className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-8 flex flex-col overflow-hidden transition-all duration-300 hover:border-slate-300"
                style={{
                  // subtle per-card accent glow on hover handled via pseudo via box shadow trick below
                }}
              >
                {service.aliases?.map((alias) => (
                  <span key={alias} id={alias} className="absolute top-0" aria-hidden />
                ))}

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
                  <Icon className="w-5 h-5" aria-hidden />
                </div>

                {/* Title */}
                <h2
                  className="relative text-xl font-bold text-slate-900 mb-3 leading-snug"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  {service.title}
                </h2>

                {/* Description */}
                <p
                  className="relative text-sm leading-7 mb-6 flex-1"
                  style={{ color: "#475569" }}
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
                        color: "#475569",
                        background: "rgba(15,23,42,0.03)",
                        borderColor: "rgba(15,23,42,0.07)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/services/${service.slug}`}
                  className="relative group/link inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
                  style={{ color: service.accentColor }}
                >
                  Learn more<span className="sr-only"> about {service.title}</span>
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
