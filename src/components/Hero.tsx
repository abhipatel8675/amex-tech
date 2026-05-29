"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Clock, MapPin } from "lucide-react";

const stats = [
  { value: "$80K+", label: "Earned on Upwork" },
  { value: "100%", label: "Job Success Score" },
  { value: "5+", label: "Years Experience" },
  { value: "200+", label: "Apps Delivered" },
];

const badges = [
  { icon: Star, text: "Top Rated Plus on Upwork" },
  { icon: Shield, text: "Level 2 Seller on Fiverr" },
  { icon: Clock, text: "Avg. Response: 1 Hour" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          {badges.map((b) => (
            <div
              key={b.text}
              className="flex items-center gap-2 text-sm bg-[#111111] border border-[#1f1f1f] px-3 py-1.5 rounded-full text-indigo-400"
            >
              <b.icon className="w-3 h-3" />
              {b.text}
            </div>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold leading-tight tracking-tight mb-6"
        >
          Ship Your Web App{" "}
          <span className="text-indigo-400">Bug-Free</span>,{" "}
          <br className="hidden md:block" />
          On Time.
        </motion.h1>

        {/* Location — large, prominent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <MapPin className="w-6 h-6 text-indigo-400" />
          <span className="text-2xl md:text-3xl font-semibold text-white">
            Gardena, California, USA
          </span>
        </motion.div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-[#6b7280] max-w-2xl mx-auto mb-10"
        >
          Full-Stack Engineering for Founders & Product Teams. Any language, any framework,
          any stack — from idea to production-ready in days, not months.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#services"
            className="flex items-center gap-2 bg-indigo-500 text-black font-semibold px-6 py-3 rounded-xl hover:bg-indigo-500/90 transition-all hover:scale-105"
          >
            View Services <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 border border-[#1f1f1f] text-white font-medium px-6 py-3 rounded-xl hover:border-[#6366F1]/50 hover:bg-indigo-500/5 transition-all"
          >
            Book Free Call
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-indigo-400">{s.value}</div>
              <div className="text-sm text-[#6b7280] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
