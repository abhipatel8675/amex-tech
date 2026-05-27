import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Amex Technology",
  description: "Full Stack Development, Bug Fixes, Deployment, Mobile Apps, AI App Fix. Fixed packages or custom quotes.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-[#6b7280] max-w-xl mx-auto">
            Fixed packages with clear pricing. Custom quotes available within 24 hours.
          </p>
        </div>
        <Services />
      </div>
      <Footer />
    </div>
  );
}
