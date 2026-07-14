"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Star, Package, Clock, Users } from "lucide-react";

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

const stats = [
  {
    icon: Package,
    numericValue: 200,
    suffix: "+",
    label: "Projects Delivered",
    detail: "Across 6 industries",
    accent: "#818CF8",
  },
  {
    icon: Clock,
    numericValue: 5,
    suffix: "+",
    label: "Years Experience",
    detail: "Founded in 2019",
    accent: "#A78BFA",
  },
  {
    icon: Users,
    numericValue: 50,
    suffix: "+",
    label: "Happy Clients",
    detail: "Zero failed projects",
    accent: "#38BDF8",
  },
  {
    icon: Star,
    numericValue: 4,
    suffix: "h",
    label: "Avg Response",
    detail: "Mon – Sat support",
    accent: "#34D399",
  },
];

function StatCard({
  stat,
  index,
  active,
}: {
  stat: (typeof stats)[0];
  index: number;
  active: boolean;
}) {
  const count = useCountUp(stat.numericValue, 1.4, active);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative flex flex-col items-center text-center px-6 py-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.18] transition-all duration-300"
      style={{
        boxShadow: "0 0 0 0 transparent",
      }}
      whileHover={{
        boxShadow: `0 0 24px 0 ${stat.accent}22, 0 0 1px 0 ${stat.accent}44`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-8 h-px rounded-full opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)` }}
      />
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${stat.accent}12`, borderColor: `${stat.accent}25` }}
      >
        <Icon style={{ color: stat.accent, width: 18, height: 18 }} />
      </div>
      {/* Value */}
      <p
        className="text-5xl font-bold tracking-tight mb-1.5 tabular-nums"
        style={{
          background: "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count}{stat.suffix}
      </p>
      <p className="text-sm font-semibold text-slate-300 mb-1">{stat.label}</p>
      <p className="text-xs text-slate-500">{stat.detail}</p>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="relative py-12 overflow-hidden">
      {/* Top gradient border — full width accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.6) 30%, rgba(139,92,246,0.7) 50%, rgba(99,102,241,0.6) 70%, transparent 100%)" }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.12) 50%, transparent 100%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.04) 0%, rgba(99,102,241,0.01) 100%)" }}
      />

      <div className="relative max-w-[92rem] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
