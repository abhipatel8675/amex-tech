"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Check } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-10 md:py-14 border-t border-white/[0.06]">
      <div className="max-w-[92rem] mx-auto px-6">
        {/* Outer radial glow behind the box */}
        <div className="relative">
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.14), transparent 70%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(145deg, #141E33 0%, #0F172A 60%, #141E33 100%)" }}
          >
            {/* Stronger border gradient */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                padding: "1px",
                background: "linear-gradient(135deg, rgba(212,175,55,0.7) 0%, rgba(184,146,37,0.4) 50%, rgba(212,175,55,0.2) 100%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Glow effects */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full opacity-25 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #D4AF37, transparent 70%)" }} />
            <div className="absolute -bottom-16 right-1/4 w-[300px] h-[200px] rounded-full opacity-12 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #B89225, transparent 70%)" }} />

            {/* Grid pattern inside */}
            <div className="grid-pattern absolute inset-0 opacity-30 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 px-8 py-14 md:px-14 md:py-20 text-center">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.10] rounded-full px-5 py-2 mb-10">
                <Clock className="w-4 h-4 text-[#E1BC4A]" />
                <span className="text-sm font-medium text-slate-300">Typically responds within 4 hours</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 max-w-3xl mx-auto leading-tight">
                Ready to build your next{" "}
                <span style={{ background: "linear-gradient(135deg, #E1BC4A 0%, #D4AF37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  digital product?
                </span>
              </h2>
              <p className="text-slate-300 text-xl max-w-xl mx-auto mb-10 leading-8">
                Tell us what you&apos;re building. We&apos;ll respond with a clear plan, honest scope estimate,
                and a timeline — no obligations.
              </p>

              {/* Trust metrics */}
              <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                {[
                  "No commitment required",
                  "Free consultation",
                  "4-hour response",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                      <Check className="w-3 h-3 text-[#E1BC4A]" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-base font-semibold text-white px-8 py-4 rounded-xl transition-all duration-300 btn-glow"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #B89225 100%)",
                    boxShadow: "0 0 32px rgba(212,175,55,0.45), 0 0 8px rgba(184,146,37,0.3)",
                  }}
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-base font-semibold text-slate-300 px-8 py-4 rounded-xl border border-white/[0.12] hover:border-white/[0.22] hover:bg-white/[0.05] hover:text-white transition-all duration-200"
                >
                  View Our Work
                </Link>
              </div>

              {/* Trust strip */}
              <div className="mt-12 pt-10 border-t border-white/[0.07] flex flex-wrap items-center justify-center gap-8 sm:gap-14">
                {[
                  { value: "No-commitment", label: "first call" },
                  { value: "4h", label: "response time" },
                  { value: "5+ years", label: "experience" },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline gap-2">
                    <span className="text-base font-semibold text-white">{item.value}</span>
                    <span className="text-sm text-slate-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
