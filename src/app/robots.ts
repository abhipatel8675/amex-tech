import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login", "/success"],
      },
    ],
    sitemap: "https://amextechnology.com/sitemap.xml",
  };
}
