"use client";

import { useEffect, useRef } from "react";
import { animate, createDrawable } from "animejs";

/**
 * Animated line-drawing of the Amex Technology brand mark (see LogoMark in
 * Logo.tsx). Draws its strokes on once when scrolled into view, then holds.
 * Falls back to a fully-drawn static mark when prefers-reduced-motion is set.
 */
export function AnimatedLogoDraw({
  size = 96,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const paths = svgEl.querySelectorAll<SVGPathElement>(".draw-path");
    const drawables = createDrawable(paths);

    let hasRun = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun) {
          hasRun = true;
          animate(drawables, {
            draw: ["0 0", "0 1"],
            ease: "inOutQuad",
            duration: 900,
            delay: (_, i) => (i ?? 0) * 150,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="amex-draw-grad"
            x1="0"
            y1="0"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#818CF8" />
            <stop offset="1" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="7"
          stroke="url(#amex-draw-grad)"
          strokeWidth="1.5"
          className="draw-path"
        />
        <path
          d="M9 24 L16 8 L23 24"
          stroke="url(#amex-draw-grad)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="draw-path"
        />
        <path
          d="M12 19 H20"
          stroke="url(#amex-draw-grad)"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="draw-path"
        />
      </svg>
    </div>
  );
}
