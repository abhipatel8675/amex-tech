"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-28" style={{ background: "linear-gradient(180deg, #0B0F19 0%, #0D1220 50%, #0B0F19 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Client Voices
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Trusted by teams who ship.
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">
            Don't take our word for it — here's what our clients say after working with us.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group relative flex flex-col gap-5 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.11] transition-all duration-300"
            >
              {/* Decorative quote */}
              <div
                className="absolute top-4 right-5 text-6xl leading-none font-serif opacity-[0.06] select-none pointer-events-none"
                aria-hidden="true"
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-slate-300 leading-[1.75] flex-1 relative z-10">
                "{t.content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.07]">
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 40%), hsl(${i * 60 + 40}, 70%, 55%))`,
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">{t.name}</p>
                    <p className="text-xs text-slate-500">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-600 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-md shrink-0">
                  {t.platform}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { value: "5.0", label: "Average Rating" },
            { value: "100%", label: "Satisfaction Rate" },
            { value: "10+", label: "Clients Served" },
          ].map((m, i) => (
            <div key={m.label} className="flex items-center gap-3">
              {i > 0 && <span className="hidden sm:block w-px h-6 bg-white/[0.08]" />}
              <div className="text-center">
                <span className="text-2xl font-bold text-white">{m.value}</span>
                <span className="ml-2 text-sm text-slate-500">{m.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
