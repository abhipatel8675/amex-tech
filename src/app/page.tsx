import type { Metadata } from "next";
import { testimonials } from "@/data/testimonials";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import { pickHeroPosts } from "@/data/heroPosts";
import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import TechMarquee from "@/components/home/TechMarquee";
import StatsBar from "@/components/home/StatsBar";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessSection from "@/components/home/ProcessSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";
import FAQSection from "@/components/home/FAQSection";

export const metadata: Metadata = {
  title: { absolute: "Amex Technology — Software Development Agency" },
  description:
    "Software development agency with 5+ years' experience and 200+ projects delivered — web apps, mobile apps and SaaS platforms for startups and enterprises.",
  alternates: {
    canonical: "https://amextechnology.com",
  },
  openGraph: {
    title: "Amex Technology — Software Development Agency",
    description:
      "5+ years of experience · 200+ projects delivered. We build scalable web apps, mobile apps, and SaaS platforms.",
    url: "https://amextechnology.com",
    type: "website",
  },
  twitter: {
    title: "Amex Technology — Software Development Agency",
    description:
      "5+ years of experience · 200+ projects delivered. We build scalable web apps, mobile apps, and SaaS platforms.",
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
  email: "abhipatel8675@gmail.com",
  foundingDate: "2019",
  priceRange: "$$",
  currenciesAccepted: "USD, EUR, INR",
  paymentAccepted: "Bank Transfer, Credit Card",
  areaServed: "Worldwide",
  serviceType: services.map((s) => s.title),
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Client Reviews",
  itemListElement: testimonials.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      reviewBody: t.content,
      itemReviewed: { "@type": "Organization", name: "Amex Technology" },
    },
  })),
};

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <Navbar />
      <main>
        <Hero blogPosts={pickHeroPosts(blogPosts)} />
        <TechMarquee />
        <StatsBar />
        <ServicesPreview />
        <WhyChooseUs />
        <ProcessSection />
        <FeaturedProjects
          featured={projects
            .filter((p) => p.featured)
            .slice(0, 3)
            .map(({ slug, title, category, tags, shortDesc, gradientFrom, gradientTo, image, liveUrl }) => ({
              slug, title, category, tags, shortDesc, gradientFrom, gradientTo, image, liveUrl,
            }))}
          totalCount={projects.length}
        />
        <Testimonials />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
