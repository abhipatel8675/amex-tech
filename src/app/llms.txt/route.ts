import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

export const dynamic = "force-static";

const BASE_URL = "https://amextechnology.com";

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI search
// assistants. Built from the same data as the pages so it never goes stale.
export function GET() {
  const lines = [
    "# Amex Technology",
    "",
    "> AI and software agency founded in 2019, based in Ahmedabad, India, serving clients worldwide. We build AI agents and automations, websites and web apps, AI SaaS MVPs and mobile apps, set up GoHighLevel and HubSpot CRMs, and grow search visibility on Google and AI assistants with SEO, GEO and AEO.",
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${BASE_URL}/services#${s.slug}): ${s.shortDesc}`),
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
