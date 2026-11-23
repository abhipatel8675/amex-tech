import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  AgencyCTA,
  AgencyFAQ,
  hireLink,
  hiringFaqs,
  Process,
  roles,
} from "@/components/agency/AgencySections";
import s from "@/components/agency/agency.module.css";
const pageUrl = "https://amextechnology.com/hire-developers";
const pageTitle = "Hire Developers for Your Business | Amex Technology";
const pageDescription =
  "Talk to Amex Technology about adding developers to your team for websites, web apps, AI, mobile apps and ongoing maintenance. Explore project and ongoing options.";
export const metadata: Metadata = {
  title: "Hire Developers for Your Business",
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: { title: pageTitle, description: pageDescription, url: pageUrl },
  twitter: { title: pageTitle, description: pageDescription },
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hiringFaqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
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
    { "@type": "ListItem", position: 2, name: "Hire Developers", item: pageUrl },
  ],
};
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${pageUrl}#service`,
  name: "Hire Developers",
  serviceType: "Developer hiring",
  description: pageDescription,
  url: pageUrl,
  provider: { "@id": "https://amextechnology.com/#organization" },
};
const models = [
  {
    title: "A defined project",
    label: "BUILD SOMETHING NEW",
    desc: "A focused engagement for a website, application, integration, or product milestone.",
    bullets: [
      "Agreed scope and deliverables",
      "Key dates and regular reviews",
      "Written notes and handover",
    ],
  },
  {
    title: "An extension of your team",
    label: "MOVE YOUR PRODUCT FORWARD",
    desc: "Discuss dedicated development support that fits your existing team and the way you work.",
    bullets: [
      "Skills matched to your needs",
      "Direct collaboration with the developers",
      "Agreed availability and meeting times",
    ],
  },
  {
    title: "Ongoing development",
    label: "KEEP GETTING BETTER",
    desc: "A continuing partnership for product improvements, maintenance, and support.",
    bullets: [
      "A prioritized list of improvements",
      "A clear scope for each round of work",
      "Regular planning and progress updates",
    ],
  },
];
const timeZones = [
  {
    label: "US CLIENTS",
    title: "Work is often done overnight for you",
    desc: "Our developers work several hours ahead of the US, so work you approve in your afternoon is often built overnight and ready to review the next morning.",
  },
  {
    label: "AUSTRALIA & UK",
    title: "Part of the day overlaps",
    desc: "Our working day overlaps with Australian and UK business hours, so live calls and quick questions are easy to schedule.",
  },
  {
    label: "DIRECT ACCESS",
    title: "Talk to the founder",
    desc: "Founder Abhi Patel is available Monday to Saturday for calls and scoping, at a time that works in your time zone.",
  },
];
export default function HireDevelopersPage() {
  return (
    <>
      {[faqSchema, breadcrumbSchema, serviceSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar />
      <main id="main-content" className={s.site}>
        <section className={s.pageHero}>
          <div className={s.wrap}>
            <p className={s.eyebrow}>Good people. Careful work.</p>
            <h1>
              The expertise you need.
              <br />
              <em>The collaboration you want.</em>
            </h1>
            <p className={s.intro}>
              Bring the right skills into your next project. Tell us
              what you&apos;re building and we&apos;ll discuss how our
              developers can help, from one focused project to ongoing product
              development.
            </p>
            <div className={s.actions}>
              <Link
                className={s.button}
                href={hireLink("a developer or development team")}
              >
                Discuss your hiring needs <ArrowUpRight size={17} />
              </Link>
              <Link className={s.textLink} href="#developer-skills">
                Explore our expertise <ArrowRight size={16} />
              </Link>
            </div>
            <div className={s.checkList}>
              <span>
                <Check size={14} /> Real project experience
              </span>
              <span>
                <Check size={14} /> Direct communication
              </span>
              <span>
                <Check size={14} /> Clear engagement terms
              </span>
            </div>
          </div>
        </section>
        <section id="developer-skills" className={s.section}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>Find the right fit</p>
                <h2 className={s.heading}>
                  Skills that make
                  <br />
                  <em>things happen.</em>
                </h2>
              </div>
              <p className={s.sectionText}>
                Explore our core areas of work. Specific skills,
                developer availability, and team makeup are confirmed when
                we scope your engagement.
              </p>
            </div>
            <div className={s.serviceGrid}>
              {roles.map((role, i) => {
                const Icon = role.icon;
                return (
                  <article key={role.title} className={s.service}>
                    <div className={s.serviceTop}>
                      <Icon aria-hidden="true" />
                      <span>0{i + 1}</span>
                    </div>
                    <h3>{role.title}</h3>
                    <p>{role.desc}</p>
                    <Link className={s.textLink} href={hireLink(role.skill)}>
                      Discuss this skill <ArrowUpRight size={15} />
                      <span className="sr-only">: {role.title}</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className={s.section} style={{ background: "#eeeee4" }}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>A partnership that fits</p>
                <h2 className={s.heading}>
                  Different needs.
                  <br />
                  <em>Flexible ways to work.</em>
                </h2>
              </div>
            </div>
            <div className={s.models}>
              {models.map((model) => (
                <article className={s.model} key={model.title}>
                  <p className={s.eyebrow}>{model.label}</p>
                  <h3>{model.title}</h3>
                  <p>{model.desc}</p>
                  <ul>
                    {model.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href={hireLink(model.title)} className={s.textLink}>
                    Let&apos;s discuss <ArrowRight size={15} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="time-zones" className={s.section}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>Time zones</p>
                <h2 className={s.heading}>
                  Working around
                  <br />
                  <em>your day.</em>
                </h2>
              </div>
              <p className={s.sectionText}>
                Whether you are in the US, Australia or the UK, we agree the
                overlap hours for calls up front.
              </p>
            </div>
            <div className={s.models}>
              {timeZones.map((zone) => (
                <article className={s.model} key={zone.title}>
                  <p className={s.eyebrow}>{zone.label}</p>
                  <h3>{zone.title}</h3>
                  <p>{zone.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={s.section} style={{ background: "#eeeee4" }}>
          <div className={s.wrap}>
            <p className={s.eyebrow}>Getting started</p>
            <h2 className={s.heading}>
              A clear path from
              <br />
              <em>conversation to collaboration.</em>
            </h2>
            <Process hiring />
          </div>
        </section>
        <AgencyFAQ hiring />
        <AgencyCTA />
      </main>
      <Footer />
    </>
  );
}
