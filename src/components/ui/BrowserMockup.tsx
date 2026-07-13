import Image from "next/image";
import { ReactNode } from "react";

interface BrowserMockupProps {
  src?: string;
  alt?: string;
  url?: string;
  children?: ReactNode;
  className?: string;
  aspectRatio?: string;
}

export default function BrowserMockup({
  src,
  alt = "",
  url = "project.app",
  children,
  className = "",
  aspectRatio = "16/9",
}: BrowserMockupProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden border border-white/[0.1] shadow-2xl ${className}`}
      style={{ background: "#161b2e" }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/[0.07]"
        style={{ background: "#1a2035" }}
      >
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "#FF5F57" }} />
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "#FEBC2E" }} />
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "#28C840" }} />
        <div className="ml-2 flex-1 flex items-center gap-1.5 bg-white/[0.04] rounded px-2.5 py-1 max-w-[240px]">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
            <circle cx="4" cy="4" r="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <path d="M4 1.5v2.5l1.5 1" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] text-slate-500 font-mono truncate">{url}</span>
        </div>
      </div>
      {/* Viewport */}
      <div className="relative overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={1280}
            height={800}
            style={{ width: "100%", height: "auto", display: "block" }}
            unoptimized={src.startsWith("http")}
          />
        ) : (
          <div style={{ aspectRatio }}>{children}</div>
        )}
      </div>
    </div>
  );
}
