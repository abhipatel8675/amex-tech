"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; alt: string; caption?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectCarousel({ slides, contain = false }: { slides: Slide[]; contain?: boolean }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const reduceMotion = useReducedMotion();
  const count = slides.length;

  const go = useCallback(
    (step: number) => setState(([i]) => [(i + step + count) % count, step]),
    [count],
  );

  useEffect(() => {
    if (count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, count]);

  const slide = slides[index];
  const offset = reduceMotion ? 0 : 60;

  return (
    <div className="group/carousel">
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-slate-100 ring-1 ring-slate-900/[0.06] shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)]"
        aria-roledescription="carousel"
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -offset }}
            transition={{ duration: 0.6, ease: EASE }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1472px) 1400px, 100vw"
              draggable={false}
              className={contain ? "object-contain p-6 md:p-10" : "object-cover object-top"}
            />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            {(["prev", "next"] as const).map((d) => (
              <button
                key={d}
                onClick={() => go(d === "prev" ? -1 : 1)}
                aria-label={d === "prev" ? "Previous image" : "Next image"}
                className={`absolute top-1/2 -translate-y-1/2 ${d === "prev" ? "left-4" : "right-4"} grid place-items-center w-11 h-11 rounded-full bg-white/85 text-slate-900 shadow-lg ring-1 ring-black/5 backdrop-blur-md transition-all duration-300 hover:bg-white hover:scale-105 md:opacity-0 md:group-hover/carousel:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]`}
              >
                {d === "prev" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            ))}
            <span className="absolute top-4 right-4 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-md tabular-nums">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-6 min-h-6">
        <p className="text-sm text-slate-500 truncate" aria-live="polite">
          {slide.caption}
        </p>
        {count > 1 && (
          <div className="flex shrink-0 items-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-6 bg-slate-900" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
