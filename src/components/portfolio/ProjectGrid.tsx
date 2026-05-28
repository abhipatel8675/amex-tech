"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects, categories, type Category } from "@/data/projects";

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative text-sm font-medium px-5 py-2 rounded-xl border transition-all duration-200 ${
              activeCategory === cat
                ? "text-white border-indigo-500/40 bg-indigo-500/10"
                : "text-slate-500 border-white/[0.07] hover:border-white/[0.14] hover:text-slate-300 bg-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-sm text-slate-600 self-center">{filtered.length} project{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Visual */}
              <div
                className="relative h-48 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${project.gradientFrom}20 0%, ${project.gradientTo}16 100%)` }}
              >
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 25% 60%, ${project.gradientFrom}40, transparent 65%)` }} />
                {/* Fake UI grid */}
                <div className="absolute inset-4 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${project.gradientFrom}50, transparent)` }} />
                  <div className="p-4 grid grid-cols-3 gap-2 h-full">
                    {[55, 80, 40].map((h, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5 justify-end">
                        <div className="rounded-sm" style={{ height: `${h}%`, background: idx === 1 ? `linear-gradient(180deg, ${project.gradientFrom}80, ${project.gradientFrom}40)` : `rgba(255,255,255,0.06)` }} />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Category badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm"
                    style={{ color: project.gradientFrom, borderColor: `${project.gradientFrom}28`, background: `${project.gradientFrom}10` }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{project.shortDesc}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-slate-500 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.results[0] && (
                  <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/[0.15]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-xs text-emerald-400 font-medium">{project.results[0]}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 mt-auto border-t border-white/[0.06]">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group/link"
                  >
                    Case Study
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-slate-500 hover:text-white transition-colors flex items-center gap-1"
                    >
                      Live <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
