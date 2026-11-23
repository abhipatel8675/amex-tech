import Link from "next/link";
import { ChevronRight } from "lucide-react";
import s from "./inner.module.css";

export type Crumb = { label: string; href?: string };

/** Visible breadcrumb trail. Pair it with BreadcrumbList structured data on the page. */
export default function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className={s.crumbs}>
      <ol>
        {items.map((item, i) => (
          <li key={item.label}>
            {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
