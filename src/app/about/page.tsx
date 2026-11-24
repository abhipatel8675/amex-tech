import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AgencyAbout from "@/components/agency/AgencyAbout";

export const metadata: Metadata = {
  title: "About Us: Our Team and How We Work",
  description:
    "Amex Technology is an independent website, app and AI company founded by Abhi Patel, working with businesses worldwide. Top Rated Plus on Upwork.",
  alternates: {
    canonical: "https://amextechnology.com/about",
  },
  openGraph: {
    title: "About Us: Our Team and How We Work | Amex Technology",
    description:
      "Amex Technology is an independent website, app and AI company founded by Abhi Patel, working with businesses worldwide. Top Rated Plus on Upwork.",
    url: "https://amextechnology.com/about",
  },
  twitter: {
    title: "About Us: Our Team and How We Work | Amex Technology",
    description:
      "Amex Technology is an independent website, app and AI company founded by Abhi Patel, working with businesses worldwide. Top Rated Plus on Upwork.",
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
      name: "About",
      item: "https://amextechnology.com/about",
    },
  ],
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Amex Technology",
  url: "https://amextechnology.com/about",
  mainEntity: {
    "@type": "Organization",
    "@id": "https://amextechnology.com/#organization",
    name: "Amex Technology",
    url: "https://amextechnology.com",
    logo: "https://amextechnology.com/images/logo.png",
    foundingDate: "2019",
    description:
      "Independent website, app and AI company founded by Abhi Patel, building AI assistants, websites, web apps, software products and mobile apps, plus SEO and AI search visibility. Not affiliated with American Express.",
    founder: { "@id": "https://amextechnology.com/#founder" },
    sameAs: [
      "https://www.fiverr.com/abhipatel956",
      "https://www.instagram.com/amextechnology/",
      "https://www.upwork.com/agencies/2067871097204619852/",
      "https://www.linkedin.com/company/amex-technology/",
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#f7f6f2] text-[#111111] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <Navbar />
      <main id="main-content">
        <AgencyAbout />
      </main>
      <Footer />
    </div>
  );
}
