"use client";

import { useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import s from "./home.module.css";

const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -28 }),
};

/** One review at a time: large, readable, with the other clients one click away. */
export default function ReviewsSlider() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const total = testimonials.length;
  const t = testimonials[index];

  function move(next: number, direction: number) {
    setDir(direction);
    setIndex((next + total) % total);
  }

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <div className={s.slider} role="group" aria-roledescription="carousel" aria-label="Client reviews">
          <span className={s.bigQuote} aria-hidden="true">
            &ldquo;
          </span>
          <div className={s.slideFrame} aria-live="polite">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <m.div
                key={t.name}
                className={s.slide}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className={s.slideStars} role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {"★".repeat(t.rating)}
                </p>
                <blockquote className={s.slideQuote}>{t.content}</blockquote>
                <p className={s.slideWho}>
                  <span className={s.avatar} aria-hidden="true">
                    {t.name.charAt(0).toUpperCase()}
                  </span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>Verified {t.platform} client</small>
                  </span>
                </p>
              </m.div>
            </AnimatePresence>
          </div>

          <div className={s.sliderBar}>
            <div className={s.dots}>
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  className={s.dot}
                  aria-label={`Show review ${i + 1} of ${total}, from ${item.name}`}
                  aria-current={i === index}
                  onClick={() => move(i, i > index ? 1 : -1)}
                />
              ))}
            </div>
            <div className={s.arrows}>
              <span className={s.counter}>
                {index + 1} / {total}
              </span>
              <button type="button" className={s.arrowBtn} aria-label="Previous review" onClick={() => move(index - 1, -1)}>
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button type="button" className={s.arrowBtn} aria-label="Next review" onClick={() => move(index + 1, 1)}>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
