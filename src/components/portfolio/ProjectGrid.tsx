"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects, categories, type Category } from "@/data/projects";
import LaptopMockup from "@/components/ui/LaptopMockup";
import PhoneMockup from "@/components/ui/PhoneMockup";

function isMobileProject(category: string) {
  return category === "Mobile App";
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [hovered, setHovered] = useState(false);
  const mobile = isMobileProject(project.category);
  const router = useRouter();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.22 }}
      className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden flex flex-col transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/portfolio/${project.slug}`)}
      style={{
        boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.45)" : undefined,
        borderColor: hovered ? "rgba(255,255,255,0.13)" : undefined,
      }}
    >
      {/* ── Mockup area — fixed height so all rows match ── */}
      <div className="relative px-4 pt-3 pb-0 overflow-hidden h-[240px]">
        {/* Category badge */}
        <div className="absolute top-5 left-6 z-20">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm"
            style={{
              color: project.gradientFrom,
              borderColor: `${project.gradientFrom}30`,
              background: `${project.gradientFrom}12`,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Live badge — top-right, clickable */}
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-5 right-6 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-sm"
            style={{
              background: "rgba(16,140,107,0.14)",
              borderColor: "rgba(52,211,153,0.28)",
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[10px] font-semibold text-emerald-400 tracking-wide">LIVE</span>
          </motion.a>
        )}

        {mobile ? (
          /*
           * Phone — scaled to 0.625 so the full phone (≈227px visual) fits
           * inside the 228px content area (h-240 minus pt-3=12px).
           * transformOrigin "top center" keeps the top pinned while scaling down.
           */
          <div className="flex justify-center items-start h-full overflow-hidden">
            <motion.div
              animate={{
                scale: hovered ? 0.640 : 0.625,
                rotate: hovered ? 2 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: "top center" }}
            >
              <PhoneMockup src={project.image} alt={project.title} />
            </motion.div>
          </div>
        ) : (
          /* Laptop — 88% card width, screen (16/9) ≈167px + hinge 4px + base 44px = 215px */
          <motion.div
            animate={{ scale: hovered ? 1.015 : 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-full"
          >
            <LaptopMockup src={project.image} alt={project.title} className="h-full" />
          </motion.div>
        )}
      </div>

      {/* ── Hover overlay (slides up from bottom of card) ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-x-0 bottom-0 z-20 p-5 rounded-b-2xl border-t border-white/[0.08]"
            style={{
              background:
                "linear-gradient(0deg, rgba(11,15,25,0.98) 0%, rgba(11,15,25,0.94) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <p
              className="text-[10px] font-bold uppercase mb-1.5 tracking-widest"
              style={{ color: project.gradientFrom }}
            >
              {project.category}
            </p>
            <h3 className="text-base font-bold text-white mb-4 leading-snug">
              {project.title}
            </h3>
            <div className="flex items-center gap-2.5">
              <Link
                href={`/portfolio/${project.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                Case Study <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl border"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    color: "#34d399",
                    borderColor: "rgba(52,211,153,0.3)",
                    background: "rgba(52,211,153,0.08)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  Live <ExternalLink className="w-3 h-3" />
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Static card content ── */}
      <div className="p-5 pt-4 flex flex-col flex-1">
        <h3
          className="text-base font-bold text-white mb-1.5 leading-snug"
          style={{ letterSpacing: "-0.01em" }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "rgba(148,163,184,0.7)" }}
        >
          {project.shortDesc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-slate-400 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Always-visible action row */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/[0.06]">
          <Link
            href={`/portfolio/${project.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-sm font-semibold group/cs"
            style={{ color: "rgba(148,163,184,0.8)" }}
          >
            <span className="group-hover/cs:text-indigo-400 transition-colors">Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/cs:translate-x-0.5 group-hover/cs:text-indigo-400 transition-all" />
          </Link>

          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: "#34d399",
                borderColor: "rgba(52,211,153,0.2)",
                background: "rgba(52,211,153,0.06)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              Live Site <ExternalLink className="w-3 h-3" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="relative text-sm font-semibold px-5 py-2.5 rounded-full border transition-all duration-200 focus:outline-none"
            style={
              activeCategory === cat
                ? {
                    color: "white",
                    borderColor: "rgba(99,102,241,0.5)",
                    background: "rgba(99,102,241,0.12)",
                  }
                : {
                    color: "rgba(148,163,184,0.7)",
                    borderColor: "rgba(255,255,255,0.07)",
                    background: "transparent",
                  }
            }
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-sm" style={{ color: "rgba(100,116,139,0.8)" }}>
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Uniform 3-column grid — CSS grid auto-stretches all cards in each row to the same height */}
      <AnimatePresence mode="popLayout">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </AnimatePresence>
    </>
  );
}
