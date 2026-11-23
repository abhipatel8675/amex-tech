import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Crumbs from "@/components/site/Crumbs";
import ContactBand from "@/components/site/ContactBand";
import ProjectGallery, { type GalleryItem } from "@/components/portfolio/ProjectGallery";
import { getProjects } from "@/lib/portfolio/data";
import { projectKind, projectSummary } from "@/data/projectPlain";
import { projectLeadImage } from "@/lib/portfolio/images";
import inner from "@/components/site/inner.module.css";
import s from "@/components/portfolio/portfolio.module.css";

export const revalidate = 3600;

const TITLE = "Our Work: Websites, Apps and AI Projects We Have Delivered";
const DESCRIPTION =
  "See the websites, apps, online stores and AI tools Amex Technology has delivered for clients around the world, with what each client needed and how it turned out.";

export const metadata: Metadata = {
  title: "Our Work: Projects We Have Delivered",
  description: DESCRIPTION,
  alternates: { canonical: "https://amextechnology.com/portfolio" },
  openGraph: { title: `${TITLE} | Amex Technology`, description: DESCRIPTION, url: "https://amextechnology.com/portfolio" },
  twitter: { title: `${TITLE} | Amex Technology`, description: DESCRIPTION },
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  const items: GalleryItem[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    kind: projectKind(p),
    summary: projectSummary(p),
    image: projectLeadImage(p),
    alt: `${p.title}: ${projectSummary(p)}`,
  }));
  const live = projects.filter((p) => p.liveUrl).length;
  const mosaic = ["firmsledger", "goswiftfund", "molar-ai", "island-traffic-defense"]
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p && projectLeadImage(p)));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
      { "@type": "ListItem", position: 2, name: "Our work", item: "https://amextechnology.com/portfolio" },
    ],
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
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
  };

  return (
    <div className={inner.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Navbar />
      <main id="main-content">
        <section className={s.listHero}>
          <div className={inner.glow} aria-hidden="true" />
          <div className={`${inner.wrap} ${s.listHeroGrid}`}>
            <div>
              <Crumbs items={[{ label: "Home", href: "/" }, { label: "Our work" }]} />
              <h1 className={inner.h1}>Real projects for real businesses</h1>
              <p className={inner.lead}>
                Websites, apps and AI tools we have built for clients around the world. Open any project to see what the
                client needed, what we did and how it turned out.
              </p>
              <ul className={s.statCards}>
                <li>
                  <strong>{projects.length}</strong>
                  <span>projects delivered</span>
                </li>
                <li>
                  <strong>{live}</strong>
                  <span>live sites and apps you can visit</span>
                </li>
                <li>
                  <strong>5 years</strong>
                  <span>building for clients</span>
                </li>
              </ul>
            </div>
            <div className={s.mosaic} aria-hidden="true">
              {mosaic.map((p, i) => (
                <span key={p.slug} className={s.mosaicTile} style={{ ["--i" as string]: i }}>
                  <Image src={projectLeadImage(p)!} alt="" fill sizes="(max-width: 1000px) 45vw, 22vw" preload={i < 2} />
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className={`${inner.section} ${inner.sand}`}>
          <div className={inner.wrap}>
            <ProjectGallery items={items} />
          </div>
        </section>

        <ContactBand />
      </main>
      <Footer />
    </div>
  );
}
