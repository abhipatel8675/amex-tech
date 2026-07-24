import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Portfolio — Client Case Studies",
  description:
    "Explore Amex Technology's portfolio of 200+ projects — web applications, mobile apps, SaaS platforms, and AI-powered products built for real businesses.",
  alternates: {
    canonical: "https://amextechnology.com/portfolio",
  },
  openGraph: {
    title: "Portfolio — Client Case Studies | Amex Technology",
    description:
      "200+ projects delivered: web apps, mobile apps, SaaS platforms, and AI products. Browse real case studies.",
    url: "https://amextechnology.com/portfolio",
  },
  twitter: {
    title: "Portfolio — Client Case Studies | Amex Technology",
    description:
      "200+ projects delivered: web apps, mobile apps, SaaS platforms, and AI products. Browse real case studies.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://amextechnology.com/portfolio" },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Portfolio — Client Case Studies",
  url: "https://amextechnology.com/portfolio",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://amextechnology.com/portfolio/${p.slug}`,
      name: p.title,
    })),
  },
};

export default function PortfolioPage() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Navbar />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]} />

        {/* Hero — large editorial header */}
        <section className="pt-8 pb-0 overflow-hidden">
          <div className="max-w-[92rem] mx-auto px-6">
            <p
              className="mb-6 font-semibold uppercase"
              style={{ fontSize: 11, letterSpacing: "0.15em", color: "#818CF8" }}
            >
              Our Work
            </p>
          </div>
          {/* Display heading */}
          <div className="max-w-[92rem] mx-auto px-6 mb-5">
            <h1
              className="font-bold text-white leading-tight"
              style={{
                fontSize: "clamp(40px, 4.5vw, 68px)",
                letterSpacing: "-0.03em",
              }}
            >
              Software Development Case Studies.
            </h1>
          </div>
          <div className="max-w-[92rem] mx-auto px-6 pb-12">
            <p className="text-xl max-w-xl leading-8" style={{ color: "rgba(203,213,225,0.75)" }}>
              {projects.length} projects shipped across SaaS, AI, mobile, and web — each one solving a real business problem for a real client.
            </p>
          </div>
        </section>

        {/* Grid with filter */}
        <section className="pb-16 max-w-[92rem] mx-auto px-6">
          <ProjectGrid />
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
