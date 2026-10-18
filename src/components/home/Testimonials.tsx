"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const avatarGradients = [
  ["#B8860B", "#9C7208"],
  ["#111827", "#374151"],
  ["#9C7208", "#9C7208"],
  ["#7A5807", "#9C7208"],
  ["#374151", "#111827"],
  ["#9C7208", "#B8860B"],
];

function FiverrBadge() {
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-md text-slate-900 font-bold text-xs select-none"
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
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)" }}
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
          <p className="text-xs font-semibold text-[#7A5807] uppercase tracking-widest mb-4" style={{ letterSpacing: "0.15em" }}>
            Client Voices
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Trusted by teams who ship.
          </h2>
          <p className="text-slate-600 text-lg max-w-md mx-auto leading-7">
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
                className="group relative flex flex-col gap-5 p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-[#B8860B]/30 hover:border-l-[#B8860B]/70 transition-all duration-300"
                style={{ borderLeftWidth: "1px" }}
              >
                {/* Hover left border accent */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(180deg, #B8860B, #9C7208)" }}
                />

                {/* Fiverr badge top-right */}
                <div className="absolute top-5 right-6 flex items-center gap-2">
                  <FiverrBadge />
                  {/* Decorative quote behind badge */}
                  <Quote className="w-10 h-10 text-[#7A5807] fill-[#7A5807] opacity-[0.05] absolute right-0 top-0" />
                </div>

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[15px] text-slate-700 leading-7 flex-1 relative z-10">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-slate-900 uppercase"
                        style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
                      >
                        {t.name.charAt(0)}
                      </div>
                      <span
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                        style={{ background: "#059669" }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 leading-tight">{t.name}</p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {t.role} &middot; {t.company}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md shrink-0">
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
          className="mt-12 pt-10 border-t border-slate-200 relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0"
        >
          {/* Subtle glow behind bar */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(184,134,11,0.07), transparent 70%)",
            }}
          />
          {[
            { value: "5.0", label: "Average Rating", color: "#B8860B" },
            { value: "100%", label: "Satisfaction Rate", color: "#111827" },
            { value: "100+", label: "Clients Served", color: "#7A5807" },
          ].map((m, i) => (
            <div key={m.label} className="relative flex items-center gap-0">
              {i > 0 && <span className="hidden sm:block w-px h-10 bg-slate-100 mx-10" />}
              <div className="text-center">
                <p className="text-3xl font-bold mb-1" style={{ color: m.color }}>{m.value}</p>
                <p className="text-sm text-slate-600">{m.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
