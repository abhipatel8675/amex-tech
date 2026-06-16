import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Website Development", href: "/services#web-development" },
  { label: "Web Application Development", href: "/services#web-app-development" },
  { label: "Mobile App Development", href: "/services#mobile-app-development" },
  { label: "SaaS Development", href: "/services#saas-development" },
  { label: "DevOps & Cloud", href: "/services#devops-deployment" },
  { label: "UI/UX Design", href: "/services#ui-ux-design" },
];

export default function Footer() {
  return (
    <>
      <footer
        className="relative border-t border-white/[0.06] overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0B0F19 0%, #080C14 100%)" }}
      >
        {/* Subtle top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] opacity-25"
          style={{ background: "linear-gradient(90deg, transparent, #6366F1, transparent)" }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-10">
          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-1 mb-5 group">
                <span
                  className="font-bold text-xl tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #818CF8, #A78BFA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Amex
                </span>
                <span className="text-white font-semibold text-xl tracking-tight">Technology</span>
              </Link>
              <p className="text-sm leading-7 mb-4 max-w-[220px]" style={{ color: "rgba(148,163,184,0.7)" }}>
                Trusted by 100+ founders and CTOs since 2019. We turn ideas into production-ready software — on time, on budget, built to last.
              </p>
              <p className="text-xs" style={{ color: "rgba(100,116,139,0.7)" }}>
                Based in India · Serving clients globally
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="text-xs font-semibold text-white uppercase tracking-widest mb-6"
                style={{ letterSpacing: "0.12em" }}
              >
                Company
              </h4>
              <ul className="space-y-3.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "rgba(148,163,184,0.65)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4
                className="text-xs font-semibold text-white uppercase tracking-widest mb-6"
                style={{ letterSpacing: "0.12em" }}
              >
                Services
              </h4>
              <ul className="space-y-3.5">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "rgba(148,163,184,0.65)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="text-xs font-semibold text-white uppercase tracking-widest mb-6"
                style={{ letterSpacing: "0.12em" }}
              >
                Contact
              </h4>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "rgba(100,116,139,0.7)", letterSpacing: "0.12em" }}>
                    Email
                  </p>
                  <a
                    href="mailto:contact@amextechnology.com"
                    className="text-sm flex items-center gap-1.5 transition-colors group"
                    style={{ color: "rgba(148,163,184,0.65)" }}
                  >
                    contact@amextechnology.com
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "rgba(100,116,139,0.7)", letterSpacing: "0.12em" }}>
                    Availability
                  </p>
                  <p className="text-sm" style={{ color: "rgba(148,163,184,0.65)" }}>
                    Mon – Sat, 9am – 8pm IST
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
              >
                Start a project
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: "rgba(100,116,139,0.6)" }}>
              © {new Date().getFullYear()} Amex Technology. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs transition-colors"
                style={{ color: "rgba(100,116,139,0.6)" }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs transition-colors"
                style={{ color: "rgba(100,116,139,0.6)" }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
