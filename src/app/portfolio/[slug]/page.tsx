import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import { projects } from "@/data/projects";
import { ArrowLeft, ExternalLink, CheckCircle2, Images } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.shortDesc,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${project.gradientFrom}08 0%, transparent 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-slate-400 bg-white/[0.04] border border-white/[0.07] px-3 py-1 rounded-lg">
              {project.category}
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View Live <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">{project.title}</h1>
          <p className="text-slate-300 text-xl leading-8 max-w-2xl">{project.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-sm text-slate-300 bg-white/[0.04] border border-white/[0.07] px-3.5 py-1.5 rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Visual banner */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        {project.image ? (
          <div className="w-full rounded-2xl border border-white/[0.07] overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              width={1280}
              height={800}
              className="w-full h-auto block"
              priority
            />
          </div>
        ) : (
          <div
            className="w-full h-60 rounded-2xl border border-white/[0.07] relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${project.gradientFrom}20, ${project.gradientTo}20)` }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: `radial-gradient(ellipse at 30% 60%, ${project.gradientFrom}80, transparent 65%)` }}
            />
          </div>
        )}
      </div>

      {/* Case study content */}
      <section className="pb-28 max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="md:col-span-2 flex flex-col gap-12">
            {/* Problem */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
                The Challenge
              </h2>
              <p className="text-base text-slate-300 leading-8">{project.problem}</p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
                Our Solution
              </h2>
              <p className="text-base text-slate-300 leading-8">{project.solution}</p>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
                Results & Outcomes
              </h2>
              <ul className="flex flex-col gap-4">
                {project.results.map((result) => (
                  <li key={result} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                    <span className="text-base text-slate-300 leading-7">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
                Project Details
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Category</p>
                  <p className="text-base text-white font-medium">{project.category}</p>
                </div>
                <div className="border-t border-white/[0.06] pt-4">
                  <p className="text-sm text-slate-500 mb-3">Technologies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-sm text-slate-400 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {project.liveUrl && (
                  <div className="border-t border-white/[0.06] pt-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-base font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> View Live Project
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <p className="text-base font-semibold text-white mb-2">Build something similar?</p>
              <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                We can architect and build a custom solution tailored to your exact requirements.
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 text-base font-semibold text-white py-3 rounded-xl transition-all duration-200 btn-glow"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-28 max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <Images className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
              Product Gallery
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] flex flex-col ${
                  img.span === "wide" ? "col-span-2 md:col-span-3" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    img.span === "wide" ? "aspect-[16/7]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={img.span === "wide" ? "100vw" : "(max-width: 768px) 50vw, 33vw"}
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="px-4 py-3 border-t border-white/[0.05]">
                  <p className="text-xs text-slate-500 leading-relaxed">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
    </div>
  );
}
