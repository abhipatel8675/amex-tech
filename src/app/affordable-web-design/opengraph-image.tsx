import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Affordable Web Design | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("Affordable Web Design", "Clean 5-page websites for small businesses anywhere, fixed quote.");
}
