import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Website for Trade Businesses | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("Website for Trade Businesses", "A fast, professional website for plumbers, electricians and contractors, live in about 5 days.");
}
