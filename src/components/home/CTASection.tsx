"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden p-12 md:p-16 text-center"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,220,130,0.07) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-4">
              Ready to Build?
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl mx-auto">
              Let's build your next digital product.
            </h2>
            <p className="text-[#555] text-base md:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
              Tell us what you're building. We'll respond within 24 hours with a clear plan and
              honest assessment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-[#00dc82] text-black text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#00dc82]/90 transition-all"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center gap-2 text-sm text-[#555] border border-[#222] px-6 py-3 rounded-lg hover:border-[#333] hover:text-white transition-all"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
