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
    slug: "portland-web-designing-studio",
    title: "Portland Web Designing Studio",
    category: "Web",
    tags: ["Agency Website", "Lead Generation", "Next.js"],
    shortDesc:
      "A multi-page marketing website for a small-business agency that sells Website + CRM + AI packages, built to turn visitors into booked consultations.",
    description:
      "Portland Web Designing Studio sells one connected package to local businesses: a website, a CRM pipeline, automated SMS and email follow-up, and an AI customer assistant. We built the agency's own marketing website front to back, matched closely to the owner's reference designs, across three iterations: a PHP landing page, a multi-page HTML site on Vercel, and finally a Next.js 16 static export for the production domain.",
    problem:
      "The agency needed to explain a bundled offer to non-technical business owners and send every page toward one action: booking a free strategy consultation. The owner supplied reference designs that had to be matched closely, and the production domain sits on shared cPanel hosting with no terminal access, so the final site had to ship as plain static files.",
    solution:
      "We built Home, About, Our System, Portfolio, Pricing and Contact pages with a shared header, footer and a site-wide booking modal (date picker, time slots and business details). The portfolio has industry filters and case-study pop-ups. The final version is a Next.js 16 App Router project exported to static files with trailing-slash URLs, so it runs on Apache shared hosting with no rewrite rules.",
    results: [
      "Live at portlanddigitalstudio.com",
      "Six pages plus a booking modal available from every page",
      "Pixel-matched to the owner's reference designs, checked at 360px to 1920px",
      "Next.js static export that runs on shared cPanel hosting",
    ],
    technologies: ["Next.js", "React", "HTML", "CSS", "JavaScript", "PHP", "Vercel", "cPanel"],
    gradientFrom: "#f4b500",
    gradientTo: "#0d0f11",
    featured: true,
    liveUrl: "https://portlanddigitalstudio.com",
    image: "/images/portfolio/portland-web-designing-studio/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/portland-web-designing-studio/mockup-1.webp",
        alt: "Portland Web Designing Studio website on laptop and phone",
        caption: "Website, CRM and AI explained in one clear offer",
      },
      {
        src: "/images/portfolio/portland-web-designing-studio/mockup-2.webp",
        alt: "Portland Web Designing Studio growth system section and footer",
        caption: "The complete business growth system, on desktop and mobile",
      },
      {
        src: "/images/portfolio/portland-web-designing-studio/mockup-3.webp",
        alt: "Portland Web Designing Studio hero: turn more inquiries into customers",
        caption: "A dark hero built to push visitors toward a consultation",
      },
      {
        src: "/images/portfolio/portland-web-designing-studio/mockup-4.webp",
        alt: "Portland Web Designing Studio pricing and package showcase",
        caption: "Transparent pricing and package options for local businesses",
      },
      {
        src: "/images/portfolio/portland-web-designing-studio/mockup-5.webp",
        alt: "Portland Web Designing Studio booking modal for a free strategy consultation",
        caption: "Site-wide booking modal with date and time picker",
      },
    ],
  },
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
    image: "/images/portfolio/goswiftfund/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/goswiftfund/mockup-1.webp",
        alt: "GoSwiftFund — funding made simple on desktop and mobile",
        caption: "Fintech landing page with loan calculation and simple application flow",
      },
      {
        src: "/images/portfolio/goswiftfund/mockup-2.webp",
        alt: "GoSwiftFund — funding-amount slider and estimated payment",
        caption: "Interactive loan slider with transparent term breakdowns",
      },
      {
        src: "/images/portfolio/goswiftfund/mockup-3.webp",
        alt: "GoSwiftFund — funding options and programs showcase",
        caption: "Tailored funding programs for small businesses and merchants",
      },
      {
        src: "/images/portfolio/goswiftfund/mockup-4.webp",
        alt: "GoSwiftFund — customer dashboard preview",
        caption: "Customer portal — application tracking, document uploads and bank linking",
      },
      {
        src: "/images/portfolio/goswiftfund/mockup-5.webp",
        alt: "GoSwiftFund — fintech trust and security showcase",
        caption: "Bank-level encryption and automated underwriting pipeline",
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
    image: "/images/portfolio/sawa/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/sawa/mockup-1.webp",
        alt: "Sawa Smart Commute Showcase on laptop and mobile",
        caption: "Shared Routes. Smarter Commutes. — daily commuter network showcase",
      },
      {
        src: "/images/portfolio/sawa/mockup-2.webp",
        alt: "Sawa Smarter Commutes Mockup in English and Arabic",
        caption: "Bilingual platform with fully mirrored RTL Arabic layout",
      },
      {
        src: "/images/portfolio/sawa/mockup-3.webp",
        alt: "Sawa Smarter Commutes platform features",
        caption: "Carpool matching, route scheduling and corporate commuter programs",
      },
      {
        src: "/images/portfolio/sawa/mockup-4.webp",
        alt: "Sawa mobile commuter application showcase",
        caption: "Mobile-first booking and real-time ride coordination",
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
    image: "/images/portfolio/portland-self-defense-crm/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/portland-self-defense-crm/mockup-1.webp",
        alt: "Portland Academy of Self-Defense — CRM and lead automation showcase",
        caption: "Conversion-optimized website connected directly to GoHighLevel CRM",
      },
      {
        src: "/images/portfolio/portland-self-defense-crm/mockup-2.webp",
        alt: "Portland Academy of Self-Defense — program cards and booking workflow",
        caption: "Structured self-defense and martial arts programs with direct enquiry capture",
      },
      {
        src: "/images/portfolio/portland-self-defense-crm/mockup-3.webp",
        alt: "Portland Academy of Self-Defense — automated lead capture form",
        caption: "Lead forms capturing tagged contact information into GoHighLevel",
      },
      {
        src: "/images/portfolio/portland-self-defense-crm/mockup-4.webp",
        alt: "Portland Academy of Self-Defense — mobile responsive layout",
        caption: "Mobile-first enquiry flow with instant tap-to-call and booking CTAs",
      },
      {
        src: "/images/portfolio/portland-self-defense-crm/mockup-5.webp",
        alt: "Portland Academy of Self-Defense — class schedule and memberships",
        caption: "Membership and trial class booking system with SMS reminders",
      },
      {
        src: "/images/portfolio/portland-self-defense-crm/mockup-6.webp",
        alt: "Portland Academy of Self-Defense — CRM contact and pipeline integration",
        caption: "Sourced and tagged CRM pipeline preventing lost enquiries",
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
    image: "/images/portfolio/tiancheng-development-group/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/tiancheng-development-group/mockup-1.webp",
        alt: "TianCheng Development Group corporate website on laptop and phone",
        caption: "Integrated real estate development, from first drawing to finished building",
      },
      {
        src: "/images/portfolio/tiancheng-development-group/mockup-2.webp",
        alt: "TianCheng Development Group — Discover Our Services section",
        caption: "Comprehensive services from feasibility study to project delivery",
      },
      {
        src: "/images/portfolio/tiancheng-development-group/mockup-3.webp",
        alt: "TianCheng Development Group — Project portfolio showcase",
        caption: "Completed commercial, hospitality and mixed-use developments",
      },
      {
        src: "/images/portfolio/tiancheng-development-group/mockup-4.webp",
        alt: "TianCheng Development Group — Client roster and enterprise partners",
        caption: "Enterprise partners including Hilton, Marriott, Chevron and Fender",
      },
      {
        src: "/images/portfolio/tiancheng-development-group/mockup-5.webp",
        alt: "TianCheng Development Group — Contact and inquiry page",
        caption: "Direct contact inquiry flow for new land and building projects",
      },
    ],
  },
  {
    slug: "wide-eyed-giant",
    title: "Wide Eyed Giant",
    category: "Web",
    tags: ["WordPress", "Elementor", "CSS Fixes"],
    shortDesc:
      "Layout rescue for a WordPress + Elementor recipe membership site: alignment fixed on every screen size.",
    description:
      "Wide Eyed Giant is a membership recipe blog on self-hosted WordPress with Elementor Pro and ElementsKit. We were brought in to fix a layout that had drifted out of alignment on desktop, tablet and mobile, on top of a 1,735-line custom stylesheet that had grown mostly dead.",
    problem:
      "The search bar crowded the logo and menu, category headings did not line up with the recipe grid, and mobile spacing was uneven. Most of the existing custom CSS targeted markup from an older template, and the real offsets were hidden in Elementor per-widget margin settings for each breakpoint.",
    solution:
      "We checked the live pages to find which rules still applied, traced the stacked negative margins in Elementor's responsive settings, and replaced the old stylesheet with a 265-line one scoped per category page, so a fix on one page cannot break another.",
    results: [
      "Alignment fixed across desktop, tablet and mobile",
      "1,735 lines of mostly dead CSS replaced with a 265-line stylesheet",
      "Fixes scoped per category page so they cannot leak",
      "Mobile menu and header height fixed at the source",
    ],
    technologies: ["WordPress", "Elementor Pro", "ElementsKit", "CSS", "Hostinger"],
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
      {
        src: "/images/portfolio/wide-eyed-giant/mockup-5.webp",
        alt: "Wide Eyed Giant mobile and tablet responsive recipe layout",
        caption: "Responsive editorial layout optimized for mobile and tablet reading",
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
    image: "/images/portfolio/dialogix/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/dialogix/mockup-1.webp",
        alt: "Dialogix AI sales command center on laptop and mobile",
        caption: "Autonomous AI sales outreach across phone, email, SMS and LinkedIn",
      },
      {
        src: "/images/portfolio/dialogix/mockup-2.webp",
        alt: "Dialogix omnichannel AI outreach: phone calls, email, SMS and LinkedIn",
        caption: "Omnichannel AI outreach across calls, email, SMS and LinkedIn",
      },
      {
        src: "/images/portfolio/dialogix/mockup-3.webp",
        alt: "Dialogix: from prospect to meeting in minutes",
        caption: "From prospect to meeting in five steps",
      },
      {
        src: "/images/portfolio/dialogix/mockup-4.webp",
        alt: "Dialogix: AI agents in 6 languages",
        caption: "Native-level AI agents in 6 languages",
      },
      {
        src: "/images/portfolio/dialogix/mockup-5.webp",
        alt: "Dialogix pricing plans",
        caption: "Pricing: from self-drive to full revenue cycle",
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
    image: "/images/portfolio/emigo/mockup-cover.webp",
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
    image: "/images/portfolio/wolfe-property/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/wolfe-property/mockup-1.webp",
        alt: "Wolfe Property client portal and cash-flow calculator on laptop and mobile",
        caption: "Gated client portal with 15-year property investment calculator",
      },
      {
        src: "/images/portfolio/wolfe-property/mockup-2.webp",
        alt: "Wolfe Property client portal sign-in",
        caption: "Passwordless magic-link sign-in with admin approval gating",
      },
      {
        src: "/images/portfolio/wolfe-property/mockup-3.webp",
        alt: "Wolfe Property: Master the Cashflow Hack method",
        caption: "The Cashflow Hack method, explained visually",
      },
      {
        src: "/images/portfolio/wolfe-property/mockup-4.webp",
        alt: "Wolfe Property coaching programmes",
        caption: "Choose how you work with us: coaching programmes",
      },
      {
        src: "/images/portfolio/wolfe-property/mockup-5.webp",
        alt: "Wolfe Property equity qualification funnel",
        caption: "Equity-qualification onboarding funnel with automated programme tiering",
      },
    ],
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
    image: "/images/portfolio/ultra-windows/mockup-1.webp",
    imagePosition: "object-top",
    gallery: [
      {
        src: "/images/portfolio/ultra-windows/mockup-1.webp",
        alt: "Ultra Windows aluminium glazing portal on laptop and mobile",
        caption: "Premium UK aluminium glazing e-commerce and trade portal",
      },
      {
        src: "/images/portfolio/ultra-windows/mockup-2.webp",
        alt: "Ultra Windows live pricing design and quote configurator",
        caption: "Live 3D window and door configurator with real-time pricing",
      },
      {
        src: "/images/portfolio/ultra-windows/mockup-3.webp",
        alt: "Ultra Windows bespoke dimensions and frame system selection",
        caption: "Custom dimensions, frame systems, RAL colors and glazing choices",
      },
      {
        src: "/images/portfolio/ultra-windows/mockup-4.webp",
        alt: "Ultra Windows trade customer order management",
        caption: "Trade portal converting quotes to scheduled factory orders",
      },
      {
        src: "/images/portfolio/ultra-windows/mockup-5.webp",
        alt: "Ultra Windows logistics and delivery route master",
        caption: "Integrated logistics with Mapbox route planning and driver app",
      },
      {
        src: "/images/portfolio/ultra-windows/mockup-6.webp",
        alt: "Ultra Windows branded print-ready quote and invoice generation",
        caption: "Automated branded quote sheets with Sage accounting integration",
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
    technologies: ["HTML", "CSS", "Figma", "Branding"],
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
    image: "/images/portfolio/buttercream-bus/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/buttercream-bus/mockup-1.webp",
        alt: "Buttercream Bus mobile bakery website on laptop and phone",
        caption: "Fresh Baked Dreams on Wheels — live truck tracking, menu and online ordering",
      },
      {
        src: "/images/portfolio/buttercream-bus/mockup-2.webp",
        alt: "Buttercream Bus real-time GPS truck tracking and schedule",
        caption: "Real-time location tracking so fans never miss a stop",
      },
      {
        src: "/images/portfolio/buttercream-bus/mockup-3.webp",
        alt: "Buttercream Bus online ordering and Baker's Box pre-order flow",
        caption: "Baker's Box pre-order system allowing customers to skip the line",
      },
      {
        src: "/images/portfolio/buttercream-bus/mockup-4.webp",
        alt: "Buttercream Bus event booking calendar and catering",
        caption: "Event and wedding catering booking with automated availability calendar",
      },
      {
        src: "/images/portfolio/buttercream-bus/mockup-5.webp",
        alt: "Buttercream Bus AI cake design architect",
        caption: "AI Cake Architect turning custom prompts into visual cake concepts",
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
    image: "/images/portfolio/hoursheets/mockup-cover.webp",
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
    image: "/images/portfolio/expert-village-media/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/expert-village-media/mockup-1.webp",
        alt: "Expert Village Media — Shopify Select Partner Agency website on laptop and mobile",
        caption: "We Are The Leading Shopify Development Company — Select Partner credentials",
      },
      {
        src: "/images/portfolio/expert-village-media/mockup-2.webp",
        alt: "Expert Village Media — custom theme design and app development",
        caption: "End-to-end Shopify store creation, custom theme development and app integration",
      },
      {
        src: "/images/portfolio/expert-village-media/mockup-3.webp",
        alt: "Expert Village Media — portfolio of featured e-commerce stores",
        caption: "High-converting storefronts built for global DTC and retail brands",
      },
      {
        src: "/images/portfolio/expert-village-media/mockup-4.webp",
        alt: "Expert Village Media — performance optimization and migration results",
        caption: "Case studies demonstrating speed gains, conversion boosts and seamless migrations",
      },
      {
        src: "/images/portfolio/expert-village-media/mockup-5.webp",
        alt: "Expert Village Media — schedule a discovery consultation",
        caption: "Frictionless discovery booking flow converting visitors into clients",
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
    category: "SaaS",
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
    image: "/images/portfolio/herruby-app/mockup-1.webp",
    gallery: [
      {
        src: "/images/portfolio/herruby-app/mockup-1.webp",
        alt: "Herruby — midlife vitality wellness platform on desktop and mobile",
        caption: "Purpose-built for Canadian women · PIPEDA compliant midlife vitality platform",
      },
      {
        src: "/images/portfolio/herruby-app/mockup-2.webp",
        alt: "Herruby — personalized wellness dashboard and health tracking",
        caption: "Personalized tracking tools for energy, sleep and life-stage symptoms",
      },
      {
        src: "/images/portfolio/herruby-app/mockup-3.webp",
        alt: "Herruby — expert-backed wellness programs and community",
        caption: "Supportive community and clinical expert content library",
      },
      {
        src: "/images/portfolio/herruby-app/mockup-4.webp",
        alt: "Herruby — wellness wallet and employer benefits integration",
        caption: "Wellness wallet funded individually or via employer wellness programs",
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
      {
        src: "/images/portfolio/hmd/mockup-5.webp",
        alt: "HMD institutional medical curriculum and certification",
        caption: "Institutional curriculum and asynchronous physician training pathways",
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

  {
    slug: "divine-reach",
    title: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic",
    category: "Automation",
    tags: ["CRM", "Automation", "API"],
    shortDesc: "I diagnosed why bookings from a GoHighLevel + ClickFunnels funnel weren't reaching people's calendars. The invites worked but only auto-add for Gmail users. ...",
    description: "I diagnosed why bookings from a GoHighLevel + ClickFunnels funnel weren't reaching people's calendars. The invites worked but only auto-add for Gmail users. I ruled out both obvious fixes with evidence and designed an Add-to-Calendar block driven by the redirect parameters. A GHL API audit of 1,300+ appointments showed the reported no-show rate was unsupported and cancellations ran at 27–37%.",
    problem: "The client needed a modern, scalable solution for divine reach — gohighlevel & clickfunnels booking funnel diagnostic.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Node.js", "REST API", "Webhooks", "CRM Integration"],
    gradientFrom: "#f093fb",
    gradientTo: "#f5576c",
    featured: false,
    image: "/images/portfolio/divine-reach/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/divine-reach/mockup-1.webp", alt: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic screenshot 1", caption: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic - View 1" },
    { src: "/images/portfolio/divine-reach/mockup-2.webp", alt: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic screenshot 2", caption: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic - View 2" },
    { src: "/images/portfolio/divine-reach/mockup-3.webp", alt: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic screenshot 3", caption: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic - View 3" },
    { src: "/images/portfolio/divine-reach/mockup-4.webp", alt: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic screenshot 4", caption: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic - View 4" },
    { src: "/images/portfolio/divine-reach/mockup-5.webp", alt: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic screenshot 5", caption: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic - View 5" },
    { src: "/images/portfolio/divine-reach/mockup-6.webp", alt: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic screenshot 6", caption: "Divine Reach — GoHighLevel & ClickFunnels Booking Funnel Diagnostic - View 6" }
    ],
  },
  {
    slug: "wavv-ghl-integration",
    title: "Wavv Dialer ↔ GoHighLevel Pipeline Sync for a Real Estate Team",
    category: "Automation",
    tags: ["CRM", "Automation", "API"],
    shortDesc: "I built a one-way sync so a real estate team's reps work only in the Wavv dialer while GoHighLevel opportunities follow automatically. After finding disposit...",
    description: "I built a one-way sync so a real estate team's reps work only in the Wavv dialer while GoHighLevel opportunities follow automatically. After finding dispositions are shared across every stage, I rebuilt the design around stage: 15 Wavv automations write stage tags and 15 GHL workflows move opportunities. It's loop-proof because only entry tags have connections. Writeback is verified via the GHL API.",
    problem: "The client needed a modern, scalable solution for wavv dialer ↔ gohighlevel pipeline sync for a real estate team.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Node.js", "REST API", "Webhooks", "CRM Integration"],
    gradientFrom: "#a1c4fd",
    gradientTo: "#c2e9fb",
    featured: false,
    image: "/images/portfolio/wavv-ghl-integration/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/wavv-ghl-integration/mockup-1.webp", alt: "Wavv Dialer ↔ GoHighLevel Pipeline Sync for a Real Estate Team screenshot 1", caption: "Wavv Dialer ↔ GoHighLevel Pipeline Sync for a Real Estate Team - View 1" },
    { src: "/images/portfolio/wavv-ghl-integration/mockup-2.webp", alt: "Wavv Dialer ↔ GoHighLevel Pipeline Sync for a Real Estate Team screenshot 2", caption: "Wavv Dialer ↔ GoHighLevel Pipeline Sync for a Real Estate Team - View 2" },
    { src: "/images/portfolio/wavv-ghl-integration/mockup-3.webp", alt: "Wavv Dialer ↔ GoHighLevel Pipeline Sync for a Real Estate Team screenshot 3", caption: "Wavv Dialer ↔ GoHighLevel Pipeline Sync for a Real Estate Team - View 3" },
    { src: "/images/portfolio/wavv-ghl-integration/mockup-4.webp", alt: "Wavv Dialer ↔ GoHighLevel Pipeline Sync for a Real Estate Team screenshot 4", caption: "Wavv Dialer ↔ GoHighLevel Pipeline Sync for a Real Estate Team - View 4" }
    ],
  },
  {
    slug: "chatappai",
    title: "OpenChat - AI Chat Web App (Next.js, Prisma, MongoDB, OpenAI)",
    category: "AI",
    tags: ["AI", "Machine Learning", "Next.js"],
    shortDesc: "OpenChat is an AI-powered chat web app I built using Next.js, Prisma, and MongoDB, with OpenAI's language model integrated into the application. It combines ...",
    description: "OpenChat is an AI-powered chat web app I built using Next.js, Prisma, and MongoDB, with OpenAI's language model integrated into the application. It combines OpenAI's advanced language model with Prisma's data layer, giving users intelligent, AI-driven chat capabilities through a streamlined, user-friendly interface with a single, low-friction Google OAuth sign-up flow.",
    problem: "The client needed a modern, scalable solution for openchat - ai chat web app (next.js, prisma, mongodb, openai).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#5c6bc0",
    gradientTo: "#3949ab",
    featured: false,
    image: "/images/portfolio/chatappai/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/chatappai/mockup-1.webp", alt: "OpenChat - AI Chat Web App (Next.js, Prisma, MongoDB, OpenAI) screenshot 1", caption: "OpenChat - AI Chat Web App (Next.js, Prisma, MongoDB, OpenAI) - View 1" }
    ],
  },
  {
    slug: "course-selling-website",
    title: "Kids Coding Course Platform - UI Design & Firebase Backend",
    category: "Mobile App",
    tags: ["Mobile App", "React Native", "Mobile"],
    shortDesc: "IPlusCoding is a kids' coding course platform (Scratch Junior curriculum, Beginner/Elementary/Intermediate tiers) I took from a static template to a real, dy...",
    description: "IPlusCoding is a kids' coding course platform (Scratch Junior curriculum, Beginner/Elementary/Intermediate tiers) I took from a static template to a real, dynamic product. I designed the UI and integrated Firebase into the backend for scalability, security, and real-time capability on a serverless architecture, transforming the site from static to dynamic, made it fully responsive across mobile/tablet/desktop, uploaded real content, and structured pages for SEO — turning a template shell into a sellable, production-ready course platform.",
    problem: "The client needed a modern, scalable solution for kids coding course platform - ui design & firebase backend.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React Native", "Expo", "TypeScript"],
    gradientFrom: "#ef5350",
    gradientTo: "#e53935",
    featured: false,
    image: "/images/portfolio/course-selling-website/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/course-selling-website/mockup-1.webp", alt: "Kids Coding Course Platform - UI Design & Firebase Backend screenshot 1", caption: "Kids Coding Course Platform - UI Design & Firebase Backend - View 1" },
    { src: "/images/portfolio/course-selling-website/mockup-2.webp", alt: "Kids Coding Course Platform - UI Design & Firebase Backend screenshot 2", caption: "Kids Coding Course Platform - UI Design & Firebase Backend - View 2" },
    { src: "/images/portfolio/course-selling-website/mockup-3.webp", alt: "Kids Coding Course Platform - UI Design & Firebase Backend screenshot 3", caption: "Kids Coding Course Platform - UI Design & Firebase Backend - View 3" },
    { src: "/images/portfolio/course-selling-website/mockup-4.webp", alt: "Kids Coding Course Platform - UI Design & Firebase Backend screenshot 4", caption: "Kids Coding Course Platform - UI Design & Firebase Backend - View 4" }
    ],
  },
  {
    slug: "cypress-bridge",
    title: "Cypress Bridge - Hospital ED Analytics Platform (Python ETL)",
    category: "AI",
    tags: ["AI", "Machine Learning", "React", "Next.js", "Dashboard"],
    shortDesc: "Cypress Bridge is a secure analytics platform I built for a healthcare consulting firm, turning fragmented raw CMS hospital data into clear Emergency Departm...",
    description: "Cypress Bridge is a secure analytics platform I built for a healthcare consulting firm, turning fragmented raw CMS hospital data into clear Emergency Department KPIs, state/national benchmarks, and a computed \"Opportunity Value\" figure. I designed a Python ETL pipeline (fetch, clean, normalize CMS data, compute metrics) loading into Supabase/PostgreSQL, automated on a schedule via GitHub Actions, paired with a React/Next.js dashboard giving executives filterable KPI cards, trend charts, and benchmarks for fast, non-technical insight.",
    problem: "The client needed a modern, scalable solution for cypress bridge - hospital ed analytics platform (python etl).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#29b6f6",
    gradientTo: "#0288d1",
    featured: false,
    image: "/images/portfolio/cypress-bridge/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/cypress-bridge/mockup-1.webp", alt: "Cypress Bridge - Hospital ED Analytics Platform (Python ETL) screenshot 1", caption: "Cypress Bridge - Hospital ED Analytics Platform (Python ETL) - View 1" },
    { src: "/images/portfolio/cypress-bridge/mockup-2.webp", alt: "Cypress Bridge - Hospital ED Analytics Platform (Python ETL) screenshot 2", caption: "Cypress Bridge - Hospital ED Analytics Platform (Python ETL) - View 2" },
    { src: "/images/portfolio/cypress-bridge/mockup-3.webp", alt: "Cypress Bridge - Hospital ED Analytics Platform (Python ETL) screenshot 3", caption: "Cypress Bridge - Hospital ED Analytics Platform (Python ETL) - View 3" },
    { src: "/images/portfolio/cypress-bridge/mockup-4.webp", alt: "Cypress Bridge - Hospital ED Analytics Platform (Python ETL) screenshot 4", caption: "Cypress Bridge - Hospital ED Analytics Platform (Python ETL) - View 4" }
    ],
  },
  {
    slug: "fulltimewin",
    title: "FullTimeWin.live - Next.js Sports Platform (Fixes & Features)",
    category: "AI",
    tags: ["AI", "Machine Learning", "Next.js"],
    shortDesc: "FullTimeWin is a live, Indonesian-language sports livescore, predictions, and news platform built on Next.js. I added a new \"Live\" tab to the live-score sect...",
    description: "FullTimeWin is a live, Indonesian-language sports livescore, predictions, and news platform built on Next.js. I added a new \"Live\" tab to the live-score section, built a sitemap feature to improve SEO, implemented infinite scrolling, made minor revisions, hid an exposed secret key as a security fix, improved overall SEO, and resolved an intermittent bug that broke the page roughly 10% of the time.",
    problem: "The client needed a modern, scalable solution for fulltimewin.live - next.js sports platform (fixes & features).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#fd7043",
    gradientTo: "#ff8a65",
    featured: false,
    image: "/images/portfolio/fulltimewin/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/fulltimewin/mockup-1.webp", alt: "FullTimeWin.live - Next.js Sports Platform (Fixes & Features) screenshot 1", caption: "FullTimeWin.live - Next.js Sports Platform (Fixes & Features) - View 1" },
    { src: "/images/portfolio/fulltimewin/mockup-2.webp", alt: "FullTimeWin.live - Next.js Sports Platform (Fixes & Features) screenshot 2", caption: "FullTimeWin.live - Next.js Sports Platform (Fixes & Features) - View 2" }
    ],
  },
  {
    slug: "keyglowmax",
    title: "KeyGlowMax - Solana DeFi Token Creator (UI Redesign)",
    category: "AI",
    tags: ["AI", "Machine Learning"],
    shortDesc: "KeyGlowMax is a no-code Solana SPL token creator (mint, add liquidity, burn liquidity pools). I led a full UI redesign: a sleek, modern aesthetic with clean ...",
    description: "KeyGlowMax is a no-code Solana SPL token creator (mint, add liquidity, burn liquidity pools). I led a full UI redesign: a sleek, modern aesthetic with clean lines and intuitive layouts, full responsiveness across desktop/tablet/smartphone, clearer presentation of complex DeFi data through charts and visualization tools, and a simplified, optimized navigation system across the token-creation and liquidity flows.",
    problem: "The client needed a modern, scalable solution for keyglowmax - solana defi token creator (ui redesign).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    featured: false,
    image: "/images/portfolio/keyglowmax/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/keyglowmax/mockup-1.webp", alt: "KeyGlowMax - Solana DeFi Token Creator (UI Redesign) screenshot 1", caption: "KeyGlowMax - Solana DeFi Token Creator (UI Redesign) - View 1" },
    { src: "/images/portfolio/keyglowmax/mockup-2.webp", alt: "KeyGlowMax - Solana DeFi Token Creator (UI Redesign) screenshot 2", caption: "KeyGlowMax - Solana DeFi Token Creator (UI Redesign) - View 2" },
    { src: "/images/portfolio/keyglowmax/mockup-3.webp", alt: "KeyGlowMax - Solana DeFi Token Creator (UI Redesign) screenshot 3", caption: "KeyGlowMax - Solana DeFi Token Creator (UI Redesign) - View 3" },
    { src: "/images/portfolio/keyglowmax/mockup-4.webp", alt: "KeyGlowMax - Solana DeFi Token Creator (UI Redesign) screenshot 4", caption: "KeyGlowMax - Solana DeFi Token Creator (UI Redesign) - View 4" }
    ],
  },
  {
    slug: "litejob",
    title: "LiteJob - City-Based Local Business & Service Directory",
    category: "AI",
    tags: ["AI", "Machine Learning"],
    shortDesc: "LiteJob is an online portal I built connecting cities, businesses, and services in one place. Users search by city to browse categorized local businesses — r...",
    description: "LiteJob is an online portal I built connecting cities, businesses, and services in one place. Users search by city to browse categorized local businesses — restaurants, salons, repair services, and more — with each business listing its own range of services. I built the platform around two distinct account types, Client and Business, with a role selector on both the signup and login flows, giving users a centralized place to compare prices and services in a few clicks.",
    problem: "The client needed a modern, scalable solution for litejob - city-based local business & service directory.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#a1c4fd",
    gradientTo: "#c2e9fb",
    featured: false,
    image: "/images/portfolio/litejob/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/litejob/mockup-1.webp", alt: "LiteJob - City-Based Local Business & Service Directory screenshot 1", caption: "LiteJob - City-Based Local Business & Service Directory - View 1" },
    { src: "/images/portfolio/litejob/mockup-2.webp", alt: "LiteJob - City-Based Local Business & Service Directory screenshot 2", caption: "LiteJob - City-Based Local Business & Service Directory - View 2" },
    { src: "/images/portfolio/litejob/mockup-3.webp", alt: "LiteJob - City-Based Local Business & Service Directory screenshot 3", caption: "LiteJob - City-Based Local Business & Service Directory - View 3" },
    { src: "/images/portfolio/litejob/mockup-4.webp", alt: "LiteJob - City-Based Local Business & Service Directory screenshot 4", caption: "LiteJob - City-Based Local Business & Service Directory - View 4" }
    ],
  },
  {
    slug: "nexus-by-aps",
    title: "Nexus by APS - Enterprise RFQ Coordination Platform",
    category: "AI",
    tags: ["AI", "Machine Learning"],
    shortDesc: "Nexus by APS is an enterprise-grade RFQ management and vendor bidding platform I built to streamline procurement and supplier collaboration. It centralizes R...",
    description: "Nexus by APS is an enterprise-grade RFQ management and vendor bidding platform I built to streamline procurement and supplier collaboration. It centralizes RFQ creation (an eight-stage wizard), vendor bid submission with supporting documentation, real-time bid-status tracking, a historical data repository, and deep analytics/reporting for cost-saving and vendor-performance insights, plus a built-in \"Sera AI\" assistant, transforming procurement into a modern, data-driven workflow.",
    problem: "The client needed a modern, scalable solution for nexus by aps - enterprise rfq coordination platform.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    featured: false,
    image: "/images/portfolio/nexus-by-aps/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/nexus-by-aps/mockup-1.webp", alt: "Nexus by APS - Enterprise RFQ Coordination Platform screenshot 1", caption: "Nexus by APS - Enterprise RFQ Coordination Platform - View 1" },
    { src: "/images/portfolio/nexus-by-aps/mockup-2.webp", alt: "Nexus by APS - Enterprise RFQ Coordination Platform screenshot 2", caption: "Nexus by APS - Enterprise RFQ Coordination Platform - View 2" },
    { src: "/images/portfolio/nexus-by-aps/mockup-3.webp", alt: "Nexus by APS - Enterprise RFQ Coordination Platform screenshot 3", caption: "Nexus by APS - Enterprise RFQ Coordination Platform - View 3" },
    { src: "/images/portfolio/nexus-by-aps/mockup-4.webp", alt: "Nexus by APS - Enterprise RFQ Coordination Platform screenshot 4", caption: "Nexus by APS - Enterprise RFQ Coordination Platform - View 4" }
    ],
  },
  {
    slug: "prognosticz",
    title: "Prognosticz - VC & Startup Analytics (Performance Engineering)",
    category: "AI",
    tags: ["AI", "Machine Learning", "React", "Next.js", "Dashboard"],
    shortDesc: "I contributed to Prognosticz, an investor and startup analytics dashboard covering global VC networks, funding trends, and company insights at real productio...",
    description: "I contributed to Prognosticz, an investor and startup analytics dashboard covering global VC networks, funding trends, and company insights at real production scale (6,255+ companies, 61,031+ investors), backed by Supabase. My work focused on performance across the Investors, Companies, and Funding Rounds pages: reducing graph loading time via API optimization and caching, refactoring Supabase functions for query efficiency, and improving chart/table rendering and code quality. Stack: React.js, Next.js, Supabase, Recharts, TypeScript, Tailwind CSS. Contributor role, not the original build.",
    problem: "The client needed a modern, scalable solution for prognosticz - vc & startup analytics (performance engineering).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    featured: false,
    image: "/images/portfolio/prognosticz/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/prognosticz/mockup-1.webp", alt: "Prognosticz - VC & Startup Analytics (Performance Engineering) screenshot 1", caption: "Prognosticz - VC & Startup Analytics (Performance Engineering) - View 1" },
    { src: "/images/portfolio/prognosticz/mockup-2.webp", alt: "Prognosticz - VC & Startup Analytics (Performance Engineering) screenshot 2", caption: "Prognosticz - VC & Startup Analytics (Performance Engineering) - View 2" },
    { src: "/images/portfolio/prognosticz/mockup-3.webp", alt: "Prognosticz - VC & Startup Analytics (Performance Engineering) screenshot 3", caption: "Prognosticz - VC & Startup Analytics (Performance Engineering) - View 3" }
    ],
  },
  {
    slug: "the-lookbook",
    title: "The Lookbook - Fashion Platform Search & Admin Fixes",
    category: "AI",
    tags: ["AI", "Machine Learning", "E-Commerce", "API"],
    shortDesc: "I contributed to The Lookbook, a curated fashion discovery platform (\"Shop the Edit,\" 50+ products), improving its product/moodboard management system: dynam...",
    description: "I contributed to The Lookbook, a curated fashion discovery platform (\"Shop the Edit,\" 50+ products), improving its product/moodboard management system: dynamic API-sourced tag loading for moodboards, partial-word product search with correct image rendering, reliable bulk publish/unpublish/delete actions, and fixed, verified create/update flows for products and moodboards — resulting in faster content management and more reliable admin controls. Contributor engagement, not the original build.",
    problem: "The client needed a modern, scalable solution for the lookbook - fashion platform search & admin fixes.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    featured: false,
    image: "/images/portfolio/the-lookbook/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/the-lookbook/mockup-1.webp", alt: "The Lookbook - Fashion Platform Search & Admin Fixes screenshot 1", caption: "The Lookbook - Fashion Platform Search & Admin Fixes - View 1" },
    { src: "/images/portfolio/the-lookbook/mockup-2.webp", alt: "The Lookbook - Fashion Platform Search & Admin Fixes screenshot 2", caption: "The Lookbook - Fashion Platform Search & Admin Fixes - View 2" },
    { src: "/images/portfolio/the-lookbook/mockup-3.webp", alt: "The Lookbook - Fashion Platform Search & Admin Fixes screenshot 3", caption: "The Lookbook - Fashion Platform Search & Admin Fixes - View 3" },
    { src: "/images/portfolio/the-lookbook/mockup-4.webp", alt: "The Lookbook - Fashion Platform Search & Admin Fixes screenshot 4", caption: "The Lookbook - Fashion Platform Search & Admin Fixes - View 4" },
    { src: "/images/portfolio/the-lookbook/mockup-5.webp", alt: "The Lookbook - Fashion Platform Search & Admin Fixes screenshot 5", caption: "The Lookbook - Fashion Platform Search & Admin Fixes - View 5" }
    ],
  },
  {
    slug: "webflix-roueen-rafeyan-md",
    title: "Roueen Rafeyan MD - Psychiatry & Wellness Practice Website",
    category: "AI",
    tags: ["AI", "Machine Learning"],
    shortDesc: "This is the practice website for Roueen Rafeyan MD, Psychiatry & Wellness, built around \"Take ownership of your mental health\" and an \"Accepting New Patients...",
    description: "This is the practice website for Roueen Rafeyan MD, Psychiatry & Wellness, built around \"Take ownership of your mental health\" and an \"Accepting New Patients\" badge. Its standout is an unusually detailed Insurance & Billing section — out-of-network status, a superbill process, and specific CPT codes with a realistic reimbursement range. This case study documents the live public site; the Patient Portal was referenced but not independently accessed, per standard patient-data privacy boundaries.",
    problem: "The client needed a modern, scalable solution for roueen rafeyan md - psychiatry & wellness practice website.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#f093fb",
    gradientTo: "#f5576c",
    featured: false,
    image: "/images/portfolio/webflix-roueen-rafeyan-md/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/webflix-roueen-rafeyan-md/mockup-1.webp", alt: "Roueen Rafeyan MD - Psychiatry & Wellness Practice Website screenshot 1", caption: "Roueen Rafeyan MD - Psychiatry & Wellness Practice Website - View 1" },
    { src: "/images/portfolio/webflix-roueen-rafeyan-md/mockup-2.webp", alt: "Roueen Rafeyan MD - Psychiatry & Wellness Practice Website screenshot 2", caption: "Roueen Rafeyan MD - Psychiatry & Wellness Practice Website - View 2" },
    { src: "/images/portfolio/webflix-roueen-rafeyan-md/mockup-3.webp", alt: "Roueen Rafeyan MD - Psychiatry & Wellness Practice Website screenshot 3", caption: "Roueen Rafeyan MD - Psychiatry & Wellness Practice Website - View 3" },
    { src: "/images/portfolio/webflix-roueen-rafeyan-md/mockup-4.webp", alt: "Roueen Rafeyan MD - Psychiatry & Wellness Practice Website screenshot 4", caption: "Roueen Rafeyan MD - Psychiatry & Wellness Practice Website - View 4" },
    { src: "/images/portfolio/webflix-roueen-rafeyan-md/mockup-5.webp", alt: "Roueen Rafeyan MD - Psychiatry & Wellness Practice Website screenshot 5", caption: "Roueen Rafeyan MD - Psychiatry & Wellness Practice Website - View 5" }
    ],
  },
  {
    slug: "wharton-carpet-cleaning",
    title: "WordPress SiteOrigin CSS Debugging - Wharton Carpet Cleaning",
    category: "AI",
    tags: ["AI", "Machine Learning", "WordPress"],
    shortDesc: "Wharton Carpet Cleaning runs a WordPress site built with SiteOrigin Page Builder. I resolved three CSS issues: button hover states failing due to specificity...",
    description: "Wharton Carpet Cleaning runs a WordPress site built with SiteOrigin Page Builder. I resolved three CSS issues: button hover states failing due to specificity conflicts from page-builder inline styles, border-radius rendering incorrectly from widget-wrapper style conflicts and missing overflow: hidden, and inline styles overriding the global stylesheet site-wide. Using browser DevTools to trace each to its root cause, I applied targeted fixes without fragile !important chains, verified working across all pages.",
    problem: "The client needed a modern, scalable solution for wordpress siteorigin css debugging - wharton carpet cleaning.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#66bb6a",
    gradientTo: "#43a047",
    featured: false,
    image: "/images/portfolio/wharton-carpet-cleaning/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/wharton-carpet-cleaning/mockup-1.webp", alt: "WordPress SiteOrigin CSS Debugging - Wharton Carpet Cleaning screenshot 1", caption: "WordPress SiteOrigin CSS Debugging - Wharton Carpet Cleaning - View 1" },
    { src: "/images/portfolio/wharton-carpet-cleaning/mockup-2.webp", alt: "WordPress SiteOrigin CSS Debugging - Wharton Carpet Cleaning screenshot 2", caption: "WordPress SiteOrigin CSS Debugging - Wharton Carpet Cleaning - View 2" },
    { src: "/images/portfolio/wharton-carpet-cleaning/mockup-3.webp", alt: "WordPress SiteOrigin CSS Debugging - Wharton Carpet Cleaning screenshot 3", caption: "WordPress SiteOrigin CSS Debugging - Wharton Carpet Cleaning - View 3" },
    { src: "/images/portfolio/wharton-carpet-cleaning/mockup-4.webp", alt: "WordPress SiteOrigin CSS Debugging - Wharton Carpet Cleaning screenshot 4", caption: "WordPress SiteOrigin CSS Debugging - Wharton Carpet Cleaning - View 4" }
    ],
  },
  {
    slug: "pro-dent-html",
    title: "Pro-Dent Club — Free Membership Promotional Email",
    category: "Web",
    tags: ["Web Design", "Web"],
    shortDesc: "I built a fully self-contained HTML/CSS recruitment email for Pro-Dent Club, a Canadian dental GPO — logo embedded as base64, every icon as inline SVG, zero ...",
    description: "I built a fully self-contained HTML/CSS recruitment email for Pro-Dent Club, a Canadian dental GPO — logo embedded as base64, every icon as inline SVG, zero external image dependencies. It opens on a pop-art \"FREE Membership\" hero, moves through an authority statement, value-prop bubbles, sample member-pricing cards, and a $72,000-savings highlight with a CSS bar chart, with three responsive breakpoints for reliable rendering from desktop Outlook to phone.",
    problem: "The client needed a modern, scalable solution for pro-dent club — free membership promotional email.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#ffca28",
    gradientTo: "#ffb300",
    featured: false,
    image: "/images/portfolio/pro-dent-html/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/pro-dent-html/mockup-1.webp", alt: "Pro-Dent Club — Free Membership Promotional Email screenshot 1", caption: "Pro-Dent Club — Free Membership Promotional Email - View 1" },
    { src: "/images/portfolio/pro-dent-html/mockup-2.webp", alt: "Pro-Dent Club — Free Membership Promotional Email screenshot 2", caption: "Pro-Dent Club — Free Membership Promotional Email - View 2" },
    { src: "/images/portfolio/pro-dent-html/mockup-3.webp", alt: "Pro-Dent Club — Free Membership Promotional Email screenshot 3", caption: "Pro-Dent Club — Free Membership Promotional Email - View 3" },
    { src: "/images/portfolio/pro-dent-html/mockup-4.webp", alt: "Pro-Dent Club — Free Membership Promotional Email screenshot 4", caption: "Pro-Dent Club — Free Membership Promotional Email - View 4" },
    { src: "/images/portfolio/pro-dent-html/mockup-5.webp", alt: "Pro-Dent Club — Free Membership Promotional Email screenshot 5", caption: "Pro-Dent Club — Free Membership Promotional Email - View 5" },
    { src: "/images/portfolio/pro-dent-html/mockup-6.webp", alt: "Pro-Dent Club — Free Membership Promotional Email screenshot 6", caption: "Pro-Dent Club — Free Membership Promotional Email - View 6" },
    { src: "/images/portfolio/pro-dent-html/mockup-7.webp", alt: "Pro-Dent Club — Free Membership Promotional Email screenshot 7", caption: "Pro-Dent Club — Free Membership Promotional Email - View 7" }
    ],
  },
  {
    slug: "cricket-tournament-app",
    title: "TCL — Tournament Management & Live Cricket Scoring App",
    category: "Mobile App",
    tags: ["Mobile App", "React Native"],
    shortDesc: "TCL is a tournament-management and live cricket-scoring web app (with an Android wrapper) I built end to end, including the full over-by-over scoring engine ...",
    description: "TCL is a tournament-management and live cricket-scoring web app (with an Android wrapper) I built end to end, including the full over-by-over scoring engine from scratch in plain JavaScript — strike rotation, extras, wickets, target/chase, per-player figures. It's offline-first, sync-second: every action writes to localStorage instantly, then mirrors to Firebase Firestore in real time. Single-file vanilla JS frontend, installable as a PWA, wrapped in an Android WebView shell with AdMob.",
    problem: "The client needed a modern, scalable solution for tcl — tournament management & live cricket scoring app.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React Native", "Expo", "TypeScript"],
    gradientFrom: "#78909c",
    gradientTo: "#546e7a",
    featured: false,
    image: "/images/portfolio/cricket-tournament-app/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/cricket-tournament-app/mockup-1.webp", alt: "TCL — Tournament Management & Live Cricket Scoring App screenshot 1", caption: "TCL — Tournament Management & Live Cricket Scoring App - View 1" },
    { src: "/images/portfolio/cricket-tournament-app/mockup-2.webp", alt: "TCL — Tournament Management & Live Cricket Scoring App screenshot 2", caption: "TCL — Tournament Management & Live Cricket Scoring App - View 2" },
    { src: "/images/portfolio/cricket-tournament-app/mockup-3.webp", alt: "TCL — Tournament Management & Live Cricket Scoring App screenshot 3", caption: "TCL — Tournament Management & Live Cricket Scoring App - View 3" },
    { src: "/images/portfolio/cricket-tournament-app/mockup-4.webp", alt: "TCL — Tournament Management & Live Cricket Scoring App screenshot 4", caption: "TCL — Tournament Management & Live Cricket Scoring App - View 4" },
    { src: "/images/portfolio/cricket-tournament-app/mockup-5.webp", alt: "TCL — Tournament Management & Live Cricket Scoring App screenshot 5", caption: "TCL — Tournament Management & Live Cricket Scoring App - View 5" },
    { src: "/images/portfolio/cricket-tournament-app/mockup-6.webp", alt: "TCL — Tournament Management & Live Cricket Scoring App screenshot 6", caption: "TCL — Tournament Management & Live Cricket Scoring App - View 6" }
    ],
  },
  {
    slug: "ipo-app",
    title: "IPO AI — Indian IPO Research App with AI Analysis",
    category: "Mobile App",
    tags: ["Mobile App", "React Native", "React", "API"],
    shortDesc: "IPO AI is an Expo/React Native app I built for Indian retail investors researching Mainboard and SME IPOs — price bands, key dates, subscription levels, and ...",
    description: "IPO AI is an Expo/React Native app I built for Indian retail investors researching Mainboard and SME IPOs — price bands, key dates, subscription levels, and an on-demand 14-factor AI investment analysis. Its defining trait is a strict \"never fabricate financial data\" discipline: a quota-aware cached data layer, a fixture-tested scraping fallback that degrades to null rather than guessing, and an AI pipeline where all arithmetic is precomputed in code, not trusted from the model's prose.",
    problem: "The client needed a modern, scalable solution for ipo ai — indian ipo research app with ai analysis.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React Native", "Expo", "TypeScript"],
    gradientFrom: "#ef5350",
    gradientTo: "#e53935",
    featured: false,
    image: "/images/portfolio/ipo-app/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/ipo-app/mockup-1.webp", alt: "IPO AI — Indian IPO Research App with AI Analysis screenshot 1", caption: "IPO AI — Indian IPO Research App with AI Analysis - View 1" },
    { src: "/images/portfolio/ipo-app/mockup-2.webp", alt: "IPO AI — Indian IPO Research App with AI Analysis screenshot 2", caption: "IPO AI — Indian IPO Research App with AI Analysis - View 2" },
    { src: "/images/portfolio/ipo-app/mockup-3.webp", alt: "IPO AI — Indian IPO Research App with AI Analysis screenshot 3", caption: "IPO AI — Indian IPO Research App with AI Analysis - View 3" },
    { src: "/images/portfolio/ipo-app/mockup-4.webp", alt: "IPO AI — Indian IPO Research App with AI Analysis screenshot 4", caption: "IPO AI — Indian IPO Research App with AI Analysis - View 4" },
    { src: "/images/portfolio/ipo-app/mockup-5.webp", alt: "IPO AI — Indian IPO Research App with AI Analysis screenshot 5", caption: "IPO AI — Indian IPO Research App with AI Analysis - View 5" },
    { src: "/images/portfolio/ipo-app/mockup-6.webp", alt: "IPO AI — Indian IPO Research App with AI Analysis screenshot 6", caption: "IPO AI — Indian IPO Research App with AI Analysis - View 6" }
    ],
  },
  {
    slug: "slice-up",
    title: "SliceUp — Expense Tracker with AI Insights (React Native)",
    category: "Mobile App",
    tags: ["Mobile App", "React Native", "React"],
    shortDesc: "SliceUp is a React Native expense tracker I designed and built end-to-end: fast expense logging, monthly/yearly analysis with charts, camera-based receipt sc...",
    description: "SliceUp is a React Native expense tracker I designed and built end-to-end: fast expense logging, monthly/yearly analysis with charts, camera-based receipt scanning, and group/trip expense-splitting with automatic settlement math. An AI chat feature voiced by a mascot, Teddy, answers natural-language spending questions with witty, number-backed commentary. Published live on Google Play.",
    problem: "The client needed a modern, scalable solution for sliceup — expense tracker with ai insights (react native).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React Native", "Expo", "TypeScript"],
    gradientFrom: "#9ccc65",
    gradientTo: "#7cb342",
    featured: false,
    image: "/images/portfolio/slice-up/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/slice-up/mockup-1.webp", alt: "SliceUp — Expense Tracker with AI Insights (React Native) screenshot 1", caption: "SliceUp — Expense Tracker with AI Insights (React Native) - View 1" },
    { src: "/images/portfolio/slice-up/mockup-2.webp", alt: "SliceUp — Expense Tracker with AI Insights (React Native) screenshot 2", caption: "SliceUp — Expense Tracker with AI Insights (React Native) - View 2" },
    { src: "/images/portfolio/slice-up/mockup-3.webp", alt: "SliceUp — Expense Tracker with AI Insights (React Native) screenshot 3", caption: "SliceUp — Expense Tracker with AI Insights (React Native) - View 3" },
    { src: "/images/portfolio/slice-up/mockup-4.webp", alt: "SliceUp — Expense Tracker with AI Insights (React Native) screenshot 4", caption: "SliceUp — Expense Tracker with AI Insights (React Native) - View 4" }
    ],
  },
  {
    slug: "beeminor",
    title: "BeeMinor - Gamified Play-and-Win Multi-Language Web App",
    category: "AI",
    tags: ["AI", "Machine Learning"],
    shortDesc: "BeeMinor is a gamified \"play and win\" consumer web app localized into nine languages, branded around a bee mascot with the tagline \"Rejoins les BeeMinor, jou...",
    description: "BeeMinor is a gamified \"play and win\" consumer web app localized into nine languages, branded around a bee mascot with the tagline \"Rejoins les BeeMinor, joue et gagne.\" Its entire public surface is a login/signup screen — there's no browsable landing page, and the actual game mechanic sits behind authentication. This case study documents the branding, localization, and auth flow visible from the outside; the in-app product itself was not accessible for this write-up.",
    problem: "The client needed a modern, scalable solution for beeminor - gamified play-and-win multi-language web app.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#78909c",
    gradientTo: "#546e7a",
    featured: false,
    image: "/images/portfolio/beeminor/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/beeminor/mockup-1.webp", alt: "BeeMinor - Gamified Play-and-Win Multi-Language Web App screenshot 1", caption: "BeeMinor - Gamified Play-and-Win Multi-Language Web App - View 1" },
    { src: "/images/portfolio/beeminor/mockup-2.webp", alt: "BeeMinor - Gamified Play-and-Win Multi-Language Web App screenshot 2", caption: "BeeMinor - Gamified Play-and-Win Multi-Language Web App - View 2" },
    { src: "/images/portfolio/beeminor/mockup-3.webp", alt: "BeeMinor - Gamified Play-and-Win Multi-Language Web App screenshot 3", caption: "BeeMinor - Gamified Play-and-Win Multi-Language Web App - View 3" },
    { src: "/images/portfolio/beeminor/mockup-4.webp", alt: "BeeMinor - Gamified Play-and-Win Multi-Language Web App screenshot 4", caption: "BeeMinor - Gamified Play-and-Win Multi-Language Web App - View 4" },
    { src: "/images/portfolio/beeminor/mockup-5.webp", alt: "BeeMinor - Gamified Play-and-Win Multi-Language Web App screenshot 5", caption: "BeeMinor - Gamified Play-and-Win Multi-Language Web App - View 5" }
    ],
  },
  {
    slug: "expert-village",
    title: "Expert Village Media - Shopify Development Agency Website",
    category: "AI",
    tags: ["AI", "Machine Learning", "Shopify", "E-Commerce"],
    shortDesc: "Expert Village Media's site markets a Shopify development agency positioned as \"not just developers — strategic growth partners,\" leading with Shopify Select...",
    description: "Expert Village Media's site markets a Shopify development agency positioned as \"not just developers — strategic growth partners,\" leading with Shopify Select Partner status, 800+ reviews, and 2,000+ brands served, backed by case studies and a six-stage delivery process (Discovery through Maintenance). Services span custom development, redesign, migration, optimization, and marketing/SEO/PPC. This case study documents the live public site; no client-supplied source code was used.",
    problem: "The client needed a modern, scalable solution for expert village media - shopify development agency website.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#f093fb",
    gradientTo: "#f5576c",
    featured: false,
    image: "/images/portfolio/expert-village/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/expert-village/mockup-1.webp", alt: "Expert Village Media - Shopify Development Agency Website screenshot 1", caption: "Expert Village Media - Shopify Development Agency Website - View 1" },
    { src: "/images/portfolio/expert-village/mockup-2.webp", alt: "Expert Village Media - Shopify Development Agency Website screenshot 2", caption: "Expert Village Media - Shopify Development Agency Website - View 2" },
    { src: "/images/portfolio/expert-village/mockup-3.webp", alt: "Expert Village Media - Shopify Development Agency Website screenshot 3", caption: "Expert Village Media - Shopify Development Agency Website - View 3" },
    { src: "/images/portfolio/expert-village/mockup-4.webp", alt: "Expert Village Media - Shopify Development Agency Website screenshot 4", caption: "Expert Village Media - Shopify Development Agency Website - View 4" },
    { src: "/images/portfolio/expert-village/mockup-5.webp", alt: "Expert Village Media - Shopify Development Agency Website screenshot 5", caption: "Expert Village Media - Shopify Development Agency Website - View 5" }
    ],
  },
  {
    slug: "hypelive",
    title: "HYPE Live - Creator App Install Landing Page (Built on Lovable)",
    category: "Mobile App",
    tags: ["Mobile App", "React Native"],
    shortDesc: "HYPE Live is a single-screen, Lovable-built landing page for the \"HYPE\" creator app, with one job: convert visitors into App Store/Google Play installs under...",
    description: "HYPE Live is a single-screen, Lovable-built landing page for the \"HYPE\" creator app, with one job: convert visitors into App Store/Google Play installs under the tagline \"Creators First. Always.\" It leans on aspirational creator photography over a feature tour, with Login/Signup buttons hinting at a companion web layer. This case study documents the live public landing page; the native app's in-app functionality was outside its scope.",
    problem: "The client needed a modern, scalable solution for hype live - creator app install landing page (built on lovable).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React Native", "Expo", "TypeScript"],
    gradientFrom: "#4facfe",
    gradientTo: "#00f2fe",
    featured: false,
    image: "/images/portfolio/hypelive/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/hypelive/mockup-1.webp", alt: "HYPE Live - Creator App Install Landing Page (Built on Lovable) screenshot 1", caption: "HYPE Live - Creator App Install Landing Page (Built on Lovable) - View 1" },
    { src: "/images/portfolio/hypelive/mockup-2.webp", alt: "HYPE Live - Creator App Install Landing Page (Built on Lovable) screenshot 2", caption: "HYPE Live - Creator App Install Landing Page (Built on Lovable) - View 2" }
    ],
  },
  {
    slug: "kasbu",
    title: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS",
    category: "Mobile App",
    tags: ["Mobile App", "React Native"],
    shortDesc: "Kasbu is a free-first link-in-bio and personal-page builder (Linktree/Beacons category) leading with a 3D carousel of real multi-language example pages and t...",
    description: "Kasbu is a free-first link-in-bio and personal-page builder (Linktree/Beacons category) leading with a 3D carousel of real multi-language example pages and the trust line \"+10K pages already made.\" Its nav spans Cards, Explore, Wallet, a Blog, and Pricing — a Wallet feature is an uncommon differentiator among free competitors. This case study documents the live public homepage and navigation; the authenticated builder and Wallet mechanics were not accessible.",
    problem: "The client needed a modern, scalable solution for kasbu - free link-in-bio & personal page builder saas.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React Native", "Expo", "TypeScript"],
    gradientFrom: "#fa709a",
    gradientTo: "#fee140",
    featured: false,
    image: "/images/portfolio/kasbu/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/kasbu/mockup-1.webp", alt: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS screenshot 1", caption: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS - View 1" },
    { src: "/images/portfolio/kasbu/mockup-2.webp", alt: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS screenshot 2", caption: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS - View 2" },
    { src: "/images/portfolio/kasbu/mockup-3.webp", alt: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS screenshot 3", caption: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS - View 3" },
    { src: "/images/portfolio/kasbu/mockup-4.webp", alt: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS screenshot 4", caption: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS - View 4" },
    { src: "/images/portfolio/kasbu/mockup-5.webp", alt: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS screenshot 5", caption: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS - View 5" },
    { src: "/images/portfolio/kasbu/mockup-6.webp", alt: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS screenshot 6", caption: "Kasbu - Free Link-in-Bio & Personal Page Builder SaaS - View 6" }
    ],
  },
  {
    slug: "kitaplimani",
    title: "Kitap Limani — Islamic Books & Educational E-commerce Store",
    category: "AI",
    tags: ["AI", "Machine Learning", "E-Commerce"],
    shortDesc: "Kitap Limani is an Islamic books and educational e-commerce storefront I built on the Ikas platform, combining strong visual merchandising with straightforwa...",
    description: "Kitap Limani is an Islamic books and educational e-commerce storefront I built on the Ikas platform, combining strong visual merchandising with straightforward catalog navigation across dedicated sections (Ajanda, Atlas, Qur'an editions). The visual system balances the store's cultural identity — restrained green/white/neutral tones with premium editorial photography — with modern e-commerce usability, supporting German/Turkish content for its European customer base.",
    problem: "The client needed a modern, scalable solution for kitap limani — islamic books & educational e-commerce store.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#78909c",
    gradientTo: "#546e7a",
    featured: false,
    image: "/images/portfolio/kitaplimani/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/kitaplimani/mockup-1.webp", alt: "Kitap Limani — Islamic Books & Educational E-commerce Store screenshot 1", caption: "Kitap Limani — Islamic Books & Educational E-commerce Store - View 1" },
    { src: "/images/portfolio/kitaplimani/mockup-2.webp", alt: "Kitap Limani — Islamic Books & Educational E-commerce Store screenshot 2", caption: "Kitap Limani — Islamic Books & Educational E-commerce Store - View 2" },
    { src: "/images/portfolio/kitaplimani/mockup-3.webp", alt: "Kitap Limani — Islamic Books & Educational E-commerce Store screenshot 3", caption: "Kitap Limani — Islamic Books & Educational E-commerce Store - View 3" }
    ],
  },
  {
    slug: "thebuttercreambus",
    title: "Mobile Bakery Site - E-Commerce, GPS Tracking, AI Cake Design",
    category: "Mobile App",
    tags: ["Mobile App", "React Native", "E-Commerce", "Mobile"],
    shortDesc: "The Buttercream Bus is a mobile-bakery website unifying retail e-commerce, live GPS truck tracking, event-catering booking, and baking-class registration und...",
    description: "The Buttercream Bus is a mobile-bakery website unifying retail e-commerce, live GPS truck tracking, event-catering booking, and baking-class registration under one brand. Its standout feature is an AI cake-design tool: a customer describes a concept and it generates four visual style options before ordering. This is a live-site case study documented from the public site, covering the e-commerce, tracking, booking, and AI-tool flows as observed.",
    problem: "The client needed a modern, scalable solution for mobile bakery site - e-commerce, gps tracking, ai cake design.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React Native", "Expo", "TypeScript"],
    gradientFrom: "#26c6da",
    gradientTo: "#00acc1",
    featured: false,
    image: "/images/portfolio/thebuttercreambus/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/thebuttercreambus/mockup-1.webp", alt: "Mobile Bakery Site - E-Commerce, GPS Tracking, AI Cake Design screenshot 1", caption: "Mobile Bakery Site - E-Commerce, GPS Tracking, AI Cake Design - View 1" },
    { src: "/images/portfolio/thebuttercreambus/mockup-2.webp", alt: "Mobile Bakery Site - E-Commerce, GPS Tracking, AI Cake Design screenshot 2", caption: "Mobile Bakery Site - E-Commerce, GPS Tracking, AI Cake Design - View 2" },
    { src: "/images/portfolio/thebuttercreambus/mockup-3.webp", alt: "Mobile Bakery Site - E-Commerce, GPS Tracking, AI Cake Design screenshot 3", caption: "Mobile Bakery Site - E-Commerce, GPS Tracking, AI Cake Design - View 3" },
    { src: "/images/portfolio/thebuttercreambus/mockup-4.webp", alt: "Mobile Bakery Site - E-Commerce, GPS Tracking, AI Cake Design screenshot 4", caption: "Mobile Bakery Site - E-Commerce, GPS Tracking, AI Cake Design - View 4" },
    { src: "/images/portfolio/thebuttercreambus/mockup-5.webp", alt: "Mobile Bakery Site - E-Commerce, GPS Tracking, AI Cake Design screenshot 5", caption: "Mobile Bakery Site - E-Commerce, GPS Tracking, AI Cake Design - View 5" }
    ],
  },
  {
    slug: "ultrawindows",
    title: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal",
    category: "AI",
    tags: ["AI", "Machine Learning", "E-Commerce"],
    shortDesc: "Ultra Windows is a UK premium aluminium-glazing manufacturer's site built around a live-pricing \"Design & Quote\" configurator with a faster \"Quick Sizes\" pre...",
    description: "Ultra Windows is a UK premium aluminium-glazing manufacturer's site built around a live-pricing \"Design & Quote\" configurator with a faster \"Quick Sizes\" preset path, backed by a 10-year guarantee and UK manufacturing as trust signals. A separate trade-professional portal on its own subdomain gives installers saved quotes and order tracking. This case study documents the live consumer site; the trade portal was referenced but not independently audited.",
    problem: "The client needed a modern, scalable solution for ultra windows - aluminium glazing e-commerce & trade portal.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#29b6f6",
    gradientTo: "#0288d1",
    featured: false,
    image: "/images/portfolio/ultrawindows/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/ultrawindows/mockup-1.webp", alt: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal screenshot 1", caption: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal - View 1" },
    { src: "/images/portfolio/ultrawindows/mockup-2.webp", alt: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal screenshot 2", caption: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal - View 2" },
    { src: "/images/portfolio/ultrawindows/mockup-3.webp", alt: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal screenshot 3", caption: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal - View 3" },
    { src: "/images/portfolio/ultrawindows/mockup-4.webp", alt: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal screenshot 4", caption: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal - View 4" },
    { src: "/images/portfolio/ultrawindows/mockup-5.webp", alt: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal screenshot 5", caption: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal - View 5" },
    { src: "/images/portfolio/ultrawindows/mockup-6.webp", alt: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal screenshot 6", caption: "Ultra Windows - Aluminium Glazing E-Commerce & Trade Portal - View 6" }
    ],
  },
  {
    slug: "apollo-credit-processing",
    title: "Apollo Credit Processing — Secure Node.js Deployment on GoDaddy VPS",
    category: "AI",
    tags: ["AI", "Machine Learning", "Node.js"],
    shortDesc: "Deployed a client-supplied Node.js credit-repair portal to a GoDaddy Ubuntu VPS in one day. Hardened the server (key-only SSH, root login off, ufw, fail2ban,...",
    description: "Deployed a client-supplied Node.js credit-repair portal to a GoDaddy Ubuntu VPS in one day. Hardened the server (key-only SSH, root login off, ufw, fail2ban, fixed silently disabled auto-updates), ran the app as a sandboxed systemd service behind Caddy with Let's Encrypt HTTPS, got Microsoft 365 SMTP working, verified the Square token live, set up nightly backups, and cut over DNS without touching mail records. Live at apollocreditprocessing.com.",
    problem: "The client needed a modern, scalable solution for apollo credit processing — secure node.js deployment on godaddy vps.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#ffca28",
    gradientTo: "#ffb300",
    featured: false,
    image: "/images/portfolio/apollo-credit-processing/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/apollo-credit-processing/mockup-1.webp", alt: "Apollo Credit Processing — Secure Node.js Deployment on GoDaddy VPS screenshot 1", caption: "Apollo Credit Processing — Secure Node.js Deployment on GoDaddy VPS - View 1" },
    { src: "/images/portfolio/apollo-credit-processing/mockup-2.webp", alt: "Apollo Credit Processing — Secure Node.js Deployment on GoDaddy VPS screenshot 2", caption: "Apollo Credit Processing — Secure Node.js Deployment on GoDaddy VPS - View 2" },
    { src: "/images/portfolio/apollo-credit-processing/mockup-3.webp", alt: "Apollo Credit Processing — Secure Node.js Deployment on GoDaddy VPS screenshot 3", caption: "Apollo Credit Processing — Secure Node.js Deployment on GoDaddy VPS - View 3" },
    { src: "/images/portfolio/apollo-credit-processing/mockup-4.webp", alt: "Apollo Credit Processing — Secure Node.js Deployment on GoDaddy VPS screenshot 4", caption: "Apollo Credit Processing — Secure Node.js Deployment on GoDaddy VPS - View 4" },
    { src: "/images/portfolio/apollo-credit-processing/mockup-5.webp", alt: "Apollo Credit Processing — Secure Node.js Deployment on GoDaddy VPS screenshot 5", caption: "Apollo Credit Processing — Secure Node.js Deployment on GoDaddy VPS - View 5" }
    ],
  },
  {
    slug: "bizbuybox",
    title: "Biz Buy Box — AI Deal Sourcing & Underwriting Platform",
    category: "SaaS",
    tags: ["SaaS", "Web App", "Next.js", "Dashboard"],
    shortDesc: "Biz Buy Box is an AI-powered deal-sourcing and underwriting SaaS I built end-to-end in Next.js for independent business searchers. It scores acquisition list...",
    description: "Biz Buy Box is an AI-powered deal-sourcing and underwriting SaaS I built end-to-end in Next.js for independent business searchers. It scores acquisition listings against the buyer's own weighted criteria, models SBA/seller-note/conventional funding stacks with real DSCR output, and includes a four-part AI suite (Deal Inspector, CIM Review, Business Plan, Buyer Profile) plus a full deal pipeline dashboard — replacing manual spreadsheet underwriting with one auditable workspace.",
    problem: "The client needed a modern, scalable solution for biz buy box — ai deal sourcing & underwriting platform.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
    gradientFrom: "#ff7043",
    gradientTo: "#f4511e",
    featured: false,
    image: "/images/portfolio/bizbuybox/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/bizbuybox/mockup-1.webp", alt: "Biz Buy Box — AI Deal Sourcing & Underwriting Platform screenshot 1", caption: "Biz Buy Box — AI Deal Sourcing & Underwriting Platform - View 1" },
    { src: "/images/portfolio/bizbuybox/mockup-2.webp", alt: "Biz Buy Box — AI Deal Sourcing & Underwriting Platform screenshot 2", caption: "Biz Buy Box — AI Deal Sourcing & Underwriting Platform - View 2" },
    { src: "/images/portfolio/bizbuybox/mockup-3.webp", alt: "Biz Buy Box — AI Deal Sourcing & Underwriting Platform screenshot 3", caption: "Biz Buy Box — AI Deal Sourcing & Underwriting Platform - View 3" },
    { src: "/images/portfolio/bizbuybox/mockup-4.webp", alt: "Biz Buy Box — AI Deal Sourcing & Underwriting Platform screenshot 4", caption: "Biz Buy Box — AI Deal Sourcing & Underwriting Platform - View 4" },
    { src: "/images/portfolio/bizbuybox/mockup-5.webp", alt: "Biz Buy Box — AI Deal Sourcing & Underwriting Platform screenshot 5", caption: "Biz Buy Box — AI Deal Sourcing & Underwriting Platform - View 5" }
    ],
  },
  {
    slug: "buyshopo",
    title: "Shopo Admin — Fashion E-commerce Admin Dashboard (React/Redux)",
    category: "AI",
    tags: ["AI", "Machine Learning", "React", "Dashboard", "E-Commerce"],
    shortDesc: "Shopo Admin is a Larkon-based React/Redux admin dashboard I built for the Buyshopo fashion e-commerce storefront, covering the full back-office surface: a st...",
    description: "Shopo Admin is a Larkon-based React/Redux admin dashboard I built for the Buyshopo fashion e-commerce storefront, covering the full back-office surface: a stats-first dashboard, catalog and multi-vendor brand management with commission tracking, orders and customers, a banner-marketing tool with click-through tracking, and a full theme/layout settings panel — giving non-technical staff complete control without touching code.",
    problem: "The client needed a modern, scalable solution for shopo admin — fashion e-commerce admin dashboard (react/redux).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#26c6da",
    gradientTo: "#00acc1",
    featured: false,
    image: "/images/portfolio/buyshopo/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/buyshopo/mockup-1.webp", alt: "Shopo Admin — Fashion E-commerce Admin Dashboard (React/Redux) screenshot 1", caption: "Shopo Admin — Fashion E-commerce Admin Dashboard (React/Redux) - View 1" },
    { src: "/images/portfolio/buyshopo/mockup-2.webp", alt: "Shopo Admin — Fashion E-commerce Admin Dashboard (React/Redux) screenshot 2", caption: "Shopo Admin — Fashion E-commerce Admin Dashboard (React/Redux) - View 2" },
    { src: "/images/portfolio/buyshopo/mockup-3.webp", alt: "Shopo Admin — Fashion E-commerce Admin Dashboard (React/Redux) screenshot 3", caption: "Shopo Admin — Fashion E-commerce Admin Dashboard (React/Redux) - View 3" },
    { src: "/images/portfolio/buyshopo/mockup-4.webp", alt: "Shopo Admin — Fashion E-commerce Admin Dashboard (React/Redux) screenshot 4", caption: "Shopo Admin — Fashion E-commerce Admin Dashboard (React/Redux) - View 4" },
    { src: "/images/portfolio/buyshopo/mockup-5.webp", alt: "Shopo Admin — Fashion E-commerce Admin Dashboard (React/Redux) screenshot 5", caption: "Shopo Admin — Fashion E-commerce Admin Dashboard (React/Redux) - View 5" }
    ],
  },
  {
    slug: "carsuvparts",
    title: "CarSUVParts — Auto Parts Storefront with VIN Search (Phase 1)",
    category: "AI",
    tags: ["AI", "Machine Learning", "React", "Dashboard", "API"],
    shortDesc: "I built phase 1 of CarSUVParts, the pre-launch website for a planned dropshipping auto parts store, live at carsuvparts.com: a Vite + React 19 + TypeScript s...",
    description: "I built phase 1 of CarSUVParts, the pre-launch website for a planned dropshipping auto parts store, live at carsuvparts.com: a Vite + React 19 + TypeScript storefront with real VIN decoding via the NHTSA API, a working cart that sends orders by email, search suggestions, a 71-make brand grid, policies, SEO, and an admin dashboard mockup with demo data. Still in progress: suppliers and payments are not connected yet.",
    problem: "The client needed a modern, scalable solution for carsuvparts — auto parts storefront with vin search (phase 1).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#ef5350",
    gradientTo: "#e53935",
    featured: false,
    image: "/images/portfolio/carsuvparts/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/carsuvparts/mockup-1.webp", alt: "CarSUVParts — Auto Parts Storefront with VIN Search (Phase 1) screenshot 1", caption: "CarSUVParts — Auto Parts Storefront with VIN Search (Phase 1) - View 1" },
    { src: "/images/portfolio/carsuvparts/mockup-2.webp", alt: "CarSUVParts — Auto Parts Storefront with VIN Search (Phase 1) screenshot 2", caption: "CarSUVParts — Auto Parts Storefront with VIN Search (Phase 1) - View 2" },
    { src: "/images/portfolio/carsuvparts/mockup-3.webp", alt: "CarSUVParts — Auto Parts Storefront with VIN Search (Phase 1) screenshot 3", caption: "CarSUVParts — Auto Parts Storefront with VIN Search (Phase 1) - View 3" },
    { src: "/images/portfolio/carsuvparts/mockup-4.webp", alt: "CarSUVParts — Auto Parts Storefront with VIN Search (Phase 1) screenshot 4", caption: "CarSUVParts — Auto Parts Storefront with VIN Search (Phase 1) - View 4" },
    { src: "/images/portfolio/carsuvparts/mockup-5.webp", alt: "CarSUVParts — Auto Parts Storefront with VIN Search (Phase 1) screenshot 5", caption: "CarSUVParts — Auto Parts Storefront with VIN Search (Phase 1) - View 5" }
    ],
  },
  {
    slug: "custom-ink-and-thread",
    title: "Custom Ink & Thread — Apparel Ordering Platform Takeover & Integration",
    category: "SaaS",
    tags: ["SaaS", "Web App", "Next.js"],
    shortDesc: "I took over development of a live custom apparel ordering platform (Next.js 16, Supabase, Stripe) built by a previous developer. I audited 17 owner-reported ...",
    description: "I took over development of a live custom apparel ordering platform (Next.js 16, Supabase, Stripe) built by a previous developer. I audited 17 owner-reported issues, then added QuickBooks Online order sync, UPS label cleaning and tracking, embroidery and DTF pricing fixes, guest capture with staff alerts and cart reminders, same-cart re-checkout, a New today admin inbox and SEO/404 fixes. A database-pool resilience fix is on a branch, not yet merged.",
    problem: "The client needed a modern, scalable solution for custom ink & thread — apparel ordering platform takeover & integration.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
    gradientFrom: "#a1c4fd",
    gradientTo: "#c2e9fb",
    featured: false,
    image: "/images/portfolio/custom-ink-and-thread/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/custom-ink-and-thread/mockup-1.webp", alt: "Custom Ink & Thread — Apparel Ordering Platform Takeover & Integration screenshot 1", caption: "Custom Ink & Thread — Apparel Ordering Platform Takeover & Integration - View 1" },
    { src: "/images/portfolio/custom-ink-and-thread/mockup-2.webp", alt: "Custom Ink & Thread — Apparel Ordering Platform Takeover & Integration screenshot 2", caption: "Custom Ink & Thread — Apparel Ordering Platform Takeover & Integration - View 2" },
    { src: "/images/portfolio/custom-ink-and-thread/mockup-3.webp", alt: "Custom Ink & Thread — Apparel Ordering Platform Takeover & Integration screenshot 3", caption: "Custom Ink & Thread — Apparel Ordering Platform Takeover & Integration - View 3" },
    { src: "/images/portfolio/custom-ink-and-thread/mockup-4.webp", alt: "Custom Ink & Thread — Apparel Ordering Platform Takeover & Integration screenshot 4", caption: "Custom Ink & Thread — Apparel Ordering Platform Takeover & Integration - View 4" },
    { src: "/images/portfolio/custom-ink-and-thread/mockup-5.webp", alt: "Custom Ink & Thread — Apparel Ordering Platform Takeover & Integration screenshot 5", caption: "Custom Ink & Thread — Apparel Ordering Platform Takeover & Integration - View 5" }
    ],
  },
  {
    slug: "fine-eat-ap",
    title: "Fina Eat — AI Kitchen Assistant for Instant Recipes & Shopping Lists",
    category: "AI",
    tags: ["AI", "Machine Learning", "React", "E-Commerce"],
    shortDesc: "Fina Eat is an AI-powered web app I designed and built that turns a few preferences (cuisine, time, allergies, household size) into 5 tailored recipes plus a...",
    description: "Fina Eat is an AI-powered web app I designed and built that turns a few preferences (cuisine, time, allergies, household size) into 5 tailored recipes plus a ready-to-shop grocery list in about 60 seconds, cutting meal-planning time from 70-105 minutes down to 25-60. Built with Bolt.new, React, and JavaScript, covering the full loop from a conversion-focused marketing site to AI recipe generation and shopping-list handoff.",
    problem: "The client needed a modern, scalable solution for fina eat — ai kitchen assistant for instant recipes & shopping lists.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#43e97b",
    gradientTo: "#38f9d7",
    featured: false,
    image: "/images/portfolio/fine-eat-ap/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/fine-eat-ap/mockup-1.webp", alt: "Fina Eat — AI Kitchen Assistant for Instant Recipes & Shopping Lists screenshot 1", caption: "Fina Eat — AI Kitchen Assistant for Instant Recipes & Shopping Lists - View 1" },
    { src: "/images/portfolio/fine-eat-ap/mockup-2.webp", alt: "Fina Eat — AI Kitchen Assistant for Instant Recipes & Shopping Lists screenshot 2", caption: "Fina Eat — AI Kitchen Assistant for Instant Recipes & Shopping Lists - View 2" },
    { src: "/images/portfolio/fine-eat-ap/mockup-3.webp", alt: "Fina Eat — AI Kitchen Assistant for Instant Recipes & Shopping Lists screenshot 3", caption: "Fina Eat — AI Kitchen Assistant for Instant Recipes & Shopping Lists - View 3" },
    { src: "/images/portfolio/fine-eat-ap/mockup-4.webp", alt: "Fina Eat — AI Kitchen Assistant for Instant Recipes & Shopping Lists screenshot 4", caption: "Fina Eat — AI Kitchen Assistant for Instant Recipes & Shopping Lists - View 4" },
    { src: "/images/portfolio/fine-eat-ap/mockup-5.webp", alt: "Fina Eat — AI Kitchen Assistant for Instant Recipes & Shopping Lists screenshot 5", caption: "Fina Eat — AI Kitchen Assistant for Instant Recipes & Shopping Lists - View 5" }
    ],
  },
  {
    slug: "gojetparts",
    title: "GoJetParts — Aviation Parts Referral Marketplace (Next.js 16 MVP)",
    category: "AI",
    tags: ["AI", "Machine Learning", "Next.js", "API"],
    shortDesc: "I built the phase-1 MVP of GoJetParts.com, an aviation-parts referral marketplace, on Next.js 16 and Tailwind v4: URL-based catalog search, static part pages...",
    description: "I built the phase-1 MVP of GoJetParts.com, an aviation-parts referral marketplace, on Next.js 16 and Tailwind v4: URL-based catalog search, static part pages built as ad landing pages, an RFQ dialog with UTM/gclid attribution that survives navigation, and a lead API that resolves partner and tracking code server-side, then emails the lead and fires a GA4 conversion. Assumptions documented for phase 2.",
    problem: "The client needed a modern, scalable solution for gojetparts — aviation parts referral marketplace (next.js 16 mvp).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#78909c",
    gradientTo: "#546e7a",
    featured: false,
    image: "/images/portfolio/gojetparts/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/gojetparts/mockup-1.webp", alt: "GoJetParts — Aviation Parts Referral Marketplace (Next.js 16 MVP) screenshot 1", caption: "GoJetParts — Aviation Parts Referral Marketplace (Next.js 16 MVP) - View 1" },
    { src: "/images/portfolio/gojetparts/mockup-2.webp", alt: "GoJetParts — Aviation Parts Referral Marketplace (Next.js 16 MVP) screenshot 2", caption: "GoJetParts — Aviation Parts Referral Marketplace (Next.js 16 MVP) - View 2" },
    { src: "/images/portfolio/gojetparts/mockup-3.webp", alt: "GoJetParts — Aviation Parts Referral Marketplace (Next.js 16 MVP) screenshot 3", caption: "GoJetParts — Aviation Parts Referral Marketplace (Next.js 16 MVP) - View 3" },
    { src: "/images/portfolio/gojetparts/mockup-4.webp", alt: "GoJetParts — Aviation Parts Referral Marketplace (Next.js 16 MVP) screenshot 4", caption: "GoJetParts — Aviation Parts Referral Marketplace (Next.js 16 MVP) - View 4" },
    { src: "/images/portfolio/gojetparts/mockup-5.webp", alt: "GoJetParts — Aviation Parts Referral Marketplace (Next.js 16 MVP) screenshot 5", caption: "GoJetParts — Aviation Parts Referral Marketplace (Next.js 16 MVP) - View 5" }
    ],
  },
  {
    slug: "guardremote",
    title: "GuardRemote — Smart-Security Storefront on Next.js 16 (In Progress)",
    category: "AI",
    tags: ["AI", "Machine Learning", "React", "Next.js"],
    shortDesc: "Ongoing build of GuardRemote, a smart-security hardware storefront live at guardremote.com. On Next.js 16, React 19, TypeScript and Tailwind v4, I built a st...",
    description: "Ongoing build of GuardRemote, a smart-security hardware storefront live at guardremote.com. On Next.js 16, React 19, TypeScript and Tailwind v4, I built a statically generated store with 17 product pages, 10 audience landing pages, bundles, quote forms backed by an email route with a mailto fallback, a supplier feed importer that applies a 30% margin, and SEO basics. I also redesigned it to a light glassmorphism look. Checkout isn't built yet and the catalog is still placeholder data.",
    problem: "The client needed a modern, scalable solution for guardremote — smart-security storefront on next.js 16 (in progress).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#66bb6a",
    gradientTo: "#43a047",
    featured: false,
    image: "/images/portfolio/guardremote/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/guardremote/mockup-1.webp", alt: "GuardRemote — Smart-Security Storefront on Next.js 16 (In Progress) screenshot 1", caption: "GuardRemote — Smart-Security Storefront on Next.js 16 (In Progress) - View 1" },
    { src: "/images/portfolio/guardremote/mockup-2.webp", alt: "GuardRemote — Smart-Security Storefront on Next.js 16 (In Progress) screenshot 2", caption: "GuardRemote — Smart-Security Storefront on Next.js 16 (In Progress) - View 2" },
    { src: "/images/portfolio/guardremote/mockup-3.webp", alt: "GuardRemote — Smart-Security Storefront on Next.js 16 (In Progress) screenshot 3", caption: "GuardRemote — Smart-Security Storefront on Next.js 16 (In Progress) - View 3" },
    { src: "/images/portfolio/guardremote/mockup-4.webp", alt: "GuardRemote — Smart-Security Storefront on Next.js 16 (In Progress) screenshot 4", caption: "GuardRemote — Smart-Security Storefront on Next.js 16 (In Progress) - View 4" },
    { src: "/images/portfolio/guardremote/mockup-5.webp", alt: "GuardRemote — Smart-Security Storefront on Next.js 16 (In Progress) screenshot 5", caption: "GuardRemote — Smart-Security Storefront on Next.js 16 (In Progress) - View 5" }
    ],
  },
  {
    slug: "herruby",
    title: "Her Ruby — Midlife Wellness Platform for Canadian Women",
    category: "SaaS",
    tags: ["SaaS", "Web App", "Mobile"],
    shortDesc: "Her Ruby is a mobile-first, PIPEDA-compliant wellness platform I designed and built for Canadian women navigating perimenopause and midlife burnout, built ar...",
    description: "Her Ruby is a mobile-first, PIPEDA-compliant wellness platform I designed and built for Canadian women navigating perimenopause and midlife burnout, built around four pillars: personalized body tracking, expert-curated programmes, verified peer communities, and an employer-fundable \"Wellness Wallet\" credits system. It also serves HR teams with anonymous aggregate reporting. Since launch it has supported 2,400+ women, with 94% reporting increased energy and a 4.9-star rating.",
    problem: "The client needed a modern, scalable solution for her ruby — midlife wellness platform for canadian women.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
    gradientFrom: "#a1c4fd",
    gradientTo: "#c2e9fb",
    featured: false,
    image: "/images/portfolio/herruby/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/herruby/mockup-1.webp", alt: "Her Ruby — Midlife Wellness Platform for Canadian Women screenshot 1", caption: "Her Ruby — Midlife Wellness Platform for Canadian Women - View 1" },
    { src: "/images/portfolio/herruby/mockup-2.webp", alt: "Her Ruby — Midlife Wellness Platform for Canadian Women screenshot 2", caption: "Her Ruby — Midlife Wellness Platform for Canadian Women - View 2" },
    { src: "/images/portfolio/herruby/mockup-3.webp", alt: "Her Ruby — Midlife Wellness Platform for Canadian Women screenshot 3", caption: "Her Ruby — Midlife Wellness Platform for Canadian Women - View 3" },
    { src: "/images/portfolio/herruby/mockup-4.webp", alt: "Her Ruby — Midlife Wellness Platform for Canadian Women screenshot 4", caption: "Her Ruby — Midlife Wellness Platform for Canadian Women - View 4" }
    ],
  },
  {
    slug: "moja-platform",
    title: "Moja Platform — DICOM Medical-Imaging Distribution System",
    category: "SaaS",
    tags: ["SaaS", "Web App", "React"],
    shortDesc: "Moja Platform is a DICOM medical-imaging distribution system I built for small clinics in Uganda and Kenya, collapsing \"get a patient their scan\" down to a t...",
    description: "Moja Platform is a DICOM medical-imaging distribution system I built for small clinics in Uganda and Kenya, collapsing \"get a patient their scan\" down to a token-secured link that opens in under 10 seconds on a cheap phone — no app, no login. I built dual DICOM intake paths, idempotent usage-quota billing, an offline-tolerant on-prem buffering gateway, per-country SMS/WhatsApp notifications, and a super-admin console with full audit trail. Stack: NestJS, PostgreSQL, Orthanc, React.",
    problem: "The client needed a modern, scalable solution for moja platform — dicom medical-imaging distribution system.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
    gradientFrom: "#5c6bc0",
    gradientTo: "#3949ab",
    featured: false,
    image: "/images/portfolio/moja-platform/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/moja-platform/mockup-1.webp", alt: "Moja Platform — DICOM Medical-Imaging Distribution System screenshot 1", caption: "Moja Platform — DICOM Medical-Imaging Distribution System - View 1" },
    { src: "/images/portfolio/moja-platform/mockup-2.webp", alt: "Moja Platform — DICOM Medical-Imaging Distribution System screenshot 2", caption: "Moja Platform — DICOM Medical-Imaging Distribution System - View 2" },
    { src: "/images/portfolio/moja-platform/mockup-3.webp", alt: "Moja Platform — DICOM Medical-Imaging Distribution System screenshot 3", caption: "Moja Platform — DICOM Medical-Imaging Distribution System - View 3" },
    { src: "/images/portfolio/moja-platform/mockup-4.webp", alt: "Moja Platform — DICOM Medical-Imaging Distribution System screenshot 4", caption: "Moja Platform — DICOM Medical-Imaging Distribution System - View 4" },
    { src: "/images/portfolio/moja-platform/mockup-5.webp", alt: "Moja Platform — DICOM Medical-Imaging Distribution System screenshot 5", caption: "Moja Platform — DICOM Medical-Imaging Distribution System - View 5" }
    ],
  },
  {
    slug: "moler-ai",
    title: "Molar AI — Automated Social Media Growth Platform for Dental Practices",
    category: "SaaS",
    tags: ["SaaS", "Web App", "Next.js", "API"],
    shortDesc: "Molar AI is a SaaS platform I built (Next.js, TypeScript, OpenAI API, Supabase) that automatically generates and schedules daily, brand-matched, clinically c...",
    description: "Molar AI is a SaaS platform I built (Next.js, TypeScript, OpenAI API, Supabase) that automatically generates and schedules daily, brand-matched, clinically credible social posts for dental practices, live in about 24 hours after onboarding. For one client it grew a following from 159 to 10.2K, contributing to 5.8M+ organic views platform-wide — at a flat $497/month versus the $3,000-5,000/month agencies typically charge.",
    problem: "The client needed a modern, scalable solution for molar ai — automated social media growth platform for dental practices.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
    gradientFrom: "#4facfe",
    gradientTo: "#00f2fe",
    featured: false,
    image: "/images/portfolio/moler-ai/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/moler-ai/mockup-1.webp", alt: "Molar AI — Automated Social Media Growth Platform for Dental Practices screenshot 1", caption: "Molar AI — Automated Social Media Growth Platform for Dental Practices - View 1" },
    { src: "/images/portfolio/moler-ai/mockup-2.webp", alt: "Molar AI — Automated Social Media Growth Platform for Dental Practices screenshot 2", caption: "Molar AI — Automated Social Media Growth Platform for Dental Practices - View 2" },
    { src: "/images/portfolio/moler-ai/mockup-3.webp", alt: "Molar AI — Automated Social Media Growth Platform for Dental Practices screenshot 3", caption: "Molar AI — Automated Social Media Growth Platform for Dental Practices - View 3" },
    { src: "/images/portfolio/moler-ai/mockup-4.webp", alt: "Molar AI — Automated Social Media Growth Platform for Dental Practices screenshot 4", caption: "Molar AI — Automated Social Media Growth Platform for Dental Practices - View 4" },
    { src: "/images/portfolio/moler-ai/mockup-5.webp", alt: "Molar AI — Automated Social Media Growth Platform for Dental Practices screenshot 5", caption: "Molar AI — Automated Social Media Growth Platform for Dental Practices - View 5" }
    ],
  },
  {
    slug: "moveempire",
    title: "MoveEmpire — Deploy, Security & Integration Fixes (Contributor)",
    category: "SaaS",
    tags: ["SaaS", "Web App", "React", "Node.js"],
    shortDesc: "Contributor on MoveEmpire, a client-owned multi-brand platform for a moving company (React, Node/Express, Prisma, Supabase, Railway). I audited a 7-item brie...",
    description: "Contributor on MoveEmpire, a client-owned multi-brand platform for a moving company (React, Node/Express, Prisma, Supabase, Railway). I audited a 7-item brief against current code and fixed the real gaps: a pre-deploy check that blocked releases on an optional variable, helmet security headers, clear SendGrid errors, a stale-toast race, and Google Search Console/GA4 status. All tested; pushed to a feature branch for review, not yet merged.",
    problem: "The client needed a modern, scalable solution for moveempire — deploy, security & integration fixes (contributor).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
    gradientFrom: "#43e97b",
    gradientTo: "#38f9d7",
    featured: false,
    image: "/images/portfolio/moveempire/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/moveempire/mockup-1.webp", alt: "MoveEmpire — Deploy, Security & Integration Fixes (Contributor) screenshot 1", caption: "MoveEmpire — Deploy, Security & Integration Fixes (Contributor) - View 1" },
    { src: "/images/portfolio/moveempire/mockup-2.webp", alt: "MoveEmpire — Deploy, Security & Integration Fixes (Contributor) screenshot 2", caption: "MoveEmpire — Deploy, Security & Integration Fixes (Contributor) - View 2" },
    { src: "/images/portfolio/moveempire/mockup-3.webp", alt: "MoveEmpire — Deploy, Security & Integration Fixes (Contributor) screenshot 3", caption: "MoveEmpire — Deploy, Security & Integration Fixes (Contributor) - View 3" },
    { src: "/images/portfolio/moveempire/mockup-4.webp", alt: "MoveEmpire — Deploy, Security & Integration Fixes (Contributor) screenshot 4", caption: "MoveEmpire — Deploy, Security & Integration Fixes (Contributor) - View 4" },
    { src: "/images/portfolio/moveempire/mockup-5.webp", alt: "MoveEmpire — Deploy, Security & Integration Fixes (Contributor) screenshot 5", caption: "MoveEmpire — Deploy, Security & Integration Fixes (Contributor) - View 5" }
    ],
  },
  {
    slug: "neighborfront",
    title: "The NeighborFRONT — Publishing Platform + Newsroom Dashboard",
    category: "SaaS",
    tags: ["SaaS", "Web App", "React", "Dashboard"],
    shortDesc: "The NeighborFRONT is a publishing platform I built for an independent Houston community-news brand — a public newsroom SPA with 140 pre-written articles and ...",
    description: "The NeighborFRONT is a publishing platform I built for an independent Houston community-news brand — a public newsroom SPA with 140 pre-written articles and instant search, plus an internal ~15-screen newsroom-operations dashboard managing articles, tips, sources, and ad sponsors around a shared editorial pipeline. Both apps share an 8-category taxonomy and 15-neighborhood domain model. Built with React 19, Vite 6, Tailwind CSS v4, and React Router 7 as a monorepo.",
    problem: "The client needed a modern, scalable solution for the neighborfront — publishing platform + newsroom dashboard.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
    gradientFrom: "#29b6f6",
    gradientTo: "#0288d1",
    featured: false,
    image: "/images/portfolio/neighborfront/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/neighborfront/mockup-1.webp", alt: "The NeighborFRONT — Publishing Platform + Newsroom Dashboard screenshot 1", caption: "The NeighborFRONT — Publishing Platform + Newsroom Dashboard - View 1" },
    { src: "/images/portfolio/neighborfront/mockup-2.webp", alt: "The NeighborFRONT — Publishing Platform + Newsroom Dashboard screenshot 2", caption: "The NeighborFRONT — Publishing Platform + Newsroom Dashboard - View 2" },
    { src: "/images/portfolio/neighborfront/mockup-3.webp", alt: "The NeighborFRONT — Publishing Platform + Newsroom Dashboard screenshot 3", caption: "The NeighborFRONT — Publishing Platform + Newsroom Dashboard - View 3" },
    { src: "/images/portfolio/neighborfront/mockup-4.webp", alt: "The NeighborFRONT — Publishing Platform + Newsroom Dashboard screenshot 4", caption: "The NeighborFRONT — Publishing Platform + Newsroom Dashboard - View 4" },
    { src: "/images/portfolio/neighborfront/mockup-5.webp", alt: "The NeighborFRONT — Publishing Platform + Newsroom Dashboard screenshot 5", caption: "The NeighborFRONT — Publishing Platform + Newsroom Dashboard - View 5" }
    ],
  },
  {
    slug: "paul-holland-mountain",
    title: "Holland Mountain — Email-OTP Access Gate (Next.js + Clerk)",
    category: "AI",
    tags: ["AI", "Machine Learning", "Next.js", "API"],
    shortDesc: "I built a server-side authentication gate for Holland Mountain, a private-capital consultancy, protecting a client-facing interactive deck of 68 AI use cases...",
    description: "I built a server-side authentication gate for Holland Mountain, a private-capital consultancy, protecting a client-facing interactive deck of 68 AI use cases. Built with Next.js 16 and Clerk, the gate enforces an email allowlist at sign-up so only approved addresses ever receive an OTP, with a custom branded sign-in screen (not Clerk's hosted page) and the gated content served verbatim from disk so a new deck drops in with zero risk to login logic.",
    problem: "The client needed a modern, scalable solution for holland mountain — email-otp access gate (next.js + clerk).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#ffca28",
    gradientTo: "#ffb300",
    featured: false,
    image: "/images/portfolio/paul-holland-mountain/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/paul-holland-mountain/mockup-1.webp", alt: "Holland Mountain — Email-OTP Access Gate (Next.js + Clerk) screenshot 1", caption: "Holland Mountain — Email-OTP Access Gate (Next.js + Clerk) - View 1" },
    { src: "/images/portfolio/paul-holland-mountain/mockup-2.webp", alt: "Holland Mountain — Email-OTP Access Gate (Next.js + Clerk) screenshot 2", caption: "Holland Mountain — Email-OTP Access Gate (Next.js + Clerk) - View 2" },
    { src: "/images/portfolio/paul-holland-mountain/mockup-3.webp", alt: "Holland Mountain — Email-OTP Access Gate (Next.js + Clerk) screenshot 3", caption: "Holland Mountain — Email-OTP Access Gate (Next.js + Clerk) - View 3" },
    { src: "/images/portfolio/paul-holland-mountain/mockup-4.webp", alt: "Holland Mountain — Email-OTP Access Gate (Next.js + Clerk) screenshot 4", caption: "Holland Mountain — Email-OTP Access Gate (Next.js + Clerk) - View 4" },
    { src: "/images/portfolio/paul-holland-mountain/mockup-5.webp", alt: "Holland Mountain — Email-OTP Access Gate (Next.js + Clerk) screenshot 5", caption: "Holland Mountain — Email-OTP Access Gate (Next.js + Clerk) - View 5" }
    ],
  },
  {
    slug: "robin-cut-scorer",
    title: "Cricket Live-Scoring App — Refresh & Scoring-Freeze Bug Fixes",
    category: "AI",
    tags: ["AI", "Machine Learning"],
    shortDesc: "Bug-fix engagement on a client's existing cricket live-scoring app (single-file JavaScript, Supabase, GitHub Pages). I traced tournaments vanishing on refres...",
    description: "Bug-fix engagement on a client's existing cricket live-scoring app (single-file JavaScript, Supabase, GitHub Pages). I traced tournaments vanishing on refresh to a stray token halting the script, and scoring freezes to Undo snapshots overflowing browser storage. Fixed both with no database changes, added a retrying cloud-save queue and paging past 1,000 rows, and verified 19/19 on the live database. Later added RLS scorer roles and NRR.",
    problem: "The client needed a modern, scalable solution for cricket live-scoring app — refresh & scoring-freeze bug fixes.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#fccb90",
    gradientTo: "#d57eeb",
    featured: false,
    image: "/images/portfolio/robin-cut-scorer/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/robin-cut-scorer/mockup-1.webp", alt: "Cricket Live-Scoring App — Refresh & Scoring-Freeze Bug Fixes screenshot 1", caption: "Cricket Live-Scoring App — Refresh & Scoring-Freeze Bug Fixes - View 1" },
    { src: "/images/portfolio/robin-cut-scorer/mockup-2.webp", alt: "Cricket Live-Scoring App — Refresh & Scoring-Freeze Bug Fixes screenshot 2", caption: "Cricket Live-Scoring App — Refresh & Scoring-Freeze Bug Fixes - View 2" },
    { src: "/images/portfolio/robin-cut-scorer/mockup-3.webp", alt: "Cricket Live-Scoring App — Refresh & Scoring-Freeze Bug Fixes screenshot 3", caption: "Cricket Live-Scoring App — Refresh & Scoring-Freeze Bug Fixes - View 3" },
    { src: "/images/portfolio/robin-cut-scorer/mockup-4.webp", alt: "Cricket Live-Scoring App — Refresh & Scoring-Freeze Bug Fixes screenshot 4", caption: "Cricket Live-Scoring App — Refresh & Scoring-Freeze Bug Fixes - View 4" },
    { src: "/images/portfolio/robin-cut-scorer/mockup-5.webp", alt: "Cricket Live-Scoring App — Refresh & Scoring-Freeze Bug Fixes screenshot 5", caption: "Cricket Live-Scoring App — Refresh & Scoring-Freeze Bug Fixes - View 5" }
    ],
  },
  {
    slug: "tryofferiq",
    title: "OfferIQ DealStream — Deal Sourcing & Live Analysis Platform",
    category: "SaaS",
    tags: ["SaaS", "Web App", "Next.js", "Node.js"],
    shortDesc: "OfferIQ DealStream is a two-sided SaaS platform I built for real estate wholesalers, letting investors run instant MAO calculations and five parallel exit-st...",
    description: "OfferIQ DealStream is a two-sided SaaS platform I built for real estate wholesalers, letting investors run instant MAO calculations and five parallel exit-strategy analyses in real time via \"Live Call Mode,\" then generate a matching contract for e-signature before the call ends. On the demand side it matches off-market deals to buyers' custom buy-box criteria and alerts them by email with a full profit breakdown. Built with Next.js, Node.js, and integrated subscription billing.",
    problem: "The client needed a modern, scalable solution for offeriq dealstream — deal sourcing & live analysis platform.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
    gradientFrom: "#29b6f6",
    gradientTo: "#0288d1",
    featured: false,
    image: "/images/portfolio/tryofferiq/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/tryofferiq/mockup-1.webp", alt: "OfferIQ DealStream — Deal Sourcing & Live Analysis Platform screenshot 1", caption: "OfferIQ DealStream — Deal Sourcing & Live Analysis Platform - View 1" },
    { src: "/images/portfolio/tryofferiq/mockup-2.webp", alt: "OfferIQ DealStream — Deal Sourcing & Live Analysis Platform screenshot 2", caption: "OfferIQ DealStream — Deal Sourcing & Live Analysis Platform - View 2" },
    { src: "/images/portfolio/tryofferiq/mockup-3.webp", alt: "OfferIQ DealStream — Deal Sourcing & Live Analysis Platform screenshot 3", caption: "OfferIQ DealStream — Deal Sourcing & Live Analysis Platform - View 3" },
    { src: "/images/portfolio/tryofferiq/mockup-4.webp", alt: "OfferIQ DealStream — Deal Sourcing & Live Analysis Platform screenshot 4", caption: "OfferIQ DealStream — Deal Sourcing & Live Analysis Platform - View 4" },
    { src: "/images/portfolio/tryofferiq/mockup-5.webp", alt: "OfferIQ DealStream — Deal Sourcing & Live Analysis Platform screenshot 5", caption: "OfferIQ DealStream — Deal Sourcing & Live Analysis Platform - View 5" }
    ],
  },
  {
    slug: "wellness-platinum-spa",
    title: "Platinum Wellness Spa — Booking PWA with Locked-Down PMS Integration",
    category: "AI",
    tags: ["AI", "Machine Learning", "API"],
    shortDesc: "I built an installable booking PWA for a luxury day/med-spa sitting in front of a locked-down, HIPAA-relevant PMS with a daily API budget. A Netlify Function...",
    description: "I built an installable booking PWA for a luxury day/med-spa sitting in front of a locked-down, HIPAA-relevant PMS with a daily API budget. A Netlify Functions proxy batches availability queries and learns a qualified-providers map at runtime, while booking requests flow through a separate Supabase/Resend path that never touches the PMS and always reads as a \"request,\" not a confirmed booking. Also built: rebooking, an FAQ chatbot, and a linked lead-capture microsite.",
    problem: "The client needed a modern, scalable solution for platinum wellness spa — booking pwa with locked-down pms integration.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    gradientFrom: "#ffca28",
    gradientTo: "#ffb300",
    featured: false,
    image: "/images/portfolio/wellness-platinum-spa/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/wellness-platinum-spa/mockup-1.webp", alt: "Platinum Wellness Spa — Booking PWA with Locked-Down PMS Integration screenshot 1", caption: "Platinum Wellness Spa — Booking PWA with Locked-Down PMS Integration - View 1" },
    { src: "/images/portfolio/wellness-platinum-spa/mockup-2.webp", alt: "Platinum Wellness Spa — Booking PWA with Locked-Down PMS Integration screenshot 2", caption: "Platinum Wellness Spa — Booking PWA with Locked-Down PMS Integration - View 2" },
    { src: "/images/portfolio/wellness-platinum-spa/mockup-3.webp", alt: "Platinum Wellness Spa — Booking PWA with Locked-Down PMS Integration screenshot 3", caption: "Platinum Wellness Spa — Booking PWA with Locked-Down PMS Integration - View 3" },
    { src: "/images/portfolio/wellness-platinum-spa/mockup-4.webp", alt: "Platinum Wellness Spa — Booking PWA with Locked-Down PMS Integration screenshot 4", caption: "Platinum Wellness Spa — Booking PWA with Locked-Down PMS Integration - View 4" },
    { src: "/images/portfolio/wellness-platinum-spa/mockup-5.webp", alt: "Platinum Wellness Spa — Booking PWA with Locked-Down PMS Integration screenshot 5", caption: "Platinum Wellness Spa — Booking PWA with Locked-Down PMS Integration - View 5" }
    ],
  },
  {
    slug: "amex-website",
    title: "Amex Technology — Agency Website & SEO Blog Platform",
    category: "Web",
    tags: ["Web Design", "Next.js", "Web"],
    shortDesc: "I designed and built amextechnology.com, my own software agency's site, on Next.js — a homepage covering services, trust metrics, and a portfolio, plus a tec...",
    description: "I designed and built amextechnology.com, my own software agency's site, on Next.js — a homepage covering services, trust metrics, and a portfolio, plus a technical centerpiece: a strongly-typed, statically-generated blog with no CMS. The content strategy deliberately targets low-competition, exact-error search queries around AI app builders (Bolt, Lovable, Replit) and their backend pairings, positioning the agency in front of developers most likely to need help.",
    problem: "The client needed a modern, scalable solution for amex technology — agency website & seo blog platform.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#ffca28",
    gradientTo: "#ffb300",
    featured: false,
    image: "/images/portfolio/amex-website/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/amex-website/mockup-1.webp", alt: "Amex Technology — Agency Website & SEO Blog Platform screenshot 1", caption: "Amex Technology — Agency Website & SEO Blog Platform - View 1" },
    { src: "/images/portfolio/amex-website/mockup-2.webp", alt: "Amex Technology — Agency Website & SEO Blog Platform screenshot 2", caption: "Amex Technology — Agency Website & SEO Blog Platform - View 2" },
    { src: "/images/portfolio/amex-website/mockup-3.webp", alt: "Amex Technology — Agency Website & SEO Blog Platform screenshot 3", caption: "Amex Technology — Agency Website & SEO Blog Platform - View 3" },
    { src: "/images/portfolio/amex-website/mockup-4.webp", alt: "Amex Technology — Agency Website & SEO Blog Platform screenshot 4", caption: "Amex Technology — Agency Website & SEO Blog Platform - View 4" },
    { src: "/images/portfolio/amex-website/mockup-5.webp", alt: "Amex Technology — Agency Website & SEO Blog Platform screenshot 5", caption: "Amex Technology — Agency Website & SEO Blog Platform - View 5" },
    { src: "/images/portfolio/amex-website/mockup-6.webp", alt: "Amex Technology — Agency Website & SEO Blog Platform screenshot 6", caption: "Amex Technology — Agency Website & SEO Blog Platform - View 6" },
    { src: "/images/portfolio/amex-website/mockup-7.webp", alt: "Amex Technology — Agency Website & SEO Blog Platform screenshot 7", caption: "Amex Technology — Agency Website & SEO Blog Platform - View 7" },
    { src: "/images/portfolio/amex-website/mockup-8.webp", alt: "Amex Technology — Agency Website & SEO Blog Platform screenshot 8", caption: "Amex Technology — Agency Website & SEO Blog Platform - View 8" },
    { src: "/images/portfolio/amex-website/mockup-9.webp", alt: "Amex Technology — Agency Website & SEO Blog Platform screenshot 9", caption: "Amex Technology — Agency Website & SEO Blog Platform - View 9" },
    { src: "/images/portfolio/amex-website/mockup-10.webp", alt: "Amex Technology — Agency Website & SEO Blog Platform screenshot 10", caption: "Amex Technology — Agency Website & SEO Blog Platform - View 10" }
    ],
  },
  {
    slug: "bukky-osifeso",
    title: "Bukky Osifeso — Personal & Speaker Website (hand-coded, single-file)",
    category: "Web",
    tags: ["Web Design", "Next.js", "Web"],
    shortDesc: "I built the personal and professional website for Bukky Osifeso, a People/HR strategist and author, as a single hand-coded HTML file with no framework, depen...",
    description: "I built the personal and professional website for Bukky Osifeso, a People/HR strategist and author, as a single hand-coded HTML file with no framework, dependencies, or backend. It's a dark editorial long-scroll routing four audiences to four next steps, featuring a hand-built inline-SVG world map plotting 44 cities across 32 countries, runtime-computed statistics that never go stale, and a thorough prefers-reduced-motion implementation across every animation.",
    problem: "The client needed a modern, scalable solution for bukky osifeso — personal & speaker website (hand-coded, single-file).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#5c6bc0",
    gradientTo: "#3949ab",
    featured: false,
    image: "/images/portfolio/bukky-osifeso/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/bukky-osifeso/mockup-1.webp", alt: "Bukky Osifeso — Personal & Speaker Website (hand-coded, single-file) screenshot 1", caption: "Bukky Osifeso — Personal & Speaker Website (hand-coded, single-file) - View 1" },
    { src: "/images/portfolio/bukky-osifeso/mockup-2.webp", alt: "Bukky Osifeso — Personal & Speaker Website (hand-coded, single-file) screenshot 2", caption: "Bukky Osifeso — Personal & Speaker Website (hand-coded, single-file) - View 2" },
    { src: "/images/portfolio/bukky-osifeso/mockup-3.webp", alt: "Bukky Osifeso — Personal & Speaker Website (hand-coded, single-file) screenshot 3", caption: "Bukky Osifeso — Personal & Speaker Website (hand-coded, single-file) - View 3" },
    { src: "/images/portfolio/bukky-osifeso/mockup-4.webp", alt: "Bukky Osifeso — Personal & Speaker Website (hand-coded, single-file) screenshot 4", caption: "Bukky Osifeso — Personal & Speaker Website (hand-coded, single-file) - View 4" },
    { src: "/images/portfolio/bukky-osifeso/mockup-5.webp", alt: "Bukky Osifeso — Personal & Speaker Website (hand-coded, single-file) screenshot 5", caption: "Bukky Osifeso — Personal & Speaker Website (hand-coded, single-file) - View 5" }
    ],
  },
  {
    slug: "cdieng",
    title: "TianCheng Development Group — Marketing Website (Next.js)",
    category: "Web",
    tags: ["Web Design", "Next.js", "Web"],
    shortDesc: "I built the public marketing website for TianCheng Development Group, a Southern California real estate developer whose pitch is one accountable team handlin...",
    description: "I built the public marketing website for TianCheng Development Group, a Southern California real estate developer whose pitch is one accountable team handling design, entitlement, and construction. It's a fast, server-rendered Next.js site covering a five-phase process, six development sectors, and a validated contact form, with a full SEO layer (metadata, Open Graph, sitemap) and a component system built to a matched visual reference, then filled with the client's real content.",
    problem: "The client needed a modern, scalable solution for tiancheng development group — marketing website (next.js).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#9ccc65",
    gradientTo: "#7cb342",
    featured: false,
    image: "/images/portfolio/cdieng/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/cdieng/mockup-1.webp", alt: "TianCheng Development Group — Marketing Website (Next.js) screenshot 1", caption: "TianCheng Development Group — Marketing Website (Next.js) - View 1" },
    { src: "/images/portfolio/cdieng/mockup-2.webp", alt: "TianCheng Development Group — Marketing Website (Next.js) screenshot 2", caption: "TianCheng Development Group — Marketing Website (Next.js) - View 2" },
    { src: "/images/portfolio/cdieng/mockup-3.webp", alt: "TianCheng Development Group — Marketing Website (Next.js) screenshot 3", caption: "TianCheng Development Group — Marketing Website (Next.js) - View 3" },
    { src: "/images/portfolio/cdieng/mockup-4.webp", alt: "TianCheng Development Group — Marketing Website (Next.js) screenshot 4", caption: "TianCheng Development Group — Marketing Website (Next.js) - View 4" },
    { src: "/images/portfolio/cdieng/mockup-5.webp", alt: "TianCheng Development Group — Marketing Website (Next.js) screenshot 5", caption: "TianCheng Development Group — Marketing Website (Next.js) - View 5" }
    ],
  },
  {
    slug: "eastendvintagesale",
    title: "East End Vintage Sale — Event Branding for a Toronto Pop-Up",
    category: "Web",
    tags: ["Web Design", "Web"],
    shortDesc: "I designed a retro pink-and-white, halftone-photography brand identity and a single-page event microsite for a Toronto community vintage-clothing pop-up's se...",
    description: "I designed a retro pink-and-white, halftone-photography brand identity and a single-page event microsite for a Toronto community vintage-clothing pop-up's second edition, on a limited budget with no permanent website. The page communicates date, place, and what to expect at a glance, answering visitors' likely questions about atmosphere and location — driving RSVPs and social engagement ahead of the event.",
    problem: "The client needed a modern, scalable solution for east end vintage sale — event branding for a toronto pop-up.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#78909c",
    gradientTo: "#546e7a",
    featured: false,
    image: "/images/portfolio/eastendvintagesale/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/eastendvintagesale/mockup-1.webp", alt: "East End Vintage Sale — Event Branding for a Toronto Pop-Up screenshot 1", caption: "East End Vintage Sale — Event Branding for a Toronto Pop-Up - View 1" },
    { src: "/images/portfolio/eastendvintagesale/mockup-2.webp", alt: "East End Vintage Sale — Event Branding for a Toronto Pop-Up screenshot 2", caption: "East End Vintage Sale — Event Branding for a Toronto Pop-Up - View 2" },
    { src: "/images/portfolio/eastendvintagesale/mockup-3.webp", alt: "East End Vintage Sale — Event Branding for a Toronto Pop-Up screenshot 3", caption: "East End Vintage Sale — Event Branding for a Toronto Pop-Up - View 3" },
    { src: "/images/portfolio/eastendvintagesale/mockup-4.webp", alt: "East End Vintage Sale — Event Branding for a Toronto Pop-Up screenshot 4", caption: "East End Vintage Sale — Event Branding for a Toronto Pop-Up - View 4" },
    { src: "/images/portfolio/eastendvintagesale/mockup-5.webp", alt: "East End Vintage Sale — Event Branding for a Toronto Pop-Up screenshot 5", caption: "East End Vintage Sale — Event Branding for a Toronto Pop-Up - View 5" }
    ],
  },
  {
    slug: "island-traffic",
    title: "Long Island Traffic Defense — Attorney Website",
    category: "Web",
    tags: ["Web Design", "Mobile", "Web"],
    shortDesc: "I built a conversion-oriented, bilingual (English/Spanish) single-page site for a Long Island traffic-defense attorney, covering core practice areas and lead...",
    description: "I built a conversion-oriented, bilingual (English/Spanish) single-page site for a Long Island traffic-defense attorney, covering core practice areas and leading with trust signals: 20+ years appearing in named Nassau/Suffolk courts, the real insurance-premium cost of an uncontested ticket, and Spanish-language support called out in the hero. Redundant tap-first CTAs and a dark navy theme target an anxious, mobile-first audience. Deployed on Vercel with local-SEO-structured content.",
    problem: "The client needed a modern, scalable solution for long island traffic defense — attorney website.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#f093fb",
    gradientTo: "#f5576c",
    featured: false,
    image: "/images/portfolio/island-traffic/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/island-traffic/mockup-1.webp", alt: "Long Island Traffic Defense — Attorney Website screenshot 1", caption: "Long Island Traffic Defense — Attorney Website - View 1" },
    { src: "/images/portfolio/island-traffic/mockup-2.webp", alt: "Long Island Traffic Defense — Attorney Website screenshot 2", caption: "Long Island Traffic Defense — Attorney Website - View 2" },
    { src: "/images/portfolio/island-traffic/mockup-3.webp", alt: "Long Island Traffic Defense — Attorney Website screenshot 3", caption: "Long Island Traffic Defense — Attorney Website - View 3" },
    { src: "/images/portfolio/island-traffic/mockup-4.webp", alt: "Long Island Traffic Defense — Attorney Website screenshot 4", caption: "Long Island Traffic Defense — Attorney Website - View 4" },
    { src: "/images/portfolio/island-traffic/mockup-5.webp", alt: "Long Island Traffic Defense — Attorney Website screenshot 5", caption: "Long Island Traffic Defense — Attorney Website - View 5" }
    ],
  },
  {
    slug: "mito-shred",
    title: "MitoShred — Direct-Response Supplement Offer Page + Compliance Pages",
    category: "Web",
    tags: ["Web Design", "Payments", "Web"],
    shortDesc: "I built the direct-response sales page and compliance pages for MitoShred, a fat-loss supplement offer for men over 40 — a long-form problem-mechanism-proof-...",
    description: "I built the direct-response sales page and compliance pages for MitoShred, a fat-loss supplement offer for men over 40 — a long-form problem-mechanism-proof-offer narrative with tiered pricing, a 60-day guarantee, and an objection-handling FAQ, plus FTC/FDA-style Terms, Privacy, and Refunds pages required for ad platforms and payment processors. Built as static HTML/Tailwind with no build step, editable by a non-technical marketer.",
    problem: "The client needed a modern, scalable solution for mitoshred — direct-response supplement offer page + compliance pages.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#8d6e63",
    gradientTo: "#6d4c41",
    featured: false,
    image: "/images/portfolio/mito-shred/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/mito-shred/mockup-1.webp", alt: "MitoShred — Direct-Response Supplement Offer Page + Compliance Pages screenshot 1", caption: "MitoShred — Direct-Response Supplement Offer Page + Compliance Pages - View 1" },
    { src: "/images/portfolio/mito-shred/mockup-2.webp", alt: "MitoShred — Direct-Response Supplement Offer Page + Compliance Pages screenshot 2", caption: "MitoShred — Direct-Response Supplement Offer Page + Compliance Pages - View 2" },
    { src: "/images/portfolio/mito-shred/mockup-3.webp", alt: "MitoShred — Direct-Response Supplement Offer Page + Compliance Pages screenshot 3", caption: "MitoShred — Direct-Response Supplement Offer Page + Compliance Pages - View 3" },
    { src: "/images/portfolio/mito-shred/mockup-4.webp", alt: "MitoShred — Direct-Response Supplement Offer Page + Compliance Pages screenshot 4", caption: "MitoShred — Direct-Response Supplement Offer Page + Compliance Pages - View 4" },
    { src: "/images/portfolio/mito-shred/mockup-5.webp", alt: "MitoShred — Direct-Response Supplement Offer Page + Compliance Pages screenshot 5", caption: "MitoShred — Direct-Response Supplement Offer Page + Compliance Pages - View 5" }
    ],
  },
  {
    slug: "portland-self-defense",
    title: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense",
    category: "Web",
    tags: ["Web Design", "API", "Web"],
    shortDesc: "A fix-and-verify engagement on a large custom PHP/MySQL martial-arts school site: I delivered a hardened public-form security stack (reCAPTCHA v3, honeypot, ...",
    description: "A fix-and-verify engagement on a large custom PHP/MySQL martial-arts school site: I delivered a hardened public-form security stack (reCAPTCHA v3, honeypot, CSRF, rate limiting), a GoHighLevel CRM integration upserting every lead correctly tagged, and deduplicated Meta Pixel + Conversions API purchase tracking on the Stripe intro-offer checkout — consolidating four separate lead forms onto one shared handler so fixes land once, centrally.",
    problem: "The client needed a modern, scalable solution for form security, gohighlevel crm & meta capi — portland self-defense.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#fa709a",
    gradientTo: "#fee140",
    featured: false,
    image: "/images/portfolio/portland-self-defense/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/portland-self-defense/mockup-1.webp", alt: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense screenshot 1", caption: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense - View 1" },
    { src: "/images/portfolio/portland-self-defense/mockup-2.webp", alt: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense screenshot 2", caption: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense - View 2" },
    { src: "/images/portfolio/portland-self-defense/mockup-3.webp", alt: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense screenshot 3", caption: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense - View 3" },
    { src: "/images/portfolio/portland-self-defense/mockup-4.webp", alt: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense screenshot 4", caption: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense - View 4" },
    { src: "/images/portfolio/portland-self-defense/mockup-5.webp", alt: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense screenshot 5", caption: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense - View 5" },
    { src: "/images/portfolio/portland-self-defense/mockup-6.webp", alt: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense screenshot 6", caption: "Form Security, GoHighLevel CRM & Meta CAPI — Portland Self-Defense - View 6" }
    ],
  },
  {
    slug: "rooted-and-rising",
    title: "Rooted and Rising — Book Launch Landing Page",
    category: "Web",
    tags: ["Web Design", "Web"],
    shortDesc: "I built the launch site for Rooted and Rising, Bukky Osifeso's book — a cream-and-serif, JavaScript-free long-scroll page positioning the book to six reader ...",
    description: "I built the launch site for Rooted and Rising, Bukky Osifeso's book — a cream-and-serif, JavaScript-free long-scroll page positioning the book to six reader archetypes, framing chapters with Yoruba proverbs, and linking straight to Amazon. It's one ~39KB HTML file with inline CSS and zero JavaScript, capturing reader emails via a single webhook call, deliberately styled distinct from the author's separate personal site.",
    problem: "The client needed a modern, scalable solution for rooted and rising — book launch landing page.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    featured: false,
    image: "/images/portfolio/rooted-and-rising/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/rooted-and-rising/mockup-1.webp", alt: "Rooted and Rising — Book Launch Landing Page screenshot 1", caption: "Rooted and Rising — Book Launch Landing Page - View 1" },
    { src: "/images/portfolio/rooted-and-rising/mockup-2.webp", alt: "Rooted and Rising — Book Launch Landing Page screenshot 2", caption: "Rooted and Rising — Book Launch Landing Page - View 2" },
    { src: "/images/portfolio/rooted-and-rising/mockup-3.webp", alt: "Rooted and Rising — Book Launch Landing Page screenshot 3", caption: "Rooted and Rising — Book Launch Landing Page - View 3" },
    { src: "/images/portfolio/rooted-and-rising/mockup-4.webp", alt: "Rooted and Rising — Book Launch Landing Page screenshot 4", caption: "Rooted and Rising — Book Launch Landing Page - View 4" },
    { src: "/images/portfolio/rooted-and-rising/mockup-5.webp", alt: "Rooted and Rising — Book Launch Landing Page screenshot 5", caption: "Rooted and Rising — Book Launch Landing Page - View 5" }
    ],
  },
  {
    slug: "tame-the-jungle",
    title: "Tame The Jungle — HTML to Native Wix Rebuild (In Progress)",
    category: "Web",
    tags: ["Web Design", "Next.js", "Node.js", "Mobile", "API"],
    shortDesc: "I'm rebuilding Tame The Jungle's HTML design as a native Wix site (in progress). I decoded the bundler-exported source with a Node script into exact per-page...",
    description: "I'm rebuilding Tame The Jungle's HTML design as a native Wix site (in progress). I decoded the bundler-exported source with a Node script into exact per-page copy, confirmed Wix has no HTML import or layout API, and produced a Wix design system, an 8-page map that keeps existing ranked URLs, optimized assets, and a full build guide with editor prompts. The Editor build and mobile pass come next.",
    problem: "The client needed a modern, scalable solution for tame the jungle — html to native wix rebuild (in progress).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#a18cd1",
    gradientTo: "#fbc2eb",
    featured: false,
    image: "/images/portfolio/tame-the-jungle/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/tame-the-jungle/mockup-1.webp", alt: "Tame The Jungle — HTML to Native Wix Rebuild (In Progress) screenshot 1", caption: "Tame The Jungle — HTML to Native Wix Rebuild (In Progress) - View 1" },
    { src: "/images/portfolio/tame-the-jungle/mockup-2.webp", alt: "Tame The Jungle — HTML to Native Wix Rebuild (In Progress) screenshot 2", caption: "Tame The Jungle — HTML to Native Wix Rebuild (In Progress) - View 2" },
    { src: "/images/portfolio/tame-the-jungle/mockup-3.webp", alt: "Tame The Jungle — HTML to Native Wix Rebuild (In Progress) screenshot 3", caption: "Tame The Jungle — HTML to Native Wix Rebuild (In Progress) - View 3" },
    { src: "/images/portfolio/tame-the-jungle/mockup-4.webp", alt: "Tame The Jungle — HTML to Native Wix Rebuild (In Progress) screenshot 4", caption: "Tame The Jungle — HTML to Native Wix Rebuild (In Progress) - View 4" }
    ],
  },
  {
    slug: "we-are-tag-group",
    title: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress)",
    category: "Web",
    tags: ["Web Design", "WordPress", "Web"],
    shortDesc: "I ran a technical SEO diagnosis and fix for The TAG Group's WordPress/Elementor site, which was appearing in Google as a bare URL with no title. I traced the...",
    description: "I ran a technical SEO diagnosis and fix for The TAG Group's WordPress/Elementor site, which was appearing in Google as a bare URL with no title. I traced the real cause to a site-wide \"Discourage search engines\" setting injecting noindex on every page, disabled it, verified the fix live, and re-checked metadata and structured data — also setting up Search Console and a recurring monthly SEO monitoring cadence.",
    problem: "The client needed a modern, scalable solution for technical seo diagnosis, fix & monitoring — wearetag.ai (wordpress).",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
    featured: false,
    image: "/images/portfolio/we-are-tag-group/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/we-are-tag-group/mockup-1.webp", alt: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) screenshot 1", caption: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) - View 1" },
    { src: "/images/portfolio/we-are-tag-group/mockup-2.webp", alt: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) screenshot 2", caption: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) - View 2" },
    { src: "/images/portfolio/we-are-tag-group/mockup-3.webp", alt: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) screenshot 3", caption: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) - View 3" },
    { src: "/images/portfolio/we-are-tag-group/mockup-4.webp", alt: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) screenshot 4", caption: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) - View 4" },
    { src: "/images/portfolio/we-are-tag-group/mockup-5.webp", alt: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) screenshot 5", caption: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) - View 5" },
    { src: "/images/portfolio/we-are-tag-group/mockup-6.webp", alt: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) screenshot 6", caption: "Technical SEO Diagnosis, Fix & Monitoring — wearetag.ai (WordPress) - View 6" }
    ],
  },
  {
    slug: "whartoncarpetcleaning",
    title: "Wharton Carpet Cleaning — Local Service Business Website",
    category: "Web",
    tags: ["Web Design", "Web"],
    shortDesc: "I built a conversion-focused local-service website for Joel Wharton, an IICRC-certified Phoenix carpet cleaner, with an above-the-fold lead form, six dedicat...",
    description: "I built a conversion-focused local-service website for Joel Wharton, an IICRC-certified Phoenix carpet cleaner, with an above-the-fold lead form, six dedicated service pages, a repeatable 3-step process on each, and live Google review integration (475 reviews, 5 stars). Every CTA offers three equal-weight paths — text, call, or form — with local SEO structured across seven Phoenix-metro cities. Built with hand-coded HTML, CSS, and JavaScript for fast load times.",
    problem: "The client needed a modern, scalable solution for wharton carpet cleaning — local service business website.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#5c6bc0",
    gradientTo: "#3949ab",
    featured: false,
    image: "/images/portfolio/whartoncarpetcleaning/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/whartoncarpetcleaning/mockup-1.webp", alt: "Wharton Carpet Cleaning — Local Service Business Website screenshot 1", caption: "Wharton Carpet Cleaning — Local Service Business Website - View 1" },
    { src: "/images/portfolio/whartoncarpetcleaning/mockup-2.webp", alt: "Wharton Carpet Cleaning — Local Service Business Website screenshot 2", caption: "Wharton Carpet Cleaning — Local Service Business Website - View 2" },
    { src: "/images/portfolio/whartoncarpetcleaning/mockup-3.webp", alt: "Wharton Carpet Cleaning — Local Service Business Website screenshot 3", caption: "Wharton Carpet Cleaning — Local Service Business Website - View 3" },
    { src: "/images/portfolio/whartoncarpetcleaning/mockup-4.webp", alt: "Wharton Carpet Cleaning — Local Service Business Website screenshot 4", caption: "Wharton Carpet Cleaning — Local Service Business Website - View 4" },
    { src: "/images/portfolio/whartoncarpetcleaning/mockup-5.webp", alt: "Wharton Carpet Cleaning — Local Service Business Website screenshot 5", caption: "Wharton Carpet Cleaning — Local Service Business Website - View 5" },
    { src: "/images/portfolio/whartoncarpetcleaning/mockup-6.webp", alt: "Wharton Carpet Cleaning — Local Service Business Website screenshot 6", caption: "Wharton Carpet Cleaning — Local Service Business Website - View 6" }
    ],
  },
  {
    slug: "wideeyedgiantcom",
    title: "Wide Eyed Giant — WordPress / Elementor Layout Rescue & CSS Cleanup",
    category: "Web",
    tags: ["Web Design", "WordPress", "Web"],
    shortDesc: "I diagnosed and fixed a WordPress/Elementor layout-drift bug on a membership recipe blog: the real offsets were per-widget Elementor margin settings invisibl...",
    description: "I diagnosed and fixed a WordPress/Elementor layout-drift bug on a membership recipe blog: the real offsets were per-widget Elementor margin settings invisible in the stylesheet, not the 1,735-line Additional CSS (which mostly targeted a removed template). I replaced it with 265 scoped lines, rebuilt the subcategory row as a fixed grid, and verified alignment across six breakpoints — also catching a silent WordPress CSS-sanitizer data-loss bug along the way.",
    problem: "The client needed a modern, scalable solution for wide eyed giant — wordpress / elementor layout rescue & css cleanup.",
    solution: "We designed and developed a comprehensive solution leveraging modern technologies, ensuring performance, scalability, and an exceptional user experience.",
    results: [
    "Delivered a high-quality, production-ready solution",
    "Improved user experience with modern UI/UX design",
    "Ensured cross-platform compatibility and responsive design"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js"],
    gradientFrom: "#4facfe",
    gradientTo: "#00f2fe",
    featured: false,
    image: "/images/portfolio/wideeyedgiantcom/mockup-1.webp",
    gallery: [
    { src: "/images/portfolio/wideeyedgiantcom/mockup-1.webp", alt: "Wide Eyed Giant — WordPress / Elementor Layout Rescue & CSS Cleanup screenshot 1", caption: "Wide Eyed Giant — WordPress / Elementor Layout Rescue & CSS Cleanup - View 1" },
    { src: "/images/portfolio/wideeyedgiantcom/mockup-2.webp", alt: "Wide Eyed Giant — WordPress / Elementor Layout Rescue & CSS Cleanup screenshot 2", caption: "Wide Eyed Giant — WordPress / Elementor Layout Rescue & CSS Cleanup - View 2" },
    { src: "/images/portfolio/wideeyedgiantcom/mockup-3.webp", alt: "Wide Eyed Giant — WordPress / Elementor Layout Rescue & CSS Cleanup screenshot 3", caption: "Wide Eyed Giant — WordPress / Elementor Layout Rescue & CSS Cleanup - View 3" },
    { src: "/images/portfolio/wideeyedgiantcom/mockup-4.webp", alt: "Wide Eyed Giant — WordPress / Elementor Layout Rescue & CSS Cleanup screenshot 4", caption: "Wide Eyed Giant — WordPress / Elementor Layout Rescue & CSS Cleanup - View 4" },
    { src: "/images/portfolio/wideeyedgiantcom/mockup-5.webp", alt: "Wide Eyed Giant — WordPress / Elementor Layout Rescue & CSS Cleanup screenshot 5", caption: "Wide Eyed Giant — WordPress / Elementor Layout Rescue & CSS Cleanup - View 5" }
    ],
  },
];

