"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-24 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-14"
        >
          <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-3">
            Client Feedback
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What our clients say.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="p-6 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#00dc82] text-[#00dc82]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[#666] leading-relaxed flex-1">"{t.content}"</p>

              {/* Author */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-[#555]">
                    {t.role}, {t.company}
                  </p>
                </div>
                <span className="text-xs text-[#444] bg-[#111] border border-[#1a1a1a] px-2 py-0.5 rounded">
                  {t.platform}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
