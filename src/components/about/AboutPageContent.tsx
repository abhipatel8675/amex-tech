"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Code2, ShieldCheck, Clock, HeartHandshake, ArrowRight, Search, Layers, Rocket } from "lucide-react";

const techStack = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "FastAPI",
  "PostgreSQL", "Supabase", "MongoDB", "Redis", "GraphQL", "REST APIs",
  "React Native", "Expo", "Flutter", "AWS", "Vercel", "Docker",
  "GitHub Actions", "Tailwind CSS", "Figma", "Stripe", "OpenAI", "Firebase",
];

const values = [
  { icon: Code2, title: "Honesty Over Hype", desc: "We tell you what's feasible before you commit — not after. If your timeline is tight or scope too large for budget, we say so.", color: "#7A5807" },
  { icon: ShieldCheck, title: "Code as Craft", desc: "We don't ship code we're embarrassed by. Clean architecture, readable code, and thoughtful structure are non-negotiable.", color: "#7A5807" },
  { icon: Clock, title: "Outcomes, Not Hours", desc: "Our success is measured by whether your product drives business goals — not by ticket velocity or billable hours.", color: "#9C7208" },
  { icon: HeartHandshake, title: "Long-Term Thinking", desc: "We build for the codebase you'll have in two years. Maintainability and scalability are features, not nice-to-haves.", color: "#9C7208" },
];

const expertise = [
  "5+ years building production web, mobile and AI products",
  "AI agents and automation with OpenAI, Claude, n8n, Make and Zapier",
  "Websites and web apps in Next.js, React, TypeScript and Supabase",
  "AI SaaS MVPs with Stripe billing, multi-tenant data and Row Level Security",
  "Rescuing and hardening apps built in Lovable, Bolt and Replit",
  "SEO, GEO and AEO: found on Google and recommended by AI assistants",
  "GoHighLevel and HubSpot CRM setups and lead automation",
  "iOS and Android apps with React Native and Expo",
  "Cloud, DevOps and care plans on Vercel, AWS and Cloudflare",
  "UI/UX design and interactive prototyping in Figma",
];

const miniStats = [
  { value: "5+", label: "Years Building" },
  { value: "200+", label: "Projects Shipped" },
  { value: "50+", label: "Happy Clients" },
  { value: "4h", label: "Avg. Response" },
];

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    desc: "We start with a deep-dive into your goals, users, and constraints. No assumptions — just honest scoping.",
    color: "#7A5807",
  },
  {
    icon: Layers,
    step: "02",
    title: "Build",
    desc: "Design and engineering in tight loops. You see real progress every week, not a big-bang reveal at the end.",
    color: "#7A5807",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch",
    desc: "Deployed, monitored, and handed off with documentation. We stay involved until everything is running smoothly.",
    color: "#9C7208",
  },
];

export default function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #B8860B, transparent 70%)" }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-6"
        >
          <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-widest mb-5">About Us</p>
          <h1 className="text-[clamp(2.5rem,10vw,6rem)] md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05] max-w-3xl break-words">
            We build software that{" "}
            <span style={{ background: "linear-gradient(135deg, #CC9A1A, #B8860B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              works in the real world.
            </span>
          </h1>
          <p className="text-slate-700 text-xl md:text-2xl leading-9 max-w-2xl mb-8">
            Amex Technology is an independent AI and software agency founded by Abhi Patel in 2019. We build AI agents, websites, web and mobile apps and SaaS products for startups and growing businesses, and make sure their customers can find them on Google and in AI assistants.
          </p>

          {/* Mini stats inline */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 mt-2">
            {miniStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                className="flex items-baseline gap-2"
              >
                <span className="text-3xl font-bold text-slate-900" style={{ background: "linear-gradient(135deg, #CC9A1A, #B8860B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</span>
                <span className="text-sm text-slate-600 font-medium">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              label: "Our Mission",
              heading: "Help businesses build technology that creates real value.",
              body: "Most agencies optimize for the demo. We optimize for production. Our goal is to deliver software that businesses can rely on — secure, scalable, maintainable, and designed to actually solve the problems it was built for.",
              accent: "#CC9A1A",
            },
            {
              label: "Our Vision",
              heading: "Be the technical partner every founder wishes they had.",
              body: "The best founders focus on product and customers, not infrastructure. We want to be the engineering team that earns trust through consistent, high-quality delivery and honest advice.",
              accent: "#B8860B",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-9 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 inset-x-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${item.accent}80, transparent)` }} />
              <p className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: item.accent }}>{item.label}</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-5 leading-snug">{item.heading}</h2>
              <p className="text-base text-slate-700 leading-7">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expertise + Values */}
      <section className="py-16 md:py-24 border-t border-slate-200" style={{ background: "linear-gradient(180deg, #FFFFFF, #F8FAFC, #FFFFFF)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-widest mb-5">Expertise</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-10 leading-tight">What we do exceptionally well.</h2>
              <ul className="flex flex-col gap-4">
                {expertise.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#B8860B]/15 border border-[#B8860B]/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#7A5807]" />
                    </div>
                    <span className="text-base text-slate-700 leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-widest mb-5">Values</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-10 leading-tight">The principles that guide every project.</h2>
              <div className="flex flex-col gap-4">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div key={value.title} className="group relative flex gap-5 p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 inset-x-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${value.color}50, transparent)` }} />
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border" style={{ background: `${value.color}12`, borderColor: `${value.color}30` }}>
                        <Icon style={{ color: value.color, width: "18px", height: "18px" }} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 mb-2">{value.title}</h3>
                        <p className="text-sm text-slate-600 leading-7">{value.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-16 md:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-widest mb-4">How We Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">From idea to live product.</h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto leading-8">
              A straightforward process built around transparency, fast feedback loops, and zero surprises.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 transition-all duration-300 overflow-hidden group"
                >
                  <div className="absolute top-0 inset-x-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${step.color}70, transparent)` }} />
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{ background: `${step.color}12`, borderColor: `${step.color}30` }}>
                      <Icon style={{ color: step.color, width: "22px", height: "22px" }} />
                    </div>
                    <span className="text-4xl font-bold tabular-nums" style={{ color: `${step.color}20` }}>{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-7">{step.desc}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-slate-900/10" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-widest mb-4">Technology</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Our technology stack.</h2>
            <p className="text-slate-700 text-lg max-w-xl leading-8">
              Modern, battle-tested tools chosen for reliability and long-term viability — not whatever is trending this week.
            </p>
          </motion.div>
          <div className="flex flex-wrap gap-2.5">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
                className="text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl hover:border-[#B8860B]/30 hover:text-slate-800 hover:bg-[#B8860B]/5 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-slate-200" style={{ background: "linear-gradient(180deg, #FFFFFF, #F8FAFC)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-slate-200 bg-slate-50 p-12 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #CC9A1A80, transparent)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.08), transparent 70%)" }} />
            <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-widest mb-5 relative">Ready to build?</p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight relative">
              Let's turn your idea into a product<br className="hidden md:block" /> people actually use.
            </h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto mb-10 leading-8 relative">
              Tell us what you're working on. We'll come back within 4 hours with an honest plan — no obligations, no sales pitch.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-base font-semibold text-white px-8 py-4 rounded-xl transition-all duration-200 btn-glow"
                style={{ background: "linear-gradient(135deg, #B8860B 0%, #9C7208 100%)" }}
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-base font-semibold text-slate-700 hover:text-slate-900 px-8 py-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all duration-200"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
