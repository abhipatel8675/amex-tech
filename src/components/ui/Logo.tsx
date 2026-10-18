import { ReactNode } from "react";
import Image from "next/image";

/**
 * Amex Technology brand mark. Shared by the navbar, footer and favicon
 * so the identity stays consistent everywhere.
 */
export function LogoMark({
  size = 30,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/images/logo-mark.png"
      alt="Amex Technology"
      width={size}
      height={size}
      className={className}
      style={{ borderRadius: size * 0.25 }}
    />
  );
}

/**
 * Full lockup: mark + wordmark. Used in the navbar and footer.
 */
export default function Logo({
  markSize = 30,
  textClassName = "text-lg",
  className = "",
}: {
  markSize?: number;
  textClassName?: string;
  className?: string;
}): ReactNode {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={markSize} />
      <span className="flex items-baseline gap-1">
        <span
          className={`font-bold tracking-tight ${textClassName}`}
          style={{
            background: "linear-gradient(135deg, #CC9A1A, #B8860B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Amex
        </span>
        <span className={`text-slate-700 font-semibold tracking-tight ${textClassName}`}>
          Technology
        </span>
      </span>
    </span>
  );
}
