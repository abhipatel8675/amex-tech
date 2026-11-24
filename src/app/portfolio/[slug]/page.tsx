import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getProject, getProjects } from "@/lib/portfolio/data";
import { caseStudyFacts } from "@/data/caseStudyFacts";

export const revalidate = 3600;
import ProjectCarousel from "@/components/portfolio/ProjectCarousel";
import TechStack from "@/components/portfolio/TechStack";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

// Titles where the client name isn't the first part of the project title.
const SEO_TITLE_NAMES: Record<string, string> = {
  "portland-self-defense-crm": "Portland Self-Defense CRM",
  "we-are-tag-group": "wearetag.ai Technical SEO",
  "wharton-carpet-cleaning": "Wharton Carpet Cleaning CSS Fix",
  "wavv-ghl-integration": "Wavv + GoHighLevel Sync",
};

// Google cuts titles at ~60 chars; "%s | Amex Technology" adds 18.
function caseStudyTitle(slug: string, title: string) {
  const full = `${title} — Case Study`;
  if (full.length <= 42) return full;
  const name = SEO_TITLE_NAMES[slug] ?? title.split(/\s[—–-]\s/)[0].trim();
  return name.length <= 29 ? `${name} — Case Study` : `${name} Case Study`;
}

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found", robots: { index: false, follow: false } };
  return {
    title: caseStudyTitle(slug, project.title),
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
  const rawGallery = project.gallery ?? [];
  const hasImageInGallery = rawGallery.some((g) => g.src === project.image);
  const slides = [
    ...(project.image && !hasImageInGallery
      ? [{ src: project.image, alt: `${project.title} — ${project.shortDesc}`, caption: `${project.title} — Overview` }]
      : []),
    ...rawGallery,
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

  const facts = caseStudyFacts[slug] ?? {};
  const factItems = [
    ["Industry", facts.industry],
    ["Country", facts.country],
    ["Year", facts.year],
    ["Duration", facts.duration],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  const reviewSchema = facts.quote
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        reviewBody: facts.quote.text,
        author: { "@type": "Person", name: facts.quote.name },
        itemReviewed: { "@type": "Organization", "@id": "https://amextechnology.com/#organization" },
      }
    : null;

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
    creator: { "@id": "https://amextechnology.com/#organization" },
    about: project.technologies,
  };

  return (
    <div className="bg-[#f7f6f2] text-[#111111] min-h-screen antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
      {reviewSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      )}
      <Navbar />
      <main id="main-content">
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
              <p className="mb-3 text-sm text-[#444444]">
                {project.category} · {project.tags.slice(0, 2).join(" · ")}
              </p>
              <h1
                className="font-semibold text-[#111111] leading-[1.05]"
                style={{ fontSize: "clamp(36px, 4.6vw, 68px)", letterSpacing: "-0.035em" }}
              >
                {project.title}
              </h1>
              {factItems.length > 0 && (
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  {factItems.map(([label, value]) => (
                    <div key={label} className="flex gap-2">
                      <dt className="text-[#444444]">{label}</dt>
                      <dd className="font-medium text-[#111111]">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
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
                  style={{ background: "linear-gradient(120deg, #F5C451, #9a722a 45%, #F59E0B)" }}
                />
                <span className="relative inline-flex items-center gap-2.5 rounded-full bg-[#111111] pl-5 pr-2 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Visit live site
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-white text-[#111111] transition-transform duration-300 group-hover:rotate-45">
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
          {project.technologies.length > 0 && (
            <section className="mt-14 md:mt-16" aria-labelledby="stack-heading">
              <h2 id="stack-heading" className="mb-5 text-sm font-medium text-[#444444]">
                Tools used
              </h2>
              <TechStack technologies={project.technologies} />
            </section>
          )}

          {/* About + What we built | The problem + Results */}
          <div className="mt-16 md:mt-24 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-12">
              <section aria-labelledby="about-heading">
                <h2
                  id="about-heading"
                  className="mb-5 text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[#111111]"
                >
                  About the project
                </h2>
                <p className="text-lg leading-8 text-[#4d554b]">{project.description}</p>
              </section>

              {project.solution && (
                <section aria-labelledby="built-heading">
                  <h2
                    id="built-heading"
                    className="mb-5 text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[#111111]"
                  >
                    What we built
                  </h2>
                  <p className="text-lg leading-8 text-[#4d554b]">{project.solution}</p>
                </section>
              )}
            </div>

            <div className="lg:col-span-5 space-y-12">
              {project.problem && (
                <section aria-labelledby="problem-heading">
                  <h2
                    id="problem-heading"
                    className="mb-5 text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[#111111]"
                  >
                    The problem
                  </h2>
                  <p className="text-base leading-7 text-[#444444]">{project.problem}</p>
                </section>
              )}

              {project.results.length > 0 && (
                <section aria-labelledby="results-heading">
                  <h2
                    id="results-heading"
                    className="mb-5 text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-[#111111]"
                  >
                    Results
                  </h2>
                  <ul className="divide-y divide-[#dadcd1] border-y border-[#dadcd1]">
                    {project.results.map((r) => (
                      <li key={r} className="flex items-start gap-3 py-4">
                        <Check className="mt-1 w-4 h-4 shrink-0 text-emerald-600" />
                        <span className="text-[15px] leading-7 text-[#3d453b]">{r}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          {facts.quote && (
            <figure className="mt-16 md:mt-20 max-w-3xl border-l-2 border-[#CC9A1A] pl-6">
              <blockquote className="text-xl leading-8 text-[#111111]">&ldquo;{facts.quote.text}&rdquo;</blockquote>
              <figcaption className="mt-3 text-sm text-[#444444]">
                {facts.quote.name}
                {facts.quote.role ? `, ${facts.quote.role}` : ""}
              </figcaption>
            </figure>
          )}

          <section
            aria-labelledby="similar-heading"
            className="mt-16 md:mt-24 rounded-[24px] bg-[#111111] px-6 py-10 md:px-12 md:py-14 text-white"
          >
            <h2 id="similar-heading" className="text-2xl md:text-3xl font-semibold tracking-[-0.025em]">
              Want something like this?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-white/70">
              Tell us what you&apos;re building and we&apos;ll reply with practical next steps and a written quote.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F5C451] px-6 py-3 text-sm font-semibold text-[#0f0f0f] transition-transform hover:-translate-y-0.5"
            >
              Start a similar project <ArrowUpRight className="w-4 h-4" />
            </Link>
          </section>

          <div className="mt-20 md:mt-28 pt-8 border-t border-[#dadcd1]">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#4d554b] transition-colors hover:text-[#111111]"
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
