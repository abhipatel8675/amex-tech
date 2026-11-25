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
    tags: ["Agency Website", "Lead Generation", "Website"],
    shortDesc:
      "A multi-page website for a small-business agency that sells website, customer follow-up and AI packages, built to turn visitors into booked consultations.",
    description:
      "Portland Web Designing Studio sells one connected package to local businesses: a website, a customer follow-up system, automatic text and email messages, and an AI customer assistant. We built the agency's own website from start to finish, matched closely to the owner's reference designs, and improved it over three versions until it was ready for their live domain.",
    problem:
      "The agency needed to explain a bundled offer to business owners with no technical background and send every page toward one action: booking a free strategy consultation. The owner supplied reference designs that had to be matched closely, and the live domain uses basic shared hosting, so the final site had to be simple enough to run there.",
    solution:
      "We built Home, About, Our System, Portfolio, Pricing and Contact pages with a shared header and footer and a booking pop-up (date picker, time slots and business details) available from every page. The portfolio has industry filters and case-study pop-ups. The final site is built to run on the agency's existing shared hosting without any special setup.",
    results: [
      "Live at portlanddigitalstudio.com",
      "Six pages plus a booking pop-up available from every page",
      "Closely matched to the owner's reference designs and checked on screens from small phones to large monitors",
      "Runs on the agency's existing shared hosting"
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
      "A US manufacturer directory built to be found on Google: browse verified manufacturers by category and state.",
    description:
      "FirmsLedger is our own product: a US-only directory where buyers such as purchasing managers, engineers and equipment makers browse manufacturers by category and state, and manufacturers get a free profile page that brings in enquiries. It started as a general business directory and was rebuilt as a manufacturing-only directory.",
    problem:
      "Buyers looking for US manufacturers rely on scattered directories, trade-show contacts and general web searches. A directory that wants to win that search traffic needs a real page for every category and state, and has to stay fast, easy for Google to read and affordable to run as the number of companies grows into the hundreds of thousands.",
    solution:
      "We built pages for every category, state and subcategory, and company profile pages that only appear in Google once they are approved and filled in. Similar searches such as \"top 10\" and \"best\" lead to a single page, so there are no duplicates. Manufacturers can list themselves through a free form or an invite link, and a simple admin area handles approvals. A separate tool collects company information and flags likely duplicates. We also tuned how pages are stored so the site stays inexpensive to run when traffic is quiet.",
    results: [
      "Live at firmsledger.com, covering all 50 US states",
      "Pages for every category, state and subcategory, built to be found on Google",
      "Free self-service listing form plus invite-link sign-up with admin approval",
      "Profiles only shown to Google once approved and complete"
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
      "A business-funding marketplace: apply once, link your bank, and get matched with a lending partner.",
    description:
      "GoSwiftFund is a business-funding marketplace for small-business owners. It isn't a lender. It's the application and matching service that sits in front of lenders. Owners pick a funding product, apply once through a guided form, link their business bank account, and their application is stored securely and sent to the right lending partner.",
    problem:
      "A funding broker has to collect highly sensitive information, including Social Security numbers, business tax IDs, revenue and bank access, in a way that passes a compliance review. It also has to decide which lending partner each applicant should go to, while partner agreements and legal wording are still being finalized.",
    solution:
      "We built the marketing website and a guided application with a separate path for each product (Instant, Merchant Cash Advance, Commercial and SBA), each checking its own fields. Business bank linking runs through Plaid, and credit-check and contact consent are recorded with a date and the version of the wording shown. Social Security numbers and bank connections are stored in encrypted form. Each submission is matched to a main lending partner and backups based on credit range, revenue, amount and purpose, and the decision is saved for follow-up. Dedicated SBA and revenue-based funding pages and an English/Spanish switch complete the site.",
    results: [
      "Live at goswiftfund.com with a separate application path for each product",
      "Mobile accessibility score raised from 92 to 100",
      "Social Security numbers and bank connections stored in encrypted form",
      "Full test passed: bank link, SBA application, matched and saved"
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
    tags: ["Bilingual", "Arabic", "Startup"],
    shortDesc:
      "A bilingual English and Arabic website for a Saudi shared-commuting startup, designed for right-to-left reading from day one.",
    description:
      "Sawa (سوا) is a Jeddah-based shared-commuting startup. Instead of on-demand rides, it organizes fixed, recurring routes: drivers publish daily routes, employees join on monthly plans, and companies sign corporate commute partnerships. We built its main website in English and Arabic as a single site.",
    problem:
      "Sawa needed one page that speaks to two audiences, commuters and companies, and works just as well in English as in Arabic, which reads right to left. The source material was an investor presentation that mixed public brand content with investor-only information that must not be published.",
    solution:
      "We built separate English and Arabic versions that share the same design, with layouts that flip correctly for right-to-left reading. All the wording for each language is kept separately, so adding Arabic later was a content update rather than a rebuild. Arabic uses a proper Arabic font throughout. A company enquiry form sends a branded email, and each language has its own search settings and sharing image.",
    results: [
      "English and Arabic versions with full right-to-left layout from one site",
      "Arabic added as a content update with no redesign needed",
      "Company enquiries delivered as a branded email",
      "Separate search settings and sharing images for each language"
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
      "Fixed a silent loss of enquiries and rebuilt the website-to-GoHighLevel connection so every enquiry lands in the CRM with its source and labels.",
    description:
      "Portland Academy of Self-Defense is a martial-arts school serving the Portland, Oregon area. Their existing website feeds a sales pipeline in GoHighLevel. We were brought in to fix the path between the website and the CRM, not to build the website, so that every enquiry reaches GoHighLevel with the right source, labels and notes.",
    problem:
      "Leads were quietly being lost. The connection between the website and the CRM had been switched off, so every website enquiry was saved and emailed but never reached GoHighLevel, while visitors still saw a thank-you page. The enquiry form also failed now and then with a \"Submission expired or invalid\" message, free-text and workshop details were dropped before reaching anyone, and a repeat enquiry could wipe a contact's earlier program labels.",
    solution:
      "We traced the failure to an expired connection with GoHighLevel, replaced it and tested it live. We then rebuilt the connection as one shared process: it finds existing contacts by email or phone, keeps the original lead source, adds new labels without removing old ones, and writes a readable note with the person's program interest and message. Each of the four lead forms now maps to its own GoHighLevel source and labels. We also fixed the form's spam protection so a second browser tab or testing session no longer breaks submissions.",
    results: [
      "Website enquiries reach GoHighLevel again, tested on the live account",
      "Four lead forms each mapped to their own source and labels",
      "Repeat enquiries keep the original source and add labels to the same contact",
      "Messages and workshop details now saved in the contact note",
      "\"Submission expired\" errors fixed without weakening spam protection"
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
      "A website built to win calls for a Long Island traffic-defense attorney serving Nassau and Suffolk County.",
    description:
      "Island Traffic Defense is a single-page website for a Long Island attorney who handles traffic-ticket and moving-violation cases across Nassau and Suffolk County, New York. It is built around one audience, drivers who just got a ticket, and one action: call or schedule a consultation.",
    problem:
      "Drivers with a ticket have a short time to decide what to do, have usually never hired a traffic lawyer, and underestimate what a conviction really costs through points and higher insurance. The site had to build trust quickly, make contact easy on a phone, and reach the area's Spanish-speaking drivers.",
    solution:
      "We built a fast, dark-themed single page: an opening section focused on the local area, three cards explaining the value, six cards for the types of cases handled, a section on the multi-year insurance cost of a conviction, and a section on local court knowledge naming the Nassau and Suffolk County traffic agencies. A tap-to-call button stays at the top, calls to action repeat down the page, and Spanish-language support is mentioned at the very top.",
    results: [
      "Live online and easy to use from large screens down to a single phone column",
      "Tap-to-call button visible at every point of the page",
      "Spanish-language support highlighted at the top of the page",
      "Wording written around Nassau, Suffolk and Long Island searches"
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
      "A company website for a real estate development group that handles projects from first drawing to finished building.",
    description:
      "TianCheng Development Group is a real estate development company that carries projects from start to finish, including feasibility, design, permits, construction and delivery, with one accountable team. We built a company website that presents their services, project portfolio, client list and a direct way for new site and building enquiries to reach them.",
    problem:
      "Property owners and investors evaluating a developer want proof of scale and process before they hand over a site. TianCheng needed a credible website that laid out their full range of services, showed completed projects, and named the kind of clients they had already delivered for.",
    solution:
      "We built a clean, dark-toned website with a full-width city skyline image at the top, a services section walking through the process from feasibility to delivery, a projects showcase with a page for each project, and a clients page naming major partners. A contact page with a map and enquiry form gives visitors a direct way to reach the team.",
    results: [
      "Services section explaining the full process from feasibility to delivery",
      "Individual pages for completed developments such as Aura Boutique Hotel & Lounge",
      "Client list naming major partners including Hilton, Marriott and Chevron",
      "Contact page with a map and enquiry form for new site and building leads"
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
    tags: ["WordPress", "Design Fixes"],
    shortDesc:
      "Layout rescue for a WordPress recipe membership site: alignment fixed on every screen size.",
    description:
      "Wide Eyed Giant is a membership recipe blog on WordPress. We were brought in to fix a layout that had drifted out of alignment on computers, tablets and phones, on top of a very large set of custom styling rules that had grown mostly out of date.",
    problem:
      "The search bar crowded the logo and menu, category headings did not line up with the recipe grid, and spacing on phones was uneven. Most of the existing custom styling was written for an older version of the site, and the real spacing problems were hidden in the page builder's settings for each screen size.",
    solution:
      "We checked the live pages to find which rules still applied, traced the stacked spacing settings in the page builder's controls for each screen size, and replaced the old styling with a much smaller set organized by category page, so a fix on one page cannot break another.",
    results: [
      "Alignment fixed on computers, tablets and phones",
      "1,735 lines of mostly outdated styling replaced with 265 lines",
      "Fixes kept separate for each category page so they cannot affect others",
      "Phone menu and header height fixed at the source"
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
    tags: ["AI", "Sales Automation", "Software"],
    shortDesc:
      "An AI sales platform that calls, emails, texts and messages prospects in 6 languages, 24 hours a day.",
    description:
      "Dialogix is an AI-powered sales platform with the tagline \"Your Sales Team Never Sleeps.\" It uses AI assistants that call, email, text and message prospects in six languages, finding leads, booking demos and following up around the clock so founders and sales teams can focus on closing deals.",
    problem:
      "Growing outbound sales usually means hiring and managing more sales reps, which is expensive, slow and hard to keep consistent across channels and time zones. Finding prospects by hand limits how many people a team can reach, and follow-up regularly falls through the cracks.",
    solution:
      "We built Dialogix to run outreach automatically by phone, email, text and LinkedIn in six languages. AI voice assistants qualify leads on calls, email and text sequences adjust to how people respond, and campaigns run 24 hours a day. Options range from self-service to a fully managed sales service.",
    results: [
      "AI assistants across four channels: phone, email, text and LinkedIn",
      "Outreach in 6 languages (English, Spanish, Mandarin, French, Portuguese, Italian)",
      "Round-the-clock prospecting, demo booking and follow-up",
      "Options from self-service to a fully managed sales service"
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
    slug: "wolfe-property",
    title: "Wolfe Property Portal",
    category: "Web",
    tags: ["Web App", "PropTech", "FinTech"],
    shortDesc:
      "A private client portal and property-investment calculator for a New Zealand property-coaching firm.",
    description:
      "Wolfe Property Portal is a client portal for a New Zealand property-investment coaching business. It guides prospects through a qualification process and gives approved clients an interactive calculator that models 15 years of cash flow, top-ups, yield and return on investment for rental deals, comparing a current scenario against an improved \"Cashflow Hacking\" one.",
    problem:
      "The coaching business ran its property-investment calculations in a Google Sheet, which did not scale, was not client-friendly and could not be limited to qualified prospects. Prospects also needed to be checked for usable equity before using up valuable coaching time.",
    solution:
      "We built an online portal that reproduces the spreadsheet's calculations exactly, checked to within $1 by 26 tests, with an interactive screen that updates as you type. Around it is a sign-up process that captures leads, works out equity qualification and program level automatically, and sends clients through admin approval before they can see their dashboard. Client records and approvals are kept in Notion so non-technical staff can run it.",
    results: [
      "Investment calculator matching the original spreadsheet to within $1, checked with 26 tests",
      "15-year cash-flow model with New Zealand tax, GST and depreciation, and a side-by-side comparison of two scenarios",
      "Sign-up process that checks equity and assigns a program level automatically",
      "Password-free email sign-in, admin approval and client records kept in Notion"
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
      "A complete quoting and operations system for a UK aluminum windows and doors manufacturer.",
    description:
      "Ultra Windows is a complete business-to-business operations system for a UK aluminum windows-and-doors manufacturer. Trade customers and staff design custom products such as bifold doors, sliding doors, roof lights and bay windows with live 3D previews and instant pricing, then turn quotes into orders that flow straight into production scheduling, delivery routes, a driver app, stock and Sage accounting.",
    problem:
      "Custom window and door manufacturers rely on manual quoting in spreadsheets and email that is error-prone and disconnected from pricing, production, delivery and accounting. Complex configurations make accurate quotes slow, and there is no self-service option for trade customers or live visibility for drivers and office staff.",
    solution:
      "We designed and built one system where accurate, priced designs are created right in the web browser with live 3D previews, then flow directly into orders, driving production scheduling, delivery routes and driver dispatch, and Sage 200 accounting. Staff, trade customers and drivers each see only what they need, with customer data kept private.",
    results: [
      "Design tools with live 3D previews for more than 13 custom product types",
      "Instant customer-specific pricing and one-click conversion from quote to order",
      "Route planning with maps and a dedicated driver app",
      "Sage 200 accounting connection plus a self-service trade customer portal"
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
      "A bold retro event website and brand look for a Toronto sidewalk vintage sale.",
    description:
      "East End Vintage Sale is a community sidewalk vintage-clothing sale in East York, Toronto. We designed a bold, retro-inspired event website and brand look to launch its second edition, with pink-and-white stripes, halftone photos and a crumpled-paper feel that captures the laid-back Sunday-market vibe and drives turnout.",
    problem:
      "A one-day, word-of-mouth pop-up lives or dies on turnout. The organizers needed to rebuild excitement for a second edition, show the essentials of date, place and what to expect at a glance, and stand out on social media, all without a big budget or a permanent website.",
    solution:
      "We created a scrolling event page with a distinctive vintage look: a striped-paper opening, halftone photo cut-outs and hand-drawn touches. Each section answers one question: the details, the vibe, drinks and the location. The page closes with a shareable \"Come early, bring a tote, tell a friend\" message tied to their social media accounts.",
    results: [
      "A consistent retro look with striped paper, halftone photos and hand-drawn touches",
      "Easy-to-scan details: date, address and rain-or-shine",
      "Sections that sell the experience: the details, the vibe, drinks and location",
      "A shareable closing message encouraging RSVPs through @eastendvintagesale"
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
      "A playful website for a mobile bakery with live truck tracking, pre-ordering, event booking and an AI cake designer.",
    description:
      "Buttercream Bus is \"Fresh Baked Dreams on Wheels,\" a mobile bakery food truck. We built a warm, playful website where customers can follow the truck in real time, pre-order treats to skip the line, book the bus for weddings and events, sign up for baking classes, and even create custom cake ideas with an AI cake designer.",
    problem:
      "A food truck's biggest challenge is that customers never know where it is. On top of that, walk-up lines cost sales, event bookings lived in direct messages and spreadsheets, and there was no way to show the menu or capture demand between stops.",
    solution:
      "We built one friendly home for the whole business: live truck tracking with a neighborhood voting feature to unlock pop-up stops, a pre-order \"Baker's Box\" flow, an events calendar with availability checks, a classes list, and an AI \"Cake Architect\" that turns a description into cake design ideas, all in the brand's warm buttercream colors.",
    results: [
      "Live bus tracking with \"Get Notified\" alerts so fans never miss a stop",
      "Pre-ordering that lets customers skip the line and lock in favorites",
      "Self-service event booking for weddings, birthdays and corporate catering",
      "An AI Cake Architect that creates custom cake design ideas on request"
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
    slug: "torqron",
    title: "Torqron",
    category: "Web",
    tags: ["Industrial", "Petrochemical", "B2B"],
    shortDesc: "A professional website for a global petrochemical products and solutions provider.",
    description:
      "Torqron supplies global petrochemical operations with precision granulation tools, advanced polymer additives, critical spare parts and complete supply chain solutions. With 20+ years of engineering experience across 28 facilities in 12 countries, they needed a website that communicated that authority.",
    problem:
      "Torqron's previous website did not reflect their size, expertise or global reach. Purchasing teams at large companies expect a supplier's website to show credibility and reliability, and theirs did not.",
    solution:
      "We built a polished, fast website with detailed product and application pages, a clear overview of services, and a contact and quote-request flow designed for business buyers. The design communicates precision and reliability, matching the quality of the products.",
    results: [
      "20+ years of engineering experience clearly shown to business buyers",
      "Products, Applications and Services sections that support a complex buying process",
      "Quote-request flow that turns interested visitors into qualified sales conversations",
      "A website that reflects the credibility of a supplier trusted by 28 major industrial facilities"
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
    shortDesc: "A website for a Shopify Select Partner agency that builds high-converting online stores for growth-focused brands.",
    description:
      "Expert Village Media is a Shopify Select Partner Agency and Certified Expert that turns online store ideas into high-converting Shopify stores. They cover custom store design, app connections, store migration and speed improvements, handling every part of a brand's Shopify journey.",
    problem:
      "Expert Village Media needed a website that established their authority as a leading Shopify agency, clearly explained their services and brought in a steady flow of enquiries from brands looking for serious e-commerce expertise.",
    solution:
      "We built a clean website focused on winning enquiries, with service showcases, a portfolio of client work, partner credentials (Shopify, Google, Upwork) and a simple way to schedule a call. The site presents Expert Village Media as the obvious choice for brands investing in Shopify.",
    results: [
      "Partner credentials (Shopify Select, Google, Upwork) clearly shown",
      "Portfolio and case studies that turn visitors into qualified discovery calls",
      "A clean, trustworthy design that matches the quality of their Shopify work",
      "Page structure that helps brands searching for Shopify help find them on Google"
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
    shortDesc: "A website for the app that makes you earn your scroll, one breath at a time.",
    description:
      "ZenScroll is a digital wellness app and website that balances social media with meditation. Every minute of mindfulness practice earns two to six minutes of scroll time. The ratio is yours to set, but the pause is non-negotiable. We designed and built the full website to explain this idea with clarity, calm and conviction.",
    problem:
      "ZenScroll had a genuinely new product idea, earning scroll time through meditation, but needed a website that could explain an unfamiliar idea quickly, build trust with skeptical users and turn visitors into app downloads without feeling preachy or restrictive.",
    solution:
      "We created a dark, immersive website built around one message: breathe first, then the feed opens. The deep browns, nature photography and warm typography reinforce the calm purpose of the product. The wording leads with how it works, not the mission, so anyone who has ever scrolled too long understands it immediately.",
    results: [
      "A landing page focused on driving App Store and Google Play downloads",
      "The earn-to-scroll idea explained clearly in a simple 3-step section",
      "A \"Voices\" section that builds trust with real user stories",
      "A dark, calming look that matches the product's meditative identity",
      "A closing call to action, \"Begin with a single breath,\" that makes installing easy"
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
    shortDesc: "A midlife wellness app helping Canadian women sustain energy, confidence and performance.",
    description:
      "Herruby is a wellness app built exclusively for Canadian women going through midlife, and it follows Canada's PIPEDA privacy law. It provides personalized tools, expert-backed resources and a supportive community to help women sustain their energy, confidence and performance through this stage of life.",
    problem:
      "Women going through midlife, including perimenopause, hormonal changes and energy shifts, had nowhere to turn for a dedicated, privacy-first digital health experience that understood their needs. Generic wellness apps were not built for them.",
    solution:
      "We designed and built Herruby as a phone-first app made for Canadian women in midlife. It combines personalized wellness tracking, expert content and community features, with compliance with Canada's PIPEDA privacy law built in from day one.",
    results: [
      "The first wellness app built for Canadian women in midlife",
      "Full compliance with Canada's PIPEDA privacy law built in from the start",
      "Personalized tracking of energy, confidence and performance for each life stage",
      "An expert-backed content library covering the specific needs of midlife women"
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
    tags: ["Medical Education", "E-Learning", "Software"],
    shortDesc: "A premium medical education platform advancing physicians through evidence and leadership.",
    description:
      "HMD is a premium medical education platform offering physician training, evidence-based programs and executive development to medical trainees, physicians and institutions worldwide. It is built around the idea of medicine via pristina: pure, rigorous and leadership-driven.",
    problem:
      "Physicians looking for high-quality continuing education and leadership development faced a scattered market of low-quality platforms. Institutions needed a trusted, scalable home for structured medical programs that matched the prestige of the training itself.",
    solution:
      "We built HMD as a complete online medical education product with structured program paths, a curated library of clinical resources, a physician community area (iConnect) and a clean, authoritative design that reflects the quality of the education.",
    results: [
      "Combined 4-year and 3-year physician programs delivered fully online",
      "100% self-paced curriculum available worldwide for working physicians",
      "iConnect community area for peer collaboration among medical professionals",
      "Institutional partnerships that extend the reach of physician development"
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
    category: "AI",
    tags: ["AI Outreach", "B2B Sales", "Software"],
    shortDesc: "Turns breaking news about target companies into ready-to-send sales emails in seconds.",
    description:
      "Periscope turns breaking news about named companies into researched contact lists and personalized, professional emails in seconds instead of 30+ minutes. It gives business-to-business sales teams a way to act on buying signals the moment they happen.",
    problem:
      "Sales teams at large companies are slow to react to buying signals. By the time a rep researches a news item, finds the right contacts and writes a relevant email, the moment has passed. Existing tools provide the data but leave all the work to the rep.",
    solution:
      "We built Periscope as a complete flow from news to sent email. It watches the news for the companies you name, automatically researches the right contacts and writes personalized, ready-to-send emails, reducing 30+ minutes of rep work to seconds.",
    results: [
      "Breaking news about target companies turned into outreach in seconds",
      "Researched contact lists created automatically alongside each email",
      "Professional, personalized emails at the speed of a news alert",
      "Sales teams that can react to buying signals before the competition"
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
    shortDesc: "AI-powered social media posting built exclusively for dental practices.",
    description:
      "Molar AI is an AI service that fully automates social media content for dental practices. It posts to Instagram and Facebook every day, in any language, in the practice's own voice. Branded, effective and completely hands-off.",
    problem:
      "Dental practices know they need a steady social media presence to attract patients, but they have no time to create content. Hiring a social media manager is expensive, generic agencies produce lifeless posts, and doing it yourself burns out within weeks.",
    solution:
      "We built Molar AI so social media becomes invisible work for dental practices. It creates on-brand, professional content every day, schedules it automatically on Instagram and Facebook, and adapts to each practice's voice and patients.",
    results: [
      "Daily social media posts in any language, fully automated",
      "Authentic, branded content that turns followers into booked patients",
      "No ongoing time needed from the dental team after the initial setup",
      "A consistent online presence that builds patient trust over time"
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
    title: "Divine Reach - Booking Funnel Diagnosis (GoHighLevel & ClickFunnels)",
    category: "Automation",
    tags: ["CRM", "Automation", "Integrations"],
    shortDesc: "I worked out why bookings from a GoHighLevel and ClickFunnels funnel weren't reaching people's calendars, and designed a fix.",
    description: "I worked out why bookings from a GoHighLevel and ClickFunnels funnel weren't reaching people's calendars. The invitations were being sent but only added to calendars automatically for Gmail users. I ruled out both obvious fixes with evidence and designed an Add-to-Calendar button that works for everyone. A review of 1,300+ appointments in GoHighLevel showed the reported no-show rate was unsupported and that cancellations ran at 27–37%.",
    problem: "Bookings made through the funnel were not showing up in many people's calendars, and the client's reported no-show numbers did not match what was happening.",
    solution: "We checked how the booking invitations were sent, found that only Gmail users had them added to their calendars automatically, and ruled out the two obvious fixes with evidence. We then designed an Add-to-Calendar button for all email providers, and reviewed more than 1,300 appointments to check the real no-show and cancellation numbers.",
    results: [
      "Found the real reason bookings were missing from calendars",
      "Designed an Add-to-Calendar button that works for everyone",
      "Reviewed 1,300+ appointments and showed the reported no-show rate was unsupported",
      "Showed cancellations were running at 27–37%"
    ],
    technologies: ["GoHighLevel", "ClickFunnels", "Calendly"],
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
    tags: ["CRM", "Automation", "Integrations"],
    shortDesc: "I built a one-way sync so a real estate team's reps work only in the Wavv dialer while GoHighLevel updates automatically.",
    description: "I built a one-way sync so a real estate team's reps work only in the Wavv phone dialer while their GoHighLevel pipeline follows automatically. After finding that call outcomes are shared across every stage, I redesigned the setup around the pipeline stage: 15 automations in Wavv label each stage and 15 workflows in GoHighLevel move the deals. It cannot loop back on itself, and the updates are checked against GoHighLevel.",
    problem: "The real estate team's reps were working in the Wavv dialer while their sales pipeline lived in GoHighLevel, so updates had to be made twice or were missed.",
    solution: "We built a one-way sync from Wavv to GoHighLevel. Because call outcomes are shared across every stage, we organized the setup around the pipeline stage instead: 15 automations in Wavv label each stage and 15 workflows in GoHighLevel move the deals. Only the starting labels trigger changes, so it cannot loop, and we checked the results directly in GoHighLevel.",
    results: [
      "Reps work only in the Wavv dialer while GoHighLevel deals move automatically",
      "15 Wavv automations and 15 GoHighLevel workflows, one for each pipeline stage",
      "Built so updates cannot loop back and forth",
      "Results checked directly in GoHighLevel"
    ],
    technologies: ["GoHighLevel", "GoHighLevel API", "Wavv"],
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
    title: "OpenChat - AI Chat Web App",
    category: "AI",
    tags: ["AI", "Website"],
    shortDesc: "OpenChat is an AI chat web app I built, with OpenAI's language model and simple Google sign-up.",
    description: "OpenChat is an AI-powered chat web app I built, with OpenAI's language model connected to it. It gives users intelligent, AI-driven chat through a streamlined, user-friendly design with a single, low-effort Google sign-up.",
    problem: "The project needed a simple, easy-to-use way for people to chat with an AI assistant, with as little friction as possible to get started.",
    solution: "We built a web app that connects OpenAI's language model to a clean chat screen, with sign-up through a Google account so users can start in one step.",
    results: [
      "AI chat powered by OpenAI's language model",
      "One-step sign-up with a Google account",
      "A streamlined, user-friendly chat design"
    ],
    technologies: ["Next.js", "Prisma", "MongoDB", "OpenAI"],
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
    title: "Kids Coding Course Platform - Design & Online Setup",
    category: "Web",
    tags: ["Mobile App", "Mobile"],
    shortDesc: "A kids' coding course platform, taken from a static template to a real, working product.",
    description: "IPlusCoding is a kids' coding course platform (Scratch Junior lessons in Beginner, Elementary and Intermediate levels) that I took from a static template to a real, working product. I designed the screens and connected it to Firebase so it can grow securely and update live. I turned the site from static to dynamic, made it work well on phones, tablets and computers, added real content, and organized the pages so Google can find them, turning a template into a sellable course platform.",
    problem: "The platform started as a static template that could not manage courses, update content or work as a real course business.",
    solution: "We redesigned the screens and connected Firebase behind the scenes, so the site is no longer static and can grow securely with live updates. We made it work on every screen size, added real course content and organized the pages so Google can find them.",
    results: [
      "Turned a static template into a dynamic course platform",
      "Works on phones, tablets and computers",
      "Real course content added and pages organized for Google",
      "Built to grow securely with live updates"
    ],
    technologies: ["Firebase"],
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
    title: "Cypress Bridge - Hospital Emergency Department Analytics Platform",
    category: "SaaS",
    tags: ["AI", "Web App", "Website", "Dashboard"],
    shortDesc: "A secure analytics platform for a healthcare consulting firm, turning scattered hospital data into clear Emergency Department performance figures.",
    description: "Cypress Bridge is a secure analytics platform I built for a healthcare consulting firm. It turns scattered raw hospital data from CMS (the US Medicare agency) into clear Emergency Department performance figures, state and national comparisons, and a calculated \"Opportunity Value\" figure. The data is collected, cleaned and calculated automatically on a schedule and stored in a database, and a dashboard gives executives filterable performance cards, trend charts and comparisons for fast insight with no technical knowledge needed.",
    problem: "The consulting firm needed to understand how hospital Emergency Departments perform, but the raw public data was scattered across many files and hard for executives to use.",
    solution: "We built an automatic process that collects and cleans the CMS hospital data, calculates the performance figures and saves them to a database on a schedule. On top of it we built an executive dashboard with filterable performance cards, trend charts and comparisons against state and national figures.",
    results: [
      "Raw hospital data turned into clear Emergency Department performance figures",
      "State and national comparisons plus a calculated Opportunity Value",
      "Data refreshed automatically on a schedule",
      "A dashboard with filters, trend charts and comparisons that executives can use without technical knowledge"
    ],
    technologies: ["Python", "Supabase", "PostgreSQL", "React", "Next.js"],
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
    title: "FullTimeWin.live - Sports Platform (Fixes & Features)",
    category: "Web",
    tags: ["AI", "Website"],
    shortDesc: "A live Indonesian-language sports scores, predictions and news website. I added new features and fixed problems.",
    description: "FullTimeWin is a live, Indonesian-language sports scores, predictions and news website. I added a new \"Live\" tab to the live-score section, built a site map to help Google find the pages, added endless scrolling, made smaller revisions, hid an exposed private key as a security fix, improved overall search visibility, and fixed an intermittent problem that broke the page roughly 10% of the time.",
    problem: "The site needed new features and a set of fixes: a clearer way to see live matches, better visibility on Google, a security risk from an exposed private key, and an intermittent problem that broke pages about 10% of the time.",
    solution: "We added the Live tab to the live-score section, built a site map for Google, added endless scrolling, hid the exposed private key, improved search visibility across the site, and found and fixed the cause of the intermittent page problem.",
    results: [
      "New \"Live\" tab in the live-score section",
      "Site map added to help Google find pages",
      "Endless scrolling added",
      "Exposed private key hidden as a security fix",
      "Intermittent problem that broke pages about 10% of the time resolved"
    ],
    technologies: ["Next.js"],
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
    title: "KeyGlowMax - Crypto Token Creator (Design Refresh)",
    category: "Web",
    tags: ["AI"],
    shortDesc: "A full redesign of a no-code tool for creating Solana crypto tokens, making a complicated process easier to follow.",
    description: "KeyGlowMax is a no-code tool for creating Solana crypto tokens and managing their liquidity pools. I led a full redesign: a sleek, modern look with clean lines and clear layouts, a layout that works on computers, tablets and phones, a clearer presentation of complex crypto data through charts and visuals, and simpler navigation through the token-creation and liquidity steps.",
    problem: "Creating a crypto token and managing its liquidity involves complicated information, and the existing design made that harder to follow than it needed to be.",
    solution: "We redesigned the whole interface with a modern look, clear layouts and a navigation that guides people step by step through creating a token and managing liquidity. Charts and visuals make complex data easier to read, and the design works on every screen size.",
    results: [
      "A sleek, modern look with clean lines and clear layouts",
      "Works on computers, tablets and phones",
      "Charts and visuals that make complex crypto data easier to read",
      "Simpler navigation through the token and liquidity steps"
    ],
    technologies: [],
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
    category: "Web",
    tags: ["AI"],
    shortDesc: "An online directory connecting cities, businesses and services in one place.",
    description: "LiteJob is an online directory I built that connects cities, businesses and services in one place. Users search by city to browse local businesses by type, such as restaurants, salons and repair services, with each business listing its own range of services. The platform has two kinds of accounts, Client and Business, with a role choice on both sign-up and login, giving people one place to compare prices and services in a few clicks.",
    problem: "People looking for local services had no single place to browse businesses by city and compare their prices and services, and businesses had no simple way to list what they offer.",
    solution: "We built a directory where people search by city and browse local businesses by category. It has separate Client and Business accounts, with a role choice at sign-up and login, so businesses can list their services and clients can compare them.",
    results: [
      "City search with local businesses sorted by category",
      "Separate Client and Business accounts",
      "Each business lists its own range of services",
      "One place to compare prices and services in a few clicks"
    ],
    technologies: [],
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
    title: "Nexus by APS - Enterprise Quote-Request Platform",
    category: "SaaS",
    tags: ["AI"],
    shortDesc: "A business platform for managing supplier quote requests and bidding, built to streamline buying and supplier collaboration.",
    description: "Nexus by APS is a business platform for managing quote requests and supplier bidding that I built to streamline purchasing and supplier collaboration. It brings together quote request creation (an eight-step guide), supplier bid submission with supporting documents, live bid-status tracking, a historical records library, and detailed reports on cost savings and supplier performance, plus a built-in \"Sera AI\" assistant, turning purchasing into a modern, data-driven process.",
    problem: "Companies handling quote requests and supplier bids by email and spreadsheets struggle to keep requests, bids and supporting documents in one place or to measure savings and supplier performance.",
    solution: "We built one platform that guides buyers through an eight-step quote request, lets suppliers submit bids with supporting documents, tracks bid status live, keeps a history of past requests and offers detailed reporting, with a built-in \"Sera AI\" assistant to help along the way.",
    results: [
      "An eight-step guide for creating quote requests",
      "Supplier bids with supporting documents and live status tracking",
      "A historical library and reports on cost savings and supplier performance",
      "A built-in \"Sera AI\" assistant"
    ],
    technologies: [],
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
    title: "Prognosticz - VC & Startup Analytics (Speed Improvements)",
    category: "SaaS",
    tags: ["AI", "Web App", "Website", "Dashboard"],
    shortDesc: "I made an investor and startup analytics dashboard faster, covering thousands of companies and investors.",
    description: "I contributed to Prognosticz, an investor and startup analytics dashboard covering global venture capital networks, funding trends and company insights at real-world scale (6,255+ companies and 61,031+ investors). My work focused on speed across the Investors, Companies and Funding Rounds pages: cutting the time charts take to load by making data requests faster and storing results for reuse, making the database queries more efficient, and improving how charts and tables display. This was a contributor role, not the original build.",
    problem: "With thousands of companies and investors on the platform, pages with charts and tables were slow to load.",
    solution: "We made the data behind the Investors, Companies and Funding Rounds pages faster to fetch, stored results so repeat requests load quickly, made the database queries more efficient, and improved how charts and tables display.",
    results: [
      "Faster chart loading on the Investors, Companies and Funding Rounds pages",
      "More efficient database queries",
      "Improved chart and table display",
      "Works at scale: 6,255+ companies and 61,031+ investors"
    ],
    technologies: ["React", "Next.js", "Supabase", "Recharts"],
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
    category: "Web",
    tags: ["AI", "E-Commerce", "Integrations"],
    shortDesc: "I improved how products and mood boards are managed on a curated fashion discovery website.",
    description: "I contributed to The Lookbook, a curated fashion discovery platform (\"Shop the Edit,\" 50+ products), improving how products and mood boards are managed: mood board labels that load automatically, product search that works with partial words and shows the right images, reliable bulk publish, unpublish and delete actions, and fixed, tested create and update functions for products and mood boards. The result is faster content management and more reliable admin controls. This was a contributor engagement, not the original build.",
    problem: "The admin tools for managing products and mood boards were unreliable: searching didn't work well with partial words, bulk actions failed, and creating or updating items wasn't dependable.",
    solution: "We made mood board labels load automatically, fixed product search so partial words work and the right images show, made bulk publish, unpublish and delete actions reliable, and fixed and tested the create and update functions for products and mood boards.",
    results: [
      "Search that works with partial words and shows the right images",
      "Reliable bulk publish, unpublish and delete actions",
      "Fixed and tested create and update functions for products and mood boards",
      "Faster content management and more reliable admin controls"
    ],
    technologies: ["Vite"],
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
    category: "Web",
    tags: ["AI"],
    shortDesc: "A practice website for a psychiatry and wellness practice, with an unusually detailed insurance and billing section.",
    description: "This is the practice website for Roueen Rafeyan MD, Psychiatry & Wellness, built around the message \"Take ownership of your mental health\" and an \"Accepting New Patients\" badge. Its standout is an unusually detailed Insurance & Billing section covering out-of-network status, the superbill process, and specific billing codes with a realistic reimbursement range. This write-up covers the live public website; the Patient Portal was not accessed, out of respect for patient privacy.",
    problem: "Patients considering a psychiatry practice want to know right away whether the practice is accepting new patients and how insurance and payment work.",
    solution: "The practice website puts \"Accepting New Patients\" and the message \"Take ownership of your mental health\" up front, and includes a detailed Insurance & Billing section explaining out-of-network status, the superbill process and a realistic reimbursement range.",
    results: [
      "An \"Accepting New Patients\" badge shown up front",
      "A clear message: \"Take ownership of your mental health\"",
      "A detailed Insurance & Billing section covering out-of-network status, superbills and billing codes",
      "A patient portal linked from the public site"
    ],
    technologies: [],
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
    title: "WordPress Page Builder Styling Fixes - Wharton Carpet Cleaning",
    category: "Web",
    tags: ["AI", "WordPress"],
    shortDesc: "I fixed three display problems on a WordPress website for a carpet cleaning company.",
    description: "Wharton Carpet Cleaning runs a WordPress website built with the SiteOrigin page builder. I resolved three display problems: buttons that didn't change on hover because of conflicting page builder styles, rounded corners that displayed incorrectly because of conflicting widget styles, and page-builder styles overriding the site's main styling everywhere. I traced each problem to its cause using the browser's built-in inspection tools and applied targeted fixes, then checked that everything worked across all pages.",
    problem: "Three display problems were affecting the website: buttons didn't respond on hover, rounded corners looked wrong, and the page builder was overriding the site's main styling.",
    solution: "We traced each problem to its cause and fixed it directly, without piling on forced overrides that break easily later, and then checked every page.",
    results: [
      "Button hover effects working again",
      "Rounded corners displaying correctly",
      "Site-wide styling no longer overridden by the page builder",
      "All pages checked after the fixes"
    ],
    technologies: ["WordPress", "SiteOrigin Page Builder"],
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
    title: "Pro-Dent Club - Free Membership Promotional Email",
    category: "Web",
    tags: ["Web Design", "Web"],
    shortDesc: "A fully self-contained recruitment email for a Canadian dental group purchasing organization.",
    description: "I built a fully self-contained recruitment email for Pro-Dent Club, a Canadian dental group purchasing organization. The logo is embedded and every icon is drawn in place, so no outside images are needed. It opens with a pop-art \"FREE Membership\" banner and moves through an authority statement, benefit bubbles, sample member-pricing cards and a savings highlight with a bar chart. It is designed for three screen sizes so it displays reliably from desktop Outlook to phones.",
    problem: "Pro-Dent Club needed a promotional email that looks the same in every email program and on every device, without depending on outside images that email programs often block.",
    solution: "We built the email as one self-contained piece, with the logo embedded and every icon drawn in place, so nothing relies on outside images. It tells the story in order: a \"FREE Membership\" banner, an authority statement, benefit bubbles, sample member prices and a savings highlight with a bar chart. It is designed for three screen sizes.",
    results: [
      "No outside images needed, so nothing gets blocked",
      "Looks right from desktop Outlook to phones",
      "Pop-art \"FREE Membership\" banner and sample member-pricing cards",
      "A savings highlight with a bar chart"
    ],
    technologies: ["HTML"],
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
    title: "TCL - Tournament Management & Live Cricket Scoring App",
    category: "Mobile App",
    tags: ["Mobile App"],
    shortDesc: "A tournament management and live cricket scoring app, built from start to finish, with an Android version.",
    description: "TCL is a tournament management and live cricket scoring web app (with an Android version) that I built from start to finish, including the full ball-by-ball scoring system from scratch: strike rotation, extras, wickets, target and chase, and each player's figures. It works without an internet connection first and syncs second: every action is saved on the device instantly, then copied to Firebase in real time. It can be installed like an app on a phone and also comes as an Android app with ads.",
    problem: "Cricket tournaments need scoring that is fast, accurate and reliable even when the internet connection is poor.",
    solution: "We built a full scoring system covering strike rotation, extras, wickets, targets and chases, and each player's figures. Everything is saved on the device instantly and then synced to Firebase in real time, so scoring keeps working without a connection. It can be installed on a phone and comes as an Android app.",
    results: [
      "A complete ball-by-ball scoring system built from scratch",
      "Works without an internet connection and syncs when connected",
      "Can be installed on a phone like an app",
      "An Android version with ads"
    ],
    technologies: ["JavaScript", "Firebase"],
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
    title: "IPO AI - Indian IPO Research App with AI Analysis",
    category: "Mobile App",
    tags: ["Mobile App", "Web App", "Integrations"],
    shortDesc: "An app for Indian retail investors researching new share offerings, with on-request AI analysis.",
    description: "IPO AI is a mobile app I built for Indian retail investors researching Mainboard and SME IPOs (new share offerings): price ranges, key dates, subscription levels and an on-request 14-factor AI investment analysis. Its defining principle is \"never make up financial data\": stored data respects usage limits, a backup source shows nothing rather than guessing when information is missing, and in the AI analysis all the arithmetic is calculated by the app, not trusted from the AI's wording.",
    problem: "Retail investors researching IPOs need accurate figures, and AI tools can make up or miscalculate numbers.",
    solution: "We built an app that shows price ranges, key dates and subscription levels and offers an on-request 14-factor AI analysis. To avoid made-up numbers, it stores data within usage limits, shows nothing when a backup source has no answer, and calculates all the arithmetic itself instead of relying on the AI's wording.",
    results: [
      "Price ranges, key dates and subscription levels for Mainboard and SME IPOs",
      "An on-request 14-factor AI investment analysis",
      "Never makes up financial data: blank when unknown",
      "All arithmetic calculated by the app, not the AI"
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
    title: "SliceUp - Expense Tracker with AI Insights",
    category: "Mobile App",
    tags: ["Mobile App", "Web App"],
    shortDesc: "An expense tracker with receipt scanning, group expense splitting and an AI chat, live on Google Play.",
    description: "SliceUp is an expense tracker I designed and built from start to finish: fast expense entry, monthly and yearly charts, receipt scanning with the camera, and group and trip expense splitting with automatic settlement calculations. An AI chat feature voiced by a mascot, Teddy, answers everyday-language questions about spending with witty, number-backed comments. It is published live on Google Play.",
    problem: "People who share expenses on trips or with groups struggle to log spending quickly and work out who owes whom.",
    solution: "We built an app for fast expense entry, monthly and yearly charts, receipt scanning with the camera, and group and trip splitting with automatic settlement calculations. An AI chat, voiced by a mascot called Teddy, answers questions about spending with witty, number-backed comments.",
    results: [
      "Fast expense entry with monthly and yearly charts",
      "Receipt scanning with the camera",
      "Group and trip expense splitting with automatic settlement",
      "AI chat with a mascot, Teddy, that answers spending questions",
      "Live on Google Play"
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
    title: "BeeMinor - Play-and-Win Multi-Language Web App",
    category: "SaaS",
    tags: ["AI"],
    shortDesc: "A \"play and win\" consumer web app available in nine languages, with a bee mascot.",
    description: "BeeMinor is a \"play and win\" consumer web app available in nine languages, branded around a bee mascot with the tagline \"Rejoins les BeeMinor, joue et gagne.\" Its entire public face is a sign-up and login screen. There is no public landing page, and the game itself sits behind the login. This write-up covers the branding, languages and sign-up process visible from the outside; the app itself was not accessible for this write-up.",
    problem: "A consumer game needs a welcoming, simple entry point that works for players in many countries and languages.",
    solution: "We built the brand and sign-up experience around a bee mascot, with the whole interface available in nine languages and a single sign-up and login screen as the entry point.",
    results: [
      "Available in nine languages",
      "Branded around a bee mascot and the tagline \"Rejoins les BeeMinor, joue et gagne.\"",
      "A single, simple sign-up and login screen as the entry point"
    ],
    technologies: [],
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
    slug: "hypelive",
    title: "HYPE Live - Creator App Download Page",
    category: "Web",
    tags: ["Mobile App"],
    shortDesc: "A single-screen landing page for the \"HYPE\" creator app, built to turn visitors into app downloads.",
    description: "HYPE Live is a single-screen landing page for the \"HYPE\" creator app, built with Lovable and with one job: to turn visitors into App Store and Google Play downloads under the tagline \"Creators First. Always.\" It leans on inspiring creator photography instead of a feature tour, with Login and Sign-up buttons hinting at a companion website. This write-up covers the live public landing page; the app's own features were outside its scope.",
    problem: "A new creator app needs a simple page that gets visitors to download it quickly.",
    solution: "We built a single-screen page under the tagline \"Creators First. Always.\" that uses creator photography to inspire and puts App Store and Google Play download buttons front and center.",
    results: [
      "One page, one goal: App Store and Google Play downloads",
      "Tagline: \"Creators First. Always.\"",
      "Creator photography instead of a long feature list",
      "Login and Sign-up buttons for a companion website"
    ],
    technologies: ["Lovable"],
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
    title: "Kasbu - Free Link-in-Bio & Personal Page Builder",
    category: "SaaS",
    tags: ["Mobile App"],
    shortDesc: "A free-first tool for building link-in-bio and personal pages, with a rotating showcase of real example pages.",
    description: "Kasbu is a free-first link-in-bio and personal page builder (in the same category as Linktree and Beacons) that leads with a rotating 3D showcase of real multi-language example pages and the trust line \"+10K pages already made.\" Its menu covers Cards, Explore, Wallet, a Blog and Pricing, and the Wallet is an uncommon feature among free competitors. This write-up covers the live public homepage and menu; the logged-in builder and Wallet were not accessible.",
    problem: "Free link-in-bio builders are crowded, so a new one needs to show quickly what makes it different and prove that people already use it.",
    solution: "The homepage leads with a rotating 3D showcase of real example pages in several languages and the trust line \"+10K pages already made,\" and its menu highlights a Wallet feature that few free competitors offer.",
    results: [
      "A rotating showcase of real multi-language example pages",
      "Trust line: \"+10K pages already made\"",
      "Menu covering Cards, Explore, Wallet, Blog and Pricing",
      "A Wallet feature that is uncommon among free competitors"
    ],
    technologies: [],
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
    title: "Kitap Limani - Islamic Books & Educational Online Store",
    category: "Web",
    tags: ["AI", "E-Commerce"],
    shortDesc: "An online store for Islamic books and educational products, with strong visuals and simple navigation.",
    description: "Kitap Limani is an online store for Islamic books and educational products that I built on the Ikas store platform, combining strong visual presentation with simple navigation across dedicated sections (Ajanda, Atlas, Qur'an editions). The design balances the store's cultural identity, with calm green, white and neutral tones and premium editorial photography, with modern online-shopping ease, and supports German and Turkish content for its European customers.",
    problem: "The store needed to feel true to its cultural identity while being easy to browse and buy from, for customers who read German and Turkish.",
    solution: "We built the store on the Ikas platform with strong product presentation and simple navigation across dedicated sections, using calm green, white and neutral tones with premium editorial photography, and German and Turkish content.",
    results: [
      "Dedicated sections such as Ajanda, Atlas and Qur'an editions",
      "Calm green, white and neutral design with premium editorial photography",
      "German and Turkish content for European customers",
      "Built on the Ikas store platform"
    ],
    technologies: ["Ikas"],
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
    slug: "apollo-credit-processing",
    title: "Apollo Credit Processing - Secure Server Setup on GoDaddy",
    category: "Web",
    tags: ["AI", "Web App"],
    shortDesc: "Moved a client's credit-repair web portal onto a secure, properly protected GoDaddy server in one day.",
    description: "I moved a client's credit-repair web portal onto a GoDaddy server in one day. I locked down the server so only approved access is allowed, turned on protection against repeated sign-in attempts, fixed automatic updates that had silently stopped, ran the app in a secure, isolated way with a secure HTTPS connection, got Microsoft 365 email sending working, tested the Square payment connection live, set up nightly backups, and switched the domain over without touching email settings. Live at apollocreditprocessing.com.",
    problem: "The client had a finished credit-repair portal but needed it put online securely, with email, payments, backups and a smooth domain switch.",
    solution: "We set up and protected the GoDaddy server, ran the portal in a secure, isolated way with HTTPS, connected Microsoft 365 email and the Square payment connection, set up nightly backups and moved the domain over without affecting email.",
    results: [
      "Live at apollocreditprocessing.com",
      "Server locked down, with protection against repeated sign-in attempts and fixed automatic updates",
      "Secure HTTPS connection, Microsoft 365 email and Square payments working",
      "Nightly backups set up",
      "Domain switched over without touching email settings"
    ],
    technologies: ["Node.js", "Ubuntu", "Caddy", "Square"],
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
    title: "Biz Buy Box - AI Deal Sourcing & Evaluation Platform",
    category: "AI",
    tags: ["Software", "Web App", "Website", "Dashboard"],
    shortDesc: "An AI-powered platform for independent business buyers to find, score and evaluate businesses for sale.",
    description: "Biz Buy Box is an AI-powered business-buying platform I built from start to finish for independent business searchers. It scores businesses for sale against the buyer's own weighted criteria, models SBA, seller-note and conventional financing combinations with real debt-coverage figures, and includes a four-part AI toolkit (Deal Inspector, CIM Review, Business Plan, Buyer Profile) plus a full deal pipeline dashboard, replacing spreadsheet-based evaluation with one clear, auditable workspace.",
    problem: "People searching for a business to buy evaluate deals manually in spreadsheets, which is slow and hard to compare across listings.",
    solution: "We built one workspace that scores listings against each buyer's own criteria, models different financing combinations with real debt-coverage figures, and offers a four-part AI toolkit (Deal Inspector, CIM Review, Business Plan, Buyer Profile) and a deal pipeline dashboard.",
    results: [
      "Listings scored against the buyer's own weighted criteria",
      "SBA, seller-note and conventional financing modeled with real debt-coverage figures",
      "A four-part AI toolkit: Deal Inspector, CIM Review, Business Plan and Buyer Profile",
      "A full deal pipeline dashboard replacing manual spreadsheets"
    ],
    technologies: ["Next.js"],
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
    title: "Shopo Admin - Fashion Online Store Admin Dashboard",
    category: "SaaS",
    tags: ["AI", "Web App", "Dashboard", "E-Commerce"],
    shortDesc: "An admin dashboard for a fashion online store, covering the whole back office without any coding.",
    description: "Shopo Admin is an admin dashboard I built for the Buyshopo fashion online store, covering the whole back office: a dashboard that leads with key numbers, catalog and multi-vendor brand management with commission tracking, orders and customers, a banner marketing tool with click tracking, and a full appearance and layout settings panel, giving non-technical staff complete control without touching code.",
    problem: "Store staff needed a single place to manage products, brands, orders, customers and marketing banners without needing a developer.",
    solution: "We built an admin dashboard that leads with key numbers and covers catalog and multi-vendor brand management with commission tracking, orders and customers, a banner marketing tool with click tracking, and a full appearance and layout settings panel.",
    results: [
      "A dashboard that leads with key numbers",
      "Catalog and multi-vendor brand management with commission tracking",
      "Orders and customers in one place",
      "A banner marketing tool with click tracking and full appearance settings"
    ],
    technologies: ["React", "Redux"],
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
    title: "CarSUVParts - Auto Parts Online Store with Vehicle Search (Phase 1)",
    category: "Web",
    tags: ["AI", "Web App", "Dashboard", "Integrations"],
    shortDesc: "Phase 1 of an online auto parts store, live at carsuvparts.com, with vehicle lookup by VIN.",
    description: "I built phase 1 of CarSUVParts, the pre-launch website for a planned drop-shipping auto parts store, live at carsuvparts.com. It includes real vehicle lookup by VIN using a US government database, a working cart that sends orders by email, search suggestions, a 71-make brand grid, policy pages, search optimization and a mock-up of an admin dashboard with demo data. Still in progress: suppliers and payments are not connected yet.",
    problem: "A new auto parts store needs customers to find the right part for their exact vehicle before it can be launched.",
    solution: "We built a store where customers look up their vehicle by VIN using a US government database, then search by make or brand. A working cart sends orders by email, and the site includes policy pages and search optimization. Supplier and payment connections come in a later phase.",
    results: [
      "Live at carsuvparts.com",
      "Real vehicle lookup by VIN using a US government database",
      "A working cart that sends orders by email, with search suggestions and a 71-make brand grid",
      "Policy pages, search optimization and an admin dashboard mock-up with demo data"
    ],
    technologies: ["Vite", "React", "TypeScript", "Vercel"],
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
    title: "Custom Ink & Thread - Apparel Ordering Platform Takeover & Improvements",
    category: "SaaS",
    tags: ["Software", "Web App", "Website"],
    shortDesc: "I took over a live custom apparel ordering website and fixed and extended it, including QuickBooks and UPS connections.",
    description: "I took over a live custom apparel ordering platform built by a previous developer. I reviewed 17 owner-reported issues, then added order syncing to QuickBooks Online, cleaner UPS shipping labels and tracking, fixes to embroidery and DTF pricing, capture of guest customers with staff alerts and cart reminders, re-ordering from the same cart, a \"New today\" admin inbox, and search and error-page fixes. A fix to make the database connection more resilient is prepared separately and not yet applied.",
    problem: "The owner had 17 reported problems with a live ordering platform, and the previous developer was no longer maintaining it.",
    solution: "We reviewed all 17 owner-reported issues and then fixed and extended the platform: order syncing to QuickBooks Online, cleaner UPS labels and tracking, corrected embroidery and DTF pricing, guest customer capture with staff alerts and cart reminders, re-ordering from the same cart, a \"New today\" admin inbox and search and error-page fixes.",
    results: [
      "17 owner-reported issues reviewed",
      "Orders sync to QuickBooks Online",
      "Cleaner UPS labels and tracking",
      "Embroidery and DTF pricing fixed",
      "Guest customers captured, with staff alerts and cart reminders"
    ],
    technologies: ["Next.js", "Supabase", "Clerk", "Stripe", "UPS", "QuickBooks"],
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
    title: "Fina Eat - AI Kitchen Assistant for Instant Recipes & Shopping Lists",
    category: "AI",
    tags: ["AI", "Web App", "E-Commerce"],
    shortDesc: "An AI-powered web app that turns a few preferences into 5 tailored recipes and a ready-to-shop grocery list in about 60 seconds.",
    description: "Fina Eat is an AI-powered web app I designed and built that turns a few preferences (cuisine, time, allergies, household size) into 5 tailored recipes and a ready-to-shop grocery list in about 60 seconds, cutting meal-planning time from 70-105 minutes down to 25-60. It was built with Bolt.new and covers the whole journey, from a marketing website designed to win sign-ups to AI recipe creation and the shopping-list handoff.",
    problem: "Planning meals and writing a shopping list takes 70-105 minutes, and has to account for everyone's tastes, allergies and household size.",
    solution: "We built a web app where users enter a few preferences and get 5 tailored recipes and a ready-to-shop grocery list in about 60 seconds, with a marketing website to win sign-ups.",
    results: [
      "5 tailored recipes and a grocery list in about 60 seconds",
      "Meal-planning time cut from 70-105 minutes to 25-60",
      "Takes cuisine, time, allergies and household size into account",
      "A marketing website and the app in one complete journey"
    ],
    technologies: ["Bolt.new", "React"],
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
    title: "GoJetParts - Aviation Parts Referral Marketplace (First Version)",
    category: "Web",
    tags: ["AI", "Website", "Integrations"],
    shortDesc: "The first version of an aviation parts referral marketplace, with part search and quote requests that track where each lead came from.",
    description: "I built the first-phase version of GoJetParts.com, an aviation parts referral marketplace. It has catalog search, a page for each part designed to work as an advertising landing page, a quote-request pop-up that remembers where the visitor came from (including from ads) as they browse, and a lead system that identifies the partner and tracking code behind the scenes, then emails the lead and records a Google Analytics conversion. Assumptions are documented for phase 2.",
    problem: "A parts referral marketplace needs to pass leads to partners and know exactly which ads and pages produced each lead.",
    solution: "We built a catalog that visitors can search, a page for each part designed to work as an advertising landing page, and a quote-request pop-up that remembers where the visitor came from as they browse. Behind the scenes, the lead system identifies the partner and tracking code, emails the lead and records a Google Analytics conversion.",
    results: [
      "Searchable parts catalog and a page for each part designed for ads",
      "A quote-request pop-up that remembers where each visitor came from",
      "Leads emailed and recorded as Google Analytics conversions",
      "Assumptions documented for phase 2"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Resend"],
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
    title: "GuardRemote - Smart Security Online Store (In Progress)",
    category: "Web",
    tags: ["AI", "Web App", "Website"],
    shortDesc: "An ongoing build of a smart-security hardware store, live at guardremote.com.",
    description: "An ongoing build of GuardRemote, a smart-security hardware store live at guardremote.com. I built a fast store with 17 product pages, 10 landing pages for different audiences, product bundles, quote forms that send by email with a backup option, a supplier feed importer that applies a 30% margin, and search optimization basics. I also redesigned it with a light, frosted-glass look. Checkout isn't built yet and the catalog still uses placeholder data.",
    problem: "A new smart-security store needed a fast online shop that can speak to different types of customers and handle quote requests, ahead of full checkout.",
    solution: "We built a fast store with product pages, audience-specific landing pages, bundles and quote forms, a supplier feed importer that applies a 30% margin, and search optimization basics, then redesigned it with a light, frosted-glass look. Checkout and real catalog data come later.",
    results: [
      "Live at guardremote.com",
      "17 product pages and 10 landing pages for different audiences",
      "Bundles, quote forms and a supplier feed importer with a 30% margin",
      "Still in progress: checkout isn't built yet and the catalog uses placeholder data"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
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
    slug: "moja-platform",
    title: "Moja Platform - Medical Imaging Sharing System",
    category: "SaaS",
    tags: ["Software", "Web App"],
    shortDesc: "A system that lets small clinics in Uganda and Kenya share scans with patients through a secure link on a basic phone.",
    description: "Moja Platform is a medical imaging sharing system I built for small clinics in Uganda and Kenya. It reduces \"get a patient their scan\" to a secure link that opens in under 10 seconds on an inexpensive phone, with no app and no login. I built two ways to receive scans, usage-based billing that safely handles repeats, an on-site gateway that keeps working when the internet drops, SMS and WhatsApp notifications for each country, and an administrator console with a full activity record.",
    problem: "Small clinics needed a simple way to get patients their medical scans, without requiring an app, an account or a fast internet connection.",
    solution: "We built a system where a scan is shared as a secure link that opens in under 10 seconds on an inexpensive phone, with no app and no login. Clinics can send scans in two ways, an on-site gateway keeps working when the internet drops, patients are notified by SMS or WhatsApp depending on the country, and administrators have a console with a full activity record.",
    results: [
      "Scans open in under 10 seconds on an inexpensive phone, with no app and no login",
      "Two ways for clinics to send scans",
      "An on-site gateway that keeps working when the internet drops",
      "SMS and WhatsApp notifications for each country",
      "Usage-based billing and an administrator console with a full activity record"
    ],
    technologies: ["NestJS", "PostgreSQL", "Orthanc"],
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
    slug: "moveempire",
    title: "MoveEmpire - Publishing, Security & Connection Fixes (Contributor)",
    category: "SaaS",
    tags: ["Software", "Web App"],
    shortDesc: "Contributor on a client-owned platform for a moving company's brands. I reviewed a 7-item brief and fixed the real gaps.",
    description: "I was a contributor on MoveEmpire, a client-owned platform serving a moving company's several brands. I reviewed a 7-item brief against the current work and fixed the real gaps: a pre-publish check that blocked releases because of an optional setting, added security protections, made email-sending errors clear, fixed a confusing message-timing problem, and set up Google Search Console and Google Analytics status. Everything was tested and sent for review on a separate branch, not yet merged.",
    problem: "The platform had a 7-item list of issues that needed checking against the current work, including releases being blocked, unclear errors and missing security and tracking setup.",
    solution: "We reviewed the 7-item brief against the current work and fixed the real gaps: the pre-publish check that blocked releases, missing security protections, unclear email-sending errors, a confusing message-timing problem, and Google Search Console and Google Analytics status. Everything was tested and sent for review.",
    results: [
      "7-item brief reviewed against the current work",
      "Releases no longer blocked by an optional setting",
      "Security protections added and email-sending errors made clear",
      "Everything tested and sent for review, not yet merged"
    ],
    technologies: ["React", "Vite", "Express", "Prisma", "Supabase", "Railway"],
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
    title: "The NeighborFRONT - Publishing Platform & Newsroom Dashboard",
    category: "SaaS",
    tags: ["Software", "Web App", "Dashboard"],
    shortDesc: "A publishing platform and newsroom dashboard for an independent Houston community-news brand.",
    description: "The NeighborFRONT is a publishing platform I built for an independent Houston community-news brand: a public newsroom website with 140 pre-written articles and instant search, plus an internal newsroom dashboard of about 15 screens for managing articles, tips, sources and ad sponsors around a shared editorial process. Both parts share the same 8 categories and 15 neighborhoods.",
    problem: "A community-news brand needed a public site for readers and a separate internal system to run the newsroom, kept consistent with each other.",
    solution: "We built a public newsroom website with 140 pre-written articles and instant search, plus an internal dashboard of about 15 screens covering articles, tips, sources and ad sponsors. Both parts use the same 8 categories and 15 neighborhoods so they stay consistent.",
    results: [
      "Public newsroom with 140 pre-written articles and instant search",
      "An internal dashboard of about 15 screens for articles, tips, sources and ad sponsors",
      "Shared 8 categories and 15 neighborhoods across both parts"
    ],
    technologies: ["React", "Vite"],
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
    title: "Holland Mountain - Email Code Access Gate",
    category: "Web",
    tags: ["AI", "Website", "Integrations"],
    shortDesc: "A secure sign-in gate protecting an interactive presentation of 68 AI use cases for a private-capital consultancy.",
    description: "I built a secure sign-in gate for Holland Mountain, a private-capital consultancy, protecting a client-facing interactive presentation of 68 AI use cases. It uses an approved list of email addresses, so only approved people ever receive a one-time sign-in code, with a custom branded sign-in screen and the protected content stored separately, so a new presentation can be dropped in with no risk to the sign-in system.",
    problem: "The consultancy needed to share an interactive presentation of 68 AI use cases with approved clients only.",
    solution: "We built a sign-in gate that checks an approved list of email addresses before sending anyone a one-time code, with a custom branded sign-in screen. The protected presentation is stored separately, so a new one can be dropped in without touching the sign-in.",
    results: [
      "Only approved email addresses can receive a sign-in code",
      "A custom branded sign-in screen",
      "A new presentation can be added with no risk to the sign-in",
      "Protects an interactive presentation of 68 AI use cases"
    ],
    technologies: ["Next.js", "Clerk"],
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
    title: "Cricket Live-Scoring App - Refresh & Scoring-Freeze Fixes",
    category: "SaaS",
    tags: ["AI"],
    shortDesc: "A bug-fix project on a client's cricket live-scoring app: tournaments vanishing on refresh and scoring freezing.",
    description: "A bug-fix project on a client's existing cricket live-scoring app. I traced tournaments vanishing on refresh to a stray character stopping the app from loading, and scoring freezes to the Undo history filling up the browser's storage. I fixed both without changing the database, added a retrying save queue and support for lists beyond 1,000 rows, and verified 19 of 19 checks on the live data. I later added scorer roles with protected access and net run rate.",
    problem: "Tournaments disappeared when the page was refreshed, and scoring sometimes froze.",
    solution: "We traced the disappearing tournaments to a stray character that stopped the app from loading, and the scoring freezes to the Undo history filling the browser's storage. We fixed both without changing the database, added a retrying save queue and support for lists beyond 1,000 rows, and checked everything against the live data.",
    results: [
      "Tournaments no longer vanish on refresh",
      "Scoring no longer freezes",
      "A retrying save queue and support for lists beyond 1,000 rows",
      "19 of 19 checks passed on the live data",
      "Later added scorer roles with protected access and net run rate"
    ],
    technologies: ["JavaScript", "Supabase"],
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
    title: "OfferIQ DealStream - Deal Sourcing & Live Analysis Platform",
    category: "SaaS",
    tags: ["Software", "Web App", "Website"],
    shortDesc: "A two-sided platform for real estate wholesalers: instant offer calculations during calls and deal matching for buyers.",
    description: "OfferIQ DealStream is a two-sided subscription platform I built for real estate wholesalers. Investors run instant maximum-allowable-offer calculations and five side-by-side exit strategy analyses in real time with \"Live Call Mode,\" then create a matching contract for e-signature before the call ends. On the buyer side, it matches off-market deals to each buyer's custom buying criteria and alerts them by email with a full profit breakdown. It includes subscription billing.",
    problem: "Wholesalers need to work out an offer and generate a contract while the seller is still on the phone, and buyers need to hear quickly about deals that match what they want.",
    solution: "We built \"Live Call Mode,\" where investors run instant offer calculations and five side-by-side exit strategy analyses during the call, then create a matching contract for e-signature before the call ends. For buyers, the platform matches off-market deals to their custom criteria and emails them a full profit breakdown. Subscription billing is built in.",
    results: [
      "Instant offer calculations and five exit strategy analyses in real time",
      "A matching contract ready for e-signature before the call ends",
      "Deals matched to each buyer's custom criteria and emailed with a full profit breakdown",
      "Subscription billing built in"
    ],
    technologies: ["Next.js", "Node.js"],
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
    title: "Platinum Wellness Spa - Booking App with Locked-Down Practice System",
    category: "SaaS",
    tags: ["AI", "Integrations"],
    shortDesc: "An installable booking app for a luxury spa that sits in front of a locked-down, health-privacy-sensitive practice system.",
    description: "I built an installable booking app for a luxury day and medical spa. It sits in front of a locked-down, health-privacy-sensitive practice management system that allows only a limited number of requests per day. A middle layer groups availability checks and learns which providers are qualified, while booking requests go through a separate email path that never touches the practice system and always appears as a \"request,\" not a confirmed booking. Also built: rebooking, an FAQ chatbot and a linked lead-capture website.",
    problem: "The spa's practice management system holds sensitive health-related information and limits how many requests can be made each day, so a booking app could not simply connect to it directly.",
    solution: "We built an installable booking app with a middle layer that groups availability checks to stay within the daily limit and learns which providers are qualified for each service. Booking requests go through a separate email path that never touches the practice system, and always appear as a \"request,\" not a confirmed booking. We also built rebooking, an FAQ chatbot and a linked lead-capture website.",
    results: [
      "An installable booking app for a luxury spa",
      "Availability checks grouped to stay within the daily limit",
      "Booking requests that never touch the practice system",
      "Rebooking, an FAQ chatbot and a linked lead-capture website"
    ],
    technologies: ["JavaScript", "Netlify Functions", "Supabase"],
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
    slug: "bukky-osifeso",
    title: "Bukky Osifeso - Personal & Speaker Website",
    category: "Web",
    tags: ["Web Design", "Website", "Web"],
    shortDesc: "A personal and professional website for a People/HR strategist and author, built as a single hand-coded page.",
    description: "I built the personal and professional website for Bukky Osifeso, a People/HR strategist and author, as a single hand-coded page with no outside tools or backend. It's a dark, editorial long-scroll page that directs four types of visitors to four next steps, with a hand-built world map plotting 44 cities across 32 countries, statistics that are always calculated fresh so they never go out of date, and careful support for visitors who prefer reduced motion across every animation.",
    problem: "A strategist and author needed a personal website that speaks to four different audiences and shows her global reach.",
    solution: "We built a dark, editorial long-scroll page that sends four types of visitors to four different next steps, with a hand-built world map showing 44 cities in 32 countries and statistics that are always calculated fresh. Every animation respects visitors who prefer reduced motion.",
    results: [
      "Four audiences directed to four next steps",
      "A hand-built world map plotting 44 cities across 32 countries",
      "Statistics calculated fresh so they never go out of date",
      "Animations that respect visitors who prefer reduced motion"
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
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
    slug: "mito-shred",
    title: "MitoShred - Direct-Response Supplement Offer Page & Legal Pages",
    category: "Web",
    tags: ["Web Design", "Payments", "Web"],
    shortDesc: "A long-form sales page and the required legal pages for a fat-loss supplement offer aimed at men over 40.",
    description: "I built the sales page and the required legal pages for MitoShred, a fat-loss supplement offer for men over 40. The long-form page tells the story from the problem to the offer, with tiered pricing, a 60-day guarantee and an FAQ that answers common doubts, plus Terms, Privacy and Refund pages in the style required by advertising platforms and payment processors. It is simple enough for a non-technical marketer to edit.",
    problem: "A supplement offer needed a persuasive sales page and the legal pages that advertising platforms and payment processors require.",
    solution: "We built a long-form sales page that tells the story from the problem to the offer, with tiered pricing, a 60-day guarantee and an FAQ that answers common doubts, plus Terms, Privacy and Refund pages in the style advertising platforms and payment processors require. It is simple enough for a non-technical marketer to edit.",
    results: [
      "A long-form sales page with tiered pricing, a 60-day guarantee and an FAQ",
      "Terms, Privacy and Refund pages for advertising platforms and payment processors",
      "Simple enough for a non-technical marketer to edit"
    ],
    technologies: ["HTML", "Tailwind CSS"],
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
    slug: "rooted-and-rising",
    title: "Rooted and Rising - Book Launch Landing Page",
    category: "Web",
    tags: ["Web Design", "Web"],
    shortDesc: "A launch website for Bukky Osifeso's book, positioned for six types of readers and linking straight to Amazon.",
    description: "I built the launch website for Rooted and Rising, Bukky Osifeso's book: a cream-and-serif long-scroll page that positions the book for six types of readers, frames chapters with Yoruba proverbs and links straight to Amazon. It is one small page that loads very quickly and collects reader emails with a single behind-the-scenes call, deliberately styled differently from the author's separate personal website.",
    problem: "A new book needed its own launch page that speaks to different kinds of readers and sends them to buy it.",
    solution: "We built a cream-and-serif long-scroll page that positions the book for six types of readers, frames the chapters with Yoruba proverbs and links straight to Amazon. It loads very quickly, collects reader emails, and is deliberately styled differently from the author's personal website.",
    results: [
      "Positioned for six types of readers",
      "Chapters framed with Yoruba proverbs",
      "A direct link to Amazon and an email sign-up",
      "A very fast-loading page, styled differently from the author's personal site"
    ],
    technologies: ["HTML", "CSS"],
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
    title: "Tame The Jungle - Rebuild as a Native Wix Site (In Progress)",
    category: "Web",
    tags: ["Web Design", "Website", "Web App", "Mobile", "Integrations"],
    shortDesc: "Rebuilding Tame The Jungle's website design as a native Wix site. Work is in progress.",
    description: "I'm rebuilding Tame The Jungle's website design as a native Wix site (in progress). I extracted the exact wording for every page from the design files, confirmed that Wix has no way to import an existing design, and produced a Wix style guide, an 8-page map that keeps the existing ranked page addresses, optimized images and a full build guide with editor prompts. The build in the Wix editor and the phone layout come next.",
    problem: "The design existed as a finished website, but Wix can't import one, so it has to be rebuilt in Wix without losing existing Google rankings.",
    solution: "We extracted the exact wording for every page, confirmed that Wix has no import option, and produced a Wix style guide, an 8-page map that keeps the existing ranked page addresses, optimized images and a full build guide. The build in the Wix editor and the phone layout come next.",
    results: [
      "Exact wording extracted for every page",
      "A Wix style guide and an 8-page map that keeps existing ranked page addresses",
      "Optimized images and a full build guide",
      "In progress: the Wix editor build and phone layout come next"
    ],
    technologies: ["Wix"],
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
    title: "SEO Diagnosis, Fix & Monitoring - wearetag.ai (WordPress)",
    category: "Web",
    tags: ["Web Design", "WordPress", "Web"],
    shortDesc: "Fixed a WordPress website that was showing up in Google as a bare web address with no title.",
    description: "I diagnosed and fixed a search visibility problem on The TAG Group's WordPress website, which was appearing in Google as a bare web address with no title. I traced the real cause to a site-wide \"Discourage search engines\" setting telling Google to ignore every page, turned it off, checked the fix live, and re-checked the page details Google reads. I also set up Google Search Console and a recurring monthly SEO check.",
    problem: "The website appeared in Google as a bare web address with no title.",
    solution: "We traced the real cause to a site-wide \"Discourage search engines\" setting that told Google to ignore every page, turned it off, checked the fix live and re-checked the page details Google reads. We also set up Google Search Console and a recurring monthly SEO check.",
    results: [
      "Found the real cause: a site-wide \"Discourage search engines\" setting",
      "Fix checked live",
      "Google Search Console set up",
      "A recurring monthly SEO check"
    ],
    technologies: ["WordPress", "Elementor"],
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
    title: "Wharton Carpet Cleaning - Local Service Business Website",
    category: "Web",
    tags: ["Web Design", "Web"],
    shortDesc: "A website built to win enquiries for an IICRC-certified Phoenix carpet cleaner.",
    description: "I built a website designed to win enquiries for Joel Wharton, an IICRC-certified Phoenix carpet cleaner. It has an enquiry form at the top of the page, six dedicated service pages, a repeatable 3-step process on each, and live Google reviews (475 reviews, 5 stars). Every call to action offers three equal ways to get in touch (text, call or form), with local search content for seven Phoenix-area cities. It is hand-built for fast loading.",
    problem: "A local carpet cleaner needed a website that wins enquiries quickly and shows proof that customers are happy.",
    solution: "We built a website with an enquiry form at the top of the page, six dedicated service pages, a repeatable 3-step process on each, and live Google reviews. Every call to action offers three equal ways to get in touch, with local search content for seven Phoenix-area cities, hand-built for fast loading.",
    results: [
      "Enquiry form at the top of the page and six dedicated service pages",
      "Live Google reviews: 475 reviews, 5 stars",
      "Text, call or form on every call to action",
      "Local search content for seven Phoenix-area cities"
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
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
];

export const categories = ["All", "Web", "Mobile App", "SaaS", "AI", "Automation"] as const;

// Groups used to showcase projects by type of work (portfolio filter and
// homepage). A project belongs to a group when any of its technologies match.
export const stackGroups = [
  { name: "Modern websites", match: ["Next.js"] },
  { name: "Web apps", match: ["React", "Vite"] },
  { name: "Custom software", match: ["TypeScript"] },
  { name: "Apps with customer accounts", match: ["Supabase"] },
  { name: "Online services", match: ["Node.js", "Express"] },
  { name: "Data-driven platforms", match: ["PostgreSQL", "Neon Postgres", "MySQL", "Drizzle ORM", "Prisma"] },
  { name: "AI & automation", match: ["OpenAI", "AI Voice Agents"] },
  { name: "Mobile apps", match: ["React Native", "Expo"] },
  { name: "WordPress websites", match: ["WordPress", "Elementor Pro"] },
  { name: "PHP development", match: ["PHP"] },
  { name: "Hand-built websites", match: ["HTML", "CSS"] },
  { name: "CRM & marketing automation", match: ["GoHighLevel", "GoHighLevel API"] },
  { name: "AI-built apps", match: ["Lovable"] },
] as const;
export type StackName = (typeof stackGroups)[number]["name"];

export function projectsForStack(list: Project[], stack: string): Project[] {
  const group = stackGroups.find((g) => g.name === stack);
  if (!group) return list;
  return list.filter((p) => p.technologies.some((t) => (group.match as readonly string[]).includes(t)));
}
export type Category = (typeof categories)[number];
