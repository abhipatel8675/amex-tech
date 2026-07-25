import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { blogPosts } from "@/data/blog";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { ArrowLeft, Clock, Tag } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found", robots: { index: false, follow: false } };
  const fallbackDescription = post.excerpt.slice(0, 155) + (post.excerpt.length > 155 ? "…" : "");
  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? fallbackDescription;
  const authors = [{ name: post.author?.name ?? "Amex Technology" }];
  return {
    title: { absolute: title },
    description,
    keywords: post.keywords,
    authors,
    alternates: {
      canonical: `https://amextechnology.com/blog/${slug}`,
    },
    openGraph: {
      title: `${title} | Amex Technology`,
      description,
      url: `https://amextechnology.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: authors.map((a) => a.name),
      tags: post.tags,
      section: post.category,
    },
    twitter: {
      title: `${title} | Amex Technology`,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const wordCount = post.content.split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    image: post.image ?? `https://amextechnology.com/blog/${slug}/opengraph-image`,
    keywords: (post.keywords ?? post.tags).join(", "),
    wordCount,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          url: post.author.url,
        }
      : {
          "@type": "Organization",
          name: "Amex Technology",
          url: "https://amextechnology.com",
        },
    publisher: {
      "@type": "Organization",
      name: "Amex Technology",
      logo: {
        "@type": "ImageObject",
        url: "https://amextechnology.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://amextechnology.com/blog/${slug}`,
    },
  };

  const faqSchema = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://amextechnology.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://amextechnology.com/blog/${slug}` },
    ],
  };

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Navbar />
      <main>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        {/* Hero */}
        <section
          className="pt-8 pb-12 relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${post.gradientFrom}08 0%, transparent 100%)`,
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
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
                <Clock className="w-3.5 h-3.5" /> {readingMinutes} min read
              </span>
              <time className="text-sm text-slate-500" dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">{post.title}</h1>
            <p className="text-slate-300 text-xl leading-8 mb-5">{post.excerpt}</p>
            <p className="text-sm text-slate-500">By the <strong className="text-slate-400">Amex Technology</strong> Team</p>
          </div>
        </section>

        {/* Article content */}
        <article className="pb-24 max-w-7xl mx-auto px-6">
          {/* Visual banner */}
          <div className="w-full rounded-2xl border border-white/[0.07] overflow-hidden mb-12 relative">
            {post.image ? (
              <div className="relative w-full" style={{ aspectRatio: "16/7", minHeight: 320 }}>
                <Image
                  src={post.image}
                  alt={`${post.title} — guide by Amex Technology`}
                  fill
                  quality={95}
                  className={`object-cover ${post.imagePosition ?? "object-center"}`}
                  sizes="(max-width: 768px) 100vw, 1280px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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

          <BlogPostContent html={markdownToHtml(post.content)} />

            {/* Related Services */}
            {getRelatedServices(post.tags, post.category).length > 0 && (
              <div className="mt-14 pt-8 border-t border-white/[0.06]">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-5">
                  Related Services
                </h3>
                <div className="flex flex-wrap gap-3">
                  {getRelatedServices(post.tags, post.category).map((svc) => (
                    <Link
                      key={svc.href}
                      href={svc.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 px-3.5 py-1.5 rounded-lg transition-colors bg-indigo-500/[0.05] hover:bg-indigo-500/[0.1]"
                    >
                      {svc.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/[0.06]">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-400 bg-white/[0.04] border border-white/[0.07] px-3 py-1 rounded-lg"
                >
                  <Tag className="w-3.5 h-3.5" /> {tag}
                </span>
              ))}
            </div>

            {/* CTA block */}
            <div className="mt-14 p-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.05]">
              <h3 className="text-xl font-bold text-white mb-3">Need help building this?</h3>
              <p className="text-slate-300 mb-5 leading-relaxed">
                Our team specializes in exactly this kind of work. Get a free quote and honest assessment within 24 hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all btn-glow"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
              >
                Start a Project <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
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
      </main>
      <Footer />
    </div>
  );
}

type ServiceLink = { label: string; href: string };

function getRelatedServices(tags: string[], category: string): ServiceLink[] {
  const serviceMap: Record<string, ServiceLink> = {
    "Next.js": { label: "Web Development", href: "/services#web-development" },
    React: { label: "Web Development", href: "/services#web-development" },
    Frontend: { label: "Web Development", href: "/services#web-development" },
    SaaS: { label: "SaaS Development", href: "/services#saas-development" },
    API: { label: "API Development", href: "/services#api-development" },
    Email: { label: "API Development", href: "/services#api-development" },
    Supabase: { label: "SaaS Development", href: "/services#saas-development" },
    "CI/CD": { label: "DevOps & Cloud", href: "/services#devops-deployment" },
    DevOps: { label: "DevOps & Cloud", href: "/services#devops-deployment" },
    Vercel: { label: "DevOps & Cloud", href: "/services#devops-deployment" },
    Cloudflare: { label: "DevOps & Cloud", href: "/services#devops-deployment" },
    DNS: { label: "DevOps & Cloud", href: "/services#devops-deployment" },
    Deployment: { label: "DevOps & Cloud", href: "/services#devops-deployment" },
    "Mobile App": { label: "Mobile App Development", href: "/services#mobile-app-development" },
  };

  const seen = new Set<string>();
  const results: ServiceLink[] = [];

  for (const tag of tags) {
    const svc = serviceMap[tag];
    if (svc && !seen.has(svc.href)) {
      seen.add(svc.href);
      results.push(svc);
    }
  }

  if (results.length === 0) {
    if (category === "DevOps") results.push({ label: "DevOps & Cloud", href: "/services#devops-deployment" });
    else results.push({ label: "Web Development", href: "/services#web-development" });
  }

  return results.slice(0, 3);
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

  // Block images — convert before inline link processing so they don't get wrapped in <p>
  html = html.replace(/^!\[([^\]]*)\]\(([^)]+)\)$/gm, (_m, alt, src) => {
    return `<figure class="blog-figure"><img src="${src}" alt="${alt}" loading="lazy" /></figure>`;
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

  // Tables — capture header + separator + rows
  html = html.replace(/(?:^\|.+\|\n?)+/gm, (block) => {
    const lines = block.trim().split('\n').filter(l => l.trim());
    const isSeparator = (l: string) => /^\|[\s|:-]+\|$/.test(l.trim());
    const parseRow = (l: string) =>
      l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());

    const headerLine = lines[0];
    const bodyLines = lines.filter((_, i) => i > 0 && !isSeparator(lines[i]));

    const headerCells = parseRow(headerLine).map(c => `<th>${c}</th>`).join('');
    const bodyRows = bodyLines
      .map(l => `<tr>${parseRow(l).map(c => `<td>${c}</td>`).join('')}</tr>`)
      .join('');

    return `<div class="blog-table-scroll"><table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>\n`;
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
