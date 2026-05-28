"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, CircleCheck, TrendingUp, Sparkles } from "lucide-react";

const floatAnim = (delay = 0, range = 10) => ({
  animate: { y: [0, -range, 0] },
  transition: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut" as const, delay },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B0F19] pt-16">

      {/* Background: grid pattern */}
      <div className="grid-pattern absolute inset-0 opacity-100 pointer-events-none" />

      {/* Background: radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, #6366F1 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, #8B5CF6 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: "radial-gradient(ellipse, #22D3EE 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 xl:gap-20 items-center">

          {/* ─── LEFT: Content ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Agency badge */}
            <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.09] rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-400 tracking-wide">
                Software Development Agency · Est. 2019
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-bold leading-[1.04] tracking-[-0.02em] mb-6">
              <span className="text-white">We Build</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #818CF8 0%, #A78BFA 50%, #C4B5FD 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Digital Products
              </span>
              <br />
              <span className="text-white">That Scale.</span>
            </h1>

            {/* Sub */}
            <p className="text-base sm:text-lg text-slate-400 leading-[1.75] max-w-[480px] mb-10">
              From MVP to enterprise platform — we help startups and growing businesses ship
              reliable software that drives measurable results.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-12">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-xl transition-all duration-300 btn-glow"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
              >
                View Our Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-300 px-6 py-3 rounded-xl border border-white/[0.10] hover:border-white/[0.20] hover:bg-white/[0.04] hover:text-white transition-all duration-200"
              >
                Start a Project
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Stars */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-medium">100% satisfaction</span>
              </div>
              <span className="w-px h-4 bg-white/[0.08]" />
              <div className="flex items-center gap-1.5">
                <CircleCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs text-slate-500">5+ years experience</span>
              </div>
              <span className="w-px h-4 bg-white/[0.08]" />
              <div className="flex items-center gap-1.5">
                <CircleCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs text-slate-500">10+ projects shipped</span>
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT: Visual ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative h-[480px] hidden lg:block"
          >
            {/* Main "product" card */}
            <div
              className="absolute top-8 left-0 right-8 rounded-2xl border border-white/[0.09] overflow-hidden"
              style={{ background: "linear-gradient(145deg, #141E33 0%, #0F172A 100%)" }}
            >
              {/* Window bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-4 text-xs text-slate-600 font-mono">amex-dashboard — production</span>
              </div>
              {/* Dashboard mockup */}
              <div className="p-5 space-y-4">
                {/* Metric row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Revenue", value: "$48.2K", change: "+127%" },
                    { label: "Users", value: "2,847", change: "+43%" },
                    { label: "Uptime", value: "99.9%", change: "30 days" },
                  ].map((m) => (
                    <div key={m.label} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.05]">
                      <p className="text-xs text-slate-500 mb-1">{m.label}</p>
                      <p className="text-base font-bold text-white leading-tight">{m.value}</p>
                      <p className="text-xs text-emerald-400 mt-0.5">{m.change}</p>
                    </div>
                  ))}
                </div>
                {/* Bar chart mockup */}
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05]">
                  <div className="flex items-end justify-between gap-2 h-16">
                    {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm opacity-80"
                        style={{
                          height: `${h}%`,
                          background: i === 11
                            ? "linear-gradient(180deg, #818CF8, #6366F1)"
                            : "rgba(99,102,241,0.25)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-slate-600">Monthly performance</p>
                    <div className="flex items-center gap-1 text-xs text-emerald-400">
                      <TrendingUp className="w-3 h-3" />
                      +32% vs last period
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card 1 – Deployment */}
            <motion.div
              {...floatAnim(0, 8)}
              className="absolute -bottom-4 left-4 w-56 rounded-2xl border border-white/[0.10] p-4 backdrop-blur-xl"
              style={{ background: "rgba(20, 30, 51, 0.9)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="text-xs font-semibold text-white">Deployment Complete</span>
              </div>
              <p className="text-xs text-slate-500 mb-2.5 font-mono">v2.4.1 → production</p>
              <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-1 rounded-full"
                  style={{ width: "100%", background: "linear-gradient(90deg, #10B981, #34D399)" }}
                />
              </div>
              <p className="text-xs text-slate-600 mt-1.5">Build 2.4s · Live now</p>
            </motion.div>

            {/* Floating card 2 – Rating */}
            <motion.div
              {...floatAnim(1.5, 6)}
              className="absolute top-6 -right-4 w-48 rounded-2xl border border-white/[0.10] p-4 backdrop-blur-xl"
              style={{ background: "rgba(20, 30, 51, 0.9)" }}
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Exceptional work, on time and within budget."
              </p>
              <p className="text-xs text-slate-600 mt-2">— Sarah M., Founder</p>
            </motion.div>

            {/* Floating card 3 – Tech stack */}
            <motion.div
              {...floatAnim(0.8, 7)}
              className="absolute bottom-36 -right-4 rounded-2xl border border-white/[0.10] p-3.5 backdrop-blur-xl"
              style={{ background: "rgba(20, 30, 51, 0.9)" }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span className="text-xs font-semibold text-white">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Next.js", "TypeScript", "Supabase", "AWS"].map((t) => (
                  <span
                    key={t}
                    className="text-xs text-slate-400 bg-white/[0.06] border border-white/[0.07] px-2 py-0.5 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0B0F19, transparent)" }}
      />
    </section>
  );
}
