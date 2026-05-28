import Link from "next/link";
import { Code2, X, Briefcase, Mail, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Web Development", href: "/services#web-development" },
  { label: "Mobile Apps", href: "/services#mobile-app-development" },
  { label: "SaaS Development", href: "/services#saas-development" },
  { label: "API Development", href: "/services#api-development" },
  { label: "DevOps & Cloud", href: "/services#devops-deployment" },
  { label: "UI/UX Design", href: "/services#ui-ux-design" },
];

const socialLinks = [
  { icon: Code2, href: "#", label: "GitHub" },
  { icon: X, href: "#", label: "Twitter/X" },
  { icon: Briefcase, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@amextechnology.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t border-white/[0.06] overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0B0F19 0%, #080C14 100%)" }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, #6366F1, transparent)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4 group">
              <span
                className="font-bold text-lg tracking-tight"
                style={{ background: "linear-gradient(135deg, #818CF8, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                amex
              </span>
              <span className="text-white font-semibold text-lg tracking-tight">technology</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-[200px]">
              Premium software development agency. We build products that scale.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-slate-300 hover:border-white/[0.14] hover:bg-white/[0.07] transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <p className="text-xs text-slate-600 mb-1">Email</p>
                <a
                  href="mailto:contact@amextechnology.com"
                  className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                  contact@amextechnology.com
                </a>
              </li>
              <li>
                <p className="text-xs text-slate-600 mb-1">Response Time</p>
                <p className="text-sm text-slate-500">Within 24 hours</p>
              </li>
              <li>
                <p className="text-xs text-slate-600 mb-1">Availability</p>
                <p className="text-sm text-slate-500">Mon – Sat, 9am – 8pm IST</p>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors group"
            >
              Start a project
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Amex Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
