"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import s from "./navbar.module.css";
const links = [
  ["Services", "/services"],
  ["Hire Developers", "/hire-developers"],
  ["Our Work", "/portfolio"],
  ["About", "/about"],
  ["Blog", "/blog"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const focusables = [
          toggle.current,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
          ),
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
    }
    function onResize() {
      if (window.innerWidth > 1160) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  const active = (href: string) =>
    pathname === href ||
    (pathname.startsWith(href + "/") &&
      !links.some(([, other]) => other !== href && other.startsWith(href + "/") && pathname.startsWith(other)));
  return (
    <>
      <a href="#main-content" className={s.skip}>
        Skip to content
      </a>
      <header className={s.header}>
        <nav className={s.nav} aria-label="Main navigation">
          <Link
            className={s.logo}
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Amex Technology home"
          >
            <LogoMark size={36} />
            <span className={s.wordmark}>
              Amex Technology<small>Ideas into impact</small>
            </span>
          </Link>
          <div className={s.links}>
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={active(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </div>
          <Link className={s.cta} href="/contact">
            Let&apos;s talk <ArrowUpRight size={15} />
          </Link>
          <button
            ref={toggle}
            className={s.toggle}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {open && (
          <div
            className={s.mobile}
            ref={panel}
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {[
              ["Home", "/"],
              ...links,
              ["Free App Check", "/tools/app-checker"],
              ["Free Website Grader", "/tools/website-grader"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={active(href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              className={s.cta}
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Tell us about your project <ArrowUpRight size={17} />
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
