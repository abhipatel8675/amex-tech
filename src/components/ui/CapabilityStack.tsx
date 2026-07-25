"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Code2, Cloud, Sparkles, type LucideIcon } from "lucide-react";

const capabilities: { label: string; accent: string; Icon: LucideIcon }[] = [
  { label: "Full-Stack Development", accent: "#E1BC4A", Icon: Code2 },
  { label: "Cloud & DevOps", accent: "#38BDF8", Icon: Cloud },
  { label: "AI-Powered Features", accent: "#D4AF37", Icon: Sparkles },
];

/**
 * Stacked capability cards, staggered in on scroll (fade + rise). Mirrors the
 * "layered gradient card" pattern used for product visuals elsewhere, so the
 * Hero panel shows real substance instead of an empty box.
 */
export function CapabilityStack({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(".capability-card");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    cards.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(16px)";
    });

    let hasRun = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun) {
          hasRun = true;
          animate(cards, {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 550,
            delay: stagger(120),
            ease: "outQuad",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-col gap-3 w-full ${className}`}>
      {capabilities.map(({ label, accent, Icon }, i) => (
        <div
          key={label}
          className="capability-card flex items-center gap-3 rounded-xl border px-5 py-4 backdrop-blur-md"
          style={{
            borderColor: `${accent}33`,
            background: `linear-gradient(135deg, ${accent}1a 0%, rgba(255,255,255,0.03) 70%)`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 20px -12px ${accent}40`,
            marginLeft: i === 1 ? "1.5rem" : i === 2 ? "0.75rem" : "0",
          }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-sm"
            style={{
              background: `${accent}26`,
              border: `1px solid ${accent}4d`,
              boxShadow: `0 0 16px -2px ${accent}80`,
            }}
          >
            <Icon size={18} style={{ color: accent }} />
          </div>
          <span className="text-sm font-semibold text-white">{label}</span>
        </div>
      ))}
    </div>
  );
}
