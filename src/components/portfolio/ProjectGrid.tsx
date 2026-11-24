"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { isDeviceMockup } from "@/lib/portfolioImages";
import { categories, projectsForStack, stackGroups, type Category, type Project } from "@/data/projects";


const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };
const TILT = 7; // max degrees

// Touch screens have no hover, so they get the details shown statically.
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeHover(cb: () => void) {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function useCanHover() {
  return useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia(HOVER_QUERY).matches,
    () => true,
  );
}

function TechChips({ items, max = 4, dark = false }: { items: string[]; max?: number; dark?: boolean }) {
  const shown = items.slice(0, max);
  const rest = items.length - shown.length;
  const chip = dark
    ? "bg-white/12 text-white/90 ring-1 ring-white/15"
    : "bg-[#efeee6] text-[#4d554b] ring-1 ring-[#dadcd1]";
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((t) => (
        <li key={t} className={`text-[13px] font-medium px-2 py-0.5 rounded-full ${chip}`}>
          {t}
        </li>
      ))}
      {rest > 0 && (
        <li className={`text-[13px] font-medium px-2 py-0.5 rounded-full ${chip}`}>+{rest}</li>
      )}
    </ul>
  );
}

function ProjectCard({ project, index, animateIn }: { project: Project; index: number; animateIn: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const canHover = useCanHover();
  const reduceMotion = useReducedMotion();
  const interactive = canHover && !reduceMotion;

  // Pointer position, normalised to -0.5 … 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [TILT, -TILT]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-TILT, TILT]), SPRING);
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35), transparent 55%)`;

  function onPointerMove(e: React.PointerEvent) {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onPointerLeave() {
    setHovered(false);
    px.set(0);
    py.set(0);
  }

  const isMobile = project.category === "Mobile App";
  const fit = isMobile
    ? "object-contain px-8 pt-4"
    : `object-cover ${project.imagePosition ?? (isDeviceMockup(project.image) ? "object-center" : "object-top")}`;
  const showDetails = hovered && canHover;

  return (
    <motion.li
      layout
      // First paint renders cards visible (server HTML, LCP); only filter changes fade in.
      initial={animateIn ? { opacity: 0, y: 24 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 8) * 0.05 }}
      style={{ perspective: 1000 }}
      className="list-none"
    >
      <Link
        ref={ref}
        href={`/portfolio/${project.slug}`}
        onPointerEnter={() => setHovered(true)}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group block rounded-[22px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9a722a] focus-visible:ring-offset-4"
        aria-label={`${project.title} — view case study`}
      >
        <motion.div
          style={interactive ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
          animate={{ scale: showDetails && !reduceMotion ? 1.02 : 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative aspect-[16/10] rounded-[22px] overflow-hidden bg-[#efeee6] ring-1 ring-[#111111]/[0.06] shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-20px_rgba(15,23,42,0.35)]"
        >
          {project.image ? (
            <>
              {isMobile && (
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(160deg, ${project.gradientFrom}28 0%, rgba(11,15,25,0.95) 100%)` }}
                />
              )}
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className={`${fit} transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]`}
                unoptimized={project.image.startsWith("http")}
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
            />
          )}

          {/* Darkening veil + glare, only while hovering */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/95 via-[#111111]/60 to-[#111111]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
          {interactive && (
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: glare }}
            />
          )}

          {/* Hover details */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-x-0 bottom-0 p-5 flex items-end gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] leading-relaxed text-white/90 mb-3 line-clamp-3">
                    {project.shortDesc}
                  </p>
                  <TechChips items={project.technologies} dark />
                </div>
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
                  className="shrink-0 grid place-items-center w-11 h-11 rounded-full bg-white text-[#111111] shadow-lg"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Caption */}
        <div className="pt-4 px-1">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[17px] font-medium text-[#111111] tracking-[-0.01em] truncate">
              {project.title}
            </h3>
            <span className="shrink-0 text-xs text-[#444444]">{project.category}</span>
          </div>
          {canHover ? (
            <p className="mt-1 text-sm text-[#444444] truncate">{project.tags.slice(0, 2).join(" · ")}</p>
          ) : (
            <div className="mt-2 space-y-3">
              <p className="text-sm leading-relaxed text-[#4d554b]">{project.shortDesc}</p>
              <TechChips items={project.technologies} />
            </div>
          )}
        </div>
      </Link>
    </motion.li>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeStack, setActiveStack] = useState<string>("All");
  const [hasFiltered, setHasFiltered] = useState(false);

  // Homepage stack links arrive as /portfolio?stack=Modern websites
  useEffect(() => {
    const stack = new URLSearchParams(window.location.search).get("stack");
    if (stack && stackGroups.some((g) => g.name === stack)) {
      setActiveStack(stack);
      setHasFiltered(true);
    }
  }, []);

  function chooseStack(stack: string) {
    setHasFiltered(true);
    setActiveStack(stack);
    const url = new URL(window.location.href);
    if (stack === "All") url.searchParams.delete("stack");
    else url.searchParams.set("stack", stack);
    window.history.replaceState(null, "", url);
  }

  const stacks = stackGroups
    .map((g) => ({ name: g.name, count: projectsForStack(projects, g.name).length }))
    .filter((g) => g.count > 0);

  const byCategory =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);
  const filtered = activeStack === "All" ? byCategory : projectsForStack(byCategory, activeStack);

  return (
    <>
      {/* Segmented filter */}
      <div className="flex flex-wrap items-center gap-4 mb-12">
        <div className="inline-flex flex-wrap gap-1 p-1 rounded-full bg-[#efeee6] ring-1 ring-[#dadcd1]/70">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setHasFiltered(true);
                  setActiveCategory(cat);
                }}
                aria-pressed={active}
                className={`relative text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9a722a] ${
                  active ? "text-[#111111]" : "text-[#444444] hover:text-[#111111]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="portfolio-filter-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(15,23,42,0.12)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {cat}
                  <span className={`ml-1.5 text-xs ${active ? "text-[#7a5807]" : "text-[#555555]"}`}>
                    {cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <span className="ml-auto text-sm text-[#444444]">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Tech stack filter */}
      <div className="-mt-6 mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#444444]">
          Filter by type of work
        </p>
        <div className="flex flex-wrap gap-2">
          {[{ name: "All", count: projects.length }, ...stacks].map(({ name, count }) => {
            const active = activeStack === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => chooseStack(name)}
                aria-pressed={active}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-[5px] border px-3.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9a722a] ${
                  active
                    ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                    : "border-[#dadcd1] bg-white text-[#3d453b] hover:border-[#9a722a] hover:text-[#111111]"
                }`}
              >
                {name}
                <span className={`text-xs ${active ? "text-[#e7c98a]" : "text-[#555555]"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="mb-12 text-[#444444]">
          No {activeCategory} projects with {activeStack} yet.{" "}
          <button type="button" className="font-medium text-[#7a5807] underline" onClick={() => { setActiveCategory("All"); chooseStack(activeStack); }}>
            Show all {activeStack} projects
          </button>
        </p>
      )}

      <motion.ul layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} animateIn={hasFiltered} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
