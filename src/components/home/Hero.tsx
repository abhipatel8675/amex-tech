"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Subtle center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(0,220,130,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#888] bg-[#111] border border-[#1f1f1f] px-3.5 py-1.5 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00dc82] animate-pulse" />
          Software Development Agency · Est. 2019
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
        >
          We Build Scalable{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dc82] to-[#00dc82]/60">
            Digital Products
          </span>{" "}
          <br className="hidden sm:block" />
          For Modern Businesses
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-base sm:text-lg text-[#666] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          From MVPs to enterprise platforms — we help startups and businesses ship fast, reliable
          software that drives real growth. Clean code, modern tech, on-time delivery.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/portfolio"
            className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-white/90 transition-all"
          >
            View Our Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 bg-transparent text-[#888] border border-[#222] text-sm font-medium px-5 py-2.5 rounded-lg hover:border-[#444] hover:text-white transition-all"
          >
            Get Free Consultation
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Social proof row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {[
            { label: "5+ Years Experience" },
            { label: "10+ Projects Delivered" },
            { label: "100% Client Satisfaction" },
            { label: "< 24h Response Time" },
          ].map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-2 text-xs text-[#555]"
            >
              <span className="w-1 h-1 rounded-full bg-[#333]" />
              {item.label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
}
