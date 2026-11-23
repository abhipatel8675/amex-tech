import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { getProjects } from "@/lib/portfolio/data";
import { services } from "@/data/services";
import { servicePages } from "@/data/servicePages";
import { localPages } from "@/data/localPages";

const BASE_URL = "https://amextechnology.com";

// Bump this only when the static (non-blog, non-portfolio) pages actually
// change — using `new Date()` here would reset the freshness signal on
// every deploy regardless of whether content changed.
const SITE_LAST_UPDATED = new Date("2026-07-24");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/hire-developers`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ai-operations-agent`,
      lastModified: new Date("2026-11-14"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/web-and-ai-development`,
      lastModified: new Date("2026-10-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/website-grader`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/trade-business-websites`,
      lastModified: new Date("2026-10-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fix`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/app-checker`,
      lastModified: new Date("2026-10-17"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date("2026-07-11"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date("2026-07-11"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/refund-policy`,
      lastModified: new Date("2026-10-30"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/delivery-policy`,
      lastModified: new Date("2026-10-30"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const portfolioPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/portfolio/${project.slug}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const servicePagesList: MetadataRoute.Sitemap = services
    .filter((s) => servicePages[s.slug])
    .map((s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: new Date("2026-10-18"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  const localPagesList: MetadataRoute.Sitemap = localPages.map((p) => ({
    url: `${BASE_URL}/${p.slug}`,
    lastModified: new Date("2026-11-14"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...localPagesList, ...servicePagesList, ...blogPages, ...portfolioPages];
}
