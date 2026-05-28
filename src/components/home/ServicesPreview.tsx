"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Layers,
  Zap,
  Rocket,
  Palette,
  Settings,
} from "lucide-react";

const previewServices = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "High-performance sites built for conversion and growth.",
    href: "/services#web-development",
  },
  {
    icon: LayoutDashboard,
    title: "Web Applications",
    desc: "Complex dashboards, portals, and SaaS platforms.",
    href: "/services#web-app-development",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Cross-platform iOS & Android apps users love.",
    href: "/services#mobile-app-development",
  },
  {
    icon: Layers,
    title: "SaaS Development",
    desc: "Multi-tenant platforms built to scale.",
    href: "/services#saas-development",
  },
  {
    icon: Zap,
    title: "API & Integrations",
    desc: "Robust APIs and seamless third-party connections.",
    href: "/services#api-development",
  },
  {
    icon: Rocket,
    title: "DevOps & Deployment",
    desc: "CI/CD pipelines and cloud infrastructure.",
    href: "/services#devops-deployment",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "User-centered design that drives engagement.",
    href: "/services#ui-ux-design",
  },
  {
    icon: Settings,
    title: "Maintenance & Support",
    desc: "Long-term technical partnership and upkeep.",
    href: "/services#maintenance-support",
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-3">
          What We Do
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-md">
            Everything your product needs, built right.
          </h2>
          <Link
            href="/services"
            className="flex items-center gap-1.5 text-sm text-[#555] hover:text-white transition-colors flex-shrink-0"
          >
            View all services <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#1a1a1a]">
        {previewServices.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={service.href}
                className="group flex flex-col gap-3 p-6 bg-[#050505] hover:bg-[#0a0a0a] transition-colors h-full"
              >
                <div className="w-9 h-9 rounded-lg bg-[#111] border border-[#1f1f1f] flex items-center justify-center group-hover:border-[#00dc82]/30 transition-colors">
                  <Icon className="w-4 h-4 text-[#555] group-hover:text-[#00dc82] transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{service.title}</h3>
                  <p className="text-xs text-[#555] leading-relaxed">{service.desc}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#333] group-hover:text-[#00dc82] group-hover:translate-x-0.5 transition-all mt-auto" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
