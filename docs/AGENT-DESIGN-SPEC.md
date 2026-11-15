# Amex Technology: design and audit spec for the implementer

Branch: `codex/amex-website-refresh` (uncommitted, not deployed). Audit date: 2026-11-14.
Baseline: `npx tsc --noEmit` passes. Live site (amextechnology.com) still runs the old design; `/hire-developers`, the 3 local SEO pages and `/ai-operations-agent` all return 404 live.

**Scope for the implementer in one session:** all of B-P0, B-P1, section C, section D. P2 is optional.

**Do not touch:** `src/app/api/**` (leads, subscribe, razorpay), `src/lib/razorpay.ts`, `src/app/dashboard/**`, `src/components/dashboard/**`, Supabase code (`src/lib/portfolio/data.ts`, etc.), the body text of `privacy`, `terms`, `refund-policy`, `delivery-policy`, `.env*`, `src/app/success/page.tsx` (payment flow). In `ContactForm.tsx`, change only the `services` list and the prefill mapping; do not change the submit logic, the Web3Forms call, the `/api/leads` call or the GA event.

**Honesty rules (apply everywhere):** use only these facts: founder Abhi Patel lives in Gardena (Los Angeles); development team in India; Upwork Top Rated Plus; $80K+ earned on Upwork; 5 years of experience; the real offers and portfolio already in the repo. No project/client counts, no response-time promises, no guaranteed results, no invented logos, awards or certifications.

---

## A. Design system (as the redesign defines it)

Source of truth: `src/components/agency/agency.module.css` (CSS module, scoped under `.site`), `src/components/layout/navbar.module.css`. Reuse these classes on any page by `import s from "@/components/agency/agency.module.css"` and wrapping the page in `<div className={s.site}>` (or `<main className={s.site}>`).

### Colors

| Token (proposed name) | Value | Use |
| --- | --- | --- |
| `--ink` | `#1a211d` | Headings, body text on paper |
| `--paper` | `#f7f6f2` | Page background (`.site`) |
| `--muted` | `#626960` (alt `#687061`) | Secondary text, paragraphs. 5.2:1 on paper |
| `--gold` | `#ba8b35` / `#b18432` | **Decorative only** (eyebrow dot, rules). 2.8–3.1:1, never for text |
| `--gold-text` | `#96702b` / `#9a722a` | Serif italic `<em>` in headings (large text only, about 4:1) |
| `--gold-text-small` | `#7a5807` (6.0:1) or `#8b6525` (4.9:1) | Any gold text under 18px: links, labels, small caps |
| `--surface` | `#ffffff` | Raised panels (contact form card) with border `#dddfd3` |
| `--surface-2` | `#eeeee4` / `#eeeee6` | Quote band, alternate section, outline hover |
| `--line` | `#dadcd1` (range `#d4d8ca`–`#e4e2d8`) | 1px borders, grid lines, FAQ rules |
| `--dark` | `#202922` | Dark sections (`.dark`); text `#f7f5ed`, muted `#c4c8b9`, em `#d4ba7e` |
| `--button` | `#202a23` → hover `#3d493d` | Primary button, white text |
| `--button-light` | `#e7c98a` → hover `#f2dba9` | Primary button on dark sections, text `#20251e` |
| `--cta-band` | `#e8d8b4` | Closing CTA band (`.cta`); paragraph text must be `#4f4b3a` or darker (current `#68644f` is 4.2:1) |

Retire on redesigned pages: white page background (`bg-white`), slate palette (`text-slate-*`, `border-slate-200`, `bg-slate-50`), the `#B8860B → #9C7208` gold gradient button (white on it is 3.25:1, fails AA), `rounded-2xl`/`rounded-xl` cards, `#111827` navy panels, emoji in UI copy.

### Typography

- Family: Inter, bundled locally (`public/fonts/inter-latin-{400,500,600,700}-normal.woff2`, `--font-inter`).
- Accent: Georgia italic, weight 400, gold-text color, only inside `<em>` in `h1`/`.heading`. One accent phrase per heading.
- `h1` (`.hero h1`, `.pageHero h1`): `clamp(42px, 5.5vw, 74–78px)`, weight 500, letter-spacing about `-0.06em`, line-height 1.04.
- Section heading (`.heading`): `clamp(32px, 3.7vw, 49px)`, weight 500, tight tracking.
- Eyebrow (`.eyebrow`): uppercase, 600, letter-spacing 0.16em, gold dot `::before`. **Change size to 12px everywhere (see P1-A11Y).**
- Intro (`.intro`): 16px / 1.85, max-width 460–540px, `--muted`.
- Body/card text: currently 12–13px. **Minimum 14px for paragraphs, 12px for labels** (see P1-A11Y).

### Spacing and layout

- Container `.wrap`: `min(1280px, 100% - 96px)`; `100% - 64px` at ≤1100px; `100% - 40px` at ≤520px (20px gutters on phones).
- Section rhythm `.section`: 94px vertical; 65px at ≤800px; 52px at ≤520px.
- Page hero `.pageHero`: 145px top (clears the fixed 82px header), 65px bottom.
- Breakpoints: 1100, 950 (nav collapses), 800 (grids go to 1–2 columns), 520.
- Radius: 5px buttons and image frames, 6px small cards, 8–10px large panels/art. No pill-shaped cards.

### Components (class → purpose)

| Class / component | Purpose |
| --- | --- |
| `.site` | Root wrapper; sets ink/paper |
| `.hero`, `.heroGrid`, `.pageHero` | Home hero / inner-page hero |
| `.eyebrow`, `.heading`, `.sectionHead`, `.sectionText`, `.intro` | Section typography |
| `.button`, `.buttonLight`, `.outline`, `.textLink`, `.actions` | Buttons (min-height 50px) and inline arrow links (min-height 44px) |
| `.serviceGrid` + `.service` + `.serviceTop` + `.tags` | 3-column bordered grid of cards (icon, number, h3, p, link) |
| `.process` + `.processStep` | 4-column numbered steps with top rule |
| `.models` + `.model` | 3 bordered option cards with bullet list (hire page) |
| `.faqGrid` + `.faq details/summary` | Native accordion with +/− marker |
| `.dark` | Forest-black section variant |
| `.quote`, `.quoteGrid`, `.stars` | Testimonial band |
| `.cta`, `.ctaInner` | Gold-sand closing band |
| `.checkList` | Inline check items |
| `.roleRow` | Row links with arrow (hire preview) |
| `AgencySections.tsx` | `ServiceGrid`, `Process`, `HirePreview`, `AgencyCTA`, `AgencyFAQ`, `roles`, `hireLink()` |
| Navbar / Footer | `src/components/layout/Navbar.tsx` (redesigned), `Footer.tsx` (**not** redesigned yet, see P1) |
| Focus | `.site a:focus-visible, .site summary:focus-visible { outline: 2px solid #936a20; outline-offset: 5px }`; extend to `button`, `input`, `select`, `textarea` |

