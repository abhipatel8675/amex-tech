"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import SocialLinks from "@/components/site/SocialLinks";
import { primaryLinks, secondaryLinks, headerLinks } from "@/components/site/nav-data";
import { COMPANY_ADDRESS_LINE, OFFICE_PHONE, US_PHONE } from "@/data/company";
import s from "./navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // The menu grows from, and shrinks back into, the Menu button as a circle.
  function setOrigin() {
    const b = toggle.current?.getBoundingClientRect();
    const el = panel.current;
    if (!b || !el) return;
    const x = b.left + b.width / 2;
    const y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    el.style.setProperty("--ox", `${x}px`);
    el.style.setProperty("--oy", `${y}px`);
    el.style.setProperty("--or", `${Math.ceil(r)}px`);
  }

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("amex:scroll-lock", { detail: true }));
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOrigin();
        setOpen(false);
        toggle.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = [
        toggle.current,
        ...Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
      ].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.dispatchEvent(new CustomEvent("amex:scroll-lock", { detail: false }));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const close = () => {
    setOrigin();
    setOpen(false);
  };

  return (
    <>
      <a href="#main-content" className={s.skip}>
        Skip to content
      </a>
      <header className={s.header} data-open={open}>
        <nav className={s.bar} aria-label="Main navigation">
          <Link className={s.brand} href="/" onClick={close} aria-label="Amex Technology home">
            <LogoMark size={40} />
            <span className={s.wordmark}>Amex Technology</span>
          </Link>

          <div className={s.links}>
            {headerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={s.link}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link className={s.cta} href="/contact" onClick={close}>
            Start a project <ArrowUpRight size={16} aria-hidden="true" />
          </Link>

          <button
            ref={toggle}
            type="button"
            className={s.toggle}
            aria-controls="site-menu"
            aria-expanded={open}
            onClick={() => {
              setOrigin();
              setOpen((v) => !v);
            }}
          >
            <span className={s.toggleLabel}>{open ? "Close" : "Menu"}</span>
            <span className={s.bars} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </nav>
      </header>

      <div
        id="site-menu"
        className={s.menu}
        data-open={open}
        ref={panel}
        role="dialog"
        data-lenis-prevent
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
      >
        <span className={s.glow} aria-hidden="true" />
        <svg className={s.motif} viewBox="0 0 512 512" aria-hidden="true">
          <path
            d="M152 392 L256 140 L360 392"
            fill="none"
            stroke="currentColor"
            strokeWidth="64"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className={s.menuInner}>
          <ul className={s.primary}>
            {primaryLinks.map((l, i) => (
              <li key={l.href} style={{ ["--i" as string]: i }}>
                <Link
                  href={l.href}
                  onClick={close}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  <span className={s.mask}>
                    <span className={s.line}>
                      {l.label}
                      <ArrowUpRight className={s.arrow} aria-hidden="true" />
                    </span>
                  </span>
                  <span className={s.hint}>{l.hint}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={s.aside} style={{ ["--i" as string]: 5 }}>
            <p className={s.asideTitle}>More from us</p>
            <ul className={s.secondary}>
              {secondaryLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={close}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className={s.asideTitle}>Talk to us</p>
            <address className={s.contact}>
              <a href="mailto:abhi@amextech.org">abhi@amextech.org</a>
              <a href={`tel:${OFFICE_PHONE.tel}`}>{OFFICE_PHONE.display}</a>
              <a href={`tel:${US_PHONE.tel}`}>{US_PHONE.display}</a>
              <span>{COMPANY_ADDRESS_LINE}</span>
            </address>
            <SocialLinks />
          </div>
        </div>
      </div>
    </>
  );
}
