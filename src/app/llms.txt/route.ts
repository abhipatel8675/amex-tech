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
    "> AI and software agency with a Los Angeles-based founder (Gardena) and a development team in Ahmedabad, India, serving clients worldwide. We build AI agents and automations, websites and web apps, AI SaaS MVPs and mobile apps, set up GoHighLevel and HubSpot CRMs, and grow search visibility on Google and AI assistants with SEO, GEO and AEO.",
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${BASE_URL}/services/${s.slug}): ${s.shortDesc}`),
    "",
    "## Offers",
    "",
    `- [AI Operations Agent for manufacturers](${BASE_URL}/ai-operations-agent): AI assistant connected to a small manufacturer's tools (monday.com, Smartsheet, Google Sheets, inFlow, QuickBooks, email) for order status, daily exceptions and system sync. Setup from $3,000, support from $500/month.`,
    `- [Hire Developers](${BASE_URL}/hire-developers): React, Next.js, full-stack, AI, mobile and DevOps development support, as a defined project, an extension of your team or ongoing development.`,
    "",
    "## Locations",
    "",
    `- [Los Angeles](${BASE_URL}/los-angeles): Development team in India; founder Abhi Patel is based in Gardena, in the Los Angeles area, and works with LA and South Bay businesses on Pacific time.`,
    ...localPages.map((p) => `- [${p.title}](${BASE_URL}/${p.slug}): ${p.description}`),
    "",
    "## Free tools",
    "",
    `- [App Checker](${BASE_URL}/tools/app-checker): Free security, SEO and speed check for Lovable, Bolt, Replit, v0 and Next.js apps, including exposed API keys and Supabase service_role keys.`,
    "",
    "## Troubleshooting guides",
    "",
    ...blogPosts.map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.excerpt}`),
    "",
    "## Case studies",
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