New shared classes the implementer should add to `agency.module.css` (needed by C and D):

```css
.pageHeroCompact { padding: 118px 0 56px; }            /* inner pages with breadcrumb */
@media (max-width: 520px) { .pageHeroCompact { padding: 104px 0 40px; } }
.crumbs { display:flex; flex-wrap:wrap; gap:6px; font-size:13px; color:var(--muted); margin-bottom:28px; }
.crumbs a:hover { color:#7a5807; }
.crumbs [aria-current] { color:var(--ink); font-weight:500; }
.priceNote { font-size:14px; color:var(--muted); }
.priceNote strong { color:var(--ink); font-weight:600; }
.panel { background:#fff; border:1px solid #dddfd3; border-radius:8px; padding:32px; }
@media (max-width: 520px) { .panel { padding:20px; } }
.checks { display:grid; grid-template-columns:1fr 1fr; gap:14px 32px; }
.checks li { display:flex; gap:12px; font-size:15px; line-height:1.6; color:var(--ink); }
.checks svg { flex-shrink:0; margin-top:3px; color:#7a5807; }
@media (max-width: 800px) { .checks { grid-template-columns:1fr; } }
.chips { display:flex; flex-wrap:wrap; gap:8px; }
.chips > * { font-size:13px; padding:7px 12px; border:1px solid #dadcd1; border-radius:5px; color:var(--ink); }
.chips a:hover { border-color:#8b6525; color:#7a5807; }
.badge { display:inline-flex; font-size:12px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:#7a5807; border:1px solid #d8c79f; background:#f3ead6; border-radius:4px; padding:4px 8px; }
.priceGrid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media (max-width: 800px) { .priceGrid { grid-template-columns:1fr; } }
.chat { background:#1b1d18; color:#f7f5ed; border-radius:10px; padding:24px; font-size:14px; line-height:1.6; }
.chat .q { color:#e7c98a; margin-bottom:10px; }
.chat .a { color:#e4e6dc; }
.chat small { display:block; font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:#c4c8b9; margin-bottom:16px; }
```

---

## B. Prioritized fix list

### P0: must fix before deploy

**P0-1 Invented "200+ projects" claims** (old copy, still shipped on redesigned pages)
- `src/app/about/page.tsx` metadata (description, openGraph, twitter): remove "Our engineers and designers have shipped 200+ projects for startups and enterprises worldwide" / "has delivered 200+ software projects for startups and enterprises across North America, Europe, and beyond". Replace all three with:
  `"Amex Technology is an independent software and AI agency founded by Abhi Patel. Founder in Los Angeles, development team in India, Top Rated Plus on Upwork."`
  Change `title` from `"About Us — Founded 2019"` to `"About Amex Technology"` (OG/Twitter title: `"About Amex Technology | Independent Software & AI Agency"`).
- `src/app/portfolio/page.tsx` metadata lines ~15, 22, 28: replace "portfolio of 200+ projects" / "200+ projects delivered" with `"Real case studies from Amex Technology: web apps, mobile apps, SaaS platforms and AI products, with the problem, solution and stack for each."`
- `src/app/opengraph-image.tsx` line ~78: replace `"Web apps, mobile apps & SaaS platforms. 200+ projects delivered."` with `"Websites, apps & AI agents. Top Rated Plus on Upwork."` This image is the default social card for every page.

