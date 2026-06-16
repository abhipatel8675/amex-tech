import { ImageResponse } from "next/og";
import { blogPosts } from "@/data/blog";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const title = post?.title ?? "Blog";
  const category = post?.category ?? "Article";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0B0F19 0%, #111827 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "32px" }}>
          <span style={{ fontSize: "20px", fontWeight: "700", color: "#818CF8" }}>
            Amex Technology
          </span>
          <span style={{ color: "#475569", fontSize: "20px", margin: "0 8px" }}>·</span>
          <span style={{ fontSize: "20px", color: "#6366F1", fontWeight: "600" }}>{category}</span>
        </div>

        <h1
          style={{
            fontSize: title.length > 60 ? "40px" : "52px",
            fontWeight: "800",
            color: "#FFFFFF",
            lineHeight: 1.15,
            maxWidth: "900px",
            margin: "0 0 32px 0",
          }}
        >
          {title}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#6366F1", fontSize: "18px" }}>amextechnology.com/blog</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
