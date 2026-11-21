import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Bot,
  Smartphone,
  Layers,
  Cloud,
  Globe,
} from "lucide-react";
import { services } from "@/data/services";
import { serviceIcon } from "@/components/services/serviceIcons";
import s from "./agency.module.css";

export const roles = [
  {
    title: "React & Next.js developers",
    skill: "React / Next.js",
    icon: Code2,
    desc: "Fast websites, customer portals, and thoughtfully built web applications.",
  },
  {
    title: "Full-stack developers",
    skill: "Full-stack",
    icon: Layers,
    desc: "Frontend, backend, APIs, and databases that work together as one product.",
  },
  {
    title: "AI & automation developers",
    skill: "AI & Automation",
    icon: Bot,
    desc: "Practical AI agents, integrations, and workflows for your daily operations.",
  },
  {
    title: "Mobile app developers",
    skill: "Mobile App Development",
    icon: Smartphone,
    desc: "Cross-platform iOS and Android applications with React Native and Expo.",
  },
  {
    title: "Cloud & DevOps engineers",
    skill: "Cloud & DevOps",
    icon: Cloud,
    desc: "Reliable deployments, infrastructure, monitoring, and application maintenance.",
  },
  {
    title: "Website developers",
    skill: "Websites & Web Apps",
    icon: Globe,
    desc: "Conversion-focused business websites and improvements to your existing site.",
  },
];
export function hireLink(skill: string) {
  return `/contact?service=${encodeURIComponent("Hire Developers")}&message=${encodeURIComponent(`I'd like to discuss development support for ${skill}.\n\nProject overview:\nPreferred engagement:\nTimeline:\nRequired timezone overlap:`)}`;
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
          "We discuss technical requirements, available expertise, and how we'll collaborate with your existing team.",
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
          "We understand your users, business goals, and technical needs. You get a clear scope and a practical plan.",
        ],
        [
          "Design with purpose",
          "We shape the experience, prototype the important flows, and agree on the details before development.",
        ],
        [
          "Build together",
          "Work moves in focused milestones, with regular demos and direct communication with your engineers.",
        ],
        [
          "Launch & improve",
          "We test across devices, prepare the handover, and help your product grow after launch.",
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
            Need an engineer for an existing product or a team to build
            something new? Tell us the skills and support you need. We&apos;ll
            shape an engagement around your project.
          </p>
          <div className={s.actions}>
            <Link href="/hire-developers" className={s.button}>
              Explore developer hiring <ArrowRight size={16} />
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
          {roles.slice(0, 5).map((role, i) => (
            <Link
              className={s.roleRow}
              key={role.title}
              href={hireLink(role.skill)}
            >
              <span>
                <small>0{i + 1}</small>
                {role.title}
              </span>
              <ArrowRight size={17} />
            </Link>
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
    "Yes. Share your codebase, current priorities, and required skills. We start by understanding the project and agree on responsibilities before work begins.",
  ],
  [
    "What engagement options can we discuss?",
    "We can discuss a defined project, ongoing engineering support, or a dedicated development engagement. Scope, availability, schedule, and pricing are agreed in your proposal.",
  ],
  [
    "Can your developers work with our team?",
    "Yes. Tell us about your tools, delivery process, and time zone. We agree on communication and the required overlap during scoping.",
  ],
  [
    "Who owns the work and source code?",
    "Ownership and confidentiality terms are documented in the engagement agreement. We discuss access, repositories, documentation, and handover before the project starts.",
  ],
];
export const agencyFaqs = [
  [
    "What can Amex Technology help us build?",
    "We build websites, web applications, SaaS products, mobile apps, and AI automations. Our services also include product design, CRM integrations, cloud support, and search optimization.",
  ],
  [
    "Can you improve an existing website or app?",
    "Yes. We can review your current product, fix bugs, improve mobile usability and performance, or plan a larger redesign. You don't need to start from scratch.",
  ],
  [
    "Can we hire developers for our own team?",
    "Yes. Visit Hire Developers to explore our core skills and tell us what support you need. We'll discuss the scope, collaboration model, and availability with you.",
  ],
  [
    "How are cost and timelines decided?",
    "We scope the work around your goals, existing systems, and priorities. You receive a proposal with deliverables, milestones, and pricing before development begins.",
  ],
  [
    "Do you work with international clients?",
    "Yes. Our development team is in India and we work with clients across the US, UK, Australia, Canada and beyond. We agree on communication, meeting times and delivery expectations at the start.",
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
  question: "Where is order 1042 for Westside Kitchens?",
  answer:
    "Order 1042 is in finishing. 9 of 12 cabinet boxes are done; 3 are waiting on hinges that are on back order until Thursday. The ship date in your production schedule is the 18th, but the customer was quoted the 15th. Want me to draft an update to the customer?",
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
        <h3>AI Operations Agent for small manufacturers</h3>
        <p>
          Ask your factory anything. An AI assistant connected to the tools you
          already use (monday.com, Smartsheet, Google Sheets, inFlow,
          QuickBooks, email) that answers order-status questions, flags late
          orders and mismatched dates, and keeps your systems in sync.
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
    desc: "A 5-page site on your own domain with a quote form and Google basics, for plumbers, HVAC, handymen and contractors.",
    href: "/trade-business-websites",
  },
  {
    title: "Fix your app error in 24 hours",
    desc: "Stuck on a Supabase, Firebase, Lovable, Next.js or Vercel error? Send it over for a free assessment.",
    href: "/fix",
  },
  {
    title: "Free Website Grader",
    desc: "See your site's score and what's costing you calls, in about 10 seconds.",
    href: "/tools/website-grader",
  },
  {
    title: "Free App Checker",
    desc: "Check a web app for common launch problems before your users find them.",
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
