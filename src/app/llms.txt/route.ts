import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { localPages } from "@/data/localPages";

export const dynamic = "force-static";

const BASE_URL = "https://amextechnology.com";

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI search
// assistants. Built from the same data as the pages so it never goes stale.
export function GET() {
  const lines = [
    "# Amex Technology",
    "",
    "> Amex Technology builds websites, web apps, mobile apps and AI automations for businesses worldwide. Founded by Abhi Patel. We also set up GoHighLevel and HubSpot customer management systems, and help businesses get found on Google and in AI assistants.",
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${BASE_URL}/services/${s.slug}): ${s.shortDesc}`),
    "",
    "## Offers",
    "",
    `- [AI Assistant for your business](${BASE_URL}/ai-operations-agent): AI assistant connected to a business's existing tools (spreadsheets, project boards, accounting, CRM, email) for status answers, daily exceptions and system sync.`,
    `- [Hire Developers](${BASE_URL}/hire-developers): Developer support for websites, web apps, AI, mobile apps and maintenance, as a defined project, an extension of your team or ongoing work.`,
    "",
    "## Industries and offers",
    "",
    `- [Websites & AI for businesses worldwide](${BASE_URL}/web-and-ai-development): Websites, web apps, AI assistants and automation for companies around the world.`,
    ...localPages.map((p) => `- [${p.title}](${BASE_URL}/${p.slug}): ${p.description}`),
    "",
    "## Free tools",
    "",
    `- [App Checker](${BASE_URL}/tools/app-checker): Free check of apps built with Lovable, Bolt, Replit and v0 for common security, search and speed problems.`,
    "",
    "## Guides",
    "",
    ...blogPosts.map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.excerpt}`),
    "",
    "## Our work",
    "",
    ...projects.map((p) => `- [${p.title}](${BASE_URL}/portfolio/${p.slug}): ${p.shortDesc}`),
    "",
    "## Contact",
    "",
    `- [Get a free quote](${BASE_URL}/contact)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
