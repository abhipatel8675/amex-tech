import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "AI Assistant for Your Business | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("AI Assistant for Your Business", "Status answers, daily problem reports and tool sync, handled by an AI assistant.");
}
