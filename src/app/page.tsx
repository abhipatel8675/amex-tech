import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessSection from "@/components/home/ProcessSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <Navbar />
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <WhyChooseUs />
      <ProcessSection />
      <FeaturedProjects />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
