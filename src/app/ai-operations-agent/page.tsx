import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardList,
  MessageSquare,
  RefreshCw,
  Send,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AiAgentChat } from "@/components/agency/AgencySections";
import s from "@/components/agency/agency.module.css";

const url = "https://amextechnology.com/ai-operations-agent";
const title = "AI Operations Agent for Small Manufacturers";
const description =
  "Ask your factory anything. An AI assistant connected to monday.com, Smartsheet, Google Sheets, inFlow, QuickBooks and email: order status, daily exceptions and system sync. Fixed written quote before we start.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Amex Technology` },
  description,
  alternates: { canonical: url },
  openGraph: {
    title: `${title} | Amex Technology`,
    description,
    url,
    type: "website",
  },
  twitter: { title: `${title} | Amex Technology`, description },
};

const contactHref = `/contact?service=${encodeURIComponent("AI Operations Agent")}&message=${encodeURIComponent(
  "I'd like to talk about the AI Operations Agent founding-client pilot.\n\nCompany:\nWhat we make:\nNumber of staff:\nTools we use today (monday.com, Smartsheet, Google Sheets, inFlow, QuickBooks, other):\nBiggest order-status headache:",
)}`;

const problems = [
  "“Where’s my order?” calls and emails that take 20 minutes to answer",
  "The same job entered in two or three systems by hand",
  "Ship dates that don’t match between the schedule and what the customer was told",
  "Missing parts discovered on the day a job should start",
];

const features = [
  {
    icon: MessageSquare,
    title: "Order status on demand",
    body: "Ask in chat, email or Slack: “Where is order 1042?” The agent checks your schedule, inventory and email and replies with one plain-English answer, with links back to the source.",
  },
  {
    icon: ClipboardList,
    title: "Daily exceptions report",
    body: "Every morning, a short list of what needs attention: late orders, missing or back-ordered parts, and dates that don’t match between systems. Your team starts the day on problems, not on searching.",
  },
  {
    icon: RefreshCw,
    title: "Automatic sync between tools",
    body: "When a job moves in one system, the change is copied to the others, so nobody types the same order twice and the boards stay consistent.",
  },
  {
    icon: Send,
    title: "Customer and dealer updates",
    body: "Status updates for customers and dealers, drafted or sent automatically when an order reaches a milestone or a date changes. You decide which messages need a human to approve them.",
  },
];

const tools = [
  "monday.com",
  "Smartsheet",
  "Google Sheets",
  "inFlow Inventory",
  "QuickBooks",
  "Gmail / Outlook",
  "Slack",
];

const industries = [
  "Cabinets",
  "Millwork",
  "Countertops",
  "Metal fabrication",
  "Signage",
  "Furniture",
  "Packaging",
];

const steps = [
  {
    title: "Discovery call",
    body: "We learn how an order moves through your shop, which tools hold which data, and the questions your team answers most often.",
  },
  {
    title: "Map your systems",
    body: "We connect to your tools with read-only access first and map how the same job appears in each one.",
  },
  {
    title: "Build and test",
    body: "We set up order-status answers and the daily exceptions report, then test them against your real orders with your team.",
  },
  {
    title: "Pilot and improve",
    body: "Your team uses it day to day. We tune answers, add sync and customer updates, and agree on ongoing support.",
  },
];

const faqs = [
  {
    question: "What tools can the AI Operations Agent connect to?",
    answer:
      "It works with monday.com, Smartsheet, Google Sheets, inventory software like inFlow and QuickBooks, email (Gmail or Outlook) and Slack. Other tools can usually be connected if they have an API or a regular export; we confirm this on the first call.",
  },
  {
    question: "Do we have to change how we work or move to new software?",
    answer:
      "No. The agent sits on top of the tools you already use. Your team keeps working in the same boards and sheets, and asks the agent questions in chat, email or Slack.",
  },
  {
    question: "Is our data safe?",
    answer:
      "Your data stays in your own accounts. We start with read-only access, connect only the tools needed for the agreed scope, and document every connection. Write access, for syncing or sending updates, is added only when you approve it.",
  },
  {
    question: "How much does it cost?",
    answer:
      "The price depends on how many systems are connected and how much custom work is needed, and it is agreed in writing before work starts.",
  },
  {
    question: "What is the founding-client pilot?",
    answer:
      "We are onboarding a small number of manufacturers as founding clients. You work directly with the founder, the agent is set up around your real orders, and your feedback shapes what it does next. Scope and price are agreed before we begin.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${url}#service`,
  name: "AI Operations Agent for Small Manufacturers",
  serviceType: "AI operations assistant and workflow automation",
  description,
  url,
  provider: { "@id": "https://amextechnology.com/#organization" },
  areaServed: { "@type": "Country", name: "United States" },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Small and mid-sized manufacturers (20–200 employees)",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
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
    { "@type": "ListItem", position: 2, name: "AI Operations Agent", item: url },
  ],
};

