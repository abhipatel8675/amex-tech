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
  { icon: Code2, title: "Honesty Over Hype", desc: "We tell you what's feasible before you commit — not after. If your timeline is tight or scope too large for budget, we say so.", color: "#E1BC4A" },
  { icon: ShieldCheck, title: "Code as Craft", desc: "We don't ship code we're embarrassed by. Clean architecture, readable code, and thoughtful structure are non-negotiable.", color: "#D4AF37" },
  { icon: Clock, title: "Outcomes, Not Hours", desc: "Our success is measured by whether your product drives business goals — not by ticket velocity or billable hours.", color: "#38BDF8" },
  { icon: HeartHandshake, title: "Long-Term Thinking", desc: "We build for the codebase you'll have in two years. Maintainability and scalability are features, not nice-to-haves.", color: "#F472B6" },
];

const expertise = [
  "5+ years of full-stack development experience",
  "200+ production applications shipped to real users",
  "Expert in React, Next.js, Node.js, and TypeScript",
  "Mobile apps for iOS and Android with React Native",
  "SaaS architecture: multi-tenancy, billing, user management",
  "API design, third-party integrations, and documentation",
  "Cloud infrastructure on AWS and Vercel",
  "CI/CD pipelines and automated deployment workflows",
  "UI/UX design and interactive prototyping in Figma",
  "AI integration: OpenAI, Claude, Gemini, RAG systems",
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
    color: "#E1BC4A",
  },
  {
    icon: Layers,
    step: "02",
    title: "Build",
    desc: "Design and engineering in tight loops. You see real progress every week, not a big-bang reveal at the end.",
    color: "#D4AF37",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch",
    desc: "Deployed, monitored, and handed off with documentation. We stay involved until everything is running smoothly.",
    color: "#38BDF8",
  },
];

export default function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #D4AF37, transparent 70%)" }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-6"
        >
          <p className="text-sm font-semibold text-[#E1BC4A] uppercase tracking-widest mb-5">About Us</p>
          <h1 className="text-[clamp(2.5rem,10vw,6rem)] md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05] max-w-3xl break-words">
            We build software that{" "}
            <span style={{ background: "linear-gradient(135deg, #E1BC4A, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              works in the real world.
            </span>
          </h1>
          <p className="text-slate-300 text-xl md:text-2xl leading-9 max-w-2xl mb-8">
            Amex Technology is a software development agency founded in 2019. We partner with startups and enterprises to design, build, and scale digital products — from first line of code to production and beyond.
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
                <span className="text-3xl font-bold text-white" style={{ background: "linear-gradient(135deg, #E1BC4A, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</span>
                <span className="text-sm text-slate-400 font-medium">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-white/[0.06]" style={{ background: "linear-gradient(180deg, rgba(212,175,55,0.04), rgba(212,175,55,0.02))" }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-white/[0.06]">
            {[
              { value: "2019", label: "Founded", sub: "Est. 6 years ago" },
              { value: "5+", label: "Years Experience", sub: "Full-stack expertise" },
              { value: "200+", label: "Projects Shipped", sub: "Across 6 industries" },
              { value: "100%", label: "Satisfaction Rate", sub: "Zero failed projects" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="text-center md:px-8"
              >
                <p className="text-3xl sm:text-5xl font-bold mb-2" style={{ background: "linear-gradient(135deg, #E2E8F0, #94A3B8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{stat.value}</p>
                <p className="text-base font-semibold text-slate-300 mb-1">{stat.label}</p>
                <p className="text-sm text-slate-500">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              label: "Our Mission",
              heading: "Help businesses build technology that creates real value.",
              body: "Most agencies optimize for the demo. We optimize for production. Our goal is to deliver software that businesses can rely on — secure, scalable, maintainable, and designed to actually solve the problems it was built for.",
              accent: "#E1BC4A",
            },
            {
              label: "Our Vision",
              heading: "Be the technical partner every founder wishes they had.",
              body: "The best founders focus on product and customers, not infrastructure. We want to be the engineering team that earns trust through consistent, high-quality delivery and honest advice.",
              accent: "#D4AF37",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-9 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.11] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 inset-x-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${item.accent}80, transparent)` }} />
              <p className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: item.accent }}>{item.label}</p>
              <h2 className="text-2xl font-bold text-white mb-5 leading-snug">{item.heading}</h2>
              <p className="text-base text-slate-300 leading-7">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expertise + Values */}
      <section className="py-16 md:py-24 border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #0B0F19, #0D1220, #0B0F19)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold text-[#E1BC4A] uppercase tracking-widest mb-5">Expertise</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10 leading-tight">What we do exceptionally well.</h2>
              <ul className="flex flex-col gap-4">
                {expertise.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#E1BC4A]" />
                    </div>
                    <span className="text-base text-slate-300 leading-7">{item}</span>
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
              <p className="text-sm font-semibold text-[#E1BC4A] uppercase tracking-widest mb-5">Values</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10 leading-tight">The principles that guide every project.</h2>
              <div className="flex flex-col gap-4">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div key={value.title} className="group relative flex gap-5 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.11] transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 inset-x-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${value.color}50, transparent)` }} />
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border" style={{ background: `${value.color}12`, borderColor: `${value.color}30` }}>
                        <Icon style={{ color: value.color, width: "18px", height: "18px" }} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white mb-2">{value.title}</h3>
                        <p className="text-sm text-slate-400 leading-7">{value.desc}</p>
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
      <section className="py-16 md:py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <p className="text-sm font-semibold text-[#E1BC4A] uppercase tracking-widest mb-4">How We Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">From idea to live product.</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-8">
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
                  className="relative p-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.11] transition-all duration-300 overflow-hidden group"
                >
                  <div className="absolute top-0 inset-x-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${step.color}70, transparent)` }} />
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{ background: `${step.color}12`, borderColor: `${step.color}30` }}>
                      <Icon style={{ color: step.color, width: "22px", height: "22px" }} />
                    </div>
                    <span className="text-4xl font-bold tabular-nums" style={{ color: `${step.color}20` }}>{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-7">{step.desc}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-white/10" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-20 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-sm font-semibold text-[#E1BC4A] uppercase tracking-widest mb-4">Technology</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Our technology stack.</h2>
            <p className="text-slate-300 text-lg max-w-xl leading-8">
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
                className="text-sm font-medium text-slate-300 bg-white/[0.03] border border-white/[0.07] px-4 py-2 rounded-xl hover:border-[#D4AF37]/30 hover:text-slate-100 hover:bg-[#D4AF37]/5 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #0B0F19, #0D1220)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-12 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #E1BC4A80, transparent)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08), transparent 70%)" }} />
            <p className="text-sm font-semibold text-[#E1BC4A] uppercase tracking-widest mb-5 relative">Ready to build?</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight relative">
              Let's turn your idea into a product<br className="hidden md:block" /> people actually use.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-8 relative">
              Tell us what you're working on. We'll come back within 4 hours with an honest plan — no obligations, no sales pitch.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-base font-semibold text-white px-8 py-4 rounded-xl transition-all duration-200 btn-glow"
                style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B89225 100%)" }}
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-base font-semibold text-slate-300 hover:text-white px-8 py-4 rounded-xl border border-white/[0.08] hover:border-white/[0.18] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200"
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
