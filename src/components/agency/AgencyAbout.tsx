import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AgencyCTA, Process } from "./AgencySections";
import s from "./agency.module.css";
export default function AgencyAbout() {
  return (
    <div className={s.site}>
      <section className={s.pageHero}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>A little about us</p>
          <h1>
            Thoughtful people.
            <br />
            <em>Purposeful technology.</em>
          </h1>
          <p className={s.intro}>
            We&apos;re Amex Technology, an independent website, app and AI company
            founded by Abhi Patel. We help startups and growing
            businesses turn good ideas into useful products and services.
          </p>
          <div className={s.actions}>
            <Link href="/contact" className={s.button}>
              Let&apos;s get to know each other <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className={s.section}>
        <div className={`${s.wrap} ${s.aboutSplit}`}>
          <div>
            <p className={s.eyebrow}>Our approach</p>
            <h2 className={s.heading}>
              Close to the work.
              <br />
              <em>Closer to your goals.</em>
            </h2>
          </div>
          <div>
            <p>
              Good work starts with understanding the people who use it.
              Before we plan anything or start building, we get to know your
              business, your customers, and what success should look like.
            </p>
            <p>
              We work across websites, web and mobile apps, software products, AI
              automation, design, and hosting. Having all of this in one team
              helps us make choices that fit your whole business.
            </p>
            <p>
              We work with clients around the world. We keep collaboration
              direct and practical: clear milestones, regular conversations,
              and work you can see as it develops.
            </p>
            <Link href="/portfolio" className={s.textLink}>
              See what we&apos;ve built <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className={`${s.section} border-t border-[#dadcd1]`}>
        <div className={`${s.wrap} ${s.aboutSplit}`}>
          <div>
            <p className={s.eyebrow}>Who you&apos;ll work with</p>
            <h2 className={s.heading}>
              Abhi Patel, <em>founder.</em>
            </h2>
          </div>
          <div>
            <p>
              Abhi Patel founded Amex Technology and leads every project
              personally. He works with our development team, which keeps projects
              affordable while giving you a direct line to the person leading your
              project. Over 5 years he has built websites, web and mobile apps,
              and AI automations for clients around the world, and is Top Rated Plus on Upwork.
            </p>
            <div className="flex flex-wrap gap-x-8">
              <a
                href="https://www.upwork.com/agencies/2067871097204619852/"
                target="_blank"
                rel="noopener noreferrer"
                className={s.textLink}
              >
                View our Upwork profile <ArrowUpRight size={17} />
              </a>
              <Link href="/web-and-ai-development" className={s.textLink}>
                How we work with clients worldwide{" "}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className={`${s.section} ${s.dark}`}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>What matters to us</p>
          <h2 className={s.heading}>
            Care in the details.
            <br />
            <em>Clarity in the relationship.</em>
          </h2>
          <div className={s.values}>
            {[
              [
                "Honest conversations",
                "We discuss tradeoffs, scope, and constraints early. A good partnership starts with a shared understanding of what we're building and why.",
              ],
              [
                "Quality and care",
                "Clean, well-organized work, easy-to-use screens and clear written notes help your product stay easy to maintain as it grows.",
              ],
              [
                "A longer view",
                "We think beyond the launch. The right decisions today should support your next version and whoever takes the project forward.",
              ],
            ].map(([title, desc]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={s.section}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>Working together</p>
          <h2 className={s.heading}>
            A process that keeps
            <br />
            <em>everyone connected.</em>
          </h2>
          <Process />
        </div>
      </section>
      <AgencyCTA />
    </div>
  );
}
