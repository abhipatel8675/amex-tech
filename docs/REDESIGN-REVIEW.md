# Amex Technology redesign review

Implemented in `/Users/abhipatel/Desktop/amex-tech` on branch `codex/amex-website-refresh`.

## Delivered

- Rebuilt homepage with an ivory, forest-black, and gold visual identity and custom hero artwork.
- Redesigned services, portfolio overview, about, and contact pages.
- Added `/hire-developers`, six skill areas, engagement options, hiring-specific onboarding steps, and FAQs.
- Added developer hiring to navigation, footer, and sitemap.
- Connected hiring links to the existing contact form through validated service and message prefill.
- Replaced the contact form's inaccessible custom service list with a native required select; retained email delivery, lead capture, and analytics behavior.
- Built responsive navigation with Escape dismissal, focus recovery, focus containment, and scroll-lock cleanup.
- Added valid skip-to-content targets on existing marketing routes.
- Matched homepage FAQ structured data to visible questions and removed contact-page FAQ markup whose questions were no longer displayed.
- Bundled Inter locally with its license, removing the build-time Google Fonts request.
- Preserved unrelated pre-existing lead-board, payment, legal, poster, footer, and sitemap work. Footer and sitemap changes for this redesign are additive to those existing edits.

## Verification

| Check | Result |
| --- | --- |
| Production build | Passed; 101 static pages generated, with existing dynamic routes retained |
| TypeScript | Passed |
| Git whitespace check | Passed |
| Local homepage HTTP response | 200 |
| Homepage responsive checks | 320, 375, 390, 768, 1024, and 1440 CSS pixels; no horizontal document overflow |
| Phone visual review | Homepage, services, portfolio, about, contact, and hiring journey inspected |
| Mobile navigation | Open/close, Escape dismissal, focus recovery, scroll-lock cleanup, and close after page navigation verified |
| Hiring inquiry | React/Next.js inquiry selected Hire Developers and populated editable project details |
| Form validation | Empty required name blocked submission and received focus; no success state shown |
| Portfolio filtering | AI filter reduced 22 projects to the two matching case studies |
| FAQ | Expansion displayed the matching answer |
| Homepage imagery | Custom hero and both featured project images loaded |
| Browser logs | No application errors observed; expected local Vercel Speed Insights script-unavailable notices |

Actual external inquiry delivery, newsletter subscriptions, database writes, calendar bookings, and payments were not exercised. The existing delivery paths were preserved. Lighthouse scores were not measured; no performance score is claimed.

## Review artifacts

- `docs/previews/home-desktop.png`
- `docs/previews/home-mobile.png`
- `docs/AMEX-OVERNIGHT-REDESIGN-PROMPT.md`
- `public/images/agency/hero-sculpture.webp` — 37 KB, generated with the built-in image-generation tool. The final generation prompt and art direction are recorded in the reusable prompt file.

## Run locally

```sh
cd /Users/abhipatel/Desktop/amex-tech
npm run dev -- --port 3100
```

Open http://localhost:3100. For the already built production version, use `npm run start -- --port 3100` instead. The temporary QA server was stopped after verification.

Deployment status: local changes only. No production deployment, remote push, or public site replacement was performed.
