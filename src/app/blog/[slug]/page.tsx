import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
        <div className="w-full rounded-2xl border border-white/[0.07] overflow-hidden mb-12 relative">
          {post.image ? (
            <div className="relative w-full h-72">
              <Image
                src={post.image}
                alt={post.title}
                fill
                quality={95}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          ) : (
            <div
              className="w-full h-52"
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
          )}
        </div>

        {/* Prose content */}
        <div
          className="blog-content"
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
  const codeBlocks: string[] = [];

  // Protect fenced code blocks — extract them so inner lines aren't mangled
  let html = markdown.trim().replace(/```(?:\w+)?\n([\s\S]*?)```/g, (_m, code) => {
    const idx = codeBlocks.length;
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    codeBlocks.push(`<pre><code>${escaped}</code></pre>`);
    return `\n\n__CB_${idx}__\n\n`;
  });

  // Inline formatting
  html = html
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Headings (### before ## so ## doesn't partially match ###)
  html = html
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>');

  // Ordered lists — capture consecutive numbered lines as one block
  html = html.replace(/(?:^\d+\. .+$\n?)+/gm, (block) => {
    const items = block.trim().split('\n')
      .map(line => `<li>${line.replace(/^\d+\.\s*/, '')}</li>`)
      .join('');
    return `<ol>${items}</ol>\n`;
  });

  // Unordered lists — capture consecutive bullet lines as one block
  html = html.replace(/(?:^- .+$\n?)+/gm, (block) => {
    const items = block.trim().split('\n')
      .map(line => `<li>${line.replace(/^-\s*/, '')}</li>`)
      .join('');
    return `<ul>${items}</ul>\n`;
  });

  // Wrap bare text lines in <p> (skip lines that are already HTML tags or placeholders)
  html = html.replace(/^(?!<|__CB_|$)(.+)$/gm, '<p>$1</p>');

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    html = html.replace(`__CB_${i}__`, block);
  });

  // Collapse extra blank lines
  html = html.replace(/\n{2,}/g, '\n');

  return html;
}
