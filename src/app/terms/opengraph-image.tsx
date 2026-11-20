import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Terms of Service | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("Terms of Service");
}
