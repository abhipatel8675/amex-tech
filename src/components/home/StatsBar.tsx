"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "5+", label: "Years of Experience", detail: "Since 2019" },
  { value: "200+", label: "Projects Delivered", detail: "Across 6 industries" },
  { value: "100%", label: "Client Satisfaction", detail: "Zero failed projects" },
  // { value: "<24h", label: "Response Time", detail: "Mon – Sat" },
];

export default function StatsBar() {
  return (
    <section className="relative py-px overflow-hidden">
      {/* Top gradient border */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 50%, transparent 100%)" }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.15) 50%, transparent 100%)" }}
      />

      <div
        className="py-14"
        style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.04) 0%, rgba(99,102,241,0.02) 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-0 lg:divide-x lg:divide-white/[0.06]">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="text-center lg:px-8"
              >
                <p
                  className="text-5xl font-bold tracking-tight mb-2"
                  style={{
                    background: "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-base font-semibold text-slate-300 mb-1">{stat.label}</p>
                <p className="text-sm text-slate-500">{stat.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
