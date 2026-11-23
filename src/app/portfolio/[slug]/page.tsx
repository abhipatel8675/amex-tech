import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Target } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Crumbs from "@/components/site/Crumbs";
import ContactBand from "@/components/site/ContactBand";
import Reveal from "@/components/site/Reveal";
import TechStack from "@/components/portfolio/TechStack";
import { getProject, getProjects } from "@/lib/portfolio/data";
import { projectLeadImage } from "@/lib/portfolio/images";
import { caseStudyFacts } from "@/data/caseStudyFacts";
import { kindService, plainTags, projectKind, projectSummary } from "@/data/projectPlain";
import { services } from "@/data/services";
import inner from "@/components/site/inner.module.css";
import s from "@/components/portfolio/portfolio.module.css";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

// Titles where the client name isn't the first part of the project title.
const SEO_TITLE_NAMES: Record<string, string> = {
  "portland-self-defense-crm": "Portland Self-Defense CRM",
  "portland-self-defense": "Portland Self-Defense",
  "we-are-tag-group": "wearetag.ai Technical SEO",
  "wharton-carpet-cleaning": "Wharton Carpet Cleaning Fix",
  "wavv-ghl-integration": "Wavv Customer Sync",
};

// Google cuts titles at ~60 chars; "%s | Amex Technology" adds 18.
function caseStudyTitle(slug: string, title: string) {
  const full = `${title}: Case Study`;
  if (full.length <= 42) return full;
  const name = SEO_TITLE_NAMES[slug] ?? title.split(/\s[—–-]\s/)[0].trim();
  return name.length <= 29 ? `${name}: Case Study` : `${name} Case Study`;
}

// Keep meta descriptions within ~155 characters so Google doesn't truncate them mid-word.
function clampDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:—-]\s*$/, "") + "…";
}

