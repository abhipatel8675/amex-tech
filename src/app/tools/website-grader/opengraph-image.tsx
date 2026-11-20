import { renderOgImage } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Free Website Grader | Amex Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage("Free Website Grader", "Check your website's speed, SEO and mobile basics in seconds.");
}
