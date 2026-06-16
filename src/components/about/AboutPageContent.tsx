"use client";

import { motion } from "framer-motion";
import { Check, Code2, ShieldCheck, Clock, HeartHandshake } from "lucide-react";

const techStack = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "FastAPI",
  "PostgreSQL", "Supabase", "MongoDB", "Redis", "GraphQL", "REST APIs",
  "React Native", "Expo", "Flutter", "AWS", "Vercel", "Docker",
  "GitHub Actions", "Tailwind CSS", "Figma", "Stripe", "OpenAI", "Firebase",
];

const values = [
  { icon: Code2, title: "Honesty Over Hype", desc: "We tell you what's feasible before you commit — not after. If your timeline is tight or scope too large for budget, we say so.", color: "#818CF8" },
  { icon: ShieldCheck, title: "Code as Craft", desc: "We don't ship code we're embarrassed by. Clean architecture, readable code, and thoughtful structure are non-negotiable.", color: "#A78BFA" },
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

export default function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #6366F1, transparent 70%)" }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-6xl mx-auto px-6"
        >
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-5">About Us</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-7 leading-tight max-w-3xl">
            We build software that{" "}
            <span style={{ background: "linear-gradient(135deg, #818CF8, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              works in the real world.
            </span>
          </h1>
          <p className="text-slate-300 text-xl leading-8 max-w-2xl">
            Amex Technology is a software development agency founded in 2019. We partner with startups and enterprises to design, build, and scale digital products — from first line of code to production and beyond.
          </p>
        </motion.div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-white/[0.06]" style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.04), rgba(99,102,241,0.02))" }}>
        <div className="max-w-6xl mx-auto px-6 py-14">
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
                <p className="text-5xl font-bold text-white mb-2" style={{ background: "linear-gradient(135deg, #E2E8F0, #94A3B8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{stat.value}</p>
                <p className="text-base font-semibold text-slate-300 mb-1">{stat.label}</p>
                <p className="text-sm text-slate-500">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              label: "Our Mission",
              heading: "Help businesses build technology that creates real value.",
              body: "Most agencies optimize for the demo. We optimize for production. Our goal is to deliver software that businesses can rely on — secure, scalable, maintainable, and designed to actually solve the problems it was built for.",
              accent: "#818CF8",
            },
            {
              label: "Our Vision",
              heading: "Be the technical partner every founder wishes they had.",
              body: "The best founders focus on product and customers, not infrastructure. We want to be the engineering team that earns trust through consistent, high-quality delivery and honest advice.",
              accent: "#A78BFA",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-9 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.11] transition-all duration-300"
            >
              <p className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: item.accent }}>{item.label}</p>
              <h2 className="text-2xl font-bold text-white mb-5 leading-snug">{item.heading}</h2>
              <p className="text-base text-slate-300 leading-7">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expertise + Values */}
      <section className="py-32 border-t border-white/[0.06]" style={{ background: "linear-gradient(180deg, #0B0F19, #0D1220, #0B0F19)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-5">Expertise</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10 leading-tight">What we do exceptionally well.</h2>
              <ul className="flex flex-col gap-4">
                {expertise.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-indigo-400" />
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
              <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-5">Values</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10 leading-tight">The principles that guide every project.</h2>
              <div className="flex flex-col gap-4">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div key={value.title} className="group flex gap-5 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.11] transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border" style={{ background: `${value.color}12`, borderColor: `${value.color}25` }}>
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

      {/* Tech Stack */}
      <section className="py-32 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Technology</p>
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
                className="text-sm font-medium text-slate-300 bg-white/[0.03] border border-white/[0.07] px-4 py-2 rounded-xl hover:border-indigo-500/30 hover:text-slate-100 hover:bg-indigo-500/5 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
