"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Clock, FileText } from "lucide-react";
import { animate, stagger } from "animejs";
import { blogPosts } from "@/data/blog";

const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
const others = blogPosts
  .filter((p) => p.slug !== featured.slug)
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 3);
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
    <div
      ref={containerRef}
      className="flex-1 rounded-2xl border border-white/[0.09] p-2"
      style={{ background: "linear-gradient(145deg, #0F1729 0%, #0B0F19 100%)" }}
    >
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="blog-row group flex items-center gap-4 rounded-xl p-3.5 transition-colors duration-300 hover:bg-white/[0.04]"
        >
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border"
            style={{
              background: `linear-gradient(135deg, ${post.gradientFrom}22, ${post.gradientTo}22)`,
              borderColor: `${post.gradientFrom}33`,
            }}
          >
            <FileText className="h-4 w-4" style={{ color: post.gradientFrom }} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
              <span>{post.category}</span>
              <span className="text-slate-700">·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
            <h4 className="line-clamp-1 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-[#D4AF37]">
              {post.title}
            </h4>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-[#E1BC4A] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </Link>
      ))}

      <Link
        href="/blog"
        className="group mt-1 flex items-center justify-center gap-1.5 rounded-xl border-t border-white/[0.06] px-3.5 py-3 text-sm font-semibold text-slate-400 transition-colors duration-300 hover:bg-white/[0.04] hover:text-[#E1BC4A]"
      >
        View All Articles
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
