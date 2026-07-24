# Amex Technology — Project History

A chronological record of all commits, features, and changes made to the amextechnology.com codebase.

---

## [v0.6] — July 13–24, 2026 · Premium Redesign, Blog Expansion, Image Pipeline & Homepage Animation

### Premium redesign & UI polish (`4feab95`, `14aec23`, `5c294b0`, `5de020c`, `aadba8a`, `b939980`, `4fb90f3`, `3af12a6`, `74a8a83`, `5265dd2`, `d661197`)
- Homepage, services, about, contact, blog and navbar redesigned for a more premium look
- Section spacing reduced, layouts expanded, FAQs updated, favicon fixed
- Full-width layout fix for blog prose, privacy and terms pages
- Brand logo mark (`LogoMark`) and favicon added
- Fluid hero heading sizing, static tech list, working newsletter signup
- `ServicesPreview` auto-advance removed (was causing the page to scroll on its own)
- Framer Motion `ease` array cast to a tuple to fix a TypeScript build error

### Portfolio expansion (`90e28db`, `fa39321`, `28f327f`, `1b3fcf5`, `9133133`)
- Added HourSheets, Buttercream Bus, East End Vintage Sale, Ultra Windows, Wolfe Property Portal, EmiGo, Cyber7, and Dialogix as new case studies in `src/data/projects.ts`, each with gallery screenshots under `public/images/portfolio/`

### Blog content expansion (`a5cff81`, `b7e6529`, `4364efb`, `72b5194`, `3d2af2e`)
- Added ~20 new SEO-targeted troubleshooting posts across Supabase, Firebase, Vercel, Lovable, Replit, GoDaddy/DNS and Bolt.new topics, each with matching hero + body images
- `0853c32` — added internal links to `/services` across every existing post
- `1ac41d0` — blog schema/metadata overhaul as part of a page-audit pass
- `0381fcd`, `a421b22` — blog `metaTitle` tags optimized for Google ranking; sitemap `lastModified`/`updatedAt` refreshed across all posts

### Blog image pipeline fixes (`5c21ea0`, `9170bd4`, `8179a2d`, `775839f`, `0012ebb`, `3342ccf`, `aa2c86a`, `f9a6036`)
- Fixed blog image cropping and container height issues for the featured card's `next/image fill` usage
- Root-caused a recurring "blog images not loading" bug: several card thumbnails were 4.5–6.6MB raw RGBA PNG screenshots that Next.js's image optimizer failed/timed out on in production — re-encoded to WebP (quality 80, alpha flattened), cutting them to under 250KB each
- Root-caused a second variant of the same bug on the GoDaddy card and the Supabase+Next.js featured card: the source file was fine, but the `_next/image` URL had been served once while broken and cached `immutable` for a year — fixed by renaming the source file so the URL (and therefore the cache key) changes
- All secondary in-post blog images embedded inline and converted to WebP

### Homepage animation redesign (this session — `ae58227`, `4a77073`, `2d45abc`, `923acff`, `3971629`)
- Replaced developer-facing code/terminal visuals (a typing code snippet and a fake terminal window) in the Hero and the "Clean, Maintainable Code" bento card — reasoning: the site's audience is non-technical buyers who could find raw code intimidating rather than reassuring
- Added `animejs` and built `AnimatedLogoDraw`, a shared component that line-draws the existing brand mark's strokes via `svg.createDrawable()`, then reveals the word "Amex" letter-by-letter via `splitText`/`stagger`, once on scroll into view, with a `prefers-reduced-motion` fallback
- First pass (lone icon+word in an empty panel) read as too sparse; researched brightdata.com's design language for a second pass and replaced it with `CapabilityStack` — three staggered, gradient-bordered cards (Full-Stack Development / Cloud & DevOps / AI-Powered Features) — and a matching checklist in the bento card, both filling the space with real content instead of empty space

