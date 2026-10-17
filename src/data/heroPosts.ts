import type { BlogPost } from "@/data/blog";

export type HeroBlogPost = Pick<BlogPost, "slug" | "title" | "category" | "readTime" | "gradientFrom" | "gradientTo">;

// Runs on the server (page.tsx) so the full blog data, article bodies
// included, never ships in the client bundle.
export function pickHeroPosts(all: BlogPost[]): HeroBlogPost[] {
  const featured = all.find((p) => p.featured) ?? all[0];
  const others = all
    .filter((p) => p.slug !== featured.slug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);
  return [featured, ...others].map(({ slug, title, category, readTime, gradientFrom, gradientTo }) => ({
    slug,
    title,
    category,
    readTime,
    gradientFrom,
    gradientTo,
  }));
}

import type { Project } from "@/data/projects";
import type { HeroWork } from "@/components/home/Hero";

const SHOWCASE = ["molar-ai", "periscope-email"];
const RECENT = ["molar-ai", "periscope-email", "hoursheets", "zenscroll", "hmd"];

// Hero project picks, trimmed to the few fields the hero renders.
export function pickHeroWork(all: Project[]): { showcase: HeroWork[]; recentWork: HeroWork[] } {
  const pick = (slugs: string[]) =>
    slugs
      .map((slug) => all.find((p) => p.slug === slug))
      .filter((p): p is Project => Boolean(p))
      .map(({ slug, title, shortDesc, image, liveUrl }) => ({ slug, title, shortDesc, image, liveUrl }));
  return { showcase: pick(SHOWCASE).filter((p) => p.image), recentWork: pick(RECENT) };
}
