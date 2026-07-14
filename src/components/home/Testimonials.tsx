"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const avatarGradients = [
  ["#6366F1", "#8B5CF6"],
  ["#3B82F6", "#06B6D4"],
  ["#EC4899", "#F472B6"],
  ["#10B981", "#34D399"],
  ["#F59E0B", "#FBBF24"],
  ["#8B5CF6", "#A78BFA"],
];

export default function Testimonials() {
  return (
    <section
      className="py-12 md:py-16"
      style={{ background: "linear-gradient(180deg, #0B0F19 0%, #0D1220 50%, #0B0F19 100%)" }}
    >
      <div className="max-w-[92rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4" style={{ letterSpacing: "0.15em" }}>
            Client Voices
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Trusted by teams who ship.
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto leading-7">
            Don&apos;t take our word for it — here&apos;s what our clients say.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => {
            const [gradFrom, gradTo] = avatarGradients[i % avatarGradients.length];
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative flex flex-col gap-5 p-7 rounded-2xl border border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
              >
                {/* Decorative quote */}
                <div className="absolute top-5 right-6 opacity-[0.06]">
                  <Quote className="w-12 h-12 text-indigo-400 fill-indigo-400" />
                </div>

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[15px] text-slate-200 leading-7 flex-1 relative z-10">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.07]">
                  <div className="flex items-center gap-3">
                    {/* Premium avatar */}
                    <div className="relative shrink-0">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
                      >
                        {t.name.charAt(0)}
                      </div>
                      <span
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0D1220]"
                        style={{ background: "#34D399" }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">{t.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded-md shrink-0">
                    {t.platform}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Social proof footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0"
        >
          {[
            { value: "5.0", label: "Average Rating", color: "#FBBF24" },
            { value: "100%", label: "Satisfaction Rate", color: "#34D399" },
            { value: "100+", label: "Clients Served", color: "#818CF8" },
          ].map((m, i) => (
            <div key={m.label} className="flex items-center gap-0">
              {i > 0 && <span className="hidden sm:block w-px h-10 bg-white/[0.07] mx-10" />}
              <div className="text-center">
                <p className="text-3xl font-bold mb-1" style={{ color: m.color }}>{m.value}</p>
                <p className="text-sm text-slate-500">{m.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
