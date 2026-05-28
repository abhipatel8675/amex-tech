import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import { projects } from "@/data/projects";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

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
    <div className="bg-[#050505] text-white min-h-screen">
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
            className="inline-flex items-center gap-1.5 text-sm text-[#555] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs text-[#555] bg-[#111] border border-[#1a1a1a] px-2.5 py-1 rounded-lg">
              {project.category}
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#00dc82] hover:text-[#00dc82]/80 transition-colors"
              >
                View Live <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">{project.title}</h1>
          <p className="text-[#555] text-lg leading-relaxed max-w-2xl">{project.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs text-[#666] bg-[#111] border border-[#1a1a1a] px-3 py-1 rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Visual banner */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div
          className="w-full h-56 rounded-2xl border border-[#1a1a1a] relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.gradientFrom}20, ${project.gradientTo}20)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse at 30% 60%, ${project.gradientFrom}80, transparent 65%)`,
            }}
          />
        </div>
      </div>

      {/* Case study content */}
      <section className="pb-24 max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="md:col-span-2 flex flex-col gap-10">
            {/* Problem */}
            <div>
              <h2 className="text-xs font-semibold text-[#444] uppercase tracking-wider mb-4">
                The Challenge
              </h2>
              <p className="text-[#666] leading-relaxed">{project.problem}</p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-xs font-semibold text-[#444] uppercase tracking-wider mb-4">
                Our Solution
              </h2>
              <p className="text-[#666] leading-relaxed">{project.solution}</p>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-xs font-semibold text-[#444] uppercase tracking-wider mb-4">
                Results & Outcomes
              </h2>
              <ul className="flex flex-col gap-3">
                {project.results.map((result) => (
                  <li key={result} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-4 h-4 text-[#00dc82] flex-shrink-0 mt-0.5"
                    />
                    <span className="text-[#666] text-sm">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="p-5 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]">
              <h3 className="text-xs font-semibold text-[#444] uppercase tracking-wider mb-4">
                Project Details
              </h3>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs text-[#444] mb-0.5">Category</p>
                  <p className="text-sm text-white">{project.category}</p>
                </div>
                <div className="border-t border-[#1a1a1a] pt-3">
                  <p className="text-xs text-[#444] mb-0.5">Technologies</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-xs text-[#555] bg-[#111] border border-[#1a1a1a] px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {project.liveUrl && (
                  <div className="border-t border-[#1a1a1a] pt-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-[#00dc82] hover:text-[#00dc82]/80 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View Live Project
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]">
              <p className="text-sm font-semibold text-white mb-2">Build something similar?</p>
              <p className="text-xs text-[#555] mb-4 leading-relaxed">
                We can architect and build a custom solution tailored to your exact requirements.
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-1.5 bg-[#00dc82] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#00dc82]/90 transition-all"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
