import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CaseStudyGallery from "@/components/portfolio/CaseStudyGallery";
import BrowserMockup from "@/components/ui/BrowserMockup";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { projects } from "@/data/projects";
import { isDeviceMockup } from "@/lib/portfolioImages";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
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

const heroAccents: Record<string, string> = {
  "molar-ai": "linear-gradient(160deg, #F1F5F9 0%, #FFFFFF 60%)",
  "periscope-email": "linear-gradient(160deg, #F1F5F9 0%, #FFFFFF 60%)",
  "herruby-app": "linear-gradient(160deg, #F1F5F9 0%, #FFFFFF 60%)",
  "hmd": "linear-gradient(160deg, #F1F5F9 0%, #FFFFFF 60%)",
  "zenscroll": "linear-gradient(160deg, #F1F5F9 0%, #FFFFFF 60%)",
  "expert-village-media": "linear-gradient(160deg, #F1F5F9 0%, #FFFFFF 60%)",
  "torqron": "linear-gradient(160deg, #F1F5F9 0%, #FFFFFF 60%)",
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const isMobile = project.category === "Mobile App";
  const heroBg = heroAccents[slug] ?? "linear-gradient(160deg, #F1F5F9 0%, #FFFFFF 60%)";

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
    <div className="bg-white text-slate-900 min-h-screen">
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

        {/* ─── Hero ─── */}
        <section
          className="relative pt-6 pb-0"
          style={{ background: heroBg }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.04) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 pointer-events-none blur-3xl"
            style={{ background: `radial-gradient(ellipse, ${project.gradientFrom}, transparent 70%)` }}
          />

          <div className="relative max-w-[92rem] mx-auto px-6">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors hover:text-slate-900"
              style={{ color: "#64748B" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full border"
                style={{
                  color: project.gradientFrom,
                  borderColor: `${project.gradientFrom}35`,
                  background: `${project.gradientFrom}10`,
                }}
              >
                {project.category}
              </span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: project.gradientFrom }}
                >
                  View Live <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              {project.title}
            </h1>
            <p className="text-lg md:text-xl leading-8 max-w-2xl mb-8" style={{ color: "#475569" }}>
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-10">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-sm text-slate-600 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Device mockup — floats into content below */}
          <div className="relative max-w-[92rem] mx-auto px-6 -mb-16 z-10">
            {isMobile ? (
              <div className="flex justify-center gap-4 sm:gap-8 pb-4">
                <PhoneMockup
                  src={project.image}
                  alt={`${project.title} — ${project.shortDesc}`}
                  tiltDeg={-4}
                  className="shadow-2xl"
                />
                {project.gallery?.[0] && (
                  <PhoneMockup
                    src={project.gallery[0].src}
                    alt={project.gallery[0].alt}
                    tiltDeg={4}
                    className="shadow-2xl"
                  />
                )}
              </div>
            ) : isDeviceMockup(project.image) ? (
              <Image
                src={project.image!}
                alt={`${project.title} — ${project.shortDesc}`}
                width={1600}
                height={1200}
                priority
                sizes="(min-width: 1280px) 1100px, 100vw"
                className="mx-auto w-full max-w-[1100px] h-auto rounded-2xl shadow-2xl"
              />
            ) : (
              <BrowserMockup
                src={project.image}
                alt={`${project.title} — ${project.shortDesc}`}
                url={project.liveUrl?.replace("https://", "") ?? "project.app"}
                aspectRatio="16/9"
                className="shadow-2xl"
              />
            )}
          </div>
        </section>

        {/* ─── Case Study Content ─── */}
        <article className="pb-28 max-w-[92rem] mx-auto px-6 pt-24">
          <div className="grid md:grid-cols-3 gap-12">

            {/* Main column */}
            <div className="md:col-span-2 flex flex-col gap-14">

              {/* Challenge */}
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -top-3 -left-2 font-bold select-none pointer-events-none"
                  style={{ fontSize: 80, lineHeight: 1, color: "rgba(15,23,42,0.025)" }}
                >
                  01
                </span>
                <p
                  className="relative mb-3 font-semibold uppercase"
                  style={{ fontSize: 11, letterSpacing: "0.15em", color: "#64748B" }}
                >
                  The Challenge
                </p>
                <h2 className="relative text-xl font-bold text-slate-900 mb-4" style={{ letterSpacing: "-0.015em" }}>
                  What needed solving
                </h2>
                <p className="relative text-base leading-8" style={{ color: "#475569" }}>
                  {project.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -top-3 -left-2 font-bold select-none pointer-events-none"
                  style={{ fontSize: 80, lineHeight: 1, color: "rgba(15,23,42,0.025)" }}
                >
                  02
                </span>
                <p
                  className="relative mb-3 font-semibold uppercase"
                  style={{ fontSize: 11, letterSpacing: "0.15em", color: "#64748B" }}
                >
                  Our Solution
                </p>
                <h2 className="relative text-xl font-bold text-slate-900 mb-4" style={{ letterSpacing: "-0.015em" }}>
                  How we built it
                </h2>
                <p className="relative text-base leading-8" style={{ color: "#475569" }}>
                  {project.solution}
                </p>
              </div>

              {/* Results */}
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -top-3 -left-2 font-bold select-none pointer-events-none"
                  style={{ fontSize: 80, lineHeight: 1, color: "rgba(15,23,42,0.025)" }}
                >
                  03
                </span>
                <p
                  className="relative mb-3 font-semibold uppercase"
                  style={{ fontSize: 11, letterSpacing: "0.15em", color: "#64748B" }}
                >
                  Results & Outcomes
                </p>
                <h2 className="relative text-xl font-bold text-slate-900 mb-6" style={{ letterSpacing: "-0.015em" }}>
                  What we achieved
                </h2>
                <ul className="relative flex flex-col gap-4">
                  {project.results.map((result) => (
                    <li key={result} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-5 h-5 shrink-0 mt-0.5"
                        style={{ color: project.gradientFrom }}
                      />
                      <span className="text-base leading-7" style={{ color: "#475569" }}>
                        {result}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {/* Project details card */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <h3
                  className="mb-5 font-semibold uppercase"
                  style={{ fontSize: 10, letterSpacing: "0.15em", color: "#64748B" }}
                >
                  Project Details
                </h3>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-xs text-slate-500 mb-1.5">Category</p>
                    <p className="text-sm font-semibold text-slate-900">{project.category}</p>
                  </div>
                  <div className="border-t border-slate-200 pt-5">
                    <p className="text-xs text-slate-500 mb-3">Technologies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-xs text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.tags.length > 0 && (
                    <div className="border-t border-slate-200 pt-5">
                      <p className="text-xs text-slate-500 mb-3">Tags</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.liveUrl && (
                    <div className="border-t border-slate-200 pt-5">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                        style={{ color: project.gradientFrom }}
                      >
                        <ExternalLink className="w-4 h-4" /> View Live Project
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA card */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <p className="text-base font-semibold text-slate-900 mb-2">Build something similar?</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#64748B" }}>
                  We can architect and build a custom solution tailored to your exact requirements.
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-white py-3 rounded-xl transition-all duration-200 btn-glow"
                  style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B89225 100%)" }}
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* ─── Gallery ─── */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="pb-28 max-w-[92rem] mx-auto px-6">
            <CaseStudyGallery
              gallery={project.gallery.filter((g) => g.src !== project.image)}
              isMobile={isMobile}
              accentColor={project.gradientFrom}
              liveUrl={project.liveUrl}
              projectTitle={project.title}
            />
          </section>
        )}

        <CTASection />
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