**P0-2 Unverifiable response-time promises**
- `src/components/layout/Footer.tsx` "Response time / Within 4 hours" block with pulsing green dot (lines ~225–232): delete the whole block.
- `src/app/contact/page.tsx` metadata (3 places): replace `"...and we'll reply within 4 hours."` with `"...and we'll reply with practical next steps."`
- Leave `/fix` "usually within 24 hours" (a real, existing offer with "usually") and `/la-website` "We reply within a few hours" as is (owner's existing offer copy).

**P0-3 Location contradiction ("Based in India" vs. LA founder)**
The LA pages, `llms.txt` and the local SEO pages say the founder lives in Gardena; the redesign says "Based in India" on the homepage, about, contact, FAQ and footer. Use one line everywhere: **"Founder in Los Angeles · Development team in India"**.
- `src/components/agency/AgencyHome.tsx` `heroNote`: `Based in India · Working with businesses worldwide` → `Founder in Los Angeles · Development team in India · Working with clients worldwide`.
- `src/components/agency/AgencySections.tsx` `agencyFaqs[4]` answer → `"Yes. Our founder, Abhi Patel, is based in Los Angeles and our development team is in India, so we work with clients across the US and internationally. We agree on communication, meeting times and delivery expectations at the start."` (FAQPage JSON-LD on the homepage reads from this array, so it stays in sync automatically.)
- `src/components/agency/AgencyAbout.tsx` third paragraph: `"Based in India and working with clients internationally, ..."` → `"Our founder, Abhi Patel, lives in Gardena in Los Angeles; our development team is in India. We keep collaboration direct and practical: clear milestones, regular conversations, and work you can see as it develops."`
- `src/components/agency/AgencyContact.tsx` item `"Based in India. Working globally."` → title `"Los Angeles founder. Team in India."`, text `"US clients get Pacific-time calls; we agree on meeting times that work for your team."` Working hours item: `"Monday–Saturday, 9am–8pm IST · Pacific-time calls by arrangement"`.
- `src/components/layout/Footer.tsx` brand line: `Based in India · Serving clients globally · Los Angeles · Est. 2019` → `Founder in <Link href="/los-angeles">Los Angeles</Link> · Development team in India`.
- Do **not** change `addressCountry` in JSON-LD in this session (see P2-5).

**P0-4 Contact prefill silently drops service presets** (`src/components/contact/ContactForm.tsx`)
The service `<select>` is now `required`, and `ContactFormWithParams` only accepts values that exactly match the list. These existing links arrive with an empty service: `Law firm website`, `Google Business Profile setup` (local pages), `Los Angeles project` (`/los-angeles`), `Website` (WebsiteGrader `BOOKING_URL` fallback and `src/lib/siteGrader/reportEmail.ts`). The new page also needs `AI Operations Agent`.
Change only the list and prefill mapping:
```ts
const services = [
  ...listedServices.map((s) => s.title),
  "AI Operations Agent",
  "Hire Developers",
  "Quick Bug Fix",
  "Other / Not Sure",
];
const SERVICE_ALIASES: Record<string, string> = {
  "Law firm website": "Websites & Web Apps",
  "Google Business Profile setup": "SEO & GEO",
  "Los Angeles project": "Other / Not Sure",
  "Website": "Websites & Web Apps",
};
// in ContactFormWithParams:
const raw = params.get("service");
const service = raw ? (services.includes(raw) ? raw : SERVICE_ALIASES[raw] ?? "") : "";
```
Keep `key`, `initialMessage` slice(0, 500), and all submit code unchanged.

**P0-5 New pages missing from navigation/internal links (orphans)**
`/la-website`, `/fix`, `/tools/website-grader`, `/tools/app-checker`, and the 3 local pages have no inbound link from the nav, homepage or footer (only sitemap; the local pages link to each other). Fix in P1-1 (footer) and P1-3 (homepage); this item is P0 because the local pages are being launched for SEO and Google needs crawlable internal links. Minimum for P0: footer columns in P1-1.

**P0-6 Hire Developers social metadata** (`src/app/hire-developers/page.tsx`)
`metadata` has no `openGraph`/`twitter`, so the page inherits `og:url = https://amextechnology.com` and the homepage title on shares. Add:
```ts
openGraph: { title: "Hire Developers — React, Next.js, AI & Mobile | Amex Technology", description: <same as description>, url: "https://amextechnology.com/hire-developers" },
twitter: { title: "Hire Developers — React, Next.js, AI & Mobile | Amex Technology", description: <same> },
```
Add `FAQPage` JSON-LD built from `hiringFaqs` (visible on the page) and a `BreadcrumbList` (Home → Hire Developers), same pattern as `src/app/page.tsx`.

### P1: should fix

**P1-1 Footer restyle + new link columns** (`src/components/layout/Footer.tsx`)
The footer is still the old style (gradient "Amex" wordmark, `rounded-2xl` slate newsletter box, gold gradient Subscribe button with white text at 3.25:1, `🎉` emoji, slate colors, `max-w-[92rem]`). Keep the newsletter `handleSubscribe` logic and `/api/subscribe` call exactly as is; change only markup/classes.
- Background `#f7f6f2`, top border `1px solid #dadcd1` (drop gradient line). Container = agency `.wrap` widths.
- Wordmark: reuse the Navbar wordmark (ink "Amex Technology" + small gold-text tagline), no gradient text.
- Newsletter: white `.panel`, input border `#dadcd1` radius 5px, button = `.button` style (`#202a23`, white text). Success text `"You're subscribed."` (no emoji), color `#2f6b45`; error `#b42318`.
- Columns (desktop 5, tablet 2, phone 1): **Company** (Home, Services, Hire Developers, Our Work (`/portfolio`), Insights (`/blog`), About, Contact) · **Services** (existing `services` map) · **Offers & tools** (AI Operations Agent `/ai-operations-agent`; $299 LA Trade Website `/la-website`; 24-Hour App Fix `/fix`; Free Website Grader `/tools/website-grader`; Free App Checker `/tools/app-checker`) · **Los Angeles** (Web & AI Development in LA `/los-angeles`; Law Firm Web Design `/law-firm-web-design-los-angeles`; Affordable Web Design `/affordable-web-design-los-angeles`; Google Business Profile Setup `/google-business-profile-setup-los-angeles`) · **Contact** (email `abhipatel8675@gmail.com` as already used site-wide, hours line from P0-3, "Start a project" link).
- Labels: rename "Portfolio" → "Our Work", "Blog" → "Insights" to match the nav.
- Column headings: 12px, 600, uppercase, `--ink`. Links: 14px, `--muted`, hover `#7a5807`, min-height 32px tap rows.
- Bottom bar unchanged in content (independence disclaimer, socials, 4 legal links); color `--muted`.

**P1-2 Navbar: add the new offer** (`src/components/layout/Navbar.tsx`, `navbar.module.css`)
Insert `["AI for Manufacturers", "/ai-operations-agent"]` as the second item of `links` (after Services). At 951–1100px there is not enough room for 6 links + logo + CTA: in `navbar.module.css` `@media (max-width: 1100px)` set `.links { gap: 18px; }` and if still tight, raise the collapse breakpoint from 950 to 1080 (update both the CSS media query and `if (window.innerWidth > 950)` in `onResize`). Mobile list: also add `["Free Website Grader", "/tools/website-grader"]` next to "Free App Check".
Wordmark tagline `small` is 9px at 4.17:1: make it 10px and `#7a5807`, or hide it below 520px.

**P1-3 Homepage additions** (`src/components/agency/AgencyHome.tsx`)
a) After `<ServiceGrid />` inside the services section, add a full-width feature panel (`.panel` with a 2-col grid, collapses at 800px):
- `.badge`: `New`
- h3 (22px, 500): `AI Operations Agent for small manufacturers`
- p: `Ask your factory anything. An AI assistant connected to the tools you already use (monday.com, Smartsheet, Google Sheets, inFlow, QuickBooks, email) that answers order-status questions, flags late orders and mismatched dates, and keeps your systems in sync.`
- `.textLink` → `/ai-operations-agent`: `See how it works`
- right column: small `.chat` example (same Q/A as section C hero, labelled "Illustrative example").

