import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Braces } from "lucide-react";
import { projects, projectsForStack, stackGroups } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { blogPosts } from "@/data/blog";
import {
  AgencyCTA,
  AgencyFAQ,
  AiAgentFeature,
  HirePreview,
  OffersSection,
  Process,
  ServiceGrid,
} from "./AgencySections";
import StackExplorer from "./StackExplorer";
import s from "./agency.module.css";

export default function AgencyHome() {
  const featured = ["portland-web-designing-studio", "goswiftfund", "island-traffic-defense", "molar-ai"]
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p?.image));
  const stackShowcase = stackGroups
    .map((g) => ({ name: g.name, list: projectsForStack(projects, g.name) }))
    .filter((g) => g.list.length > 0);
  const review =
    testimonials.find((t) => t.name === "sarah_m_uk") ?? testimonials[0];
  return (
    <div className={s.site}>
      <section className={s.hero}>
        <div className={s.wrap}>
          <div className={s.heroGrid}>
            <div>
              <p className={s.eyebrow}>
                Websites, apps &amp; AI for businesses · Worldwide
              </p>
              <h1>
                Websites, apps and AI tools
                <br />
                <em>that bring in business.</em>
              </h1>
              <p className={s.intro}>
                Amex Technology designs and builds websites, web apps, mobile
                apps and AI automations, then helps customers find them on
                Google and in AI search. We work with businesses around the
                world.
              </p>
              <div className={s.actions}>
                <Link className={s.button} href="/contact">
                  Get a free quote <ArrowUpRight size={17} />
                </Link>
                <Link className={s.outline} href="/portfolio">
                  See our work <ArrowRight size={16} />
                </Link>
              </div>
              <p className={s.heroNote}>
                <Check size={13} /> Working with clients worldwide
              </p>
            </div>
            <div className={s.heroVisual}>
              <Link
                href="/portfolio/firmsledger"
                className={s.art}
                aria-label="FirmsLedger case study"
              >
                <span className={s.artTag}>Recent work · FirmsLedger</span>
                <Image
                  src="/images/portfolio/firmsledger/mockup-1.webp"
                  alt="FirmsLedger, a manufacturer directory we built, shown on a laptop and phone"
                  fill
                  sizes="(max-width: 800px) 100vw, 45vw"
                  preload
                />
                <div className={s.artBottom}>
                  <span>
                    View case study <ArrowUpRight size={14} className="inline" />
                  </span>
                </div>
              </Link>
              <div className={s.heroCard}>
                <small>PROJECTS DELIVERED</small>
                <strong>
                  <Braces size={22} /> {projects.length}+ websites, apps &amp; AI tools
                </strong>
              </div>
            </div>
          </div>
          <div className={s.trust}>
            <p>
              Tools we work
              <br />
              with every day
            </p>
            <div className={s.stack}>
              {[
                "Websites",
                "Mobile apps",
                "AI tools",
                "Online payments",
                "Google search",
                "Hosting",
              ].map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
          <p className={s.proofLine}>
            Top Rated Plus on{" "}
            <a
              href="https://www.upwork.com/agencies/2067871097204619852/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Upwork
            </a>{" "}
            · 5 years in business
          </p>
        </div>
      </section>
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.sectionHead}>
            <div>
              <p className={s.eyebrow}>Services</p>
              <h2 className={s.heading}>
                What we build
                <br />
                <em>for your business.</em>
              </h2>
            </div>
            <div>
              <p className={s.sectionText}>
                Websites, SEO, AI automation, apps and CRM work, planned and
                built by one team, so nothing gets lost between vendors.
              </p>
              <Link href="/services" className={`${s.textLink} mt-3`}>
                Discover all services <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <ServiceGrid />
          <AiAgentFeature />
        </div>
      </section>
      <section className={`${s.section} ${s.dark}`}>
        <div className={s.wrap}>
          <div className={s.sectionHead}>
            <div>
              <p className={s.eyebrow}>Recent projects</p>
              <h2 className={s.heading}>
                Work we&apos;ve shipped
                <br />
                <em>for real clients.</em>
              </h2>
            </div>
            <Link href="/portfolio" className={s.textLink}>
              View all projects <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className={s.workGrid}>
            {featured.map((p) => (
              <article className={s.workCard} key={p.slug}>
                <Link href={`/portfolio/${p.slug}`} className={s.workImage}>
                  <Image
                    src={p.image!}
                    alt={`${p.title} — ${p.shortDesc}`}
                    fill
                    sizes="(max-width: 520px) 100vw, 45vw"
                  />
                </Link>
                <div className={s.workMeta}>
                  <div>
                    <span>{p.tags.slice(0, 2).join(" / ")}</span>
                    <h3 className="mt-2">{p.title}</h3>
                    <p>{p.shortDesc}</p>
                  </div>
                  <Link
                    href={`/portfolio/${p.slug}`}
                    aria-label={`Read ${p.title} case study`}
                  >
                    <ArrowUpRight size={19} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-20 border-t border-[#ffffff1f] pt-14">
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>Projects by tool</p>
                <h2 className={s.heading}>
                  Pick a tool.
                  <br />
                  <em>See what we&apos;ve built with it.</em>
                </h2>
              </div>
              <p className={s.sectionText}>
                Every project below was delivered by our team. Choose a
                tool to see the matching projects.
              </p>
            </div>
            <StackExplorer
              groups={stackShowcase.map(({ name, list }) => ({
                name,
                projects: list.map((p) => ({ slug: p.slug, title: p.title, image: p.image })),
              }))}
            />
          </div>
        </div>
      </section>
      <HirePreview />
      <section className={s.quote}>
        <div className={`${s.wrap} ${s.quoteGrid}`}>
          <div>
            <p className={s.eyebrow}>Client reviews</p>
            <h2 className="text-2xl tracking-tight">
              What clients say
              <br />
              after the project.
            </h2>
            <p
              className={s.stars}
              aria-label={`${review.rating} out of 5 stars`}
            >
              ★★★★★
            </p>
          </div>
          <div>
            <blockquote>&ldquo;{review.content}&rdquo;</blockquote>
            <cite>
              {review.name} <span aria-hidden="true">—</span> {review.platform}{" "}
              client
            </cite>
          </div>
        </div>
      </section>
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.sectionHead}>
            <div>
              <p className={s.eyebrow}>How a project works</p>
              <h2 className={s.heading}>
                Four steps.
                <br />
                <em>No surprises.</em>
              </h2>
            </div>
            <p className={s.sectionText}>
              You get a written quote and plan first, then regular previews
              while we build, and help after launch.
            </p>
          </div>
          <Process />
        </div>
      </section>
      <section className={`${s.section} border-t border-[#dadcd1]`}>
        <div className={s.wrap}>
          <div className={s.sectionHead}>
            <div>
              <p className={s.eyebrow}>From the blog</p>
              <h2 className={s.heading}>Guides from real projects.</h2>
            </div>
            <Link href="/blog" className={s.textLink}>
              Read the blog <ArrowRight size={15} />
            </Link>
          </div>
          <div className={s.blogGrid}>
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={s.article}
              >
                <small>{post.category}</small>
                <h3>{post.title}</h3>
                <span className={`${s.textLink} mt-4`}>
                  Read article <ArrowUpRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <OffersSection />
      <AgencyFAQ />
      <AgencyCTA />
    </div>
  );
}
