import { ReactNode } from "react";

/**
 * Amex Technology brand mark — a geometric "A" monogram inside a
 * gradient rounded-square badge. Shared by the navbar, footer and favicon
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
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="amex-logo-grad"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#amex-logo-grad)" />
      {/* Geometric "A" */}
      <path
        d="M9 24 L16 8 L23 24"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 19 H20"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
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
            background: "linear-gradient(135deg, #818CF8, #A78BFA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Amex
        </span>
        <span className={`text-[#E2E8F0] font-semibold tracking-tight ${textClassName}`}>
          Technology
        </span>
      </span>
    </span>
  );
}
