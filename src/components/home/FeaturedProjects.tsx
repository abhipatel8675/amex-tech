"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.featured).slice(0, 3);

export default function FeaturedProjects() {
  return (
    <section className="py-24 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
        >
          <div className="max-w-lg">
            <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-3">
              Selected Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Products we're proud of.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="flex items-center gap-1.5 text-sm text-[#555] hover:text-white transition-colors flex-shrink-0"
          >
            View all projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden hover:border-[#2a2a2a] transition-colors"
            >
              {/* Visual */}
              <div
                className="h-44 w-full relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.gradientFrom}20, ${project.gradientTo}20)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${project.gradientFrom}60, transparent 70%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-2xl opacity-40 border"
                    style={{
                      background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                      borderColor: `${project.gradientFrom}40`,
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                  <span className="text-xs text-[#555] bg-[#111] border border-[#1f1f1f] px-2 py-0.5 rounded-md flex-shrink-0">
                    {project.category}
                  </span>
                </div>
                <p className="text-xs text-[#555] leading-relaxed mb-4">{project.shortDesc}</p>

                {/* Tech tags */}
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

                {/* Links */}
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
        </div>
      </div>
    </section>
  );
}
