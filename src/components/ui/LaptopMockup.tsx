import Image from "next/image";

interface LaptopMockupProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function LaptopMockup({ src, alt = "", className = "" }: LaptopMockupProps) {
  return (
    <div className={`flex items-end justify-center pb-1 ${className}`}>
      {/* Perspective tilt — makes the laptop look 3D sitting on a desk */}
      <div
        style={{
          width: "88%",
          transform: "perspective(700px) rotateX(8deg)",
          transformOrigin: "50% 100%",
        }}
      >
        {/* ── Screen lid ── */}
        <div
          style={{
            aspectRatio: "16/9",
            position: "relative",
            overflow: "hidden",
            borderRadius: "10px 10px 0 0",
            border: "2.5px solid #2d3154",
            borderBottom: "2px solid #1e2240",
            background: "#0d1117",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Camera dot */}
          <div
            style={{
              position: "absolute",
              top: 7,
              left: "50%",
              transform: "translateX(-50%)",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#191928",
              border: "1px solid rgba(255,255,255,0.07)",
              zIndex: 2,
            }}
          />
          {/* Screen content with inner bezel */}
          <div
            style={{
              position: "absolute",
              top: 18,
              right: 10,
              bottom: 5,
              left: 10,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {src && (
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover object-top"
                unoptimized={src.startsWith("http")}
              />
            )}
          </div>
          {/* Glass sheen */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── Hinge ── */}
        <div
          style={{
            height: 4,
            background: "linear-gradient(180deg, #252848 0%, #0e1020 100%)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        />

        {/* ── Keyboard base ── */}
        <div
          style={{
            height: 44,
            background: "linear-gradient(180deg, #1f2342 0%, #141830 100%)",
            borderRadius: "0 0 10px 10px",
            border: "2.5px solid #2d3154",
            borderTop: "none",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 28px rgba(0,0,0,0.7)",
          }}
        >
          {/* Keyboard rows (3 rows of keys represented as lines) */}
          <div
            style={{
              position: "absolute",
              top: 7,
              left: "9%",
              right: "9%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {[82, 92, 76].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 3,
                  width: `${w}%`,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
          {/* Trackpad */}
          <div
            style={{
              position: "absolute",
              bottom: 7,
              left: "50%",
              transform: "translateX(-50%)",
              width: "30%",
              height: 13,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4,
            }}
          />
        </div>

        {/* Table surface reflection */}
        <div
          style={{
            height: 5,
            background:
              "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.04) 50%, transparent 95%)",
            borderRadius: "0 0 6px 6px",
          }}
        />
      </div>
    </div>
  );
}
