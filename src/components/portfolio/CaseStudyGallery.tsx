"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/data/projects";
import BrowserMockup from "@/components/ui/BrowserMockup";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { isDeviceMockup } from "@/lib/portfolioImages";

interface Props {
  gallery: GalleryImage[];
  isMobile: boolean;
  accentColor: string;
  liveUrl?: string;
  projectTitle: string;
}

function Shot({
  img,
  width,
  height,
  sizes,
  onOpen,
}: {
  img: GalleryImage;
  width: number;
  height: number;
  sizes?: string;
  onOpen: () => void;
}) {
  return (
    <figure>
      <button
        onClick={onOpen}
        className="group block w-full overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={width}
          height={height}
          sizes={sizes}
          style={{ width: "100%", height: "auto", display: "block" }}
          className="transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </button>
      {img.caption && <figcaption className="mt-3 text-sm leading-relaxed text-slate-500">{img.caption}</figcaption>}
    </figure>
  );
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

  const featureItem = gallery[0];
  const sideBySide = gallery.slice(1, 3);

  const hasBeforeAfter =
    sideBySide.length === 2 &&
    (sideBySide[0].alt.toLowerCase().includes("before") ||
      sideBySide[1].alt.toLowerCase().includes("after"));

  return (
    <div className="space-y-12">
      {/* Section heading */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-100" />
        <p
          className="shrink-0 font-semibold uppercase"
          style={{ fontSize: 11, letterSpacing: "0.15em", color: "#64748B" }}
        >
          Product Gallery
        </p>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      {isMobile ? (
        <>
          {/* Phone screenshots: two tilted phones, then a grid of the rest */}
          <div className="flex justify-center gap-6 sm:gap-8">
            <div className="shrink-0">
              <PhoneMockup src={featureItem.src} alt={featureItem.alt} tiltDeg={-5} />
            </div>
            {gallery[1] && (
              <div className="shrink-0">
                <PhoneMockup src={gallery[1].src} alt={gallery[1].alt} tiltDeg={5} />
              </div>
            )}
          </div>
          {gallery.length > 2 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1100px] mx-auto">
              {gallery.slice(2).map((img, i) => (
                <Shot key={img.src} img={img} width={390} height={844} onOpen={() => setLightboxIdx(i + 2)} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="max-w-[1100px] mx-auto space-y-10">
          {/* Lead image, full width */}
          {isDeviceMockup(featureItem.src) ? (
            <Shot img={featureItem} width={1600} height={1200} sizes="(min-width: 1280px) 1100px, 100vw" onOpen={() => setLightboxIdx(0)} />
          ) : (
            <figure>
              <BrowserMockup
                src={featureItem.src}
                alt={featureItem.alt}
                url={liveUrl?.replace("https://", "") ?? "project.app"}
                aspectRatio={featureItem.span === "wide" ? "21/9" : "16/9"}
              />
              {featureItem.caption && <figcaption className="mt-3 text-sm text-slate-500 text-center">{featureItem.caption}</figcaption>}
            </figure>
          )}

          {/* Everything else in an even two-column grid */}
          {gallery.length > 1 && (
            <div className="relative grid sm:grid-cols-2 gap-x-6 gap-y-10">
              {hasBeforeAfter && (
                <div className="absolute -top-6 inset-x-0 flex justify-between px-2 pointer-events-none">
                  <span className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.12em", color: "#64748B" }}>
                    Before
                  </span>
                  <span className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.12em", color: accentColor, opacity: 0.8 }}>
                    After
                  </span>
                </div>
              )}
              {gallery.slice(1).map((img, i) => (
                <Shot key={img.src} img={img} width={800} height={600} sizes="(min-width: 1280px) 540px, (min-width: 640px) 50vw, 100vw" onOpen={() => setLightboxIdx(i + 1)} />
              ))}
            </div>
          )}
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
