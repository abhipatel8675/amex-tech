import type { Project } from "./projects";

/**
 * Plain-language layer for the portfolio. Project records keep their original, detailed text;
 * this file gives every project a one-line summary a business owner can understand, and a simple
 * "kind" used for filtering. Technology names appear only on the project detail page.
 */
export const PROJECT_KINDS = ["Websites", "Apps & platforms", "Mobile apps", "Online stores", "AI & automation", "Fixes & support"] as const;
export type ProjectKind = (typeof PROJECT_KINDS)[number];

/** Shorter duplicate entries of the same client work. Hidden from lists; their old addresses redirect to the main project. */
export const duplicateProjectSlugs: Record<string, string> = {
  thebuttercreambus: "buttercream-bus",
  ultrawindows: "ultra-windows",
  herruby: "herruby-app",
  "moler-ai": "molar-ai",
  cdieng: "tiancheng-development-group",
  eastendvintagesale: "east-end-vintage-sale",
  "island-traffic": "island-traffic-defense",
  wideeyedgiantcom: "wide-eyed-giant",
  "expert-village": "expert-village-media",
};

type Plain = { kind: ProjectKind; summary: string };

const plain: Record<string, Plain> = {
  "portland-web-designing-studio": { kind: "Websites", summary: "A website for a small-business agency, built to turn visitors into booked consultations." },
  firmsledger: { kind: "Websites", summary: "A directory where US manufacturers can be found by category and state, built to be easy to find on Google." },
  goswiftfund: { kind: "Apps & platforms", summary: "A business-funding marketplace where owners apply once and get matched with a lending partner." },
  sawa: { kind: "Websites", summary: "A bilingual English and Arabic website for a Saudi shared-commuting startup." },
  "portland-self-defense-crm": { kind: "AI & automation", summary: "We found and fixed a hidden lead leak, so every website enquiry now reaches the customer system, tagged by source." },
  "island-traffic-defense": { kind: "Websites", summary: "A website for a Long Island traffic-defence attorney that turns visitors into consultation requests." },
  "tiancheng-development-group": { kind: "Websites", summary: "A corporate website for a real estate development group, covering projects from first drawing to finished building." },
  "wide-eyed-giant": { kind: "Fixes & support", summary: "We fixed layout problems on a recipe membership website so every page looks right on every screen." },
  dialogix: { kind: "AI & automation", summary: "An AI sales platform that contacts prospects by call, email and message in six languages, around the clock." },
  emigo: { kind: "Mobile apps", summary: "An events app that helps people find and RSVP to genuinely accessible experiences." },
  "wolfe-property": { kind: "Apps & platforms", summary: "A private client portal and property-investment calculator for a New Zealand property-coaching firm." },
  "ultra-windows": { kind: "Apps & platforms", summary: "A quoting and operations system for a UK aluminium windows and doors manufacturer." },
  "east-end-vintage-sale": { kind: "Websites", summary: "A bold retro event website and brand look for a Toronto sidewalk vintage sale." },
  "buttercream-bus": { kind: "Online stores", summary: "A playful website for a mobile bakery with live truck tracking, pre-ordering, event booking and an AI cake designer." },
  hoursheets: { kind: "Apps & platforms", summary: "Time tracking and project management made for small architecture firms." },
  torqron: { kind: "Websites", summary: "A website for a global petrochemical products and solutions provider." },
  "expert-village-media": { kind: "Websites", summary: "A website for a Shopify partner agency that builds online stores for growth-focused brands." },
  zenscroll: { kind: "Websites", summary: "A marketing website for the app that makes you earn your scrolling time, one breath at a time." },
  "herruby-app": { kind: "Mobile apps", summary: "A wellness app that helps Canadian women keep their energy and confidence through midlife." },
  hmd: { kind: "Apps & platforms", summary: "An online learning platform that helps physicians advance through evidence and leadership training." },
  "periscope-email": { kind: "AI & automation", summary: "Turns breaking company news into ready-to-send sales outreach in seconds." },
  "molar-ai": { kind: "AI & automation", summary: "AI-powered social media automation built for dental practices." },
  "divine-reach": { kind: "Fixes & support", summary: "We found why booked appointments from a sales funnel were not reaching customers' calendars, and fixed it." },
  "wavv-ghl-integration": { kind: "AI & automation", summary: "A sync that lets a real estate team work from their calling tool while their customer records update automatically." },
  chatappai: { kind: "AI & automation", summary: "An AI chat app that answers questions in natural conversation." },
  "course-selling-website": { kind: "Apps & platforms", summary: "A kids' coding course platform, taken from a basic template to a working learning product with student accounts." },
  "cypress-bridge": { kind: "Apps & platforms", summary: "A secure analytics platform that turns scattered hospital data into clear emergency-department reports." },
  fulltimewin: { kind: "Fixes & support", summary: "New live features and fixes for a sports scores, predictions and news website." },
  keyglowmax: { kind: "Apps & platforms", summary: "A redesigned, modern interface for a tool that creates crypto tokens without writing code." },
  litejob: { kind: "Apps & platforms", summary: "A local directory that connects cities, businesses and services in one searchable place." },
  "nexus-by-aps": { kind: "Apps & platforms", summary: "A platform that helps companies manage quote requests and supplier bidding in one place." },
  prognosticz: { kind: "Fixes & support", summary: "Faster performance for an investor and startup analytics dashboard covering global funding trends." },
  "the-lookbook": { kind: "Fixes & support", summary: "Search and admin improvements for a curated fashion discovery platform." },
  "webflix-roueen-rafeyan-md": { kind: "Websites", summary: "A website for a psychiatry and wellness practice, focused on helping new patients get started." },
  "wharton-carpet-cleaning": { kind: "Fixes & support", summary: "We fixed button and layout display problems on a carpet-cleaning company's website." },
  "pro-dent-html": { kind: "Websites", summary: "A promotional email for a Canadian dental purchasing group that looks right in every inbox." },
  "cricket-tournament-app": { kind: "Apps & platforms", summary: "An app for running cricket tournaments, with live over-by-over scoring." },
  "ipo-app": { kind: "Mobile apps", summary: "An app that helps Indian retail investors research upcoming IPOs, with AI-assisted analysis." },
  "slice-up": { kind: "Mobile apps", summary: "An expense-tracking app with fast logging, charts, receipt scanning and AI insights." },
  beeminor: { kind: "Apps & platforms", summary: "A play-and-win consumer web app available in nine languages." },
  hypelive: { kind: "Websites", summary: "A single-page website designed to turn visitors into downloads for a creator app." },
  kasbu: { kind: "Apps & platforms", summary: "A free link-in-bio and personal page builder, with examples in several languages." },
  kitaplimani: { kind: "Online stores", summary: "An online store for Islamic books and educational products." },
  "apollo-credit-processing": { kind: "Fixes & support", summary: "We launched a credit-repair portal on a secure server in one day, with its security hardened." },
  bizbuybox: { kind: "AI & automation", summary: "An AI platform that helps independent business buyers find and evaluate deals." },
  buyshopo: { kind: "Apps & platforms", summary: "A back-office dashboard for a fashion online store, covering orders, products and customers." },
  carsuvparts: { kind: "Online stores", summary: "The first phase of an auto-parts online store, with search by vehicle." },
  "custom-ink-and-thread": { kind: "Apps & platforms", summary: "We took over and improved a live custom-apparel ordering platform, fixing the issues the owner reported." },
  "fine-eat-ap": { kind: "AI & automation", summary: "An AI kitchen assistant that turns your preferences into tailored recipes and a shopping list." },
  gojetparts: { kind: "Apps & platforms", summary: "The first version of an aviation-parts marketplace with a searchable catalog." },
  guardremote: { kind: "Online stores", summary: "An online store for smart-security equipment (an ongoing build)." },
  "moja-platform": { kind: "Apps & platforms", summary: "A system that gets medical scans to patients quickly, built for small clinics in Uganda and Kenya." },
  moveempire: { kind: "Fixes & support", summary: "Launch, security and connection fixes for a multi-brand platform used by a moving company." },
  neighborfront: { kind: "Apps & platforms", summary: "A publishing platform and newsroom dashboard for an independent Houston community news brand." },
  "paul-holland-mountain": { kind: "Apps & platforms", summary: "A secure sign-in gate that protects a client-facing interactive presentation for a private-capital consultancy." },
  "robin-cut-scorer": { kind: "Fixes & support", summary: "We fixed tournaments disappearing and live scoring freezing in a cricket scoring app." },
  tryofferiq: { kind: "Apps & platforms", summary: "A platform for real estate wholesalers to run instant offer calculations and live deal analysis." },
  "wellness-platinum-spa": { kind: "Apps & platforms", summary: "An installable booking app for a luxury spa that works with its existing practice-management system." },
  "amex-website": { kind: "Websites", summary: "Our own website and blog platform, built to explain our services and help customers find us." },
  "bukky-osifeso": { kind: "Websites", summary: "A personal and speaker website for a people-strategy consultant and author." },
  "mito-shred": { kind: "Websites", summary: "A sales page and the required compliance pages for a men's fitness supplement offer." },
  "portland-self-defense": { kind: "Fixes & support", summary: "Form security, customer-system connection and ad-tracking fixes for a martial-arts school website." },
  "rooted-and-rising": { kind: "Websites", summary: "A book-launch website that speaks to six different groups of readers." },
  "tame-the-jungle": { kind: "Websites", summary: "A rebuild of an existing design as a native Wix website (in progress)." },
  "we-are-tag-group": { kind: "Fixes & support", summary: "We diagnosed and fixed why a company's website showed up in Google as a bare web address." },
  whartoncarpetcleaning: { kind: "Websites", summary: "A website for a Phoenix carpet-cleaning business, with a quote form right at the top of the page." },
};

