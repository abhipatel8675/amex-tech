import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "AI Operations Agent for Manufacturers | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("AI Operations Agent for Manufacturers", "Order status, exception reports and tool sync, handled by an AI agent.");
}
