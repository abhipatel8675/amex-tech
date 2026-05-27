import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Amex Technology",
  description: "Tell us about your project. We respond within 24 hours with a clear proposal and fixed price.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-28">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
