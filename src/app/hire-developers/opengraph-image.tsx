import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Hire Developers: React, Next.js, AI & Mobile | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("Hire Developers for Your Business", "Experienced developers for websites, apps and AI, working on your time zone.");
}
