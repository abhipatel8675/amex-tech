import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, FileText, Mail, Phone } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import ServicesExplorer from "./ServicesExplorer";
import ReviewsSlider from "./ReviewsSlider";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { blogPosts } from "@/data/blog";
import { homeFaqs } from "@/data/homeFaqs";
import { aiAgentExample } from "@/components/agency/AgencySections";
import { UPWORK_URL, OFFICE_PHONE } from "@/data/company";
import s from "./home.module.css";

const heroSlugs = ["firmsledger", "goswiftfund", "island-traffic-defense"];
const workSlugs = ["portland-web-designing-studio", "goswiftfund", "island-traffic-defense", "molar-ai"];

const steps = [
  {
    title: "We listen first",
    body: "A free conversation about your business and what you want to change. You get a clear plan and a written quote before anything starts.",
  },
  {
    title: "You see it before it is built",
    body: "We show you how it will look and work, and agree the details early, when changes are quick and easy.",
  },
  {
    title: "We build in steps",
    body: "You receive working previews along the way and can talk directly to the people building your project.",
  },
  {
    title: "We launch and stay close",
    body: "We test on phones and computers, go live, and keep helping you improve afterwards.",
  },
];

const quickStarts = [
  {
    title: "Fix your app error in 24 hours",
    body: "Stuck on an error in your app or website? Send it over for a free assessment.",
    href: "/fix",
  },
  {
    title: "Free website check",
    body: "See your website's score and what could be costing you customers, in about 10 seconds.",
    href: "/tools/website-grader",
  },
  {
    title: "Free app check",
    body: "Spot common launch problems in your app before your customers do.",
    href: "/tools/app-checker",
  },
  {
    title: "A website for trade businesses",
    body: "A simple five-page site with a quote form and Google set-up, for plumbers, electricians and contractors.",
    href: "/trade-business-websites",
  },
];

const hireRoles = [
  "Website developers",
  "Mobile app developers",
  "AI and automation developers",
  "Full-stack developers",
  "Hosting and care engineers",
];

