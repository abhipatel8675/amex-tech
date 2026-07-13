import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { blogPosts } from "@/data/blog";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Blog",
  description:
    "Architecture decisions, tech stack deep-dives, and practical tutorials from the Amex Technology engineering team. Real lessons from building real products.",
  alternates: {
    canonical: "https://amextechnology.com/blog",
  },
  openGraph: {
    title: "Engineering Blog | Amex Technology",
    description:
      "Architecture decisions, tech stack deep-dives, and practical tutorials from the Amex Technology engineering team.",
    url: "https://amextechnology.com/blog",
  },
  twitter: {
    title: "Engineering Blog | Amex Technology",
    description:
      "Architecture decisions, tech stack deep-dives, and practical tutorials from the Amex Technology engineering team.",
  },
};

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      {/* Hero */}
      <section className="pt-8 pb-16 max-w-7xl mx-auto px-6">
        <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-5">
          From the Team
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-3xl mb-6 leading-tight">
          Engineering insights and practical guides.
        </h1>
        <p className="text-slate-300 text-xl max-w-xl leading-8">
          Architecture decisions, tech stack deep-dives, and lessons from building real products.
        </p>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="pb-12 max-w-7xl mx-auto px-6">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-300"
          >
            <div className="grid md:grid-cols-5">
              {/* Visual */}
              <div
                className="md:col-span-2 h-48 md:h-full min-h-[220px] relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${featured.gradientFrom}20, ${featured.gradientTo}20)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${featured.gradientFrom}80, transparent 70%)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-sm text-slate-400 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-lg">
                      {featured.category}
                    </span>
                    <span className="text-sm text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-base text-slate-400 leading-7">{featured.excerpt}</p>
                </div>
                <div className="flex items-center gap-2 text-base font-semibold text-indigo-400 mt-7 group-hover:text-indigo-300 transition-colors">
                  Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Post grid */}
      <section className="pb-28 max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-300 flex flex-col"
            >
              {/* Visual */}
              <div className="h-44 relative overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    quality={95}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${post.gradientFrom}18, ${post.gradientTo}18)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `radial-gradient(ellipse at 30% 60%, ${post.gradientFrom}70, transparent 70%)`,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm text-slate-400 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded-lg">
                    {post.category}
                  </span>
                  <span className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors mt-1">
                  Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
