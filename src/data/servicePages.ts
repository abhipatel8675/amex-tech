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
    metaTitle: "AI Assistants & Business Automation",
    metaDescription:
      "We set up AI chat and phone assistants, automatic paperwork handling and workflow automation, with a hand-off to your team when needed. Free consultation.",
    h1: "AI Assistants & Business Automation",
    intro: [
      "Amex Technology sets up AI assistants and automated processes that take repetitive work off your team: assistants that answer customers and respond to new enquiries, tools that read documents and enter the details for you, and automations that keep your business tools working together.",
      "Every assistant has clear limits, keeps a record of what it does and hands over to a person when it isn't sure, so it helps your customers instead of embarrassing you.",
    ],
    whoFor: [
      "Small businesses answering the same customer questions all day",
      "Sales teams that need every new enquiry contacted quickly",
      "Operations teams copying details between emails, PDFs, spreadsheets and a customer system",
      "Founders adding AI features to an existing product",
    ],
    deliverables: [
      {
        title: "Chat and phone assistants",
        body: "Assistants on your website, by text and on the phone that answer questions from your own information, book appointments and pass promising enquiries to your team.",
      },
      {
        title: "Paperwork and data entry",
        body: "Tools that read invoices, forms and emails, pull out the details you need and enter them into your records, with a person checking anything the tool is unsure about.",
      },
      {
        title: "Workflow automation",
        body: "Automations that connect the tools you already pay for, so a new enquiry, order or form submission triggers the right next steps without anyone lifting a finger.",
      },
      {
        title: "AI features inside your product",
        body: "Summaries, drafting, sorting and search added to your website or app, with usage limits so AI costs stay predictable.",
      },
    ],
    process: [
      { title: "Map the work", body: "We list the repetitive tasks, how often they happen and what a good result looks like." },
      { title: "Try it on real examples", body: "A small working version using your own examples, so you can judge the quality before committing." },
      { title: "Build in safeguards", body: "Activity records, fallbacks, cost limits and a hand-off to a person for anything the AI shouldn't decide alone." },
      { title: "Launch and fine-tune", body: "We watch real conversations for the first few weeks and adjust where needed." },
    ],
    projectSlugs: ["dialogix", "molar-ai", "periscope-email"],
    blogSlugs: [],
    faq: [
      {
        question: "What's the difference between an AI assistant and a basic chatbot?",
        answer:
          "A basic chatbot follows a fixed script. An AI assistant understands questions asked in everyday language, looks up answers in your own information, and can take actions such as booking an appointment or updating a customer record. We still give every assistant clear limits and a hand-off to a person.",
      },
      {
        question: "Which AI tools do you use?",
        answer:
          "Mostly OpenAI and Anthropic Claude, chosen for each task based on quality, speed and cost. For automations we use n8n, Make or Zapier, depending on what your team already uses.",
      },
      {
        question: "Is my business information safe with an AI assistant?",
        answer:
          "We only share the information a task needs, choose settings that don't use your data to train AI models, and keep activity records in your own accounts. Sensitive actions need a person's approval.",
      },
      {
        question: "How long does an AI automation project take?",
        answer:
          "A single focused automation often takes one to three weeks. A customer-facing assistant connected to several of your tools usually takes four to eight weeks, including testing on real conversations.",
      },
    ],
  },

  "web-development": {
    metaTitle: "Website & Web App Development",
    metaDescription:
      "Fast business websites, customer portals, dashboards and web apps, built to be found on Google and in AI search. Get a free quote.",
    h1: "Website & Web App Development",
    intro: [
      "Amex Technology designs and builds business websites and the online tools behind them: company websites, customer portals, dashboards, quoting tools and internal systems.",
      "One team handles both the website and the app, so your pages load fast, Google and AI assistants can read them, and your customers move from the website into your service without friction.",
    ],
    whoFor: [
      "Businesses whose current website is slow, dated or hard to update",
      "Companies that need a customer portal, booking system or dashboard",
      "Teams replacing spreadsheets with a proper internal tool",
      "Founders who need a product built, not just a landing page",
    ],
    deliverables: [
      {
        title: "Business websites",
        body: "Fast, well-organized pages that search engines can read, plus an admin area so you can edit content yourself.",
      },
      {
        title: "Customer portals and dashboards",
        body: "Secure logins, different access levels for staff and customers, and the screens people use every day.",
      },
      {
        title: "Connections to your other tools",
        body: "Payments, bank data, customer management and email tools connected properly, with errors recorded and retried automatically.",
      },
      {
        title: "Takeovers and rebuilds",
        body: "We take over existing websites and apps, fix what's broken and finish what's half-built, and only start from scratch when it's genuinely cheaper.",
      },
    ],
    process: [
      { title: "Plan", body: "We agree the pages, who can see what and which tools to connect, in writing, with what's in and out of the first version." },
      { title: "Design", body: "Page layouts and a visual design that you approve before building starts." },
      { title: "Build in stages", body: "At each stage you click through the working features on a private preview link." },
      { title: "Launch and support", body: "Domain, visitor tracking and Google setup at launch, followed by a support period." },
    ],
    projectSlugs: ["goswiftfund", "wolfe-property", "ultra-windows", "firmsledger", "island-traffic-defense"],
    blogSlugs: ["web-app-development-cost", "connect-nextjs-react-with-supabase", "connect-vercel-app-godaddy-domain"],
    faq: [
      {
        question: "How much does a website or web app cost?",
        answer:
          "It depends on the number of pages, features and tools to connect. We send a fixed, itemized quote after a free discovery call, before any work starts. Our guide to web app development cost explains what drives the price.",
      },
      {
        question: "How long does it take?",
        answer:
          "A business website usually takes two to four weeks. Most web apps take six to twelve weeks from start to launch, depending on how many features and connections are needed.",
      },
      {
        question: "Will my website be found on Google and in AI search?",
        answer:
          "Yes. We build pages so they load quickly and are easy for Google and AI assistants to read, which gives your business the best chance of being found.",
      },
      {
        question: "Will I own the website and accounts?",
        answer:
          "Yes. Your website files, hosting, database and domain are all in accounts you control, so you're never locked in to us.",
      },
    ],
  },

  "saas-development": {
    metaTitle: "Software Product & MVP Development",
    metaDescription:
      "Launch a software or AI product with customer sign-up, online payments and private customer accounts, or get an app built in Lovable, Bolt or Replit ready for real customers.",
    h1: "Software Products & MVP Development",
    intro: [
      "Amex Technology takes software and AI product ideas from concept to a launch-ready first version (MVP): sign-up and login, subscription payments, separate private accounts for each customer, AI features with cost controls, and usage reporting.",
      "Already built a first version in Lovable, Bolt or Replit? We review it, fix the security and data problems AI builders often leave behind, and get it ready for real customers and real traffic.",
    ],
    whoFor: [
      "Founders who need a working first version to show customers or investors",
      "Non-technical founders with an AI-built prototype that's reaching its limits",
      "Businesses turning an internal tool into a product they can sell",
      "Products adding AI features without runaway costs",
    ],
    deliverables: [
      {
        title: "Launch-ready first version",
        body: "The one core feature your customers will pay for, with sign-up, onboarding, email and online payments.",
      },
      {
        title: "Private customer accounts",
        body: "Each customer's information is kept separate and protected at the database level, not just on the screen.",
      },
      {
        title: "AI features with limits",
        body: "AI writing, summaries or assistants inside your product, with usage limits for each plan and cost tracking.",
      },
      {
        title: "Getting AI-built apps ready for customers",
        body: "Moving the app to your own account, a security review, fixes to who can see what, error monitoring and proper hosting for apps started in AI builders.",
      },
    ],
    process: [
      { title: "Define the core feature", body: "We cut the idea down to what the first version must do to be worth paying for." },
      { title: "Plan the foundations", body: "How customer information is organized, how accounts work and how billing works, decided up front because they're expensive to change later." },
      { title: "Build with weekly demos", body: "Short cycles with a preview link, so you can test with early users as we go." },
      { title: "Launch and improve", body: "Live hosting, monitoring and reporting, then improvements based on real use." },
    ],
    projectSlugs: ["hoursheets", "hmd", "periscope-email", "goswiftfund"],
    blogSlugs: ["web-app-development-cost", "bolt-new-review", "how-to-export-code-from-lovable", "fix-new-row-violates-row-level-security-policy-supabase"],
    faq: [
      {
        question: "How much does a software MVP cost?",
        answer:
          "The cost depends on how many types of users, connected tools and AI features you need. After a discovery call we send a fixed, itemized quote for the first version.",
      },
      {
        question: "Can you finish an app I started in Lovable, Bolt or Replit?",
        answer:
          "Yes. We move the app into your own account, review how customer information is stored and protected, and fix or finish it. In most cases that's cheaper than starting over, and we'll tell you honestly when it isn't. Our free App Checker gives a quick first look.",
      },
      {
        question: "What do you build software with?",
        answer:
          "We choose proven, widely used tools for each project, and we adapt to what you already have if you've started building. We'll explain the choices in plain language before we begin.",
      },
      {
        question: "How do you keep AI costs under control?",
        answer:
          "We set usage limits for each plan, reuse repeated requests, choose the most affordable AI option that does the job well, and track AI spending per customer so your pricing covers it.",
      },
    ],
  },

  "seo-services": {
    metaTitle: "SEO Services: Google & AI Search",
    metaDescription:
      "SEO services for businesses worldwide: website fixes, local search, Google Business Profile and AI search visibility so customers find you on Google, ChatGPT and Perplexity.",
    h1: "SEO Services: Get Found on Google and in AI Search",
    intro: [
      "Customers now search on Google and by asking AI assistants like ChatGPT, Perplexity and Gemini. Amex Technology fixes the problems that hold your website back, builds pages around what your customers actually search for, optimizes your Google Business Profile for local search, and helps AI tools understand and recommend your business.",
      "Because we also build websites, we fix problems directly on your site instead of handing you a report full of recommendations.",
    ],
    whoFor: [
      "Local businesses that don't show up in \"near me\" searches or on the map",
      "Companies with a website that gets little or no search traffic",
      "Businesses that AI assistants don't mention, or describe incorrectly",
      "Sites that lost rankings after a redesign or a move to a new platform",
    ],
    deliverables: [
      {
        title: "Website check and fixes",
        body: "Whether Google can find your pages, whether the site loads quickly, and whether old pages redirect properly, all checked and fixed.",
      },
      {
        title: "Local search",
        body: "Google Business Profile setup and improvement, consistent business listings, and pages for each area you serve.",
      },
      {
        title: "Content based on what people search",
        body: "Service pages, area pages and articles that answer questions your customers ask, based on real search data.",
      },
      {
        title: "Visibility in AI assistants",
        body: "Clear business details, consistent profiles across the web and content that AI tools can quote accurately.",
      },
    ],
    process: [
      { title: "Check", body: "A review of your website, your rankings, your Google data and what AI assistants currently say about you." },
      { title: "Fix the basics", body: "Website problems first, because pages can't rank if search engines can't read the site properly." },
      { title: "Build pages that match searches", body: "Service, area and answer pages for the searches that bring paying customers." },
      { title: "Report monthly", body: "Rankings, visits, enquiries and AI mentions, with priorities for the following month." },
    ],
    projectSlugs: ["firmsledger", "island-traffic-defense"],
    blogSlugs: [],
    faq: [
      {
        question: "How do I get AI assistants like ChatGPT to recommend my business?",
        answer:
          "AI assistants draw on well-known websites and search results. We make sure your business details are clear and consistent across your website and online profiles, and that your pages answer customer questions in plain language that AI tools can quote.",
      },
      {
        question: "How long does SEO take to show results?",
        answer:
          "Website fixes can show results within weeks once Google revisits your pages. New content and local rankings usually take three to six months to build, depending on competition and how established your site already is.",
      },
      {
        question: "Do you help with local search and Google Business Profile?",
        answer:
          "Yes. We set up or clean up your Google Business Profile, make your business details match across directories, and build pages for each area you serve so you appear in local and map results.",
      },
      {
        question: "Is SEO still worth it with AI search?",
        answer:
          "Yes. AI assistants pull from search results and well-known websites, so pages that rank well and are mentioned elsewhere are also the ones AI tools recommend. Good SEO is the foundation of AI visibility.",
      },
    ],
  },

  "aeo-services": {
    metaTitle: "Answers in AI Search & Google AI Overviews",
    metaDescription:
      "We write clear, direct answers to your customers' questions and set up your pages so Google AI Overviews, ChatGPT and voice assistants quote your business.",
    h1: "Get Your Business Quoted in AI Search",
    intro: [
      "When someone asks Google AI Overviews, ChatGPT, Perplexity or a voice assistant a question, the tool quotes a few websites in its answer. Amex Technology finds the questions your customers actually ask, writes clear answers to them, and sets up your pages so those tools can read and quote you.",
      "We use the same approach on amextechnology.com itself: direct answers at the top of our articles, FAQ sections on key pages, and a short summary file written for AI tools.",
    ],
    whoFor: [
      "Businesses whose customers ask the same questions before buying",
      "Experts and service firms who want to be the source AI tools quote",
      "Sites that rank on Google but never appear in AI Overviews",
      "Companies launching a new service that needs clear explanations",
    ],
    deliverables: [
      {
        title: "Customer question research",
        body: "The real questions people ask about your service, from search suggestions, search data and your own sales conversations.",
      },
      {
        title: "Pages that answer directly",
        body: "Each page opens with a clear two- or three-sentence answer, followed by the detail, so it can be quoted as written.",
      },
      {
        title: "Page setup for search tools",
        body: "FAQ sections and behind-the-scenes page details that explain your business to search engines, plus a short summary file written for AI tools.",
      },
      {
        title: "Mention tracking",
        body: "A monthly check of which AI assistants mention your business when asked your key questions.",
      },
    ],
    process: [
      { title: "Collect the questions", body: "We build a list of buyer questions, grouped by service and stage." },
      { title: "Write the answers", body: "Clear, accurate answers reviewed by you, with no padding." },
      { title: "Set up the pages", body: "Page details and links so search tools can find and trust your answers." },
      { title: "Track mentions", body: "We check AI assistants each month and improve the pages that aren't being picked up." },
    ],
    projectSlugs: ["firmsledger"],
    blogSlugs: [],
    faq: [
      {
        question: "What's the difference between SEO and answers in AI search?",
        answer:
          "SEO gets your pages ranked in search results. Answer-focused content shapes individual answers so search features and AI assistants can quote them directly. The two overlap, and we usually do them together.",
      },
      {
        question: "What is the summary file for AI tools?",
        answer:
          "It's a plain-text file on your website, called llms.txt, that describes who you are and links to your key pages, written for AI tools to read. It's a small, low-cost addition alongside clear content.",
      },
      {
        question: "Do FAQ sections still help?",
        answer:
          "Google shows FAQ results for far fewer sites than before, but a clear list of questions and answers still helps search tools understand your page, and direct answers are what AI Overviews and assistants tend to quote.",
      },
      {
        question: "Can you guarantee ChatGPT will recommend us?",
        answer:
          "No one can guarantee that. What we can do is remove the reasons AI tools skip you, such as unclear business details, thin answers and a lack of mentions elsewhere, and then track progress every month.",
      },
    ],
  },

  "crm-automation": {
    metaTitle: "GoHighLevel & CRM Automation Services",
    metaDescription:
      "GoHighLevel and HubSpot setup, repair and automation: forms and calls sent to your sales pipeline, automatic text and email follow-up, and checks for lost enquiries.",
    h1: "GoHighLevel & CRM Automation",
    intro: [
      "Amex Technology sets up and repairs customer management systems (CRMs) so no enquiry slips through. Website forms and calls go straight into your GoHighLevel or HubSpot pipeline, follow-ups send automatically by text and email, and you can see which sources actually turn into customers.",
      "We also handle the harder connection work most CRM consultants don't: linking custom websites, phone systems and payment tools to your CRM.",
    ],
    whoFor: [
      "Businesses losing enquiries between the website form and the CRM",
      "Teams paying for GoHighLevel or HubSpot but still following up by hand",
      "Agencies that need a partner for custom CRM connections",
      "Owners who can't tell which marketing channel brings paying customers",
    ],
    deliverables: [
      {
        title: "Pipelines and follow-up messages",
        body: "Sales stages, labels, and text and email sequences that contact every enquiry quickly and stop when they reply or book.",
      },
      {
        title: "Website and form connections",
        body: "Forms on any website, including custom-built ones, sent to your CRM with the source and campaign recorded.",
      },
      {
        title: "Phone, text and payment connections",
        body: "Phone systems, text messaging and online payments connected to your CRM.",
      },
      {
        title: "CRM checkups",
        body: "We trace every route an enquiry can take and find broken follow-ups, duplicate contacts and enquiries that never arrived.",
      },
    ],
    process: [
      { title: "Trace the enquiry routes", body: "Every form, call and ad that should create an enquiry, and where each one actually ends up." },
      { title: "Fix and rebuild", body: "Broken connections repaired, pipelines and labels cleaned up." },
      { title: "Automate follow-up", body: "Message sequences written and tested end to end with real submissions." },
      { title: "Hand over", body: "A short guide and a walkthrough so your team knows how it works." },
    ],
    projectSlugs: ["portland-self-defense-crm", "dialogix"],
    blogSlugs: [],
    faq: [
      {
        question: "Do you work with GoHighLevel agencies and client accounts?",
        answer:
          "Yes. We work directly with businesses and as a partner for agencies, inside your agency account or a client's account.",
      },
      {
        question: "Can you connect a custom website to GoHighLevel?",
        answer:
          "Yes. We connect custom-built and standard website platforms to GoHighLevel, keep spam protection in place and record where each enquiry came from so your reports stay accurate.",
      },
      {
        question: "How do I know if my CRM is losing enquiries?",
        answer:
          "Compare form submissions and calls on your website with new contacts in the CRM over the same period. If the numbers don't match, enquiries are being lost. A CRM checkup traces each route and finds where.",
      },
      {
        question: "Do you work with HubSpot too?",
        answer:
          "Yes. We set up and automate HubSpot, and connect it to your website, forms and other tools.",
      },
    ],
  },

  "mobile-app-development": {
    metaTitle: "Mobile App Development: iPhone & Android",
    metaDescription:
      "Apps for iPhone and Android built together, including AI features, notifications and App Store and Google Play publishing.",
    h1: "Mobile App Development for iPhone & Android",
    intro: [
      "Amex Technology builds apps that work on both iPhone and Android from a single build. We add AI features like chat, voice and photo recognition where they help, and we handle publishing on the App Store and Google Play.",
      "Building once for both phones means one team, one set of fixes and both stores updated together, which keeps the cost and timeline well below building two separate apps.",
    ],
    whoFor: [
      "Startups launching a mobile product on both stores",
      "Businesses that need an app for customers, members or field staff",
      "Companies with a website or web app that needs a mobile companion",
      "Founders with an existing app that needs fixes or new features",
    ],
    deliverables: [
      {
        title: "Apps for iPhone and Android",
        body: "Apps that look and feel natural on both iPhone and Android phones.",
      },
      {
        title: "Accounts and data",
        body: "Sign-in, user information, file uploads and live updates behind the app.",
      },
      {
        title: "Notifications and alerts",
        body: "Notifications and in-app messages, set up and tested on real phones.",
      },
      {
        title: "Store publishing",
        body: "App Store and Google Play listings, review requirements and release management.",
      },
    ],
    process: [
      { title: "Plan the screens", body: "What people do in the app and the screens for the first version, agreed up front." },
      { title: "Design", body: "A mobile design that feels familiar on iPhone and Android." },
      { title: "Build and test", body: "Test versions on your own phone before anything goes live." },
      { title: "Publish", body: "Store submission, review fixes and launch, then updates as you grow." },
    ],
    projectSlugs: ["emigo", "herruby-app"],
    blogSlugs: ["fix-firebase-auth-invalid-api-key", "fix-firestore-missing-or-insufficient-permissions"],
    faq: [
      {
        question: "Should I build one app for both phones or separate apps?",
        answer:
          "For most business apps, one app that works on both iPhone and Android is the better choice: a lower cost and both stores at once. Separate apps for each phone make sense mainly when an app pushes the limits of phone hardware or graphics.",
      },
      {
        question: "Do you handle App Store and Google Play publishing?",
        answer:
          "Yes. We prepare the app, store listings and privacy details, submit to both stores and handle any review feedback.",
      },
      {
        question: "Can the app share accounts with my website?",
        answer:
          "Yes. The app and website can share the same accounts and information, so customers sign in once and see the same details everywhere.",
      },
      {
        question: "How long does a mobile app take to build?",
        answer:
          "A focused first version usually takes eight to fourteen weeks including store review, depending on the number of screens, connected tools and AI features.",
      },
    ],
  },

  "ui-ux-design": {
    metaTitle: "Website, App & Product Design",
    metaDescription:
      "Website and app design: customer journeys, page layouts, consistent styling and clickable mockups that developers can build exactly. Design and building in one team.",
    h1: "Website & App Design",
    intro: [
      "Amex Technology designs websites, web apps and mobile apps with clear customer journeys, modern layouts and a consistent look. We hand over designs that developers can build exactly, or we build them ourselves.",
      "Because the same team designs and builds, designs are realistic to build, and nothing gets lost between the designer and the developer.",
    ],
    whoFor: [
      "Startups that need a product design before building starts",
      "Businesses whose website looks dated or doesn't bring in enquiries",
      "Software products with confusing sign-up or dashboards",
      "Brands launching a campaign, event or new product",
    ],
    deliverables: [
      {
        title: "Customer journeys and page sketches",
        body: "The steps people take and the layout of each screen, agreed before the visual design begins.",
      },
      {
        title: "Visual design",
        body: "Modern, on-brand layouts for computers and phones, designed to be clear and to bring in enquiries.",
      },
      {
        title: "A consistent look",
        body: "Reusable buttons, colors and text styles, so new pages stay consistent and are quicker to build.",
      },
      {
        title: "Clickable mockups",
        body: "Mockups you can click through to test with customers or show investors before anything is built.",
      },
    ],
    process: [
      { title: "Understand", body: "Your customers, your goals and what your competitors do well and badly." },
      { title: "Sketch", body: "Structure and flow first, without color or detail getting in the way." },
      { title: "Design", body: "Visual design and a set of reusable styles, reviewed with you." },
      { title: "Hand off or build", body: "Files ready for developers, or we build it ourselves." },
    ],
    projectSlugs: ["east-end-vintage-sale", "zenscroll", "wide-eyed-giant", "buttercream-bus"],
    blogSlugs: [],
    faq: [
      {
        question: "Do you only design, or also build?",
        answer:
          "Both. We can hand over design files to your developers, or design and build the product ourselves so the finished result matches the design exactly.",
      },
      {
        question: "What tools do you use?",
        answer:
          "We design in Figma, a widely used design tool, and build with the same styles so the finished site matches the design.",
      },
      {
        question: "Can you redesign my existing website or app?",
        answer:
          "Yes. We review what works and what doesn't, keep the parts your customers rely on, and redesign the rest, then build it or hand it over.",
      },
      {
        question: "How long does a design project take?",
        answer:
          "A website design usually takes one to three weeks. A full web or mobile app design typically takes three to six weeks, depending on the number of screens.",
      },
    ],
  },

  "devops-deployment": {
    metaTitle: "Website Hosting, Maintenance & Care Plans",
    metaDescription:
      "Reliable hosting, safe updates, monitoring, backups and monthly care plans so your website or app stays fast, secure and online.",
    h1: "Hosting, Maintenance & Care Plans",
    intro: [
      "Amex Technology sets up reliable hosting for your website or app and then looks after it. Monitoring and backups keep it online, and a monthly care plan covers updates, fixes and small improvements.",
      "We also sort out the parts that quietly cause problems: domain names, security certificates and business email that ends up in spam.",
    ],
    whoFor: [
      "Businesses whose site or app goes down and nobody notices until a customer complains",
      "Teams afraid to update their live site in case something breaks",
      "Founders whose developer has moved on and left no one in charge",
      "Companies with email landing in spam because of domain settings",
    ],
    deliverables: [
      {
        title: "Hosting and safe updates",
        body: "Hosting set up on the right service, with updates tested on a private copy before they go live.",
      },
      {
        title: "Monitoring and backups",
        body: "Alerts if your site goes down or shows errors, plus backups that we've actually tested restoring.",
      },
      {
        title: "Domain and email setup",
        body: "Domain name and security certificate setup, and the settings that stop your business email going to spam.",
      },
      {
        title: "Monthly care plans",
        body: "Software and security updates, fixes and small improvements each month, with a short report.",
      },
    ],
    process: [
      { title: "Review", body: "Where everything is hosted, who has access and what would happen if it broke." },
      { title: "Set up", body: "Updates, monitoring, backups and access cleaned up and written down." },
      { title: "Hand over access", body: "Everything stays in accounts you own, with a written guide." },
      { title: "Look after it", body: "Monthly updates and fixes, and a fast response when something goes wrong." },
    ],
    projectSlugs: ["firmsledger", "goswiftfund", "tiancheng-development-group"],
    blogSlugs: ["how-to-setup-cloudflare-dns", "fix-vercel-404-not-found-after-deploy", "how-to-setup-resend-email", "fix-vercel-build-fails-supabase-env-variables"],
    faq: [
      {
        question: "What's included in a care plan?",
        answer:
          "Security and software updates, monitoring for downtime and errors, backups, small fixes and content changes, and a short monthly report. Plans range from a few hours a month to ongoing development.",
      },
      {
        question: "Which hosting do you recommend?",
        answer:
          "It depends on your traffic, budget and team. For most business websites we use Vercel with Cloudflare for domain management. For larger apps we use AWS. We'll explain the options before we choose.",
      },
      {
        question: "Can you take over a site another developer built?",
        answer:
          "Yes. We review the website and hosting, move access into accounts you own, write down how it works and then maintain it.",
      },
      {
        question: "Why do my emails go to spam?",
        answer:
          "Usually because your domain's email settings (called SPF, DKIM and DMARC) are missing or wrong. We check and fix them and test delivery with your email provider.",
      },
    ],
  },
};
