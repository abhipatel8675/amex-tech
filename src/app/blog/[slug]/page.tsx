import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Clock, Tag } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 2);

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-12 relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${post.gradientFrom}08 0%, transparent 100%)`,
        }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm text-slate-400 bg-white/[0.04] border border-white/[0.07] px-3 py-1 rounded-lg">
              {post.category}
            </span>
            <span className="text-sm text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
            <span className="text-sm text-slate-500">{post.publishedAt}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">{post.title}</h1>
          <p className="text-slate-300 text-xl leading-8">{post.excerpt}</p>
        </div>
      </section>

      {/* Article content */}
      <article className="pb-24 max-w-3xl mx-auto px-6">
        {/* Visual banner */}
        <div
          className="w-full h-52 rounded-2xl border border-white/[0.07] overflow-hidden mb-12 relative"
          style={{
            background: `linear-gradient(135deg, ${post.gradientFrom}20, ${post.gradientTo}20)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse at 30% 60%, ${post.gradientFrom}70, transparent 70%)`,
            }}
          />
        </div>

        {/* Prose content */}
        <div
          className="prose prose-invert max-w-none
            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5
            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
            prose-p:text-slate-300 prose-p:leading-8 prose-p:my-5 prose-p:text-base
            prose-li:text-slate-300 prose-li:leading-7 prose-li:text-base
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-violet-300 prose-code:bg-white/[0.05] prose-code:border prose-code:border-white/[0.08] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-[#0D1220] prose-pre:border prose-pre:border-white/[0.07] prose-pre:rounded-xl prose-pre:p-6
            prose-blockquote:border-l-indigo-500 prose-blockquote:text-slate-400
            prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-14 pt-8 border-t border-white/[0.06]">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 bg-white/[0.04] border border-white/[0.07] px-3 py-1 rounded-lg"
            >
              <Tag className="w-3.5 h-3.5" /> {tag}
            </span>
          ))}
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-14">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
              Related Articles
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group p-5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.13] hover:bg-white/[0.04] transition-all duration-200"
                >
                  <p className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors mb-2 leading-snug">
                    {related.title}
                  </p>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {related.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <CTASection />
      <Footer />
    </div>
  );
}

function markdownToHtml(markdown: string): string {
  return markdown
    .trim()
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code>$2</code></pre>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)/g, '<ul>$1</ul>')
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/^(?!<[hup]|<\/|$)(.+)$/gm, '<p>$1</p>')
    .replace(/\n{2,}/g, '\n');
}
