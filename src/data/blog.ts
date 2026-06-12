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
  image?: string;
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
    slug: "how-to-download-zip-file-from-replit",
    title: "How to Download a ZIP File From Replit (Complete 2025 Guide)",
    excerpt:
      "Step-by-step guide to downloading your project as a ZIP file from Replit — covering the UI method, Git method, and how to handle common errors.",
    content: `
## Why You'd Want to Export From Replit

Replit is one of the most popular browser-based IDEs available today. It lets you spin up a project in seconds, collaborate with teammates in real time, and deploy without touching a terminal. But at some point, most developers need to get their code out.

Maybe you're moving a project to a dedicated VPS. Maybe you want to work offline on a long flight. Maybe you need to run the project inside a company environment that doesn't allow external cloud IDEs. Or maybe you just want a local backup.

Whatever the reason, exporting from Replit is straightforward — once you know where to look. This guide covers two reliable methods: the built-in ZIP download and the GitHub push-and-clone approach. It also covers what's actually inside the exported files and how to get everything running locally.

## Method 1: Download ZIP via the UI

This is the fastest route. Replit has a built-in export option hidden inside the three-dot menu.

### Step 1: Open Your Repl

Log into your Replit account and navigate to the Repl you want to export. Make sure you're on the editor view — you should see your file tree on the left and the code editor in the center.

### Step 2: Find the Three-Dot Menu

In the top-left corner of the editor, you'll see the name of your Repl next to a small icon. Click the three horizontal dots (⋯) next to the Repl name. This opens a dropdown menu with project options.

If you're on a newer version of the Replit UI, the menu may be accessible via a hamburger or kebab icon in the top toolbar. The label may appear as **More** or show three vertical dots depending on your screen size.

### Step 3: Select "Download as zip"

From the dropdown, click **Download as zip**. Replit will package your entire project directory into a \`.zip\` archive and your browser will begin downloading it immediately.

The file will be named after your Repl (e.g., \`my-project.zip\`). Depending on project size, the download may take a few seconds to a minute.

**What if I don't see the option?**

If the option is missing, check:
- You are the owner of the Repl (not just a collaborator with view access)
- You're logged in (the option is not available to anonymous visitors)
- You're in the editor view, not the cover page

## Method 2: Push to GitHub, Then Clone Locally

If your project is large, has many binary assets, or you want a proper version-controlled workflow going forward, pushing to GitHub and cloning is the better long-term approach.

### Step 1: Connect Your Repl to GitHub

Inside the Replit editor, click the **Git** icon in the left sidebar (it looks like a branching diagram). If you haven't connected GitHub before, Replit will prompt you to authorize it via OAuth. Grant the permissions and return to the editor.

### Step 2: Create a Repository and Push

Once connected, you'll see options to initialize a Git repository and push to GitHub. Click **Connect to GitHub**, give your repository a name, choose public or private, and click **Create repository**. Replit will push all your files to a new GitHub repo under your account.

You can verify this by visiting \`github.com/your-username\` — the new repository should appear immediately.

### Step 3: Clone the Repository Locally

Open your terminal and run:

\`\`\`bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
\`\`\`

This gives you a full local copy with complete Git history — far more useful than a ZIP for ongoing development.

## What's Included in the ZIP

When you download the ZIP from Replit's UI, the archive contains everything in your Repl's file system at the time of export:

- All source files (\`.js\`, \`.ts\`, \`.py\`, \`.html\`, \`.css\`, etc.)
- Configuration files (\`package.json\`, \`.replit\`, \`replit.nix\`, \`.env.example\` if present)
- Any uploaded assets or static files in your project directory

**What is NOT included:**

- \`node_modules/\` — this directory is excluded automatically (it would make the ZIP enormous and is unnecessary since it's fully reproducible from \`package.json\`)
- Your actual \`.env\` secrets — Replit stores these separately as environment variables and does not bundle them into exports for security reasons
- Replit-internal build caches

The \`.replit\` and \`replit.nix\` files in the ZIP are Replit-specific configuration files that tell Replit how to run your project. You don't need them locally, but they don't cause any harm either.

## Running Your Project Locally After Downloading

### Step 1: Extract the ZIP

On Mac or Windows, double-click the \`.zip\` file to extract it. On Linux or in a terminal:

\`\`\`bash
unzip my-project.zip -d my-project
cd my-project
\`\`\`

### Step 2: Install Dependencies

If your project uses Node.js, run:

\`\`\`bash
npm install
\`\`\`

Or if the project uses Yarn or pnpm:

\`\`\`bash
yarn install
# or
pnpm install
\`\`\`

This recreates the \`node_modules/\` directory from \`package.json\`. For Python projects, use \`pip install -r requirements.txt\`.

### Step 3: Set Up Environment Variables

Your \`.env\` file was not included in the ZIP. You'll need to recreate it. If you're the project owner, you can find your secrets in Replit under **Tools → Secrets**. Create a \`.env\` file in your project root:

\`\`\`bash
touch .env
\`\`\`

Then add each variable in \`KEY=VALUE\` format:

\`\`\`
DATABASE_URL=your_database_url_here
API_KEY=your_api_key_here
\`\`\`

Never commit this file to version control. Add \`.env\` to your \`.gitignore\` if it isn't already there.

### Step 4: Start the Development Server

For a Next.js project:

\`\`\`bash
npm run dev
\`\`\`

For a plain Node.js/Express app:

\`\`\`bash
node index.js
\`\`\`

For a Python Flask app:

\`\`\`bash
python main.py
\`\`\`

Open your browser to \`http://localhost:3000\` (or whichever port your project uses) and verify everything is working.

## Common Errors and Fixes

### Mac Extracts ZIP as .zip.cpgz Instead of a Folder

This happens when Archive Utility on macOS encounters a ZIP it can't parse, and it re-archives the file instead of extracting it. The result is a \`.zip.cpgz\` file that loops endlessly.

**Fix:** Use a different extraction tool. The easiest option is The Unarchiver (free on the Mac App Store). Alternatively, use the terminal:

\`\`\`bash
unzip ~/Downloads/my-project.zip -d ~/Downloads/my-project
\`\`\`

This bypasses Archive Utility entirely and extracts cleanly.

### Download Times Out or Fails on Large Projects

Replit's ZIP export has a size limit and can time out for very large projects (especially those with large binary files or many assets).

**Fix:** Use Method 2 (GitHub push and clone) instead. Git is much better at handling large repositories incrementally. Alternatively, delete unnecessary files in Replit before exporting — check for large assets or test data you don't need locally.

### \`npm install\` Fails With Node Version Errors

Replit may have been running a different version of Node.js than what you have locally.

**Fix:** Check the Node version Replit used by looking at your \`.replit\` or \`replit.nix\` file. Then switch your local Node version to match using \`nvm\`:

\`\`\`bash
nvm install 20
nvm use 20
npm install
\`\`\`

### Missing Environment Variables Cause Runtime Errors

If the app crashes with errors like \`Cannot read properties of undefined\` or \`Missing required environment variable\`, your \`.env\` file is incomplete.

**Fix:** Cross-reference your Replit Secrets panel with your local \`.env\` file and make sure every key is accounted for.

## Frequently Asked Questions

**Can I download a Repl I don't own?**
No. The download ZIP option is only available to the Repl's owner. If you're a collaborator, ask the owner to export and share the archive with you.

**Does the ZIP include my Git history?**
No. The ZIP is a snapshot of the current file state, not a Git repository. If you want Git history, use Method 2 (push to GitHub and clone).

**Will the downloaded project work exactly the same as on Replit?**
Mostly, but not always. Replit may have configured specific environment variables, custom Nix packages, or system-level dependencies that aren't part of the ZIP. Check the \`.replit\` and \`replit.nix\` files to understand what the Replit environment was providing.

**How do I keep the local copy in sync with Replit going forward?**
Use GitHub as the source of truth. Push from Replit to GitHub, then pull from GitHub to your local machine. This gives you a proper workflow instead of downloading ZIPs repeatedly.

**What happens to my Replit Deployments when I move locally?**
Nothing — they keep running. Exporting a ZIP doesn't affect your live Replit Deployments. You'd need to manually take them down from the Replit dashboard if you want to shut them off.

## Take Your Projects Further With Amex Technology

Exporting from Replit is just the first step. Once you have your project running locally, you can integrate it into a professional development workflow — with proper CI/CD pipelines, staging environments, and production deployments that scale.

At **Amex Technology**, we work with developers and businesses to take projects from prototype to production. Whether you're migrating an existing Replit project or starting fresh, our team can help you architect a setup that grows with you.

Explore our work and get in touch through the [Portfolio](/portfolio) or reach out directly via the [Contact](/contact) page.
    `,
    category: "Tutorial",
    tags: ["Replit", "Developer Tools", "Workflow"],
    readTime: "6 min read",
    publishedAt: "2025-01-18",
    gradientFrom: "#f97316",
    gradientTo: "#ec4899",
    featured: false,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=3840&q=95&auto=format&fit=crop",
  },
  {
    slug: "connect-vercel-app-godaddy-domain",
    title: "Connect Your Vercel App to a GoDaddy Domain in 5 Minutes",
    excerpt:
      "Step-by-step guide to pointing your GoDaddy domain to a Vercel deployment — including DNS records, SSL, and fixing propagation issues.",
    content: `
## Prerequisites

Before you start, make sure you have the following in place:

- A **Vercel account** with your project already deployed (you should have a live \`.vercel.app\` URL)
- A **GoDaddy account** that owns the domain you want to connect
- Access to your GoDaddy **DNS Manager** (not just the domain dashboard — the DNS manager is where you'll make the actual record changes)
- About 5–10 minutes for the setup, plus up to 48 hours for DNS propagation (though in practice it usually takes under 30 minutes)

You do not need to transfer your domain away from GoDaddy. Vercel works perfectly with domains registered at any registrar — you just point the DNS records at Vercel's infrastructure.

## Step 1: Add Your Domain in the Vercel Dashboard

### Navigate to Project Settings

Log into [vercel.com](https://vercel.com) and open the project you want to connect to your custom domain. Click on the **Settings** tab in the top navigation bar, then select **Domains** from the left sidebar.

### Add the Domain

Click **Add Domain** and type in your domain name. Enter just the root domain — for example, \`yourdomain.com\` — without any \`http://\` or \`www\` prefix.

Vercel will then ask you how you want to handle the \`www\` subdomain:

- **Redirect \`www\` to root** — \`www.yourdomain.com\` redirects to \`yourdomain.com\` (most common choice)
- **Redirect root to \`www\`** — \`yourdomain.com\` redirects to \`www.yourdomain.com\`
- **No redirect** — both work independently

For most projects, choosing **"Redirect www to root"** is the cleanest setup. Users who type \`www\` will land on the canonical version of your site.

After selecting your preference, click **Add**. Vercel will now show you the exact DNS records you need to configure.

## Step 2: The DNS Records Vercel Requires

Vercel will show you two records (sometimes three, depending on your setup). The standard records for a root + www configuration are:

### A Record (for the root domain)

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 76.76.21.21 |

The \`@\` symbol represents your root domain (\`yourdomain.com\`). This A record tells DNS resolvers to send traffic for your bare domain to Vercel's anycast IP address \`76.76.21.21\`.

### CNAME Record (for the www subdomain)

| Type | Name | Value |
| --- | --- | --- |
| CNAME | www | cname.vercel-dns.com |

The CNAME for \`www\` points to \`cname.vercel-dns.com\`, which Vercel uses to route \`www\` traffic and handle SSL provisioning for the subdomain.

**Important:** Do not point the CNAME at your \`.vercel.app\` deployment URL. Always use \`cname.vercel-dns.com\` — this is the stable, load-balanced endpoint Vercel maintains for custom domains.

## Step 3: Update DNS Records in GoDaddy

### Open the DNS Manager

Log into your GoDaddy account. From the top navigation, go to **My Products** and find your domain. Click **DNS** (or **Manage DNS**) next to the domain you want to configure.

This opens the GoDaddy DNS Manager — a table listing all your current DNS records.

### Update or Add the A Record

Look for an existing A record with the **Name** set to \`@\`. GoDaddy typically adds a default A record pointing to a GoDaddy parking page. You need to change its value.

1. Click the **pencil/edit icon** on the existing \`@\` A record
2. Change the **Value** field to \`76.76.21.21\`
3. Set the **TTL** to **1 Hour** (or the minimum available — lower TTL means faster propagation)
4. Click **Save**

If no \`@\` A record exists, click **Add** → select type **A** → set Name to \`@\` → set Value to \`76.76.21.21\`.

### Add or Update the CNAME Record

Now look for a CNAME record with the **Name** \`www\`.

If one already exists (GoDaddy often creates one):
1. Click the **edit icon** on the \`www\` CNAME record
2. Change the **Value** to \`cname.vercel-dns.com\`
3. Click **Save**

If no \`www\` CNAME exists:
1. Click **Add**
2. Select type **CNAME**
3. Set **Name** to \`www\`
4. Set **Value** to \`cname.vercel-dns.com\`
5. Set **TTL** to **1 Hour**
6. Click **Save**

### Save Your Changes

GoDaddy will show a confirmation dialog asking you to review the changes. Confirm and save. The DNS Manager will now display your updated records.

## Step 4: Wait for DNS Propagation

DNS changes do not apply instantly — they propagate across global DNS servers over time. The propagation window is technically up to **48 hours**, but in practice most DNS resolvers pick up changes within **15–60 minutes**.

During propagation, different users around the world may see different results depending on which DNS server their ISP is using. This is normal.

### Check Propagation Status

Use [whatsmydns.net](https://www.whatsmydns.net) to monitor how your DNS records are spreading:

1. Go to **whatsmydns.net**
2. Enter your domain (e.g., \`yourdomain.com\`)
3. Select record type **A**
4. Click **Search**

You'll see a world map showing which DNS servers have updated to show \`76.76.21.21\` and which are still serving the old value. Once the majority of locations show Vercel's IP, your domain is live.

You can also run a quick check from your terminal:

\`\`\`bash
dig yourdomain.com A +short
\`\`\`

When this returns \`76.76.21.21\`, your A record has propagated to your local DNS resolver.

## Step 5: SSL Certificate — Automatic via Let's Encrypt

One of Vercel's best features is **automatic SSL provisioning**. You do not need to buy or configure a certificate separately.

Once Vercel detects that your DNS records are pointing correctly, it automatically issues a TLS certificate from **Let's Encrypt** and provisions it for both your root domain and \`www\` subdomain. This usually happens within a few minutes of successful DNS propagation.

In the Vercel Domains dashboard, you'll see the domain status change from **"Invalid Configuration"** (orange) to a green checkmark once SSL is active.

Your site will then be accessible over \`https://yourdomain.com\` with a valid SSL certificate, and HTTP traffic will automatically redirect to HTTPS.

## Troubleshooting Common Issues

### "Invalid Configuration" Error in Vercel

This is the most common issue after adding a domain. It means Vercel can see that your DNS records haven't yet been updated to point at its infrastructure.

**What to do:**
- Wait 15–30 minutes and refresh the Vercel Domains page
- Double-check the GoDaddy DNS Manager to confirm you saved the correct values — copy-paste \`76.76.21.21\` and \`cname.vercel-dns.com\` directly rather than typing them
- Use whatsmydns.net to confirm propagation has happened before concluding something is misconfigured

If the error persists after 2+ hours: re-check your records. A common mistake is editing the wrong record (e.g., updating a subdomain record instead of the root \`@\` record).

### www Works But Root Domain Doesn't (or Vice Versa)

This usually means one of the two records is missing or incorrect:

- **Root doesn't work, www does** → The A record for \`@\` is missing or has the wrong value
- **www doesn't work, root does** → The CNAME for \`www\` is missing or points to the wrong value

Go back to GoDaddy DNS Manager and verify both records exist and have exactly the values Vercel specifies.

### GoDaddy Forwards vs. CNAME — Don't Mix Them

GoDaddy's domain dashboard has a **Forwarding** section that is separate from DNS records. If you previously set up a forwarding rule, it can interfere with your CNAME configuration.

Go to the DNS Manager → scroll to the **Forwarding** section at the bottom → remove any existing forwarding rules before relying on CNAME records.

### "This site can't be reached" After Propagation

If DNS has propagated (whatsmydns shows \`76.76.21.21\`) but the browser still shows an error, check:

1. **Is the domain added in Vercel?** Confirm it appears under Settings → Domains with a green status
2. **Is your Vercel project deployed?** Go to the Deployments tab and confirm there's a successful deployment
3. **Browser cache** — try opening the domain in an incognito window or a different device

## Your GoDaddy Email MX Records Are Not Affected

A common concern when editing DNS records is: *"Will this break my email?"*

The answer is **no** — as long as you only edit the A and CNAME records Vercel requires. GoDaddy's email service (Workspace Email or Microsoft 365) relies on **MX records**, which are completely separate from A and CNAME records.

Vercel does not ask you to modify MX records. Your existing email setup will continue working without interruption. To verify this, look at your MX records in GoDaddy DNS Manager before and after making your changes — they should be identical.

If you use **Google Workspace** or another third-party email provider with your GoDaddy domain, the same applies. MX records are untouched.

## Frequently Asked Questions

**How long does DNS propagation really take with GoDaddy?**
In most cases, 15–60 minutes. GoDaddy's default TTL is 1 hour, so once your changes are saved, it takes at most one TTL cycle for most resolvers to pick up the change. Setting TTL to the minimum (600 seconds / 10 minutes) before making changes can speed this up.

**Do I need to transfer my domain from GoDaddy to Vercel?**
No. Vercel does not require you to transfer your domain. You keep your domain registered at GoDaddy and simply point the DNS records at Vercel's infrastructure. Transfers are optional and generally not worth the hassle unless you want everything in one place.

**Can I connect multiple domains to the same Vercel project?**
Yes. You can add as many custom domains as you like under Settings → Domains in your Vercel project. All of them will serve the same deployment, and each gets its own SSL certificate.

**What if I'm on Vercel's free (Hobby) plan?**
Custom domains are fully supported on Vercel's free Hobby plan. You can connect one custom domain per project with automatic SSL at no cost. Vercel's paid plans add features like more team members and analytics, but custom domains are not behind a paywall.

**What happens to my Vercel \`.vercel.app\` URL after I add a custom domain?**
It keeps working. Adding a custom domain does not remove your \`.vercel.app\` URL — both will serve your project. This is useful for testing during propagation. If you want to disable the \`.vercel.app\` URL for security reasons (to prevent direct access), you can do so from the Vercel project settings.

## Take Your Deployment Further With Amex Technology

Connecting a custom domain is a foundational step — but a production-grade deployment involves much more: environment-specific configurations, preview deployments for every PR, proper redirects, cache headers, and a monitoring setup that catches issues before users do.

At **Amex Technology**, we help teams build the full deployment pipeline — from domain configuration to CI/CD automation to performance observability. If you're looking to harden your Vercel setup or take a project from proof-of-concept to production-ready, we'd be glad to help.

Explore our work at the [Portfolio](/portfolio) page or get in touch directly via the [Contact](/contact) page.
    `,
    category: "DevOps",
    tags: ["Vercel", "GoDaddy", "DNS", "Deployment", "Domain Setup"],
    readTime: "7 min read",
    publishedAt: "2025-02-10",
    gradientFrom: "#0ea5e9",
    gradientTo: "#6366f1",
    featured: false,
    image: "https://images.unsplash.com/photo-1762163516269-3c143e04175c?w=3840&q=95&auto=format&fit=crop",
  },
  {
    slug: "how-to-setup-cloudflare-dns",
    title: "How to Set Up Cloudflare DNS: Complete Step-by-Step Guide (2025)",
    excerpt:
      "Learn how to set up Cloudflare DNS — from adding your site and updating nameservers, to configuring SSL, security, and performance settings.",
    content: `
## What Cloudflare Actually Does

Before touching a single DNS record, it helps to understand what you're signing up for. Cloudflare is not just a DNS registrar — it's a global network that sits between your visitors and your origin server, providing three major layers of value.

**CDN (Content Delivery Network):** Cloudflare operates data centers in over 300 cities worldwide. When a visitor requests your site, the response is served from the nearest Cloudflare location, reducing latency significantly compared to serving everything from a single origin.

**DDoS Protection:** Cloudflare automatically absorbs volumetric attacks at the network edge. Even on the free plan, you get protection against large-scale distributed denial-of-service attacks that would take down an unprotected server.

**Free SSL/TLS:** Every domain behind Cloudflare gets a free SSL certificate issued automatically. Visitors see the padlock; your origin server gets HTTPS without you paying a certificate authority. (There are nuances here — covered in the SSL section below.)

All of this is available on Cloudflare's free plan, which is why it's become a default infrastructure choice for teams at every scale.

## Proxy Mode vs DNS-Only: The Orange Cloud Explained

This is the concept most beginners miss, and it determines whether you're actually using Cloudflare's network or just its DNS.

When you set a DNS record in Cloudflare, each record has a **proxy status** toggle:

- **Orange cloud (Proxied):** Traffic routes through Cloudflare's network. Cloudflare terminates the connection, applies your security and performance settings, then forwards clean requests to your origin. Your real server IP is hidden.
- **Grey cloud (DNS Only):** Cloudflare acts as a regular DNS resolver. It returns your actual origin IP in DNS queries. No CDN, no DDoS protection, no SSL from Cloudflare.

For most web traffic (A records, CNAME records for your site), you want the **orange cloud**. For records that should bypass Cloudflare — like MX records for email, or certain third-party verification records — you leave them grey.

The orange/grey distinction is the most common source of confusion for new Cloudflare users. If your security or performance settings aren't applying, the first thing to check is whether the relevant record is actually proxied.

## Step 1: Create a Cloudflare Account and Add Your Site

### Create the Account

Go to [cloudflare.com](https://cloudflare.com) and sign up for a free account. The free plan covers everything you need to get started, including the CDN, DDoS protection, SSL, and basic security rules.

### Add Your Domain

After logging in, click **Add a Site** from your dashboard. Enter your root domain (e.g., \`yourdomain.com\`) without any subdomain or protocol prefix. Click **Add Site**.

### Select a Plan

Cloudflare will prompt you to choose a plan. Select **Free** unless you have a specific reason to upgrade. The free plan covers the features in this guide. Click **Continue**.

## Step 2: Review Your Imported DNS Records

Cloudflare performs an automatic scan of your domain's existing DNS records. This is one of its most useful features — it gives you a pre-populated record set to review rather than requiring you to enter everything from scratch.

### What to Look For

Cloudflare imports records based on public DNS data. In the review screen, verify:

- **A records** are correct for your root domain and any subdomains
- **CNAME records** for subdomains like \`www\`, \`api\`, \`mail\` are present
- **MX records** for your email are intact — these are critical. If they're missing, your email will break after you switch nameservers
- **TXT records** for domain verification (Google Search Console, email authentication like SPF, DKIM)

**Important:** If any records are missing, add them now before continuing. You can always add or edit records after switching, but it's cleaner to resolve gaps at this stage.

### Proxy Status on Each Record

By default, Cloudflare may set some records as DNS-only. Go through each A and CNAME record that serves web traffic and ensure the orange cloud (Proxied) is enabled. Leave MX records and any email-related records as DNS-only.

Once you've reviewed and corrected the records, click **Continue**.

## Step 3: Update Your Nameservers at Your Registrar

Cloudflare will give you two custom nameserver addresses — something like:

\`\`\`
asha.ns.cloudflare.com
pablo.ns.cloudflare.com
\`\`\`

These are unique to your account. You need to log into wherever you registered your domain and replace the existing nameservers with these two.

### How to Update Nameservers

The process varies by registrar, but the general steps are:

1. Log into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. Find the domain management or DNS settings for your domain
3. Look for a **Nameservers** section — it may be labeled "Custom DNS", "Change Nameservers", or similar
4. Delete the existing nameservers (usually 2–4 entries from your registrar)
5. Add Cloudflare's two nameservers exactly as shown in your dashboard
6. Save the changes

### How Long Does It Take?

Nameserver propagation can take anywhere from a few minutes to 48 hours, though most registrars complete it within 1–2 hours. Cloudflare will send you an email when it detects the switch and activates your site.

You can check propagation status by running:

\`\`\`bash
dig yourdomain.com NS +short
\`\`\`

When this returns Cloudflare's nameservers, the switch is complete.

## Step 4: Configure SSL/TLS Mode

Once your domain is active in Cloudflare, go to **SSL/TLS** in the left sidebar. The encryption mode you choose here determines how Cloudflare communicates with your origin server.

### Flexible SSL

Cloudflare encrypts the connection between your visitor and Cloudflare (HTTPS), but sends traffic to your origin over plain HTTP. This works even if your origin has no SSL certificate at all.

**The problem:** Flexible SSL is only appropriate for legacy setups where you cannot install a certificate on your origin. If your origin already has SSL (and it should), Flexible can cause \`ERR_TOO_MANY_REDIRECTS\` — more on that in the errors section.

### Full SSL

Cloudflare encrypts both the visitor-to-Cloudflare connection and the Cloudflare-to-origin connection. Your origin needs an SSL certificate, but it doesn't need to be from a trusted certificate authority — a self-signed certificate is accepted.

This is better than Flexible and works for most setups.

### Full (Strict) SSL — Recommended

The strongest option. Cloudflare requires your origin to have a valid, trusted SSL certificate (not self-signed). Both connections are fully encrypted and verified.

**For production sites, use Full (Strict).** If you're hosting on Vercel, Netlify, Railway, or any modern platform that auto-provisions Let's Encrypt certificates, your origin already has a valid cert and Full Strict will work immediately.

## Step 5: Key Security Settings

### HSTS (HTTP Strict Transport Security)

Under **SSL/TLS → Edge Certificates**, you'll find the HSTS option. Enabling HSTS tells browsers to always use HTTPS for your domain, even if a user types \`http://\` manually.

Configuration recommendations:
- **Max Age:** 6 months (15768000 seconds) to start; increase to 1 year once you're confident HTTPS is stable
- **Include Subdomains:** Enable only if all subdomains serve HTTPS
- **Preload:** Leave off initially — preloading submits your domain to browser preload lists and is difficult to reverse

**Caution:** HSTS is a one-way commitment for the duration of max-age. Don't enable it if there's any chance you'll need to serve HTTP from this domain during that window.

### Bot Fight Mode

Under **Security → Bots**, enable **Bot Fight Mode**. This automatically challenges traffic from known bot networks, scrapers, and automated tools. For the vast majority of sites, this reduces unwanted bot traffic without affecting legitimate visitors.

If you have specific integrations that use automated HTTP requests (monitoring tools, search engine bots you want to allow, webhook senders), review the allow-list options before enabling. Google, Bing, and other major search engine crawlers are already excluded from Bot Fight Mode by default.

## Step 6: Performance Settings

### Brotli Compression

Under **Speed → Optimization**, enable **Brotli**. Brotli is a modern compression algorithm that typically achieves 15–25% better compression ratios than Gzip for text-based assets (HTML, CSS, JavaScript). Supported by all modern browsers, it reduces page weight with zero configuration required.

### Auto Minify

Also under **Speed → Optimization**, enable minification for JavaScript, CSS, and HTML. Cloudflare strips whitespace, comments, and unnecessary characters from these files before serving them to visitors. This is a zero-risk performance win for most sites.

**Note:** If you're already minifying at build time (which Next.js, Vite, and most modern frameworks do automatically), enabling Cloudflare's minification on top has minimal additional benefit. But it doesn't hurt.

## Cloudflare + Vercel: Setting SSL to Full

If you're deploying on Vercel and routing traffic through Cloudflare, there's one critical configuration step that trips up many developers.

Vercel automatically provisions Let's Encrypt SSL certificates for all deployments — including your custom domain. This means your origin always has a valid, trusted certificate. You should set Cloudflare's SSL mode to **Full (Strict)**.

**Why this matters:** If you leave SSL set to **Flexible**, here's what happens:

1. Visitor hits Cloudflare over HTTPS
2. Cloudflare forwards to Vercel over HTTP
3. Vercel detects plain HTTP and redirects to HTTPS
4. Cloudflare again hits Vercel over HTTP...
5. Infinite redirect loop → \`ERR_TOO_MANY_REDIRECTS\`

Setting SSL to **Full (Strict)** breaks this loop by having Cloudflare connect to Vercel over HTTPS from the start. The redirect never fires.

## Common Errors and Fixes

### ERR_TOO_MANY_REDIRECTS

**Cause:** SSL mode is set to Flexible, but your origin is also redirecting HTTP to HTTPS, creating an infinite loop.

**Fix:** Change Cloudflare SSL/TLS mode to **Full** or **Full (Strict)**. This is almost always the right fix.

### Email Stops Working After Switching Nameservers

**Cause:** MX records weren't imported correctly, or the orange cloud is enabled on an MX-related record.

**Fix:** Go to **DNS** in Cloudflare, find your MX records, and ensure they exist and are set to **DNS Only** (grey cloud). Also check that any SPF TXT records carried over correctly. If you use Google Workspace or Microsoft 365, the specific records required are documented in their respective admin panels.

### Site Shows "Too Many Redirects" on www but Not Root (or Vice Versa)

**Cause:** One record is proxied and one isn't, creating inconsistent SSL behavior.

**Fix:** Ensure consistent proxy status across your A record (\`@\`) and CNAME (\`www\`). Both should be Proxied (orange cloud) for a standard setup.

### Cloudflare Shows "Not Active" After 24 Hours

**Cause:** Nameservers weren't updated correctly at the registrar, or the registrar hasn't propagated the change yet.

**Fix:** Re-check the nameserver values at your registrar. Copy-paste directly from the Cloudflare dashboard to avoid typos. Run \`dig yourdomain.com NS\` to verify what nameservers are currently live.

## Frequently Asked Questions

**Do I need to transfer my domain to Cloudflare to use it?**
No. Cloudflare Registrar is optional. You can keep your domain registered anywhere (GoDaddy, Namecheap, Google Domains) and simply update the nameservers to point to Cloudflare. The registrar and the DNS provider are separate roles.

**Will Cloudflare affect my Google Search Console verification?**
TXT records used for domain verification pass through Cloudflare DNS without issue. As long as the verification TXT record was imported (or you add it manually), Search Console verification works normally.

**Can I use Cloudflare on a subdomain only?**
Yes, through a feature called **Cloudflare for SaaS** or by using CNAME setup (available on Business/Enterprise plans). The standard free plan requires you to proxy at the root domain level. For most use cases, adding the full domain is the simpler path.

**Does enabling the orange cloud hide my real server IP?**
Yes. When a record is proxied, Cloudflare's IP addresses are returned in DNS queries instead of your origin IP. This is one of the key security benefits — it prevents attackers from targeting your origin directly.

**Is the free plan enough for a production site?**
For most sites, yes. The free plan includes unlimited bandwidth, DDoS protection, the global CDN, free SSL, Bot Fight Mode, and basic firewall rules. The paid plans add more advanced WAF rules, image optimization, analytics, and support. Start with free and upgrade when you hit a specific limitation.

## Take Your Infrastructure Further With Amex Technology

Setting up Cloudflare correctly is the foundation of a resilient, performant web infrastructure — but it's just one layer of a production-grade stack. A complete setup also includes edge caching strategy, cache purge automation, performance budgets, monitoring that correlates CDN events with application errors, and security rules tuned to your traffic patterns.

At **Amex Technology**, we help teams build and optimize the full deployment stack — from DNS and CDN configuration to CI/CD pipelines and observability. If you're setting up a new project or hardening an existing one, we'd be glad to review your setup.

Explore our work at the [Portfolio](/portfolio) page or get in touch directly via the [Contact](/contact) page.
    `,
    category: "DevOps",
    tags: ["Cloudflare", "DNS", "Security", "Performance", "DevOps"],
    readTime: "9 min read",
    publishedAt: "2025-03-05",
    gradientFrom: "#f97316",
    gradientTo: "#0ea5e9",
    featured: false,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=3840&q=100&auto=format&fit=crop",
  },
  {
    slug: "how-to-export-code-from-lovable",
    title: "How to Export Code From Lovable (Step-by-Step Guide)",
    excerpt:
      "Learn how to export your Lovable project to GitHub or run it locally — so you can self-host, extend, or hand off to a developer.",
    content: `
## What Is Lovable and Why Would You Export?

Lovable is an AI-powered no-code builder that lets you describe a web application in plain English and get a working React app in minutes. For founders, designers, and product managers who want to move fast without a full engineering team, it's a genuinely powerful way to go from idea to functional prototype.

But at some point, most Lovable users hit a wall. You need a custom integration that Lovable's interface doesn't support. You want to hand the codebase off to a developer for production hardening. You want to self-host the app on your own infrastructure instead of Lovable's platform. Or you need to add authentication flows, payment processing, or backend logic that goes beyond what the visual editor can produce.

That's when exporting the code becomes essential. The good news: Lovable generates real code — not some proprietary format — and getting it out is straightforward once you know the steps.

## The Stack Lovable Generates

Before you export, it helps to know what you're getting. Lovable generates a standard modern React application with the following stack:

- **React** — the UI component library (the same React used by millions of developers worldwide)
- **Vite** — a fast, modern build tool that replaces the older Create React App setup
- **Tailwind CSS** — a utility-first CSS framework for styling
- **shadcn/ui** — a component library built on Radix UI, giving you accessible, polished UI primitives
- **Supabase** — an open-source Firebase alternative for database, authentication, and storage (if your app uses a backend)

This is a legitimate, production-capable tech stack. A developer who knows React can pick up a Lovable export and continue building without needing to learn any proprietary tools.

## Method 1: Connect to GitHub via Lovable Settings

The cleanest way to export is by connecting your Lovable project directly to GitHub. This gives you a proper version-controlled repository rather than a one-time ZIP snapshot.

### Step 1: Open Your Project Settings

In your Lovable editor, click on the project name or the settings icon in the top bar. This opens the project settings panel on the right side of the screen.

### Step 2: Find the GitHub Integration

In the settings panel, look for the **GitHub** section. If you haven't connected GitHub before, you'll see a **Connect to GitHub** button. Click it and authorize Lovable to access your GitHub account via OAuth. Grant the permissions Lovable requests — it needs permission to create and push to repositories.

### Step 3: Create and Push the Repository

Once connected, give your repository a name and select whether it should be public or private. Click **Push to GitHub**. Lovable will initialize a Git repository from your project and push all the generated code to a new GitHub repo under your account.

Visit your GitHub profile to confirm the repository exists. You should see all the files — the \`src/\` directory, \`package.json\`, \`vite.config.ts\`, \`tailwind.config.ts\`, and more.

Going forward, changes you make in the Lovable editor can be synced back to GitHub with a single click from the same settings panel.

## Cloning the Repo and Running Locally

With your code on GitHub, getting it running locally takes four commands.

### Clone the Repository

\`\`\`bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
\`\`\`

Replace \`your-username\` and \`your-repo-name\` with your actual GitHub username and the repository name you set in Lovable.

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

This reads \`package.json\` and installs all the required packages into a local \`node_modules/\` directory. The first install may take a minute or two.

### Start the Development Server

\`\`\`bash
npm run dev
\`\`\`

Vite will start a local development server, usually at \`http://localhost:5173\`. Open that URL in your browser — you should see your Lovable app running locally, identical to how it appeared in the Lovable editor.

## Understanding the Project Structure

A Lovable export has a clean, conventional structure:

\`\`\`
src/
  components/       — React UI components
  pages/            — Top-level route components
  hooks/            — Custom React hooks
  lib/              — Utility functions and config
  integrations/     — Supabase client setup
public/             — Static assets
package.json        — Dependencies and scripts
vite.config.ts      — Vite build configuration
tailwind.config.ts  — Tailwind CSS configuration
\`\`\`

The components folder is where you'll spend most of your time as a developer. Each component Lovable generated corresponds to a visible section of your UI.

## Environment Variables: What Lovable Stores vs What You Recreate

This is the most common stumbling block when running a Lovable export locally. Lovable's platform securely stores your environment variables (like your Supabase project URL and anon key) and injects them at build time. When you export the code, those values are not included — you need to recreate them yourself.

Create a \`.env.local\` file in the root of your project:

\`\`\`bash
touch .env.local
\`\`\`

Add your Supabase credentials (find these in your Supabase project dashboard under **Settings → API**):

\`\`\`
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

Note the \`VITE_\` prefix — this is how Vite exposes environment variables to the client-side code. Any variable without this prefix will be invisible to your React components.

Add \`.env.local\` to your \`.gitignore\` if it isn't already there. Never commit credentials to version control.

## Deploying the Export to Vercel

Once the app runs locally, deploying to Vercel takes under five minutes.

1. Push your code to GitHub (if you've made any local changes)
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository
4. In the **Environment Variables** section, add \`VITE_SUPABASE_URL\` and \`VITE_SUPABASE_ANON_KEY\` with the same values as your local \`.env.local\`
5. Click **Deploy**

Vercel automatically detects the Vite framework and configures the build settings correctly. Your app will be live at a \`.vercel.app\` URL within two minutes. Connect a custom domain from the Vercel project settings when you're ready.

## What You Can Customize Post-Export

Once you have the code locally, you're no longer limited by what Lovable's editor supports. Common post-export customizations include:

**Custom API routes** — Add a backend with serverless functions using Vercel Edge Functions or a separate Express/Hono API server.

**Advanced authentication** — Replace the basic Supabase auth setup with custom flows: magic links, social OAuth, SSO, or role-based access control enforced at the row level in Supabase.

**Third-party integrations** — Add Stripe for payments, Resend for transactional email, Posthog for analytics, or any other npm package that wasn't available in Lovable's interface.

**Performance optimization** — Add code splitting, lazy loading, image optimization, and caching headers that aren't configured in the default export.

**CI/CD pipeline** — Set up GitHub Actions to run type checking, linting, and tests on every PR before merging.

## Common Issues and Fixes

### Missing Environment Variables Cause a Blank Screen

If you open \`http://localhost:5173\` and see a blank page or console errors like \`undefined is not an object\`, the most likely cause is missing Supabase credentials.

**Fix:** Double-check that \`.env.local\` exists in the project root, that the variable names start with \`VITE_\`, and that you restarted the dev server after creating the file (\`npm run dev\` needs to be restarted to pick up new \`.env.local\` values).

### Supabase Connection Errors

If you see errors like \`Failed to fetch\` or \`NetworkError\` in the console when the app tries to load data, your Supabase project may have Row Level Security (RLS) policies that block anonymous access.

**Fix:** Check your Supabase dashboard under **Authentication → Policies**. If your app is supposed to show data to unauthenticated users, add an RLS policy that allows \`SELECT\` for the \`anon\` role on the relevant tables.

### \`npm install\` Fails With Peer Dependency Errors

Lovable may have used a Node.js version with a specific npm behavior. If \`npm install\` throws warnings about peer dependencies, try:

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

Or install and use the Node version specified in the project's \`.nvmrc\` or \`package.json\` engines field if one is present.

## Frequently Asked Questions

**Does exporting from Lovable cost anything?**
Exporting to GitHub is available on Lovable's paid plans. Check Lovable's current pricing page for the exact tier that includes GitHub export — it's typically included in the Pro plan.

**Will my Lovable app keep working after I export?**
Yes. Exporting the code to GitHub doesn't remove or disable your Lovable project. Both the Lovable-hosted version and your exported copy exist independently. You can continue editing in Lovable and syncing to GitHub as needed.

**Can a developer continue building in Lovable after I export?**
Yes. Because Lovable pushes to a real GitHub repo, a developer can clone the repo, work locally in VS Code or any editor, and push changes back to GitHub. The Lovable editor can also pull those changes back in (with some limitations on heavily customized code).

**Do I need to keep paying for Lovable after I self-host?**
No. Once you've exported the code and deployed it to your own infrastructure, your app runs independently of Lovable. You only need an active Lovable subscription if you want to continue using the AI editor to make changes.

**What's the difference between the Lovable export and a Bolt.new or v0.dev export?**
All three generate React code you can export. Lovable's exports tend to be more complete full-stack applications with Supabase integration. Bolt and v0.dev are stronger for UI prototypes. The underlying React/Vite/Tailwind stack is similar across all three.

## Take Your Lovable Prototype to Production With Amex Technology

Exporting from Lovable is the bridge between a fast prototype and a production application. But the gap between "it works locally" and "it scales reliably with real users" is significant — it involves production database optimization, proper auth hardening, CI/CD pipelines, monitoring, and deployment infrastructure.

At **Amex Technology**, we specialize in taking Lovable and other no-code prototypes and turning them into production-grade applications. Whether you need a developer to extend your exported codebase, a team to rebuild it on a more scalable architecture, or help setting up the deployment and monitoring infrastructure, we can help.

Explore our work at the [Portfolio](/portfolio) page or get in touch directly via the [Contact](/contact) page.
    `,
    category: "Tutorial",
    tags: ["Lovable", "No-Code", "GitHub", "Developer Tools", "Deployment"],
    readTime: "5 min read",
    publishedAt: "2025-03-28",
    gradientFrom: "#ec4899",
    gradientTo: "#8b5cf6",
    featured: false,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=3840&q=100&auto=format&fit=crop",
  },
  {
    slug: "how-to-setup-resend-email",
    title: "How to Set Up Resend for Transactional Email (Complete Guide)",
    excerpt:
      "Complete guide to setting up Resend — from domain verification and DNS records to sending your first email with Next.js and React Email templates.",
    content: `
## Why Transactional Email Is Harder Than It Looks

Transactional emails — password resets, order confirmations, welcome emails, invoice receipts — are some of the most business-critical messages your application sends. If they don't land in the inbox, users can't log in, can't complete purchases, and assume your product is broken.

The problem is that email delivery is genuinely complex. Every major email provider (Gmail, Outlook, Apple Mail) uses a combination of IP reputation, domain reputation, content filtering, and authentication checks to decide whether a message goes to the inbox or the spam folder. Getting this right with raw SMTP is a full-time job.

This is why developers reach for email delivery services. For years, SendGrid and Mailgun dominated this space. But both carry the baggage of legacy APIs, confusing dashboards, and aggressive spam filtering on shared IP pools that punish new senders for the bad behaviour of other accounts.

**Resend** is the modern alternative. Built specifically for developers, it has a clean REST API, first-class React Email integration for building templates, and an excellent free tier (3,000 emails per month, 100/day) that covers most side projects and early-stage products.

## Creating a Resend Account and Getting Your API Key

Go to [resend.com](https://resend.com) and sign up with your GitHub account or email. The onboarding flow is fast — you're in the dashboard within two minutes.

Once inside, navigate to **API Keys** in the left sidebar and click **Create API Key**. Give it a descriptive name (e.g., \`production-app\` or \`local-dev\`) and select the appropriate permission level:

- **Full Access** — can send emails and manage domain settings. Use for your production server.
- **Sending Access** — can only send emails. Safer for application use; recommended.

Click **Add** and copy the key immediately. Resend only shows the full key once. Store it in your environment variables — never in source code.

\`\`\`bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
\`\`\`

On Vercel or any deployment platform, add this as a secret environment variable. Locally, add it to your \`.env.local\` file (which should be in \`.gitignore\`).

## Adding and Verifying Your Sending Domain

You can send from Resend's shared domain (\`onboarding@resend.dev\`) immediately, but for production you must send from your own domain. This is both a deliverability requirement (Gmail and Outlook increasingly filter mail from shared sender pools) and a branding requirement.

In the Resend dashboard, go to **Domains** → **Add Domain**. Enter your root domain (e.g., \`yourdomain.com\`). Resend will give you three DNS records to add at your domain registrar.

### SPF Record (Sender Policy Framework)

SPF is a TXT record that tells receiving mail servers which IP addresses are authorized to send email on behalf of your domain.

\`\`\`
Type:  TXT
Name:  @
Value: v=spf1 include:amazonses.com ~all
\`\`\`

Resend uses Amazon SES infrastructure under the hood, so the SPF record authorizes Amazon's sending IPs. The \`~all\` at the end is a "soft fail" — messages from unauthorized sources are flagged but not rejected outright, which is the standard practice.

### DKIM Record (DomainKeys Identified Mail)

DKIM adds a cryptographic signature to every outbound message. The receiving server looks up the public key in your DNS and verifies the signature, confirming the email wasn't tampered with in transit.

Resend generates the key pair. You add the public key as a CNAME record:

\`\`\`
Type:  CNAME
Name:  resend._domainkey
Value: resend._domainkey.yourdomain.com.dkim.resend.com
\`\`\`

Without DKIM, your emails are more likely to be flagged as spoofed. This is the most important authentication record.

### DMARC Record (Domain-based Message Authentication)

DMARC ties SPF and DKIM together and tells receiving servers what to do when a message fails both checks.

\`\`\`
Type:  TXT
Name:  _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
\`\`\`

Start with \`p=none\` (monitor mode) — this means failing messages are still delivered but Resend can report on them. Once you've confirmed your legitimate email passes authentication, tighten to \`p=quarantine\` (send to spam) or \`p=reject\` (block entirely).

After adding all three records, return to the Resend dashboard and click **Verify**. DNS propagation usually takes 15–60 minutes. Once all three records show a green checkmark, your domain is verified and ready to send.

## Installing the Resend SDK

In your project directory:

\`\`\`bash
npm install resend
\`\`\`

That's the only dependency needed for sending emails. For React Email templates (covered below), you'll install additional packages.

## Sending Your First Email With the SDK

With the SDK installed and your API key in environment variables, sending an email takes five lines:

\`\`\`typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: 'Your App <noreply@yourdomain.com>',
  to: ['user@example.com'],
  subject: 'Welcome to Your App',
  html: '<p>Thanks for signing up! We are glad you are here.</p>',
});
\`\`\`

The \`from\` field must use a domain you have verified in Resend. The \`to\` field accepts a string or array of strings. The \`html\` field accepts any HTML string — though for production you'll want to use React Email templates rather than raw HTML strings.

## Using React Email for Templates

React Email lets you build HTML email templates as React components, using a set of cross-client-compatible primitives. This solves one of the ugliest problems in email development: different email clients (Gmail web, Outlook desktop, Apple Mail) render HTML very differently, and writing HTML that works everywhere is painful.

Install React Email and the component library:

\`\`\`bash
npm install @react-email/components react-email
\`\`\`

Create a template file at \`src/emails/WelcomeEmail.tsx\`:

\`\`\`tsx
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export default function WelcomeEmail({ name, loginUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading style={{ color: '#1a1a1a' }}>Welcome, {name}</Heading>
          <Text style={{ color: '#555', lineHeight: '1.6' }}>
            Your account is ready. Click the button below to sign in for the first time.
          </Text>
          <Button
            href={loginUrl}
            style={{ backgroundColor: '#6366f1', color: '#fff', padding: '12px 24px', borderRadius: '6px' }}
          >
            Sign In
          </Button>
          <Hr style={{ borderColor: '#e4e4e7', margin: '32px 0' }} />
          <Text style={{ color: '#999', fontSize: '12px' }}>
            If you did not create this account, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
\`\`\`

To render this to an HTML string for Resend, use the \`render\` function from \`@react-email/components\`:

\`\`\`typescript
import { render } from '@react-email/components';
import WelcomeEmail from '@/emails/WelcomeEmail';

const html = await render(<WelcomeEmail name="Jane" loginUrl="https://app.example.com/login" />);
\`\`\`

## Integrating Resend in a Next.js App Router API Route

Here is a complete, production-ready API route at \`src/app/api/send/route.ts\`:

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import WelcomeEmail from '@/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const html = await render(
    <WelcomeEmail name={name} loginUrl={\`https://yourdomain.com/login\`} />
  );

  const { data, error } = await resend.emails.send({
    from: 'Your App <noreply@yourdomain.com>',
    to: [email],
    subject: \`Welcome to Your App, \${name}!\`,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ id: data?.id });
}
\`\`\`

This route validates inputs, renders the React Email template to HTML, sends the email, and returns the Resend message ID on success or a structured error on failure. The Resend instance is created outside the handler so it is reused across requests in the same function instance.

## Handling Form Submissions with Loading and Error States

On the client side, calling this route from a form with proper feedback:

\`\`\`tsx
'use client';

import { useState } from 'react';

export default function SignupForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    setStatus(res.ok ? 'success' : 'error');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Your name" required />
      <input name="email" type="email" placeholder="Your email" required />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Sign Up'}
      </button>
      {status === 'success' && <p>Check your inbox — email sent!</p>}
      {status === 'error' && <p>Something went wrong. Please try again.</p>}
    </form>
  );
}
\`\`\`

## Best Practices for Deliverability

Getting emails delivered to the inbox consistently requires more than just having a verified domain.

**Use a consistent sending address.** Pick one \`from\` address per email type and stick to it. Changing senders frequently damages reputation.

**Warm up new domains gradually.** A brand-new domain that suddenly sends 1,000 emails on day one will trigger spam filters. Start with small batches (10–50/day), ramp up over two to four weeks.

**Include a plain-text version.** Emails with only HTML content score lower with some spam filters. Resend supports a \`text\` field alongside \`html\` — always include a plain-text fallback.

**Avoid spam trigger words in subjects.** Phrases like "FREE!!!", "Act Now", or "You've been selected" train spam filters against you. Write subject lines the way you'd write them to a colleague.

**Handle bounces and complaints.** Resend's webhook system can notify your application when an email hard-bounces or is marked as spam. Remove those addresses from your mailing list immediately — continued sending to bad addresses damages your domain reputation.

## Testing With Resend's Email Logs

One of Resend's standout features is the **Logs** section in the dashboard. Every email you send is recorded with its full status: delivered, bounced, opened (if tracking is enabled), or failed.

When debugging a deliverability issue, check Logs first. You'll see the exact error message Resend received from the recipient's mail server — far more useful than a generic "email failed to send" error from most providers.

You can also use Resend's **test email addresses** (\`delivered@resend.dev\`, \`bounced@resend.dev\`, \`complained@resend.dev\`) to simulate different delivery outcomes without sending to real users. This is especially useful for testing your webhook handling logic.

## Common Errors and Fixes

### "The domain is not verified"

Your \`from\` address uses a domain that hasn't been verified in Resend, or verification is still pending.

**Fix:** Check the Domains section of your dashboard. If records were recently added, wait 15–60 minutes for DNS propagation and click Verify again. Confirm the DNS records match exactly what Resend provided — extra spaces or missing characters in CNAME values are a common source of failures.

### Rate limit errors on the free tier

Resend's free tier caps sends at 100 emails per day and 3,000 per month. If you hit this limit, the API returns a \`429 Too Many Requests\` error.

**Fix:** Upgrade to a paid plan, or implement a queue system that batches and spaces out sends. For production applications with any real user volume, upgrade early — the paid tier starts at very reasonable pricing.

### \`render\` returns an empty string

This happens when the React Email render function is called in an environment that doesn't support JSX transformation, or when there's a mismatch between the React version and React Email's peer dependency expectations.

**Fix:** Ensure your \`tsconfig.json\` has \`"jsx": "react-jsx"\` and that your Next.js version is 13.4 or later. Running \`npm install react@latest react-dom@latest\` to align versions resolves most cases.

## Frequently Asked Questions

**Can I use Resend to send marketing emails, not just transactional ones?**
Resend is primarily designed for transactional email — messages triggered by user actions. For bulk marketing campaigns (newsletters, promotional blasts), dedicated platforms like Loops, Buttondown, or ConvertKit are better suited. Resend's terms of service and infrastructure are optimized for transactional volume.

**Do I need my own domain to use Resend?**
No — you can send from \`onboarding@resend.dev\` immediately after creating an account. However, for production use you must add and verify your own domain. Emails from Resend's shared domain will be flagged as suspicious by many email clients for any message that looks like it comes from your product.

**How does Resend compare to SendGrid on price?**
Resend's free tier (3,000/month) is more generous than SendGrid's (100/day). Resend's paid plans are also simpler and cheaper for most developer use cases. SendGrid has a larger feature set for enterprise scenarios (dedicated IPs, advanced analytics, marketing automation), but for a typical web application Resend's API is cleaner and more affordable.

**Can I send attachments with Resend?**
Yes. The \`resend.emails.send\` method accepts an \`attachments\` array where each item has a \`filename\` and \`content\` (base64-encoded string or Buffer). PDFs, images, and other binary files all work — just keep attachment sizes reasonable to avoid triggering spam filters.

**What happens to emails in the queue if my server goes down during a send?**
Resend handles delivery retries internally once a message is accepted by their API. If your server crashes before the API call completes, the email is not queued on Resend's side. For guaranteed delivery, consider using a background job queue (BullMQ, Inngest, Trigger.dev) to persist the send intent before making the Resend API call.

## Add Production-Grade Email to Your App With Amex Technology

Resend makes the initial setup straightforward, but building a truly robust email system requires more: proper bounce handling, unsubscribe flows, email preference management, monitoring for deliverability regressions, and making sure your domain reputation stays clean as your user base grows.

At **Amex Technology**, we integrate production-grade transactional email into every application we build — from the DNS verification and React Email template system to the webhook infrastructure that handles bounces and complaints automatically.

If you're building a product that needs reliable email, explore our work at the [Portfolio](/portfolio) page or reach out directly via the [Contact](/contact) page.
    `,
    category: "Engineering",
    tags: ["Resend", "Email", "Next.js", "API", "Transactional Email"],
    readTime: "8 min read",
    publishedAt: "2025-04-14",
    gradientFrom: "#10b981",
    gradientTo: "#0ea5e9",
    featured: false,
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=3840&q=100&auto=format&fit=crop",
  },
  {
    slug: "connect-nextjs-react-with-supabase",
    title: "How to Connect Next.js / React with Supabase (2025 Complete Guide)",
    excerpt:
      "A comprehensive guide to integrating Supabase with Next.js or React — covering database queries, authentication, Row Level Security, and real-time subscriptions.",
    content: `
## What Is Supabase?

Supabase is an open-source backend-as-a-service built on top of PostgreSQL. It bundles four major services under a single project:

- **Database** — a fully managed PostgreSQL instance with a built-in REST and GraphQL API, generated automatically from your schema
- **Auth** — user management with email/password, magic links, OAuth providers (Google, GitHub, etc.), and phone auth
- **Storage** — an S3-compatible file storage service with access policies tied to your database permissions
- **Realtime** — a WebSocket layer that lets clients subscribe to database changes as they happen

Unlike Firebase, which is a NoSQL document store, Supabase gives you a real relational database with foreign keys, joins, and full SQL power. That makes it a substantially better fit for the structured data most applications actually need.

## When to Use Supabase

Supabase is a strong default choice for any full-stack application where you want a complete backend without managing your own infrastructure. It's particularly well-suited for:

- **SaaS products** that need multi-tenant data isolation via Row Level Security
- **Applications with complex data relationships** that benefit from SQL and joins
- **Projects that need auth, database, and file storage** from a single provider
- **Prototypes and MVPs** where speed of development matters more than custom infrastructure

The free tier (500 MB database, 1 GB storage, 50,000 monthly active users) is generous enough to take a project from zero to early revenue.

## Step 1: Create a Supabase Project and Get Your Credentials

Go to [supabase.com](https://supabase.com), sign in, and click **New Project**. Give it a name, choose a region close to your users, and set a strong database password (save this — you'll need it for direct Postgres connections).

Once the project is provisioned (about 30 seconds), navigate to **Settings → API**. You'll find two values you need:

- **Project URL** — something like \`https://abcdefgh.supabase.co\`
- **anon public key** — a long JWT string. This is safe to use in client-side code as long as Row Level Security is enabled on your tables.

Keep the **service_role key** secret. It bypasses RLS entirely and should only be used in server-side code where you explicitly need admin access to the database.

## Step 2: Install the SDK and Configure Environment Variables

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

Create a \`.env.local\` file in your project root (add it to \`.gitignore\` if it isn't already):

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

The \`NEXT_PUBLIC_\` prefix exposes these variables to the browser bundle. The anon key is intentionally public — it's designed to be used in client-side code. Its permissions are limited by Row Level Security policies on your database tables.

## Step 3: Initialize the Client

Create \`src/lib/supabase.ts\`:

\`\`\`typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
\`\`\`

Import this singleton wherever you need database or auth access. For plain React (Vite or Create React App) this single file is all you need. For Next.js App Router, you'll use a different setup covered below — but this client is still the right starting point for React-only projects.

## Step 4: Database CRUD Operations

Supabase's query builder mirrors SQL closely. Here are the four essential operations.

### Select (Read)

\`\`\`typescript
const { data, error } = await supabase
  .from('posts')
  .select('id, title, content, created_at')
  .order('created_at', { ascending: false })
  .limit(10);
\`\`\`

### Insert (Create)

\`\`\`typescript
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'My First Post', content: 'Hello world', user_id: userId })
  .select()
  .single();
\`\`\`

The \`.select().single()\` chain returns the newly created row — useful when you need the auto-generated \`id\`.

### Update

\`\`\`typescript
const { error } = await supabase
  .from('posts')
  .update({ title: 'Updated Title' })
  .eq('id', postId);
\`\`\`

### Delete

\`\`\`typescript
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId);
\`\`\`

Always handle the \`error\` return value. A common mistake is checking \`data\` before checking \`error\` — the error object tells you whether a query failed and why, including RLS policy violations.

## Step 5: Authentication — Email/Password Signup and Login

Supabase Auth ships with pre-built flows for the most common authentication methods.

### Sign Up

\`\`\`typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword123',
  options: {
    data: { full_name: 'Jane Smith' },   // stored in auth.users.raw_user_meta_data
  },
});

if (error) {
  console.error('Signup error:', error.message);
} else {
  console.log('User created:', data.user?.id);
}
\`\`\`

By default, Supabase sends a confirmation email. The user is not considered active until the link is clicked. You can disable email confirmation in **Authentication → Settings** for development, but always enable it in production.

### Sign In

\`\`\`typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword123',
});

if (data.session) {
  console.log('Logged in:', data.session.user.id);
}
\`\`\`

### Sign Out

\`\`\`typescript
await supabase.auth.signOut();
\`\`\`

### Listening to Auth State Changes

\`\`\`typescript
const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') { /* update UI */ }
  if (event === 'SIGNED_OUT') { /* redirect to login */ }
});

// Clean up on component unmount
return () => subscription.unsubscribe();
\`\`\`

## Step 6: Next.js App Router Setup With @supabase/ssr

The single \`createClient\` approach works for React SPAs, but Next.js App Router has both server and client components, Server Actions, and middleware — each running in a different context with different cookie access. Supabase provides \`@supabase/ssr\` to handle this correctly.

\`\`\`bash
npm install @supabase/ssr
\`\`\`

### Browser Client (Client Components)

\`\`\`typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
\`\`\`

Use this in any \`'use client'\` component. It reads and writes cookies in the browser, keeping the session in sync.

### Server Client (Server Components, Route Handlers, Server Actions)

\`\`\`typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
\`\`\`

### Middleware for Session Refresh

Without middleware, a server component renders with a potentially expired session. Add \`src/middleware.ts\` to refresh the session on every request:

\`\`\`typescript
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();   // refreshes session if needed
  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
\`\`\`

This ensures that short-lived access tokens are refreshed server-side before your page renders, preventing flickering auth states.

## Step 7: Row Level Security

Row Level Security (RLS) is PostgreSQL's mechanism for enforcing per-row access rules at the database level. With RLS enabled, even if a bug in your application code accidentally exposes a query, the database itself will only return rows the authenticated user is allowed to see.

Enable RLS on a table and add a policy in the Supabase SQL editor:

\`\`\`sql
-- Enable RLS on the posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can only read their own posts
CREATE POLICY "Users can view their own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert posts with their own user_id
CREATE POLICY "Users can insert their own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own posts
CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);
\`\`\`

\`auth.uid()\` is a Supabase built-in that returns the ID of the currently authenticated user from the JWT. With these policies in place, a query for \`posts\` using the anon key will only ever return rows where \`user_id\` matches the logged-in user — regardless of what filters the application code passes.

## Step 8: Real-Time Subscriptions

Supabase Realtime lets you subscribe to database changes using PostgreSQL's logical replication. Changes to any table — inserts, updates, deletes — are broadcast over a WebSocket to all subscribed clients.

\`\`\`typescript
const channel = supabase
  .channel('posts-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      if (payload.eventType === 'INSERT') {
        setPosts(prev => [payload.new as Post, ...prev]);
      }
      if (payload.eventType === 'DELETE') {
        setPosts(prev => prev.filter(p => p.id !== payload.old.id));
      }
    }
  )
  .subscribe();

// Clean up on unmount
return () => { supabase.removeChannel(channel); };
\`\`\`

Before subscriptions work, you must enable replication on the table in the Supabase dashboard under **Database → Replication**. Toggle the relevant tables on.

## Step 9: File Uploads With Supabase Storage

Create a storage bucket in **Storage → New Bucket**. Set it to private unless files need to be publicly accessible.

\`\`\`typescript
// Upload a file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(\`\${userId}/avatar.png\`, file, {
    contentType: 'image/png',
    upsert: true,
  });

// Get a public URL (for public buckets)
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(\`\${userId}/avatar.png\`);

// Get a signed URL (for private buckets, valid for 1 hour)
const { data: { signedUrl } } = await supabase.storage
  .from('avatars')
  .createSignedUrl(\`\${userId}/avatar.png\`, 3600);
\`\`\`

Storage access is controlled by storage policies, similar in syntax to RLS. A common policy for user avatars: allow a user to upload and read files only under their own \`user_id\` path.

## Common Mistakes

### Using the Anon Key Server-Side Without RLS

The anon key is safe on the client because RLS limits what it can access. But if you use it in a Server Action or Route Handler without RLS enabled on your tables, every authenticated user can query every row — including other users' data.

**Fix:** Enable RLS on every table that contains user data. Use the Supabase dashboard's **Advisors → Security** tab to get a report of tables with RLS disabled.

### Not Refreshing the Session in Middleware

If you skip the middleware setup, server components render with a stale or expired session. The user appears logged out on the first server render even though their browser has a valid session cookie.

**Fix:** Add the middleware from Step 6 above. This is the most common source of "auth works in client components but not server components" confusion.

### Fetching Data in Client Components When Server Components Would Work

Many developers default to \`useEffect\` + Supabase client for all data fetching. In Next.js App Router, Server Components can fetch data directly without a loading state, waterfall, or client-side JavaScript.

**Fix:** Use the server client in Server Components for initial data loads. Reserve the browser client for mutations, real-time subscriptions, and auth state changes that must happen on the client.

## Frequently Asked Questions

**Is the anon key safe to commit to a public repository?**
The anon key is designed to be public — it identifies your project, not your access level. It's safe to expose it in client-side code. What makes it safe is RLS. Without RLS on your tables, the anon key grants full read/write access to all rows, which is why enabling RLS is non-negotiable for any production application.

**What's the difference between \`createClient\` from \`@supabase/supabase-js\` and from \`@supabase/ssr\`?**
The base \`createClient\` stores the session in localStorage, which doesn't work in server environments. The \`@supabase/ssr\` variants (\`createBrowserClient\` and \`createServerClient\`) use cookies instead, enabling the session to be read by both browser and server code in Next.js.

**Can I use Supabase with a React app that isn't Next.js?**
Yes. The base \`@supabase/supabase-js\` client works in any JavaScript environment — Vite, Create React App, React Native, or plain HTML. The \`@supabase/ssr\` package is specifically for server-rendering frameworks like Next.js, Remix, and SvelteKit.

**How do I handle database migrations as my schema changes?**
Supabase integrates with the Supabase CLI and supports migration files that you can version control alongside your application code. Run \`supabase db diff\` to generate a migration from schema changes, then \`supabase db push\` to apply it. For teams, this is the recommended approach over manually editing tables in the dashboard.

**Does Supabase support full-text search?**
Yes. PostgreSQL has built-in full-text search using \`tsvector\` and \`tsquery\`. Supabase exposes this through the \`.textSearch()\` method on the query builder. For more advanced search (fuzzy matching, relevance ranking, multi-language), you can use the \`pg_trgm\` extension, which Supabase supports out of the box.

## Build Production-Grade Supabase Applications With Amex Technology

Setting up Supabase correctly is the beginning. A production application needs a hardened schema with proper indexes, RLS policies that cover every access pattern, a migration strategy that works with CI/CD, and monitoring that alerts you when query performance degrades.

At **Amex Technology**, we design and build full-stack applications on the Next.js and Supabase stack — from schema design and RLS policy architecture to the deployment pipeline and observability layer. If you're starting a new project or scaling an existing one, we'd be glad to help you get it right from the foundation.

Explore our work at the [Portfolio](/portfolio) page or get in touch directly via the [Contact](/contact) page.
    `,
    category: "Engineering",
    tags: ["Next.js", "React", "Supabase", "Database", "Authentication", "Full Stack"],
    readTime: "10 min read",
    publishedAt: "2025-05-20",
    gradientFrom: "#22c55e",
    gradientTo: "#3b82f6",
    featured: false,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=3840&q=100&auto=format&fit=crop",
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
