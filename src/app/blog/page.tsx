import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import { blogPosts } from "@/data/blog";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering insights, architecture guides, and practical tutorials from the Amex Technology team.",
};

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 max-w-6xl mx-auto px-6">
        <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-4">
          From the Team
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl mb-5">
          Engineering insights and practical guides.
        </h1>
        <p className="text-[#555] text-base md:text-lg max-w-xl leading-relaxed">
          Architecture decisions, tech stack deep-dives, and lessons from building real products.
        </p>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="pb-12 max-w-6xl mx-auto px-6">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden hover:border-[#2a2a2a] transition-colors"
          >
            <div className="grid md:grid-cols-5">
              {/* Visual */}
              <div
                className="md:col-span-2 h-48 md:h-full min-h-[200px] relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${featured.gradientFrom}20, ${featured.gradientTo}20)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${featured.gradientFrom}80, transparent 70%)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-7 md:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs text-[#555] bg-[#111] border border-[#1a1a1a] px-2.5 py-1 rounded-lg">
                      {featured.category}
                    </span>
                    <span className="text-xs text-[#444] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#00dc82] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-[#555] leading-relaxed">{featured.excerpt}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#00dc82] mt-6">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Post grid */}
      <section className="pb-24 max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden hover:border-[#2a2a2a] transition-colors flex flex-col"
            >
              {/* Visual */}
              <div
                className="h-36 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${post.gradientFrom}18, ${post.gradientTo}18)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    background: `radial-gradient(ellipse at 30% 60%, ${post.gradientFrom}70, transparent 70%)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#555] bg-[#111] border border-[#1a1a1a] px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#444] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#00dc82] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-[#555] leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-1 text-xs text-[#00dc82] mt-1">
                  Read <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
