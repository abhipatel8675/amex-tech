import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — larger geometric "A" monogram on the brand gradient.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32" fill="none">
          <path
            d="M9 24 L16 8 L23 24"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 19 H20" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
