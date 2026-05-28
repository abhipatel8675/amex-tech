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
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm px-4 py-1.5 rounded-lg border transition-all ${
              activeCategory === cat
                ? "bg-[#00dc82]/10 border-[#00dc82]/30 text-[#00dc82]"
                : "border-[#1a1a1a] text-[#555] hover:border-[#2a2a2a] hover:text-[#888]"
            }`}
          >
            {cat}
          </button>
        ))}
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
              transition={{ duration: 0.25 }}
              className="group rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden hover:border-[#2a2a2a] transition-colors"
            >
              {/* Visual */}
              <div
                className="h-44 w-full relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.gradientFrom}18, ${project.gradientTo}18)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${project.gradientFrom}70, transparent 70%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-14 h-14 rounded-2xl opacity-50"
                    style={{
                      background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                  <span className="text-xs text-[#555] bg-[#111] border border-[#1a1a1a] px-2 py-0.5 rounded flex-shrink-0">
                    {project.category}
                  </span>
                </div>
                <p className="text-xs text-[#555] leading-relaxed mb-4">{project.shortDesc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#444] bg-[#111] border border-[#1a1a1a] px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="text-xs text-[#555] hover:text-white transition-colors flex items-center gap-1"
                  >
                    Case Study <ArrowRight className="w-3 h-3" />
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#555] hover:text-[#00dc82] transition-colors flex items-center gap-1"
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