b) Before `<AgencyFAQ />`, add a section "Ready-to-start offers" (eyebrow `Ready-to-start offers`, heading `Fixed offers.` em `Clear prices.`), 4 cards using `.serviceGrid`/`.service` (grid becomes 2x2 → use inline `style={{gridTemplateColumns:"repeat(4,1fr)"}}` or a new `.offerGrid` class, 2 cols ≤1100, 1 col ≤520):
- `$299 website for LA trade businesses` — `A 5-page site on your own domain with a quote form and Google basics, for plumbers, HVAC, handymen and contractors.` → `/la-website`
- `Fix your app error in 24 hours` — `Stuck on a Supabase, Firebase, Lovable, Next.js or Vercel error? Send it over for a free assessment.` → `/fix`
- `Free Website Grader` — `See your site's score and what's costing you calls, in about 10 seconds.` → `/tools/website-grader`
- `Free App Checker` — `Check a web app for common launch problems before your users find them.` → `/tools/app-checker`

c) Proof row: below the hero `.trust` stack, or as the first line of the quote band, add plain text (not badge images): `Top Rated Plus on Upwork · $80K+ earned on Upwork · 5 years building software`. Link "Upwork" to the agency URL already used in the footer (`https://www.upwork.com/agencies/2067871097204619852/`, `target="_blank" rel="noopener noreferrer"`).

d) Hero art tag `Amex Technology / Est. 2019`: see P1-6.

e) `heroCard` ("Ideas into real products ↗") looks like a link but is not. Remove the `ArrowUpRight` icon from it.

**P1-4 About page: founder story** (`src/components/agency/AgencyAbout.tsx`)
Add a section after "Our approach" (eyebrow `Who you'll work with`, heading `Abhi Patel,` em `founder.`), text:
`Abhi Patel founded Amex Technology and leads every project personally. He lives in Gardena in Los Angeles and works with a development team in India, which keeps projects affordable while giving US clients a contact on Pacific time. Over 5 years he has built websites, web and mobile apps, and AI automations for clients around the world, and is Top Rated Plus on Upwork with more than $80K earned on the platform.`
Links: `.textLink` to the Upwork agency URL ("View our Upwork profile") and `/los-angeles`. No photo unless a real one exists in `public/`.

**P1-5 Services page: surface the new offer** (`src/components/services/ServicesPageContent.tsx`)
Between the `ServiceGrid full` section and `<HirePreview />`, add the same feature panel as P1-3a. Do **not** add the AI agent to `src/data/services.ts`: `ServiceGrid` links every entry to `/services/[slug]`, which 404s without a `servicePages` entry, and the list also drives the footer, contact select and schema.

**P1-6 "Est. 2019" vs. "5 years"**
Visible "Est. 2019" (hero art tag, footer) implies 7 years; the confirmed fact is 5 years of experience. Until the owner confirms the founding year: hero art tag → `Amex Technology / Los Angeles · India`; footer: drop "Est. 2019" (done in P0-3). Leave `foundingDate` in JSON-LD and the about meta unchanged; flag for the owner in the handoff.

**P1-7 Accessibility: type size and contrast** (`agency.module.css`, `navbar.module.css`)
- Minimum 12px for any text; 14px for paragraphs. Change: `.eyebrow` 11px→12px (mobile 9px→11px, keep letter-spacing 0.12em); `.serviceTop span`, `.tags span`, `.article small`, `.workMeta span`, `.roleRow small`, `.heroCard small`, `.artTag`, `.processStep > span`, `.checkList`, `.heroNote` → min 12px (mobile overrides of 8–10px → 11–12px). `.service p`, `.processStep p`, `.model p/li`, `.faq details p`, `.sectionText`, `.workMeta p` 12–13px → 14px (mobile 14px). `.button/.outline` mobile 12px → 14px. `.links a` (nav) 12px → 13px.
- Contrast: `#909487` and `#939687` (2.8:1) → `#6d7266` or `--muted`; `.trust p` `#717568` at 11px (4.37:1) → `--muted`; `.article small` `#87712f`, `.stars` `#a17b30`, `.serviceTop svg` ok (icon); any gold small text → `#7a5807`; `.cta p` `#68644f` on `#e8d8b4` (4.2:1) → `#4f4b3a`.
- Focus: extend the `.site ... :focus-visible` rule to `button, input, select, textarea, [tabindex]`. Add the same outline to `navbar.module.css` `.toggle` and `.cta`.
- Add `@media (prefers-reduced-motion: reduce) { .button:hover { transform:none } .workImage img { transition:none } }` and the same for `ScrollProgress` (render nothing when reduced motion is set, via `useReducedMotion` from framer-motion).

**P1-8 `llms.txt`** (`src/app/llms.txt/route.ts`)
Line 15 says "based in Ahmedabad, India". Change to `"...AI and software agency with a Los Angeles-based founder (Gardena) and a development team in Ahmedabad, India, serving clients worldwide..."`. Add a line in the pages list: `- [AI Operations Agent for manufacturers](${BASE_URL}/ai-operations-agent): AI assistant connected to a small manufacturer's tools (monday.com, Smartsheet, Google Sheets, inFlow, QuickBooks, email) for order status, daily exceptions and system sync. Setup from $3,000, support from $500/month.` Add the 3 local pages and `/hire-developers` if missing.

**P1-9 Sitemap** (`src/app/sitemap.ts`)
Add `{ url: \`${BASE_URL}/ai-operations-agent\`, lastModified: new Date("<implementation date>"), changeFrequency: "monthly", priority: 0.9 }` to `staticPages`. Move the `/hire-developers` entry so the homepage stays first (cosmetic). Local pages and refund/delivery policies are already included.

**P1-10 `/los-angeles` internal links to local pages** (`src/app/los-angeles/page.tsx`)
After "Common projects for local businesses", add a short block (h2 `Los Angeles services`) with `.chips` links to the three local pages and `/la-website`. Labels: `Law firm web design`, `Affordable web design`, `Google Business Profile setup`, `$299 website for trade businesses`.

### P2: nice to have

