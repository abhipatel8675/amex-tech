"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { animate, stagger } from "animejs";
import { blogPosts } from "@/data/blog";

const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
const others = blogPosts
  .filter((p) => p.slug !== featured.slug)
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 2);
const posts = [featured, ...others];

export function HeroBlogList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(".blog-row");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    cards.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(14px)";
    });

    let hasRun = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun) {
          hasRun = true;
          animate(cards, {
            opacity: [0, 1],
            translateY: [14, 0],
            duration: 550,
            delay: stagger(120),
            ease: "outQuad",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-1 flex-col justify-between gap-3">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="blog-row group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#0F1729] p-4 overflow-hidden transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.05]"
        >
          <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className={`object-cover ${post.imagePosition ?? "object-center"} group-hover:scale-105 transition-transform duration-500`}
                sizes="64px"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${post.gradientFrom}, ${post.gradientTo})` }}
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-xs text-slate-400">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
            <h4 className="line-clamp-1 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-[#D4AF37]">
              {post.title}
            </h4>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-[#E1BC4A] transition-transform group-hover:translate-x-0.5" />
        </Link>
      ))}
    </div>
  );
}
