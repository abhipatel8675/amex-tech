// Niche service landing pages for businesses anywhere in the world.
// Each entry targets a specific, lower-competition search (checked against the
// live search results, not just a tool's difficulty score) and renders through
// src/components/local/LocalLandingPage.tsx. Keep claims factual: no invented
// clients, rankings or results.

export type LocalPage = {
  slug: string;
  /** Page <title> without the brand suffix. */
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  breadcrumb: string;
  /** Contact form "service" preset. */
  service: string;
  ctaLabel: string;
  priceNote?: string;
  includedTitle: string;
  included: { title: string; body: string }[];
  problemsTitle: string;
  problems: string[];
  stepsTitle: string;
  steps: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
  /** Links to other pages on the site, for internal linking. */
  related: { label: string; href: string }[];
  /** Portfolio project slugs shown as previous work. */
  work?: string[];
};

const REACH_NOTE =
  "We work remotely with clients across the US, UK, Australia, Canada and beyond, and arrange calls in your time zone.";

export const localPages: LocalPage[] = [
  {
    slug: "law-firm-web-design",
    title: "Law Firm Web Design",
    description:
      "Fast, credible websites for law firms and solo attorneys worldwide: practice-area pages, intake forms, Google Business Profile and local SEO. Fixed quote before work starts.",
    eyebrow: "For law firms & solo attorneys",
    h1: "Law firm websites that turn searches into consultations.",
    intro:
      "We build fast, professional websites for law firms and solo practitioners anywhere: clear practice-area pages, a secure intake form, and local SEO so you show up when people search for a lawyer in your area. You get a written, fixed quote before any work starts.",
    breadcrumb: "Law Firm Web Design",
    service: "Law firm website",
    ctaLabel: "Get a free quote",
    includedTitle: "What a law firm site needs",
    included: [
      {
        title: "Practice-area pages",
        body: "One page per practice area (personal injury, family, immigration, criminal defense, estate planning…), written around how clients actually search.",
      },
      {
        title: "Intake and consultation booking",
        body: "A short intake form and a booking link, with every request sent to your email and phone so no lead waits overnight.",
      },
      {
        title: "Attorney profiles that build trust",
        body: "Bar admission, education, languages spoken and case focus, presented clearly so a prospective client knows who they'll work with.",
      },
      {
        title: "Local SEO and Google Business Profile",
        body: "Page titles, behind-the-scenes page details, consistent business details and a properly set-up Google Business Profile so you can appear in the map results.",
      },
      {
        title: "Fast and mobile-first",
        body: "Most people looking for a lawyer search on their phone, often under stress. Pages load fast and the call button is always one tap away.",
      },
      {
        title: "You own everything",
        body: "Domain, hosting and Google accounts stay in the firm's name. No lock-in, no proprietary platform you can't leave.",
      },
    ],
    problemsTitle: "Signs your current site is costing you clients",
    problems: [
      "It's slow or hard to use on a phone",
      "There's one generic 'Practice Areas' page instead of a page per service",
      "Contact requests go to an inbox nobody checks quickly",
      "The firm doesn't appear in Google's map results for its own neighbourhood",
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "Short call", body: "We go through your practice areas, the clients you want and your current site." },
      { title: "Fixed quote", body: "You get a written, itemised quote and timeline. Nothing starts until you approve it." },
      { title: "Build and review", body: "You review every page before launch. Your firm approves all content." },
      { title: "Launch and Google setup", body: "We connect your domain, submit the site to Google and set up your Business Profile." },
    ],
    faq: [
      {
        question: "Do you write the content for practice-area pages?",
        answer:
          "We draft clear, plain-English pages based on a short questionnaire and your input. Your firm reviews and approves every page before it goes live, because you are responsible for what your website says.",
      },
      {
        question: "Do you follow attorney advertising rules?",
        answer:
          "We avoid the common problems, such as guarantees of results, unverifiable 'best lawyer' claims and testimonials without the required context, and we flag anything that may need a disclaimer. Final compliance with the professional conduct and advertising rules where you practise is the firm's call, so your firm approves all content.",
      },
      {
        question: "Can you redesign our existing website?",
        answer:
          "Yes. We can rebuild it on a faster platform, keep your existing page addresses where possible so you don't lose Google rankings, and redirect any pages that move.",
      },
      {
        question: "How much does a law firm website cost?",
        answer:
          "It depends on the number of practice areas and features such as booking, intake forms or multiple languages. We send a written, fixed quote after a short call, before any work starts.",
      },
      { question: "What areas do you serve?", answer: `Law firms anywhere in the world. ${REACH_NOTE}` },
    ],
    work: ["island-traffic-defense", "wolfe-property", "tiancheng-development-group"],
    related: [
      { label: "Google Business Profile setup", href: "/google-business-profile-setup" },
      { label: "Web & AI development", href: "/web-and-ai-development" },
      { label: "Free Website Grader", href: "/tools/website-grader" },
    ],
  },
  {
    slug: "affordable-web-design",
    title: "Affordable Web Design for Small Businesses",
    description:
      "Affordable websites for small businesses anywhere: 5 pages, your own domain, a contact or quote form and Google setup, with a fixed written quote and no monthly fee.",
    eyebrow: "Affordable web design",
    h1: "A professional website for your business, without agency overhead.",
    intro:
      "We build clean, fast 5-page websites for small businesses around the world: your own domain, a contact or quote form, Google basics set up, and no monthly hosting fee. You get a written, fixed quote before any work starts.",
    breadcrumb: "Affordable Web Design",
    service: "Websites & Web Apps",
    ctaLabel: "Get my website",
    includedTitle: "What's included",
    included: [
      { title: "5-page website", body: "Home, Services, Gallery, Reviews and Contact, written for your business and your area." },
      { title: "Your own domain", body: "yourbusiness.com, registered in your name, so you always own it." },
      { title: "Contact or quote form", body: "Every request goes to your email and phone, so you get leads even when you can't pick up." },
      { title: "Built for phones", body: "Tap-to-call and the form on every page, because most customers find you on their phone." },
      { title: "Google basics", body: "Search Console, sitemap, page titles and local business details so you can show up in local searches." },
      { title: "No monthly hosting fee", body: "Fast, secure hosting with no monthly bill. You own the site and the domain." },
    ],
    problemsTitle: "Why 'cheap' websites usually fail",
    problems: [
      "They stay on a free builder address like yourname.wixsite.com that customers don't trust",
      "There's no form, so visitors who don't want to call just leave",
      "They look broken on a phone",
      "Nobody set up Google, so the site never shows up in searches",
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "Tell us about your business", body: "Your services, area, photos and any current site. Takes about 5 minutes." },
      { title: "We build it", body: "You see a full preview before anything goes live." },
      { title: "Live in about 5 days", body: "We connect your domain, test the form with you and submit the site to Google." },
    ],
    faq: [
      {
        question: "How do you keep it affordable?",
        answer:
          "We use a proven 5-page structure for small businesses instead of designing every site from scratch. You get a professional result without big-agency overhead, and a fixed quote before we start.",
      },
      { question: "Are there monthly fees?", answer: "No. Hosting is included with no monthly bill. Ongoing updates and local SEO are optional." },
      { question: "What if I need more than 5 pages or online booking or payments?", answer: "We'll send a written quote for the extra pages or features before starting. You only pay for what you ask for." },
      { question: "I already have a website. Can you redo it?", answer: "Yes. Run the free Website Grader to see what's holding it back, and we'll rebuild it on your own domain." },
      { question: "What areas do you serve?", answer: `Small businesses anywhere. ${REACH_NOTE}` },
    ],
    work: ["portland-web-designing-studio", "buttercream-bus", "east-end-vintage-sale"],
    related: [
      { label: "Websites for trade businesses", href: "/trade-business-websites" },
      { label: "Free Website Grader", href: "/tools/website-grader" },
      { label: "Google Business Profile setup", href: "/google-business-profile-setup" },
    ],
  },
  {
    slug: "google-business-profile-setup",
    title: "Google Business Profile Setup",
    description:
      "We set up, verify and optimise your Google Business Profile so your local business can appear in Google Maps and local search: categories, services, photos, reviews and website link.",
    eyebrow: "Google Business Profile",
    h1: "Get your business on Google Maps, set up properly.",
    intro:
      "Your Google Business Profile is often the first thing customers see, before your website. We set it up or fix it: the right categories, services, hours, photos and website link, and a simple way to collect reviews, so your business can appear in the map results for your area.",
    breadcrumb: "Google Business Profile Setup",
    service: "Google Business Profile setup",
    ctaLabel: "Get my profile set up",
    includedTitle: "What we set up",
    included: [
      { title: "Create or claim your profile", body: "New profile, or recover and claim one that already exists for your business." },
      { title: "Verification help", body: "We walk you through Google's verification (often a short video), since it must be done by the owner." },
      { title: "Categories and services", body: "The primary and secondary categories and service list that match how customers search." },
      { title: "Service area or address", body: "Storefront address, or a service area with your home address hidden if you work at customers' locations." },
      { title: "Photos, hours and website link", body: "Logo, cover, real work photos, opening hours and a link to the right page of your website." },
      { title: "Review link", body: "A short link and message you can send customers so collecting Google reviews takes seconds." },
    ],
    problemsTitle: "Common profile problems we fix",
    problems: [
      "Wrong or too-broad primary category",
      "Home address showing publicly when it shouldn't",
      "No website link, or a link to a page that doesn't load",
      "Duplicate or unverified listings splitting your reviews",
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "Send your details", body: "Business name, address or service area, services, hours and a few photos." },
      { title: "We set it up", body: "We build or fix the profile and prepare everything for verification." },
      { title: "You verify, we finish", body: "You complete Google's owner verification; we finish the setup and send your review link." },
    ],
    faq: [
      {
        question: "Can you guarantee I'll rank #1 on Google Maps?",
        answer:
          "No one can honestly guarantee a ranking. Map results depend on distance, relevance and reputation. A complete, accurate profile plus steady reviews gives you the best chance, and that is what we set up.",
      },
      {
        question: "Why do I have to do the verification myself?",
        answer:
          "Google requires the business owner to verify, often with a short video showing the business. We prepare everything and guide you through it.",
      },
      {
        question: "I work from home. Will my address be public?",
        answer: "No. Service-area businesses can hide their address and show the areas they serve instead. We set that up for you.",
      },
      {
        question: "Do I need a website too?",
        answer:
          "A profile works without one, but a website gives Google and customers more to trust. See our affordable 5-page website for small businesses.",
      },
      {
        question: "How much does it cost?",
        answer: "Send us your details and we'll reply with a fixed price before any work starts.",
      },
    ],
    work: ["island-traffic-defense", "buttercream-bus", "wolfe-property"],
    related: [
      { label: "Affordable web design", href: "/affordable-web-design" },
      { label: "Law firm web design", href: "/law-firm-web-design" },
      { label: "Web & AI development", href: "/web-and-ai-development" },
    ],
  },
];

export function getLocalPage(slug: string): LocalPage {
  const page = localPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown local page: ${slug}`);
  return page;
}
