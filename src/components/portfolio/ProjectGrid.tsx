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
import {
  categoryGroups,
  categoryLabel,
  projectsForCategoryGroup,
  projectsForStack,
  stackGroups,
  type Project,
} from "@/data/projects";


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
    : "bg-[#efeee6] text-[#111111] ring-1 ring-[#dadcd1]";
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
            <span className="shrink-0 text-xs text-[#111111]">{categoryLabel(project.category)}</span>
          </div>
          {canHover ? (
            <p className="mt-1 text-sm text-[#111111] truncate">{project.tags.slice(0, 2).join(" · ")}</p>
          ) : (
            <div className="mt-2 space-y-3">
              <p className="text-sm leading-relaxed text-[#111111]">{project.shortDesc}</p>
              <TechChips items={project.technologies} />
            </div>
          )}
        </div>
      </Link>
    </motion.li>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeStack, setActiveStack] = useState<string>("All");
  const [hasFiltered, setHasFiltered] = useState(false);

  // Homepage links arrive as /portfolio?category=Websites (and ?stack=Node.js & APIs)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const stack = params.get("stack");
    /* eslint-disable react-hooks/set-state-in-effect -- sync filters from the URL after hydration */
    if (category && categoryGroups.some((g) => g.name === category)) {
      setActiveCategory(category);
      setHasFiltered(true);
    }
    if (stack && stackGroups.some((g) => g.name === stack)) {
      setActiveStack(stack);
      setHasFiltered(true);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  function updateUrl(key: "category" | "stack", value: string) {
    const url = new URL(window.location.href);
    if (value === "All") url.searchParams.delete(key);
    else url.searchParams.set(key, value);
    window.history.replaceState(null, "", url);
  }
  function chooseCategory(category: string) {
    setHasFiltered(true);
    setActiveCategory(category);
    updateUrl("category", category);
  }
  function chooseStack(stack: string) {
    setHasFiltered(true);
    setActiveStack(stack);
    updateUrl("stack", stack);
  }
  function clearAll() {
    chooseCategory("All");
    chooseStack("All");
  }

  const categoryOptions = [
    { name: "All", count: projects.length },
    ...categoryGroups
      .map((g) => ({ name: g.name as string, count: projectsForCategoryGroup(projects, g.name).length }))
      .filter((g) => g.count > 0),
  ];
  const stacks = stackGroups
    .map((g) => ({ name: g.name as string, count: projectsForStack(projects, g.name).length }))
    .filter((g) => g.count > 0);
  const stackOptions = [{ name: "All", count: projects.length }, ...stacks];

  const byCategory = activeCategory === "All" ? projects : projectsForCategoryGroup(projects, activeCategory);
  const filtered = activeStack === "All" ? byCategory : projectsForStack(byCategory, activeStack);
  const isFiltered = activeCategory !== "All" || activeStack !== "All";

  return (
    <>
      {/* Filters */}
      <div className="mb-12 space-y-6">
        {/* Service filter: scrolls sideways on small screens */}
        <div className="-mx-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div
            role="group"
            aria-label="Filter by service"
            className="inline-flex gap-1 rounded-full bg-[#efeee6] p-1 ring-1 ring-[#dadcd1]/70"
          >
            {categoryOptions.map(({ name, count }) => {
              const active = activeCategory === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => chooseCategory(name)}
                  aria-pressed={active}
                  className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9a722a] ${
                    active ? "text-[#111111]" : "text-[#111111] hover:text-[#111111]"
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
                    {name}
                    <span className={`ml-1.5 text-xs ${active ? "text-[#7a5807]" : "text-[#111111]"}`}>{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Technology filter */}
        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111]">Filter by technology</p>
            <p className="text-sm text-[#111111]" aria-live="polite">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
              {isFiltered && (
                <>
                  {" · "}
                  <button type="button" onClick={clearAll} className="font-medium text-[#7a5807] underline underline-offset-2">
                    Clear
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Mobile: native dropdown */}
          <div className="relative sm:hidden">
            <select
              aria-label="Filter by technology"
              value={activeStack}
              onChange={(e) => chooseStack(e.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-[#dadcd1] bg-white pl-4 pr-11 text-[15px] font-medium text-[#111111] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9a722a]"
            >
              {stackOptions.map(({ name, count }) => (
                <option key={name} value={name}>
                  {name === "All" ? "All technologies" : name} ({count})
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111111]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Desktop: pills */}
          <div role="group" aria-label="Filter by technology" className="hidden flex-wrap gap-2 sm:flex">
            {stackOptions.map(({ name, count }) => {
              const active = activeStack === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => chooseStack(name)}
                  aria-pressed={active}
                  className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9a722a] ${
                    active
                      ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                      : "border-[#dadcd1] bg-white text-[#111111] hover:border-[#9a722a] hover:text-[#111111]"
                  }`}
                >
                  {name === "All" ? "All technologies" : name}
                  <span className={`text-xs ${active ? "text-[#e7c98a]" : "text-[#111111]"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="mb-12 text-[#111111]">
          No projects match these filters yet.{" "}
          <button type="button" className="font-medium text-[#7a5807] underline" onClick={clearAll}>
            Clear filters
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
