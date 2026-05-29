import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import ProjectGrid from "@/components/portfolio/ProjectGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our client work — web applications, mobile apps, SaaS platforms, and AI-powered products built for real businesses.",
};

export default function PortfolioPage() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 max-w-6xl mx-auto px-6">
        <div>
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-5">
            Our Work
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-3xl mb-6 leading-tight">
            Projects that solve real business problems.
          </h1>
          <p className="text-slate-300 text-xl max-w-xl leading-8">
            200+ projects delivered across web, mobile, SaaS, and AI. Browse by category or explore
            the full case studies.
          </p>
        </div>
      </section>

      {/* Grid with filter */}
      <section className="pb-28 max-w-6xl mx-auto px-6">
        <ProjectGrid />
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