### Technical SEO audit (this session — `27bb0e0`)
- Added a `<main>` landmark to every public page (previously only the dashboard had one)
- Portfolio case-study body: `<section>` → `<article>`, consistent with blog/legal pages
- Linked the `Organization` and `LocalBusiness`/`ProfessionalService` JSON-LD nodes via a shared `@id` so they read as one entity; `WebSite` schema's `publisher` now points to it
- Added `BreadcrumbList` schema to `/privacy` and `/terms` (visible breadcrumb existed but had no matching schema)
- Added dedicated `opengraph-image` routes for `/blog`, `/portfolio`, `/about`, `/services`, `/contact` (previously fell back to the generic homepage OG card)
- Added `robots: { index: false }` to all three `/dashboard` routes
- `sitemap.ts`: static pages and portfolio entries now use a fixed date instead of `new Date()`, which was resetting the freshness signal on every deploy regardless of whether content changed
- Replaced one blog post's external Unsplash hotlink with a self-hosted WebP

### UX fixes (this session — `673573a`, `a4c39b2`)
- Added an aurora background glow and a cursor-following spotlight effect to the Services section
- `ServicesPreview`: desktop service list now switches on hover/focus instead of requiring a click (mobile accordion untouched — no hover on touch)
- Fixed the blog featured card ("How to Connect Next.js with Supabase") rendering blank — same immutable-cache pattern as the GoDaddy card, fixed by renaming the source image
- Fixed portfolio grid cards for Ultra Windows and Wolfe Property Portal center-cropping their square screenshots and hiding the actual hero content — added a per-project `imagePosition` field (mirroring the existing blog post pattern) and wired it into `ProjectGrid`'s image classes

---

## [v0.5] — July 11, 2026 · SEO, Legal Pages & Analytics

### `26d0695` — feat: add Google Analytics (G-RLBM20P7Z4)
- Added `next/script` with `strategy="afterInteractive"` to root layout for GA4 tracking
- Measurement ID: `G-RLBM20P7Z4`
- Loads after hydration — no render blocking, works correctly on client-side navigations

### `9167da9` — feat: add /privacy and /terms pages with sitemap entries
- Created `src/app/privacy/page.tsx` — full Privacy Policy covering:
  - Data collected (contact forms, Supabase auth accounts, Stripe payments, Google Analytics, server logs)
  - How data is used
  - Cookies and tracking technologies (strictly necessary, analytics `_ga`/`_gid`, Cloudflare `__cf_bm`)
  - Third-party services table: Google Analytics, Vercel, Cloudflare, Supabase, Stripe, Resend
  - Data retention periods per data type
  - User rights (access, correction, deletion, restriction, portability)
  - Contact details for privacy requests
  - Last updated: July 11, 2026
- Created `src/app/terms/page.tsx` — full Terms of Service covering:
  - Acceptance of terms
  - Description of service
  - User account responsibilities (login/dashboard)
  - Acceptable use policy
  - Intellectual property
  - Disclaimer of warranties
  - Limitation of liability (capped at fees paid or INR 5,000)
  - Third-party links
  - Governing law: Republic of India
  - Changes to terms
  - Last updated: July 11, 2026
- Both pages match existing site layout (Navbar, Breadcrumb, Footer, dark theme)
- `src/app/sitemap.ts` — re-added `/privacy` and `/terms` with `priority: 0.3` / `changeFrequency: "yearly"`
- Footer already linked to both pages — no footer changes needed

