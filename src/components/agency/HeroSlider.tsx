"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import s from "./agency.module.css";

type Slide = { src: string; alt: string };

export default function HeroSlider({
  slides,
  interval = 4000,
}: {
  slides: Slide[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      interval,
    );
    return () => clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div className={s.art}>
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`${s.slide} ${i === active ? s.slideActive : ""}`}
          aria-hidden={i !== active}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 800px) 100vw, 45vw"
            preload={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