// Splits "First sentence. The rest." so the key point can lead and the detail can follow.
function splitFirstSentence(text: string): [string, string] {
  const m = text.match(/^(.+?[.!?])(\s+|$)/);
  return m ? [m[1], text.slice(m[0].length)] : [text, ""];
}

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found", robots: { index: false, follow: false } };
  const summary = projectSummary(project);
  const description = clampDescription(`${summary} See how Amex Technology delivered it.`);
  const keywords = plainTags(project);
  return {
    title: caseStudyTitle(slug, project.title),
    description,
    ...(keywords.length ? { keywords } : {}),
    alternates: { canonical: `https://amextechnology.com/portfolio/${slug}` },
    openGraph: {
      title: `${project.title} Case Study | Amex Technology`,
      description,
      url: `https://amextechnology.com/portfolio/${slug}`,
      type: "article",
    },
    twitter: { title: `${project.title} Case Study | Amex Technology`, description },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const all = await getProjects();
  const kind = projectKind(project);
  const summary = projectSummary(project);
  const lead = projectLeadImage(project);
  const contain = kind === "Mobile apps";
  const shots = (project.gallery ?? []).filter((g) => g.src !== lead);
  const service = services.find((x) => x.slug === kindService[kind]);
  const related = all.filter((p) => p.slug !== slug && projectKind(p) === kind && projectLeadImage(p)).slice(0, 3);

  const [needLead, needRest] = project.problem ? splitFirstSentence(project.problem) : ["", ""];

  const facts = caseStudyFacts[slug] ?? {};
  const factItems = [
    ["Industry", facts.industry],
    ["Country", facts.country],
    ["Year", facts.year],
    ["Duration", facts.duration],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  const url = `https://amextechnology.com/portfolio/${slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
      { "@type": "ListItem", position: 2, name: "Our work", item: "https://amextechnology.com/portfolio" },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title}: Case Study`,
    description: summary,
    url,
    image: lead ? `https://amextechnology.com${lead}` : `https://amextechnology.com/portfolio/${slug}/opengraph-image`,
    keywords: plainTags(project).join(", "),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    creator: { "@id": "https://amextechnology.com/#organization" },
    about: project.technologies,
  };
  const reviewSchema = facts.quote
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        reviewBody: facts.quote.text,
        author: { "@type": "Person", name: facts.quote.name },
        itemReviewed: { "@type": "Organization", "@id": "https://amextechnology.com/#organization" },
      }
    : null;

  return (
    <div className={inner.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
      {reviewSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />}
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className={inner.hero}>
          <div className={inner.glow} aria-hidden="true" />
          <div className={`${inner.wrap} ${inner.heroInner}`}>
            <Crumbs items={[{ label: "Home", href: "/" }, { label: "Our work", href: "/portfolio" }, { label: project.title }]} />
            <div className={s.projectHero}>
              <div>
                <span className={s.kindChip}>{kind}</span>
                <h1 className={inner.h1}>{project.title}</h1>
                <p className={inner.lead}>{summary}</p>
                <div className={s.heroActions}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={inner.primary}>
                      Visit the live site <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  )}
                  <Link href="/contact" className={inner.ghost}>
                    Start a similar project
                  </Link>
                </div>
              </div>
              {lead && (
                <div className={`${s.cover} ${contain ? s.contain : ""}`}>
                  <Image src={lead} alt={`${project.title}: ${summary}`} fill sizes="(max-width: 1000px) 100vw, 55vw" preload />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* The story */}
        <section className={`${inner.section} ${inner.sand}`}>
          <div className={inner.wrap}>
            {project.problem && (
              <Reveal className={s.challenge}>
                <span className={s.challengeIcon}>
                  <Target size={26} aria-hidden="true" />
                </span>
                <div>
                  <h2 className={inner.h2}>What the client needed</h2>
                  <p className={s.challengeLead}>{needLead}</p>
                  {needRest && <p className={s.body}>{needRest}</p>}
                </div>
              </Reveal>
            )}
            <div className={s.story}>
            <div>
              {project.solution && (
                <Reveal className={s.block}>
                  <h2 className={inner.h2}>What we did</h2>
                  <p className={s.body}>{project.solution}</p>
                </Reveal>
              )}
              {project.description && (
                <Reveal>
                  <details className={s.details}>
                    <summary>
                      <span>More about this project</span>
                      <i aria-hidden="true" />
                    </summary>
                    <p className={s.body}>{project.description}</p>
                  </details>
                </Reveal>
              )}
            </div>
            <aside className={s.side} aria-label="Project results and details">
              {project.results.length > 0 && (
                <Reveal className={s.panel}>
                  <h2 className={inner.h3}>The results</h2>
                  <ul className={s.results}>
                    {project.results.map((r) => (
                      <li key={r}>
                        <Check aria-hidden="true" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {factItems.length > 0 && (
                <Reveal className={s.panel}>
                  <h2 className={inner.h3}>Project details</h2>
                  <dl className={s.facts}>
                    {factItems.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              )}
              {facts.quote && (
                <Reveal as="figure" className={`${s.panel} ${s.quote}`}>
                  <blockquote>&ldquo;{facts.quote.text}&rdquo;</blockquote>
                  <figcaption>
                    {facts.quote.name}
                    {facts.quote.role ? `, ${facts.quote.role}` : ""}
                  </figcaption>
                </Reveal>
              )}
            </aside>
            </div>
          </div>
        </section>

        {/* Screens */}
        {shots.length > 0 && (
          <section className={inner.section}>
            <div className={inner.wrap}>
              <Reveal>
                <h2 className={inner.h2}>A closer look</h2>
                <p className={inner.sub}>Screens from the finished project.</p>
              </Reveal>
              <ul className={s.shots} style={{ marginTop: 24 }}>
                {shots.map((g, i) => (
                  <li key={g.src} className={`${s.shot} ${g.span === "wide" ? s.wide : ""}`}>
                    <figure style={{ margin: 0 }}>
                      <span className={`${s.shotImg} ${contain ? s.contain : ""}`}>
                        <Image src={g.src} alt={g.alt} fill sizes="(max-width: 640px) 100vw, 50vw" loading={i < 2 ? "eager" : "lazy"} />
                      </span>
                      {g.caption && <figcaption>{g.caption}</figcaption>}
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Technology: shown on project pages only */}
        {project.technologies.length > 0 && (
          <section className={`${inner.section} ${inner.deep}`} aria-labelledby="tech-heading">
            <div className={inner.wrap}>
              <h2 id="tech-heading" className={inner.h2}>
                The technology behind this project
              </h2>
              <p className={inner.sub}>For the technically curious, here is what we used to build it.</p>
              <TechStack technologies={project.technologies} />
            </div>
          </section>
        )}

        {/* Related projects + matching service */}
        <section className={`${inner.section} ${inner.sand}`}>
          <div className={inner.wrap}>
            {related.length > 0 && (
              <>
                <Reveal>
                  <h2 className={inner.h2}>More {kind.toLowerCase()} we have delivered</h2>
                </Reveal>
                <ul className={s.related} style={{ marginTop: 20 }}>
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/portfolio/${p.slug}`} className={s.card}>
                        <span className={s.cardImage}>
                          <Image src={projectLeadImage(p)!} alt={`${p.title}: ${projectSummary(p)}`} fill sizes="(max-width: 640px) 100vw, 33vw" loading="lazy" />
                        </span>
                        <span className={s.cardBody}>
                          <span className={s.kind}>{projectKind(p)}</span>
                          <h3 className={s.cardTitle}>{p.title}</h3>
                          <span className={s.summary}>{projectSummary(p)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {service && (
              <div className={s.helpCard}>
                <div>
                  <h2 className={inner.h3}>Need something similar?</h2>
                  <p>{service.shortDesc}</p>
                </div>
                <Link href={`/services/${service.slug}`} className={inner.primary}>
                  {service.title} <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            )}
            <p style={{ margin: "24px 0 0" }}>
              <Link href="/portfolio" className={inner.link}>
                See all projects
              </Link>
            </p>
          </div>
        </section>

        <ContactBand title="Want something like this?" text="Tell us what you are building and we will reply with practical next steps and a clear written quote." />
      </main>
      <Footer />
    </div>
  );
}
