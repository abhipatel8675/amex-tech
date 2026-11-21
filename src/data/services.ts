export type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  /** What changes for the customer, in plain words. */
  benefits: string[];
  accentColor: string;
  iconName: string;
  // Anchors of services that were merged into this one, so old /services#... links still land here.
  aliases?: string[];
};

// Single source for every services list on the site: services page, homepage,
// footer, contact form options, structured data and llms.txt.
// Written for business owners, not developers: what we do, and what it does for you.
export const services: Service[] = [
  {
    slug: "ai-services",
    title: "AI Assistants & Automation",
    shortDesc: "Smart assistants and automations that take repetitive work off your team.",
    description:
      "We build AI assistants that answer customer questions, qualify new enquiries and handle paperwork, and automations that move information between the tools you already use. Every assistant has clear limits and hands over to a real person whenever it is unsure.",
    benefits: [
      "Chat and voice assistants that answer customers around the clock",
      "Paperwork and data entry done for you, with a person checking the tricky parts",
      "Your everyday tools talking to each other automatically",
      "Clear limits and a hand-over to your team built in",
    ],
    accentColor: "#FFC247",
    iconName: "Bot",
  },
  {
    slug: "web-development",
    title: "Websites & Web Apps",
    shortDesc: "Fast, good-looking websites and online tools your customers actually use.",
    description:
      "One team for your public website and the online tools behind it: customer accounts, dashboards, booking and ordering. We build sites that load quickly, work well on phones, can be found on Google, and are easy for your team to update.",
    benefits: [
      "A website that loads fast and looks right on every screen",
      "Customer accounts, dashboards and online ordering or booking",
      "Connections to your payments, email and customer records",
      "A simple way to edit your own content, without calling a developer",
    ],
    accentColor: "#FF8C3A",
    iconName: "Globe",
    aliases: ["web-app-development", "api-development", "backend-development"],
  },
  {
    slug: "saas-development",
    title: "New Product & First Version",
    shortDesc: "From idea to a first version real customers can sign up for and pay for.",
    description:
      "Have a product idea? We take it from sketch to a working first version: sign-up, payments, the core features and the basics for growth. Already built a prototype with an AI app builder? We make it solid enough for real customers and real traffic.",
    benefits: [
      "A launch-ready first version with sign-up and payments",
      "AI features with sensible limits so costs stay predictable",
      "Customer data kept private and separate",
      "Prototype-to-product clean-up for apps built with AI builders",
    ],
    accentColor: "#FF7A4D",
    iconName: "Rocket",
  },
  {
    slug: "seo-services",
    title: "Get Found on Google & AI Search",
    shortDesc: "Show up when customers search on Google, and get recommended by AI assistants.",
    description:
      "People now search on Google and by asking AI assistants. We fix what holds your site back, create pages around what customers really search for, set up your Google business listing, and help AI tools understand and recommend your business.",
    benefits: [
      "A clear check-up of what is holding your site back",
      "Your Google business listing set up and kept accurate",
      "Pages written around real customer questions",
      "Monthly reports on how often people find you",
    ],
    accentColor: "#FFC247",
    iconName: "Search",
  },
  {
    slug: "aeo-services",
    title: "Be the Answer in AI Search",
    shortDesc: "Get quoted by Google's AI answers, ChatGPT and voice assistants.",
    description:
      "More customers now get a direct answer instead of a list of links. We find the questions your customers ask, write clear answers on your site, and set things up so answer engines can quote your business, then check where your name appears.",
    benefits: [
      "The real questions your customers are asking, researched",
      "Clear, answer-first pages and FAQs",
      "Behind-the-scenes setup so AI tools can read your site",
      "Checks on where AI assistants mention your brand",
    ],
    accentColor: "#FF8C3A",
    iconName: "MessageSquareQuote",
  },
  {
    slug: "crm-automation",
    title: "Customer Follow-Up Automation",
    shortDesc: "Every enquiry lands in one place and gets a timely, automatic follow-up.",
    description:
      "We set up and repair your customer-tracking system so no lead slips through: website forms and calls flow into one list, follow-ups go out by text and email on time, and you can see what is turning into sales. We also connect it to your website, phones and ads.",
    benefits: [
      "One clear pipeline from first enquiry to paying customer",
      "Automatic text and email follow-ups",
      "Website forms, calls and ads all feeding the same place",
      "A check-up that finds broken steps and lost leads",
    ],
    accentColor: "#FF7A4D",
    iconName: "Workflow",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile Apps",
    shortDesc: "iPhone and Android apps, built once and published on both stores.",
    description:
      "We design and build apps that work on both iPhone and Android from a single project, including smart features like chat, voice and photo recognition. We also handle publishing to the App Store and Google Play, so you can launch on both.",
    benefits: [
      "One app that works on iPhone and Android",
      "Smart features such as chat, voice and camera",
      "App Store and Google Play publishing handled for you",
      "Notifications and simple usage reports",
    ],
    accentColor: "#FFC247",
    iconName: "Smartphone",
  },
  {
    slug: "ui-ux-design",
    title: "Website & App Design",
    shortDesc: "Clear, modern designs that turn visitors into customers.",
    description:
      "Good products start with good design. We work out what your visitors need, sketch the experience, build clickable previews you can try before anything is built, and hand over designs that developers can follow exactly.",
    benefits: [
      "Research into what your visitors want to do",
      "Layouts and previews you can click through early",
      "A consistent look across your whole product",
      "Designs ready to hand straight to builders",
    ],
    accentColor: "#FF8C3A",
    iconName: "Palette",
  },
  {
    slug: "devops-deployment",
    title: "Hosting, Upkeep & Care Plans",
    shortDesc: "Reliable hosting and monthly care so your site or app stays up and up to date.",
    description:
      "We set up reliable hosting and then look after it. Backups, monitoring and security updates keep your site or app online, and a monthly care plan covers fixes and small improvements so you are never left stuck.",
    benefits: [
      "Updates that go live smoothly, without downtime",
      "Alerts when something slows down or breaks",
      "Regular backups, updates and fixes",
      "Your web address, security certificate and email set up properly",
    ],
    accentColor: "#FF7A4D",
    iconName: "Cloud",
    aliases: ["maintenance-support"],
  },
];
