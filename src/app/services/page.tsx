import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import ServicesPageContent from "@/components/services/ServicesPageContent";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Software Development Services",
  keywords:
    "software development services, web app development, mobile app development, SaaS development, SEO services, AI automation services, n8n automation, Zapier workflows, technical SEO, on-page SEO",
  description:
    "Full-stack software development: web & mobile apps, SaaS, APIs, DevOps, UI/UX, SEO, and AI automation. Trusted by startups and enterprises worldwide.",
  alternates: {
    canonical: "https://amextechnology.com/services",
  },
  openGraph: {
    title: "Software Development Services | Amex Technology",
    description:
      "Full-stack software development services: web apps, mobile apps, SaaS platforms, API development, DevOps, UI/UX design, SEO services, and AI automation.",
    url: "https://amextechnology.com/services",
  },
  twitter: {
    title: "Software Development Services | Amex Technology",
    description:
      "Full-stack software development services: web apps, mobile apps, SaaS platforms, SEO services, and AI automation.",
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

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Amex Technology",
  url: "https://amextechnology.com",
  description: "Full-stack software development agency specializing in web apps, mobile apps, SaaS platforms, and more.",
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
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI and Automation Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maintenance and Support" } },
    ],
  },
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
