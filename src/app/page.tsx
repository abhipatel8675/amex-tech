import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AgencyHome from "@/components/agency/AgencyHome";
import { services } from "@/data/services";
import { agencyFaqs } from "@/components/agency/AgencySections";

export const metadata: Metadata = {
  title: { absolute: "Amex Technology | Web Design, SEO & AI Development in Los Angeles" },
  description:
    "Los Angeles web design, SEO and AI development. We build websites, web apps, mobile apps and AI automations, and get you found on Google and in AI search. Free quote.",
  alternates: {
    canonical: "https://amextechnology.com",
  },
  openGraph: {
    title: "Amex Technology | Web Design, SEO & AI Development in Los Angeles",
    description:
      "Websites, SEO, web and mobile apps and AI automation for businesses in Los Angeles and across the US.",
    url: "https://amextechnology.com",
    type: "website",
  },
  twitter: {
    title: "Amex Technology | Web Design, SEO & AI Development in Los Angeles",
    description:
      "Websites, SEO, web and mobile apps and AI automation for businesses in Los Angeles and across the US.",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Amex Technology",
  url: "https://amextechnology.com",
  publisher: { "@id": "https://amextechnology.com/#organization" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://amextechnology.com/#organization",
  name: "Amex Technology",
  url: "https://amextechnology.com",
  email: "abhi@amextech.org",
  telephone: "+1-623-301-2035",
  image: "https://amextechnology.com/images/logo.png",
  foundingDate: "2019",
  priceRange: "$$",
  currenciesAccepted: "USD, EUR, INR",
  paymentAccepted: "Bank Transfer, Credit Card",
  areaServed: [
    { "@type": "City", name: "Los Angeles" },
    { "@type": "State", name: "California" },
    { "@type": "Country", name: "United States" },
  ],
  serviceType: services.map((s) => s.title),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gardena",
    addressRegion: "CA",
    postalCode: "90247",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: agencyFaqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function HomePage() {
  return (
    <div className="bg-[#f7f6f2] text-[#1a211d] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main id="main-content">
        <AgencyHome />
      </main>
      <Footer />
    </div>
  );
}
