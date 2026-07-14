"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.4 });

  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only show on desktop, only if no touch input
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as Element;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, label");
      setHovered(!!isInteractive);
    };

    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", hide);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, visible]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: hovered ? 38 : 12,
          height: hovered ? 38 : 12,
          opacity: visible ? 1 : 0,
          backgroundColor: hovered ? "rgba(129,140,248,0)" : "rgba(129,140,248,0.75)",
          borderColor: hovered ? "rgba(165,180,252,0.6)" : "rgba(129,140,248,0)",
          borderWidth: hovered ? 1.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="rounded-full border border-solid"
      />
    </motion.div>
  );
}
