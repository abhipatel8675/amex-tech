"use client";

import { useEffect, useRef } from "react";
import { animate, createDrawable, splitText, stagger } from "animejs";

/**
 * Animated brand reveal: the Amex Technology mark (see LogoMark in Logo.tsx)
 * draws its strokes on while the word "Amex" fades/slides in letter by
 * letter, once when scrolled into view. Falls back to a fully-shown static
 * lockup when prefers-reduced-motion is set.
 */
export function AnimatedLogoDraw({
  size = 40,
  textClassName = "text-2xl",
  className = "",
}: {
  size?: number;
  textClassName?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    const textEl = textRef.current;
    if (!container || !svgEl || !textEl) return;

    const splitter = splitText(textEl, { chars: true });
    const chars = splitter.chars as HTMLElement[];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => splitter.revert();
    }

    chars.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(12px)";
    });

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
            duration: 800,
            delay: (_, i) => (i ?? 0) * 150,
          });
          animate(chars, {
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 500,
            delay: stagger(45, { start: 350 }),
            ease: "outQuad",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      splitter.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className={`inline-flex items-center gap-3 ${className}`}>
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
      <span
        ref={textRef}
        className={`font-bold tracking-tight ${textClassName}`}
        style={{ color: "#A78BFA" }}
      >
        Amex
      </span>
    </div>
  );
}
