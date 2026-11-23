import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "AI Operations Assistant for Manufacturers | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("AI Operations Assistant for Manufacturers", "Order status, daily problem reports and tool sync, handled by an AI assistant.");
}