- **P2-1** `layout.tsx`: `<meta name="theme-color" content="#FFFFFF">` → `#f7f6f2`; `<body className="... bg-white text-slate-700">` → `bg-[#f7f6f2] text-[#1a211d]` so overscroll and pages without `.site` match.
- **P2-2** `layout.tsx`: `<html className="... dark">` enables shadcn `dark:` variants in `ui/badge.tsx` and `ui/button.tsx` on a light site; remove `dark` after checking dashboard/login visually.
- **P2-3** `page.tsx` `reviewSchema`: self-authored Review markup about your own Organization is ignored by Google (self-serving reviews) and can be flagged; remove the `ItemList` JSON-LD (keep the visible testimonial).
- **P2-4** `page.tsx` declares `@id .../#organization` as `LocalBusiness`/`ProfessionalService` while `layout.tsx` declares the same `@id` as `Organization`. Merge: drop `localBusinessSchema` from the homepage or give it a different `@id`.
- **P2-5** JSON-LD `address.addressCountry: "IN"`, `geo.region: IN`, IST hours: owner to confirm the registered business address before switching to Gardena, CA. Not in this session.
- **P2-6** `AgencyHome.tsx` featured projects use `projects.find(...)!` from static data; the portfolio uses Supabase via `src/lib/portfolio/data.ts`. If a slug is renamed in the dashboard the homepage still uses static data, and a missing slug crashes the build. Filter out `undefined` instead of `!`.
- **P2-7** Restyle remaining old-style routes with section D's pattern: `/fix`, `/tools/website-grader`, `/tools/app-checker` (+ `/report`), `/blog`, `/blog/[slug]`, `/services/[slug]`, `/portfolio/[slug]`, legal pages (classes only, never text). These all still use `bg-white`, slate and `rounded-2xl`. Priority among them: `/services/[slug]` and `/fix` (most linked).
- **P2-8** Unused legacy components (`src/components/Hero.tsx`, `Services.tsx`, `Contact.tsx`, `Process.tsx`, `Testimonials.tsx`, `src/components/home/*`) still contain "200+ Apps Delivered", "100+ Clients Served", "respond within 24 hours" copy. Confirm with `grep` they are not imported anywhere, then leave a note; do not delete in this session.
- **P2-9** `/hire-developers`: add `Service` JSON-LD (`serviceType: "Software developer staffing"`, provider `#organization`).

---

## C. New page: `/ai-operations-agent`

File: `src/app/ai-operations-agent/page.tsx` (server component, no client JS needed except the native `<details>` FAQ). Wrap in `<Navbar />`, `<main id="main-content" className={s.site}>`, `<Footer />`. Use `agency.module.css` classes and the new classes from section A.

Hard rules for this page: no client names, no Titoni, no window/door/glass references, no screenshots from a real client's boards, no guaranteed results, prices always "from".

### Metadata

```ts
const url = "https://amextechnology.com/ai-operations-agent";
const title = "AI Operations Agent for Small Manufacturers";
const description =
  "Ask your factory anything. An AI assistant connected to monday.com, Smartsheet, Google Sheets, inFlow, QuickBooks and email: order status, daily exceptions and system sync. Setup from $3,000.";
export const metadata: Metadata = {
  title: { absolute: `${title} | Amex Technology` },
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} | Amex Technology`, description, url, type: "website" },
  twitter: { title: `${title} | Amex Technology`, description },
};
```

### Contact link

```ts
const contactHref = `/contact?service=${encodeURIComponent("AI Operations Agent")}&message=${encodeURIComponent(
  "I'd like to talk about the AI Operations Agent founding-client pilot.\n\nCompany:\nWhat we make:\nNumber of staff:\nTools we use today (monday.com, Smartsheet, Google Sheets, inFlow, QuickBooks, other):\nBiggest order-status headache:"
)}`;
```
(Under 500 characters, so the form keeps it all. Requires P0-4.)

### Sections (in order)

**1. Hero** (`.pageHero` + `.heroGrid`, 2 columns; stacks at 800px)
- Breadcrumb (`.crumbs`): Home / AI Operations Agent
- Eyebrow: `AI Operations Agent · For small manufacturers`
- H1: `Ask your factory anything.` `<br/>` `<em>Get the answer in seconds.</em>`
- Intro: `An AI assistant connected to the tools your shop already runs on (monday.com, Smartsheet, Google Sheets, inventory software like inFlow or QuickBooks, and email). Ask where an order stands and get one answer from every system, without opening five tabs or walking the floor.`
- Actions: `.button` → contactHref: `Apply for a founding-client pilot` (ArrowUpRight); `.outline` → `#how-it-works`: `See how it works` (ArrowRight).
- `.priceNote`: `<strong>Setup from $3,000</strong> · Monthly support from $500`
- Right column: `.chat` card (HTML, not an image):
  - `<small>Illustrative example</small>`
  - `.q`: `Where is order 1042 for Westside Kitchens?`
  - `.a`: `Order 1042 is in finishing. 9 of 12 cabinet boxes are done; 3 are waiting on hinges that are on back order until Thursday. The ship date in your production schedule is the 18th, but the customer was quoted the 15th. Want me to draft an update to the customer?`
  (Fictional order and customer name; keep the "Illustrative example" label visible.)

**2. The problem** (`.section`, `.sectionHead`)
- Eyebrow: `The problem`
- H2: `Your order status lives` `<em>in five places.</em>`
- Text: `The schedule is in one tool, inventory in another, customer promises in email, and the real answer is in someone's head. So the same questions get asked all day, the same data gets typed twice, and a late order is noticed when the customer calls.`
- `.checks` list (lucide `Check`):
  - `"Where's my order?" calls and emails that take 20 minutes to answer`
  - `The same job entered in two or three systems by hand`
  - `Ship dates that don't match between the schedule and what the customer was told`
  - `Missing parts discovered on the day a job should start`

**3. What it does** (`.section`, `id="features"`, `.serviceGrid` with 4 `.service` cards; 2x2 at desktop via inline `gridTemplateColumns: "repeat(2, 1fr)"`, 1 col ≤520)
- Eyebrow: `What it does`
- H2: `One assistant.` `<em>Every system.</em>`
1. Icon `MessageSquare` · `Order status on demand` · `Ask in chat, email or Slack: "Where is order 1042?" The agent checks your schedule, inventory and email and replies with one plain-English answer, with links back to the source.`
2. Icon `ClipboardList` · `Daily exceptions report` · `Every morning, a short list of what needs attention: late orders, missing or back-ordered parts, and dates that don't match between systems. Your team starts the day on problems, not on searching.`
3. Icon `RefreshCw` · `Automatic sync between tools` · `When a job moves in one system, the change is copied to the others, so nobody types the same order twice and the boards stay consistent.`
4. Icon `Send` · `Customer and dealer updates` · `Status updates for customers and dealers, drafted or sent automatically when an order reaches a milestone or a date changes. You decide which messages need a human to approve them.`

