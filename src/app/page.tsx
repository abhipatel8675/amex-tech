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
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Amex Technology",
  url: "https://amextechnology.com",
  email: "abhipatel8675@gmail.com",
  foundingDate: "2019",
  priceRange: "$$",
  currenciesAccepted: "USD, EUR, INR",
  paymentAccepted: "Bank Transfer, Credit Card",
  areaServed: "Worldwide",
  serviceType: ["Software Development", "Web Development", "Mobile App Development", "SaaS Development", "SEO Services", "AI Automation"],
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
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does custom software development cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cost depends on scope, complexity, and timeline. A professional website starts from $500–$2,000, a web application from $3,000–$10,000, and a full SaaS platform from $5,000+. We provide a detailed, itemised quote after a free discovery call — no commitment required.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a web application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most web applications take 6–12 weeks from kickoff to launch. A simple website can be delivered in 2–4 weeks. A complex SaaS platform with custom features typically takes 3–6 months. We share a milestone-by-milestone timeline during the proposal stage.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with clients outside India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the majority of our clients are based in North America, Europe, and Australia. We work fully remotely and are comfortable with time zone differences. All communication is in English and we maintain overlapping working hours with every client.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies do you specialise in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our core stack is Next.js, React, TypeScript, Node.js, and PostgreSQL (via Supabase). For mobile, we use React Native and Expo. For AI automation, we work with n8n, Zapier, Make, and the OpenAI and LangChain APIs. We choose the right technology for the job rather than forcing a single stack.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer SEO and AI automation services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer full technical SEO — audits, on-page optimisation, Core Web Vitals, and schema markup — as well as AI-powered workflow automation using tools like n8n, Zapier, Make, and custom LangChain agents. These services can be standalone or delivered alongside a development project.",
      },
    },
    {
      "@type": "Question",
      name: "Can you build a SaaS product from scratch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We've built multiple SaaS platforms from idea to production — covering multi-tenant architecture, subscription billing with Stripe, role-based access control, usage analytics dashboards, and automated onboarding flows. We handle the full stack so you can focus on your customers.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer maintenance and support after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every project includes a post-launch support period, and we offer ongoing retainer plans for maintenance, bug fixes, dependency updates, performance monitoring, and feature development. Plans are flexible — from a few hours per month to a full ongoing development partnership.",
      },
    },
    {
      "@type": "Question",
      name: "Can you work with an existing codebase or fix a broken project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We regularly inherit codebases from other agencies, internal teams, and no-code platforms like Bubble or Lovable. We start with a thorough code audit, document what we find, and propose a clear, costed path forward. We don't rewrite unless it's genuinely necessary.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle project communication and updates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use a structured process: weekly video calls, a shared project board (Notion or Linear), and a dedicated Slack channel for async communication. You'll always know the current status, what's in progress, and what's coming next — no chasing required.",
      },
    },
    {
      "@type": "Question",
      name: "Do you sign NDAs and protect client IP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We sign NDAs before any sensitive discussions and our contracts include full IP assignment — everything we build for you is yours. We also follow secure development practices including environment isolation, secret management, and role-based access on all repositories.",
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
