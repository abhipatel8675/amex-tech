export type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  technologies: string[];
  benefits: string[];
  accentColor: string;
  iconName: string;
  // Card image used in the services grid (public path)
  image?: string;
  // Anchors of services that were merged into this one, so old /services#... links still land here.
  aliases?: string[];
};

// Single source for every services list on the site: services page, homepage
// preview, footer, contact form options, structured data and llms.txt.
export const services: Service[] = [
  {
    slug: "ai-services",
    title: "AI Agents",
    shortDesc: "Custom AI agents that answer customers, qualify leads and handle routine work around the clock, connected to the tools you already use.",
    description:
      "We set up AI assistants and automated processes that answer customer questions, follow up with new enquiries, handle paperwork and keep your business tools working together. A person can always step in when it matters.",
    technologies: ["Customer chat assistants", "Voice assistants", "Document handling", "Workflow automation", "Lead follow-up", "AI tools"],
    benefits: [
      "Chat and phone assistants for customer support and new enquiries",
      "Automatic handling of forms, invoices and emails",
      "Your everyday business tools connected so they work together",
      "Clear limits, activity records and a hand-off to your team when needed",
    ],
    accentColor: "#B8860B",
    iconName: "Bot",
    image: "/images/services/ai-services.webp",
  },
  {
    slug: "web-development",
    title: "Websites & Web Apps",
    shortDesc: "Business websites and web apps built on WordPress, Wix, Shopify, Next.js or React: fast, secure and easy for you to manage.",
    description:
      "One team for your website and the online tools behind it. We build business websites, customer portals, dashboards and internal tools that load quickly, stay secure and are simple for your team to update.",
    technologies: ["Business websites", "Customer portals", "Dashboards", "Online booking", "Payments", "Easy content editing"],
    benefits: [
      "Pages that load fast and can be found on Google and in AI search",
      "Customer logins, dashboards and staff access levels",
      "Connections to your payment, customer management and email tools",
      "An admin area so you can edit your own content",
    ],
    accentColor: "#B8860B",
    iconName: "Globe",
    image: "/images/services/web-development.webp",
    aliases: ["web-app-development", "api-development", "backend-development"],
  },
  {
    slug: "saas-development",
    title: "Software Products & MVPs",
    shortDesc: "From idea to a first version your customers can pay for, in weeks rather than months.",
    description:
      "We take a software or AI product idea from concept to launch: customer sign-up, subscription payments, separate accounts for each customer, AI features and reporting. Already built a first version with an AI app builder such as Lovable, Bolt or Replit? We make it ready for real customers.",
    technologies: ["First-version builds", "Customer accounts", "Subscription payments", "AI features", "Usage reporting", "Launch support"],
    benefits: [
      "A launch-ready first version with sign-up and online payments",
      "AI features with usage limits so costs stay predictable",
      "Each customer's information kept private and separate",
      "Apps started in AI builders made ready for real customers",
    ],
    accentColor: "#B8860B",
    iconName: "Rocket",
    image: "/images/services/saas-development.webp",
  },
  {
    slug: "seo-services",
    title: "SEO, AEO & GEO",
    shortDesc: "Rank on Google, win featured answers and voice search, and get recommended by ChatGPT, Perplexity and Gemini.",
    description:
      "People now search on Google and by asking AI assistants. We fix the problems that hold your website back, build pages around what your customers search for, set up your Google Business Profile for local searches, and make sure AI tools understand and recommend your business.",
    technologies: ["Search engine optimization", "Local search", "Google Business Profile", "Website fixes", "AI search visibility", "Monthly reports"],
    benefits: [
      "A check of your website and fixes for what is holding it back",
      "Local search and Google Business Profile setup",
      "Content that helps AI assistants describe your business correctly",
      "Monthly reports on rankings and visits",
    ],
    accentColor: "#B8860B",
    iconName: "Search",
    image: "/images/services/seo-services.webp",
  },
  {
    slug: "aeo-services",
    title: "Answers in AI Search",
    shortDesc: "Be the answer people see in Google AI Overviews, ChatGPT and voice search.",
    description:
      "We help your website give clear answers that search tools and AI assistants can quote. We find the questions your customers really ask, write direct answers to them, set up your pages so search tools can read them, and check where AI assistants mention your business.",
    technologies: ["Customer questions", "Clear answers", "FAQ pages", "Google AI Overviews", "ChatGPT", "Mention tracking"],
    benefits: [
      "Research into the questions your customers actually ask",
      "Pages that answer those questions clearly",
      "Page setup that helps search tools and AI assistants read your site",
      "Tracking of where AI assistants mention your business",
    ],
    accentColor: "#B8860B",
    iconName: "MessageSquareQuote",
  },
  {
    slug: "crm-automation",
    title: "Automation",
    shortDesc: "Automatic follow-ups, lead routing, reminders and reports across GoHighLevel, HubSpot, email and your other tools, so routine work runs itself.",
    description:
      "We set up and repair customer management systems (CRMs) so no enquiry is lost. Website forms and calls go straight into your system, text and email follow-ups send automatically, and you can see which sources bring in customers. We also connect it to your website, phone system and ad accounts.",
    technologies: ["GoHighLevel", "HubSpot", "Text & email follow-up", "Phone system setup", "Online payments", "Lead tracking"],
    benefits: [
      "Sales pipelines and automatic follow-up messages",
      "Website forms and calls recorded in your system",
      "Phone, text and email tools connected",
      "Checks that find broken follow-ups and lost enquiries",
    ],
    accentColor: "#B8860B",
    iconName: "Workflow",
    image: "/images/services/crm-automation.webp",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDesc: "Smooth, store-ready iPhone and Android apps built from one codebase with React Native, with AI features when you need them.",
    description:
      "We build apps that work on both iPhone and Android, including AI features such as chat, voice and photo recognition. We also handle publishing on the App Store and Google Play so you can launch on both.",
    technologies: ["iPhone apps", "Android apps", "App Store publishing", "Google Play publishing", "AI features", "Notifications"],
    benefits: [
      "One app that works on both iPhone and Android",
      "AI chat, voice and camera features",
      "App Store and Google Play publishing included",
      "Notifications and usage reports",
    ],
    accentColor: "#B8860B",
    iconName: "Smartphone",
    image: "/images/services/mobile-app-development.webp",
  },
  {
    slug: "ui-ux-design",
    title: "Website & App Design",
    shortDesc: "Clear, modern designs that turn visitors into customers.",
    description:
      "Good software starts with good design. We create layouts that are easy to use, look consistent and guide people to take action, then either hand the designs to your developers or build them ourselves.",
    technologies: ["Page layouts", "Brand styling", "Clickable mockups", "Mobile design", "Design handoff", "Redesigns"],
    benefits: [
      "Research into your customers and how they use your site",
      "A consistent look across every page and screen",
      "Clickable mockups you can test before anything is built",
      "Files ready for developers, or we build it for you",
    ],
    accentColor: "#B8860B",
    iconName: "Palette",
  },
  {
    slug: "devops-deployment",
    title: "Hosting, Maintenance & Care Plans",
    shortDesc: "Reliable hosting and monthly care so your website or app keeps running.",
    description:
      "We set up reliable hosting for your website or app and then look after it. Monitoring and backups keep it online, and a monthly care plan covers updates, fixes and small improvements.",
    technologies: ["Website hosting", "Domain setup", "Security updates", "Backups", "Uptime monitoring", "Monthly care plans"],
    benefits: [
      "Smooth, safe updates to your live site",
      "Monitoring that alerts us if your site goes down",
      "Monthly updates, backups and fixes",
      "Domain, security certificate and business email setup",
    ],
    accentColor: "#B8860B",
    iconName: "Cloud",
    aliases: ["maintenance-support"],
  },
];
