"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "10+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "<24h", label: "Response Time" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-[#1a1a1a] bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-white mb-1.5">{stat.value}</p>
              <p className="text-sm text-[#555]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
