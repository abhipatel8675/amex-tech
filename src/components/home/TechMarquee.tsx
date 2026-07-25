"use client";

import { useEffect, useRef } from "react";
import { animate, type JSAnimation } from "animejs";

const technologies = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "AWS",
  "Supabase",
  "Stripe",
  "Docker",
  "Tailwind CSS",
  "Vercel",
  "PostgreSQL",
  "Figma",
];

const PIXELS_PER_SECOND = 45;

export default function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let anim: JSAnimation | null = null;

    const start = () => {
      anim?.revert();
      const halfWidth = track.scrollWidth / 2;
      anim = animate(track, {
        translateX: [0, -halfWidth],
        duration: (halfWidth / PIXELS_PER_SECOND) * 1000,
        ease: "linear",
        loop: true,
      });
    };

    start();

    const resizeObserver = new ResizeObserver(() => start());
    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
      anim?.revert();
    };
  }, []);

  return (
    <section className="relative py-10 md:py-14 overflow-hidden border-t border-white/[0.06] bg-[#0B0F19]">
      <div className="max-w-[92rem] mx-auto px-6 mb-7">
        <p
          className="font-semibold uppercase text-center"
          style={{ fontSize: 11, letterSpacing: "0.15em", color: "#818CF8" }}
        >
          Our Stack
        </p>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div ref={trackRef} className="flex w-max gap-2.5">
          {[...technologies, ...technologies].map((tech, i) => (
            <span
              key={i}
              className="shrink-0 whitespace-nowrap rounded-lg border border-white/[0.07] bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
