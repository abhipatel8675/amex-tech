import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
