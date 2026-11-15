import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import { AgencyCTA } from "@/components/agency/AgencySections";
import s from "@/components/agency/agency.module.css";
import { categories, type Project } from "@/data/projects";
import { getProjects } from "@/lib/portfolio/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Portfolio — Client Case Studies",
  description:
    "Real case studies from Amex Technology: web apps, mobile apps, SaaS platforms and AI products, with the problem, solution and stack for each.",
  alternates: {
    canonical: "https://amextechnology.com/portfolio",
  },
  openGraph: {
    title: "Portfolio — Client Case Studies | Amex Technology",
    description:
      "Real case studies from Amex Technology: web apps, mobile apps, SaaS platforms and AI products, with the problem, solution and stack for each.",
    url: "https://amextechnology.com/portfolio",
  },
  twitter: {
    title: "Portfolio — Client Case Studies | Amex Technology",
    description:
      "Real case studies from Amex Technology: web apps, mobile apps, SaaS platforms and AI products, with the problem, solution and stack for each.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://amextechnology.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Portfolio",
      item: "https://amextechnology.com/portfolio",
    },
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
  {
    value: `${projects.filter((p) => p.liveUrl).length}`,
    label: "Live products",
  },
];

export default async function PortfolioPage() {
  const projects = await getProjects();
  const stats = getStats(projects);
  return (
    <div className="bg-[#f7f6f2] text-[#1a211d] min-h-screen antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema(projects)),
        }}
      />
      <Navbar />
      <main id="main-content" className={s.site}>
        <section className={s.pageHero}>
          <div className={s.wrap}>
            <p className={s.eyebrow}>Ideas made real</p>
            <h1>
              Different challenges.
              <br />
              <em>The same attention to detail.</em>
            </h1>
            <p className={s.intro}>
              Explore the products we&apos;ve designed and built across web, mobile,
              SaaS, and AI, with the story and technology behind each one.
            </p>
            <dl className="mt-10 grid grid-cols-3 border-t border-[#d8dbce]">
              {stats.map((stat) => (
                <div key={stat.label} className="pt-6 pr-3">
                  <dt className="text-xs text-[#687061]">{stat.label}</dt>
                  <dd className="text-3xl font-medium tracking-tight mt-2">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section className={s.section}>
          <div className={s.wrap}>
            <ProjectGrid projects={projects} />
          </div>
        </section>
        <AgencyCTA />
      </main>
      <Footer />
    </div>
  );
}
