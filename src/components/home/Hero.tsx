"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, CircleCheck } from "lucide-react";
import { AnimatedLogoDraw } from "@/components/ui/AnimatedLogoDraw";

// Word-by-word stagger for the heading
function WordSpan({ word, index }: { word: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="inline-block mr-[0.25em]"
    >
      {word}
    </motion.span>
  );
}

const floatAnim = (delay = 0, range = 10) => ({
  animate: { y: [0, -range, 0] },
  transition: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut" as const, delay },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B0F19] pt-16">

      {/* Background: grid pattern */}
      <div className="grid-pattern absolute inset-0 opacity-100 pointer-events-none" />

      {/* Background: radial glows — vibrant mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full opacity-30"
          style={{ background: "radial-gradient(ellipse, #6366F1 0%, transparent 65%)" }}
        />
        <div
          className="absolute top-[5%] right-[-15%] w-[650px] h-[650px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, #8B5CF6 0%, transparent 65%)" }}
        />
        <div
          className="absolute top-[40%] right-[10%] w-[350px] h-[350px] rounded-full opacity-15"
          style={{ background: "radial-gradient(ellipse, #A78BFA 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-12"
          style={{ background: "radial-gradient(ellipse, #22D3EE 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[20%] left-[30%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, #6366F1 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[92rem] mx-auto px-6 py-14 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 xl:gap-20 items-center">

          {/* ─── LEFT: Content ─── */}
          <div>
            {/* Top label pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="inline-flex items-center gap-2.5 mb-7"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border"
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.12) 100%)",
                  borderColor: "rgba(99,102,241,0.35)",
                  color: "#A5B4FC",
                  letterSpacing: "0.1em",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Full-Stack Development Agency
              </span>
            </motion.div>

            {/* Agency sub-badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8 ml-3"
            >
              <span className="text-xs font-medium text-slate-400 tracking-wide">
                Est. 2019
              </span>
            </motion.div>

            {/* Headline — word by word */}
            <h1 className="text-[clamp(2.25rem,7vw,6rem)] font-bold leading-[1.1] tracking-[-0.03em] mb-8 break-words">
              <span className="block text-white">
                <WordSpan word="We" index={0} />
                <WordSpan word="Build" index={1} />
              </span>
              <span
                className="block pb-[0.12em]"
                style={{
                  background: "linear-gradient(135deg, #818CF8 0%, #A78BFA 50%, #C4B5FD 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <WordSpan word="Digital" index={2} />
                <WordSpan word="Products" index={3} />
              </span>
              <span className="block text-white">
                <WordSpan word="That" index={4} />
                <WordSpan word="Scale." index={5} />
              </span>
            </h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-xl sm:text-2xl leading-8 sm:leading-9 max-w-[560px] mb-12"
              style={{ color: "rgba(203,213,225,0.78)" }}
            >
              From MVP to enterprise platform — we help startups and growing businesses ship
              reliable software that drives measurable results.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <Link
                href="/portfolio"
                className="group relative inline-flex items-center gap-2 text-base font-semibold text-white px-7 py-4 rounded-xl transition-all duration-300 btn-glow overflow-hidden"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
              >
                {/* Shimmer sweep */}
                <span
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                    animation: "shimmer 0.6s ease-out",
                  }}
                />
                View Our Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform relative z-10" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-base font-semibold text-slate-300 px-7 py-4 rounded-xl border border-white/[0.12] hover:border-white/[0.22] hover:bg-white/[0.05] hover:text-white transition-all duration-200"
              >
                Start a Project
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-base font-medium text-slate-500 hover:text-slate-300 transition-colors"
              >
                Read our blog
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="pt-6 border-t border-white/[0.08]"
            >
            <div className="flex flex-wrap items-center gap-5 sm:gap-7">
              <div className="flex items-center gap-2.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} style={{ width: "16px", height: "16px", fill: "#FBBF24" }} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium" style={{ color: "rgba(148,163,184,0.8)" }}>100% satisfaction</span>
              </div>
              <span className="w-px h-4 bg-white/[0.10]" />
              <div className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-sm" style={{ color: "rgba(148,163,184,0.8)" }}>5+ years experience</span>
              </div>
              <span className="w-px h-4 bg-white/[0.10]" />
              <div className="flex items-center gap-2">
                <CircleCheck className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-sm" style={{ color: "rgba(148,163,184,0.8)" }}>200+ projects shipped</span>
              </div>
            </div>
            </motion.div>

            {/* Tech marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-10"
            >
              <div className="flex flex-wrap gap-2.5">
                {["Next.js", "TypeScript", "React", "Node.js", "AWS", "Supabase", "Stripe", "Docker", "Tailwind CSS", "Vercel", "PostgreSQL", "Figma"].map((tech, i) => (
                  <span
                    key={i}
                    className="text-sm font-medium text-slate-400 whitespace-nowrap px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.07]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT: Terminal / project stats mockup ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative hidden lg:flex flex-col gap-4"
          >
            {/* Brand mark draw-on */}
            <div
              className="rounded-2xl border border-white/[0.09] overflow-hidden flex items-center justify-center py-14"
              style={{ background: "linear-gradient(145deg, #0F1729 0%, #0B0F19 100%)" }}
            >
              <AnimatedLogoDraw size={56} textClassName="text-5xl" />
            </div>

            {/* Client review card */}
            <motion.div
              {...floatAnim(1.2, 5)}
              className="rounded-2xl border border-white/[0.10] p-5 backdrop-blur-xl"
              style={{ background: "rgba(15, 23, 41, 0.85)" }}
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-xs text-amber-400 font-semibold">5.0</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed italic">
                "Exceptional work — on time, within budget, and the quality exceeded our expectations."
              </p>
              <p className="text-xs text-slate-500 mt-3">— Sarah M., Founder at TechStart</p>
            </motion.div>

            {/* Deployment live badge */}
            <motion.div
              {...floatAnim(0.4, 6)}
              className="absolute -top-4 -right-4 rounded-2xl border border-white/[0.12] px-4 py-3 backdrop-blur-xl flex items-center gap-3"
              style={{ background: "rgba(15, 23, 41, 0.9)" }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">v2.4.1 live</p>
                <p className="text-xs text-slate-500 font-mono">Build 2.4s</p>
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
