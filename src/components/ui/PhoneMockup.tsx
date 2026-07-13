import Image from "next/image";
import { ReactNode } from "react";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
  tiltDeg?: number;
}

export default function PhoneMockup({
  src,
  alt = "",
  children,
  className = "",
  tiltDeg = 0,
}: PhoneMockupProps) {
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ transform: tiltDeg ? `rotate(${tiltDeg}deg)` : undefined, width: 180 }}
    >
      <div
        className="relative rounded-[2rem] overflow-hidden border-[3px] border-white/[0.15] shadow-2xl"
        style={{ background: "#161b2e" }}
      >
        {/* Dynamic island */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div
            className="rounded-full flex items-center justify-center gap-1.5"
            style={{ width: 66, height: 20, background: "#0a0a0a" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <div
              className="w-2.5 h-2.5 rounded-full border border-slate-600"
              style={{ background: "rgba(30,30,40,0.8)" }}
            />
          </div>
        </div>
        {/* Screen */}
        <div className="relative overflow-hidden">
          {src ? (
            <Image
              src={src}
              alt={alt}
              width={390}
              height={844}
              style={{ width: "100%", height: "auto", display: "block" }}
              unoptimized={src.startsWith("http")}
            />
          ) : (
            <div style={{ aspectRatio: "9/16" }}>{children}</div>
          )}
        </div>
        {/* Home bar */}
        <div className="flex justify-center py-2">
          <div className="w-[72px] h-1 bg-white/[0.25] rounded-full" />
        </div>
      </div>
    </div>
  );
}
