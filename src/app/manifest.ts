import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amex Technology — Software Development Agency",
    short_name: "Amex Technology",
    description:
      "Premium software development agency. We build scalable web apps, mobile apps, and SaaS platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F19",
    theme_color: "#0B0F19",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
