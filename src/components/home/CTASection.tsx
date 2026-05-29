"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-32 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(145deg, #141E33 0%, #0F172A 60%, #141E33 100%)" }}
        >
          {/* Border gradient */}
          <div className="absolute inset-0 rounded-3xl" style={{ padding: "1px", background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.2), rgba(99,102,241,0.1))", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />

          {/* Glow effects */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #6366F1, transparent 70%)" }} />
          <div className="absolute -bottom-16 right-1/4 w-[300px] h-[200px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #8B5CF6, transparent 70%)" }} />

          {/* Grid pattern inside */}
          <div className="grid-pattern absolute inset-0 opacity-30 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 px-10 py-20 md:px-16 md:py-24 text-center">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.10] rounded-full px-5 py-2 mb-10">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-slate-300">Typically responds within 4 hours</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 max-w-3xl mx-auto leading-tight">
              Ready to build your next{" "}
              <span style={{ background: "linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                digital product?
              </span>
            </h2>
            <p className="text-slate-300 text-xl max-w-xl mx-auto mb-12 leading-8">
              Tell us what you're building. We'll respond with a clear plan, honest scope estimate,
              and a timeline — no obligations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-base font-semibold text-white px-8 py-4 rounded-xl transition-all duration-300 btn-glow"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
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
                { value: "24h", label: "response time" },
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
    </section>
  );
}
