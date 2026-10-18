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
  imagePosition?: string;
  gallery?: GalleryImage[];
};

export const projects: Project[] = [
  {
    slug: "firmsledger",
    title: "FirmsLedger",
    category: "Web",
    tags: ["B2B Directory", "Programmatic SEO", "Manufacturing"],
    shortDesc:
      "A US manufacturer directory built for programmatic SEO — browse verified manufacturers by category and state.",
    description:
      "FirmsLedger is our own product: a US-only, SEO-first directory where buyers — procurement managers, engineers and OEMs — browse manufacturers by category and state, and manufacturers get a free profile page that brings in leads. It started as a general business directory and was rebuilt on the Next.js App Router as a manufacturing-only directory with a Postgres backend.",
    problem:
      "Buyers sourcing US manufacturers rely on fragmented directories, trade-show contacts and generic web search. A directory that wants to win that traffic needs real, crawlable landing pages for every category and state — and has to stay fast, indexable and affordable as the company count grows into the hundreds of thousands.",
    solution:
      "We built category, state and subcategory pages as bounded, enumerable routes, and company profiles as on-demand ISR pages that only become indexable once approved and filled in. Search queries are canonicalized so \"top 10\" and \"best\" variants don't create duplicate pages. Manufacturers can list themselves through a free public form or an invite link, a single-operator admin panel handles approvals, and an offline Python + Playwright pipeline seeds company data with fuzzy duplicate detection. Caching and ISR intervals were tuned so the serverless Postgres database can actually scale to zero between visits.",
    results: [
      "Live at firmsledger.com, covering all 50 US states",
      "Category × state × subcategory landing pages built for programmatic SEO",
      "Free self-serve listing form plus invite-link onboarding with admin approval",
      "Profiles only indexed once approved and described — kept in sync with the sitemap",
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Drizzle ORM",
      "Neon Postgres",
      "TanStack Query",
      "Resend",
      "Cloudflare R2",
      "Python",
      "Playwright",
      "Vercel",
    ],
    gradientFrom: "#ca8a04",
    gradientTo: "#1e293b",
    featured: true,
    liveUrl: "https://www.firmsledger.com",
    image: "/images/portfolio/firmsledger/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/firmsledger/mockup-1.webp",
        alt: "FirmsLedger on laptop and phone: Zero Paid Rankings",
        caption: "An independent manufacturer directory with zero paid placements",
      },
      {
        src: "/images/portfolio/firmsledger/mockup-2.webp",
        alt: "FirmsLedger homepage: find top manufacturers across the USA",
        caption: "Search verified US manufacturers by category and state",
      },
      {
        src: "/images/portfolio/firmsledger/mockup-3.webp",
        alt: "FirmsLedger: connecting you with America's leading manufacturers",
        caption: "Why FirmsLedger: verified domestic operations and capability-level sourcing",
      },
      {
        src: "/images/portfolio/firmsledger/mockup-4.webp",
        alt: "FirmsLedger: build a more resilient supply chain",
        caption: "Built for buyers who want a more resilient, domestic supply chain",
      },
      {
        src: "/images/portfolio/firmsledger/mockup-5.webp",
        alt: "FirmsLedger: how it works",
        caption: "How it works: discover capabilities, evaluate suppliers, contact them directly",
      },
      {
        src: "/images/portfolio/firmsledger/mockup-6.webp",
        alt: "FirmsLedger: get your business in front of buyers",
        caption: "Free listings put manufacturers in front of buyers",
      },
    ],
  },
  {
    slug: "goswiftfund",
    title: "GoSwiftFund",
    category: "Web",
    tags: ["Fintech", "Business Funding", "Marketplace"],
    shortDesc:
      "A business-funding marketplace — apply once, link your bank, and get matched with a lending partner.",
    description:
      "GoSwiftFund is a business-funding marketplace for small-business owners. It isn't a lender — it's the intake, qualification and routing layer in front of lenders. Owners pick a funding product, apply once through a guided wizard, link their business bank account, and their application is stored securely and routed to the right lending partner.",
    problem:
      "A funding broker has to collect highly sensitive data — SSN, EIN, revenue, bank access — in a way that survives a compliance review, decide which lending partner each applicant should go to, and do it while partner agreements and legal copy are still being finalized.",
    solution:
      "We built a Next.js 16 marketing site and a multi-product application wizard where each product (Instant, Merchant Cash Advance, Commercial and SBA) validates its own fields with a shared Zod schema on client and server. Business bank linking runs through Plaid Link, FCRA soft-pull and TCPA contact consent are recorded with a timestamp and disclosure version, and SSNs and bank tokens are encrypted at rest with AES-256-GCM. A rate-limited submission API feeds a lender-routing engine that picks a primary partner and fallbacks from credit band, revenue, amount and purpose, and stores the decision for follow-up. Dedicated SBA and revenue-based funding pages and an English/Spanish toggle round it out.",
    results: [
      "Live at goswiftfund.com with a product-specific application flow",
      "Lighthouse mobile accessibility raised from 92 to 100",
      "SSNs and bank tokens encrypted at rest with AES-256-GCM",
      "End-to-end test passed: Plaid sandbox bank link → SBA application → routed and stored",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Plaid", "Zod", "Vercel"],
    gradientFrom: "#16a34a",
    gradientTo: "#1e3a8a",
    featured: true,
    liveUrl: "https://goswiftfund.com",
    image: "/images/portfolio/goswiftfund/home-hero.webp",
    gallery: [
      {
        src: "/images/portfolio/goswiftfund/home-hero.webp",
        alt: "GoSwiftFund — homepage hero with a funding-amount slider and estimated payment",
        caption: "Large numeric hero with a funding-amount slider and estimated payment",
        span: "wide",
      },
      {
        src: "/images/portfolio/goswiftfund/dashboard-preview.webp",
        alt: "GoSwiftFund — Your Funding Options, Clearly Presented: customer dashboard preview",
        caption: "Customer dashboard preview — application status, bank linking and next steps in one place",
      },
      {
        src: "/images/portfolio/goswiftfund/funding-programs.webp",
        alt: "GoSwiftFund — funding program cards: Instant Loans, Merchant Cash Advance, Commercial Loans & Line of Credit",
        caption: "Funding program cards, each with its own amount range and application flow",
      },
    ],
  },
  {
    slug: "sawa",
    title: "Sawa",
    category: "Web",
    tags: ["Bilingual", "Arabic / RTL", "Startup"],
    shortDesc:
      "A bilingual English/Arabic landing page for a Saudi shared-commuting startup, built RTL-ready from day one.",
    description:
      "Sawa (سوا) is a Jeddah-based shared-commuting startup. Instead of on-demand rides, it organises fixed, recurring routes: drivers publish daily routes, employees join on monthly plans, and companies sign corporate commute partnerships. We built its main marketing page in English and Arabic on a single codebase.",
    problem:
      "Sawa needed one page that speaks to two audiences — commuters and companies — and works just as well in English as in right-to-left Arabic. The source material was an investor pitch deck that mixed public brand content with investor-only data that must not be published.",
    solution:
      "We built the page on Next.js 16 and Tailwind v4 with locale routes for /en and /ar, using only CSS logical properties so the layout mirrors cleanly in RTL. All copy lives in per-language dictionaries, so the Arabic milestone was a content drop rather than a rebuild. Arabic uses IBM Plex Sans Arabic and never falls back to a Latin font. A corporate enquiry form sends a branded HTML email through Resend, and each language has its own SEO metadata, hreflang alternates and share image.",
    results: [
      "Bilingual EN/AR with full RTL layout from one codebase",
      "Arabic version shipped as a dictionary drop — no refactor needed",
      "Corporate enquiries delivered as a branded HTML email via Resend",
      "Per-language SEO: canonical, hreflang and separate share images",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Resend", "Vercel"],
    gradientFrom: "#8ba653",
    gradientTo: "#0b251e",
    featured: false,
    image: "/images/portfolio/sawa/hero-english.webp",
    gallery: [
      {
        src: "/images/portfolio/sawa/hero-english.webp",
        alt: "Sawa — English hero: Shared Routes. Smarter Commutes. with a phone mockup showing a sample route",
        caption: "Shared Routes. Smarter Commutes. — English hero with a sample-route phone mockup",
        span: "wide",
      },
      {
        src: "/images/portfolio/sawa/hero-arabic.webp",
        alt: "Sawa — Arabic hero in a mirrored right-to-left layout",
        caption: "The same page in Arabic — fully mirrored RTL layout with IBM Plex Sans Arabic",
      },
      {
        src: "/images/portfolio/sawa/how-it-works.webp",
        alt: "Sawa — How it works: A daily commuter network, not on-demand rides, in three steps",
        caption: "How it works — three steps from workplace matching to corporate partnerships",
      },
      {
        src: "/images/portfolio/sawa/share-image-arabic.webp",
        alt: "Sawa — Arabic social share image",
        caption: "Separate share images per language for clean social previews",
      },
    ],
  },
  {
    slug: "portland-self-defense-crm",
    title: "Portland Academy of Self-Defense — CRM Integration",
    category: "Automation",
    tags: ["GoHighLevel", "CRM Integration", "Lead Capture"],
    shortDesc:
      "Fixed a silent lead leak and rebuilt the website-to-GoHighLevel integration so every enquiry lands in the CRM, sourced and tagged.",
    description:
      "Portland Academy of Self-Defense is a martial-arts school serving the Portland, Oregon metro. Their existing custom PHP website feeds a sales pipeline in GoHighLevel. We were brought in to fix the lead-capture path between the site and the CRM — not to build the website — so that every enquiry reaches GoHighLevel with the right source, tags and notes.",
    problem:
      "Leads were quietly being lost. The CRM token in production had been revoked, so every website lead was saved and emailed but never reached GoHighLevel — while visitors still saw a thank-you page. The enquiry form also failed intermittently with \"Submission expired or invalid\", free-text and workshop fields were dropped before reaching anyone, and a repeat enquiry could wipe a contact's earlier program tags.",
    solution:
      "We traced the failure to a 401 from GoHighLevel, replaced the token and verified the live API. We then rewrote the integration as one shared, non-blocking function: it finds existing contacts by email or phone, keeps the original lead source, merges tags instead of replacing them, and adds a readable note with the prospect's program interest and message. Each of the four lead forms maps to its own GoHighLevel source and tags. The form's CSRF check was changed to a ring of single-use tokens, so a second tab or debugging session no longer breaks submissions.",
    results: [
      "Website leads reach GoHighLevel again — verified on the live contacts API",
      "Four lead forms each mapped to their own GoHighLevel source and tags",
      "Repeat enquiries keep the original source and merge tags into one contact",
      "Messages and workshop details now captured in the CRM contact note",
      "\"Submission expired\" form errors fixed without weakening CSRF protection",
    ],
    technologies: ["PHP", "MySQL", "GoHighLevel API", "cURL", "reCAPTCHA v3"],
    gradientFrom: "#f59e0b",
    gradientTo: "#111827",
    featured: false,
    image: "/images/portfolio/portland-self-defense-crm/lead-form.webp",
    gallery: [
      {
        src: "/images/portfolio/portland-self-defense-crm/lead-form.webp",
        alt: "Portland Academy of Self-Defense — Ready To Get Started? lead form",
        caption: "The shared lead form — every submission now upserts a sourced, tagged GoHighLevel contact",
        span: "wide",
      },
      {
        src: "/images/portfolio/portland-self-defense-crm/homepage.webp",
        alt: "Portland Academy of Self-Defense — homepage with Get Started call to action",
        caption: "The client's existing site — Get Started CTAs feed the Website Discovery form",
      },
      {
        src: "/images/portfolio/portland-self-defense-crm/programs.webp",
        alt: "Portland Academy of Self-Defense — Martial Arts and 12-Week Self-Defense Course program cards",
        caption: "Program pages like the 12-Week Course each route to their own CRM source and tag",
      },
    ],
  },
  {
    slug: "island-traffic-defense",
    title: "Island Traffic Defense",
    category: "Web",
    tags: ["Web", "Legal", "Local Business"],
    shortDesc:
      "A conversion-focused website for a Long Island traffic-defense attorney serving Nassau and Suffolk County.",
    description:
      "Island Traffic Defense is a single-page marketing site for a Long Island attorney who handles traffic-ticket and moving-violation cases across Nassau and Suffolk County, New York. It's built around one audience — drivers who just got a ticket — and one action: call or schedule a consultation.",
    problem:
      "Drivers with a ticket have a short window to decide what to do, have usually never hired a traffic lawyer, and underestimate what a conviction really costs through points and higher insurance. The site had to build trust fast, make contact effortless on a phone, and reach the area's Spanish-speaking drivers.",
    solution:
      "We built a fast, dark-themed single page in plain HTML, CSS and JavaScript: a locality-first hero, three value-proposition cards, six practice-area cards, a section on the multi-year insurance cost of a conviction, and a local-court expertise section naming the Nassau and Suffolk County traffic agencies. A tap-to-call button stays in the header, call-to-action pairs repeat down the page, and Spanish-language support is called out in the hero itself.",
    results: [
      "Live on Vercel — responsive from desktop card grids to a single mobile column",
      "Tap-to-call header button visible at every scroll position",
      "Spanish-language support called out in the hero",
      "Local-SEO copy built around Nassau, Suffolk and Long Island",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Vercel"],
    gradientFrom: "#3b82f6",
    gradientTo: "#0f172a",
    featured: false,
    liveUrl: "https://island-traffic-defense.vercel.app",
    image: "/images/portfolio/island-traffic-defense/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/island-traffic-defense/mockup-1.webp",
        alt: "Island Traffic Defense homepage hero: Long Island traffic defense",
        caption: "Locality-first hero with tap-to-call and Spanish-language support up front",
        span: "wide",
      },
      {
        src: "/images/portfolio/island-traffic-defense/mockup-2.webp",
        alt: "Island Traffic Defense: Why Long Island Drivers Choose Island Traffic Defense",
        caption: "Three pillars: local court knowledge, lower insurance premiums, bilingual support",
      },
      {
        src: "/images/portfolio/island-traffic-defense/mockup-3.webp",
        alt: "Island Traffic Defense practice areas from speeding tickets to CDL violations",
        caption: "Six practice areas, each with a plain-English explainer",
      },
      {
        src: "/images/portfolio/island-traffic-defense/mockup-4.webp",
        alt: "Island Traffic Defense: A Conviction Follows You for Years on Your Insurance",
        caption: "The insurance-cost argument, with its own call to action",
      },
      {
        src: "/images/portfolio/island-traffic-defense/mockup-5.webp",
        alt: "Island Traffic Defense contact section: Ready to Fight Your Ticket?",
        caption: "Contact section: phone, email and office, plus a schedule-a-consultation button",
      },
    ],
  },
  {
    slug: "tiancheng-development-group",
    title: "TianCheng Development Group",
    category: "Web",
    tags: ["Web", "Real Estate", "B2B"],
    shortDesc:
      "Corporate site for an integrated real estate development group, from first drawing to finished building.",
    description:
      "TianCheng Development Group is a real estate development company that carries projects end-to-end — feasibility, design, entitlements, construction and delivery — under one accountable team. We built a corporate website that presents their services, project portfolio, client roster and a direct line for new site and building inquiries.",
    problem:
      "Property owners and investors evaluating a developer want proof of scale and process before they hand over a site. TianCheng needed a credible web presence that laid out their full service range, showcased completed projects, and named the caliber of clients they'd already delivered for.",
    solution:
      "We built a clean, dark-toned corporate site anchored by a full-bleed city skyline hero, a services section walking through the feasibility-to-delivery process, a projects showcase with individual project pages, and a clients page naming enterprise partners. A contact page with an embedded map and inquiry form gives prospects a direct path to reach the team.",
    results: [
      "Services section framing the full feasibility-to-delivery development process",
      "Individual project pages showcasing completed developments like Aura Boutique Hotel & Lounge",
      "Client roster naming enterprise partners including Hilton, Marriott and Chevron",
      "Contact page with embedded map and inquiry form for new site and building leads",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    gradientFrom: "#1e293b",
    gradientTo: "#334155",
    featured: false,
    liveUrl: "https://cdieng.vercel.app",
    image: "/images/portfolio/tiancheng/ss-1.png",
    gallery: [
      {
        src: "/images/portfolio/tiancheng/ss-1.png",
        alt: "TianCheng Development Group — homepage hero: Integrated real estate development, from first drawing to finished building",
        caption: "Full-bleed skyline hero — integrated real estate development, from first drawing to finished building",
        span: "wide",
      },
      {
        src: "/images/portfolio/tiancheng/ss-2.png",
        alt: "TianCheng Development Group — Discover Our Services section over a construction site photo",
        caption: "Discover Our Services — feasibility to delivery under one accountable team",
      },
      {
        src: "/images/portfolio/tiancheng/ss-5.png",
        alt: "TianCheng Development Group — Aura Boutique Hotel & Lounge project page, Santa Monica CA",
        caption: "Project pages — Aura Boutique Hotel & Lounge, a premium 45-room boutique hotel and dining lounge",
      },
      {
        src: "/images/portfolio/tiancheng/ss-4.png",
        alt: "TianCheng Development Group — Clients page with Hilton, Marriott, Denny's, Wendy's, Chevron and Fender logos",
        caption: "Clients page — enterprise partners including Hilton, Marriott, Chevron and Fender",
      },
      {
        src: "/images/portfolio/tiancheng/ss-3.png",
        alt: "TianCheng Development Group — Contact page with embedded map and inquiry form",
        caption: "Contact page with embedded map and a direct inquiry form for new site and building leads",
      },
    ],
  },
  {
    slug: "wide-eyed-giant",
    title: "Wide Eyed Giant",
    category: "Web",
    tags: ["Web", "Food & Recipes", "Editorial"],
    shortDesc:
      "An editorial recipe website with a warm, magazine-style design across breakfast, mains and desserts.",
    description:
      "Wide Eyed Giant is a seasonal, high-protein recipe website built around creator Kelsey's food content. We designed and built an editorial-style site — a warm cream homepage for browsing, bold black category pages for structure, and a searchable recipe finder — that turns her recipes into a cohesive, magazine-quality experience.",
    problem:
      "Recipe content spread across social media is easy to lose and hard to browse. Kelsey needed a dedicated home for her seasonal, high-protein recipes that felt as considered and beautiful as the food itself, with an easy way for visitors to find recipes by category or craving.",
    solution:
      "We built a two-tone editorial site: a light, warm homepage anchored by a fresh-post hero and category navigation, contrasting black category and search pages for visual rhythm, and a keyword-driven recipe finder across breakfast, mains, snacks, desserts and sides. An about page introduces Kelsey and the philosophy behind the recipes — seasonal, high protein, and beautiful enough to look at before you eat it.",
    results: [
      "Editorial homepage hero showcasing the latest recipe with a warm, magazine feel",
      "Category pages (breakfast, mains, desserts) with a striking light/dark contrast",
      "Keyword-searchable recipe finder across five categories",
      "About page building a personal connection with the creator behind the recipes",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    gradientFrom: "#B8860B",
    gradientTo: "#1a1a1a",
    featured: false,
    liveUrl: "https://wideeyedgiant.com",
    image: "/images/portfolio/wide-eyed-giant/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/wide-eyed-giant/mockup-1.webp",
        alt: "Wide Eyed Giant homepage hero: High Protein Cottage Cheese Pancakes with Raspberry Whip and Berry Compote",
        caption: "Editorial homepage hero: a fresh post spotlighting a seasonal, high-protein recipe",
        span: "wide",
      },
      {
        src: "/images/portfolio/wide-eyed-giant/mockup-2.webp",
        alt: "Wide Eyed Giant recipe search across the blog",
        caption: "Keyword-searchable recipe finder across every post",
      },
      {
        src: "/images/portfolio/wide-eyed-giant/mockup-3.webp",
        alt: "Wide Eyed Giant Breakfast category page",
        caption: "Category pages: Breakfast recipes at a glance",
      },
      {
        src: "/images/portfolio/wide-eyed-giant/mockup-4.webp",
        alt: "Wide Eyed Giant navigation with the Mains dropdown open",
        caption: "Magazine-style navigation with Mains, Lunch, Dinner, Salads and Sides",
      },
    ],
  },
  {
    slug: "dialogix",
    title: "Dialogix",
    category: "AI",
    tags: ["AI", "Sales Automation", "SaaS"],
    shortDesc:
      "An AI sales-automation platform that calls, emails, texts and messages prospects in 6 languages — 24/7.",
    description:
      "Dialogix is an AI-powered sales command center — 'Your Sales Team Never Sleeps.' It deploys AI agents that call, email, text and message prospects across channels in six languages, finding leads, booking demos and nurturing deals around the clock so founders and sales teams can focus on closing.",
    problem:
      "Scaling outbound sales usually means hiring and managing more SDRs — expensive, slow, and hard to keep consistent across channels and time zones. Manual prospecting caps how many leads a team can reach, and follow-up routinely falls through the cracks.",
    solution:
      "We built Dialogix as an AI sales command center that runs outreach autonomously across phone, email, SMS and LinkedIn in six languages. AI voice agents qualify leads on calls, behavior-adaptive email and SMS sequences follow up intelligently, and campaigns run 24/7 — with tiered plans ranging from self-serve SaaS to a fully managed revenue-cycle service.",
    results: [
      "AI agents across four channels — phone calls, email, SMS and LinkedIn",
      "Multilingual outreach in 6 languages (English, Spanish, Mandarin, French, Portuguese, Italian)",
      "24/7 autonomous prospecting, demo booking and intelligent follow-up",
      "Flexible plans from $97/mo self-serve to a fully managed revenue-cycle service",
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "AI Voice Agents"],
    gradientFrom: "#14b8a6",
    gradientTo: "#0891b2",
    featured: false,
    liveUrl: "https://mydialogix.com",
    image: "/images/portfolio/dialogix.png",
  },
  {
    slug: "cyber7",
    title: "Cyber7 MDR Alerts",
    category: "Mobile App",
    tags: ["Mobile App", "Cybersecurity", "MDR"],
    shortDesc:
      "Real-time managed-detection-and-response security alerts, pushed straight to your phone.",
    description:
      "Cyber7 MDR Alerts is a mobile app for an Australian managed security provider that turns critical security incidents into instant push notifications. It pulls High and Critical tickets from ConnectWise (fed by Rapid7 threat detection) and lets analysts and clients view, acknowledge, resolve and annotate incidents from their phone — with role-based access so each client sees only their own company's alerts.",
    problem:
      "Managed-detection incidents live inside ConnectWise ticketing, where they're easy to miss. SOC analysts and their clients need immediate, prioritized, mobile visibility into critical threats — not another desktop tool they have to keep checking.",
    solution:
      "We built a dedicated mobile app with a Node/Express + MongoDB backend that continuously polls ConnectWise for High/Critical tickets and dispatches tone-differentiated push notifications. Users triage incidents in-app — acknowledge, resolve, reprioritize and add notes — and every change syncs back to ConnectWise. Admins see all clients; each client sees only their own alerts.",
    results: [
      "Real-time push alerts for High/Critical incidents with selectable alert tones",
      "In-app triage — acknowledge, resolve, reprioritize and annotate, synced to ConnectWise",
      "Role-based access: SOC admins see all clients, clients see only their own",
      "ConnectWise + Rapid7 detection pipeline surfaced on mobile within seconds",
    ],
    technologies: ["React Native", "Expo", "Node.js", "Express", "MongoDB", "ConnectWise API"],
    gradientFrom: "#ef4444",
    gradientTo: "#f97316",
    featured: false,
    image: "/images/portfolio/cyber7/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/cyber7/mockup-1.webp",
        alt: "CyberApp dashboard with critical alerts, high alerts and recent alerts",
        caption: "Dashboard: alert counts by severity and the latest alerts",
        span: "wide",
      },
      {
        src: "/images/portfolio/cyber7/mockup-2.webp",
        alt: "CyberApp alerts list with acknowledge and resolve actions",
        caption: "Alerts: filter by status, then acknowledge or resolve",
      },
      {
        src: "/images/portfolio/cyber7/mockup-3.webp",
        alt: "CyberApp portal selection: admin or employee",
        caption: "Choose a portal: admin or employee",
      },
      {
        src: "/images/portfolio/cyber7/mockup-4.webp",
        alt: "CyberApp admin sign-in",
        caption: "Admin sign-in",
      },
      {
        src: "/images/portfolio/cyber7/mockup-5.webp",
        alt: "CyberApp notifications with acknowledged and resolved alerts",
        caption: "Notifications with acknowledge and resolve status",
      },
      {
        src: "/images/portfolio/cyber7/mockup-6.webp",
        alt: "CyberApp settings",
        caption: "Settings: alert tone, push notifications, auto refresh, dark mode",
      },
    ],
  },
  {
    slug: "emigo",
    title: "EmiGo",
    category: "Mobile App",
    tags: ["Mobile App", "Accessibility", "Events"],
    shortDesc:
      "An accessibility-first events app that helps people find and RSVP to genuinely accessible experiences.",
    description:
      "EmiGo is a mobile app that makes accessibility a first-class part of discovering local events. Attendees browse, search and filter events by accessibility features — wheelchair access, ASL, sensory-friendly, free — RSVP with their specific needs and group size, and save favorites. Organizers get their own side of the app to publish accessibility-aware events and manage RSVPs.",
    problem:
      "Finding events that genuinely accommodate accessibility needs is hard. Standard event apps rarely say whether a venue is wheelchair-accessible, ASL-interpreted, sensory-friendly or free — leaving people to guess, call ahead, or miss out entirely.",
    solution:
      "We built EmiGo around accessibility as core metadata, not an afterthought. Every event surfaces accessibility badges and can be filtered by them, attendees RSVP with specific accessibility requests and group details, and organizers publish accessibility-aware events and receive those requests directly — all in a fast, native mobile experience.",
    results: [
      "Accessibility-first discovery — filter by wheelchair, ASL, sensory-friendly, free and more",
      "Group RSVP capturing per-request accessibility needs and notes",
      "Organizer dashboard to create events and manage incoming RSVPs",
      "Native maps, saved events and an upcoming-events view",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Firebase", "React Query"],
    gradientFrom: "#38bdf8",
    gradientTo: "#6366f1",
    featured: false,
    image: "/images/portfolio/emigo.png",
  },
  {
    slug: "wolfe-property",
    title: "Wolfe Property Portal",
    category: "Web",
    tags: ["Web App", "PropTech", "FinTech"],
    shortDesc:
      "A gated client portal and property-investment calculator for a New Zealand property-coaching firm.",
    description:
      "Wolfe Property Portal is a client portal for a New Zealand property-investment coaching business. It guides prospects through a qualification funnel and gives approved clients an interactive calculator that models 15-year cash flow, top-ups, yield and ROI for rental deals — comparing an 'as-is' scenario against an optimized 'Cashflow Hacking' one.",
    problem:
      "The coaching business ran its property-investment math in a Google Sheet — not scalable, not client-friendly, and impossible to gate behind qualification. Prospects also needed to be qualified on usable equity before consuming valuable coaching time.",
    solution:
      "We built a Next.js portal that reproduces the spreadsheet's calculations exactly — verified to within ±$1 by a 26-test suite — inside an interactive live-preview UI, and wrapped it in a funnel that captures leads, auto-computes equity qualification and programme tier, and routes clients through admin approval before granting dashboard access. Client records and approvals live in Notion so non-technical staff can run it.",
    results: [
      "Spreadsheet-parity investment calculator verified to ±$1 across a 26-test suite",
      "15-year cash-flow model with NZ tax, GST and depreciation, and a two-scenario comparison",
      "Equity-qualification onboarding funnel with automatic programme tiering",
      "Passwordless magic-link auth with admin approval gating and a Notion-backed CRM",
    ],
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Notion API", "Tailwind CSS"],
    gradientFrom: "#db2777",
    gradientTo: "#111827",
    featured: false,
    liveUrl: "https://portal.wolfeproperty.co.nz",
    image: "/images/portfolio/wolfe-property.png",
    imagePosition: "object-top",
  },
  {
    slug: "ultra-windows",
    title: "Ultra Windows",
    category: "Web",
    tags: ["Web App", "B2B", "Manufacturing"],
    shortDesc:
      "An end-to-end quoting and operations platform for a UK aluminium windows & doors manufacturer.",
    description:
      "Ultra Windows is a complete B2B operations platform for a UK aluminium windows-and-doors fabricator. Trade customers and staff configure bespoke products — bifolds, sliders, rooflights, bay windows and more — with live 3D previews and instant pricing, then convert quotes to orders that flow straight into production scheduling, delivery routing, a driver app, stock, and Sage accounting.",
    problem:
      "Bespoke window and door manufacturers rely on manual, error-prone quoting in spreadsheets and email, disconnected from pricing, production, delivery and accounting. Complex configurations make accurate quotes slow, and there's no self-serve channel for trade customers or real-time visibility for drivers and office staff.",
    solution:
      "We designed and built a unified platform where accurate, visual, priced configurations are produced right in the browser with live 3D previews, then flow straight into orders — driving production scheduling, delivery routing and driver dispatch, and Sage 200 accounting. Role-scoped access serves office staff, trade customers and drivers, all backed by Supabase with row-level security.",
    results: [
      "In-browser configurators with live 3D previews for 13+ bespoke product types",
      "Instant, customer-specific pricing and one-click quote-to-order conversion",
      "Route Master logistics with Mapbox route planning and a dedicated driver app",
      "Sage 200 accounting integration plus a self-serve trade customer portal",
    ],
    technologies: ["React", "TypeScript", "Vite", "Supabase", "Three.js", "Tailwind CSS", "Mapbox"],
    gradientFrom: "#f97316",
    gradientTo: "#c2410c",
    featured: false,
    liveUrl: "https://ultrawindows.co.uk",
    image: "/images/portfolio/ultra-windows.png",
    imagePosition: "object-top",
    gallery: [
      {
        src: "/images/portfolio/ultra-windows/ss-1.png",
        alt: "Ultra Windows — branded, print-ready quote sheet with line items, VAT and total",
        caption: "Branded, print-ready quotes generated straight from the configurator",
        span: "wide",
      },
      {
        src: "/images/portfolio/ultra-windows/ss-2.png",
        alt: "Ultra Windows — window configurator: dimensions, frame system and window-style grid",
        caption: "Bespoke window configurator — dimensions, frame system and style grid",
      },
      {
        src: "/images/portfolio/ultra-windows/ss-3.png",
        alt: "Ultra Windows — per-pane options: opening direction, RAL frame colours and cill",
        caption: "Per-pane options — opening direction, RAL frame colours and cill",
      },
      {
        src: "/images/portfolio/ultra-windows/ss-4.png",
        alt: "Ultra Windows — glass type, u-values, blinds and glazing add-ons",
        caption: "Glazing choices — glass type, u-values, blinds and add-ons",
      },
      {
        src: "/images/portfolio/ultra-windows/ss-5.png",
        alt: "Ultra Windows — full style grid with multi-pane configuration and per-pane sizing",
        caption: "Full style grid with multi-pane configuration and per-pane sizing",
      },
      {
        src: "/images/portfolio/ultra-windows/ss-6.png",
        alt: "Ultra Windows — bay-window configurator with angle and survey inputs",
        caption: "Bay-window configurator with angle and on-site survey inputs",
      },
    ],
  },
  {
    slug: "east-end-vintage-sale",
    title: "East End Vintage Sale",
    category: "Web",
    tags: ["Web Design", "Branding", "Event"],
    shortDesc:
      "A bold retro event microsite and brand system for a Toronto sidewalk vintage sale.",
    description:
      "East End Vintage Sale is a community sidewalk vintage-clothing sale in East York, Toronto. We designed a bold, retro-inspired event microsite and brand system to launch its second edition — a pink-and-white striped, halftone-photo, crumpled-paper aesthetic that captures the laid-back Sunday-market vibe and drives turnout.",
    problem:
      "A one-day, word-of-mouth pop-up lives or dies on turnout. The organizers needed to rebuild hype for a second edition, communicate the essentials — date, place, what to expect — at a glance, and stand out on social, all without a big budget or a permanent website.",
    solution:
      "We crafted a scroll-through event landing experience with a distinctive vintage brand system: a striped-paper hero, halftone photo cut-outs, and hand-drawn accents. Each section answers a single question — the details, the vibe, drinks, and location — and the whole thing closes on a shareable 'Come early, bring a tote, tell a friend' call to action tied to their social handles.",
    results: [
      "Cohesive retro brand system — striped paper, halftone photography, hand-drawn accents",
      "Scannable 'everything in one glance' details: date, address, and rain-or-shine",
      "Sectioned storytelling that sells the experience — the details, the vibe, drinks, and location",
      "Shareable closing call-to-action driving RSVPs to @eastendvintagesale",
    ],
    technologies: ["Figma", "Web Design", "Branding", "Social Campaign"],
    gradientFrom: "#f9a8d4",
    gradientTo: "#1e293b",
    featured: false,
    liveUrl: "https://www.instagram.com/eastendvintagesale",
    image: "/images/portfolio/east-end-vintage-sale/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/east-end-vintage-sale/mockup-1.webp",
        alt: "East End Vintage Sale on laptop and phone: the sidewalk sale returns",
        caption: "The sidewalk sale returns for the second time",
      },
      {
        src: "/images/portfolio/east-end-vintage-sale/mockup-2.webp",
        alt: "East End Vintage Sale: everything you need in one glance",
        caption: "Event details at a glance: date, location, vibe and drinks",
      },
      {
        src: "/images/portfolio/east-end-vintage-sale/mockup-3.webp",
        alt: "East End Vintage Sale: discover local events and good vibes",
        caption: "Location section with map link",
      },
      {
        src: "/images/portfolio/east-end-vintage-sale/mockup-4.webp",
        alt: "East End Vintage Sale: freshly made lemonade",
        caption: "Freshly made lemonade menu",
      },
      {
        src: "/images/portfolio/east-end-vintage-sale/mockup-5.webp",
        alt: "East End Vintage Sale: come early, bring a tote, tell a friend",
        caption: "Come early, bring a tote, tell a friend",
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
    image: "/images/portfolio/torqron/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/torqron/mockup-1.webp",
        alt: "Torqron on laptop and phone: let's build smarter procurement",
        caption: "Request-a-quote flow for smarter industrial procurement",
      },
      {
        src: "/images/portfolio/torqron/mockup-2.webp",
        alt: "Torqron: why procurement teams choose Torqron",
        caption: "Why procurement teams choose Torqron",
      },
      {
        src: "/images/portfolio/torqron/mockup-3.webp",
        alt: "Torqron: industries and applications served",
        caption: "Industries and applications served",
      },
      {
        src: "/images/portfolio/torqron/mockup-4.webp",
        alt: "Torqron: industrial excellence for global petrochemical operations",
        caption: "Industrial excellence for global petrochemical operations",
      },
      {
        src: "/images/portfolio/torqron/mockup-5.webp",
        alt: "Torqron: industrial solutions for a smarter tomorrow",
        caption: "Main products and solutions",
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
    image: "/images/portfolio/zenscroll/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/zenscroll/mockup-1.webp",
        alt: "ZenScroll hero: Scrolling, earned one breath at a time",
        caption: "Hero: \"Scrolling, earned one breath at a time.\" Every minute of meditation earns 2–6 minutes of scroll, with App Store and Google Play buttons above the fold.",
        span: "wide",
      },
      {
        src: "/images/portfolio/zenscroll/mockup-2.webp",
        alt: "ZenScroll how it works: Breathe first. Then the feed opens.",
        caption: "How it works: choose the apps to balance, sit for a guided session, then scroll with intention.",
      },
      {
        src: "/images/portfolio/zenscroll/mockup-3.webp",
        alt: "ZenScroll benefits: A calmer relationship with the phone in your hand",
        caption: "Benefits: sharper focus, a quieter mind and better sleep, illustrated with nature photography.",
      },
      {
        src: "/images/portfolio/zenscroll/mockup-4.webp",
        alt: "ZenScroll voices: Small practice. Surprising shifts.",
        caption: "Voices: real user stories of screen time going down.",
      },
      {
        src: "/images/portfolio/zenscroll/mockup-5.webp",
        alt: "ZenScroll call to action: Begin with a single breath",
        caption: "Call to action: free to start, no ads, no dark patterns.",
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
    gradientTo: "#B8860B",
    featured: false,
    liveUrl: "https://www.hmd.com.co",
    image: "/images/portfolio/hmd/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/hmd/mockup-1.webp",
        alt: "HMD on laptop and phone: advancing physicians through education, evidence and leadership",
        caption: "Elite medical education platform on desktop and mobile",
      },
      {
        src: "/images/portfolio/hmd/mockup-2.webp",
        alt: "HMD iConnect: a global community for physicians",
        caption: "HMD iConnect: a global community for physicians and medical students",
      },
      {
        src: "/images/portfolio/hmd/mockup-3.webp",
        alt: "HMD member dashboard: a global medical community",
        caption: "Member dashboard for a global medical community",
      },
      {
        src: "/images/portfolio/hmd/mockup-4.webp",
        alt: "HMD research collaborations",
        caption: "Research collaborations: form groups and co-author papers",
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
    image: "/images/portfolio/periscope-email/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/periscope-email/mockup-1.webp",
        alt: "Periscope on laptop and phone: point Periscope at your accounts",
        caption: "Point Periscope at your accounts: it finds the opening and the buyer",
      },
      {
        src: "/images/portfolio/periscope-email/mockup-2.webp",
        alt: "Periscope: it doesn't stop at the signal, it writes the play",
        caption: "Every signal becomes a ready-to-send play",
      },
      {
        src: "/images/portfolio/periscope-email/mockup-3.webp",
        alt: "Periscope: always-on account intelligence",
        caption: "Always-on intelligence across 200,000+ sources",
      },
      {
        src: "/images/portfolio/periscope-email/mockup-4.webp",
        alt: "Periscope pricing: choose the right plan to scale outreach",
        caption: "Pricing from individual reps to enterprise teams",
      },
      {
        src: "/images/portfolio/periscope-email/mockup-5.webp",
        alt: "Periscope: built for how enterprise teams actually sell",
        caption: "Use cases for enterprise sales teams",
      },
    ],
  },
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
    image: "/images/portfolio/molar-ai/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/molar-ai/mockup-1.webp",
        alt: "Molar AI on laptop and phone: patient education built for modern dental practices",
        caption: "Patient education built for modern dental practices",
      },
      {
        src: "/images/portfolio/molar-ai/mockup-2.webp",
        alt: "Molar AI: engage, educate, build trust",
        caption: "Treatment-focused video content that builds patient trust",
      },
      {
        src: "/images/portfolio/molar-ai/mockup-3.webp",
        alt: "Molar AI: real stories from practices",
        caption: "Video testimonials section on desktop and mobile",
      },
      {
        src: "/images/portfolio/molar-ai/mockup-4.webp",
        alt: "Molar AI pricing: flexible plans for modern dental practices",
        caption: "Flexible plans for single practices up to multi-location groups",
      },
      {
        src: "/images/portfolio/molar-ai/mockup-5.webp",
        alt: "Molar AI: educate patients, build trust, help more say yes",
        caption: "Enterprise page: built for how dental teams actually sell",
      },
    ],
  },

];

export const categories = ["All", "Web", "Mobile App", "SaaS", "AI", "Automation"] as const;
export type Category = (typeof categories)[number];
