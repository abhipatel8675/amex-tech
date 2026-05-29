"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-32" style={{ background: "linear-gradient(180deg, #0B0F19 0%, #0D1220 50%, #0B0F19 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">
            Client Voices
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-5">
            Trusted by teams who ship.
          </h2>
          <p className="text-slate-300 text-lg max-w-lg mx-auto leading-8">
            Don't take our word for it — here's what our clients say after working with us.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group relative flex flex-col gap-6 p-7 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.11] transition-all duration-300"
            >
              {/* Decorative quote */}
              <div
                className="absolute top-5 right-6 text-7xl leading-none font-serif opacity-[0.07] select-none pointer-events-none"
                aria-hidden="true"
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base text-slate-200 leading-8 flex-1 relative z-10">
                "{t.content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between gap-3 pt-5 border-t border-white/[0.07]">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 40%), hsl(${i * 60 + 40}, 70%, 55%))`,
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white leading-tight">{t.name}</p>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded-md shrink-0">
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
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          {[
            { value: "5.0", label: "Average Rating" },
            { value: "100%", label: "Satisfaction Rate" },
            { value: "100+", label: "Clients Served" },
          ].map((m, i) => (
            <div key={m.label} className="flex items-center gap-4">
              {i > 0 && <span className="hidden sm:block w-px h-8 bg-white/[0.08]" />}
              <div className="text-center">
                <span className="text-3xl font-bold text-white">{m.value}</span>
                <span className="ml-2.5 text-base text-slate-400">{m.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
