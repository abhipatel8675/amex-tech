import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Fix Your App Error in 24 Hours | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("Fix Your App Error in 24 Hours", "Send us the error. We find the cause and fix it, usually within a day.");
}
