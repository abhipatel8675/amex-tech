import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Home", description: "Back to the start" },
  { href: "/services", label: "Services", description: "What we build" },
  { href: "/blog", label: "Blog", description: "Guides and insights" },
  { href: "/contact", label: "Contact", description: "Talk to our team" },
];

export default function NotFound() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <Navbar />
      <main>
        <section className="pt-24 pb-28 max-w-[92rem] mx-auto px-6">
          <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-widest mb-5">
            Error 404
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
            Page not found
          </h1>
          <p className="text-slate-600 text-base leading-7 max-w-xl mb-12">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Try one of these instead.
          </p>

          <nav aria-label="Helpful links" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all duration-200"
              >
                <span className="block text-lg font-semibold text-slate-900 group-hover:text-[#7A5807] transition-colors">
                  {link.label} &rarr;
                </span>
                <span className="block text-sm text-slate-600 mt-1">{link.description}</span>
              </Link>
            ))}
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  );
}
