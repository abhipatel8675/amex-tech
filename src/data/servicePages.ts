// Long-form content for the /services/<slug> landing pages. Keyed by the slug in
// services.ts; projects and posts are referenced by slug so links never go stale.
export type ServicePage = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  // Answer-first opening: what it is, who it's for, how we do it.
  intro: string[];
  whoFor: string[];
  deliverables: { title: string; body: string }[];
  process: { title: string; body: string }[];
  projectSlugs: string[];
  blogSlugs: string[];
  faq: { question: string; answer: string }[];
};

export const servicePages: Record<string, ServicePage> = {
  "ai-services": {
    metaTitle: "AI Agent Development & Automation Agency",
    metaDescription:
      "We build AI chat and voice agents, document pipelines and n8n, Make and Zapier automations with guardrails and human hand-off. Free consultation.",
    h1: "AI Agent Development & Business Automation",
    intro: [
      "Amex Technology builds AI agents and automations that take repetitive work off your team: agents that answer customers and qualify leads, pipelines that read documents and enter the data, and workflows that keep your tools in sync. We build on OpenAI and Claude, and automate with n8n, Make and Zapier.",
      "Every agent ships with guardrails, logging and a hand-off to a person when the AI isn't sure, so it helps your customers instead of embarrassing you.",
    ],
    whoFor: [
      "Small businesses answering the same customer questions all day",
      "Sales teams that need every lead contacted and qualified quickly",
      "Operations teams copying data between emails, PDFs, spreadsheets and a CRM",
      "Founders adding AI features to an existing product",
    ],
    deliverables: [
      {
        title: "AI chat and voice agents",
        body: "Website chat, SMS and voice agents that answer questions from your own content, book appointments and pass qualified leads to your team.",
      },
      {
        title: "Document and data extraction",
        body: "Pipelines that read invoices, forms and emails, pull out the fields you need and write them into your database or CRM, with a review step for low-confidence results.",
      },
      {
        title: "Workflow automation",
        body: "n8n, Make and Zapier workflows that connect the tools you already pay for, so a new lead, order or form submission triggers the right steps automatically.",
      },
      {
        title: "AI features inside your product",
        body: "Summaries, drafting, classification and search built into your web or mobile app, with usage limits so AI costs stay predictable.",
      },
    ],
    process: [
      { title: "Map the work", body: "We list the repetitive tasks, how often they happen and what a good result looks like." },
      { title: "Prototype on real data", body: "A small working version on your own examples, so you can judge the quality before committing." },
      { title: "Build with guardrails", body: "Logging, fallbacks, cost limits and a human hand-off for anything the AI shouldn't decide alone." },
      { title: "Launch and tune", body: "We watch real conversations and runs for the first weeks and adjust prompts and rules." },
    ],
    projectSlugs: ["dialogix", "molar-ai", "periscope-email"],
    blogSlugs: [],
    faq: [
      {
        question: "What's the difference between an AI agent and a chatbot?",
        answer:
          "A traditional chatbot follows a fixed script. An AI agent understands free-form questions, looks up answers in your own content or systems, and can take actions such as booking an appointment or updating a CRM record. We still give agents clear limits and a hand-off to a person.",
      },
      {
        question: "Which AI models do you use?",
        answer:
          "Mostly OpenAI and Anthropic Claude models, chosen per task for quality, speed and cost. For automation we use n8n, Make or Zapier, depending on what your team already uses and whether you want to self-host.",
      },
      {
        question: "Is my business data safe with an AI agent?",
        answer:
          "We only send the data a task needs, use API settings that don't train models on your data, and keep logs in your own accounts. Sensitive actions require a person to approve them.",
      },
      {
        question: "How long does an AI automation project take?",
        answer:
          "A single focused automation often takes one to three weeks. A customer-facing agent connected to several systems usually takes four to eight weeks, including testing on real conversations.",
      },
    ],
  },

  "web-development": {
    metaTitle: "Website & Web App Development Company",
    metaDescription:
      "Fast marketing websites, customer portals, dashboards and web apps on Next.js and Supabase, built to rank on Google and AI search. Get a free quote.",
    h1: "Website & Web App Development",
    intro: [
      "Amex Technology designs and builds business websites and the web apps behind them: marketing sites, customer portals, dashboards, quoting tools and internal systems. Our main stack is Next.js, React, TypeScript and Supabase (PostgreSQL), hosted on Vercel.",
      "One team handles the public site and the app, so your pages load fast, Google and AI assistants can read them, and your customers move from the website into the product without friction.",
    ],
    whoFor: [
      "Businesses whose current website is slow, dated or hard to update",
      "Companies that need a customer portal, booking flow or dashboard",
      "Teams replacing spreadsheets with a proper internal tool",
      "Founders who need a product built, not just a landing page",
    ],
    deliverables: [
      {
        title: "Marketing websites",
        body: "Server-rendered pages with clean structure, schema markup and fast load times, plus a CMS or admin panel so you can edit content yourself.",
      },
      {
        title: "Customer portals and dashboards",
        body: "Secure logins, role-based access and the screens your customers or staff use every day.",
      },
      {
        title: "Integrations and APIs",
        body: "Payments, bank data, CRMs, email and third-party APIs connected properly, with retries and error logging.",
      },
      {
        title: "Takeovers and rebuilds",
        body: "We pick up existing codebases, fix what's broken and finish what's half-built, and only rewrite when it's genuinely cheaper.",
      },
    ],
    process: [
      { title: "Scope", body: "We agree the pages, user roles and integrations in writing, with what's in and out of version one." },
      { title: "Design", body: "Wireframes and a visual design built on a solid component library, approved before development." },
      { title: "Build in milestones", body: "You click through working features at each milestone, on a preview link." },
      { title: "Launch and support", body: "Domain, analytics and Search Console set up at launch, followed by a support period." },
    ],
    projectSlugs: ["goswiftfund", "wolfe-property", "ultra-windows", "firmsledger", "island-traffic-defense"],
    blogSlugs: ["web-app-development-cost", "connect-nextjs-react-with-supabase", "connect-vercel-app-godaddy-domain"],
    faq: [
      {
        question: "How much does a website or web app cost?",
        answer:
          "A professional website typically starts from $500 to $2,000, and a web application from $3,000 to $10,000, depending on pages, features and integrations. We send an itemised quote after a free discovery call. Our guide to web app development cost explains what drives the price.",
      },
      {
        question: "How long does it take?",
        answer:
          "A business website usually takes two to four weeks. Most web applications take six to twelve weeks from kickoff to launch, depending on the number of workflows and integrations.",
      },
      {
        question: "Why Next.js and Supabase?",
        answer:
          "Next.js renders pages on the server, which makes them fast and easy for Google and AI search to read. Supabase gives you a real PostgreSQL database, authentication and file storage with row-level security, without running your own servers.",
      },
      {
        question: "Will I own the code and accounts?",
        answer:
          "Yes. The code lives in your GitHub account and the hosting, database and domain are in accounts you control, so you're never locked in to us.",
      },
    ],
  },

  "saas-development": {
    metaTitle: "AI SaaS & MVP Development Agency",
    metaDescription:
      "Launch a SaaS or AI product with auth, Stripe billing and multi-tenant security, or harden an app built in Lovable, Bolt or Replit for real users.",
    h1: "AI SaaS & MVP Development",
    intro: [
      "Amex Technology takes SaaS and AI product ideas from prototype to a launch-ready MVP: sign-up and login, Stripe subscriptions, multi-tenant data protected by row-level security, AI features with cost controls, and analytics.",
      "Already built a first version in Lovable, Bolt or Replit? We review it, fix the security and data problems AI builders commonly leave behind, and get it ready for real users and real traffic.",
    ],
    whoFor: [
      "Founders who need a working MVP to show customers or investors",
      "Non-technical founders with an AI-built prototype that's hitting its limits",
      "Businesses turning an internal tool into a product they can sell",
      "Products adding AI features without runaway API bills",
    ],
    deliverables: [
      {
        title: "Launch-ready MVP",
        body: "The one core workflow your users pay for, with authentication, onboarding, email and Stripe billing.",
      },
      {
        title: "Multi-tenant security",
        body: "Each customer's data separated by row-level security policies in the database, not just in the front end.",
      },
      {
        title: "AI features with limits",
        body: "AI generation, summaries or agents inside the product, with per-plan usage limits and cost tracking.",
      },
      {
        title: "Prototype-to-production hardening",
        body: "Code export, security review, fixed RLS policies, environment variables, error monitoring and proper hosting for apps started in AI builders.",
      },
    ],
    process: [
      { title: "Define the core workflow", body: "We cut the idea down to what version one must do to be worth paying for." },
      { title: "Architecture", body: "Data model, tenancy and billing designed up front, because they're expensive to change later." },
      { title: "Build and demo weekly", body: "Short cycles with a preview link, so you can test with early users as we go." },
      { title: "Launch and iterate", body: "Production hosting, monitoring and analytics, then improvements based on real usage." },
    ],
    projectSlugs: ["hoursheets", "hmd", "periscope-email", "goswiftfund"],
    blogSlugs: ["web-app-development-cost", "bolt-new-review", "how-to-export-code-from-lovable", "fix-new-row-violates-row-level-security-policy-supabase"],
    faq: [
      {
        question: "How much does a SaaS MVP cost?",
        answer:
          "A SaaS platform typically starts from $5,000, and the final figure depends on the number of user roles, integrations and AI features. After a discovery call we send a fixed, itemised quote for version one.",
      },
      {
        question: "Can you finish an app I started in Lovable, Bolt or Replit?",
        answer:
          "Yes. We export the code to your own GitHub, review the database and security rules, and fix or finish it. In most cases that's cheaper than starting over, and we'll tell you honestly when it isn't. Our free App Checker gives a quick first look.",
      },
      {
        question: "What stack do you use for SaaS?",
        answer:
          "Usually Next.js and TypeScript on Vercel, Supabase for the database, auth and storage, Stripe for billing, and OpenAI or Claude for AI features. We adapt to an existing stack when you already have one.",
      },
      {
        question: "How do you keep AI costs under control?",
        answer:
          "We set usage limits per plan, cache repeat requests, choose the cheapest model that does the job well, and track AI spend per customer so pricing covers it.",
      },
    ],
  },

  "seo-services": {
    metaTitle: "SEO & GEO Services: Google and AI Search",
    metaDescription:
      "Technical SEO, local SEO, Google Business Profile and Generative Engine Optimization (GEO) so customers find you on Google, ChatGPT and Perplexity.",
    h1: "SEO & GEO: Get Found on Google and in AI Search",
    intro: [
      "Customers now search on Google and inside AI assistants like ChatGPT, Perplexity and Gemini. Amex Technology fixes technical SEO, builds pages around what your customers actually search, optimises your Google Business Profile for local search, and applies Generative Engine Optimization (GEO) so AI tools understand and recommend your business.",
      "Because we also build websites, we fix the underlying problems directly in your site's code instead of handing you a report full of recommendations.",
    ],
    whoFor: [
      "Local businesses that don't show up in \"near me\" searches or the map pack",
      "Companies with a website that gets little or no search traffic",
      "Businesses that AI assistants don't mention, or describe incorrectly",
      "Sites that lost rankings after a redesign or platform move",
    ],
    deliverables: [
      {
        title: "Technical SEO audit and fixes",
        body: "Indexing, sitemaps, canonicals, redirects, page speed and Core Web Vitals, fixed in the code.",
      },
      {
        title: "Local SEO",
        body: "Google Business Profile setup and optimisation, consistent business listings, and location pages that match how people search.",
      },
      {
        title: "Content built on search demand",
        body: "Service and location pages, plus articles targeting questions your customers ask, based on real keyword data.",
      },
      {
        title: "GEO for AI assistants",
        body: "Clear entity information, Organization and Service schema, consistent profiles across the web, and content AI tools can quote.",
      },
    ],
    process: [
      { title: "Audit", body: "Crawl, rankings, Search Console data and a check of what AI assistants currently say about you." },
      { title: "Fix the foundations", body: "Technical problems first, because content can't rank on a site search engines can't read properly." },
      { title: "Build pages that match searches", body: "Service, location and answer pages for the searches that bring paying customers." },
      { title: "Report monthly", body: "Rankings, traffic, leads and AI visibility, with the next month's priorities." },
    ],
    projectSlugs: ["firmsledger", "island-traffic-defense"],
    blogSlugs: [],
    faq: [
      {
        question: "What is GEO (Generative Engine Optimization)?",
        answer:
          "GEO is the work of making AI assistants such as ChatGPT, Perplexity and Gemini understand your business and recommend it. It combines clear entity information, structured data, consistent profiles and listings across the web, and content written so it can be quoted directly.",
      },
      {
        question: "How long does SEO take to show results?",
        answer:
          "Technical fixes can show results within weeks once pages are re-crawled. New content and local rankings usually take three to six months to build, depending on competition and how established your site already is.",
      },
      {
        question: "Do you do local SEO and Google Business Profile?",
        answer:
          "Yes. We set up or clean up your Google Business Profile, align your business details across directories, and build location pages so you appear in local and map results.",
      },
      {
        question: "Is SEO still worth it with AI search?",
        answer:
          "Yes. AI assistants pull from search indexes and well-known websites, so pages that rank and are cited elsewhere are also the ones AI tools recommend. Good SEO is the foundation of AI visibility.",
      },
    ],
  },

  "aeo-services": {
    metaTitle: "Answer Engine Optimization (AEO) Services",
    metaDescription:
      "AEO services: answer-first content, FAQ schema and llms.txt so Google AI Overviews, ChatGPT and voice assistants quote your business directly.",
    h1: "AEO: Answer Engine Optimization",
    intro: [
      "Answer Engine Optimization (AEO) structures your content so answer engines quote you directly: Google AI Overviews, featured snippets, ChatGPT search, Perplexity and voice assistants. Amex Technology researches the questions your customers actually ask, writes clear answer-first pages, and adds FAQ structured data and llms.txt.",
      "We use the same approach on amextechnology.com itself: answer-first articles, FAQ schema on key pages, and a published llms.txt file.",
    ],
    whoFor: [
      "Businesses whose customers ask the same questions before buying",
      "Experts and service firms who want to be the source AI tools quote",
      "Sites that rank on Google but never appear in AI Overviews",
      "Companies launching a new service that needs clear, quotable explanations",
    ],
    deliverables: [
      {
        title: "Question research",
        body: "The real questions people ask about your service, from search suggestions, keyword data and your own sales conversations.",
      },
      {
        title: "Answer-first pages",
        body: "Each page opens with a direct two- or three-sentence answer, followed by the detail, so it can be quoted as-is.",
      },
      {
        title: "Structured data and llms.txt",
        body: "FAQ, HowTo, Organization and Service schema, plus an llms.txt file that summarises your business for AI crawlers.",
      },
      {
        title: "Citation tracking",
        body: "A monthly check of which AI assistants mention or cite your business for your key questions.",
      },
    ],
    process: [
      { title: "Collect the questions", body: "We build a list of buyer questions, grouped by service and stage." },
      { title: "Write the answers", body: "Clear, accurate answers reviewed by you, with no padding." },
      { title: "Mark them up", body: "Schema, internal links and llms.txt so machines can find and trust them." },
      { title: "Track citations", body: "We check AI assistants each month and refine the pages that aren't being picked up." },
    ],
    projectSlugs: ["firmsledger"],
    blogSlugs: [],
    faq: [
      {
        question: "What's the difference between SEO, AEO and GEO?",
        answer:
          "SEO gets your pages ranked in search results. AEO shapes individual answers so search features and assistants quote them directly. GEO is the broader work of making AI assistants understand and recommend your business. The three overlap, and we usually combine them.",
      },
      {
        question: "What is llms.txt?",
        answer:
          "llms.txt is a plain-text file at the root of your website that summarises who you are and links to your key pages, written for AI tools to read. It's a small, low-cost addition alongside structured data and clear content.",
      },
      {
        question: "Does FAQ schema still help?",
        answer:
          "Google shows FAQ rich results for far fewer sites than before, but FAQ structured data still describes your questions and answers in a format machines can parse, and answer-first content is what AI Overviews and assistants tend to quote.",
      },
      {
        question: "Can you guarantee ChatGPT will recommend us?",
        answer:
          "No one can guarantee that. What we can do is remove the reasons AI tools skip you: unclear entity information, missing structured data, thin answers and a lack of mentions elsewhere, and then track progress monthly.",
      },
    ],
  },

  "crm-automation": {
    metaTitle: "GoHighLevel & CRM Automation Services",
    metaDescription:
      "GoHighLevel and HubSpot setup, repair and automation: forms and calls synced to your pipeline, automatic SMS and email follow-up, and lead-leak audits.",
    h1: "GoHighLevel & CRM Automation",
    intro: [
      "Amex Technology sets up and repairs CRMs so no lead slips through. Website forms and calls flow into your GoHighLevel or HubSpot pipeline, follow-ups run automatically by SMS and email, and you can see which sources actually turn into customers.",
      "We also handle the technical side most CRM consultants don't: custom website integrations, APIs, webhooks, dialers and payment connections.",
    ],
    whoFor: [
      "Businesses losing leads between the website form and the CRM",
      "Teams paying for GoHighLevel or HubSpot but still following up by hand",
      "Agencies that need a technical partner for custom CRM integrations",
      "Owners who can't tell which marketing channel brings paying customers",
    ],
    deliverables: [
      {
        title: "Pipelines and follow-up automations",
        body: "Stages, tags, and SMS and email sequences that contact every lead quickly and stop when they reply or book.",
      },
      {
        title: "Website and form integrations",
        body: "Forms on any website, including custom-coded ones, sent to your CRM with the source and campaign attached.",
      },
      {
        title: "Dialer, SMS and payment connections",
        body: "Twilio, dialers, Stripe and other tools connected through APIs and webhooks.",
      },
      {
        title: "CRM audits",
        body: "We trace every lead path and find broken automations, duplicate contacts and leads that never arrived.",
      },
    ],
    process: [
      { title: "Trace the lead paths", body: "Every form, call and ad that should create a lead, and where each one actually ends up." },
      { title: "Fix and rebuild", body: "Broken integrations repaired, pipelines and tags cleaned up." },
      { title: "Automate follow-up", body: "Sequences written and tested end to end with real submissions." },
      { title: "Hand over", body: "A short guide and a walkthrough so your team knows how it works." },
    ],
    projectSlugs: ["portland-self-defense-crm", "dialogix"],
    blogSlugs: [],
    faq: [
      {
        question: "Do you work with GoHighLevel agencies and sub-accounts?",
        answer:
          "Yes. We work directly with businesses and as a technical partner for agencies, inside your agency account or a client's sub-account.",
      },
      {
        question: "Can you connect a custom website to GoHighLevel?",
        answer:
          "Yes. We connect custom-coded and CMS websites through the GoHighLevel API or webhooks, keeping spam protection in place and passing the lead source so reporting stays accurate.",
      },
      {
        question: "How do I know if my CRM is losing leads?",
        answer:
          "Compare form submissions and calls on your website with new contacts in the CRM over the same period. If the numbers don't match, leads are leaking. A CRM audit traces each path and finds where they're lost.",
      },
      {
        question: "Do you work with HubSpot too?",
        answer:
          "Yes. We set up and automate HubSpot, and connect it to your website, forms and other tools with Zapier, Make or direct API integrations.",
      },
    ],
  },

  "mobile-app-development": {
    metaTitle: "Mobile App Development: iOS & Android",
    metaDescription:
      "Cross-platform iOS and Android apps with React Native and Expo, including AI features, push notifications and App Store and Google Play submission.",
    h1: "Mobile App Development for iOS & Android",
    intro: [
      "Amex Technology builds iOS and Android apps from one codebase with React Native and Expo, backed by Firebase or Supabase. We add AI features like chat, voice and image recognition where they help, and we handle App Store and Google Play submission.",
      "One codebase means one team, one set of fixes and both stores updated together, which keeps the cost and timeline well below building two native apps.",
    ],
    whoFor: [
      "Startups launching a mobile product on both stores",
      "Businesses that need an app for customers, members or field staff",
      "Companies with a web app that needs a mobile companion",
      "Founders with an existing app that needs fixes or new features",
    ],
    deliverables: [
      {
        title: "Cross-platform apps",
        body: "React Native and Expo apps that look and feel native on iPhone and Android.",
      },
      {
        title: "Backend and accounts",
        body: "Sign-in, user data, file uploads and real-time updates on Firebase or Supabase.",
      },
      {
        title: "Push notifications and alerts",
        body: "Notifications, deep links and in-app messages, set up and tested on real devices.",
      },
      {
        title: "Store submission",
        body: "App Store and Google Play listings, builds, review requirements and release management.",
      },
    ],
    process: [
      { title: "Plan the screens", body: "User flows and the screens for version one, agreed up front." },
      { title: "Design", body: "A mobile design that follows iOS and Android conventions." },
      { title: "Build and test", body: "Test builds on your own phone through TestFlight and internal testing." },
      { title: "Publish", body: "Store submission, review fixes and launch, then updates as you grow." },
    ],
    projectSlugs: ["cyber7", "emigo", "herruby-app"],
    blogSlugs: ["fix-firebase-auth-invalid-api-key", "fix-firestore-missing-or-insufficient-permissions"],
    faq: [
      {
        question: "Should I build native or cross-platform?",
        answer:
          "For most business apps, cross-platform with React Native is the better choice: one codebase, a lower cost and both stores at once. Fully native development makes sense mainly for apps that push the limits of device hardware or graphics.",
      },
      {
        question: "Do you handle App Store and Google Play submission?",
        answer:
          "Yes. We prepare the builds, store listings and privacy details, submit to both stores and handle any review feedback.",
      },
      {
        question: "Can the app share a backend with my website?",
        answer:
          "Yes. Using Supabase or Firebase, the app and website can share the same accounts and data, so customers sign in once and see the same information everywhere.",
      },
      {
        question: "How long does a mobile app take to build?",
        answer:
          "A focused first version usually takes eight to fourteen weeks including store review, depending on the number of screens, integrations and AI features.",
      },
    ],
  },

  "ui-ux-design": {
    metaTitle: "UI/UX Design for Websites, Apps & SaaS",
    metaDescription:
      "UI/UX and product design: user flows, wireframes, design systems and Figma prototypes that developers can build exactly. Design and development in one team.",
    h1: "UI/UX & Product Design",
    intro: [
      "Amex Technology designs websites, web apps and mobile apps with clear user flows, modern interfaces and design systems that scale. We work in Figma and hand over designs developers can build exactly.",
      "Because the same team designs and builds, designs are realistic to build, and nothing gets lost between the designer and the developer.",
    ],
    whoFor: [
      "Startups that need a product design before development starts",
      "Businesses whose website looks dated or doesn't convert",
      "SaaS products with confusing onboarding or dashboards",
      "Brands launching a campaign, event or new product",
    ],
    deliverables: [
      {
        title: "User flows and wireframes",
        body: "The steps users take and the layout of each screen, agreed before visual design begins.",
      },
      {
        title: "Visual design",
        body: "Modern, on-brand interfaces for desktop and mobile, designed for clarity and conversion.",
      },
      {
        title: "Design systems",
        body: "Reusable components, colours and type styles, so new screens stay consistent and are faster to build.",
      },
      {
        title: "Interactive prototypes",
        body: "Clickable Figma prototypes for testing with users or showing investors before any code is written.",
      },
    ],
    process: [
      { title: "Understand", body: "Your users, goals and what your competitors do well and badly." },
      { title: "Wireframe", body: "Structure and flow first, without colour or detail getting in the way." },
      { title: "Design", body: "Visual design and a component library, reviewed with you." },
      { title: "Hand off or build", body: "Developer-ready files, or we build it ourselves." },
    ],
    projectSlugs: ["east-end-vintage-sale", "zenscroll", "wide-eyed-giant", "buttercream-bus"],
    blogSlugs: [],
    faq: [
      {
        question: "Do you only design, or also build?",
        answer:
          "Both. We can hand over Figma files to your developers, or design and build the product ourselves so the finished result matches the design exactly.",
      },
      {
        question: "What tools do you use?",
        answer:
          "Figma for design and prototypes, and component libraries such as shadcn/ui with Tailwind CSS for development, which keeps the design and the code in step.",
      },
      {
        question: "Can you redesign my existing website or app?",
        answer:
          "Yes. We review what works and what doesn't, keep the parts your users rely on, and redesign the rest, then build it or hand it over.",
      },
      {
        question: "How long does a design project take?",
        answer:
          "A website design usually takes one to three weeks. A full web or mobile app design typically takes three to six weeks, depending on the number of screens.",
      },
    ],
  },

  "devops-deployment": {
    metaTitle: "Cloud Hosting, DevOps & Website Care Plans",
    metaDescription:
      "Vercel, AWS and Cloudflare setup, CI/CD, monitoring, backups and monthly care plans so your website or app stays fast, secure and online.",
    h1: "Cloud, DevOps & Care Plans",
    intro: [
      "Amex Technology sets up the hosting and deployment for your website or app and then looks after it. Automated deployments, monitoring and backups keep it online, and a monthly care plan covers updates, fixes and small improvements.",
      "We work with Vercel, AWS, Cloudflare, Supabase, Docker and GitHub Actions, and we also sort out the parts that quietly break things: domains, DNS, SSL and email deliverability.",
    ],
    whoFor: [
      "Businesses whose site or app goes down and nobody notices until a customer complains",
      "Teams deploying by hand and afraid to release",
      "Founders whose developer has moved on and left no one in charge",
      "Companies with email landing in spam because of DNS problems",
    ],
    deliverables: [
      {
        title: "Hosting and CI/CD",
        body: "Hosting set up on the right platform, with automatic preview and production deploys from GitHub.",
      },
      {
        title: "Monitoring and backups",
        body: "Uptime, error and security monitoring, plus database backups you've actually tested restoring.",
      },
      {
        title: "Domains, DNS and email",
        body: "Domain and DNS setup on Cloudflare or your registrar, SSL, and SPF, DKIM and DMARC for email deliverability.",
      },
      {
        title: "Monthly care plans",
        body: "Dependency and security updates, fixes and small improvements each month, with a short report.",
      },
    ],
    process: [
      { title: "Review", body: "Where everything is hosted, who has access and what would happen if it broke." },
      { title: "Set up", body: "Deployments, monitoring, backups and access cleaned up and documented." },
      { title: "Hand over access", body: "Everything stays in accounts you own, with a written runbook." },
      { title: "Look after it", body: "Monthly updates and fixes, and a fast response when something goes wrong." },
    ],
    projectSlugs: ["firmsledger", "goswiftfund", "tiancheng-development-group"],
    blogSlugs: ["how-to-setup-cloudflare-dns", "fix-vercel-404-not-found-after-deploy", "how-to-setup-resend-email", "fix-vercel-build-fails-supabase-env-variables"],
    faq: [
      {
        question: "What's included in a care plan?",
        answer:
          "Security and dependency updates, uptime and error monitoring, backups, small fixes and content changes, and a short monthly report. Plans range from a few hours a month to ongoing development.",
      },
      {
        question: "Which hosting do you recommend?",
        answer:
          "For Next.js and React sites, usually Vercel with Cloudflare for DNS. For apps that need more control or long-running servers, AWS or a container platform. We recommend based on your traffic, budget and team.",
      },
      {
        question: "Can you take over a site another developer built?",
        answer:
          "Yes. We review the code and hosting, move access into accounts you own, document how it works and then maintain it.",
      },
      {
        question: "Why do my emails go to spam?",
        answer:
          "Usually because SPF, DKIM or DMARC records are missing or wrong for your domain. We check and fix the DNS records and test deliverability with your email provider.",
      },
    ],
  },
};
