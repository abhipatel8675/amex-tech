"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, LayoutDashboard, Smartphone, Layers, Zap, Rocket, Palette, Settings } from "lucide-react";

const previewServices = [
  { icon: Globe, title: "Website Development", desc: "Conversion-optimised sites built on modern frameworks.", href: "/services#web-development", accent: "#6366F1" },
  { icon: LayoutDashboard, title: "Web Applications", desc: "Complex dashboards, portals, and SaaS platforms.", href: "/services#web-app-development", accent: "#8B5CF6" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Cross-platform iOS & Android apps users love.", href: "/services#mobile-app-development", accent: "#EC4899" },
  { icon: Layers, title: "SaaS Development", desc: "Multi-tenant platforms built to scale.", href: "/services#saas-development", accent: "#10B981" },
  { icon: Zap, title: "API & Integrations", desc: "Robust APIs and seamless third-party connections.", href: "/services#api-development", accent: "#F59E0B" },
  { icon: Rocket, title: "DevOps & Deployment", desc: "CI/CD pipelines and cloud infrastructure.", href: "/services#devops-deployment", accent: "#64748B" },
  { icon: Palette, title: "UI/UX Design", desc: "User-centered design that drives retention.", href: "/services#ui-ux-design", accent: "#D946EF" },
  { icon: Settings, title: "Maintenance & Support", desc: "Long-term technical partnership and upkeep.", href: "/services#maintenance-support", accent: "#0EA5E9" },
];

export default function ServicesPreview() {
  return (
    <section className="py-28 max-w-6xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
      >
        <div>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-sm leading-tight">
            Everything your product needs, built right.
          </h2>
        </div>
        <Link
          href="/services"
          className="group flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors flex-shrink-0"
        >
          All services
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {previewServices.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <Link
                href={service.href}
                className="group flex flex-col gap-4 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 h-full"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ background: `${service.accent}15`, border: `1px solid ${service.accent}25` }}
                >
                  <Icon
                    className="w-4.5 h-4.5 transition-colors duration-300"
                    style={{ color: service.accent, width: "18px", height: "18px" }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-200 mb-1.5 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium transition-colors duration-200" style={{ color: service.accent }}>
                  Learn more
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
