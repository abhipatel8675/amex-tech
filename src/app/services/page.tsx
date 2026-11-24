import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AgencyCTA } from "@/components/agency/AgencySections";
import s from "@/components/agency/agency.module.css";
import ServicesPageContent from "@/components/services/ServicesPageContent";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Website, AI & SEO Services",
  keywords:
    "AI automation, website development, web app development, software MVP, SEO services, AI search visibility, local SEO, GoHighLevel, CRM automation, mobile app development",
  description:
    "AI assistants and automation, websites and web apps, software products, mobile apps, CRM automation, and SEO so customers find you on Google and in AI assistants.",
  alternates: {
    canonical: "https://amextechnology.com/services",
  },
  openGraph: {
    title: "Website, AI & SEO Services | Amex Technology",
    description:
      "AI assistants and automation, websites and web apps, software products, mobile apps, CRM automation, and SEO so customers find you on Google and in AI assistants.",
    url: "https://amextechnology.com/services",
  },
  twitter: {
    title: "Website, AI & SEO Services | Amex Technology",
    description:
      "AI assistants and automation, websites and web apps, software products, mobile apps, CRM automation, and SEO so customers find you on Google and in AI assistants.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://amextechnology.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://amextechnology.com/services",
    },
  ],
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Amex Technology",
  url: "https://amextechnology.com",
  description:
    "Website, app and AI company building AI assistants, websites, web apps, software products and mobile apps, plus SEO for Google and AI search.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Website, AI and Search Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.shortDesc,
        url: `https://amextechnology.com/services/${s.slug}`,
      },
    })),
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-[#f7f6f2] text-[#111111] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main id="main-content" className={s.site}>
        <ServicesPageContent />
        <AgencyCTA />
      </main>
      <Footer />
    </div>
  );
}
