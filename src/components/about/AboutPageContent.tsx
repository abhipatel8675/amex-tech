"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const techStack = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "FastAPI",
  "PostgreSQL", "Supabase", "MongoDB", "Redis", "GraphQL", "REST APIs",
  "React Native", "Expo", "Flutter", "AWS", "Vercel", "Docker",
  "GitHub Actions", "Tailwind CSS", "Figma", "Stripe", "OpenAI", "Firebase",
];

const values = [
  {
    title: "Honesty Over Hype",
    desc: "We tell you what's feasible before you commit, not after. If your timeline is tight or your scope is bigger than your budget, we'll say so.",
  },
  {
    title: "Code as Craft",
    desc: "We don't ship code we're embarrassed by. Clean architecture, readable code, and thoughtful structure are non-negotiable.",
  },
  {
    title: "Outcomes, Not Hours",
    desc: "Our success is measured by whether your product works in production and drives your business goals — not by ticket velocity.",
  },
  {
    title: "Long-Term Thinking",
    desc: "We build for the codebase you'll have in two years, not just the MVP you need today. Maintainability is a feature.",
  },
];

const expertise = [
  "5+ years of full-stack development experience",
  "10+ production applications shipped",
  "Expert in React, Next.js, Node.js, and TypeScript",
  "Mobile apps for iOS and Android with React Native",
  "SaaS architecture: multi-tenancy, billing, user management",
  "API design, integration, and documentation",
  "Cloud infrastructure on AWS and Vercel",
  "CI/CD pipelines with GitHub Actions",
  "UI/UX design and prototyping in Figma",
  "AI integration: OpenAI, Claude, Gemini APIs",
];

export default function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-4">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            We build software that works in the real world.
          </h1>
          <p className="text-[#555] text-base md:text-lg leading-relaxed">
            Amex Technology is a software development agency founded in 2019. We partner with
            startups and enterprises to design, build, and scale digital products — from first line
            of code to production and beyond.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#1a1a1a] bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2019", label: "Founded" },
              { value: "5+", label: "Years Experience" },
              { value: "10+", label: "Projects Shipped" },
              { value: "100%", label: "Satisfaction Rate" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-white mb-1.5">{stat.value}</p>
                <p className="text-sm text-[#555]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-4">
              Our Mission
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Help businesses build technology that creates real value.
            </h2>
            <p className="text-[#555] leading-relaxed">
              Most software agencies optimize for the demo. We optimize for production. Our goal is
              to deliver software that businesses can rely on — systems that are secure, scalable,
              maintainable, and actually solve the problems they were built to solve.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-4">
              Our Vision
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Be the technical partner every founder wishes they had.
            </h2>
            <p className="text-[#555] leading-relaxed">
              The best founders focus on their product and customers, not on debugging infrastructure
              or rewriting bad code. We want to be the engineering team that takes that burden off
              their plate and earns their trust through consistent, high-quality delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-4">
                Our Expertise
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
                What we do exceptionally well.
              </h2>
              <ul className="flex flex-col gap-3">
                {expertise.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#00dc82] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#666]">{item}</span>
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
              <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-4">
                Our Values
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
                The principles that guide our work.
              </h2>
              <div className="flex flex-col gap-5">
                {values.map((value, i) => (
                  <div
                    key={value.title}
                    className="p-5 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]"
                  >
                    <h3 className="text-sm font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-[#555] leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-xs font-medium text-[#00dc82] uppercase tracking-widest mb-3">
              Technology
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Our technology stack.
            </h2>
            <p className="mt-3 text-[#555] max-w-lg">
              We use modern, battle-tested tools — not whatever is trending on Twitter. Every
              technology in our stack is there because it solves a real problem reliably.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="text-sm text-[#666] bg-[#0a0a0a] border border-[#1a1a1a] px-3.5 py-1.5 rounded-lg hover:border-[#2a2a2a] hover:text-[#888] transition-colors"
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
