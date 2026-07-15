import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutPageContent from "@/components/about/AboutPageContent";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "About Us — Founded 2019",
  description:
    "Amex Technology is a software agency founded in 2019. Our engineers and designers have shipped 200+ projects for startups and enterprises worldwide.",
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

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Amex Technology",
  url: "https://amextechnology.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "Amex Technology",
    url: "https://amextechnology.com",
    logo: "https://amextechnology.com/images/logo.png",
    foundingDate: "2019",
    description:
      "Software development agency building web apps, mobile apps and SaaS platforms for startups and enterprises.",
    sameAs: ["https://www.fiverr.com/abhipatel956"],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <Navbar />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <AboutPageContent />
      <Footer />
    </div>
  );
}
