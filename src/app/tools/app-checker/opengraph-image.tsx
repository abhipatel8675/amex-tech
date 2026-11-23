import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Free App Checker | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("Free App Checker", "Find what's wrong with your Lovable, Bolt or Replit app before your customers do.");
}