**4. Works with your tools** (`.section` with `background:#eeeee4` like services page)
- Eyebrow: `Works with your tools`
- H2: `No new software` `<em>for your team to learn.</em>`
- Text: `The agent connects to the systems you already pay for. These are tools it can connect to, not partnerships or endorsements.`
- `.chips` (spans, not links): `monday.com` · `Smartsheet` · `Google Sheets` · `inFlow Inventory` · `QuickBooks` · `Gmail / Outlook` · `Slack`
- Small note (14px muted): `Using something else? If it has an API or a regular export, it can usually be connected. We confirm this on the first call.`

**5. Who it's for** (`.section`, `.sectionHead` 2-col)
- Eyebrow: `Who it's for`
- H2: `Built for small` `<em>and mid-sized shops.</em>`
- Text: `Manufacturers with roughly 20 to 200 people, made-to-order or short-run work, and an office team that spends too much time chasing status.`
- `.chips`: `Cabinets` · `Millwork` · `Countertops` · `Metal fabrication` · `Signage` · `Furniture` · `Packaging`

**6. How it works** (`.section`, `id="how-it-works"`, `.process` 4 steps; reuse CSS classes directly, not the `Process` component, since its steps are hard-coded)
- Eyebrow: `How it works`
- H2: `From first call` `<em>to a working pilot.</em>`
1. `Discovery call` · `We learn how an order moves through your shop, which tools hold which data, and the questions your team answers most often.`
2. `Map your systems` · `We connect to your tools with read-only access first and map how the same job appears in each one.`
3. `Build and test` · `We set up order-status answers and the daily exceptions report, then test them against your real orders with your team.`
4. `Pilot and improve` · `Your team uses it day to day. We tune answers, add sync and customer updates, and agree on ongoing support.`

**7. Built from real work** (`.section .dark`, `.sectionHead`)
- Eyebrow: `Why us`
- H2: `Built for a real` `<em>production workflow.</em>`
- Text: `This agent was built for a real manufacturer's production workflow, not a demo. Amex Technology is an independent software and AI agency: our founder, Abhi Patel, is based in Los Angeles, our development team is in India, and we are Top Rated Plus on Upwork with $80K+ earned and 5 years of building software for clients.`
- `.checkList` (3 items): `Your data stays in your accounts` · `Read-only access to start` · `You own the setup and documentation`
- `.textLink` (light): `More about us` → `/about`

**8. Pricing and pilot** (`.section`)
- Eyebrow: `Pricing`
- H2: `Simple pricing.` `<em>Agreed before we start.</em>`
- `.priceGrid` with two `.model` cards:
  - `Setup` · `<strong style="font-size:32px">from $3,000</strong>` one-time · bullets: `Discovery and system mapping` / `Connections to your tools` / `Order-status answers and daily exceptions report` / `Testing with your team`
  - `Monthly support` · `<strong>from $500</strong> / month` · bullets: `Monitoring and fixes` / `Changes as your process changes` / `New reports and automations` / `Direct contact with the founder`
- Below, `.panel` with `.badge` `Founding-client pilot`, h3 `Be one of our first manufacturers.`, p: `We are onboarding a small number of founding clients. Pilot clients work directly with the founder and help shape what the agent does next. Scope and price are agreed in writing before any work starts.` + `.button` → contactHref `Apply for the pilot`.
- Fine print (13px muted): `Final price depends on the number of systems and how much custom work is needed. Results depend on the quality of the data in your tools; we don't promise specific savings.`

**9. FAQ** (`.faqGrid` + `.faq` with `<details>`; left column eyebrow `Questions`, heading `Before you` `<em>apply.</em>`)
1. Q `What tools can the AI Operations Agent connect to?` — A `It works with monday.com, Smartsheet, Google Sheets, inventory software like inFlow and QuickBooks, email (Gmail or Outlook) and Slack. Other tools can usually be connected if they have an API or a regular export; we confirm this on the first call.`
2. Q `Do we have to change how we work or move to new software?` — A `No. The agent sits on top of the tools you already use. Your team keeps working in the same boards and sheets, and asks the agent questions in chat, email or Slack.`
3. Q `Is our data safe?` — A `Your data stays in your own accounts. We start with read-only access, connect only the tools needed for the agreed scope, and document every connection. Write access, for syncing or sending updates, is added only when you approve it.`
4. Q `How much does it cost?` — A `Setup starts from $3,000 and monthly support starts from $500. The final price depends on how many systems are connected and how much custom work is needed, and it is agreed in writing before work starts.`
5. Q `What is the founding-client pilot?` — A `We are onboarding a small number of manufacturers as founding clients. You work directly with the founder, the agent is set up around your real orders, and your feedback shapes what it does next. Scope and price are agreed before we begin.`

**10. Closing CTA** (`.cta` band; do not reuse `AgencyCTA` because its copy/link are generic)
- Eyebrow: `Founding-client pilot`
- H2: `Stop chasing order status.` `<br/>` `Start asking.`
- p: `Tell us what you make and which tools you use. We'll reply with next steps and a time for a short call.`
- `.button` → contactHref: `Apply for a founding-client pilot`

### JSON-LD (three `<script type="application/ld+json">` tags)

```ts
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
  audience: { "@type": "BusinessAudience", audienceType: "Small and mid-sized manufacturers (20–200 employees)" },
  offers: [
    { "@type": "Offer", name: "Setup", priceSpecification: { "@type": "PriceSpecification", minPrice: 3000, priceCurrency: "USD" } },
    { "@type": "Offer", name: "Monthly support", priceSpecification: { "@type": "UnitPriceSpecification", minPrice: 500, priceCurrency: "USD", unitText: "MONTH" } },
  ],
};
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
  { "@type": "ListItem", position: 2, name: "AI Operations Agent", item: url } ] };
```
Define `faqs` once as a const array and render both the visible FAQ and the schema from it.

