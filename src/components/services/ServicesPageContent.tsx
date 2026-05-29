"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Globe, LayoutDashboard, Smartphone, Layers, Zap, Server, Rocket, Palette, Settings } from "lucide-react";
import { services } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  Globe, LayoutDashboard, Smartphone, Layers, Zap, Server, Rocket, Palette, Settings,
};

export default function ServicesPageContent() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-60 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #6366F1, transparent 70%)" }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-6xl mx-auto px-6"
        >
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-5">
            Our Services
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-3xl mb-7 leading-tight">
            Everything your product needs,{" "}
            <span style={{ background: "linear-gradient(135deg, #818CF8, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              under one roof.
            </span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl leading-8">
            From concept to production — we handle the full technology lifecycle so you can focus on your business.
          </p>
        </motion.div>
      </section>

      {/* Services */}
      <section className="pb-32 max-w-6xl mx-auto px-6">
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
                transition={{ duration: 0.45, delay: i * 0.03 }}
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.11] transition-all duration-300 p-8 md:p-10 overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute top-0 left-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
                  style={{ background: `radial-gradient(ellipse, ${service.accentColor}25, transparent 70%)` }}
                />

                <div className="relative grid md:grid-cols-3 gap-8 lg:gap-14">
                  {/* Left: icon + title + desc + cta */}
                  <div className="md:col-span-1 flex flex-col gap-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0 transition-all duration-300 group-hover:scale-105"
                      style={{ background: `${service.accentColor}12`, borderColor: `${service.accentColor}28` }}
                    >
                      <Icon style={{ color: service.accentColor, width: "24px", height: "24px" }} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors leading-snug">{service.title}</h2>
                      <p className="text-base text-slate-300 leading-7">{service.description}</p>
                    </div>
                    <Link
                      href="/contact"
                      className="mt-auto group/link inline-flex items-center gap-2 text-base font-semibold transition-all duration-200"
                      style={{ color: service.accentColor }}
                    >
                      Discuss this service
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  {/* Right: tech + benefits */}
                  <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
                    {/* Technologies */}
                    <div>
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-sm font-medium text-slate-300 bg-white/[0.04] border border-white/[0.07] px-3.5 py-1.5 rounded-lg hover:border-white/[0.12] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
                        What's Included
                      </p>
                      <ul className="flex flex-col gap-3">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3 text-base text-slate-300">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: `${service.accentColor}15` }}
                            >
                              <Check style={{ color: service.accentColor, width: "11px", height: "11px" }} />
                            </div>
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
