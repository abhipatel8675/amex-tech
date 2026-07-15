# Changes Log — Amex Technology Website

_Work completed on 2026-07-14. Baseline: commit `c34ec14` (after the last merged PR)._

This document summarizes everything changed in this working session, grouped by area.

---

## 1. UI / UX Fixes

| Area | Change |
|------|--------|
| Hero heading | Fixed the clipped "g" descender on the gradient headline; switched to a fluid `clamp()` size so it scales smoothly and never overflows on mobile/tablet. |
| Hero tagline | Increased size (`text-xl` → `sm:text-2xl`) for better hierarchy. |
| Hero tech row | Replaced the auto-scrolling marquee with a static wrapping row of tech badges (removed unwanted motion). |
| Mobile header | Fixed the empty gap above the header on mobile (announcement offset now `top-0 md:top-8` since the bar is desktop-only). |
| Announcement bar | Made the background opaque so page content no longer bleeds through its transparent center. |
| Services section | Removed the 4-second auto-advance that reflowed the section and made the page scroll up/down on its own. Selection is now user-driven. |
| Custom cursor | Removed the `backdrop-blur` hover state that blurred/obscured content; hover ring is now a clean outline. |
| Breadcrumb | Increased top padding (`pt-28 md:pt-32`) so it clears the fixed header instead of sitting flush against it. |
| Portfolio (Herruby) | Fixed phone mockups spreading to opposite edges (`mx-auto` was fighting flex centering). |

## 2. Branding

- Added a reusable **LogoMark** ("A" monogram) used in the navbar, mobile menu, and footer.
- Generated a real **`/public/images/logo.png`** (512×512) — fixes the 404 the Organization schema pointed at.
- Upgraded the **favicon** (`icon.tsx`) and added an **apple-icon**; added **192×192 / 512×512 PWA icons** to the web manifest.

## 3. Newsletter (now functional)

- Added **`/api/subscribe`** (posts to Web3Forms, same service as the contact form).
- Wired the footer signup form with email validation and loading / success / error states.

## 4. New Portfolio Projects (8 added)

| Project | Category | Live |
|---------|----------|------|
| HourSheets | SaaS | hoursheets.org |
| Buttercream Bus | Web | thebuttercreambus.shop |
| East End Vintage Sale | Web | @eastendvintagesale |
| Ultra Windows | Web | ultrawindows.co.uk |
| Wolfe Property Portal | Web | portal.wolfeproperty.co.nz |
| EmiGo | Mobile App | — |
| Cyber7 MDR Alerts | Mobile App | — |
| Dialogix | AI | mydialogix.com |

Each has a full problem → solution → results case study. Ultra Windows, Buttercream Bus, Wolfe, HourSheets, and Dialogix include real UI screenshots; EmiGo and Cyber7 currently use their app-icon branding (UI screenshots pending).

## 5. SEO Overhaul

Applied the project's `seo-expert` and `blog-writer` skills after a full page-by-page audit.

### Pages & technical
- **Services:** removed a policy-risk fake `aggregateRating` (5.0 / 100 reviews with no visible reviews).
- **Home:** fixed double-brand `<title>`; trimmed over-length meta description.
- **About:** added `AboutPage` + `Organization` schema; trimmed description.
- **Contact:** added `ContactPage` + `ContactPoint` and `FAQPage` schema; trimmed description.
- **Portfolio:** added `CollectionPage` / `ItemList` schema; made the project count dynamic (was a stale "7"); keyword-bearing H1.
- **Project detail:** added `CreativeWork` schema, keywords, OG `type=article`, descriptive hero alt, and `noindex` on not-found.
- **Technical:** added HSTS header; removed `/_next/` from `robots` disallow; removed orphan `public/site.webmanifest`; unified the contact email across layout / privacy / terms / footer to the working address.

### Blog
- Extended the `BlogPost` model with `metaTitle`, `metaDescription`, `keywords`, `author`, `updatedAt`, and a structured `faq` field.
- Enriched all posts with optimized meta titles (<60 chars) and descriptions (<160), keywords, author, and 5 structured FAQs each.
- Post pages now emit **BlogPosting + FAQPage + BreadcrumbList** JSON-LD; index page emits **Blog + ItemList**.
- Added an internal link to **`/services`** in every post (each post now links to services + portfolio + contact).

## 6. New Blog Posts (2 added)

- **How to Connect GitHub With Lovable** (`/blog/how-to-connect-github-with-lovable`) — Tutorial.
- **How to Connect a Custom Domain to Lovable** (`/blog/how-to-connect-custom-domain-with-lovable`) — DevOps.

Both follow the full SEO structure (short meta title, meta description, keywords, FAQ + schema, CTA) and cross-link into the existing Lovable / DNS content cluster.

---

## Commit History (this session)

```
0853c32  Blog SEO: add internal links to /services in every post
1ac41d0  SEO: page audit fixes + blog schema/metadata overhaul
9133133  Add Dialogix (AI sales automation) to portfolio
1b3fcf5  Add four projects: Ultra Windows, Wolfe, EmiGo, Cyber7
28f327f  Add East End Vintage Sale case study
fa39321  Add Buttercream Bus case study
90e28db  Add HourSheets project
d661197  Increase hero tagline size
5265dd2  Stop ServicesPreview auto-advancing
74a8a83  Fluid hero heading, static tech list, working newsletter, spacing
3af12a6  Fix mobile/UI issues, add brand logo mark & favicon
```
_(The two Lovable blog posts and this CHANGES.md are in the next commit.)_

---

## Open Items (need input)

- **Fiverr profile** (`fiverr.com/abhipatel956`) — captcha-blocked to bots; paste gigs/portfolio or share screenshots to add those projects.
- **EmiGo / Cyber7 screenshots** — no UI screenshots ship in those repos; add real ones to `public/images/portfolio/emigo/` and `.../cyber7/` to enrich their galleries.
- **Branded email** — currently using the working Gmail everywhere. Once a branded address (e.g. via Cloudflare Email Routing or Zoho free) exists, it can be switched site-wide in one commit.
