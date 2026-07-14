"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const ANNOUNCEMENT_KEY = "amex-announcement-closed-q3-2026";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage after mount (avoids SSR mismatch)
    const closed = localStorage.getItem(ANNOUNCEMENT_KEY);
    if (!closed) setAnnouncementVisible(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  function closeAnnouncement() {
    setAnnouncementVisible(false);
    localStorage.setItem(ANNOUNCEMENT_KEY, "1");
  }

  return (
    <>
      {/* Announcement bar — desktop only */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 32, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="hidden md:flex fixed top-0 left-0 right-0 z-[60] items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg, #0B0F19 0%, #10142a 40%, #11163000 50%, #10142a 60%, #0B0F19 100%)",
              borderBottom: "1px solid rgba(99,102,241,0.15)",
            }}
            role="banner"
            aria-label="Announcement"
          >
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>🚀 Now accepting projects for Q3 2026 —</span>
              <Link
                href="/contact"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors underline-offset-2 hover:underline"
              >
                Get started →
              </Link>
            </p>
            <button
              onClick={closeAnnouncement}
              aria-label="Dismiss announcement"
              className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors text-base leading-none"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          announcementVisible ? "top-8" : "top-0"
        } ${
          scrolled
            ? "bg-[#0B0F19]/85 backdrop-blur-2xl border-b border-indigo-500/20"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-[92rem] mx-auto px-6 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 flex-shrink-0 group">
            <span
              className="font-bold text-lg tracking-tight"
              style={{
                background: "linear-gradient(135deg, #818CF8, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Amex
            </span>
            <span className="text-[#E2E8F0] font-semibold text-lg tracking-tight">Technology</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {/* Hover dot indicator */}
                  {!isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors px-3 py-2"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-2 rounded-xl transition-all duration-200 btn-glow"
              style={{
                background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
              }}
            >
              Get Free Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-label="Navigation menu"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 border-l border-white/[0.06] md:hidden flex flex-col"
              style={{
                background: "linear-gradient(160deg, #0f1225 0%, #0B0F19 100%)",
              }}
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.06]">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-1">
                  <span className="font-bold text-lg" style={{ background: "linear-gradient(135deg, #818CF8, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Amex</span>
                  <span className="text-white font-semibold text-lg">technology</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2 text-slate-400 hover:text-white transition-colors" aria-label="Close navigation menu">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile links */}
              <div className="flex flex-col gap-1 p-4 flex-1">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === "/" ? "text-white bg-white/[0.07]" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"}`}
                >
                  Home
                </Link>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? "text-white bg-white/[0.07]" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === "/contact" ? "text-white bg-white/[0.07]" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"}`}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile CTA */}
              <div className="p-4 border-t border-white/[0.06]">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-white py-3 rounded-xl transition-all btn-glow"
                  style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
                >
                  Get Free Quote <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
