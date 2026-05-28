import Link from "next/link";
import { Code2, X, Briefcase, Mail } from "lucide-react";

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
  { label: "DevOps & Deployment", href: "/services#devops-deployment" },
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
    <footer className="border-t border-[#1a1a1a] bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <span className="text-[#00dc82] font-bold text-lg tracking-tight">amex</span>
              <span className="text-white font-semibold text-lg tracking-tight">technology</span>
            </Link>
            <p className="text-sm text-[#555] leading-relaxed mb-6">
              We build scalable digital products for startups and enterprises. Clean code, modern
              tech, on-time delivery.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-[#555] hover:text-white hover:border-[#333] transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#555] hover:text-[#888] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#555] hover:text-[#888] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li>
                <p className="text-xs text-[#444] uppercase tracking-wider mb-1">Email</p>
                <a
                  href="mailto:contact@amextechnology.com"
                  className="text-sm text-[#555] hover:text-[#888] transition-colors"
                >
                  contact@amextechnology.com
                </a>
              </li>
              <li>
                <p className="text-xs text-[#444] uppercase tracking-wider mb-1">Response Time</p>
                <p className="text-sm text-[#555]">Within 24 hours</p>
              </li>
              <li>
                <p className="text-xs text-[#444] uppercase tracking-wider mb-1">Availability</p>
                <p className="text-sm text-[#555]">Mon – Sat, 9am – 8pm IST</p>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 bg-[#00dc82]/10 border border-[#00dc82]/20 text-[#00dc82] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#00dc82]/15 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#444]">
            © {new Date().getFullYear()} Amex Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-[#444] hover:text-[#666] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[#444] hover:text-[#666] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
