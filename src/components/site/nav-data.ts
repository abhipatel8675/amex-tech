/** Single source for header, menu overlay and footer navigation. */
export const primaryLinks = [
  { label: "Services", href: "/services", hint: "What we build for you" },
  { label: "Our work", href: "/portfolio", hint: "Projects we have delivered" },
  { label: "About", href: "/about", hint: "Who is behind Amex" },
  { label: "Blog", href: "/blog", hint: "Plain-English guides" },
  { label: "Contact", href: "/contact", hint: "Tell us what you need" },
] as const;

export const secondaryLinks = [
  { label: "SEO services", href: "/services/seo-services" },
  { label: "AI agents", href: "/ai-operations-agent" },
  { label: "Hire developers", href: "/hire-developers" },
  { label: "24-hour app fix", href: "/fix" },
  { label: "Free website grader", href: "/tools/website-grader" },
  { label: "Free app checker", href: "/tools/app-checker" },
] as const;

export const headerLinks = primaryLinks.filter((l) => l.href !== "/contact");
