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
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "molar-ai",
    title: "Molar AI",
    category: "AI",
    tags: ["AI", "Social Media", "Dental Tech"],
    shortDesc: "AI-powered social media automation built exclusively for dental practices.",
    description:
      "Molar AI is an AI platform that fully automates social media content for dental practices — posting to Instagram and Facebook daily in any language, in the practice's authentic voice. Branded, converting, and completely hands-off.",
    problem:
      "Dental practices know they need a consistent social media presence to attract patients, but they have no time to create content. Hiring social media managers is expensive, generic agencies produce lifeless posts, and DIY efforts burn out within weeks.",
    solution:
      "We built Molar AI to make social media invisible work for dental practices. The platform generates on-brand, clinically credible content daily, schedules it automatically across Instagram and Facebook, and adapts to each practice's voice and patient demographics.",
    results: [
      "Daily social media posts in any language, fully automated",
      "Authentic, branded content that converts followers into booked patients",
      "Zero time investment from the dental team after initial setup",
      "Consistent online presence that compounds patient trust over time",
    ],
    technologies: ["Next.js", "TypeScript", "OpenAI", "Supabase", "Tailwind CSS", "Vercel"],
    gradientFrom: "#6366f1",
    gradientTo: "#8b5cf6",
    featured: true,
    liveUrl: "https://molarai.studio",
    image: "/images/portfolio/molar-ai.png",
  },
  {
    slug: "periscope-email",
    title: "Periscope Email",
    category: "SaaS",
    tags: ["AI Outreach", "B2B Sales", "SaaS"],
    shortDesc: "Turns real-time news triggers into ready-to-send enterprise outreach in seconds.",
    description:
      "Periscope transforms breaking news about named accounts into researched contact lists and personalized, enterprise-grade emails — in seconds, not 30+ minutes. It gives B2B sales teams a revenue intelligence layer that acts on signals the moment they happen.",
    problem:
      "Enterprise sales teams are slow to react to buying signals. By the time reps research a news trigger, find contacts, and write a relevant email, the moment has passed. Existing tools give you the data but leave all the work to the rep.",
    solution:
      "We built Periscope as an end-to-end signal-to-send workflow. It monitors news across named accounts, automatically researches relevant contacts, and generates personalized, ready-to-send enterprise emails — collapsing 30+ minutes of rep work into seconds.",
    results: [
      "Breaking news about target accounts converted to outreach in seconds",
      "Researched contact lists generated automatically alongside each email",
      "Enterprise-grade personalization at the speed of a news alert",
      "Sales teams react to buying signals before the competition can",
    ],
    technologies: ["Next.js", "React", "Node.js", "TypeScript", "OpenAI", "Supabase"],
    gradientFrom: "#eab308",
    gradientTo: "#f97316",
    featured: true,
    liveUrl: "https://periscope.email",
    image: "/images/portfolio/periscope-email.jpg",
  },
  {
    slug: "hmd",
    title: "HMD",
    category: "SaaS",
    tags: ["Medical Education", "E-Learning", "SaaS"],
    shortDesc: "Elite medical education platform advancing physicians through evidence and leadership.",
    description:
      "HMD is a premium medical education platform delivering elite physician training, evidence-based programs, and physician-executive development to medical trainees, physicians, and institutions worldwide. Built around the principle of medicine via pristina — pure, rigorous, and leadership-driven.",
    problem:
      "Physicians seeking elite continuing education and executive development faced a fragmented landscape of low-quality platforms. Institutions needed a trusted, scalable home for structured medical programs that matched the prestige of the training itself.",
    solution:
      "We built HMD as a full-featured medical education SaaS — featuring structured program pathways, a curated library of clinical resources, a physician community hub (iConnect), and a clean, authoritative interface that reflects the caliber of the education delivered.",
    results: [
      "Integrated 4-year and 3-year physician programs delivered asynchronously online",
      "100% asynchronous curriculum accessible globally for active physicians",
      "iConnect community hub fostering peer collaboration among medical professionals",
      "Institutional partnerships extending the reach of elite physician development",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    gradientFrom: "#1e3a5f",
    gradientTo: "#c9a227",
    featured: false,
    liveUrl: "https://www.hmd.com.co",
    image: "/images/portfolio/hmd.jpg",
  },
  {
    slug: "herruby-app",
    title: "Herruby",
    category: "Mobile App",
    tags: ["Women's Health", "Wellness", "Mobile"],
    shortDesc: "Midlife wellness app helping Canadian women sustain energy, confidence, and performance.",
    description:
      "Herruby is a PIPEDA-compliant wellness platform built exclusively for Canadian women navigating midlife. It provides personalized tools, expert-backed resources, and a supportive community to help women sustain their energy, confidence, and performance through this life stage.",
    problem:
      "Women going through midlife — perimenopause, hormonal shifts, energy changes — had nowhere to turn for a dedicated, privacy-first digital health experience that understood their specific needs. Generic wellness apps were not built for them.",
    solution:
      "We designed and built Herruby as a mobile-first platform purpose-built for Canadian women in midlife. The product combines personalized wellness tracking, expert content, and community features, with full PIPEDA compliance baked into the architecture from day one.",
    results: [
      "First wellness platform purpose-built for Canadian women in midlife",
      "Full PIPEDA compliance built into the data architecture from the ground up",
      "Personalized energy, confidence, and performance tracking tailored to life stage",
      "Expert-backed content library addressing the specific needs of midlife women",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    gradientFrom: "#9f1239",
    gradientTo: "#c2410c",
    featured: true,
    liveUrl: "https://herrubyapp.vercel.app",
    image: "/images/portfolio/herruby-app.jpg",
  },
  {
    slug: "zenscroll",
    title: "ZenScroll",
    category: "Mobile App",
    tags: ["Digital Wellness", "React Native", "Mobile"],
    shortDesc: "Mobile app that makes you earn your scroll — one breath of meditation at a time.",
    description:
      "ZenScroll balances social media with meditation. Every minute of mindfulness practice earns two to six minutes of scroll time — the ratio is yours to set, but the pause is non-negotiable. Available on iOS and Android.",
    problem:
      "Doomscrolling is effortless by design. Screen-time blockers fail because they fight willpower head-on. Users wanted a way to keep social media in their lives without it controlling them — something that built a genuine habit rather than just imposing restrictions.",
    solution:
      "We built ZenScroll around a single powerful mechanic: scroll time must be earned through meditation. The app guides users through breathing exercises, logs practice minutes, and unlocks proportional scroll time. Simple, fair, and impossible to game mindlessly.",
    results: [
      "Available on both App Store and Google Play",
      "Earn-to-scroll mechanic creates a genuine mindfulness habit loop",
      "Configurable meditation-to-scroll ratio gives users ownership of the balance",
      "Dark, calming UI design that reinforces the app's meditative purpose",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Firebase", "Tailwind CSS"],
    gradientFrom: "#7c2d12",
    gradientTo: "#92400e",
    featured: false,
    liveUrl: "https://www.zenscrollapp.com",
    image: "/images/portfolio/zenscroll.png",
  },
  {
    slug: "expert-village-media",
    title: "Expert Village Media",
    category: "Web",
    tags: ["Shopify", "E-Commerce", "Partner Agency"],
    shortDesc: "Shopify Select Partner Agency building high-converting stores for growth-focused brands.",
    description:
      "Expert Village Media is a Shopify Select Partner Agency and Certified Expert that transforms e-commerce visions into high-converting Shopify stores. Spanning custom theme design, app integration, store migration, and performance optimization — they handle every aspect of a brand's Shopify journey.",
    problem:
      "Expert Village Media needed a web presence that established their authority as a leading Shopify development agency, clearly communicated their service offering, and generated consistent inbound leads from brands seeking serious e-commerce expertise.",
    solution:
      "We built a clean, conversion-focused agency website featuring service showcases, a portfolio of client work, partner credentials (Shopify, Google, Upwork), and a seamless schedule-a-call flow. The site positions Expert Village Media as the obvious choice for brands investing in Shopify.",
    results: [
      "Partner credentials (Shopify Select, Google, Upwork) prominently communicated",
      "Portfolio and case studies converting visitors into qualified discovery calls",
      "Clean, trust-building design that matches the caliber of their Shopify work",
      "SEO-optimized structure driving organic discovery from Shopify-seeking brands",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Framer Motion"],
    gradientFrom: "#2563eb",
    gradientTo: "#7c3aed",
    featured: false,
    liveUrl: "https://expertvillagemedia.vercel.app",
    image: "/images/portfolio/expert-village-media.jpg",
  },
  {
    slug: "torqron",
    title: "Torqron",
    category: "Web",
    tags: ["Industrial", "Petrochemical", "B2B"],
    shortDesc: "Industrial web presence for a global petrochemical products and solutions provider.",
    description:
      "Torqron delivers industrial excellence to global petrochemical operations — precision granulation tools, advanced polymer additives, mission-critical spare parts, and integrated supply chain solutions. With 20+ years of engineering expertise across 28 facilities in 12 countries, they needed a web presence that communicated that authority.",
    problem:
      "Torqron's previous web presence failed to reflect their scale, engineering depth, or global reach. Enterprise procurement teams evaluating industrial suppliers expect a site that signals technical credibility and operational reliability — theirs did not.",
    solution:
      "We built a high-performance industrial website featuring detailed product and application pages, a clear services overview, and a Contact/RFQ flow built for enterprise buyers. The design language communicates precision and reliability — matching the quality of the products themselves.",
    results: [
      "20+ years of engineering expertise clearly communicated to enterprise buyers",
      "Products, Applications, and Services architecture supports complex procurement journeys",
      "RFQ flow converts high-intent visitors into qualified sales conversations",
      "Site reflects the credibility of a supplier trusted by 28 major industrial facilities",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Framer Motion"],
    gradientFrom: "#1d4ed8",
    gradientTo: "#dc2626",
    featured: false,
    liveUrl: "https://torqron.com",
    image: "/images/portfolio/torqron.jpg",
  },
];

export const categories = ["All", "Web", "Mobile App", "SaaS", "AI"] as const;
export type Category = (typeof categories)[number];
