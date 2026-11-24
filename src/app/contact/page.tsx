import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AgencyContact from "@/components/agency/AgencyContact";

export const metadata: Metadata = {
  title: "Start a Project — Get a Free Quote",
  description:
    "Get a free quote for your website, web app, mobile app or app fix. Tell Amex Technology what you need and we'll reply with practical next steps.",
  alternates: {
    canonical: "https://amextechnology.com/contact",
  },
  openGraph: {
    title: "Start a Project — Get a Free Quote | Amex Technology",
    description:
      "Get a free quote for your website, web app, mobile app or app fix. Tell Amex Technology what you need and we'll reply with practical next steps.",
    url: "https://amextechnology.com/contact",
  },
  twitter: {
    title: "Start a Project — Get a Free Quote | Amex Technology",
    description:
      "Get a free quote for your website, web app, mobile app or app fix. Tell Amex Technology what you need and we'll reply with practical next steps.",
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
      name: "Contact",
      item: "https://amextechnology.com/contact",
    },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Amex Technology",
  url: "https://amextechnology.com/contact",
  mainEntity: {
    "@id": "https://amextechnology.com/#organization",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "abhi@amextech.org",
      availableLanguage: "English",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "07:00",
        closes: "19:00",
      },
    },
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[#f7f6f2] text-[#111111] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Navbar />
      <main id="main-content">
        <AgencyContact />
      </main>
      <Footer />
    </div>
  );
}
