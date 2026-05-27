"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Michael R.",
    role: "Startup Founder",
    platform: "Upwork",
    stars: 5,
    text: "Abhi delivered exactly what I needed — a full Next.js app with Supabase backend in under 2 weeks. Clean code, great communication, zero surprises.",
  },
  {
    name: "Sarah T.",
    role: "Product Manager",
    platform: "Upwork",
    stars: 5,
    text: "Our Lovable app was breaking in production. Abhi fixed all the issues, connected our real database, and deployed it properly. Saved us weeks of work.",
  },
  {
    name: "David K.",
    role: "E-commerce Owner",
    platform: "Fiverr",
    stars: 5,
    text: "Fast bug fixes on our React app. Found 3 issues I'd been chasing for days and fixed them in 24 hours. Will definitely hire again.",
  },
  {
    name: "Jessica M.",
    role: "Tech Lead",
    platform: "Upwork",
    stars: 5,
    text: "Deployed our Node.js app to AWS with full CI/CD setup. Documentation was clear, everything worked first try. Highly recommend.",
  },
  {
    name: "Carlos A.",
    role: "SaaS Founder",
    platform: "Upwork",
    stars: 5,
    text: "Built our entire SaaS platform from scratch. React Native mobile app + Next.js dashboard + Node API. 100% job success for a reason.",
  },
  {
    name: "Amy L.",
    role: "Agency Owner",
    platform: "Fiverr",
    stars: 5,
    text: "Python/Django backend was throwing cryptic errors. Abhi diagnosed and fixed everything in hours. Excellent communication throughout.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 text-xs text-[#00dc82] bg-[#00dc82]/10 border border-[#00dc82]/20 px-3 py-1.5 rounded-full mb-4">
          Reviews
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">What Clients Say</h2>
        <p className="text-[#6b7280]">100% Job Success Score on Upwork. 5 stars across all platforms.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#2f2f2f] transition-all"
          >
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: r.stars }).map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-[#00dc82] text-[#00dc82]" />
              ))}
              <span className="ml-2 text-xs text-[#6b7280] bg-[#1a1a1a] px-2 py-0.5 rounded-full">
                {r.platform}
              </span>
            </div>
            <p className="text-base text-[#9ca3af] leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
            <div>
              <div className="text-base font-semibold">{r.name}</div>
              <div className="text-sm text-[#6b7280]">{r.role}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 flex flex-wrap items-center justify-center gap-8 py-6 border-y border-[#1f1f1f]"
      >
        {[
          ["$80K+", "Earned on Upwork"],
          ["100%", "Job Success Score"],
          ["Top Rated Plus", "Upwork Status"],
          ["Level 2", "Fiverr Seller"],
          ["1 Hour", "Avg Response Time"],
        ].map(([val, label]) => (
          <div key={label} className="text-center">
            <div className="text-xl font-bold text-[#00dc82]">{val}</div>
            <div className="text-sm text-[#6b7280]">{label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
