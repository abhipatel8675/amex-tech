import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Law Firm Web Design | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("Law Firm Web Design", "Credible, fast websites for law firms and solo attorneys worldwide.");
}
