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
  // Natural aspect ratio per slide so the stage always hugs the image with no gaps
  const [ratios, setRatios] = useState<Record<string, number>>({});
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
      const vertical = container.scrollHeight > container.clientHeight + 2 && container.scrollWidth <= container.clientWidth + 2;
      const c = container.getBoundingClientRect();
      const th = activeThumb.getBoundingClientRect();
      if (vertical) {
        const top = th.top - c.top + container.scrollTop - container.clientHeight / 2 + activeThumb.clientHeight / 2;
        container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      } else {
        const left = th.left - c.left + container.scrollLeft - container.clientWidth / 2 + activeThumb.clientWidth / 2;
        container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
      }
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
    <div className="group/studio mx-auto max-w-6xl">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_200px] lg:items-stretch">
        {/* ─── 1. MAIN STAGE ─── */}
        <div
          className="relative w-full cursor-pointer select-none overflow-hidden rounded-[18px] bg-[#e9e6da] ring-1 ring-[#dadcd1] shadow-[0_18px_40px_-20px_rgba(60,50,20,0.35)] sm:rounded-[22px]"
          style={{ aspectRatio: String(ratios[currentSlide.src] ?? 4 / 3) }}
          onClick={() => setLightboxOpen(true)}
          role="region"
          aria-label="Project images"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {/* Soft blurred copy fills any space the screenshot doesn't cover */}
              <Image
                src={currentSlide.src}
                alt=""
                aria-hidden
                fill
                unoptimized
                sizes="200px"
                className="scale-125 object-cover opacity-70 blur-2xl"
              />
              <Image
                src={currentSlide.src}
                alt={currentSlide.alt || `Project mockup ${index + 1}`}
                fill
                unoptimized
                priority={index === 0}
                sizes="(min-width: 1280px) 980px, 100vw"
                draggable={false}
                onLoad={(e) => {
                  const img = e.currentTarget;
                  if (!img.naturalWidth || !img.naturalHeight) return;
                  const ratio = Math.min(2, Math.max(1, img.naturalWidth / img.naturalHeight));
                  setRatios((r) => (r[currentSlide.src] === ratio ? r : { ...r, [currentSlide.src]: ratio }));
                }}
                className={contain ? "object-contain p-3 sm:p-6" : "object-contain"}
              />
            </motion.div>
          </AnimatePresence>

          {/* Counter + expand */}
          <div className="pointer-events-none absolute left-3 right-3 top-3 z-10 flex items-center justify-between sm:left-4 sm:right-4 sm:top-4">
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#161616]/85 px-3.5 py-1.5 text-xs font-semibold text-[#f5c451] ring-1 ring-[#f5c451]/35 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#f5c451] shadow-[0_0_8px_#f5c451]" />
              <span>
                {index + 1} / {count}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(true);
              }}
              aria-label="Expand image to fullscreen"
              className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-[#161616]/85 text-[#f5c451] ring-1 ring-[#f5c451]/35 backdrop-blur-md transition-all hover:scale-105 hover:bg-[#f5c451] hover:text-[#0f0f0f]"
              title="View full screen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Arrows */}
          {count > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#161616]/85 text-[#f5c451] opacity-90 ring-1 ring-[#f5c451]/40 backdrop-blur-md transition-all hover:scale-110 hover:bg-[#f5c451] hover:text-[#0f0f0f] focus:outline-none focus-visible:opacity-100 sm:left-4 sm:h-11 sm:w-11 lg:opacity-0 lg:group-hover/studio:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#161616]/85 text-[#f5c451] opacity-90 ring-1 ring-[#f5c451]/40 backdrop-blur-md transition-all hover:scale-110 hover:bg-[#f5c451] hover:text-[#0f0f0f] focus:outline-none focus-visible:opacity-100 sm:right-4 sm:h-11 sm:w-11 lg:opacity-0 lg:group-hover/studio:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {currentSlide.caption && (
            <div className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-[85%] sm:bottom-4 sm:left-4">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#161616]/85 px-3.5 py-1.5 text-xs font-medium text-white ring-1 ring-[#f5c451]/30 backdrop-blur-md">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5c451]" />
                <span className="truncate">{currentSlide.caption}</span>
              </div>
            </div>
          )}
        </div>

        {/* ─── 2. THUMBNAILS: side rail on desktop, row below on mobile ─── */}
        {count > 1 && (
          <div className="flex min-h-0 flex-col gap-2 lg:relative">
            <div className="flex items-center justify-between gap-2 px-0.5 lg:hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a5807]">
                All screens ({count})
              </span>
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  isAutoplay
                    ? "bg-[#9a722a] text-white"
                    : "bg-[#9a722a]/10 text-[#7a5807] ring-1 ring-[#9a722a]/30"
                }`}
              >
                {isAutoplay ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                {isAutoplay ? "Playing" : "Auto-play"}
              </button>
            </div>

            <div className="hidden items-center justify-between gap-2 px-0.5 lg:flex">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a5807]">
                Screens ({count})
              </span>
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                aria-label={isAutoplay ? "Pause slideshow" : "Play slideshow automatically"}
                title={isAutoplay ? "Pause slideshow" : "Play slideshow automatically"}
                className={`grid h-7 w-7 place-items-center rounded-full transition-all ${
                  isAutoplay
                    ? "bg-[#9a722a] text-white"
                    : "bg-[#9a722a]/10 text-[#7a5807] ring-1 ring-[#9a722a]/30 hover:bg-[#9a722a]/20"
                }`}
              >
                {isAutoplay ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              </button>
            </div>

            <div className="lg:relative lg:min-h-0 lg:flex-1">
              <div
                ref={filmstripRef}
                className="flex items-stretch gap-2.5 overflow-x-auto pb-1 [scrollbar-width:thin] lg:absolute lg:inset-0 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 lg:pr-1"
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
                      className={`group/thumb w-28 shrink-0 rounded-xl p-1.5 text-left transition-all duration-300 sm:w-36 lg:w-full ${
                        isActive
                          ? "border-2 border-[#f5c451] bg-white shadow-[0_6px_18px_-4px_rgba(245,196,81,0.5)]"
                          : "border border-[#dadcd1] bg-[#fbfaf6] opacity-85 hover:border-[#CC9A1A]/50 hover:bg-white hover:opacity-100"
                      }`}
                    >
                      <div className="relative mb-1.5 aspect-[4/3] overflow-hidden rounded-lg bg-[#e9e6da]">
                        <Image
                          src={slide.src}
                          alt={slide.alt || `Thumbnail ${i + 1}`}
                          fill
                          unoptimized
                          sizes="180px"
                          className="object-contain"
                        />
                        <span
                          className={`absolute left-1 top-1 rounded px-1.5 py-0.5 text-[12px] font-bold tabular-nums ${
                            isActive
                              ? "bg-[#f5c451] text-[#0f0f0f]"
                              : "bg-[#161616]/85 text-[#f5c451] ring-1 ring-[#f5c451]/25"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p
                        className={`truncate px-0.5 text-xs ${
                          isActive
                            ? "font-bold text-[#7a5807]"
                            : "font-medium text-[#444444] group-hover/thumb:text-[#7a5807]"
                        }`}
                      >
                        {label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

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
