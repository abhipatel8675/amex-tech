import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Bot,
  Smartphone,
  Layers,
  Monitor,
  Server,
} from "lucide-react";
import { services } from "@/data/services";
import { serviceIcon } from "@/components/services/serviceIcons";
import s from "./agency.module.css";

export const roles = [
  {
    title: "Website developers",
    skill: "Website development",
    icon: Code2,
    desc: "Fast, search-friendly websites and customer portals built with care.",
    tech: ["Next.js", "React", "WordPress", "HTML & CSS", "Tailwind CSS"],
  },
  {
    title: "Frontend developers",
    skill: "Frontend development",
    icon: Monitor,
    desc: "Everything your customers see and click, built to be fast and easy to use on any screen.",
    tech: ["React", "Angular", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend developers",
    skill: "Backend development",
    icon: Server,
    desc: "The logic, databases and integrations behind your product, built to be secure and reliable.",
    tech: ["Node.js", "Python", "PHP", "PostgreSQL", "MySQL", "REST & GraphQL APIs"],
  },
  {
    title: "Full stack developers",
    skill: "Full stack development",
    icon: Layers,
    desc: "One developer for both the screens customers see and the systems behind them.",
    tech: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Supabase"],
  },
  {
    title: "Mobile app developers",
    skill: "Mobile App Development",
    icon: Smartphone,
    desc: "Apps that work on both iPhone and Android.",
    tech: ["React Native", "Expo", "iOS & Android", "App store launch"],
  },
  {
    title: "AI & automation specialists",
    skill: "AI & Automation",
    icon: Bot,
    desc: "Practical AI assistants and automations for your daily operations.",
    tech: ["OpenAI", "AI voice agents", "Workflow automation", "CRM integrations"],
  },
];
export function hireLink(skill: string) {
  return `/contact?service=${encodeURIComponent("Hire Developers")}&message=${encodeURIComponent(`I'd like to discuss development support for ${skill}.\n\nProject overview:\nPreferred engagement:\nTimeline:\nPreferred time zone for calls:`)}`;
}
export function ServiceGrid({ full = false }: { full?: boolean }) {
  const slugs = [
    "web-development",
    "seo-services",
    "ai-services",
    "saas-development",
    "mobile-app-development",
    "crm-automation",
  ];
  const list = full
    ? services
    : slugs.map((slug) => services.find((service) => service.slug === slug)!);
  return (
    <div className={s.serviceGrid}>
      {list.map((service, i) => {
        const Icon = serviceIcon(service.iconName);
        return (
          <article className={s.service} key={service.slug} id={service.slug}>
            {service.aliases?.map((alias) => (
              <span id={alias} key={alias} />
            ))}
            <div className={s.serviceTop}>
              <Icon aria-hidden="true" />
              <span>0{i + 1}</span>
            </div>
            <h3>{service.title}</h3>
            <p>{full ? service.description : service.shortDesc}</p>
            {full && (
              <div className={s.tags}>
                {service.technologies.slice(0, 4).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            )}
            <Link className={s.textLink} href={`/services/${service.slug}`}>
              Explore service <ArrowRight size={14} />
              <span className="sr-only">: {service.title}</span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
export function Process({ hiring = false }: { hiring?: boolean }) {
  const steps = hiring
    ? [
        [
          "Share your needs",
          "Tell us about your product, the skills you need, your priorities, and the support you have in mind.",
        ],
        [
          "Agree the fit",
          "We discuss what you need, the expertise available, and how we'll work with your existing team.",
        ],
        [
          "Set the terms",
          "We agree on scope, deliverables, availability, communication, and ownership before work begins.",
        ],
        [
          "Start collaborating",
          "We set up access and a shared backlog, then move forward with regular check-ins and visible progress.",
        ],
      ]
    : [
        [
          "Discover & align",
          "We learn about your customers and business goals. You get a clear scope and a practical plan.",
        ],
        [
          "Design with purpose",
          "We shape how it will look and work, mock up the important screens, and agree on the details before building.",
        ],
        [
          "Build together",
          "Work moves in focused stages, with regular demos and direct communication with the people building it.",
        ],
        [
          "Launch & improve",
          "We test on different devices, prepare the handover, and help your product grow after launch.",
        ],
      ];
  return (
    <div className={s.process}>
      {steps.map(([title, desc], i) => (
        <div className={s.processStep} key={title}>
          <span>0{i + 1} /</span>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      ))}
    </div>
  );
}
export function HirePreview() {
  return (
    <section className={s.section}>
      <div className={`${s.wrap} ${s.hireGrid}`}>
        <div>
          <p className={s.eyebrow}>Hire developers</p>
          <h2 className={s.heading}>
            Add a developer
            <br />
            <em>to your team.</em>
          </h2>
          <p className={s.sectionText}>
            Need a developer for an existing product or a team to build
            something new? Tell us the skills and support you need. We&apos;ll
            shape an engagement around your project.
          </p>
          <div className={s.actions}>
            <Link href="/hire-developers" className={s.button}>
              Hire a developer <ArrowRight size={16} />
            </Link>
          </div>
          <div className={s.checkList}>
            <span>
              <Check size={13} /> Direct collaboration
            </span>
            <span>
              <Check size={13} /> Flexible scope
            </span>
            <span>
              <Check size={13} /> Clear ownership
            </span>
          </div>
        </div>
        <div>
          {roles.map((role, i) => (
            <div className={s.roleItem} key={role.title}>
              <Link className={s.roleRow} href={hireLink(role.skill)}>
                <span>
                  <small>0{i + 1}</small>
                  {role.title}
                </span>
                <ArrowRight size={17} />
              </Link>
              <div className={s.roleTech} aria-label={`${role.title} work with`}>
                <div>
                  {role.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function AgencyCTA() {
  return (
    <section className={s.cta}>
      <div className={`${s.wrap} ${s.ctaInner}`}>
        <div>
          <p className={s.eyebrow}>Start a project</p>
          <h2 className={s.heading}>
            Tell us what you need.
            <br />
            We&apos;ll send a plan and a quote.
          </h2>
          <p>A new website, better Google rankings, an app, or an AI tool for your team.</p>
        </div>
        <Link className={s.button} href="/contact">
          Tell us what you&apos;re building <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
export const hiringFaqs = [
  [
    "Can I hire a developer for an existing project?",
    "Yes. Share your current project, priorities and the skills you need. We start by understanding the project and agree on responsibilities before work begins.",
  ],
  [
    "What engagement options can we discuss?",
    "We can discuss a defined project, ongoing development support, or a dedicated developer. Scope, availability, schedule, and pricing are agreed in your proposal.",
  ],
  [
    "Can your developers work with our team?",
    "Yes. Tell us about your tools, how your team works, and your time zone. We agree on communication and meeting times at the start.",
  ],
  [
    "Who owns the work and source code?",
    "Ownership and confidentiality terms are documented in the engagement agreement. We discuss access, documentation, and handover before the project starts.",
  ],
];
export const agencyFaqs = [
  [
    "What can Amex Technology help us build?",
    "We build websites, web apps, software products, mobile apps, and AI automations. Our services also include design, CRM setup, hosting and maintenance, and search optimization.",
  ],
  [
    "Can you improve an existing website or app?",
    "Yes. We can review your current product, fix problems, make it faster and easier to use on phones, or plan a larger redesign. You don't need to start from scratch.",
  ],
  [
    "Can we hire developers for our own team?",
    "Yes. Visit Hire Developers to explore our skills and tell us what support you need. We'll discuss the scope, how we'll work together, and availability with you.",
  ],
  [
    "How are cost and timelines decided?",
    "We scope the work around your goals, existing systems, and priorities. You receive a proposal with what you'll get, key dates, and pricing before building begins.",
  ],
  [
    "Do you work with international clients?",
    "Yes. We work with clients around the world, including the US, UK, Australia and Canada. We agree on communication, meeting times and delivery expectations at the start.",
  ],
];
export function AgencyFAQ({ hiring = false }: { hiring?: boolean }) {
  const items = hiring ? hiringFaqs : agencyFaqs;
  return (
    <section className={s.section}>
      <div className={`${s.wrap} ${s.faqGrid}`}>
        <div>
          <p className={s.eyebrow}>FAQ</p>
          <h2 className={s.heading}>
            Common
            <br />
            <em>questions.</em>
          </h2>
          <Link href="/contact" className={`${s.textLink} mt-5`}>
            Ask us something else <ArrowRight size={15} />
          </Link>
        </div>
        <div className={s.faq}>
          {items.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export const aiAgentExample = {
  question: "What needs my attention today?",
  answer:
    "Three things. Invoice 2087 for Northwind is 9 days overdue. The Harlow project is due on the 18th in your schedule, but the customer was told the 15th. Two new enquiries from yesterday haven't had a reply yet. Want me to draft the follow-ups?",
};
export function AiAgentChat() {
  return (
    <div className={s.chat}>
      <small>Illustrative example</small>
      <p className={s.q}>{aiAgentExample.question}</p>
      <p className={s.a}>{aiAgentExample.answer}</p>
    </div>
  );
}
export function AiAgentFeature() {
  return (
    <div className={`${s.panel} ${s.featurePanel}`}>
      <div>
        <span className={s.badge}>New</span>
        <h3>AI Assistant for your business</h3>
        <p>
          Ask your business anything. An AI assistant connected to the tools you
          already use (spreadsheets, project boards, accounting, CRM, email)
          that answers status questions, flags overdue items and mismatched
          dates, and keeps your systems in sync.
        </p>
        <Link className={s.textLink} href="/ai-operations-agent">
          See how it works <ArrowRight size={15} />
        </Link>
      </div>
      <AiAgentChat />
    </div>
  );
}
const offers = [
  {
    title: "Websites for trade businesses",
    desc: "A 5-page site on your own domain with a quote form and Google basics, for plumbers, heating and cooling companies, handymen and contractors.",
    href: "/trade-business-websites",
  },
  {
    title: "Fix your app problem in 24 hours",
    desc: "Stuck on an error in an app built with Lovable, Bolt, Supabase or Firebase? Send it over for a free assessment.",
    href: "/fix",
  },
  {
    title: "Free Website Grader",
    desc: "See your site's score and what's costing you calls, in about 10 seconds.",
    href: "/tools/website-grader",
  },
  {
    title: "Free App Checker",
    desc: "Check a web app for common problems before your customers find them.",
    href: "/tools/app-checker",
  },
];
export function OffersSection() {
  return (
    <section className={`${s.section} border-t border-[#dadcd1]`}>
      <div className={s.wrap}>
        <div className={s.sectionHead}>
          <div>
            <p className={s.eyebrow}>Quick ways to start</p>
            <h2 className={s.heading}>
              Start small. <em>See results first.</em>
            </h2>
          </div>
        </div>
        <div className={`${s.serviceGrid} ${s.offerGrid}`}>
          {offers.map((offer, i) => (
            <article className={s.service} key={offer.href}>
              <div className={s.serviceTop}>
                <span>0{i + 1}</span>
              </div>
              <h3>{offer.title}</h3>
              <p>{offer.desc}</p>
              <Link className={s.textLink} href={offer.href}>
                Learn more <ArrowRight size={14} />
                <span className="sr-only">: {offer.title}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
