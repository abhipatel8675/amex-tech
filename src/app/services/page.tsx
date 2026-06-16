import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import ServicesPageContent from "@/components/services/ServicesPageContent";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Software Development Services",
  description:
    "Full-stack software development services: web apps, mobile apps, SaaS platforms, API development, DevOps, and UI/UX design. Trusted by startups and enterprises worldwide.",
  alternates: {
    canonical: "https://amextechnology.com/services",
  },
  openGraph: {
    title: "Software Development Services | Amex Technology",
    description:
      "Full-stack software development services: web apps, mobile apps, SaaS platforms, API development, DevOps, and UI/UX design.",
    url: "https://amextechnology.com/services",
  },
  twitter: {
    title: "Software Development Services | Amex Technology",
    description:
      "Full-stack software development services: web apps, mobile apps, SaaS platforms, API development, DevOps, and UI/UX design.",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Amex Technology",
  url: "https://amextechnology.com",
  description: "Full-stack software development agency specializing in web apps, mobile apps, SaaS platforms, and more.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "100",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Application Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "API Development and Integration" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DevOps and Deployment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maintenance and Support" } },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://amextechnology.com/services" },
  ],
};

export default function ServicesPage() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <ServicesPageContent />
      <CTASection />
      <Footer />
    </div>
  );
}
