import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Free Vibe-Coded App Checker | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("Free Vibe-Coded App Checker", "Find what breaks your Lovable, Bolt or Replit app before your users do.");
}
