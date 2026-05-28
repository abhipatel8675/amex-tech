export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  gradientFrom: string;
  gradientTo: string;
  featured: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "build-scalable-saas-2024",
    title: "How to Build a Scalable SaaS Application in 2024",
    excerpt:
      "A practical guide to architecture decisions, technology choices, and the pitfalls to avoid when building a SaaS product that needs to grow from 100 to 100,000 users.",
    content: `
## Why Architecture Matters From Day One

Most early-stage SaaS founders underestimate how quickly architectural decisions become permanent. The choices you make for your first 100 users will still be running when you have 100,000 — unless you pay the expensive cost of a full rewrite.

The good news: with modern tooling, getting the architecture right early isn't significantly harder than doing it the wrong way. It just requires deliberate decision-making.

## The Multi-Tenancy Question

The first critical question for any SaaS product is how you handle multi-tenancy — the way you keep one customer's data isolated from another's.

**Option 1: Shared database, shared schema**
All tenants share the same tables. A \`tenant_id\` column on every row provides isolation. This is the simplest approach and works well for most SaaS applications.

**Option 2: Shared database, separate schemas**
Each tenant gets their own PostgreSQL schema within the same database. More isolation, slightly more operational complexity.

**Option 3: Separate databases per tenant**
Maximum isolation but the most operationally complex. Reserved for enterprise SaaS with strict compliance requirements.

For most SaaS applications, **Option 1 (shared schema with tenant_id)** is the right starting point.

## The Tech Stack We Recommend

After building dozens of SaaS products, here's what we consistently reach for:

- **Frontend**: Next.js — SSR/SSG support, API routes, excellent performance
- **Database**: PostgreSQL via Supabase — row-level security, real-time, excellent developer experience
- **Auth**: Supabase Auth or Clerk — don't build auth yourself
- **Payments**: Stripe — the industry standard, with excellent docs
- **Hosting**: Vercel for the app, AWS for anything custom
- **Monitoring**: Sentry for errors, PostHog for product analytics

## Subscription Billing From the Start

Don't put off integrating Stripe. The earlier you add it, the less painful it is. Set up:

1. Products and prices in Stripe dashboard
2. Customer portal for self-serve subscription management
3. Webhooks to sync subscription state to your database
4. A billing table that tracks subscription status per tenant

## The Features You Will Need (That You're Not Building)

One of the biggest time-sinks in SaaS development is building features that aren't core to your product's value:

- User management (inviting teammates, roles, permissions)
- Email notifications
- Audit logs
- Feature flags

Build these simply or use third-party tools. Your core product is what differentiates you.

## Conclusion

Building a scalable SaaS isn't about using the most complex technology — it's about making the right trade-offs early. Start with a clean multi-tenant data model, integrate billing from day one, and invest in monitoring from the beginning.
    `,
    category: "Engineering",
    tags: ["SaaS", "Architecture", "Next.js", "Supabase"],
    readTime: "8 min read",
    publishedAt: "2024-11-15",
    gradientFrom: "#8b5cf6",
    gradientTo: "#3b82f6",
    featured: true,
  },
  {
    slug: "nextjs-vs-react-which-to-choose",
    title: "Next.js vs React: Which Should You Choose for Your Project?",
    excerpt:
      "Understanding when to reach for Next.js and when plain React is the right call — with real trade-offs, not just framework marketing.",
    content: `
## The Question Everyone Asks

"Should I use Next.js or React?" is one of the most common questions we get from clients starting new projects. The honest answer: in 2024, for most web applications, Next.js is the right default.

But understanding *why* will help you make better decisions on your specific project.

## React Is a Library, Not a Framework

This distinction matters. React handles the UI rendering layer. It doesn't decide how you route between pages, how you fetch data, or how you deploy your app. You add those things yourself — or you use a framework that adds them for you.

Next.js is the most mature, production-tested framework built on top of React. It adds:

- **File-based routing** — pages map to files
- **Server-side rendering** — render HTML on the server for SEO and performance
- **Static generation** — pre-build pages at build time
- **API routes** — backend endpoints in the same codebase
- **Optimization** — automatic image optimization, font loading, code splitting

## When to Use React Without Next.js

There are legitimate cases where plain React (via Vite or Create React App) is the better choice:

1. **Internal tools and dashboards** — if the app is behind a login wall and SEO doesn't matter
2. **Electron apps** — desktop apps built with web tech
3. **Already have a backend** — if you have a separate API server and just need a frontend
4. **Learning React** — Next.js adds complexity that can obscure React fundamentals

## When Next.js Wins (Most Cases)

For any customer-facing web application, Next.js wins:

- **SEO matters** — server rendering means search engines index your content properly
- **Performance** — hybrid SSG/SSR means pages load fast
- **API and frontend in one** — fewer repositories, simpler deployment
- **Ecosystem** — Vercel's deployment is the best developer experience available

## The App Router vs Pages Router Question

With Next.js 13+, there's now a newer "App Router" architecture alongside the original "Pages Router".

**For new projects**: use the App Router. It enables React Server Components which reduce client-side JavaScript significantly.

**For existing projects**: migrating is optional. The Pages Router still works and receives security updates.

## Conclusion

Choose Next.js for any customer-facing web application. Use plain React when you have a specific reason to (internal tools, existing API, desktop apps). The default should be Next.js — the performance, SEO, and developer experience advantages are real.
    `,
    category: "Engineering",
    tags: ["React", "Next.js", "Frontend", "Architecture"],
    readTime: "6 min read",
    publishedAt: "2024-10-28",
    gradientFrom: "#3b82f6",
    gradientTo: "#06b6d4",
    featured: false,
  },
  {
    slug: "ci-cd-guide-modern-web-apps",
    title: "The Complete Guide to CI/CD for Modern Web Applications",
    excerpt:
      "How to set up a production-grade CI/CD pipeline that catches bugs before they reach users, automates deployments, and keeps your team shipping fast.",
    content: `
## Why CI/CD Is Non-Negotiable

Continuous Integration and Continuous Deployment (CI/CD) is one of the highest-leverage investments a software team can make. A good pipeline catches bugs before they reach users, makes deployments boring and reliable, and removes manual steps that create bottlenecks.

Here's how we set up CI/CD for every production project we ship.

## The Three Environments

Every serious application should have three environments:

1. **Development** — Local developer machines, hot reloading, verbose logging
2. **Staging** — Mirror of production, used for QA and testing
3. **Production** — The real thing, real users, treated with care

Never test directly in production. Never deploy to production without going through staging first.

## Setting Up GitHub Actions

GitHub Actions is our CI tool of choice. It's free for public repositories, reasonably priced for private, and tightly integrated with GitHub.

A basic CI workflow for a Next.js app:

\`\`\`yaml
name: CI
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test
      - run: npm run build
\`\`\`

This runs on every PR and push. If any step fails, the merge is blocked.

## Deployment With Vercel

For Next.js applications, Vercel is the gold standard for deployment. Connect your GitHub repository and Vercel automatically:

- Deploys every branch as a preview URL
- Deploys main branch to production on merge
- Rolls back if a build fails

For each PR, Vercel creates a unique preview URL — your team can review changes without deploying to staging manually.

## Environment Variables Management

Never commit secrets to your repository. Use:

- **GitHub Secrets** — for CI/CD variables
- **Vercel Environment Variables** — for deployed app variables
- **\`.env.local\`** — for local development only, in \`.gitignore\`

## Database Migrations in CI/CD

The trickiest part of CI/CD for database-backed applications. Our approach:

1. Migrations live in version control alongside code
2. Migration is run automatically in CI before tests
3. Staging migration runs before staging deployment
4. Production migration runs during a maintenance window or as a backwards-compatible change

Never deploy code and run a breaking migration simultaneously in production.

## Monitoring and Alerting

Deployment isn't the end of CI/CD — it's the beginning of monitoring. Set up:

- **Sentry** — real-time error tracking with stack traces
- **Uptime monitoring** — alert if your app goes down
- **Performance monitoring** — track Web Vitals over time

## Conclusion

A good CI/CD setup catches bugs before users do, makes deployments routine rather than stressful, and gives your team confidence to ship faster. Invest the time upfront — it pays back continuously.
    `,
    category: "DevOps",
    tags: ["CI/CD", "DevOps", "GitHub Actions", "Vercel"],
    readTime: "10 min read",
    publishedAt: "2024-10-05",
    gradientFrom: "#10b981",
    gradientTo: "#06b6d4",
    featured: false,
  },
  {
    slug: "clean-architecture-startups",
    title: "Why Your Startup Needs Clean Architecture From Day One",
    excerpt:
      "The false economy of cutting architectural corners early — and the practical patterns that keep your codebase maintainable as you scale.",
    content: `
## The Startup Trap

The most dangerous phrase in startup engineering is "we'll clean it up later."

Later never comes. Features pile on top of features. Technical debt compounds. What should have been a one-day change takes a week because nothing is isolated. Engineers fear touching old code because they don't know what will break.

We've seen this pattern in every startup codebase we've inherited. And we've learned how to avoid it without sacrificing speed.

## What Clean Architecture Actually Means

Clean architecture isn't about following a rigid pattern or writing perfect code. It's about one thing: **separating concerns so that changes are local**.

When you change your payment provider, only the payment module changes. When you add a new feature, you add it in one place. When a bug occurs, you know where to look.

## The Three Layers

For most web applications, three layers are enough:

**1. Presentation Layer**
Routes, controllers, API handlers. Their job is to receive input, call the business layer, and return output. No business logic here.

**2. Business Layer (Domain)**
The core of your application. User management, billing, order processing — whatever your app does. This code should have zero dependency on the framework, database, or HTTP.

**3. Data Layer**
Database queries, external API calls, file storage. Isolated behind an interface so you can swap implementations.

## Practical Patterns for Next.js

In a Next.js application, this maps to:

- **API routes / Server Actions** → Presentation layer
- **Service classes / use-case functions** → Business layer
- **Repository classes / Supabase queries** → Data layer

\`\`\`typescript
// Bad: business logic in the route handler
export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await supabase.from('users').select().eq('email', email).single();
  if (user.data?.subscription_status !== 'active') {
    return NextResponse.json({ error: 'Subscription required' }, { status: 403 });
  }
  // ... more logic
}

// Good: route delegates to a service
export async function POST(req: Request) {
  const { email } = await req.json();
  const result = await userService.processRequest(email);
  return NextResponse.json(result);
}
\`\`\`

## The Single Rule That Saves Most Codebases

If you implement nothing else from this article, implement this:

**Business logic must not import from \`next\`, \`express\`, or any framework.**

This single rule forces separation of concerns and makes your business logic independently testable.

## Testing Becomes Possible

The great side effect of clean architecture is testability. When your business logic has no framework dependencies, you can test it with plain unit tests — no HTTP client, no database required.

This makes your test suite fast and your team confident.

## Conclusion

Investing a few extra hours in clean architecture at the start of a project saves dozens of hours later. The patterns aren't complex — they're just habits. Build them in from day one.
    `,
    category: "Engineering",
    tags: ["Architecture", "TypeScript", "Best Practices", "Startups"],
    readTime: "7 min read",
    publishedAt: "2024-09-20",
    gradientFrom: "#f59e0b",
    gradientTo: "#ef4444",
    featured: false,
  },
];
