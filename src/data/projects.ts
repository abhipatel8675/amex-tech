export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  span?: "wide";
};

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
  gallery?: GalleryImage[];
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
    gallery: [
      {
        src: "/images/portfolio/molar-ai/ss-1.png",
        alt: "Molar AI — homepage hero: The Easiest Way to Educate Patients Online",
        caption: "5.8M+ organic views generated — the easiest way to educate patients online",
        span: "wide",
      },
      {
        src: "/images/portfolio/molar-ai/ss-2.png",
        alt: "Molar AI — AI-generated dental content reels in multiple languages",
        caption: "Branded reels across dentistry topics — multilingual, high-engagement, zero filming",
      },
      {
        src: "/images/portfolio/molar-ai/ss-3.png",
        alt: "Molar AI — One Platform, Five Continents. Five Steps to Full Automation.",
        caption: "One platform, five continents — live in as little as 24 hours",
      },
      {
        src: "/images/portfolio/molar-ai/ss-4.png",
        alt: "Molar AI — Customized at Scale: Reels, Carousels, Before & Afters, Case Studies",
        caption: "Every content grid is unique — built around your brand, your patients, your city",
      },
      {
        src: "/images/portfolio/molar-ai/ss-5.png",
        alt: "Molar AI — Dr. Patricia Harrosch before (159 followers) vs after (10.2K followers)",
        caption: "Dr. Patricia Harrosch: 159 followers → 10.2K followers — trusted by Quebec's smile makeover expert",
      },
      {
        src: "/images/portfolio/molar-ai/ss-6.png",
        alt: "Molar AI vs. Agencies comparison — $497/mo vs $3,000–5,000/mo",
        caption: "Molar AI vs agencies: $497/mo, 24-hour content speed, no contracts, all languages",
      },
    ],
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
    image: "/images/portfolio/periscope-email.png",
    gallery: [
      {
        src: "/images/portfolio/periscope-email/ss-1.png",
        alt: "Periscope Email — homepage: Real-Time News Triggers → Ready-to-Send Enterprise Outreach",
        caption: "Real-time news triggers → ready-to-send enterprise outreach, in seconds not 30+ minutes",
        span: "wide",
      },
      {
        src: "/images/portfolio/periscope-email/ss-2.png",
        alt: "Periscope Email — Never Miss a Revenue Moment Again",
        caption: "News Headlines → Verified Contacts → Opportunity Created → Meetings Booked",
      },
      {
        src: "/images/portfolio/periscope-email/ss-3.png",
        alt: "Periscope Email — What Periscope Does: 5-step pipeline",
        caption: "5 automated steps: monitor news, detect triggers, find contacts, generate email, deliver",
      },
      {
        src: "/images/portfolio/periscope-email/ss-4.png",
        alt: "Periscope Email — pricing and plans",
        caption: "Flexible plans for solo reps and enterprise sales teams",
      },
      {
        src: "/images/portfolio/periscope-email/ss-5.png",
        alt: "Periscope Email — use cases and integrations",
        caption: "Built for enterprise AEs and SDRs across any industry vertical",
      },
      {
        src: "/images/portfolio/periscope-email/ss-6.png",
        alt: "Periscope Email — security and compliance",
        caption: "Enterprise-grade security — your data stays yours",
      },
      {
        src: "/images/portfolio/periscope-email/ss-7.png",
        alt: "Periscope Email — sign up and onboarding flow",
        caption: "Get started in minutes — connect accounts and go live immediately",
      },
    ],
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
    image: "/images/portfolio/hmd/ss-8.png",
    gallery: [
      {
        src: "/images/portfolio/hmd/ss-4.png",
        alt: "HMD — Evidence Summary library: curated clinical research papers across specialties",
        caption: "Evidence Summary library — curated RCTs, meta-analyses, and guidelines across every specialty",
        span: "wide",
      },
      {
        src: "/images/portfolio/hmd/ss-5.png",
        alt: "HMD — Evidence Summary article: ADA Standards of Care in Diabetes 2026",
        caption: "Deep-dive evidence summaries with HMD faculty appraisals and graded evidence ratings",
      },
      {
        src: "/images/portfolio/hmd/ss-6.png",
        alt: "HMD — Key Quotable Insight and clinical practice point from an evidence summary",
        caption: "Key Quotable Insights — ready for executive briefs, slide decks, and policy discussions",
      },
      {
        src: "/images/portfolio/hmd/ss-1.png",
        alt: "HMD — physician dashboard: Good afternoon, Colleague. Upcoming journal clubs and recommendations.",
        caption: "Physician dashboard — personalized learning, upcoming journal clubs, and iConnect activity",
      },
      {
        src: "/images/portfolio/hmd/ss-2.png",
        alt: "HMD — iConnect social feed with live journal club session and medical news",
        caption: "iConnect — live journal club sessions, breaking medical news, and peer updates in one feed",
      },
      {
        src: "/images/portfolio/hmd/ss-3.png",
        alt: "HMD — iConnect Network: physician connection cards with specialty and verification badges",
        caption: "iConnect Network — connect and follow verified physicians across every specialty worldwide",
      },
      {
        src: "/images/portfolio/hmd/ss-7.png",
        alt: "HMD — ResumePro: AI-powered physician CV builder with clinical experience and publications",
        caption: "ResumePro — AI-powered CV builder designed specifically for medical students, residents, and physicians",
      },
    ],
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
    featured: false,
    liveUrl: "https://herrubyapp.vercel.app",
    image: "/images/portfolio/herruby-app.png",
    gallery: [
      {
        src: "/images/portfolio/herruby-app/ss-1.png",
        alt: "Herruby — homepage hero: Sustain your energy, confidence & performance through midlife",
        caption: "Built for Canadian women · PIPEDA compliant — sustain your energy, confidence & performance through midlife",
      },
      {
        src: "/images/portfolio/herruby-app/ss-2.png",
        alt: "Herruby — social proof: 2,400+ women helped, 94% report more energy, 4.9 avg rating",
        caption: "2,400+ women helped · 94% report more energy · 4.9 average rating",
      },
      {
        src: "/images/portfolio/herruby-app/ss-3.png",
        alt: "Herruby — Four Pillars: programmes, community, expert knowledge, wellness wallet",
        caption: "Four Pillars — programmes, community, expert knowledge, and a wellness wallet",
      },
      {
        src: "/images/portfolio/herruby-app/ss-4.png",
        alt: "Herruby — wellness programmes and features",
        caption: "Holistic programmes designed around the midlife woman's specific needs",
      },
      {
        src: "/images/portfolio/herruby-app/ss-5.png",
        alt: "Herruby — expert content and knowledge hub",
        caption: "Expert-backed content for every stage of the midlife journey",
      },
      {
        src: "/images/portfolio/herruby-app/ss-6.png",
        alt: "Herruby — community and peer connection features",
        caption: "A supportive community where women navigate midlife together",
      },
      {
        src: "/images/portfolio/herruby-app/ss-7.png",
        alt: "Herruby — employer and wellness wallet feature",
        caption: "Wellness wallet — funded by you or your employer",
      },
      {
        src: "/images/portfolio/herruby-app/ss-8.png",
        alt: "Herruby — sign up and onboarding flow",
        caption: "PIPEDA-compliant onboarding built with privacy-first data architecture",
      },
      {
        src: "/images/portfolio/herruby-app/ss-9.png",
        alt: "Herruby — personal wellness tracking dashboard",
        caption: "Personalized tracking tools that adapt to each woman's life stage",
      },
      {
        src: "/images/portfolio/herruby-app/ss-10.png",
        alt: "Herruby — full app overview and features",
        caption: "The first wellness platform purpose-built for Canadian women navigating midlife",
      },
    ],
  },
  {
    slug: "zenscroll",
    title: "ZenScroll",
    category: "Web",
    tags: ["Digital Wellness", "Web Design", "Mindfulness"],
    shortDesc: "Marketing website for the app that makes you earn your scroll — one breath at a time.",
    description:
      "ZenScroll is a digital wellness platform and marketing website for an app that balances social media with meditation. Every minute of mindfulness practice earns two to six minutes of scroll time — the ratio is yours to set, but the pause is non-negotiable. We designed and built the full website to communicate this concept with clarity, calm, and conviction.",
    problem:
      "ZenScroll had a genuinely novel product idea — earning scroll time through meditation — but needed a website that could explain an unfamiliar mechanic quickly, build trust with skeptical users, and convert visitors into app downloads without feeling preachy or restrictive.",
    solution:
      "We crafted a dark, immersive marketing website built around a single, powerful message: breathe first, then the feed opens. The design language — deep browns, nature photography, warm typography — reinforces the meditative purpose of the product. The copy leads with the mechanic, not the mission, making it immediately legible to anyone who has ever doomscrolled.",
    results: [
      "Conversion-focused landing page driving App Store and Google Play downloads",
      "Earn-to-scroll mechanic communicated clearly through structured 3-step flow section",
      "Testimonials section ('Voices') builds social proof with real user outcomes",
      "Dark, calming aesthetic that matches the product's meditative identity",
      "CTA section — 'Begin with a single breath' — drives installs with zero friction",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    gradientFrom: "#7c2d12",
    gradientTo: "#92400e",
    featured: false,
    liveUrl: "https://www.zenscrollapp.com",
    image: "/images/portfolio/zenscroll/ss-1.png",
    gallery: [
      {
        src: "/images/portfolio/zenscroll/ss-1.png",
        alt: "ZenScroll — Hero section: Scrolling, earned one breath at a time",
        caption: "Hero — \"Scrolling, earned one breath at a time.\" Every minute of meditation earns 2–6 minutes of scroll. App Store & Google Play CTAs above the fold.",
        span: "wide",
      },
      {
        src: "/images/portfolio/zenscroll/ss-2.png",
        alt: "ZenScroll — How it works: Breathe first. Then the feed opens.",
        caption: "How it works — \"Breathe first. Then the feed opens.\" Three-step flow: choose apps to balance → sit for a guided session → scroll with intention.",
      },
      {
        src: "/images/portfolio/zenscroll/ss-3.png",
        alt: "ZenScroll — Benefits: A calmer relationship with the phone in your hand",
        caption: "Benefits — \"A calmer relationship with the phone in your hand.\" Sharper focus · Quieter mind · Better sleep — illustrated with nature photography.",
      },
      {
        src: "/images/portfolio/zenscroll/ss-4.png",
        alt: "ZenScroll — Voices section: Small practice. Surprising shifts.",
        caption: "Voices — \"Small practice. Surprising shifts.\" Real user stories: Maya R. (47 days), Daniel K. (3 months), Priya S. (5 months, screen time down 62%).",
      },
      {
        src: "/images/portfolio/zenscroll/ss-5.png",
        alt: "ZenScroll — CTA: Begin with a single breath",
        caption: "CTA — \"Begin with a single breath.\" Aerial forest visual reinforces calm. Free to start, no ads, no dark patterns — App Store & Google Play download buttons.",
      },
    ],
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
    featured: true,
    liveUrl: "https://expertvillagemedia.vercel.app",
    image: "/images/portfolio/expert-village-media.png",
    gallery: [
      {
        src: "/images/portfolio/expert-village-media/ss-1.png",
        alt: "Expert Village Media — homepage: We Are The Leading Shopify Development Company",
        caption: "Shopify Select Partner Agency · Google · Upwork · Shopify Certified Expert",
        span: "wide",
      },
      {
        src: "/images/portfolio/expert-village-media/ss-2.png",
        alt: "Expert Village Media — services section",
        caption: "Custom theme design, app integration, store migration, and performance optimization",
      },
      {
        src: "/images/portfolio/expert-village-media/ss-3.png",
        alt: "Expert Village Media — portfolio of client Shopify stores",
        caption: "High-converting Shopify stores built for fashion, beauty, electronics, and home décor brands",
      },
      {
        src: "/images/portfolio/expert-village-media/ss-4.png",
        alt: "Expert Village Media — client results and case studies",
        caption: "Case studies and results converting visitors into qualified discovery calls",
      },
      {
        src: "/images/portfolio/expert-village-media/ss-5.png",
        alt: "Expert Village Media — services detail page",
        caption: "End-to-end Shopify services from design and development to launch and growth",
      },
      {
        src: "/images/portfolio/expert-village-media/ss-6.png",
        alt: "Expert Village Media — partner credentials and certifications",
        caption: "Backed by Shopify, Google, and Upwork credentials that establish instant authority",
      },
      {
        src: "/images/portfolio/expert-village-media/ss-7.png",
        alt: "Expert Village Media — schedule a call and contact flow",
        caption: "Frictionless schedule-a-call flow converting high-intent visitors into booked discovery calls",
      },
      {
        src: "/images/portfolio/expert-village-media/ss-8.png",
        alt: "Expert Village Media — resources and blog section",
        caption: "SEO-optimized content strategy driving organic discovery from Shopify-seeking brands",
      },
    ],
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
    image: "/images/portfolio/torqron.png",
    gallery: [
      {
        src: "/images/portfolio/torqron/ss-1.png",
        alt: "Torqron — homepage hero: Industrial Excellence for Global Petrochemical Operations",
        caption: "Trusted by leading petrochemical plants — 20+ years of engineering expertise across 12 countries",
        span: "wide",
      },
      {
        src: "/images/portfolio/torqron/ss-2.png",
        alt: "Torqron — Why Procurement Teams Choose Torqron: 6 key differentiators",
        caption: "Market-atypical delivery speed · OEM-grade quality · Custom-engineering capability · Integrated supply chain",
      },
      {
        src: "/images/portfolio/torqron/ss-3.png",
        alt: "Torqron — products catalogue: granulation tools, polymer additives, spare parts",
        caption: "Precision granulation tools, advanced polymer additives, and mission-critical spare parts",
      },
      {
        src: "/images/portfolio/torqron/ss-4.png",
        alt: "Torqron — applications across petrochemical sectors",
        caption: "Industrial applications supporting 28 major facilities across global petrochemical operations",
      },
      {
        src: "/images/portfolio/torqron/ss-5.png",
        alt: "Torqron — services and integrated supply chain solutions",
        caption: "Integrated supply chain solutions with dependable delivery and OEM-grade quality",
      },
      {
        src: "/images/portfolio/torqron/ss-6.png",
        alt: "Torqron — Contact / RFQ flow for enterprise procurement teams",
        caption: "Enterprise RFQ flow built for procurement teams — always on time, always on spec",
      },
    ],
  },
  {
    slug: "hoursheets",
    title: "HourSheets",
    category: "SaaS",
    tags: ["SaaS", "Time Tracking", "Project Management"],
    shortDesc:
      "Time-tracking and project management built for small architecture firms.",
    description:
      "HourSheets is a clean, focused workspace for small architectural firms to log time, monitor project progress, and keep the studio running on schedule. Administrators manage projects, the team directory and firm-wide reports, while team members log their own hours against the projects they contribute to.",
    problem:
      "Small architecture studios bleed billable time. Hours get tracked in scattered spreadsheets, project budgets drift without anyone noticing, and partners have no real-time view of where staff time is actually going — making it hard to price work, catch overruns, or bill accurately.",
    solution:
      "We built HourSheets as an OpenAPI-first web app with a fast, keyboard-friendly interface. Every hour is logged against a project and an employee, dashboards compute firm-wide aggregates directly in SQL, and admins get budget-vs-spent tracking, a staged approval workflow, daily task assignment, and per-project and per-employee breakdowns — all in one drafting-paper-clean UI.",
    results: [
      "Firm-wide dashboard: active projects, staff count and hours logged this week/month at a glance",
      "Per-project budget vs. spent vs. remaining — with fee, cost and profit tracked automatically",
      "Staged project-approval workflow with nested sub-tasks and per-stage assignees",
      "Filterable time log and role-based access (admin vs. team member)",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "TanStack Query",
    ],
    gradientFrom: "#f59e0b",
    gradientTo: "#b45309",
    featured: false,
    liveUrl: "https://www.hoursheets.org",
    image: "/images/portfolio/hoursheets.jpg",
    gallery: [
      {
        src: "/images/portfolio/hoursheets/ss-1.png",
        alt: "HourSheets — Projects list with budget, spent, remaining, fee, cost and profit per project",
        caption:
          "Every project tracked from budget to profit — spent, remaining, fee, cost and margin at a glance",
      },
      {
        src: "/images/portfolio/hoursheets/ss-2.png",
        alt: "HourSheets — Daily Task Assignment view with status, assignee, priority and deadline per project",
        caption:
          "Assign today's work to the team — status, assignee, priority and deadline per project",
      },
      {
        src: "/images/portfolio/hoursheets/ss-3.png",
        alt: "HourSheets — Project Approval Process with staged progress and nested sub-tasks",
        caption:
          "A staged approval workflow with nested sub-tasks and per-stage assignees",
      },
    ],
  },
  {
    slug: "buttercream-bus",
    title: "Buttercream Bus",
    category: "Web",
    tags: ["Web", "E-Commerce", "Food & Beverage"],
    shortDesc:
      "A playful web experience for a mobile bakery — live truck tracking, pre-ordering, event booking and an AI cake designer.",
    description:
      "Buttercream Bus is 'Fresh Baked Dreams on Wheels' — a mobile bakery food truck. We built a warm, playful website that lets customers track the wandering oven in real time, pre-order signature treats to skip the line, book the bus for weddings and events, sign up for baking classes, and even generate custom cake concepts with an AI cake designer.",
    problem:
      "A food truck's biggest challenge is that customers never know where it is. On top of that, walk-up lines cost sales, event bookings lived in DMs and spreadsheets, and there was no way to showcase the menu or capture demand between stops.",
    solution:
      "We designed and shipped a single friendly hub for the whole business: real-time GPS truck tracking with a neighborhood voting system to unlock pop-up stops, a pre-order 'Baker's Box' flow, an events booking calendar with availability checks, a classes catalog, and an AI 'Cake Architect' that turns a prompt into visual cake concepts — all wrapped in the brand's warm buttercream palette.",
    results: [
      "Real-time bus tracking with 'Get Notified' alerts so fans never miss a stop",
      "Pre-order flow that lets customers skip the line and lock in favorites",
      "Self-serve event booking for weddings, birthdays and corporate catering",
      "AI Cake Architect that generates custom cake design concepts on demand",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Lovable"],
    gradientFrom: "#f59e0b",
    gradientTo: "#d97706",
    featured: false,
    liveUrl: "https://thebuttercreambus.shop",
    image: "/images/portfolio/buttercream-bus.jpg",
    gallery: [
      {
        src: "/images/portfolio/buttercream-bus/ss-1.png",
        alt: "Buttercream Bus — homepage hero: Fresh Baked Dreams on Wheels with live 'Now at' location",
        caption:
          "Fresh Baked Dreams on Wheels — track the wandering oven, pre-order, and book the bus, all from the hero",
      },
      {
        src: "/images/portfolio/buttercream-bus/cupcakes.jpg",
        alt: "Buttercream Bus — gourmet cupcakes",
        caption: "Gourmet cupcakes — one of four signature treats on the menu",
      },
      {
        src: "/images/portfolio/buttercream-bus/cinnamon-rolls.jpg",
        alt: "Buttercream Bus — fresh cinnamon rolls",
        caption: "Fresh-baked cinnamon rolls, available for pre-order in the Baker's Box",
      },
      {
        src: "/images/portfolio/buttercream-bus/cookies.jpg",
        alt: "Buttercream Bus — jumbo cookies",
        caption: "Jumbo cookies — bake-fresh favorites",
      },
      {
        src: "/images/portfolio/buttercream-bus/wedding-cake.jpg",
        alt: "Buttercream Bus — custom wedding cake for event bookings",
        caption: "Custom cakes for weddings and events, bookable straight from the site",
      },
    ],
  },
];

export const categories = ["All", "Web", "Mobile App", "SaaS", "AI"] as const;
export type Category = (typeof categories)[number];
