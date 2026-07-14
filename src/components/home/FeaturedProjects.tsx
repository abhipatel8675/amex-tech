"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { useRef } from "react";

const featured = projects.filter((p) => p.featured).slice(0, 3);

function ProjectCard({ project, index }: { project: (typeof featured)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-white/[0.14] transition-all duration-300"
      style={{ boxShadow: "0 0 0 0 rgba(99,102,241,0)" }}
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
    >
      {/* Large decorative counter */}
      <span
        className="absolute top-3 right-4 font-bold select-none pointer-events-none z-10"
        style={{ fontSize: 72, lineHeight: 1, color: "rgba(255,255,255,0.04)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Image area */}
      <div className="relative overflow-hidden" style={{ height: 224 }}>
        {project.image ? (
          project.category === "Mobile App" ? (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(160deg, ${project.gradientFrom}28 0%, rgba(11,15,25,0.95) 100%)`,
                }}
              />
              <motion.div style={{ y: imgY }} className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain object-center group-hover:scale-[1.03] transition-transform duration-700 px-8 pt-4"
                  unoptimized={project.image.startsWith("http")}
                />
              </motion.div>
            </>
          ) : (
            <motion.div style={{ y: imgY }} className="absolute inset-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                unoptimized={project.image.startsWith("http")}
              />
            </motion.div>
          )
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.gradientFrom}22, ${project.gradientTo}22)`,
            }}
          />
        )}

        {/* Bottom fade into card */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(11,15,25,0.85))" }}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md"
            style={{
              color: project.gradientFrom,
              borderColor: `${project.gradientFrom}40`,
              background: `rgba(11,15,25,0.65)`,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Accent glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${project.gradientFrom}18 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Card content */}
      <div className="p-6 pt-5">
        <h3
          className="text-lg font-bold text-white mb-2 leading-snug transition-all duration-300"
          style={{ letterSpacing: "-0.015em" }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(148,163,184,0.8)" }}>
          {project.shortDesc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-slate-400 bg-white/[0.04] border border-white/[0.07] px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <Link
            href={`/portfolio/${project.slug}`}
            className="text-sm font-semibold text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5"
          >
            Case Study <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-400 hover:text-indigo-300 transition-colors flex items-center gap-1 group/live"
            >
              View Live
              <span className="opacity-60 group-hover/live:opacity-100 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-all duration-200">↗</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  return (
    <section className="py-12 md:py-16 border-t border-white/[0.06]">
      <div className="max-w-[92rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-4"
        >
          <div>
            <p
              className="mb-4 font-semibold uppercase"
              style={{ fontSize: 11, letterSpacing: "0.15em", color: "#818CF8" }}
            >
              Selected Work
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ letterSpacing: "-0.025em" }}
            >
              Products we&apos;re proud of.
            </h2>
          </div>
        </motion.div>

        {/* Progress bar placeholder */}
        <div className="mb-12 h-px bg-white/[0.06] relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full"
            style={{ background: "linear-gradient(90deg, #6366F1, #A78BFA)" }}
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Full-width CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <Link
            href="/portfolio"
            className="group flex items-center justify-between w-full px-8 py-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14] transition-all duration-300"
          >
            <span className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors">
              See All {projects.length} Projects
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-indigo-400 text-xl"
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
