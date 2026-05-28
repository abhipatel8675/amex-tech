import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import AboutPageContent from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Amex Technology — who we are, how we work, and why clients trust us to build their most important software.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <Navbar />
      <AboutPageContent />
      <CTASection />
      <Footer />
    </div>
  );
}
