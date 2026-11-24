import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AgencyHome from "@/components/agency/AgencyHome";
import { agencyFaqs } from "@/components/agency/AgencySections";

export const metadata: Metadata = {
  title: { absolute: "Amex Technology | Websites, Apps & AI for Businesses" },
  description:
    "We build websites, web apps, mobile apps and AI automations for businesses worldwide, and help customers find them on Google and in AI search. Free quote.",
  alternates: {
    canonical: "https://amextechnology.com",
  },
  openGraph: {
    title: "Amex Technology | Websites, Apps & AI for Businesses",
    description:
      "We build websites, web and mobile apps and AI automations for businesses worldwide, and help customers find them online.",
    url: "https://amextechnology.com",
    type: "website",
  },
  twitter: {
    title: "Amex Technology | Websites, Apps & AI for Businesses",
    description:
      "We build websites, web and mobile apps and AI automations for businesses worldwide, and help customers find them online.",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Amex Technology",
  url: "https://amextechnology.com",
  publisher: { "@id": "https://amextechnology.com/#organization" },
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
    <div className="bg-[#f7f6f2] text-[#111111] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
