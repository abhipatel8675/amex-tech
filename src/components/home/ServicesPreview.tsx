"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services as allServices } from "@/data/services";
import { serviceIcon } from "@/components/services/serviceIcons";

// Derived from the shared services list so the homepage always matches /services.
const services = allServices.map((s) => ({
  icon: serviceIcon(s.iconName),
  title: s.title,
  desc: s.description,
  technologies: s.technologies,
  href: `/services#${s.slug}`,
  accent: s.accentColor,
}));

export default function ServicesPreview() {
  const [active, setActive] = useState(0);

  // Selection is user-driven only — no timer-based auto-advance, so the
  // layout never shifts on its own (avoids the page scrolling up/down by
  // itself). On desktop, hover/focus over a service name drives selection
  // directly (instant preview); click is kept as a fallback trigger.
  const handleSelect = (i: number) => {
    setActive(i);
  };

  const current = services[active];
  const Icon = current.icon;

  // Cursor-following spotlight, scoped to this section only.
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotOpacity = useMotionValue(0);
  const springX = useSpring(spotX, { stiffness: 150, damping: 22, mass: 0.5 });
  const springY = useSpring(spotY, { stiffness: 150, damping: 22, mass: 0.5 });
  const springOpacity = useSpring(spotOpacity, { duration: 0.25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden bg-[#111827]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => spotOpacity.set(1)}
      onMouseLeave={() => spotOpacity.set(0)}
    >
      {/* Section background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #111827 0%, #0B1220 100%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Aurora glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px circle at 12% 15%, rgba(224,179,65,0.10), transparent 60%), radial-gradient(600px circle at 88% 85%, rgba(184,134,11,0.08), transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      {/* Cursor-following spotlight */}
      <motion.div
        className="absolute w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          opacity: springOpacity,
          background:
            "radial-gradient(circle, rgba(184,134,11,0.10) 0%, rgba(156,114,8,0.05) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative max-w-[92rem] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="mb-4 font-semibold uppercase"
              style={{ fontSize: 11, letterSpacing: "0.15em", color: "#E0B341" }}
            >
              OUR EXPERTISE
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-lg"
              style={{ letterSpacing: "-0.025em" }}>
              Everything You Need<br />to Grow Online.
            </h2>
          </motion.div>
          <Link
            href="/services"
            className="shrink-0 self-start sm:self-auto px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium text-slate-200 hover:border-[#E0B341] hover:text-white transition-all duration-200"
          >
            All services →
          </Link>
        </div>

        {/* Desktop: two-column */}
        <div className="hidden md:grid md:grid-cols-[1fr_1.15fr] gap-14 items-start">
          {/* Left: vertical service list */}
          <div className="flex flex-col">
            {services.map((service, i) => (
              <button
                key={service.title}
                onClick={() => handleSelect(i)}
                onMouseEnter={() => handleSelect(i)}
                onFocus={() => handleSelect(i)}
                className="group relative flex items-center py-5 pl-7 text-left border-l-2 transition-all duration-300 focus:outline-none"
                style={{
                  borderColor: active === i ? "#E0B341" : "rgba(255,255,255,0.10)",
                  boxShadow: "none",
                }}
              >
                {active === i && (
                  <motion.div
                    layoutId="service-row-bg"
                    className="absolute inset-0 rounded-r-xl"
                    style={{ background: "rgba(224,179,65,0.08)" }}
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  />
                )}
                <span
                  className="relative text-2xl md:text-[26px] font-bold tracking-tight transition-colors duration-300"
                  style={{
                    color: active === i ? "#FFFFFF" : "#6B7280",
                    lineHeight: 1.1,
                  }}
                >
                  {service.title}
                </span>
              </button>
            ))}
          </div>

          {/* Right: detail panel */}
          <div className="sticky top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-8 overflow-hidden transition-shadow duration-300"
                style={{ boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)" }}
              >
                {/* Accent glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 80% 15%, ${current.accent}12, transparent 55%)` }}
                />
                {/* Icon */}
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border"
                  style={{ background: "rgba(224,179,65,0.12)", borderColor: "rgba(224,179,65,0.3)" }}
                >
                  <Icon style={{ color: "#E0B341", width: 28, height: 28 }} />
                </div>
                <h3 className="relative text-2xl font-bold text-white mb-4">{current.title}</h3>
                <p className="relative text-slate-300 leading-8 mb-8">{current.desc}</p>

                {/* Technologies */}
                <div className="relative mb-8">
                  <p
                    className="mb-4 font-semibold uppercase"
                    style={{ fontSize: 10, letterSpacing: "0.15em", color: "#9CA3AF" }}
                  >
                    Core Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {current.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm text-slate-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={current.href}
                  className="relative inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 group"
                  style={{ color: "#E0B341" }}
                >
                  Learn more<span className="sr-only"> about {current.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                {/* Progress indicator */}
                <div className="absolute bottom-5 right-6 flex gap-1.5">
                  {services.map((s, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: i === active ? 20 : 6,
                        background: i === active ? "#E0B341" : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden flex flex-col divide-y divide-white/10">
          {services.map((service, i) => {
            const SIcon = service.icon;
            const isOpen = active === i;
            return (
              <div key={service.title}>
                <button
                  onClick={() => handleSelect(i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4 focus:outline-none"
                >
                  <span
                    className="text-lg font-bold transition-colors duration-200"
                    style={{ color: isOpen ? "#FFFFFF" : "#9CA3AF" }}
                  >
                    {service.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-slate-400 text-2xl leading-none"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-1">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 border"
                          style={{ background: "rgba(224,179,65,0.12)", borderColor: "rgba(224,179,65,0.3)" }}
                        >
                          <SIcon style={{ color: "#E0B341", width: 20, height: 20 }} />
                        </div>
                        <p className="text-slate-300 leading-7 mb-5">{service.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-sm text-slate-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={service.href}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold"
                          style={{ color: "#E0B341" }}
                        >
                          Learn more<span className="sr-only"> about {service.title}</span> <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
