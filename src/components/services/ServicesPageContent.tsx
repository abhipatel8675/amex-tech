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
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-60 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #6366F1, transparent 70%)" }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-6xl mx-auto px-6"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">
            Our Services
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-2xl mb-6 leading-tight">
            Everything your product needs,{" "}
            <span style={{ background: "linear-gradient(135deg, #818CF8, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              under one roof.
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
            From concept to production — we handle the full technology lifecycle so you can focus on your business.
          </p>
        </motion.div>
      </section>

      {/* Services */}
      <section className="pb-28 max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-4">
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
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.11] transition-all duration-300 p-7 md:p-9 overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
                  style={{ background: `radial-gradient(ellipse, ${service.accentColor}25, transparent 70%)` }}
                />

                <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12">
                  {/* Left: icon + title + desc + cta */}
                  <div className="md:col-span-1 flex flex-col gap-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 transition-all duration-300 group-hover:scale-105"
                      style={{ background: `${service.accentColor}12`, borderColor: `${service.accentColor}28` }}
                    >
                      <Icon style={{ color: service.accentColor, width: "20px", height: "20px" }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">{service.title}</h2>
                      <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
                    </div>
                    <Link
                      href="/contact"
                      className="mt-auto group/link inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
                      style={{ color: service.accentColor }}
                    >
                      Discuss this service
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  {/* Right: tech + benefits */}
                  <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
                    {/* Technologies */}
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-4">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium text-slate-400 bg-white/[0.04] border border-white/[0.07] px-3 py-1 rounded-lg hover:border-white/[0.12] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-4">
                        What's Included
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-400">
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: `${service.accentColor}15` }}
                            >
                              <Check style={{ color: service.accentColor, width: "10px", height: "10px" }} />
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