const KIND_BY_CATEGORY: Record<string, ProjectKind> = {
  Web: "Websites",
  "Mobile App": "Mobile apps",
  SaaS: "Apps & platforms",
  AI: "AI & automation",
  Automation: "AI & automation",
};

export function projectKind(p: Pick<Project, "slug" | "category">): ProjectKind {
  return plain[p.slug]?.kind ?? KIND_BY_CATEGORY[p.category] ?? "Websites";
}

export function projectSummary(p: Pick<Project, "slug" | "shortDesc">): string {
  return plain[p.slug]?.summary ?? p.shortDesc;
}

/** Which service page best matches each kind of project, for "need something similar?" links. */
export const kindService: Record<ProjectKind, string> = {
  Websites: "web-development",
  "Apps & platforms": "saas-development",
  "Mobile apps": "mobile-app-development",
  "Online stores": "web-development",
  "AI & automation": "ai-services",
  "Fixes & support": "devops-deployment",
};

// Tags that name a tool rather than describe the work; kept out of search keywords on general pages.
const TOOL_TAG = /^(next\.?js|react( native)?|vite|typescript|javascript|node\.?js|php|html|css|wordpress|elementor|shopify|supabase|firebase|lovable|gohighlevel|openai|python|tailwind|prisma|mongodb|expo|wix|api|machine learning)$/i;
export function plainTags(p: Pick<Project, "tags" | "technologies">): string[] {
  const tech = new Set(p.technologies.map((t) => t.toLowerCase()));
  return p.tags.filter((t) => !TOOL_TAG.test(t) && !tech.has(t.toLowerCase()));
}
