"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/data/services";
import s from "./home.module.css";

/** Pick a service on the left, read what it means for you on the right. Tabs on desktop, a scrolling row on phones. */
export default function ServicesExplorer() {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = services[index];

  function select(next: number) {
    const i = (next + services.length) % services.length;
    setIndex(i);
    tabs.current[i]?.focus();
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      select(index + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      select(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(services.length - 1);
    }
  }

  return (
    <div className={s.explorer}>
      <div className={s.tabs} role="tablist" aria-label="Our services" onKeyDown={onKeyDown}>
        {services.map((service, i) => (
          <button
            key={service.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`service-tab-${i}`}
            aria-selected={i === index}
            aria-controls="service-panel"
            tabIndex={i === index ? 0 : -1}
            className={s.tab}
            onClick={() => setIndex(i)}
          >
            {service.title}
          </button>
        ))}
      </div>

      <div
        key={active.slug}
        className={s.panel}
        role="tabpanel"
        id="service-panel"
        aria-labelledby={`service-tab-${index}`}
      >
        <h3 className={s.panelTitle}>{active.title}</h3>
        <p className={s.panelText}>{active.description}</p>
        <ul className={s.panelList}>
          {active.benefits.map((b) => (
            <li key={b}>
              <Check size={18} aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <Link href={`/services/${active.slug}`} className={s.primary}>
          More about this service <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
