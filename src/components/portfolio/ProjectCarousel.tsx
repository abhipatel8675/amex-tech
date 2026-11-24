"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
} from "lucide-react";

export type Slide = { src: string; alt: string; caption?: string };

interface ProjectCarouselProps {
  slides: Slide[];
  contain?: boolean;
}

export default function ProjectCarousel({
  slides,
  contain = false,
}: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isInitialMount = useRef(true);

  const count = slides.length;

  // Guarantee the page starts from the exact top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const goTo = useCallback(
    (newIndex: number) => {
      setIndex((newIndex + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Keyboard navigation
  useEffect(() => {
    if (count < 2 && !lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape" && lightboxOpen) setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, count, lightboxOpen]);

  // Scroll active thumbnail smoothly within the horizontal filmstrip container ONLY
  // Never affects or touches the main window/page scroll!
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const container = filmstripRef.current;
    const activeThumb = thumbnailRefs.current[index];
    if (container && activeThumb) {
      const containerRect = container.getBoundingClientRect();
      const thumbRect = activeThumb.getBoundingClientRect();
      const offsetLeft = thumbRect.left - containerRect.left + container.scrollLeft;
      const targetScroll = offsetLeft - (container.clientWidth / 2) + (activeThumb.clientWidth / 2);
      container.scrollTo({ left: Math.max(0, targetScroll), behavior: "smooth" });
    }
  }, [index]);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay || count < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoplay, count]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[index];

  // Helper to extract clean concise thumbnail title
  const getThumbnailLabel = (slide: Slide, i: number) => {
    if (slide.caption && slide.caption.trim()) {
      const clean = slide.caption.replace(/^Screen\s*\d+\s*[-:—]?\s*/i, "").trim();
      if (clean.length <= 18) return clean;
      const words = clean.split(/\s+/).slice(0, 2).join(" ");
      return words.length > 16 ? words.slice(0, 15) + "…" : words;
    }
    const stepNames = ["Overview", "Features", "Workflow", "Interface", "Details", "Mobile"];
    return stepNames[i] || `Screen ${i + 1}`;
  };

  return (
    <div className="group/studio max-w-5xl xl:max-w-[1100px] mx-auto space-y-3 sm:space-y-4">
      {/* ─── 1. HERO STAGE VIEWPORT (AMEX GOLD LOGO BRANDED) ─── */}
      <div className="relative">
        {/* Ambient Backlight: Rich Amex Gold Brand Glow */}
        <div
          aria-hidden
          className="absolute -inset-2 sm:-inset-3 rounded-[32px] sm:rounded-[40px] opacity-60 blur-2xl transition-all duration-700 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245, 196, 81, 0.32), rgba(204, 154, 26, 0.2), rgba(154, 114, 42, 0.1), transparent 70%)",
          }}
        />

        {/* Stage Container: Clamped height, warm studio frame with gold border accent */}
        <div
          className="relative w-full h-[260px] xs:h-[320px] sm:h-[390px] md:h-[470px] lg:h-[520px] max-h-[58vh] overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[28px] bg-[#0f0f0f] ring-1 ring-[#f5c451]/30 shadow-[0_20px_50px_-15px_rgba(154,114,42,0.25)] cursor-pointer select-none"
          onClick={() => setLightboxOpen(true)}
          role="region"
          aria-label="Project images hero stage"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={currentSlide.src}
                alt={currentSlide.alt || `Project mockup ${index + 1}`}
                fill
                unoptimized
                priority={index === 0}
                sizes="(min-width: 1280px) 1100px, 100vw"
                draggable={false}
                className={
                  contain
                    ? "object-contain p-4 sm:p-8 md:p-10"
                    : "object-contain p-2 sm:p-3 md:p-4"
                }
              />
            </motion.div>
          </AnimatePresence>

          {/* Top Controls Overlay */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none z-10">
            {/* Screen Index Counter Badge in Amex Gold */}
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#161616]/90 px-3.5 py-1.5 text-xs font-semibold text-[#f5c451] backdrop-blur-md ring-1 ring-[#f5c451]/35 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#f5c451] shadow-[0_0_8px_#f5c451] animate-pulse" />
              <span>
                Screen {index + 1} of {count}
              </span>
            </div>

            {/* Expand / Lightbox Button in Amex Gold */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(true);
              }}
              aria-label="Expand image to fullscreen"
              className="pointer-events-auto grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#161616]/90 text-[#f5c451] backdrop-blur-md ring-1 ring-[#f5c451]/35 hover:bg-[#f5c451] hover:text-[#0f0f0f] hover:scale-105 transition-all shadow-sm"
              title="Click to view full screen"
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Left / Right Arrow Navigation Overlays with Gold Accents */}
          {count > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#161616]/90 text-[#f5c451] ring-1 ring-[#f5c451]/40 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[#f5c451] hover:text-[#0f0f0f] hover:scale-110 opacity-80 sm:opacity-0 sm:group-hover/studio:opacity-100 focus-visible:opacity-100 focus:outline-none z-10"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#161616]/90 text-[#f5c451] ring-1 ring-[#f5c451]/40 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[#f5c451] hover:text-[#0f0f0f] hover:scale-110 opacity-80 sm:opacity-0 sm:group-hover/studio:opacity-100 focus-visible:opacity-100 focus:outline-none z-10"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}

          {/* Floating Caption Badge (Hover only, zero image obstruction) */}
          {currentSlide.caption && (
            <div className="pointer-events-none absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-10 transition-all duration-300 opacity-90 sm:opacity-0 sm:group-hover/studio:opacity-100">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#161616]/90 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md ring-1 ring-[#f5c451]/30 shadow-sm max-w-[85vw] sm:max-w-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f5c451] shadow-[0_0_6px_#f5c451]" />
                <span className="truncate">{currentSlide.caption}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── 2. VISUAL THUMBNAIL FILMSTRIP ─── */}
      {count > 1 && (
        <div className="space-y-1 pt-0.5">
          {/* Filmstrip Header & Controls */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a5807] shrink-0">
                All Project Screens
              </span>
              <span className="text-xs font-semibold text-[#CC9A1A]/80 shrink-0">
                ({count} total)
              </span>
              {currentSlide.caption && (
                <>
                  <span className="text-xs text-[#7a5807]/40 hidden md:inline">·</span>
                  <span className="text-xs text-[#444444] font-medium truncate hidden md:inline max-w-sm">
                    {currentSlide.caption}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Autoplay Toggle in Amex Gold */}
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  isAutoplay
                    ? "bg-[#9a722a] text-white shadow-sm ring-1 ring-[#f5c451]/50"
                    : "bg-[#9a722a]/10 text-[#7a5807] ring-1 ring-[#9a722a]/30 hover:bg-[#9a722a]/20"
                }`}
                title={isAutoplay ? "Pause slideshow" : "Play slideshow automatically"}
              >
                {isAutoplay ? (
                  <>
                    <Pause className="w-3 h-3 text-[#f5c451]" />
                    <span className="hidden xs:inline">Auto-playing</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-[#7a5807]" />
                    <span className="hidden xs:inline">Auto-cycle</span>
                  </>
                )}
              </button>

              <span className="text-[13px] text-[#555555] hidden lg:inline">
                Use ← → keys
              </span>
            </div>
          </div>

          {/* 
            Scrollable Filmstrip Strip:
            - pt-3 pb-3 provides ample vertical clearance so borders/shadows are never cut off.
            - Horizontal container scrolling is handled exclusively via container.scrollTo
              so the window/document never scrolls unexpectedly.
          */}
          <div
            ref={filmstripRef}
            className="flex items-stretch gap-3 overflow-x-auto pt-3 pb-3 px-1 scroll-smooth focus:outline-none"
            role="tablist"
            aria-label="Project screen thumbnails"
          >
            {slides.map((slide, i) => {
              const isActive = i === index;
              const label = getThumbnailLabel(slide, i);

              return (
                <button
                  key={slide.src}
                  ref={(el) => {
                    thumbnailRefs.current[i] = el;
                  }}
                  onClick={() => goTo(i)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View ${label} (Screen ${i + 1})`}
                  className={`group/thumb shrink-0 text-left rounded-xl transition-all duration-300 p-1.5 w-28 sm:w-36 md:w-44 ${
                    isActive
                      ? "bg-white border-2 border-[#f5c451] shadow-[0_6px_20px_-3px_rgba(245,196,81,0.45)] -translate-y-0.5"
                      : "bg-[#fbfaf6] border border-[#dadcd1] hover:border-[#CC9A1A]/50 hover:bg-white hover:shadow-sm opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#161616] mb-1.5">
                    <Image
                      src={slide.src}
                      alt={slide.alt || `Thumbnail ${i + 1}`}
                      fill
                      unoptimized
                      sizes="180px"
                      className="object-contain p-0.5"
                    />

                    {/* Active highlight inner ring */}
                    {isActive && (
                      <div className="absolute inset-0 ring-1 ring-inset ring-[#f5c451]/40 rounded-lg pointer-events-none" />
                    )}

                    {/* Step number badge in logo gold */}
                    <span
                      className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[12px] font-bold tabular-nums shadow-xs ${
                        isActive
                          ? "bg-[#f5c451] text-[#0f0f0f]"
                          : "bg-[#161616]/85 text-[#f5c451] ring-1 ring-[#f5c451]/25 backdrop-blur-sm"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Thumbnail Label */}
                  <div className="px-0.5">
                    <p
                      className={`text-xs truncate ${
                        isActive
                          ? "text-[#7a5807] font-bold"
                          : "text-[#444444] font-medium group-hover/thumb:text-[#7a5807]"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── 3. FULLSCREEN IMMERSIVE LIGHTBOX MODAL (LOGO THEME ACCENTS) ─── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 md:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Lightbox Top Bar */}
            <div
              className="flex items-center justify-between text-white z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#f5c451]/15 text-[#f5c451] border border-[#f5c451]/30">
                  Screen {index + 1} of {count}
                </span>
                <p className="text-sm font-medium text-neutral-300 truncate max-w-xs md:max-w-md hidden sm:block">
                  {currentSlide.caption || currentSlide.alt}
                </p>
              </div>

              <button
                onClick={() => setLightboxOpen(false)}
                aria-label="Close fullscreen view"
                className="grid place-items-center w-10 h-10 rounded-full bg-white/10 text-[#f5c451] hover:bg-[#f5c451] hover:text-[#0f0f0f] hover:scale-105 transition-all ring-1 ring-[#f5c451]/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Main Stage Image */}
            <div
              className="relative flex-1 my-3 sm:my-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full max-h-[82vh] flex items-center justify-center"
                >
                  <Image
                    src={currentSlide.src}
                    alt={currentSlide.alt || `Fullscreen view ${index + 1}`}
                    fill
                    unoptimized
                    sizes="100vw"
                    className="object-contain p-2 md:p-4"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Lightbox Nav Arrows */}
              {count > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous image"
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#161616]/90 text-[#f5c451] hover:bg-[#f5c451] hover:text-[#0f0f0f] hover:scale-110 transition-all backdrop-blur-md ring-1 ring-[#f5c451]/40 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next image"
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#161616]/90 text-[#f5c451] hover:bg-[#f5c451] hover:text-[#0f0f0f] hover:scale-110 transition-all backdrop-blur-md ring-1 ring-[#f5c451]/40 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Bottom Thumbnail Row in Logo Gold */}
            {count > 1 && (
              <div
                className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {slides.map((s, i) => (
                  <button
                    key={s.src}
                    onClick={() => goTo(i)}
                    className={`relative w-12 h-9 sm:w-14 sm:h-10 rounded-md overflow-hidden transition-all ${
                      i === index
                        ? "border-2 border-[#f5c451] scale-110 shadow-[0_0_12px_rgba(245,196,81,0.6)]"
                        : "opacity-40 hover:opacity-80 border border-white/20"
                    }`}
                  >
                    <Image
                      src={s.src}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      unoptimized
                      sizes="60px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
