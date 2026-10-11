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
