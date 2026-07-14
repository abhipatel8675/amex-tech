import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import AboutPageContent from "@/components/about/AboutPageContent";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "About Us — Founded 2019",
  description:
    "Amex Technology was founded in 2019 with a mission to build software that matters. Our team of engineers and designers has delivered 200+ projects for clients across North America, Europe, and beyond.",
  alternates: {
    canonical: "https://amextechnology.com/about",
  },
  openGraph: {
    title: "About Amex Technology — Founded 2019",
    description:
      "Founded in 2019, Amex Technology has delivered 200+ software projects for startups and enterprises across North America, Europe, and beyond.",
    url: "https://amextechnology.com/about",
  },
  twitter: {
    title: "About Amex Technology — Founded 2019",
    description:
      "Founded in 2019, Amex Technology has delivered 200+ software projects for startups and enterprises across North America, Europe, and beyond.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://amextechnology.com/about" },
  ],
};

export default function AboutPage() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <AboutPageContent />
      <CTASection />
      <Footer />
    </div>
  );
}
