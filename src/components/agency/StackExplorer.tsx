"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import s from "./stackExplorer.module.css";

export type ExplorerProject = { slug: string; title: string; image?: string };
export type ExplorerGroup = { name: string; projects: ExplorerProject[] };

export default function StackExplorer({ groups }: { groups: ExplorerGroup[] }) {
  const [active, setActive] = useState(0);
  const current = groups[active] ?? groups[0];
  const withImage = current.projects.filter((p) => p.image);
  const shown = (withImage.length ? withImage : current.projects).slice(0, 3);
  // Small project image shown beside each row on phones, where the preview panel is hidden
  const thumbFor = (g: ExplorerGroup) => g.projects.find((p) => p.image)?.image;
  const href = (name: string) => `/portfolio?category=${encodeURIComponent(name)}`;

  return (
    <div className={s.explorer}>
      <ul className={s.list}>
        {groups.map((g, i) => (
          <li key={g.name}>
            <Link
              href={href(g.name)}
              className={`${s.row} ${i === active ? s.rowActive : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.thumb} aria-hidden="true">
                {thumbFor(g) ? (
                  <Image src={thumbFor(g) as string} alt="" fill sizes="72px" />
                ) : null}
              </span>
              <span className={s.name}>{g.name}</span>
              <span className={s.count}>{g.projects.length}</span>
              <ArrowUpRight size={22} className={s.arrow} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      <div className={s.preview} aria-live="polite">
        <p className={s.previewLabel}>
          {current.name} · {current.projects.length} project
          {current.projects.length !== 1 ? "s" : ""}
        </p>
        <div className={s.shots}>
          {shown.map((p, i) => (
            <Link
              key={`${current.name}-${p.slug}`}
              href={`/portfolio/${p.slug}`}
              className={`${s.shot} ${i === 0 ? s.shotMain : ""}`}
            >
              <span className={s.shotImg}>
                {p.image ? (
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes={i === 0 ? "(max-width: 900px) 100vw, 34vw" : "(max-width: 900px) 50vw, 17vw"}
                  />
                ) : null}
              </span>
              <span className={s.shotTitle}>{p.title}</span>
            </Link>
          ))}
        </div>
        <Link href={href(current.name)} className={s.viewAll}>
          View all {current.name} <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
