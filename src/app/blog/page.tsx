import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { blogPosts } from "@/data/blog";
import FixItCTA from "@/components/blog/FixItCTA";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Supabase, Firebase & Next.js Fix Guides",
  description:
    "Step-by-step fixes for common Supabase, Firebase, Lovable, Next.js and Vercel errors, written by the Amex Technology team from real client projects.",
  alternates: {
    canonical: "https://amextechnology.com/blog",
  },
  openGraph: {
    title: "Supabase, Firebase & Next.js Fix Guides | Amex Technology",
    description:
      "Step-by-step fixes for common Supabase, Firebase, Lovable, Next.js and Vercel errors, written by the Amex Technology team from real client projects.",
    url: "https://amextechnology.com/blog",
  },
  twitter: {
    title: "Supabase, Firebase & Next.js Fix Guides | Amex Technology",
    description:
      "Step-by-step fixes for common Supabase, Firebase, Lovable, Next.js and Vercel errors, written by the Amex Technology team from real client projects.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://amextechnology.com/blog" },
  ],
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Supabase, Firebase & Next.js Fix Guides",
  description:
    "Architecture decisions, tech stack deep-dives, and practical tutorials from the Amex Technology engineering team.",
  url: "https://amextechnology.com/blog",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://amextechnology.com/blog/${post.slug}`,
      name: post.title,
    })),
  },
};

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Navbar />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

        {/* Hero */}
        <section className="pt-8 pb-16 max-w-[92rem] mx-auto px-6">
          <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-widest mb-5">
            From the Team
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-3xl mb-6 leading-tight">
            Fix Guides for Supabase, Firebase, Lovable & Next.js
          </h1>
          <p className="text-slate-700 text-xl max-w-xl leading-8">
            Step-by-step fixes for the errors we solve every week on client projects, plus setup guides for the tools
            around them.
          </p>
          <div className="mt-10">
            <FixItCTA topic="app" source="blog-index" variant="inline" />
          </div>
        </section>

        {/* Featured post */}
        {featured && (
          <section className="pb-12 max-w-[92rem] mx-auto px-6">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden hover:border-slate-300 hover:bg-slate-100 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Visual */}
                <div className="w-full md:w-2/5 h-56 md:h-72 relative overflow-hidden flex-shrink-0">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      quality={90}
                      className={`object-cover ${featured.imagePosition ?? "object-center"}`}
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
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
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-sm text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                        {featured.category}
                      </span>
                      <span className="text-sm text-slate-600 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-[#7A5807] transition-colors leading-snug">
                      {featured.title}
                    </h2>
                    <p className="text-base text-slate-600 leading-7">{featured.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 text-base font-semibold text-[#7A5807] mt-7 group-hover:text-[#7A5807] transition-colors">
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Post grid */}
        <section className="pb-28 max-w-[92rem] mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden hover:border-slate-300 hover:bg-slate-100 transition-all duration-300 flex flex-col"
              >
                {/* Visual */}
                <div className="h-44 relative overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      quality={80}
                      priority={i < 3}
                      className={`object-cover ${post.imagePosition ?? "object-center"} transition-transform duration-500 group-hover:scale-105`}
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
                    <span className="text-sm text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                      {post.category}
                    </span>
                    <span className="text-sm text-slate-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#7A5807] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#7A5807] group-hover:text-[#7A5807] transition-colors mt-1">
                    Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
