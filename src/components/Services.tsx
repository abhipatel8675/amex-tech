"use client";

import { motion } from "framer-motion";
import { Bug, Code2, Rocket, Smartphone, Bot, ArrowRight, Check, Sparkles } from "lucide-react";

const services = [
  {
    icon: Bot,
    tag: "🔥 Most Popular",
    title: "AI App Fix & Deploy",
    desc: "Built with Lovable, Bolt.new, Replit, Base44, Cursor, or v0? We fix, polish, and deploy it to production.",
    features: ["Fix broken AI-generated code", "Connect real APIs & databases", "Deploy to Vercel/AWS", "Make it production-ready"],
    packages: [
      { name: "Quick Fix", price: "₹799", amount: 799, delivery: "24hrs", desc: "Fix 1-3 critical issues" },
      { name: "Full Polish", price: "₹1,999", amount: 1999, delivery: "48hrs", desc: "Fix + deploy + optimization" },
      { name: "Complete", price: "₹4,999", amount: 4999, delivery: "72hrs", desc: "Full rewrite + deploy + 1 week support" },
    ],
    accent: "#6366F1",
  },
  {
    icon: Sparkles,
    tag: "🤖 New",
    title: "AI Integration & Development",
    desc: "Add AI features to your app or build full AI-powered products. ChatGPT, Claude, Gemini, RAG, agents — we handle it all.",
    features: ["OpenAI, Claude, Gemini API integration", "RAG systems + vector databases", "AI chatbots & custom agents", "LLM fine-tuning & prompt engineering"],
    packages: [
      { name: "Integration", price: "₹2,499", amount: 2499, delivery: "3 days", desc: "Add AI to existing app" },
      { name: "AI Feature", price: "₹6,499", amount: 6499, delivery: "1 week", desc: "Full AI feature build" },
      { name: "AI Product", price: "₹16,499", amount: 16499, delivery: "3 weeks", desc: "Complete AI-powered app" },
    ],
    accent: "#c084fc",
  },
  {
    icon: Bug,
    tag: "Fast Turnaround",
    title: "Bug Fixes & Debugging",
    desc: "Ship fast. We debug and fix issues across your entire stack — frontend to backend.",
    features: ["React, Next.js, Node.js, Python", "PHP, Vue, Angular, TypeScript", "Django, Flask, GraphQL", "Supabase, MongoDB, Firebase"],
    packages: [
      { name: "Basic", price: "₹399", amount: 399, delivery: "24hrs", desc: "1 bug fixed" },
      { name: "Standard", price: "₹1,249", amount: 1249, delivery: "48hrs", desc: "Up to 5 bugs" },
      { name: "Premium", price: "₹2,499", amount: 2499, delivery: "72hrs", desc: "Unlimited bugs + code review" },
    ],
    accent: "#60a5fa",
  },
  {
    icon: Code2,
    tag: "Core Service",
    title: "Full Stack Web App",
    desc: "End-to-end web application built with modern stack. From architecture to deployment.",
    features: ["Next.js + React frontend", "Node.js / Python backend", "Supabase / MongoDB / Firebase", "Auth, payments, APIs"],
    packages: [
      { name: "Starter", price: "₹6,499", amount: 6499, delivery: "2 weeks", desc: "5 pages, basic auth" },
      { name: "Growth", price: "₹16,499", amount: 16499, delivery: "3 weeks", desc: "Full auth + DB + integrations" },
      { name: "Premium", price: "₹41,499", amount: 41499, delivery: "4 weeks", desc: "Full scope + 1 month support" },
    ],
    accent: "#a78bfa",
  },
  {
    icon: Rocket,
    tag: "DevOps",
    title: "Deployment & DevOps",
    desc: "Take your app live. We handle CI/CD, domain, SSL, environment setup, and monitoring.",
    features: ["AWS, Vercel, Netlify, Heroku", "Docker & CI/CD pipelines", "Domain + SSL setup", "Environment configuration"],
    packages: [
      { name: "Basic", price: "₹1,649", amount: 1649, delivery: "1 day", desc: "Deploy to Vercel/Netlify" },
      { name: "Standard", price: "₹3,299", amount: 3299, delivery: "2 days", desc: "AWS/Heroku + CI/CD" },
      { name: "Premium", price: "₹6,499", amount: 6499, delivery: "3 days", desc: "Full DevOps setup + monitoring" },
    ],
    accent: "#f59e0b",
  },
  {
    icon: Smartphone,
    tag: "Mobile",
    title: "Mobile App Development",
    desc: "Cross-platform mobile apps for iOS and Android. React Native, Flutter, Expo.",
    features: ["React Native + Expo", "Flutter + Swift", "Firebase integration", "App Store + Play Store ready"],
    packages: [
      { name: "MVP", price: "₹12,499", amount: 12499, delivery: "3 weeks", desc: "Core screens + auth" },
      { name: "Standard", price: "₹28,999", amount: 28999, delivery: "5 weeks", desc: "Full app + backend + deploy" },
      { name: "Premium", price: "₹57,999", amount: 57999, delivery: "8 weeks", desc: "Complex app + maintenance" },
    ],
    accent: "#ec4899",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;

  const handleBuy = (pkg: { name: string; price: string; amount: number; desc: string }) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${service.title} — ${pkg.name} package (${pkg.price}). ${pkg.desc}.`
    );
    window.location.href = `#contact?service=${encodeURIComponent(service.title)}&package=${encodeURIComponent(pkg.name)}&msg=${message}`;
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 hover:border-[#2f2f2f] transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${service.accent}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: service.accent }} />
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full border font-medium"
          style={{ borderColor: `${service.accent}40`, color: service.accent, background: `${service.accent}10` }}
        >
          {service.tag}
        </span>
      </div>

      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
      <p className="text-base text-[#6b7280] mb-4">{service.desc}</p>

      <ul className="space-y-1.5 mb-6">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-base text-[#9ca3af]">
            <Check className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {service.packages.map((p, i) => (
          <button
            key={p.name}
            onClick={() => handleBuy(p)}
            className={`rounded-xl p-3 border text-center transition-all hover:scale-105 ${
              i === 1
                ? "border-[#6366F1]/40 bg-indigo-500/5 hover:bg-indigo-500/10"
                : "border-[#1f1f1f] bg-[#0a0a0a] hover:border-[#2f2f2f]"
            }`}
          >
            <div className="text-sm text-[#6b7280] mb-1">{p.name}</div>
            <div className="text-base font-bold" style={{ color: i === 1 ? service.accent : "#ededed" }}>
              {p.price}
            </div>
            <div className="text-xs text-[#6b7280] mt-1">{p.delivery}</div>
          </button>
        ))}
      </div>

      <p className="text-xs text-[#6b7280] text-center">Click a package to get in touch</p>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 text-xs text-indigo-400 bg-indigo-500/10 border border-[#6366F1]/20 px-3 py-1.5 rounded-full mb-4">
          Services
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Build</h2>
        <p className="text-lg text-[#6b7280] max-w-xl mx-auto">
          Pick a package or get a custom quote. Every project includes clear communication, clean code, and on-time delivery.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-[#6366F1]/10 to-[#6366F1]/5 border border-[#6366F1]/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
        >
          <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
            <Code2 className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Custom Project</h3>
          <p className="text-base text-[#6b7280] mb-6">
            Have something specific in mind? Tell us your requirements and get a custom quote within 24 hours.
          </p>
          <a
            href="#contact"
            className="flex items-center gap-2 bg-indigo-500 text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-500/90 transition-all hover:scale-105 text-sm"
          >
            Get Custom Quote <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
