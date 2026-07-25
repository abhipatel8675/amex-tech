"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, splitText, stagger } from "animejs";

/**
 * Animated brand reveal: the Amex Technology mark (see LogoMark in Logo.tsx)
 * scales/fades in while the word "Amex" fades/slides in letter by letter,
 * once when scrolled into view. Falls back to a fully-shown static lockup
 * when prefers-reduced-motion is set.
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
  const markRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const markEl = markRef.current;
    const textEl = textRef.current;
    if (!container || !markEl || !textEl) return;

    const splitter = splitText(textEl, { chars: true });
    const chars = splitter.chars as HTMLElement[];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => splitter.revert();
    }

    chars.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(12px)";
    });
    markEl.style.opacity = "0";
    markEl.style.transform = "scale(0.7)";

    let hasRun = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun) {
          hasRun = true;
          animate(markEl, {
            opacity: [0, 1],
            scale: [0.7, 1],
            duration: 500,
            ease: "outBack",
          });
          animate(chars, {
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 500,
            delay: stagger(45, { start: 250 }),
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
      <Image
        ref={markRef}
        src="/images/logo-mark.png"
        alt=""
        width={size}
        height={size}
        style={{ borderRadius: size * 0.25 }}
        aria-hidden="true"
      />
      <span
        ref={textRef}
        className={`font-bold tracking-tight ${textClassName}`}
        style={{ color: "#D4AF37" }}
      >
        Amex
      </span>
    </div>
  );
}
