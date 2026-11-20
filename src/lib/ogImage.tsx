import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOgImage(title: string, subtitle?: string) {
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
            background: "linear-gradient(90deg, #9a722a, #9C7208)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "48px" }}>
          <span style={{ fontSize: "28px", fontWeight: 700, color: "#CC9A1A" }}>Amex</span>
          <span style={{ fontSize: "28px", fontWeight: 600, color: "#E2E8F0" }}>Technology</span>
        </div>
        <h1
          style={{
            fontSize: "60px",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.1,
            maxWidth: "960px",
            margin: "0 0 24px 0",
          }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p style={{ fontSize: "26px", color: "#94A3B8", maxWidth: "820px", lineHeight: 1.45, margin: 0 }}>
            {subtitle}
          </p>
        ) : null}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "80px",
            display: "flex",
            padding: "8px 18px",
            borderRadius: "8px",
            background: "rgba(184, 134, 11, 0.15)",
            border: "1px solid rgba(184, 134, 11, 0.3)",
            color: "#CC9A1A",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          amextechnology.com
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
