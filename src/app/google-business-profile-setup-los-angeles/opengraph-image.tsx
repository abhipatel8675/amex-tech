import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Google Business Profile Setup | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("Google Business Profile Setup", "Get your Los Angeles business found in Google Maps and local search.");
}
