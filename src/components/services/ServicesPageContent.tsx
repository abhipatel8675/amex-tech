"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  Layers,
  Zap,
  Server,
  Rocket,
  Palette,
  Settings,
} from "lucide-react";
import { services } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  LayoutDashboard,
  Smartphone,
  Layers,
  Zap,
  Server,
  Rocket,
  Palette,
  Settings,
};

export default function ServicesPageContent() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-32 pb-16 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-4">
            Our Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mb-5">
            Everything your product needs, under one roof.
          </h1>
          <p className="text-[#555] text-base md:text-lg max-w-xl leading-relaxed">
            From initial concept to production deployment and ongoing maintenance — we handle the
            full technology lifecycle so you can focus on your business.
          </p>
        </motion.div>
      </section>

      {/* Services list */}
      <section className="pb-24 max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.iconName] ?? Globe;
            return (
              <motion.div
                key={service.slug}
                id={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="group rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-7 md:p-9 hover:border-[#2a2a2a] transition-colors"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Left col: icon + title + desc */}
                  <div className="md:col-span-1 flex flex-col gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${service.accentColor}12`,
                        borderColor: `${service.accentColor}25`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: service.accentColor }} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white mb-2">{service.title}</h2>
                      <p className="text-sm text-[#555] leading-relaxed">{service.description}</p>
                    </div>
                    <Link
                      href="/contact"
                      className="mt-auto flex items-center gap-1.5 text-sm font-medium transition-colors"
                      style={{ color: service.accentColor }}
                    >
                      Discuss this service <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Right col: tech + benefits */}
                  <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                    {/* Technologies */}
                    <div>
                      <p className="text-xs font-semibold text-[#444] uppercase tracking-wider mb-3">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs text-[#666] bg-[#111] border border-[#1a1a1a] px-2.5 py-1 rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <p className="text-xs font-semibold text-[#444] uppercase tracking-wider mb-3">
                        What's Included
                      </p>
                      <ul className="flex flex-col gap-2">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-sm text-[#666]">
                            <Check className="w-3.5 h-3.5 text-[#00dc82] flex-shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
