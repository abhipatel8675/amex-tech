export type Project = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  shortDesc: string;
  description: string;
  problem: string;
  solution: string;
  results: string[];
  technologies: string[];
  gradientFrom: string;
  gradientTo: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Web",
    tags: ["Next.js", "Stripe", "Supabase"],
    shortDesc: "Custom e-commerce platform with real-time inventory and analytics dashboard.",
    description:
      "A full-stack e-commerce solution built for a growing retail brand. Includes product management, order processing, real-time inventory tracking, and a custom analytics dashboard.",
    problem:
      "The client was on a legacy Shopify setup that couldn't handle custom business logic, had high transaction fees, and lacked proper analytics for their growing catalog.",
    solution:
      "Built a fully custom storefront with Next.js, Stripe for payments, and Supabase for data. Admin panel with real-time inventory, order management, and analytics.",
    results: [
      "40% reduction in cart abandonment",
      "Real-time inventory updates",
      "Custom analytics dashboard",
      "3× faster page loads than legacy site",
    ],
    technologies: ["Next.js", "TypeScript", "Stripe", "Supabase", "Tailwind CSS", "Vercel"],
    gradientFrom: "#3b82f6",
    gradientTo: "#06b6d4",
    featured: true,
    liveUrl: "#",
  },
  {
    slug: "saas-analytics-dashboard",
    title: "SaaS Analytics Dashboard",
    category: "SaaS",
    tags: ["React", "Node.js", "PostgreSQL"],
    shortDesc: "Multi-tenant analytics platform with real-time data visualization.",
    description:
      "A multi-tenant SaaS analytics platform serving B2B clients. Features real-time data ingestion, interactive chart dashboards, team collaboration, and role-based access control.",
    problem:
      "The startup needed a white-label analytics product that could onboard new clients fast while keeping each tenant's data isolated and secure.",
    solution:
      "Built a multi-tenant architecture with isolated schemas per tenant, a real-time WebSocket pipeline for data ingestion, and a dashboard builder with drag-and-drop widgets.",
    results: [
      "Onboarded 50+ tenants in first month",
      "Sub-second data refresh rates",
      "99.9% uptime since launch",
      "White-label theming per tenant",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "WebSockets", "AWS"],
    gradientFrom: "#8b5cf6",
    gradientTo: "#ec4899",
    featured: true,
    liveUrl: "#",
  },
  {
    slug: "mobile-fintech-app",
    title: "Mobile Finance App",
    category: "Mobile",
    tags: ["React Native", "Firebase", "Stripe"],
    shortDesc: "Cross-platform personal finance app with budget tracking and insights.",
    description:
      "A cross-platform personal finance application for iOS and Android. Features expense tracking, budget goals, spending insights, and bank account sync via Plaid.",
    problem:
      "The client wanted to enter the personal finance market with an app that felt as polished as incumbents but with better UX and open banking features.",
    solution:
      "Built with React Native and Expo for a native feel on both platforms. Integrated Plaid for bank sync, custom charts for spending insights, and biometric auth.",
    results: [
      "4.7-star average rating on App Store",
      "10,000+ downloads in 3 months",
      "Plaid integration with 5,000+ banks",
      "Zero security incidents",
    ],
    technologies: ["React Native", "Expo", "Firebase", "Plaid", "Stripe", "TypeScript"],
    gradientFrom: "#10b981",
    gradientTo: "#06b6d4",
    featured: true,
    liveUrl: "#",
  },
  {
    slug: "restaurant-management-system",
    title: "Restaurant Management System",
    category: "Web",
    tags: ["Next.js", "Supabase", "Realtime"],
    shortDesc: "End-to-end restaurant platform with POS, ordering, and kitchen display.",
    description:
      "A complete restaurant management system with table-side ordering via QR codes, a kitchen display system (KDS), POS terminal, inventory management, and reporting.",
    problem:
      "A multi-location restaurant chain needed to replace their aging POS system and paper-based kitchen workflow with a modern, cloud-based alternative.",
    solution:
      "Built a real-time system with Supabase Realtime for instant order updates between front-of-house and kitchen. QR code ordering, mobile POS, and a unified reporting dashboard.",
    results: [
      "Order-to-kitchen time reduced by 60%",
      "Zero order errors after go-live",
      "Deployed across 4 locations",
      "Integrated with delivery platforms",
    ],
    technologies: ["Next.js", "Supabase", "Realtime", "Tailwind CSS", "TypeScript", "Vercel"],
    gradientFrom: "#f59e0b",
    gradientTo: "#ef4444",
    featured: false,
    liveUrl: "#",
  },
  {
    slug: "real-estate-platform",
    title: "Real Estate Marketplace",
    category: "Web",
    tags: ["Next.js", "Maps API", "Supabase"],
    shortDesc: "Property listing marketplace with maps, search, and agent portal.",
    description:
      "A property listing platform for a real estate agency. Features map-based search, advanced filters, mortgage calculator, agent dashboard, and lead management.",
    problem:
      "The agency relied on third-party listing portals that didn't let them own the lead relationship or customize the search experience for their market.",
    solution:
      "Built a full property marketplace with Google Maps integration, intelligent search with geo-filtering, an agent portal for listings, and a CRM for lead tracking.",
    results: [
      "200+ active listings at launch",
      "Lead capture rate 3× industry average",
      "Featured in local press",
      "Agent productivity increased 40%",
    ],
    technologies: ["Next.js", "Google Maps API", "Supabase", "TypeScript", "Algolia"],
    gradientFrom: "#10b981",
    gradientTo: "#3b82f6",
    featured: false,
    liveUrl: "#",
  },
  {
    slug: "lms-platform",
    title: "Learning Management System",
    category: "SaaS",
    tags: ["Next.js", "Video", "Stripe"],
    shortDesc: "Course platform with video hosting, progress tracking, and payments.",
    description:
      "A white-label LMS built for online course creators. Features video hosting via Cloudinary, quiz builder, progress tracking, certificate generation, and Stripe-powered payments.",
    problem:
      "An education startup needed a platform they could brand as their own rather than paying high fees on Teachable or Thinkific, while having flexibility to add custom features.",
    solution:
      "Built a fully custom LMS with course builder, chapter-by-chapter video player, quiz/assessment engine, certificate PDF generation, and multi-currency Stripe Checkout.",
    results: [
      "Launched 12 courses in first week",
      "2,000+ enrolled students",
      "Saved $3,000/month vs. Teachable",
      "99.5% video playback reliability",
    ],
    technologies: ["Next.js", "Cloudinary", "Stripe", "Supabase", "PDF generation", "TypeScript"],
    gradientFrom: "#8b5cf6",
    gradientTo: "#3b82f6",
    featured: false,
    liveUrl: "#",
  },
  {
    slug: "ai-content-platform",
    title: "AI Content Platform",
    category: "AI",
    tags: ["OpenAI", "Next.js", "Streaming"],
    shortDesc: "AI-powered content creation platform with team collaboration.",
    description:
      "A B2B AI writing platform that helps marketing teams create and iterate on content 10× faster. Features streaming AI generation, brand voice training, templates, and team workspaces.",
    problem:
      "A marketing agency wanted to productize their AI content workflow but needed a proper multi-user platform with brand guidelines baked into every generation.",
    solution:
      "Built with OpenAI streaming API for real-time output, a brand voice training system using fine-tuned prompts, template library, and team collaboration with version history.",
    results: [
      "Content production 8× faster",
      "Sold to 20 agencies in beta",
      "Average 92% user satisfaction score",
      "Brand consistency improved markedly",
    ],
    technologies: ["Next.js", "OpenAI API", "Supabase", "Stripe", "Vercel AI SDK", "TypeScript"],
    gradientFrom: "#f59e0b",
    gradientTo: "#8b5cf6",
    featured: false,
    liveUrl: "#",
  },
  {
    slug: "logistics-tracker",
    title: "Logistics Tracking App",
    category: "Mobile",
    tags: ["React Native", "Maps", "Real-time"],
    shortDesc: "Real-time delivery tracking app with live driver location updates.",
    description:
      "A logistics mobile application for a delivery company. Features real-time driver location tracking, proof of delivery with photos, route optimization, and customer SMS notifications.",
    problem:
      "The logistics company had no real-time visibility into driver locations and relied on phone calls for status updates, causing poor customer experience and dispatch inefficiency.",
    solution:
      "Built iOS/Android apps for drivers and a web dashboard for dispatch. Background location tracking, push notifications on delivery, photo proof-of-delivery, and route optimization via Google Maps.",
    results: [
      "On-time deliveries improved by 35%",
      "Customer complaint rate dropped 70%",
      "Dispatch team reduced calls by 80%",
      "Route efficiency saved 20% fuel cost",
    ],
    technologies: ["React Native", "Google Maps", "Firebase", "Node.js", "WebSockets", "Expo"],
    gradientFrom: "#ef4444",
    gradientTo: "#f59e0b",
    featured: false,
    liveUrl: "#",
  },
];

export const categories = ["All", "Web", "Mobile", "SaaS", "AI"] as const;
export type Category = (typeof categories)[number];
