import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Amex Technology Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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

        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "48px" }}>
          <span
            style={{
              fontSize: "28px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #818CF8, #A78BFA)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Amex
          </span>
          <span style={{ fontSize: "28px", fontWeight: "600", color: "#E2E8F0" }}>
            Technology
          </span>
        </div>

        <h1
          style={{
            fontSize: "56px",
            fontWeight: "800",
            color: "#FFFFFF",
            lineHeight: 1.1,
            maxWidth: "800px",
            margin: "0 0 24px 0",
          }}
        >
          Our Services
        </h1>

        <p
          style={{
            fontSize: "24px",
            color: "#94A3B8",
            maxWidth: "600px",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Web, mobile, SaaS, DevOps, UI/UX, SEO, and AI automation — end to end.
        </p>

        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "80px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              color: "#818CF8",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            amextechnology.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