### Where to link it

| Place | File | Change |
| --- | --- | --- |
| Desktop + mobile nav | `src/components/layout/Navbar.tsx` | `"AI for Manufacturers"` after Services (P1-2) |
| Footer | `src/components/layout/Footer.tsx` | First item in "Offers & tools" (P1-1) |
| Homepage | `src/components/agency/AgencyHome.tsx` | Feature panel under the service grid (P1-3a) |
| Services page | `src/components/services/ServicesPageContent.tsx` | Same panel (P1-5) |
| `/services/ai-services` | `src/app/services/[slug]/page.tsx` | Optional: when `slug === "ai-services"`, render one `.textLink` "For manufacturers: AI Operations Agent" above the CTA |
| Sitemap | `src/app/sitemap.ts` | P1-9 |
| llms.txt | `src/app/llms.txt/route.ts` | P1-8 |
| Contact form | `src/components/contact/ContactForm.tsx` | `"AI Operations Agent"` option (P0-4) |

Do **not** add it to `src/data/services.ts` (see P1-5).

---

## D. Restyle: 3 local SEO pages, `/la-website`, `/los-angeles`

Goal: same visual system as `/hire-developers` and `/services`. **Keep every word, heading, URL, metadata, JSON-LD, price, FAQ and the `?site=` prefill exactly as they are.** Change markup classes only (plus the P1-10 links on `/los-angeles`).

### D1. `src/components/local/LocalLandingPage.tsx` (renders all 3 local pages)

Mapping, top to bottom:

| Current | New |
| --- | --- |
| `<div className="bg-white text-slate-900 min-h-screen">` | `<div className={s.site}>` (`import s from "@/components/agency/agency.module.css"`) |
| `<Breadcrumb ... />` outside the hero (adds its own `pt-28`) | Move inside the hero as `.crumbs` `<nav aria-label="Breadcrumb"><ol>` (same 3 items, last item `aria-current="page"`). Either add a `variant="inline"` prop to `src/components/ui/Breadcrumb.tsx` that drops `pt-28 max-w-[92rem] px-6` and uses `.crumbs` styles, or render the list inline. Keep `BreadcrumbList` JSON-LD unchanged. |
| Hero `section.pt-8.pb-12.max-w-5xl` | `<section className={`${s.pageHero} ${s.pageHeroCompact}`}><div className={s.wrap}>` |
| eyebrow `p.text-sm.font-semibold.text-[#7A5807]...` | `<p className={s.eyebrow}>` |
| `h1.text-4xl.md:text-5xl.font-bold` | plain `<h1>` (inherits `.pageHero h1`). No `<em>` added (content unchanged). |
| intro `p.text-slate-700.text-lg` | `<p className={s.intro}>` (allow `max-width: 640px` via inline style; these intros are longer) |
| `cta` gold-gradient Link | `<Link className={s.button} href={contactHref}>{page.ctaLabel} <ArrowUpRight size={17} /></Link>` inside `<div className={s.actions}>` |
| `priceNote` span | `<span className={s.priceNote}>` |
| "included" section with `rounded-2xl bg-slate-50` cards | `<section className={s.section}><div className={s.wrap}>` + `<h2 className={s.heading}>{page.includedTitle}</h2>` + `<div className={s.serviceGrid}>` with each item as `<article className={s.service}><div className={s.serviceTop}><span>0{i+1}</span></div><h3>{title}</h3><p>{body}</p></article>` |
| problems `ul` with gold `Check` | `<ul className={s.checks}>` (Check icon inherits `#7a5807`), on `background:#eeeee4` section; Website Grader sentence below as `<p className={s.sectionText}>` with the link styled `.textLink`-colored (`#7a5807`, underline on hover) |
| steps `ol` cards "Step N" | `<ol className={s.process}>` with `<li className={s.processStep}><span>0{i+1} /</span><h3>…</h3><p>…</p></li>` (the grid is 4 columns; with 3–4 steps set inline `gridTemplateColumns: \`repeat(${page.steps.length}, 1fr)\`` above 800px, the CSS already collapses below) |
| FAQ cards (`h3` + `p`, always open) | `.faqGrid` left column: eyebrow `Questions` + `<h2 className={s.heading}>Questions</h2>`; right column `.faq` with `<details><summary>{q}</summary><p>{a}</p></details>`. Same text; FAQPage JSON-LD unchanged. |
| `#111827` dark CTA panel | `<section className={s.cta}><div className={`${s.wrap} ${s.ctaInner}`}>` with existing heading "Ready to get started?", paragraph, and `.button` CTA |
| "Related" pills | `<section className={s.section}>` (padding-top 0) with eyebrow `Related` and `.chips` of `Link`s |

### D2. `src/app/la-website/page.tsx`

Same mapping as D1, plus:
- Breadcrumb "Home / LA Trade Websites" inline in the hero as `.crumbs`.
- Hero: eyebrow, `<h1>`, intro (keep the bold `$299 one-time.` as `<strong>`), `CTA` component → `.button`; "We reply within a few hours" line → `.heroNote`-style (12px, muted, `Clock` icon).
- "Free: check your current website" box → `<section className={s.section}>` + `.panel` containing the existing h2 (`className={s.heading}` at a smaller size: inline `fontSize: "clamp(26px,3vw,36px)"`), text and `<WebsiteGrader initialUrl={initialUrl} />` untouched. Do not restyle inside `WebsiteGrader` in this session; verify it is readable on `#fff` (it is designed for white).
- "Sound familiar?" red `✕` list → `.checks` with lucide `X` icon colored `#9b3b2b` (keeps the "problem" meaning, 6:1 on paper), on `#eeeee4` band.
- "Everything included for $299" 3-col icon cards → `.serviceGrid` / `.service` with the existing lucide icon in `.serviceTop` (icon `#92712f` is decorative, OK).
- Steps → `.process` (3 steps).
- FAQ → `.faqGrid` / `.faq` details. FAQPage JSON-LD unchanged.
- Final CTA → `.cta` band with the existing heading/text and `.button`.
- Keep `PRICE`, `contactHref` and both JSON-LD blocks byte-identical.

