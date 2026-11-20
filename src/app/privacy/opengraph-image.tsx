import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Privacy Policy | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("Privacy Policy");
}