export const categories = ["All", "Web", "Mobile App", "SaaS", "AI", "Automation"] as const;

// Tech-stack groups used to showcase projects by stack (portfolio filter and
// homepage). A project belongs to a group when any of its technologies match.
export const stackGroups = [
  { name: "Next.js", match: ["Next.js"] },
  { name: "React", match: ["React", "Vite"] },
  { name: "TypeScript", match: ["TypeScript"] },
  { name: "Supabase", match: ["Supabase"] },
  { name: "Node.js", match: ["Node.js", "Express"] },
  { name: "PostgreSQL & MySQL", match: ["PostgreSQL", "Neon Postgres", "MySQL", "Drizzle ORM", "Prisma"] },
  { name: "AI & OpenAI", match: ["OpenAI", "AI Voice Agents"] },
  { name: "React Native", match: ["React Native", "Expo"] },
  { name: "WordPress", match: ["WordPress", "Elementor Pro"] },
  { name: "PHP", match: ["PHP"] },
  { name: "HTML & CSS", match: ["HTML", "CSS"] },
  { name: "GoHighLevel", match: ["GoHighLevel", "GoHighLevel API"] },
  { name: "Lovable", match: ["Lovable"] },
] as const;
export type StackName = (typeof stackGroups)[number]["name"];

export function projectsForStack(list: Project[], stack: string): Project[] {
  const group = stackGroups.find((g) => g.name === stack);
  if (!group) return list;
  return list.filter((p) => p.technologies.some((t) => (group.match as readonly string[]).includes(t)));
}
export type Category = (typeof categories)[number];