### D3. `src/app/los-angeles/page.tsx`

Same mapping, sections in current order:
- Hero (eyebrow "Los Angeles · South Bay", h1, intro, "Get a free quote" → `.button`; keep `href` but it now resolves via P0-4 alias).
- "How we work with LA businesses" (4 reason cards) → `.serviceGrid` / `.service`.
- "What we do" service links → `.serviceGrid` with each card as a `Link` wrapping `.service` (title as `h3`, `shortDesc` as `p`, `Explore service` `.textLink`).
- "Common projects for local businesses" → `.checks` on `#eeeee4` band; App Checker and portfolio links styled as gold-text links.
- New block from P1-10 (`Los Angeles services` + `.chips` links).
- "Areas we serve" → `.chips` (spans).
- "Questions" → `.faqGrid` / `.faq`; then add `<AgencyCTA />`-style `.cta` band using the page's existing CTA text if one exists, otherwise reuse the hero CTA label.
- JSON-LD and metadata unchanged.

### D4. Shared checks for D1–D3
- Only one `h1` per page; h2 → h3 order kept.
- No `bg-white`, `slate-*`, `rounded-2xl`, `#B8860B` gradient left in these files (`grep` to confirm).
- `<main id="main-content">` kept (skip link target).

---

## E. QA checklist

**Build**
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes; `/ai-operations-agent` and the 3 local pages are listed as static
- [ ] `npm run lint` shows no new errors in touched files
- [ ] `git status` shows no changes under `src/app/api/`, `src/app/dashboard/`, `src/lib/razorpay.ts`, `.env*`, `src/app/success/`

**Routes** (check each at 375, 768 and 1440 px; no horizontal scroll, no clipped headings, no overlapping images)
- [ ] `/` · `/services` · `/services/ai-services` · `/hire-developers` · `/portfolio` · `/portfolio/molar-ai` · `/about` · `/contact` · `/blog` · one `/blog/[slug]`
- [ ] `/ai-operations-agent` (new)
- [ ] `/la-website` and `/la-website?site=example.com` (grader prefilled)
- [ ] `/los-angeles` · `/law-firm-web-design-los-angeles` · `/affordable-web-design-los-angeles` · `/google-business-profile-setup-los-angeles`
- [ ] `/fix` · `/tools/website-grader` · `/tools/app-checker`
- [ ] `/privacy` · `/terms` · `/refund-policy` · `/delivery-policy` (text unchanged)
- [ ] `/sitemap.xml` includes `/ai-operations-agent`, `/hire-developers`, 3 local pages, refund/delivery policies
- [ ] `/llms.txt` shows the new lines and no "based in Ahmedabad" as the only location
- [ ] `/opengraph-image` renders without "200+"

**Honesty sweep**
- [ ] `grep -rni "200+\|100+\|within 4 hours\|Titoni\|windows and doors\|window and door\|glass" src/app src/components/agency src/components/layout src/components/local src/data/localPages.ts` returns nothing user-facing (the dashboard and legacy unused components excluded)
- [ ] "Based in India" no longer appears alone; LA founder + India team wording is consistent on home, about, contact, footer, FAQ
- [ ] All prices on `/ai-operations-agent` say "from"; the chat example is labelled "Illustrative example"

**Navigation**
- [ ] Desktop nav at 1440 and 1024: 6 links + logo + CTA on one line, no wrapping; "AI for Manufacturers" shows `aria-current` on its page
- [ ] At the collapse width and at 375: menu opens, first link focused, Tab cycles inside, Escape closes and returns focus to the toggle, body scroll locked and released, menu closes on link click and on resize past the breakpoint
- [ ] Skip link appears on first Tab and jumps to `#main-content` on every route above
- [ ] Footer: every link in Company, Services, Offers & tools, Los Angeles returns 200

**Forms** (do not submit real inquiries, subscriptions or payments)
- [ ] `/contact?service=AI%20Operations%20Agent&message=...` (the exact `contactHref` from C): select shows "AI Operations Agent", message prefilled
- [ ] `/contact?service=Law%20firm%20website` → "Websites & Web Apps"; `Google%20Business%20Profile%20setup` → "SEO & GEO"; `Los%20Angeles%20project` → "Other / Not Sure"; `Website` → "Websites & Web Apps"
- [ ] Hire Developers role links still preselect "Hire Developers" with message
- [ ] Empty required name/email/service blocks submit and focuses the field; no success state shown
- [ ] Footer newsletter: empty/invalid email blocked by native validation; button shows "Subscribing…" state (do not complete a real subscription)
- [ ] Website Grader on `/la-website` still runs (use a public test domain)

**Accessibility**
- [ ] No text under 12px (DevTools computed styles on eyebrow, tags, nav tagline, card labels at 375)
- [ ] Contrast spot-checks: muted labels ≥4.5:1, buttons ≥4.5:1, CTA band paragraph ≥4.5:1
- [ ] Visible focus ring on links, summary, buttons, inputs, selects
- [ ] FAQ `<details>` open/close with Enter/Space; visible text matches FAQPage JSON-LD on `/`, `/hire-developers`, `/ai-operations-agent`, local pages, `/la-website`, `/los-angeles`
- [ ] With `prefers-reduced-motion: reduce`, no hover translate and no scroll progress animation

**SEO**
- [ ] View source on `/ai-operations-agent`: one `<title>` "AI Operations Agent for Small Manufacturers | Amex Technology", meta description, canonical, og:url = page URL, 3 JSON-LD blocks that parse (paste into validator.schema.org)
- [ ] `/hire-developers` og:url is its own URL; FAQPage + BreadcrumbList present
- [ ] Local pages: title, canonical, Service + FAQPage + BreadcrumbList unchanged from before the restyle (diff the rendered `<head>`)

**Handoff**
- [ ] Screenshots at 375 and 1440 for `/`, `/ai-operations-agent`, `/la-website`, one local page, saved to `docs/previews/`
- [ ] Note open owner decisions: founding year (2019 vs. "5 years"), registered address for JSON-LD, whether to keep `abhipatel8675@gmail.com` as the public contact email
- [ ] No deploy, push or commit unless the owner asks
