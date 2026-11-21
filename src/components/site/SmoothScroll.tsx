"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

/**
 * Gentle inertial scrolling for mouse wheels. It loads only after the page is idle (so it never delays first paint),
 * stays off for touch devices (which already have native momentum), for reduced-motion users and for the
 * dashboard/admin screens, and pauses while the full-screen menu is open.
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);

  // Create once, lazily.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || touch) return;

    let cancelled = false;
    let raf = 0;
    let onLock: ((e: Event) => void) | null = null;

    const start = async () => {
      const { default: LenisClass } = await import("lenis");
      if (cancelled) return;
      const instance = new LenisClass({ lerp: 0.12, anchors: true });
      lenis.current = instance;
      onLock = (e: Event) => {
        if ((e as CustomEvent<boolean>).detail) instance.stop();
        else instance.start();
      };
      window.addEventListener("amex:scroll-lock", onLock);
      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    const idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => void start(), { timeout: 1500 })
        : window.setTimeout(() => void start(), 800);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId as number);
      else window.clearTimeout(idleId as number);
      cancelAnimationFrame(raf);
      if (onLock) window.removeEventListener("amex:scroll-lock", onLock);
      lenis.current?.destroy();
      lenis.current = null;
    };
  }, []);

  // New page: start at the top; keep app screens on native scrolling.
  useEffect(() => {
    const instance = lenis.current;
    if (!instance) return;
    instance.scrollTo(0, { immediate: true });
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) instance.stop();
    else instance.start();
  }, [pathname]);

  return null;
}
