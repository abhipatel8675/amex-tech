"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECT_KINDS, type ProjectKind } from "@/data/projectPlain";
import inner from "@/components/site/inner.module.css";
import s from "./portfolio.module.css";

export type GalleryItem = {
  slug: string;
  title: string;
  kind: ProjectKind;
  summary: string;
  image?: string;
  alt: string;
};

const PAGE = 12;

/** Filterable project grid. It receives only light card data, never the full case-study text. */
export default function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const [kind, setKind] = useState<ProjectKind | "All">("All");
  const [visible, setVisible] = useState(PAGE);

  const kinds = useMemo(() => PROJECT_KINDS.filter((k) => items.some((i) => i.kind === k)), [items]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: items.length };
    for (const i of items) c[i.kind] = (c[i.kind] ?? 0) + 1;
    return c;
  }, [items]);
  const shown = useMemo(() => (kind === "All" ? items : items.filter((i) => i.kind === kind)), [items, kind]);

  function choose(next: ProjectKind | "All") {
    setKind(next);
    setVisible(PAGE);
  }

  return (
    <div>
      <div className={s.toolbar}>
        <div className={s.tabs} role="group" aria-label="Filter projects by type">
          {(["All", ...kinds] as const).map((k) => (
            <button key={k} type="button" className={s.tab} aria-pressed={kind === k} onClick={() => choose(k)}>
              {k}
              <b>{counts[k]}</b>
            </button>
          ))}
        </div>
        <p className={s.count} aria-live="polite">
          Showing {Math.min(visible, shown.length)} of {shown.length}
        </p>
      </div>

      <ul className={s.grid}>
        {shown.slice(0, visible).map((p, i) => (
          <li key={p.slug}>
            <Link href={`/portfolio/${p.slug}`} className={s.card}>
              <span className={s.cardImage}>
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                )}
              </span>
              <span className={s.cardBody}>
                <span className={s.kind}>{p.kind}</span>
                <h3 className={s.cardTitle}>{p.title}</h3>
                <span className={s.summary}>{p.summary}</span>
                <span className={s.more}>
                  View project <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {visible < shown.length && (
        <div className={s.showMore}>
          <button type="button" className={inner.ghost} onClick={() => setVisible((v) => v + PAGE)}>
            Show more projects
          </button>
        </div>
      )}
    </div>
  );
}
