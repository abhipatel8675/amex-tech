"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ClientReview } from "@/data/reviews";
import s from "./agency.module.css";

const AUTOPLAY_MS = 8000;

export default function HomeReviews({ reviews }: { reviews: ClientReview[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = reviews.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count, next, index]);

  return (
    <section className={s.quote} aria-roledescription="carousel" aria-label="Client reviews">
      <div className={`${s.wrap} ${s.quoteGrid}`}>
        <div>
          <p className={s.eyebrow}>Client reviews</p>
          <h2 className="text-2xl tracking-tight">
            What clients say
            <br />
            after the project.
          </h2>
          <p className={s.stars} aria-label="5 out of 5 stars">
            ★★★★★
          </p>
        </div>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") prev();
            else if (e.key === "ArrowRight") next();
          }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
          }}
        >
          <div className={s.reviewTrack}>
            {reviews.map((review, i) => (
              <figure
                key={review.name}
                className={`${s.reviewSlide} ${i === index ? s.reviewActive : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
              >
                <blockquote>&ldquo;{review.content}&rdquo;</blockquote>
                <cite>
                  {review.name}
                  {review.site && (
                    <>
                      {" "}
                      <span aria-hidden="true">—</span>{" "}
                      <a
                        href={review.site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={i === index ? 0 : -1}
                      >
                        {review.site.label}
                      </a>
                    </>
                  )}
                </cite>
              </figure>
            ))}
          </div>
          {count > 1 && (
            <div className={s.reviewControls}>
              <button type="button" onClick={prev} aria-label="Previous review" className={s.reviewArrow}>
                <ChevronLeft size={18} />
              </button>
              <div className={s.reviewDots} role="tablist" aria-label="Choose a review">
                {reviews.map((review, i) => (
                  <button
                    key={review.name}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Review from ${review.name}`}
                    onClick={() => setIndex(i)}
                    className={`${s.reviewDot} ${i === index ? s.reviewDotActive : ""}`}
                  />
                ))}
              </div>
              <button type="button" onClick={next} aria-label="Next review" className={s.reviewArrow}>
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
