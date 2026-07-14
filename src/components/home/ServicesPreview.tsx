"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, LayoutDashboard, Smartphone, Layers, Rocket, Palette, Search, Brain } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Conversion-optimised sites on modern frameworks that represent your brand professionally and turn visitors into clients.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "/services#web-development",
    accent: "#3B82F6",
  },
  {
    icon: LayoutDashboard,
    title: "Web Application",
    desc: "Complex dashboards, portals, and SaaS platforms architected to handle real business logic and scale with your growth.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Supabase"],
    href: "/services#web-app-development",
    accent: "#8B5CF6",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    desc: "Cross-platform iOS and Android apps that feel native, load fast, and keep users engaged for the long term.",
    technologies: ["React Native", "Expo", "Firebase", "Swift"],
    href: "/services#mobile-app-development",
    accent: "#EC4899",
  },
  {
    icon: Layers,
    title: "SaaS Development",
    desc: "Multi-tenant platforms built to scale from day one — subscription billing, team access, and usage analytics included.",
    technologies: ["Next.js", "Stripe", "Supabase", "Redis"],
    href: "/services#saas-development",
    accent: "#10B981",
  },
  {
    icon: Rocket,
    title: "DevOps and Deployment",
    desc: "CI/CD pipelines, cloud infrastructure, and zero-downtime deployments that let your team ship with complete confidence.",
    technologies: ["AWS", "Vercel", "Docker", "GitHub Actions"],
    href: "/services#devops-deployment",
    accent: "#F59E0B",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "User-centered design that reduces churn, increases activation, and makes your product feel completely effortless to use.",
    technologies: ["Figma", "Framer", "Prototyping", "Design Systems"],
    href: "/services#ui-ux-design",
    accent: "#D946EF",
  },
  {
    icon: Search,
    title: "SEO Services",
    desc: "Rank higher, get found, and drive compounding organic traffic. We handle technical SEO, on-page optimization, and content strategy from audit to execution.",
    technologies: ["Technical SEO", "On-Page SEO", "Content Strategy", "Core Web Vitals", "Schema Markup", "Link Building"],
    href: "/services#seo-services",
    accent: "#22C55E",
  },
  {
    icon: Brain,
    title: "AI Services",
    desc: "Custom AI automation and intelligent workflows that save time, cut costs, and scale your operations — from no-code automations to full AI-powered product builds.",
    technologies: ["n8n", "Zapier", "Make", "OpenAI", "LangChain", "Custom AI Agents"],
    href: "/services#ai-services",
    accent: "#A855F7",
  },
];

export default function ServicesPreview() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  const handleSelect = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  const current = services[active];
  const Icon = current.icon;

  return (
    <section
      className="relative py-10 md:py-16 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Section background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(15,20,35,0.7) 50%, transparent 100%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
          backgroundSize: "28px 28px",
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
              style={{ fontSize: 11, letterSpacing: "0.15em", color: "#818CF8" }}
            >
              OUR EXPERTISE
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-lg"
              style={{ letterSpacing: "-0.025em" }}>
              Eight Ways We Build<br />Your Product.
            </h2>
          </motion.div>
          <Link
            href="/services"
            className="shrink-0 self-start sm:self-auto px-5 py-2.5 rounded-full border border-white/[0.15] text-sm font-medium text-slate-300 hover:border-white/[0.35] hover:text-white transition-all duration-200"
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
                className="group relative flex items-center py-5 pl-7 text-left border-l-2 transition-all duration-300 focus:outline-none"
                style={{ borderColor: active === i ? service.accent : "rgba(255,255,255,0.07)" }}
              >
                {active === i && (
                  <motion.div
                    layoutId="service-row-bg"
                    className="absolute inset-0 rounded-r-xl"
                    style={{ background: `${service.accent}08` }}
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  />
                )}
                <span
                  className="relative text-2xl md:text-[26px] font-bold tracking-tight transition-colors duration-300"
                  style={{
                    color: active === i ? "white" : "rgba(148,163,184,0.45)",
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
                className="relative rounded-2xl border border-white/[0.08] bg-white/[0.025] p-8 overflow-hidden"
              >
                {/* Accent glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 80% 15%, ${current.accent}12, transparent 55%)` }}
                />
                {/* Icon */}
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border"
                  style={{ background: `${current.accent}15`, borderColor: `${current.accent}30` }}
                >
                  <Icon style={{ color: current.accent, width: 28, height: 28 }} />
                </div>
                <h3 className="relative text-2xl font-bold text-white mb-4">{current.title}</h3>
                <p className="relative text-slate-300 leading-8 mb-8" style={{ opacity: 0.85 }}>{current.desc}</p>

                {/* Technologies */}
                <div className="relative mb-8">
                  <p
                    className="mb-4 font-semibold uppercase"
                    style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(100,116,139,0.8)" }}
                  >
                    Core Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {current.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm text-slate-300 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={current.href}
                  className="relative inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 group"
                  style={{ color: current.accent }}
                >
                  Learn more
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
                        background: i === active ? current.accent : "rgba(255,255,255,0.12)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden flex flex-col divide-y divide-white/[0.06]">
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
                    style={{ color: isOpen ? "white" : "rgba(148,163,184,0.6)" }}
                  >
                    {service.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-slate-500 text-2xl leading-none"
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
                          style={{ background: `${service.accent}15`, borderColor: `${service.accent}30` }}
                        >
                          <SIcon style={{ color: service.accent, width: 20, height: 20 }} />
                        </div>
                        <p className="text-slate-300 leading-7 mb-5">{service.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-sm text-slate-300 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-lg"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={service.href}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold"
                          style={{ color: service.accent }}
                        >
                          Learn more <ArrowRight className="w-3.5 h-3.5" />
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
