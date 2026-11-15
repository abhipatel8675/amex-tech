import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import type { LocalPage } from "@/data/localPages";
import { projects } from "@/data/projects";
import s from "@/components/agency/agency.module.css";

const BASE_URL = "https://amextechnology.com";

export function localPageMetadata(page: LocalPage): Metadata {
  const url = `${BASE_URL}/${page.slug}`;
  const fullTitle = `${page.title} | Amex Technology`;
  return {
    title: { absolute: fullTitle },
    description: page.description,
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description: page.description, url },
    twitter: { title: fullTitle, description: page.description },
  };
}

export default function LocalLandingPage({ page }: { page: LocalPage }) {
  const url = `${BASE_URL}/${page.slug}`;
  const contactHref = `/contact?service=${encodeURIComponent(page.service)}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.title,
    description: page.description,
    url,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Los Angeles", containedInPlace: { "@type": "State", name: "California" } },
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
      { "@type": "ListItem", position: 2, name: "Los Angeles", item: `${BASE_URL}/los-angeles` },
      { "@type": "ListItem", position: 3, name: page.breadcrumb, item: url },
    ],
  };

  const work = (page.work ?? ["island-traffic-defense", "goswiftfund", "wolfe-property"])
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p?.image));

  const cta = (
    <Link className={s.button} href={contactHref}>
      {page.ctaLabel} <ArrowUpRight size={17} />
    </Link>
  );

  return (
    <div className={s.site}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main id="main-content">
        <section className={`${s.pageHero} ${s.pageHeroCompact}`}>
          <div className={s.wrap}>
            <Breadcrumb
              variant="inline"
              className={s.crumbs}
              items={[{ label: "Home", href: "/" }, { label: "Los Angeles", href: "/los-angeles" }, { label: page.breadcrumb }]}
            />
            <p className={s.eyebrow}>{page.eyebrow}</p>
            <h1>{page.h1}</h1>
            <p className={s.intro} style={{ maxWidth: 640 }}>
              {page.intro}
            </p>
            <div className={s.actions}>
              {cta}
              {page.priceNote && <span className={s.priceNote}>{page.priceNote}</span>}
            </div>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <h2 className={s.heading}>{page.includedTitle}</h2>
            </div>
            <div className={s.serviceGrid}>
              {page.included.map((item, i) => (
                <article key={item.title} className={s.service}>
                  <div className={s.serviceTop}>
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {work.length > 0 && (
          <section className={`${s.section} border-t border-[#dadcd1]`}>
            <div className={s.wrap}>
              <div className={s.sectionHead}>
                <div>
                  <p className={s.eyebrow}>Previous work</p>
                  <h2 className={s.heading}>Sites we&apos;ve built for clients</h2>
                </div>
                <Link href="/portfolio" className={s.textLink}>
                  View all projects <ArrowUpRight size={17} />
                </Link>
              </div>
              <div className={`${s.workGrid} ${s.workGrid3}`}>
                {work.map((p) => (
                  <article className={s.workCard} key={p.slug}>
                    <Link href={`/portfolio/${p.slug}`} className={s.workImage}>
                      <Image
                        src={p.image!}
                        alt={`${p.title}: ${p.shortDesc}`}
                        fill
                        sizes="(max-width: 800px) 100vw, 33vw"
                      />
                    </Link>
                    <div className={s.workMeta}>
                      <div>
                        <span>{p.tags.slice(0, 2).join(" / ")}</span>
                        <h3 className="mt-2">{p.title}</h3>
                      </div>
                      <Link href={`/portfolio/${p.slug}`} aria-label={`Read ${p.title} case study`}>
                        <ArrowUpRight size={19} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={`${s.section} ${s.band}`}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <h2 className={s.heading}>{page.problemsTitle}</h2>
            </div>
            <ul className={s.checks}>
              {page.problems.map((p) => (
                <li key={p}>
                  <Check size={18} aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className={`${s.sectionText} mt-8`} style={{ maxWidth: 640 }}>
              Want to see where your current site stands? Try our free{" "}
              <Link href="/tools/website-grader" className={s.goldLink}>
                Website Grader
              </Link>
              .
            </p>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <h2 className={s.heading}>{page.stepsTitle}</h2>
            <ol
              className={`${s.process} ${s.processAuto}`}
              style={{ "--cols": page.steps.length } as CSSProperties}
            >
              {page.steps.map((step, i) => (
                <li key={step.title} className={s.processStep}>
                  <span>0{i + 1} /</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${s.section} border-t border-[#dadcd1]`}>
          <div className={`${s.wrap} ${s.faqGrid}`}>
            <div>
              <p className={s.eyebrow}>Questions</p>
              <h2 className={s.heading}>Questions</h2>
            </div>
            <div className={s.faq}>
              {page.faq.map((q) => (
                <details key={q.question}>
                  <summary>{q.question}</summary>
                  <p>{q.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={s.cta}>
          <div className={`${s.wrap} ${s.ctaInner}`}>
            <div>
              <h2 className={s.heading}>Ready to get started?</h2>
              <p>
                Send a short message and we&apos;ll reply with questions or a time for a quick call. No work starts until you
                approve a written quote.
              </p>
            </div>
            {cta}
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.eyebrow}>Related</p>
            <div className={s.chips}>
              {page.related.map((r) => (
                <Link key={r.href} href={r.href}>
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
