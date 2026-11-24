import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  compress: true,
  images: {
    // Vercel's image optimization quota is exhausted (402); serve originals from the CDN instead.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Portfolio images uploaded from /admin/portfolio
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/portfolio/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 95],
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return [
      // Old location-based page addresses now point to the matching service pages.
      { source: "/los-angeles", destination: "/web-and-ai-development", permanent: true },
      { source: "/la-website", destination: "/trade-business-websites", permanent: true },
      { source: "/law-firm-web-design-los-angeles", destination: "/law-firm-web-design", permanent: true },
      { source: "/affordable-web-design-los-angeles", destination: "/affordable-web-design", permanent: true },
      { source: "/google-business-profile-setup-los-angeles", destination: "/google-business-profile-setup", permanent: true },
      {
        source: "/portfolio/wolfeprppertyporta",
        destination: "/portfolio/wolfe-property",
        permanent: true,
      },
      // Duplicate case studies (same client listed twice) now point to the one we keep.
      ...[
        ["expert-village", "expert-village-media"],
        ["ultrawindows", "ultra-windows"],
        ["thebuttercreambus", "buttercream-bus"],
        ["island-traffic", "island-traffic-defense"],
        ["eastendvintagesale", "east-end-vintage-sale"],
        ["wideeyedgiantcom", "wide-eyed-giant"],
        ["moler-ai", "molar-ai"],
        ["herruby", "herruby-app"],
        ["cdieng", "tiancheng-development-group"],
        ["portland-self-defense", "portland-self-defense-crm"],
      ].map(([from, to]) => ({
        source: `/portfolio/${from}`,
        destination: `/portfolio/${to}`,
        permanent: true,
      })),
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.amextechnology.com" }],
        destination: "https://amextechnology.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
