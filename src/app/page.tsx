import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/components/home/Home";
import { homeFaqs } from "@/data/homeFaqs";

const title = "Amex Technology | Websites, Apps & AI Tools for Growing Businesses";
const description =
  "Amex Technology designs and builds websites, apps and AI tools for businesses around the world, and helps customers find you on Google and in AI search. Free quote.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "https://amextechnology.com",
  },
  openGraph: {
    title,
    description,
    url: "https://amextechnology.com",
    type: "website",
  },
  twitter: {
    title,
    description,
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
  mainEntity: homeFaqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function HomePage() {
  return (
    <div className="bg-[#fbfaf8] text-[#1c1624] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main id="main-content">
        <Home />
      </main>
      <Footer />
    </div>
  );
}
