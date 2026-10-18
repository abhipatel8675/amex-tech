"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-slate-200" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #B8860B, #9C7208)" }}>
            <Zap className="w-4 h-4 text-slate-900" />
          </div>
          <span>Amex<span className="text-[#7A5807]">Technology</span></span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/contact"
            className="text-sm text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            style={{ background: "linear-gradient(135deg, #B8860B, #9C7208)" }}
          >
            Hire Us
          </a>
        </div>

        <button
          className="md:hidden text-slate-600 hover:text-slate-900"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col gap-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slate-600 hover:text-slate-900"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/contact"
              className="text-sm text-white font-semibold px-4 py-2 rounded-lg text-center"
              style={{ background: "linear-gradient(135deg, #B8860B, #9C7208)" }}
              onClick={() => setOpen(false)}
            >
              Hire Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
