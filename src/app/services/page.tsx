import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import ServicesPageContent from "@/components/services/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From web development to DevOps — explore our full range of software development services built for modern businesses.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <Navbar />
      <ServicesPageContent />
      <CTASection />
      <Footer />
    </div>
  );
}
