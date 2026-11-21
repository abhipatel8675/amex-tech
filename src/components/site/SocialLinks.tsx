import { UPWORK_URL, CLUTCH_URL } from "@/data/company";

type Item = { label: string; href: string; path: string; stroke?: boolean };

const items: Item[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/amextechnology/",
    stroke: true,
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-2.5h.01",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/amex-technology/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452z",
  },
  {
    label: "Upwork",
    href: UPWORK_URL,
    path: "M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06a2.834 2.834 0 0 1 2.833 2.833 2.834 2.834 0 0 1-2.834 2.572zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.15-4.036-2.699-5.892H7.548v7.112c-.002 1.406-1.144 2.548-2.55 2.548-1.405 0-2.547-1.142-2.549-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.283 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.557l1.213-5.71c1.063.679 2.285 1.109 3.664 1.109h.02c3.045-.028 5.526-2.53 5.526-5.582 0-3.061-2.481-5.577-5.526-5.577z",
  },
  {
    label: "Clutch",
    href: CLUTCH_URL,
    path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.2 13.4a4.6 4.6 0 1 1 0-6.8l-1.9 1.4a2.3 2.3 0 1 0 0 4z",
  },
];

/** Plain icon links. Colour comes from the surrounding field via currentColor. */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul
      className={className}
      style={{ display: "flex", gap: 4, listStyle: "none", padding: 0, margin: 0 }}
    >
      {items.map((i) => (
        <li key={i.label}>
          <a
            href={i.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Amex Technology on ${i.label}`}
            style={{
              display: "inline-flex",
              width: 44,
              height: 44,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill={i.stroke ? "none" : "currentColor"}
              stroke={i.stroke ? "currentColor" : "none"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={i.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
