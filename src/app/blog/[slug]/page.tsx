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
    <div className="bg-[#050505] text-white min-h-screen">
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
            className="inline-flex items-center gap-1.5 text-sm text-[#555] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs text-[#555] bg-[#111] border border-[#1a1a1a] px-2.5 py-1 rounded-lg">
              {post.category}
            </span>
            <span className="text-xs text-[#444] flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
            <span className="text-xs text-[#444]">{post.publishedAt}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">{post.title}</h1>
          <p className="text-[#555] text-lg leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* Article content */}
      <article className="pb-24 max-w-3xl mx-auto px-6">
        {/* Visual banner */}
        <div
          className="w-full h-48 rounded-2xl border border-[#1a1a1a] overflow-hidden mb-12 relative"
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
          className="prose prose-sm prose-invert max-w-none
            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-base prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#666] prose-p:leading-relaxed prose-p:my-4
            prose-li:text-[#666] prose-li:leading-relaxed
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-[#00dc82] prose-code:bg-[#111] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
            prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-[#1a1a1a] prose-pre:rounded-xl prose-pre:p-5
            prose-blockquote:border-l-[#00dc82] prose-blockquote:text-[#555]
            prose-a:text-[#00dc82] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[#1a1a1a]">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs text-[#555] bg-[#111] border border-[#1a1a1a] px-2.5 py-1 rounded-lg"
            >
              <Tag className="w-3 h-3" /> {tag}
            </span>
          ))}
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-sm font-semibold text-[#444] uppercase tracking-wider mb-5">
              Related Articles
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group p-4 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#2a2a2a] transition-colors"
                >
                  <p className="text-sm font-semibold text-white group-hover:text-[#00dc82] transition-colors mb-1">
                    {related.title}
                  </p>
                  <p className="text-xs text-[#444] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {related.readTime}
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
