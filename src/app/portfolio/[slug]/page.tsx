import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getProject, getProjects } from "@/lib/portfolio/data";

export const revalidate = 3600;
import ProjectCarousel from "@/components/portfolio/ProjectCarousel";
import TechStack from "@/components/portfolio/TechStack";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found", robots: { index: false, follow: false } };
  return {
    title: `${project.title} — Case Study`,
    description: clampDescription(`${project.shortDesc} See how Amex Technology built ${project.title}.`),
    keywords: project.tags,
    alternates: {
      canonical: `https://amextechnology.com/portfolio/${slug}`,
    },
    openGraph: {
      title: `${project.title} Case Study | Amex Technology`,
      description: `${project.shortDesc} See how Amex Technology built ${project.title}.`,
      url: `https://amextechnology.com/portfolio/${slug}`,
      type: "article",
    },
    twitter: {
      title: `${project.title} Case Study | Amex Technology`,
      description: `${project.shortDesc} See how Amex Technology built ${project.title}.`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const isMobile = project.category === "Mobile App";
  const slides = [
    ...(project.image ? [{ src: project.image, alt: `${project.title} — ${project.shortDesc}` }] : []),
    ...(project.gallery ?? []).filter((g) => g.src !== project.image),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://amextechnology.com/portfolio" },
      { "@type": "ListItem", position: 3, name: project.title, item: `https://amextechnology.com/portfolio/${slug}` },
    ],
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title} — Case Study`,
    description: project.shortDesc,
    url: `https://amextechnology.com/portfolio/${slug}`,
    image: project.image
      ? `https://amextechnology.com${project.image}`
      : `https://amextechnology.com/portfolio/${slug}/opengraph-image`,
    keywords: project.tags.join(", "),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    creator: {
      "@type": "Organization",
      name: "Amex Technology",
      url: "https://amextechnology.com",
    },
    about: project.technologies,
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
      <Navbar />
      <main>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/portfolio" },
            { label: project.title },
          ]}
        />

        <article className="max-w-[92rem] mx-auto px-6 pt-8 md:pt-10 pb-24 md:pb-32">
          {/* Header */}
          <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="mb-3 text-sm text-slate-500">
                {project.category} · {project.tags.slice(0, 2).join(" · ")}
              </p>
              <h1
                className="font-semibold text-slate-900 leading-[1.05]"
                style={{ fontSize: "clamp(36px, 4.6vw, 68px)", letterSpacing: "-0.035em" }}
              >
                {project.title}
              </h1>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex shrink-0 self-start md:self-auto"
              >
                {/* Glow */}
                <span
                  aria-hidden
                  className="absolute -inset-1.5 rounded-full opacity-70 blur-lg animate-pulse transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "linear-gradient(120deg, #F5C451, #B8860B 45%, #F59E0B)" }}
                />
                <span className="relative inline-flex items-center gap-2.5 rounded-full bg-slate-900 pl-5 pr-2 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Visit live site
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-white text-slate-900 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </span>
              </a>
            )}
          </header>

          {/* Images */}
          {slides.length > 0 && (
            <ProjectCarousel slides={slides} contain={isMobile} />
          )}

          {/* Tech stack */}
          <section className="mt-14 md:mt-16" aria-labelledby="stack-heading">
            <h2 id="stack-heading" className="mb-5 text-sm font-medium text-slate-500">
              Tech stack
            </h2>
            <TechStack technologies={project.technologies} />
          </section>

          {/* About + What we solved */}
          <div className="mt-16 md:mt-24 grid gap-16 lg:grid-cols-12">
            <section className="lg:col-span-7" aria-labelledby="about-heading">
              <h2
                id="about-heading"
                className="mb-5 text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-slate-900"
              >
                About the project
              </h2>
              <p className="text-lg leading-8 text-slate-600">{project.description}</p>
            </section>

            <section className="lg:col-span-5" aria-labelledby="solved-heading">
              <h2
                id="solved-heading"
                className="mb-5 text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-slate-900"
              >
                What we solved
              </h2>
              <p className="mb-6 text-base leading-7 text-slate-500">{project.problem}</p>
              <ul className="divide-y divide-slate-200 border-y border-slate-200">
                {project.results.map((r) => (
                  <li key={r} className="flex items-start gap-3 py-4">
                    <Check className="mt-1 w-4 h-4 shrink-0 text-emerald-600" />
                    <span className="text-[15px] leading-7 text-slate-700">{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-20 md:mt-28 pt-8 border-t border-slate-200">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" /> All projects
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

// Keep meta descriptions within ~155 characters so Google doesn't truncate them mid-word.
function clampDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:—-]\s*$/, "") + "…";
}
