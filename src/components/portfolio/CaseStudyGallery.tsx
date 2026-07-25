"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/data/projects";
import BrowserMockup from "@/components/ui/BrowserMockup";
import PhoneMockup from "@/components/ui/PhoneMockup";

interface Props {
  gallery: GalleryImage[];
  isMobile: boolean;
  accentColor: string;
  liveUrl?: string;
  projectTitle: string;
}

export default function CaseStudyGallery({ gallery, isMobile, accentColor, liveUrl, projectTitle }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(
    () => setLightboxIdx((i) => (i !== null ? Math.max(0, i - 1) : null)),
    []
  );
  const next = useCallback(
    () => setLightboxIdx((i) => (i !== null ? Math.min(gallery.length - 1, i + 1) : null)),
    [gallery.length]
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, close, prev, next]);

  if (!gallery.length) return null;

  // Tier 1: first 1 item as large feature
  const featureItem = gallery[0];
  // Tier 2: items 1-2 as side-by-side
  const sideBySide = gallery.slice(1, 3);
  // Tier 4: remaining items as masonry
  const supporting = gallery.slice(3);

  const hasBeforeAfter =
    sideBySide.length === 2 &&
    (sideBySide[0].alt.toLowerCase().includes("before") ||
      sideBySide[1].alt.toLowerCase().includes("after"));

  return (
    <div className="space-y-12">
      {/* Section heading */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <p
          className="shrink-0 font-semibold uppercase"
          style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(100,116,139,0.8)" }}
        >
          Product Gallery
        </p>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>

      {/* Tier 1: Feature showcase */}
      <div className="space-y-4">
        {isMobile ? (
          <div className="flex justify-center gap-6 sm:gap-8">
            <div className="shrink-0">
              <PhoneMockup src={featureItem.src} alt={featureItem.alt} tiltDeg={-5} />
            </div>
            {sideBySide[0] && (
              <div className="shrink-0">
                <PhoneMockup src={sideBySide[0].src} alt={sideBySide[0].alt} tiltDeg={5} />
              </div>
            )}
          </div>
        ) : (
          <BrowserMockup
            src={featureItem.src}
            alt={featureItem.alt}
            url={liveUrl?.replace("https://", "") ?? "project.app"}
            aspectRatio={featureItem.span === "wide" ? "21/9" : "16/9"}
          />
        )}
        <p className="text-sm text-center italic" style={{ color: "rgba(148,163,184,0.65)" }}>
          {featureItem.caption}
        </p>
      </div>

      {/* Tier 2: Side-by-side (skip for mobile, already handled above) */}
      {!isMobile && sideBySide.length === 2 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 relative">
            {hasBeforeAfter && (
              <div className="absolute -top-6 inset-x-0 flex justify-between px-2 pointer-events-none">
                <span
                  className="text-xs font-semibold uppercase"
                  style={{ letterSpacing: "0.12em", color: "rgba(100,116,139,0.7)" }}
                >
                  Before
                </span>
                <span
                  className="text-xs font-semibold uppercase"
                  style={{ letterSpacing: "0.12em", color: accentColor, opacity: 0.8 }}
                >
                  After
                </span>
              </div>
            )}
            {sideBySide.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIdx(i + 1)}
                className="group relative rounded-xl overflow-hidden border border-white/[0.07] cursor-zoom-in focus:outline-none"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  className="transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </button>
            ))}
            {hasBeforeAfter && (
              <div
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px"
                style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)" }}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {sideBySide.map((img, i) => (
              <p key={i} className="text-xs italic text-center" style={{ color: "rgba(148,163,184,0.55)" }}>
                {img.caption}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Tier 3: Metrics strip — inline from the supporting images data */}
      {supporting.length > 0 && (
        <div
          className="rounded-2xl p-6 border border-white/[0.06]"
          style={{ background: "rgba(10,14,26,0.8)" }}
        >
          <p
            className="text-center mb-6 font-semibold uppercase"
            style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(100,116,139,0.7)" }}
          >
            Key Outcomes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {supporting.slice(0, 4).map((img, i) => {
              const parts = img.caption.split(/[—–\-]/);
              const headline = parts[0]?.trim() ?? img.caption;
              const sub = parts[1]?.trim();
              return (
                <div key={i} className="text-center">
                  <p className="text-xs text-slate-500 leading-relaxed">{headline}</p>
                  {sub && <p className="text-xs mt-1" style={{ color: accentColor, opacity: 0.7 }}>{sub}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tier 4: Supporting gallery (masonry) */}
      {supporting.length > 0 && (
        <div className={`grid gap-4 ${isMobile ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {supporting.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxIdx(i + (isMobile ? 1 : 3))}
              className="group relative rounded-xl overflow-hidden border border-white/[0.07] text-left cursor-zoom-in focus:outline-none flex flex-col"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={isMobile ? 390 : 800}
                  height={isMobile ? 844 : 600}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  className="transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-3 border-t border-white/[0.05]">
                <p className="text-xs italic" style={{ color: "rgba(148,163,184,0.55)" }}>
                  {img.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.12]">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={gallery[lightboxIdx].src}
                    alt={gallery[lightboxIdx].alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              {gallery[lightboxIdx].caption && (
                <p className="text-center mt-4 text-sm italic" style={{ color: "rgba(148,163,184,0.65)" }}>
                  {gallery[lightboxIdx].caption}
                </p>
              )}
              {/* Controls */}
              <button
                onClick={close}
                className="absolute top-2 right-2 sm:-top-12 sm:right-0 p-2 rounded-full bg-black/40 sm:bg-transparent text-slate-300 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              {lightboxIdx > 0 && (
                <button
                  onClick={prev}
                  className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-14 p-2 rounded-full bg-black/40 sm:bg-transparent text-slate-300 hover:text-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
                </button>
              )}
              {lightboxIdx < gallery.length - 1 && (
                <button
                  onClick={next}
                  className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-14 p-2 rounded-full bg-black/40 sm:bg-transparent text-slate-300 hover:text-white transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
