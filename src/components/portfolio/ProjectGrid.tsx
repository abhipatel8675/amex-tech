"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects, categories, type Category } from "@/data/projects";

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [hovered, setHovered] = useState(false);
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
      {/* ── Image area ── */}
      <div className="relative overflow-hidden h-[220px]">
        {project.image ? (
          project.category === "Mobile App" ? (
            <>
              {/* Tinted gradient background for portrait screenshots */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(160deg, ${project.gradientFrom}28 0%, rgba(11,15,25,0.95) 100%)`,
                }}
              />
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`object-contain ${project.imagePosition ?? "object-center"} transition-transform duration-700 px-8 pt-4`}
                style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
                unoptimized={project.image.startsWith("http")}
              />
            </>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover ${project.imagePosition ?? "object-center"} transition-transform duration-700`}
              style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
              unoptimized={project.image.startsWith("http")}
            />
          )
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.gradientFrom}22, ${project.gradientTo}22)`,
            }}
          />
        )}

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(11,15,25,0.9))" }}
        />

        {/* Hover color glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(ellipse at 50% 100%, ${project.gradientFrom}1a 0%, transparent 70%)`,
          }}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md"
            style={{
              color: project.gradientFrom,
              borderColor: `${project.gradientFrom}40`,
              background: "rgba(11,15,25,0.65)",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Live badge */}
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-md"
            style={{
              background: "rgba(11,15,25,0.65)",
              borderColor: "rgba(52,211,153,0.35)",
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[10px] font-semibold text-emerald-400 tracking-wide">LIVE</span>
          </motion.a>
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
            <span className="group-hover/cs:text-[#E1BC4A] transition-colors">Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/cs:translate-x-0.5 group-hover/cs:text-[#E1BC4A] transition-all" />
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
                    borderColor: "rgba(212,175,55,0.5)",
                    background: "rgba(212,175,55,0.12)",
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
