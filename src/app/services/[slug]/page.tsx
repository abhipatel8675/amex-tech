import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { services } from "@/data/services";
import { servicePages } from "@/data/servicePages";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";

const BASE_URL = "https://amextechnology.com";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return services.filter((s) => servicePages[s.slug]).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePages[slug];
  if (!page) return {};
  const url = `${BASE_URL}/services/${slug}`;
  return {
    title: { absolute: `${page.metaTitle} | Amex Technology` },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: `${page.metaTitle} | Amex Technology`, description: page.metaDescription, url },
    twitter: { title: `${page.metaTitle} | Amex Technology`, description: page.metaDescription },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const page = servicePages[slug];
  if (!service || !page) notFound();

  const url = `${BASE_URL}/services/${slug}`;
  const related = page.projectSlugs
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  const posts = page.blogSlugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is (typeof blogPosts)[number] => Boolean(p));
  const others = services.filter((s) => s.slug !== slug && servicePages[s.slug]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: page.metaDescription,
    url,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: ["United States", "Canada", "United Kingdom", "Australia", "India"],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />

        <section className="pt-8 pb-12 max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-wider mb-4">Services</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">{page.h1}</h1>
          {page.intro.map((p) => (
            <p key={p.slice(0, 24)} className="text-slate-700 text-lg md:text-xl leading-8 mb-5">
              {p}
            </p>
          ))}
          <div className="flex flex-wrap gap-2 mb-8">
            {service.technologies.map((t) => (
              <span key={t} className="text-sm text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                {t}
              </span>
            ))}
          </div>
          <Link
            href={`/contact?service=${encodeURIComponent(service.title)}`}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white bg-[#111827] hover:bg-black transition-colors"
          >
            Get a free quote <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">What we build</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {page.deliverables.map((d) => (
              <div key={d.title} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
                <p className="text-slate-600 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Who it&apos;s for</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {page.whoFor.map((w) => (
              <li key={w} className="flex gap-3 text-slate-700 leading-relaxed">
                <Check className="w-5 h-5 mt-0.5 shrink-0 text-[#B8860B]" aria-hidden />
                {w}
              </li>
            ))}
          </ul>
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">How we work</h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {page.process.map((step, i) => (
              <li key={step.title} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <span className="text-sm font-semibold text-[#7A5807]">Step {i + 1}</span>
                <h3 className="text-lg font-semibold mt-2 mb-2">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="text-slate-600 mt-6 leading-relaxed">
            Our development team is in India and our founder, Abhi Patel, is based in the Los Angeles area, so US clients
            get working hours that overlap with theirs.{" "}
            <Link href="/los-angeles" className="font-semibold text-[#7A5807] hover:underline">
              Working with Los Angeles businesses
            </Link>
            .
          </p>
        </section>

        {related.length > 0 && (
          <section className="pb-12 max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6">Related work</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/portfolio/${p.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-slate-300 transition-colors"
                >
                  {p.image && (
                    <div className="relative aspect-[16/10] bg-slate-100">
                      <Image src={p.image} alt={`${p.title} project`} fill sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="font-semibold group-hover:text-[#7A5807] transition-colors">{p.title}</p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{p.shortDesc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Questions</h2>
          <div className="space-y-4">
            {page.faq.map((q) => (
              <div key={q.question} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <h3 className="font-semibold mb-2">{q.question}</h3>
                <p className="text-slate-600 leading-relaxed">{q.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {posts.length > 0 && (
          <section className="pb-12 max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6">Guides from our blog</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group p-5 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100 transition-all duration-200"
                >
                  <p className="font-semibold text-slate-900 group-hover:text-[#7A5807] transition-colors leading-snug">{post.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="pb-20 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Other services</h2>
          <div className="flex flex-wrap gap-2">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="text-sm font-medium text-slate-700 border border-slate-200 bg-white px-4 py-2 rounded-xl hover:border-[#B8860B] hover:text-[#7A5807] transition-colors"
              >
                {s.title}
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