export default function AiOperationsAgentPage() {
  return (
    <>
      {[serviceSchema, faqSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar />
      <main id="main-content" className={s.site}>
        {/* 1. Hero */}
        <section className={s.pageHero}>
          <div className={s.wrap}>
            <nav aria-label="Breadcrumb" className={s.crumbs}>
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <span aria-current="page">AI Operations Agent</span>
                </li>
              </ol>
            </nav>
            <div className={s.heroGrid}>
              <div>
                <p className={s.eyebrow}>
                  AI Operations Agent · For small manufacturers
                </p>
                <h1>
                  Ask your factory anything.
                  <br />
                  <em>Get the answer in seconds.</em>
                </h1>
                <p className={s.intro}>
                  An AI assistant connected to the tools your shop already runs
                  on (monday.com, Smartsheet, Google Sheets, inventory software
                  like inFlow or QuickBooks, and email). Ask where an order
                  stands and get one answer from every system, without opening
                  five tabs or walking the floor.
                </p>
                <div className={s.actions}>
                  <Link className={s.button} href={contactHref}>
                    Apply for a founding-client pilot <ArrowUpRight size={17} />
                  </Link>
                  <Link className={s.outline} href="#how-it-works">
                    See how it works <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <AiAgentChat />
            </div>
          </div>
        </section>

        {/* 2. The problem */}
        <section className={s.section}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>The problem</p>
                <h2 className={s.heading}>
                  Your order status lives <em>in five places.</em>
                </h2>
              </div>
              <p className={s.sectionText}>
                The schedule is in one tool, inventory in another, customer
                promises in email, and the real answer is in someone&apos;s
                head. So the same questions get asked all day, the same data
                gets typed twice, and a late order is noticed when the customer
                calls.
              </p>
            </div>
            <ul className={s.checks}>
              {problems.map((item) => (
                <li key={item}>
                  <Check size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. What it does */}
        <section
          className={`${s.section} border-t border-[#dadcd1]`}
          id="features"
        >
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>What it does</p>
                <h2 className={s.heading}>
                  One assistant. <em>Every system.</em>
                </h2>
              </div>
            </div>
            <div className={`${s.serviceGrid} ${s.twoGrid}`}>
              {features.map((feature, i) => (
                <article className={s.service} key={feature.title}>
                  <div className={s.serviceTop}>
                    <feature.icon aria-hidden="true" />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Works with your tools */}
        <section className={`${s.section} ${s.band}`}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>Works with your tools</p>
                <h2 className={s.heading}>
                  No new software <em>for your team to learn.</em>
                </h2>
              </div>
              <p className={s.sectionText}>
                The agent connects to the systems you already pay for. These are
                tools it can connect to, not partnerships or endorsements.
              </p>
            </div>
            <div className={s.chips}>
              {tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#626960]">
              Using something else? If it has an API or a regular export, it can
              usually be connected. We confirm this on the first call.
            </p>
          </div>
        </section>

        {/* 5. Who it's for */}
        <section className={s.section}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>Who it&apos;s for</p>
                <h2 className={s.heading}>
                  Built for small <em>and mid-sized shops.</em>
                </h2>
              </div>
              <p className={s.sectionText}>
                Manufacturers with roughly 20 to 200 people, made-to-order or
                short-run work, and an office team that spends too much time
                chasing status.
              </p>
            </div>
            <div className={s.chips}>
              {industries.map((industry) => (
                <span key={industry}>{industry}</span>
              ))}
            </div>
          </div>
        </section>

        {/* 6. How it works */}
        <section
          className={`${s.section} border-t border-[#dadcd1]`}
          id="how-it-works"
        >
          <div className={s.wrap}>
            <p className={s.eyebrow}>How it works</p>
            <h2 className={s.heading}>
              From first call <em>to a working pilot.</em>
            </h2>
            <ol className={s.process}>
              {steps.map((step, i) => (
                <li className={s.processStep} key={step.title}>
                  <span>0{i + 1} /</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7. Built from real work */}
        <section className={`${s.section} ${s.dark}`}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>Why us</p>
                <h2 className={s.heading}>
                  Built for a real <em>production workflow.</em>
                </h2>
              </div>
              <div>
                <p className={s.sectionText}>
                  This agent was built for a real manufacturer&apos;s production
                  workflow, not a demo. Amex Technology is an independent
                  software and AI agency: our founder, Abhi Patel, is based in
                  Los Angeles, our development team is in India, and we are Top
                  Rated Plus on Upwork with $80K+ earned and 5 years of building
                  software for clients.
                </p>
                <div className={s.checkList}>
                  {[
                    "Your data stays in your accounts",
                    "Read-only access to start",
                    "You own the setup and documentation",
                  ].map((item) => (
                    <span key={item}>
                      <Check size={13} aria-hidden="true" /> {item}
                    </span>
                  ))}
                </div>
                <Link href="/about" className={`${s.textLink} mt-4`}>
                  More about us <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Engagement and pilot */}
        <section className={s.section}>
          <div className={s.wrap}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>How we work together</p>
                <h2 className={s.heading}>
                  Setup, then support. <em>Agreed before we start.</em>
                </h2>
              </div>
            </div>
            <div className={s.priceGrid}>
              <article className={s.model}>
                <h3>Setup</h3>
                <p>One-time project to connect your tools and set up the agent.</p>
                <ul>
                  <li>Discovery and system mapping</li>
                  <li>Connections to your tools</li>
                  <li>Order-status answers and daily exceptions report</li>
                  <li>Testing with your team</li>
                </ul>
              </article>
              <article className={s.model}>
                <h3>Monthly support</h3>
                <p>Ongoing care so the agent keeps up as your business changes.</p>
                <ul>
                  <li>Monitoring and fixes</li>
                  <li>Changes as your process changes</li>
                  <li>New reports and automations</li>
                  <li>Direct contact with the founder</li>
                </ul>
              </article>
            </div>
            <div className={`${s.panel} mt-5`}>
              <span className={s.badge}>Founding-client pilot</span>
              <h3 className="mt-4 mb-3 text-[22px] font-medium tracking-[-0.03em]">
                Be one of our first manufacturers.
              </h3>
              <p className="max-w-[720px] text-[15px] leading-[1.8] text-[#626960]">
                We are onboarding a small number of founding clients. Pilot
                clients work directly with the founder and help shape what the
                agent does next. Scope and price are agreed in writing before
                any work starts.
              </p>
              <div className={s.actions}>
                <Link className={s.button} href={contactHref}>
                  Apply for the pilot <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
            <p className="mt-5 text-[13px] leading-[1.7] text-[#626960]">
              Scope depends on the number of systems and how much custom
              work is needed. Results depend on the quality of the data in your
              tools; we don&apos;t promise specific savings.
            </p>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className={`${s.section} border-t border-[#dadcd1]`}>
          <div className={`${s.wrap} ${s.faqGrid}`}>
            <div>
              <p className={s.eyebrow}>Questions</p>
              <h2 className={s.heading}>
                Before you <em>apply.</em>
              </h2>
            </div>
            <div className={s.faq}>
              {faqs.map((f) => (
                <details key={f.question}>
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Closing CTA */}
        <section className={s.cta}>
          <div className={`${s.wrap} ${s.ctaInner}`}>
            <div>
              <p className={s.eyebrow}>Founding-client pilot</p>
              <h2 className={s.heading}>
                Stop chasing order status.
                <br />
                Start asking.
              </h2>
              <p>
                Tell us what you make and which tools you use. We&apos;ll reply
                with next steps and a time for a short call.
              </p>
            </div>
            <Link className={s.button} href={contactHref}>
              Apply for a founding-client pilot <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
