export type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  technologies: string[];
  benefits: string[];
  accentColor: string;
  iconName: string;
  // Anchors of services that were merged into this one, so old /services#... links still land here.
  aliases?: string[];
};

// Single source for every services list on the site: services page, homepage
// preview, footer, contact form options, structured data and llms.txt.
export const services: Service[] = [
  {
    slug: "ai-services",
    title: "AI Agents & Automation",
    shortDesc: "AI agents, chatbots and automations that take repetitive work off your team.",
    description:
      "We build AI agents and automated workflows that answer customers, qualify leads, process documents and keep your tools in sync. From n8n, Make and Zapier automations to custom agents on OpenAI and Claude, with guardrails and human hand-off where it matters.",
    technologies: ["OpenAI", "Claude", "n8n", "Make", "Zapier", "LangChain"],
    benefits: [
      "AI chat and voice agents for support and lead qualification",
      "Document and data extraction pipelines",
      "Workflow automation across the tools you already use",
      "Guardrails, logging and human hand-off built in",
    ],
    accentColor: "#B8860B",
    iconName: "Bot",
  },
  {
    slug: "web-development",
    title: "Websites & Web Apps",
    shortDesc: "Fast marketing sites, customer portals and dashboards on one modern stack.",
    description:
      "One team for your public website and the web app behind it. We build conversion-focused sites, customer portals, dashboards, APIs and internal tools on Next.js and Supabase: fast, secure and easy for your team to update.",
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    benefits: [
      "Server-rendered pages that Google and AI search can read",
      "Customer portals, dashboards and role-based access",
      "APIs and integrations with your payment, CRM and email tools",
      "An admin panel or CMS so you can edit content yourself",
    ],
    accentColor: "#B8860B",
    iconName: "Globe",
    aliases: ["web-app-development", "api-development", "backend-development"],
  },
  {
    slug: "saas-development",
    title: "AI SaaS & MVP Development",
    shortDesc: "From idea to a paying-customer MVP in weeks, not months.",
    description:
      "We take SaaS and AI product ideas from prototype to launch: sign-up, subscriptions, multi-tenant data, AI features and analytics. Already built a first version in Lovable, Bolt or Replit? We harden it for real users and real traffic.",
    technologies: ["Next.js", "Supabase", "Stripe", "OpenAI", "Vercel", "PostHog"],
    benefits: [
      "Launch-ready MVP with auth and Stripe billing",
      "AI features with usage limits and cost controls",
      "Multi-tenant data protected by Row Level Security",
      "Prototype-to-production hardening for AI-built apps",
    ],
    accentColor: "#B8860B",
    iconName: "Rocket",
  },
  {
    slug: "seo-services",
    title: "SEO & GEO",
    shortDesc: "Rank on Google and get recommended by ChatGPT, Perplexity and Gemini.",
    description:
      "Search now happens on Google and inside AI assistants. We fix technical SEO, build pages around real search intent, optimize your Google Business Profile for local search, and apply Generative Engine Optimization (GEO) so AI tools understand and recommend your business.",
    technologies: ["Technical SEO", "Local SEO", "Google Business Profile", "Schema Markup", "GEO", "Search Console"],
    benefits: [
      "Technical SEO audit and fixes",
      "Local SEO and Google Business Profile optimization",
      "GEO: entity, schema and content work for AI search",
      "Monthly ranking and AI-visibility reporting",
    ],
    accentColor: "#B8860B",
    iconName: "Search",
  },
  {
    slug: "aeo-services",
    title: "AEO (Answer Engine Optimization)",
    shortDesc: "Be the answer in Google AI Overviews, ChatGPT, voice search and featured snippets.",
    description:
      "AEO structures your content so answer engines quote you directly. We research the questions your customers actually ask, write clear answer-first content, add FAQ and HowTo structured data, publish llms.txt, and track where AI assistants cite your brand.",
    technologies: ["FAQ Schema", "llms.txt", "AI Overviews", "ChatGPT Search", "Perplexity", "Content Strategy"],
    benefits: [
      "Question research from real customer searches",
      "Answer-first pages and FAQ content",
      "Structured data and llms.txt for AI crawlers",
      "Citation tracking across AI assistants",
    ],
    accentColor: "#B8860B",
    iconName: "MessageSquareQuote",
  },
  {
    slug: "crm-automation",
    title: "CRM & Marketing Automation",
    shortDesc: "GoHighLevel and HubSpot setups that follow up with every lead.",
    description:
      "We set up and repair CRMs so no lead slips through: website forms and calls flow into your pipeline, follow-ups run automatically by SMS and email, and you can see what's converting. We also connect your CRM to your website, dialer and ad platforms.",
    technologies: ["GoHighLevel", "HubSpot", "Zapier", "Twilio", "Stripe", "Webhooks"],
    benefits: [
      "Pipelines, funnels and automated follow-ups",
      "Website forms and calls synced to your CRM",
      "Dialer, SMS and email integrations",
      "Audits that find broken automations and lost leads",
    ],
    accentColor: "#B8860B",
    iconName: "Workflow",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDesc: "iOS and Android apps with AI features, from one codebase.",
    description:
      "We build cross-platform apps with React Native and Expo, including AI features like chat, voice and image recognition, and we handle App Store and Google Play submission so you can launch on both stores.",
    technologies: ["React Native", "Expo", "Firebase", "Supabase", "OpenAI", "Flutter"],
    benefits: [
      "Single codebase for iOS and Android",
      "AI chat, voice and camera features",
      "App Store and Google Play submission included",
      "Push notifications and analytics",
    ],
    accentColor: "#B8860B",
    iconName: "Smartphone",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX & Product Design",
    shortDesc: "Clear, modern interfaces that turn visitors into customers.",
    description:
      "Great software starts with great design. We create intuitive interfaces with clear information architecture, smooth interactions and design systems that scale, then hand developers designs they can build exactly.",
    technologies: ["Figma", "Framer", "Design Systems", "Prototyping", "shadcn/ui", "Tailwind CSS"],
    benefits: [
      "User research and wireframing",
      "Design system creation",
      "Interactive prototypes",
      "Developer-ready handoff",
    ],
    accentColor: "#B8860B",
    iconName: "Palette",
  },
  {
    slug: "devops-deployment",
    title: "Cloud, DevOps & Care Plans",
    shortDesc: "Reliable hosting, deployments and monthly care so your product never breaks.",
    description:
      "We set up the infrastructure and then look after it. Automated deployments, monitoring and backups keep your site or app online, and a monthly care plan covers updates, fixes and small improvements.",
    technologies: ["Vercel", "AWS", "Cloudflare", "Docker", "GitHub Actions", "Supabase"],
    benefits: [
      "Automated CI/CD and zero-downtime deploys",
      "Uptime, error and security monitoring",
      "Monthly updates, backups and fixes",
      "Domains, DNS, SSL and email deliverability",
    ],
    accentColor: "#B8860B",
    iconName: "Cloud",
    aliases: ["maintenance-support"],
  },
];