### `8de9901` — feat: add complete technical SEO basics *(PR #2 merged)*
- `src/app/robots.ts` — added `/dashboard/`, `/login`, `/success` to disallow list
- `src/app/sitemap.ts` — removed `/privacy` and `/terms` (pages didn't exist yet, would have caused crawler 404s)
- `src/app/layout.tsx` — added `og:image` and `twitter:image` fallback pointing to `/opengraph-image` so all inner pages (About, Services, Blog, Contact, Portfolio) get a default social share image
- `src/app/success/page.tsx` — added `robots: { index: false, follow: false }` to payment confirmation page
- `src/app/login/layout.tsx` — new file; wraps client-component login page with `noindex` metadata (workaround since `"use client"` components can't export metadata)

### `06c97b5` — fix: replace native select with custom dropdown in ContactForm *(PR #1 merged)*
- `src/components/contact/ContactForm.tsx` — replaced native `<select>` element with custom-styled dropdown component to fix styling inconsistency across browsers

---

## [v0.4] — June 16, 2026 · Major UI Overhaul & SEO Foundation

### `46e9762` — changes done
A large batch of improvements across the entire codebase:

**SEO Infrastructure**
- `src/app/robots.ts` — created with `allow: "/"`, `disallow: ["/api/", "/_next/"]`, sitemap reference
- `src/app/sitemap.ts` — created dynamic sitemap covering all static pages + blog/portfolio slugs
- `src/app/opengraph-image.tsx` — root dynamic OG image (1200×630) built with `next/og`
- `src/app/blog/[slug]/opengraph-image.tsx` — per-blog-post dynamic OG image
- `src/app/portfolio/[slug]/opengraph-image.tsx` — per-project dynamic OG image
- `src/app/layout.tsx` — full metadata (`metadataBase`, title template, description, keywords, OG, Twitter, Organization JSON-LD schema, canonical)
- `src/app/page.tsx` — WebSite JSON-LD, FAQPage JSON-LD, Review ItemList JSON-LD
- All pages updated with individual `metadata` exports (title, description, canonical, OG, Twitter)
- `src/app/services/page.tsx` — ProfessionalService JSON-LD + BreadcrumbList JSON-LD
- `src/app/blog/[slug]/page.tsx` — Article JSON-LD + BreadcrumbList JSON-LD
- `src/app/portfolio/[slug]/page.tsx` — BreadcrumbList JSON-LD

**New UI Components**
- `src/components/ui/Breadcrumb.tsx` — breadcrumb navigation component used across all inner pages
- `src/components/ui/BrowserMockup.tsx` — browser chrome wrapper for portfolio screenshots
- `src/components/ui/PhoneMockup.tsx` — phone frame wrapper for mobile app screenshots
- `src/components/ui/LaptopMockup.tsx` — laptop frame UI component
- `src/components/ui/CustomCursor.tsx` — custom animated cursor for desktop
- `src/components/ui/ScrollProgress.tsx` — reading/scroll progress indicator bar
- `src/components/blog/BlogPostContent.tsx` — prose renderer for blog post HTML content
- `src/components/home/FAQSection.tsx` — FAQ accordion section for homepage
- `src/components/portfolio/CaseStudyGallery.tsx` — image gallery for project detail pages

**Major Component Rewrites**
- `src/components/home/Hero.tsx` — full redesign with animated elements
- `src/components/home/ServicesPreview.tsx` — redesigned service cards
- `src/components/home/WhyChooseUs.tsx` — new differentiator section layout
- `src/components/home/ProcessSection.tsx` — updated process/workflow steps
- `src/components/home/FeaturedProjects.tsx` — updated featured projects section
- `src/components/layout/Footer.tsx` — full footer rebuild with 4-column grid, Privacy/Terms links, social links
- `src/components/portfolio/ProjectGrid.tsx` — major rework with filter tabs and card grid
- `src/components/portfolio/CaseStudyGallery.tsx` — new gallery component for case study pages
- `src/components/services/ServicesPageContent.tsx` — full services page content rebuild
- `src/components/contact/ContactForm.tsx` — form redesign

**PWA & Manifest**
- `public/site.webmanifest` — web app manifest (name, short_name, start_url, icons, theme_color)
- `next.config.ts` — extended with additional configuration

**Styles**
- `src/app/globals.css` — significant CSS additions (animations, button glow effects, prose styles, custom scrollbar)

---

## [v0.3] — June 12, 2026 · Blog Content & Portfolio Gallery Assets

### `a1c19d6` — added blogs
- `src/data/blog.ts` — new blog posts added to the data layer
- `src/data/projects.ts` — additional project data entries
- `src/app/blog/[slug]/page.tsx` — blog post page improvements
- `src/app/blog/page.tsx` — blog listing page updates
- `src/app/portfolio/[slug]/page.tsx` — portfolio detail page updates
- `src/app/globals.css` — additional global styles
- `next.config.ts` — updated image domain configuration

**Portfolio Gallery Images Added**
- `public/images/portfolio/hmd/` — HMD project screenshots (hero-bg, journal-club, md-adjunct, residency-adjunct)
- `public/images/portfolio/molar-ai/` — Molar AI screenshots (before/after profile, DM testimonial, metrics views, profile photo)
- `public/images/portfolio/periscope-email/` — Periscope Email assets (flow diagram, logo)
- `public/images/portfolio/torqron/` — Torqron product images (additives, advanced-sealing, critical-parts, granulation-technology, industrial-filtration, logo, packaging-materials)

---

## [v0.2] — May 28–29, 2026 · Full Site Build

### `2c40619` — added the client projects in portfolio
- `src/data/projects.ts` — complete rewrite with 7 real client case studies:
  - Molar AI, Periscope Email, Herruby App, HMD, ZenScroll, Expert Village Media, Torqron
- Portfolio thumbnail images added to `public/images/portfolio/`
  - `molar-ai.png`, `periscope-email.jpg`, `herruby-app.jpg`, `hmd.jpg`, `zenscroll.png`, `expert-village-media.jpg`, `torqron.jpg`
- `next.config.ts` — updated `images.remotePatterns` for external image sources
- `src/app/portfolio/[slug]/page.tsx` — case study detail page major update
- All page components refreshed with updated styling
- Dashboard components (`ClientDashboard.tsx`, `DevDashboard.tsx`) updated
- `.claude/settings.json` — Claude Code project settings added

### `df4bea3` — added improvements, UI design
- Full visual polish pass across all components
- `src/app/globals.css` — CSS overhaul
- Component-level style improvements:
  - `AboutPageContent.tsx`, `ContactForm.tsx`, `CTASection.tsx`, `FeaturedProjects.tsx`
  - `Hero.tsx`, `ProcessSection.tsx`, `ServicesPreview.tsx`, `StatsBar.tsx`
  - `Testimonials.tsx`, `WhyChooseUs.tsx`, `Footer.tsx`, `Navbar.tsx`
  - `ProjectGrid.tsx`, `ServicesPageContent.tsx`

### `32a0336` — added blogs, contacts, portfolio section
A major feature addition that built out the marketing site:

**New Pages**
- `src/app/blog/page.tsx` — blog listing page with featured post hero and post grid
- `src/app/blog/[slug]/page.tsx` — individual blog post page with reading time, related posts, inline CTA
- `src/app/portfolio/page.tsx` — portfolio listing page
- `src/app/portfolio/[slug]/page.tsx` — case study detail page (problem, solution, results, gallery)
- `src/app/contact/page.tsx` — contact page with form and sidebar FAQ

**New Components**
- `src/components/contact/ContactForm.tsx` — contact/project inquiry form
- `src/components/about/AboutPageContent.tsx` — about page content sections
- `src/components/home/CTASection.tsx` — call-to-action section
- `src/components/home/FeaturedProjects.tsx` — featured work section
- `src/components/home/Hero.tsx` — homepage hero section
- `src/components/home/ProcessSection.tsx` — development process steps
- `src/components/home/ServicesPreview.tsx` — services overview cards
- `src/components/home/StatsBar.tsx` — statistics bar (projects, years, etc.)
- `src/components/home/Testimonials.tsx` — client testimonials section
- `src/components/home/WhyChooseUs.tsx` — differentiators section
- `src/components/layout/Footer.tsx` — site footer with links and contact info
- `src/components/layout/Navbar.tsx` — responsive navigation with mobile menu
- `src/components/portfolio/ProjectGrid.tsx` — portfolio project grid with filter

**Data Layer**
- `src/data/blog.ts` — blog post data (titles, slugs, content, categories, tags)
- `src/data/projects.ts` — portfolio project data (description, tech stack, problem/solution/results)
- `src/data/services.ts` — services data
- `src/data/testimonials.ts` — client testimonials data

**API**
- `src/app/api/contact/route.ts` — contact form submission handler (Resend email integration)

**About Page**
- `src/app/about/page.tsx` — rebuilt about page using new `AboutPageContent` component

---

## [v0.1] — May 26–28, 2026 · Initial Site & Infrastructure

### `5441518` — test *(by heetp0101)*
- Added `test.txt` (temporary test file, removed in subsequent commit)

### `2eaefa5` — removed razorpay
- Removed Razorpay payment integration from the codebase
- `src/app/api/checkout/route.ts` — stripped Razorpay order creation logic
- `src/app/api/verify/route.ts` — stripped Razorpay signature verification logic
- `src/components/Services.tsx` — removed Razorpay payment button/flow
- `package.json` — removed `razorpay` dependency

### `cd6275e` — Add full site — Razorpay payments, Supabase auth, dashboards, services
*Initial full-site commit (co-authored with Claude)*

**Pages**
- `src/app/about/page.tsx` — about page
- `src/app/contact/page.tsx` — contact page (initial version)
- `src/app/services/page.tsx` — services page
- `src/app/login/page.tsx` — login/signup page (Supabase Auth)
- `src/app/success/page.tsx` — payment success confirmation page
- `src/app/dashboard/page.tsx` — dashboard router
- `src/app/dashboard/client/page.tsx` — client dashboard view
- `src/app/dashboard/dev/page.tsx` — developer/admin dashboard view

**API Routes**
- `src/app/api/checkout/route.ts` — payment checkout endpoint (Razorpay, later removed)
- `src/app/api/contact/route.ts` — contact form email handler
- `src/app/api/verify/route.ts` — payment verification endpoint
- `src/app/api/webhook/route.ts` — Stripe webhook handler

**Components**
- `src/components/Contact.tsx` — contact section component
- `src/components/Footer.tsx` — initial footer
- `src/components/Hero.tsx` — initial hero section
- `src/components/Navbar.tsx` — initial navigation
- `src/components/Process.tsx` — process/workflow component
- `src/components/Services.tsx` — services section with pricing
- `src/components/Testimonials.tsx` — testimonials section
- `src/components/dashboard/ClientDashboard.tsx` — client-facing dashboard UI
- `src/components/dashboard/DevDashboard.tsx` — internal developer dashboard UI
- `src/components/ui/badge.tsx`, `button.tsx`, `card.tsx` — shadcn/ui base components
- `src/components/ui/navigation-menu.tsx`, `separator.tsx`, `sheet.tsx` — shadcn/ui navigation components

**Infrastructure**
- `src/middleware.ts` — Supabase auth middleware; protects `/dashboard` routes, redirects authenticated users away from `/login`
- `src/lib/supabase/client.ts` — Supabase browser client
- `src/lib/supabase/server.ts` — Supabase server client (SSR-safe)
- `src/lib/utils.ts` — shared utility functions (`cn` class merger)
- `components.json` — shadcn/ui configuration
- `package.json` — added: `@supabase/ssr`, `@supabase/supabase-js`, `@stripe/stripe-js`, `stripe`, `resend`, `framer-motion`, `next-themes`, `lucide-react`, `shadcn`, `class-variance-authority`, `clsx`, `tailwind-merge`

---

## [v0.0] — May 24, 2026 · Project Initialisation

### `6a0b837` — Initial commit from Create Next App
- Next.js 16 project scaffolded with App Router
- TypeScript, Tailwind CSS v4, ESLint configured
- `src/app/layout.tsx` — root layout with Inter font
- `src/app/page.tsx` — placeholder home page
- `src/app/globals.css` — base global styles
- `src/app/favicon.ico` — site favicon
- `AGENTS.md`, `CLAUDE.md` — Claude Code project instructions
- `next.config.ts`, `tsconfig.json`, `postcss.config.mjs` — project configuration files

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + custom |
| Auth | Supabase Auth |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe |
| Email | Resend |
| Analytics | Google Analytics 4 (G-RLBM20P7Z4) |
| Hosting | Vercel |
| CDN / DNS | Cloudflare |
| Animation | Framer Motion |
| Icons | Lucide React |
