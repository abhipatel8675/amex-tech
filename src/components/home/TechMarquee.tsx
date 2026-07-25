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
      {/* Ambient glow behind the marquee */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 100% at 50% 50%, rgba(212,175,55,0.14) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative max-w-[92rem] mx-auto px-6 mb-7">
        <p
          className="font-semibold uppercase text-center"
          style={{ fontSize: 11, letterSpacing: "0.15em", color: "#E1BC4A" }}
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
              className="group relative shrink-0 whitespace-nowrap rounded-xl border border-white/[0.10] px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-md transition-all duration-300 hover:text-white hover:border-[#E1BC4A]/40 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            >
              {/* Hover glow */}
              <span
                className="absolute -inset-1.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #B89225 100%)",
                  filter: "blur(14px)",
                }}
              />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
