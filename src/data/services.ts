export type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  technologies: string[];
  benefits: string[];
  accentColor: string;
  iconName: string;
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Website Development",
    shortDesc: "High-performance websites built for conversion and growth.",
    description:
      "We craft pixel-perfect, blazing-fast websites that represent your brand professionally and convert visitors into clients. From landing pages to complex corporate portals, we deliver clean, maintainable code on modern frameworks.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "WordPress", "Webflow"],
    benefits: [
      "Mobile-first, fully responsive design",
      "Core Web Vitals optimized",
      "SEO-structured semantic HTML",
      "CMS integration available",
    ],
    accentColor: "#3b82f6",
    iconName: "Globe",
  },
  {
    slug: "web-app-development",
    title: "Web Application Development",
    shortDesc: "Complex SaaS platforms, dashboards, and internal tools.",
    description:
      "We build robust, scalable web applications that handle real business logic. Whether it's a SaaS platform, analytics dashboard, or customer-facing portal — we architect systems that scale with your growth.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Supabase", "Redis", "GraphQL"],
    benefits: [
      "Scalable architecture from day one",
      "Real-time capabilities",
      "Role-based access control",
      "API-first design",
    ],
    accentColor: "#8b5cf6",
    iconName: "LayoutDashboard",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDesc: "Cross-platform iOS & Android apps users actually love.",
    description:
      "We develop performant mobile applications for iOS and Android using React Native and Flutter. From MVP to production, we build apps that feel native, load fast, and keep users engaged.",
    technologies: ["React Native", "Expo", "Flutter", "Firebase", "Swift", "Kotlin"],
    benefits: [
      "Single codebase, iOS & Android",
      "Native performance & UX",
      "App Store submission included",
      "Push notifications & analytics",
    ],
    accentColor: "#ec4899",
    iconName: "Smartphone",
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    shortDesc: "Multi-tenant SaaS platforms built to scale to thousands of users.",
    description:
      "We specialize in building SaaS products end-to-end. Our team understands multi-tenancy, subscription billing, user management, and the infrastructure needed to scale from 100 to 100,000 users reliably.",
    technologies: ["Next.js", "Stripe", "Supabase", "AWS", "Docker", "Kubernetes"],
    benefits: [
      "Multi-tenant architecture",
      "Subscription billing integration",
      "User management & teams",
      "Usage-based metering",
    ],
    accentColor: "#10b981",
    iconName: "Layers",
  },
  {
    slug: "api-development",
    title: "API Development & Integration",
    shortDesc: "Robust APIs and seamless third-party integrations.",
    description:
      "We design and build RESTful and GraphQL APIs that power frontends, mobile apps, and partner integrations. We also integrate third-party services — payment gateways, CRMs, analytics — cleanly and securely.",
    technologies: ["Node.js", "Python", "FastAPI", "GraphQL", "REST", "Webhooks"],
    benefits: [
      "Well-documented API design",
      "Rate limiting & authentication",
      "Third-party integrations",
      "Webhook systems",
    ],
    accentColor: "#f59e0b",
    iconName: "Zap",
  },
  {
    slug: "backend-development",
    title: "Backend Development",
    shortDesc: "Reliable, secure server-side systems that power your product.",
    description:
      "We architect and build server-side systems that handle business logic, data storage, authentication, and integrations. Clean, testable backend code that is easy to maintain and extend.",
    technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "Prisma"],
    benefits: [
      "Clean, testable architecture",
      "Secure authentication systems",
      "Database design & optimization",
      "Background jobs & queues",
    ],
    accentColor: "#06b6d4",
    iconName: "Server",
  },
  {
    slug: "devops-deployment",
    title: "DevOps & Deployment",
    shortDesc: "CI/CD pipelines and cloud infrastructure that just work.",
    description:
      "We handle the infrastructure side so your team can focus on shipping features. From CI/CD pipelines to cloud configuration, we make deployment reliable, automated, and observable.",
    technologies: ["AWS", "Vercel", "Docker", "GitHub Actions", "Nginx", "Terraform"],
    benefits: [
      "Zero-downtime deployments",
      "Automated CI/CD pipelines",
      "Environment configuration",
      "Monitoring & alerting",
    ],
    accentColor: "#64748b",
    iconName: "Rocket",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDesc: "User-centered design that drives engagement and conversion.",
    description:
      "Great software starts with great design. We create intuitive interfaces with clear information architecture, smooth interactions, and design systems that scale. Every pixel is intentional.",
    technologies: ["Figma", "Adobe XD", "Framer", "Storybook", "Tailwind CSS", "shadcn/ui"],
    benefits: [
      "User research & wireframing",
      "Design system creation",
      "Interactive prototypes",
      "Developer-ready handoff",
    ],
    accentColor: "#d946ef",
    iconName: "Palette",
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    shortDesc: "Ongoing technical support to keep your product healthy.",
    description:
      "We offer ongoing maintenance retainers to keep your application up-to-date and performing. From bug fixes and dependency updates to feature additions and performance audits, we're your long-term technical partner.",
    technologies: ["All stacks we build", "Monitoring tools", "Performance auditing"],
    benefits: [
      "Priority bug fixes",
      "Monthly dependency updates",
      "Performance monitoring",
      "Feature enhancements",
    ],
    accentColor: "#0ea5e9",
    iconName: "Settings",
  },
];
