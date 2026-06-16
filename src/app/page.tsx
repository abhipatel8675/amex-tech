import type { Metadata } from "next";
import { testimonials } from "@/data/testimonials";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessSection from "@/components/home/ProcessSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import FAQSection from "@/components/home/FAQSection";

export const metadata: Metadata = {
  title: "Amex Technology — Software Development Agency",
  description:
    "Amex Technology is a software development agency with 5+ years of experience and 200+ projects delivered. We build web apps, mobile apps, and SaaS platforms for startups and enterprises.",
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
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does custom software development cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project costs vary based on scope, complexity, and timeline. A simple website starts from $2,000–$5,000, a web application from $8,000–$25,000, and a full SaaS platform from $20,000+. We provide a detailed, itemized quote after a discovery call at no charge.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a web application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical web application takes 6–12 weeks from kickoff to launch. Simple websites can be completed in 2–4 weeks, while complex SaaS platforms with custom features can take 3–6 months. We share a detailed project timeline during the proposal stage.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with clients outside India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the majority of our clients are based in North America, Europe, and Australia. We work fully remotely and are comfortable with time zone differences. All communication is in English and we maintain overlapping hours with clients across time zones.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies do you specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our core stack is Next.js, React, TypeScript, Node.js, and PostgreSQL (via Supabase). For mobile, we use React Native and Expo. We also work with Tailwind CSS, Prisma, Stripe, and various AI APIs. We choose the right technology for each project rather than forcing a single stack.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer maintenance after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer retainer-based maintenance and support plans after every project. This covers bug fixes, dependency updates, performance monitoring, and feature additions. Plans start from a few hours per month to full ongoing development retainers.",
      },
    },
    {
      "@type": "Question",
      name: "Can you work with an existing codebase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We regularly inherit and extend existing codebases — including projects built by other agencies, no-code platforms like Lovable or Bubble, or internal teams. We conduct a code audit first, document what we find, and propose a clear path forward.",
      },
    },
  ],
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
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <WhyChooseUs />
      <ProcessSection />
      <FeaturedProjects />
      <Testimonials />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
