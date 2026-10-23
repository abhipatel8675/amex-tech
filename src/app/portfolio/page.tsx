import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { categories, type Project } from "@/data/projects";
import { getProjects } from "@/lib/portfolio/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Portfolio — Client Case Studies",
  description:
    "Explore Amex Technology's portfolio of 200+ projects — web applications, mobile apps, SaaS platforms, and AI-powered products built for real businesses.",
  alternates: {
    canonical: "https://amextechnology.com/portfolio",
  },
  openGraph: {
    title: "Portfolio — Client Case Studies | Amex Technology",
    description:
      "200+ projects delivered: web apps, mobile apps, SaaS platforms, and AI products. Browse real case studies.",
    url: "https://amextechnology.com/portfolio",
  },
  twitter: {
    title: "Portfolio — Client Case Studies | Amex Technology",
    description:
      "200+ projects delivered: web apps, mobile apps, SaaS platforms, and AI products. Browse real case studies.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://amextechnology.com/portfolio" },
  ],
};

const collectionSchema = (projects: Project[]) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Portfolio — Client Case Studies",
  url: "https://amextechnology.com/portfolio",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://amextechnology.com/portfolio/${p.slug}`,
      name: p.title,
    })),
  },
});

const getStats = (projects: Project[]) => [
  { value: `${projects.length}`, label: "Case studies" },
  { value: `${categories.length - 1}`, label: "Disciplines" },
  { value: `${projects.filter((p) => p.liveUrl).length}`, label: "Live products" },
];

export default async function PortfolioPage() {
  const projects = await getProjects();
  const stats = getStats(projects);
  return (
    <div className="bg-white text-slate-900 min-h-screen antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema(projects)) }} />
      <Navbar />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]} />

        {/* Hero */}
        <section className="max-w-[92rem] mx-auto px-6 pt-8 md:pt-10 pb-12 md:pb-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1
                className="font-semibold text-slate-900 leading-[1.05]"
                style={{ fontSize: "clamp(40px, 5.2vw, 76px)", letterSpacing: "-0.035em" }}
              >
                Selected work.
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-lg leading-8 text-slate-500 max-w-md">
                Products we&rsquo;ve designed, built and shipped across AI, SaaS, web, mobile and
                automation, with the stack behind each one and what it changed for the client.
              </p>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-3 border-t border-slate-200">
            {stats.map((s) => (
              <div key={s.label} className="pt-6 pr-4">
                <dt className="text-[13px] text-slate-500">{s.label}</dt>
                <dd className="mt-1 text-3xl md:text-4xl font-medium tracking-[-0.03em] text-slate-900">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Grid */}
        <section className="max-w-[92rem] mx-auto px-6 pb-24 md:pb-32">
          <ProjectGrid projects={projects} />
        </section>

        {/* Closing CTA */}
        <section className="max-w-[92rem] mx-auto px-6 pb-24 md:pb-32">
          <div className="rounded-[28px] bg-slate-50 ring-1 ring-slate-200/70 px-6 py-16 md:py-24 text-center">
            <h2
              className="font-semibold text-slate-900 leading-tight"
              style={{ fontSize: "clamp(28px, 3.4vw, 48px)", letterSpacing: "-0.03em" }}
            >
              Have something to build?
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-lg mx-auto leading-8">
              Tell us what you&rsquo;re working on. You&rsquo;ll hear back within a day with a
              straight answer on scope, timeline and cost.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Start a project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-slate-700 ring-1 ring-slate-300 transition-colors hover:bg-white"
              >
                Explore services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
