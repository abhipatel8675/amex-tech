// Homepage FAQ: rendered by FAQSection and emitted as FAQPage structured data on
// the homepage, so the visible answers and the schema never drift apart.
export const faqs: { question: string; answer: string }[] = [
  {
    question: "Is Amex Technology part of American Express?",
    answer:
      "No. Amex Technology (amextechnology.com) is an independent AI and software development agency founded by Abhi Patel in 2019. It has no affiliation with American Express or the American Express technology organization.",
  },
  {
    question: "How much does custom software development cost?",
    answer:
      "Cost depends on scope, complexity, and timeline. A professional website starts from $500–$2,000, a web application from $3,000–$10,000, and a full SaaS platform from $5,000+. We provide a detailed, itemised quote after a free discovery call — no commitment required.",
  },
  {
    question: "How long does it take to build a web application?",
    answer:
      "Most web applications take 6–12 weeks from kickoff to launch. A simple website can be delivered in 2–4 weeks. A complex SaaS platform with custom features typically takes 3–6 months. We share a milestone-by-milestone timeline during the proposal stage so you always know what's next.",
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Yes — the majority of our clients are based in North America, Europe, and Australia. We work fully remotely and are comfortable with time zone differences. All communication is in English and we maintain overlapping working hours with every client.",
  },
  {
    question: "What technologies do you specialise in?",
    answer:
      "Our core stack is Next.js, React, TypeScript, Node.js, and PostgreSQL (via Supabase). For mobile, we use React Native and Expo. For AI automation, we work with n8n, Zapier, Make, and the OpenAI, Claude and LangChain APIs. We choose the right technology for the job rather than forcing a single stack.",
  },
  {
    question: "Do you offer SEO, GEO and AEO services?",
    answer:
      "Yes. SEO gets you ranked on Google: technical audits, on-page optimisation, Core Web Vitals, local SEO and Google Business Profile. GEO (Generative Engine Optimization) helps ChatGPT, Perplexity and Gemini understand and recommend your business. AEO (Answer Engine Optimization) structures your content with answer-first pages, FAQ schema and llms.txt so AI Overviews and voice assistants quote you directly.",
  },
  {
    question: "Do you build AI agents and automations?",
    answer:
      "Yes. We build AI chat and voice agents, document and data extraction pipelines, and workflow automations with n8n, Zapier and Make, plus GoHighLevel and HubSpot CRM automations. Each one ships with guardrails, logging and a human hand-off where it matters.",
  },
  {
    question: "Can you build a SaaS product from scratch?",
    answer:
      "Absolutely. We've built multiple SaaS platforms from idea to production — covering multi-tenant architecture, subscription billing with Stripe, role-based access control, usage analytics dashboards, and automated onboarding flows. We handle the full stack so you can focus on your customers.",
  },
  {
    question: "Can you work with an existing codebase or an app built in Lovable or Bolt?",
    answer:
      "Yes. We regularly inherit codebases from other agencies, internal teams, and AI builders like Lovable, Bolt and Replit. We start with an audit (our free App Checker is a quick first look), document what we find, and propose a clear, costed path forward. We don't rewrite unless it's genuinely necessary.",
  },
  {
    question: "Do you offer maintenance and support after launch?",
    answer:
      "Yes. Every project includes a post-launch support period, and we offer ongoing care plans for maintenance, fixes, dependency updates, performance monitoring, and feature development. Plans are flexible — from a few hours per month to a full ongoing development partnership.",
  },
  {
    question: "How do you handle project communication and updates?",
    answer:
      "We use a structured process: weekly video calls, a shared project board (Notion or Linear), and a dedicated Slack channel for async communication. You'll always know the current status, what's in progress, and what's coming next — no chasing required.",
  },
  {
    question: "Do you sign NDAs and protect client IP?",
    answer:
      "Yes. We sign NDAs before any sensitive discussions and our contracts include full IP assignment — everything we build for you is yours. We also follow secure development practices including environment isolation, secret management, and role-based access on all repositories.",
  },
];
