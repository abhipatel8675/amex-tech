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

function FiverrBadge() {
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-md text-white font-bold text-xs select-none"
      style={{ background: "#1DBF73", fontSize: 13, lineHeight: 1 }}
      aria-label="Fiverr"
    >
      f
    </span>
  );
}

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
                className="group relative flex flex-col gap-5 p-7 rounded-2xl border border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.04] hover:border-indigo-500/30 hover:border-l-indigo-500/70 transition-all duration-300"
                style={{ borderLeftWidth: "1px" }}
              >
                {/* Hover left border accent */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(180deg, #6366F1, #8B5CF6)" }}
                />

                {/* Fiverr badge top-right */}
                <div className="absolute top-5 right-6 flex items-center gap-2">
                  <FiverrBadge />
                  {/* Decorative quote behind badge */}
                  <Quote className="w-10 h-10 text-indigo-400 fill-indigo-400 opacity-[0.05] absolute right-0 top-0" />
                </div>

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[15px] text-slate-200 leading-7 flex-1 relative z-10">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.07]">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white uppercase"
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
                        {t.role} &middot; {t.company}
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
          className="mt-12 pt-10 border-t border-white/[0.06] relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0"
        >
          {/* Subtle glow behind bar */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.07), transparent 70%)",
            }}
          />
          {[
            { value: "5.0", label: "Average Rating", color: "#FBBF24" },
            { value: "100%", label: "Satisfaction Rate", color: "#34D399" },
            { value: "100+", label: "Clients Served", color: "#818CF8" },
          ].map((m, i) => (
            <div key={m.label} className="relative flex items-center gap-0">
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
