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
    "> Software development agency founded in 2019, based in Ahmedabad, India, serving clients worldwide. We build websites, web apps, mobile apps and SaaS products, and fix broken Supabase, Firebase, Lovable, Bolt, Next.js and Vercel projects.",
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${BASE_URL}/services#${s.slug}): ${s.shortDesc}`),
    `- [Bug Fix Service](${BASE_URL}/fix): Senior developers fix app errors, usually within 24 hours. Free assessment.`,
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
