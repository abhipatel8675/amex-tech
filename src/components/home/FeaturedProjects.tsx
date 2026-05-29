"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.featured).slice(0, 3);

export default function FeaturedProjects() {
  return (
    <section className="py-32 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-16"
        >
          <div>
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">
              Selected Work
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Products we're proud of.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group flex items-center gap-2 text-base font-medium text-slate-400 hover:text-white transition-colors shrink-0"
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Projects */}
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Visual banner */}
              <div
                className="relative h-52 overflow-hidden"
                style={project.image ? {} : { background: `linear-gradient(135deg, ${project.gradientFrom}22 0%, ${project.gradientTo}18 100%)` }}
              >
                {project.image ? (
                  <>
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      unoptimized={project.image.startsWith("http")}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                  </>
                ) : (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at 25% 60%, ${project.gradientFrom}45, transparent 65%)` }}
                    />
                    <div className="absolute inset-4 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm flex items-center justify-center overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${project.gradientFrom}60, transparent)` }} />
                      <div className="grid grid-cols-3 gap-2 p-4 w-full">
                        {[60, 85, 45].map((h, idx) => (
                          <div key={idx} className="flex flex-col gap-1.5">
                            <div className="h-1 rounded-full bg-white/[0.08]" style={{ width: `${h}%` }} />
                            <div className="h-1 rounded-full bg-white/[0.05]" style={{ width: `${100 - h}%` }} />
                            <div className="h-1 rounded-full bg-white/[0.06]" style={{ width: `${h * 0.7}%` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {/* Category badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm"
                    style={
                      project.image
                        ? { color: "white", borderColor: "rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.45)" }
                        : { color: project.gradientFrom, borderColor: `${project.gradientFrom}30`, background: `${project.gradientFrom}12` }
                    }
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{project.shortDesc}</p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-slate-400 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Results preview */}
                {project.results[0] && (
                  <div className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-lg bg-violet-500/[0.08] border border-violet-500/[0.20]">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                    <span className="text-sm text-violet-300 font-medium">{project.results[0]}</span>
                  </div>
                )}

                {/* Links */}
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/[0.06]">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                  >
                    Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-500 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      Live <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-base font-medium text-slate-400 hover:text-white transition-colors"
          >
            Explore all {projects.length} projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
