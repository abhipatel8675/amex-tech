import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import ServicesPageContent from "@/components/services/ServicesPageContent";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "AI, Web & Search Services",
  keywords:
    "AI agents, AI automation, website development, web app development, AI SaaS MVP, GEO services, AEO, answer engine optimization, generative engine optimization, local SEO, GoHighLevel, CRM automation, mobile app development",
  description:
    "AI agents and automation, websites and web apps, AI SaaS MVPs, mobile apps, CRM automation, and SEO, GEO and AEO so you're found on Google and in AI assistants.",
  alternates: {
    canonical: "https://amextechnology.com/services",
  },
  openGraph: {
    title: "AI, Web & Search Services | Amex Technology",
    description:
      "AI agents and automation, websites and web apps, AI SaaS MVPs, mobile apps, CRM automation, and SEO, GEO and AEO so you're found on Google and in AI assistants.",
    url: "https://amextechnology.com/services",
  },
  twitter: {
    title: "AI, Web & Search Services | Amex Technology",
    description:
      "AI agents and automation, websites and web apps, AI SaaS MVPs, mobile apps, CRM automation, and SEO, GEO and AEO so you're found on Google and in AI assistants.",
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
  description: "AI and software agency building AI agents, websites, web apps, SaaS products and mobile apps, plus SEO, GEO and AEO for Google and AI search.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI, Software and Search Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.shortDesc, url: `https://amextechnology.com/services#${s.slug}` },
    })),
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <ServicesPageContent />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