export default function Home() {
  const heroProjects = heroSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p?.image));
  const featured = workSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p?.image));
  const [leadPost, ...restPosts] = blogPosts.slice(0, 3);

  return (
    <div className={s.home}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.glow} aria-hidden="true" />
        <div className={s.heroInner}>
          <div className={s.heroText}>
            <h1 className={`${s.h1} ${s.fadeUp}`}>
              Websites, apps and AI tools that <em>bring in business.</em>
            </h1>
            <p className={`${s.lead} ${s.fadeUp}`} style={{ ["--d" as string]: 1 }}>
              We design and build websites, apps and AI tools for businesses around the world, then make sure customers can
              find them on Google and in AI search.
            </p>
            <div className={`${s.actions} ${s.fadeUp}`} style={{ ["--d" as string]: 2 }}>
              <Link href="/contact" className={s.primary}>
                Get a free quote <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/portfolio" className={s.ghost}>
                See our work <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <p className={`${s.proof} ${s.fadeUp}`} style={{ ["--d" as string]: 3 }}>
              Top Rated Plus on{" "}
              <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer">
                Upwork
              </a>
              , with verified client reviews, {projects.length}+ projects delivered and 5 years of experience.
            </p>
          </div>

          <div className={s.heroVisual} aria-label="Recent projects">
            {heroProjects.map((p, i) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className={s.tile}
                style={{ ["--i" as string]: i }}
                aria-label={`${p.title} case study`}
              >
                <Image
                  src={p.image!}
                  alt={`${p.title}, a project we delivered`}
                  fill
                  sizes="(max-width: 900px) 70vw, 28vw"
                  preload={i === 0}
                />
              </Link>
            ))}
            <p className={s.count}>
              <strong>{projects.length}+</strong> projects delivered
            </p>
          </div>
        </div>
      </section>

      {/* 2. Services (sand) */}
      <section className={s.services}>
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <h2 className={s.h2}>What we do for you</h2>
            <p className={s.sub}>
              We take care of the digital side of your business: the website that wins customers, the tools that save your
              team time, and the search presence that keeps new people finding you.
            </p>
          </Reveal>
          <Reveal>
            <ServicesExplorer />
          </Reveal>
          <Reveal className={s.moreLink}>
            <Link href="/services" className={s.ghost}>
              All services in detail <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 3. AI operations agent (dark) */}
      <section className={s.featureSection}>
        <div className={s.wrap}>
          <div className={s.feature}>
            <Reveal>
              <h2 className={`${s.h2} ${s.onDark}`}>Ask your factory anything</h2>
              <p className={`${s.sub} ${s.onDarkSoft}`}>
                Our AI assistant for small manufacturers connects to the tools you already use, such as spreadsheets,
                project boards, accounting and email. It answers questions about where an order stands, points out late
                orders and mismatched dates, and keeps your systems in step.
              </p>
              <Link href="/ai-operations-agent" className={s.primary}>
                See how it works <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={1} className={s.chat}>
              <small>An example conversation</small>
              <p className={s.q}>{aiAgentExample.question}</p>
              <p className={s.a}>{aiAgentExample.answer}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. How a project runs (near-white, separates the two dark sections) */}
      <section className={s.process}>
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <h2 className={s.h2}>How a project runs</h2>
            <p className={s.sub}>Four steps. You always know what is happening and what comes next.</p>
          </Reveal>
          <ol className={s.steps}>
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i} className={s.step}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Work (dark) */}
      <section className={s.work}>
        <div className={s.wrap}>
          <div className={s.headRow}>
            <Reveal className={s.head}>
              <h2 className={s.h2}>Work we have delivered</h2>
              <p className={s.sub}>A few recent projects for real clients.</p>
            </Reveal>
            <Link href="/portfolio" className={s.ghost}>
              All {projects.length} projects <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className={s.workGrid}>
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i % 2}>
                <Link href={`/portfolio/${p.slug}`} className={s.card}>
                  <span className={s.cardImage}>
                    <Image
                      src={p.image!}
                      alt={`${p.title}, a project we delivered`}
                      fill
                      sizes="(max-width: 800px) 100vw, 46vw"
                    />
                  </span>
                  <span className={s.cardMeta}>
                    <span>
                      <small>{p.category}</small>
                      <strong>{p.title}</strong>
                    </span>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Reviews (sand) */}
      <section className={s.reviews}>
        <div className={`${s.wrap} ${s.reviewsGrid}`}>
          <Reveal className={s.reviewsIntro}>
            <h2 className={s.h2}>What clients say</h2>
            <p className={s.sub}>
              {testimonials.length} reviews from verified clients on Fiverr, left after their projects were delivered.
            </p>
            <a
              href="https://www.fiverr.com/abhipatel956"
              target="_blank"
              rel="noopener noreferrer"
              className={s.ghost}
            >
              Read more on Fiverr <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal delay={1}>
            <ReviewsSlider />
          </Reveal>
        </div>
      </section>

      {/* 7. Hire developers (near-white) */}
      <section className={s.hire}>
        <div className={s.wrap}>
          <Reveal className={s.hireBand}>
            <div className={s.hireText}>
              <h2 className={s.h2}>Need an extra pair of hands?</h2>
              <p className={s.sub}>
                Tell us the skills and support you need, and we will shape an arrangement around your project, from a
                single task to ongoing work alongside your team.
              </p>
              <ul className={s.points}>
                {["Direct collaboration", "Flexible scope", "Clear ownership"].map((p) => (
                  <li key={p}>
                    <Check size={16} aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
              <Link href="/hire-developers" className={s.primary}>
                Hire our developers <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <ul className={s.roles}>
              {hireRoles.map((r) => (
                <li key={r}>
                  <Link href="/hire-developers" className={s.role}>
                    <span>{r}</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 8. Quick starts (sand) */}
      <section className={s.quick}>
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <h2 className={s.h2}>Start small</h2>
            <p className={s.sub}>Quick, low-commitment ways to see what we can do.</p>
          </Reveal>
          <div className={s.quickGrid}>
            {quickStarts.map((q, i) => (
              <Reveal key={q.href} delay={i}>
                <Link href={q.href} className={s.quickCard}>
                  <strong>{q.title}</strong>
                  <span>{q.body}</span>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Blog (near-white) */}
      <section className={s.blog}>
        <div className={s.wrap}>
          <div className={s.headRow}>
            <Reveal className={s.head}>
              <h2 className={s.h2}>From the blog</h2>
              <p className={s.sub}>Plain-English guides for business owners.</p>
            </Reveal>
            <Link href="/blog" className={s.ghost}>
              Read all articles <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className={s.blogGrid}>
            <Reveal className={s.blogLead}>
              <Link href={`/blog/${leadPost.slug}`} className={s.postLead}>
                <span className={s.postMeta}>
                  <small>{leadPost.category}</small>
                  <em>{leadPost.readTime}</em>
                </span>
                <strong>{leadPost.title}</strong>
                <span className={s.postExcerpt}>{leadPost.excerpt}</span>
                <span className={s.postLink}>
                  Read article <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
            {restPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i + 1}>
                <Link href={`/blog/${post.slug}`} className={s.post}>
                  <span className={s.postMeta}>
                    <small>{post.category}</small>
                    <em>{post.readTime}</em>
                  </span>
                  <strong>{post.title}</strong>
                  <span className={s.postLink}>
                    Read article <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ (sand) */}
      <section className={s.faq}>
        <div className={`${s.wrap} ${s.faqGrid}`}>
          <Reveal className={s.faqHead}>
            <h2 className={s.h2}>Questions people ask us</h2>
            <p className={s.sub}>
              Something else on your mind?{" "}
              <Link href="/contact" className={s.inlineLink}>
                Ask us directly
              </Link>
              .
            </p>
          </Reveal>
          <div className={s.faqList}>
            {homeFaqs.map((f) => (
              <details key={f.question} name="home-faq" className={s.detail}>
                <summary>
                  <span>{f.question}</span>
                  <i aria-hidden="true" />
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Closing call to action (near-white) */}
      <section className={s.cta}>
        <div className={s.wrap}>
          <Reveal className={s.ctaCard}>
            <div className={s.ctaText}>
              <h2 className={s.h2}>Have a project in mind?</h2>
              <p className={s.sub}>
                Tell us what you are working on. We will reply with a plan and a clear written quote, with no obligation.
              </p>
              <div className={s.ctaActions}>
                <Link href="/contact" className={s.dark}>
                  Start a project <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link href="/portfolio" className={s.ghost}>
                  See our work
                </Link>
              </div>
            </div>
            <ul className={s.ways}>
              <li>
                <Link href="/contact" className={s.way}>
                  <span className={s.wayIcon}>
                    <FileText size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Send a project brief</strong>
                    <small>Takes about two minutes</small>
                  </span>
                </Link>
              </li>
              <li>
                <a href="mailto:abhi@amextech.org" className={s.way}>
                  <span className={s.wayIcon}>
                    <Mail size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Email us</strong>
                    <small>abhi@amextech.org</small>
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${OFFICE_PHONE.tel}`} className={s.way}>
                  <span className={s.wayIcon}>
                    <Phone size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Call us</strong>
                    <small>{OFFICE_PHONE.display}</small>
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
