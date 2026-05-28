import type { Metadata } from "next";
import { motion } from "framer-motion";
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
          <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-4">
            Our Work
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mb-5">
            Projects that solve real business problems.
          </h1>
          <p className="text-[#555] text-base md:text-lg max-w-xl leading-relaxed">
            10+ projects delivered across web, mobile, SaaS, and AI. Browse by category or explore
            the full case studies.
          </p>
        </div>
      </section>

      {/* Grid with filter */}
      <section className="pb-24 max-w-6xl mx-auto px-6">
        <ProjectGrid />
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
