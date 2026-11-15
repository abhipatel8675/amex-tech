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
            We&apos;re Amex Technology, an independent software and AI agency
            founded by Abhi Patel. We help startups and growing
            businesses turn good ideas into useful digital products.
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
              Good technology starts with understanding the people who use it.
              Before we choose frameworks or write code, we get to know your
              business, your users, and what success should look like.
            </p>
            <p>
              We work across websites, web and mobile applications, SaaS, AI
              automation, product design, and cloud infrastructure. That
              connected perspective helps us make choices that fit the whole
              product.
            </p>
            <p>
              Our founder, Abhi Patel, lives in Gardena in Los Angeles; our
              development team is in India. We keep collaboration direct and
              practical: clear milestones, regular conversations, and work you
              can see as it develops.
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
              personally. He lives in Gardena in Los Angeles and works with a
              development team in India, which keeps projects affordable while
              giving US clients a contact on Pacific time. Over 5 years he has
              built websites, web and mobile apps, and AI automations for
              clients around the world, and is Top Rated Plus on Upwork with
              more than $80K earned on the platform.
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
              <Link href="/los-angeles" className={s.textLink}>
                Web &amp; AI development in Los Angeles{" "}
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
                "Engineering with care",
                "Readable code, sensible architecture, accessible interfaces, and useful documentation help your product stay maintainable as it grows.",
              ],
              [
                "A longer view",
                "We think beyond the initial launch. The right technical decisions should support your next iteration and the team who takes it forward.",
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
