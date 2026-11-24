import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** "inline" drops the page padding so it can sit inside a hero; style it via className. */
  variant?: "default" | "inline";
  className?: string;
};

export default function Breadcrumb({
  items,
  variant = "default",
  className,
}: BreadcrumbProps) {
  if (variant === "inline") {
    return (
      <nav aria-label="Breadcrumb" className={className}>
        <ol>
          {items.map((item, i) => (
            <li key={i}>
              {i > 0 && (
                <ChevronRight
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
              )}
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
  return (
    <nav aria-label="Breadcrumb" className="max-w-[92rem] mx-auto px-6 pt-28 md:pt-32 pb-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#4d554b]">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#555555] shrink-0" />}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-[#3d453b] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#3d453b] font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
