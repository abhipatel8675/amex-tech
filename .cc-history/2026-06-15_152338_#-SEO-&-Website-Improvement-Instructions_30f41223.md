# Claude Code Session

| Field | Value |
|---|---|
| **Project** | `-Users-heetpatel-Amex-Technology-amex-tech` |
| **Session ID** | `30f41223-d13e-4898-b3a0-604cf2386f12` |
| **Working Dir** | `/Users/heetpatel/Amex Technology/amex-tech` |
| **Started** | 15/06/2026, 15:23:38 |
| **Last Updated** | 15/06/2026, 15:24:39 |
| **Messages** | 4 |

---

## User <sup>15/06/2026, 15:23:38</sup>

# SEO & Website Improvement Instructions — amextechnology.com

You are working on a Next.js (App Router) website for a software development agency at amextechnology.com. The site has multiple pages: Home, Services, Portfolio, Blog, About, Contact, individual blog post pages, and individual portfolio case study pages. Your job is to audit the codebase and implement every instruction below. Work through each section completely before moving to the next.

---

## SECTION 1 — CRITICAL: Fix the Canonical URL

The site currently has og:url and canonical tags pointing to the old Vercel preview URL (amex-tech.vercel.app) instead of the real domain. This is the single most damaging SEO issue on the site.

Find wherever metadataBase or canonical URLs are defined in the codebase. Update the metadataBase to https://amextechnology.com. Update every og:url reference to use the real domain. Set a unique canonical URL on every page that matches that page's actual URL path. On dynamic pages like blog posts and portfolio items, generate the canonical URL dynamically using the page's slug so each page gets its own correct canonical.

---

## SECTION 2 — Generate a Sitemap

Create a dynamic sitemap file that Next.js serves at /sitemap.xml. The sitemap must include every static page: home, services, portfolio index, blog index, about, contact, privacy, and terms. It must also include every blog post URL and every portfolio case study URL, generated dynamically by reading from whatever data source the site uses (MDX files, CMS, local JSON, or a database). Assign priority values: home gets 1.0, services and portfolio get 0.9, blog and contact get 0.8, about gets 0.7, individual blog posts get 0.7, individual portfolio pages get 0.8. Set appropriate changeFrequency values based on how often each page type changes. Include a lastModified date on all pages. After creating this, verify it renders correctly by checking the output.

---

## SECTION 3 — Fix robots.txt

Create or update the robots.txt file served at /robots.txt. Allow all pages to be crawled. Disallow /api/ and /_next/ routes. Include the sitemap URL pointing to https://amextechnology.com/sitemap.xml. Make sure there is no accidental Disallow: / that would block all crawling.

---

## SECTION 4 — Fix All Per-Page Meta Titles and Descriptions

Every page currently has identical og:title, og:description, and twitter:title tags. Replace them with unique values per page.

For the home page: title should be "Amex Technology — Software Development Agency" and description should clearly state what the agency does, mention key services like web apps, mobile apps, and SaaS platforms, and reference 5+ years of experience and 200+ projects.

For the services page: title should include "Software Development Services" and the description should describe the range of services offered.

For the portfolio page: title should reference case studies and the agency name, description should mention the types of projects built.

For the blog page: title should include "Engineering Blog" and the agency name, description should describe the type of content published.

For the about page: title should mention the founding year 2019 and agency name, description should speak to the team's mission and experience.

For the contact page: title should encourage starting a project, description should mention the free quote and response time.

For each blog post: the title must be the article title followed by a dash and the site name. The description must be derived from the article's opening paragraph or a dedicated excerpt field, trimmed to under 160 characters.

For each portfolio case study: the title must be the project name followed by "Case Study" and the site name. The description must summarize the project and its outcome.

Also update og:title, og:description, og:url, twitter:title, and twitter:description on every page to match these unique values.

---

## SECTION 5 — Add OG Images

Create a default OG image for the site that renders at 1200x630 pixels. It should show the agency name, tagline, and a dark professional background. Use Next.js built-in image generation via the opengraph-image file convention so it is automatically served.

Create a dynamic OG image for blog posts that renders the article title and the site name at 1200x630 pixels.

Create a dynamic OG image for portfolio pages that renders the project name and the site name.

After creating these, update the metadata on each page type to reference the correct OG image URL.

---

## SECTION 6 — Add JSON-LD Structured Data

Add an Organization schema to the global layout so it appears on every page. It must include the organization name, website URL, logo URL, founding date of 2019, contact email, available hours Monday through Saturday 9am to 8pm IST, and social profile links for LinkedIn, GitHub, and Twitter.

Add a WebSite schema to the home page that includes the site name and URL.

Add a ProfessionalService schema to the services page listing all eight services offered: Website Development, Web Application Development, Mobile App Development, SaaS Development, API Development and Integration, DevOps and Deployment, UI/UX Design, and Maintenance and Support. Include an aggregate rating of 5.0 based on 100 reviews.

Add an Article schema to every blog post page. It must include the article headline, description, published date, modified date, author set to the organization, publisher with logo, and the canonical URL as the mainEntityOfPage.

Add a BreadcrumbList schema to every inner page. The breadcrumb must reflect the actual page hierarchy. For example a blog post breadcrumb would be Home, then Blog, then the post title. A portfolio page breadcrumb would be Home, then Portfolio, then the project name. A services page breadcrumb would be just Home and then Services.

Add a FAQPage schema to the home page with the following questions and their answers: how much does custom software development cost, how long does it take to build a web application, do you work with clients outside India, what technologies do you specialize in, do you offer maintenance after launch, and can you work with an existing codebase. Write professional, accurate answers for each based on the site content.

Add a Review schema to the home page pulling the six existing testimonials from Sarah Mitchell, James Okonkwo, Priya Sharma, Marcus Chen, Emma Larsson, and David Osei. Each review must include the reviewer name, star rating of 5, and a short excerpt of their testimonial text.

---

## SECTION 7 — Fix the Head Section and Missing Tags

Add a lang attribute of "en" to the root HTML element if it is not already there.

Add a theme-color meta tag with the site's primary dark background color.

Add an author meta tag with value "Amex Technology."

Add geo tags: geo.region set to IN, geo.placename set to India.

Verify that favicon.ico, apple-touch-icon.png, and an SVG icon are all present in the public folder and linked correctly from the head.

Create a site.webmanifest file in the public folder. It must include the full site name, short name, description, start URL of slash, display mode of standalone, background and theme colors, and icon paths for 192x192 and 512x512 PNG icons. Generate or source those icon files if they do not already exist.

---

## SECTION 8 — Fix Image SEO Issues

Audit every image on the site. Replace any generic alt text with descriptive, context-rich alt text that describes what is shown and optionally references the project or service it relates to. No image should have an empty alt attribute unless it is a purely decorative element. No image should have alt text that just says "screenshot" or uses only the file name.

Make sure every image uses the Next.js Image component. Set explicit width and height on all images. Add the priority prop to images that appear above the fold, specifically the hero image and the first portfolio card. Add lazy loading to all below-fold images. Convert any PNG images that are large in file size to WebP format.

---

## SECTION 9 — Fix Internal Linking

On every blog post page, add a "Related Services" section near the bottom. It should contain links to two or three relevant service sections on the services page using anchor links. Match the blog topic to the relevant service. For example a Next.js article links to the web development section, a CI/CD article links to the DevOps section.

On every portfolio case study page, add a section showing the technologies used. Each technology should link to its corresponding service section on the services page.

On the services page, add a "Read our guide" link beneath each service card pointing to the most relevant blog post.

On the blog index page, add a "Related Services" banner or card section at the bottom.

On every blog post, add a "Related Articles" section at the bottom showing three other blog post cards.

Add a visible link from the homepage hero area to the blog page, in addition to the existing portfolio link.

---

## SECTION 10 — Add Breadcrumb Navigation UI

Add a visual breadcrumb component that appears below the top navigation on every inner page. It must show the full path hierarchy using the same structure as the BreadcrumbList JSON-LD schema. Style it to be subtle, small, and gray. Make each intermediate crumb a clickable link. The current page should not be a link. Separate items with a right-facing chevron or slash.

---

## SECTION 11 — Add FAQ Section to Homepage

Add a new FAQ section to the homepage, placed above the footer. Use an accordion or expand/collapse pattern so each question expands to show the answer. Include the six questions defined in Section 6. Make sure the HTML uses proper semantic markup with question text in heading tags and answer text in paragraph tags so the FAQ JSON-LD schema matches the visible content.

---

## SECTION 12 — Improve Blog Post Pages

On every blog post page, add the following elements if they do not already exist.

Add a published date displayed prominently near the title. If the post has been updated, also show a "Last updated" date.

Add an author byline below the title that says "By the Amex Technology Team."

Add a reading time estimate near the title, calculated from the word count of the article body.

Add a table of contents component that auto-generates from all H2 and H3 headings in the article. Make it sticky on desktop so it stays visible while scrolling. On mobile it can collapse.

Add social share buttons for Twitter/X, LinkedIn, and a copy-link button.

Add a "Related Articles" section at the very bottom showing three other blog post cards with thumbnail, title, category, and read time.

Add a prominent call-to-action section at the bottom of every blog post, styled differently from the rest of the article. It should say something like "Need help building this?" and link to the contact page.

---

## SECTION 13 — Improve Portfolio Case Study Pages

Each portfolio item must be a full dedicated page. If any portfolio item currently shows only a card or modal, convert it to a standalone page with its own unique URL.

Each case study page must include a project overview of at least 150 words, a problem statement section, a solution section describing the approach taken, a list of key features built, measurable outcomes or results if available, a tech stack section with technology badges, screenshots or mockups of the product, a link to the live project, and a call-to-action at the bottom encouraging visitors to build something similar, linking to the contact page.

---

## SECTION 14 — Improve the Contact Page

Add a full contact form with the following fields: full name, email address, a project type dropdown with options including Web App, Mobile App, SaaS Platform, Website, API/Integration, and Other, a budget range dropdown with ranges from under five thousand to over fifty thousand dollars, and a message textarea.

Add proper name, id, aria-label, and autocomplete attributes to every form field.

After successful submission, show an inline success message and send an automated email acknowledgment to the user.

Add a short FAQ block below the form answering the question "What happens after I submit?" with a step-by-step description of the response process.

Add a WhatsApp link or Calendly embed for visitors who prefer to book directly.

---

## SECTION 15 — Add Security and Performance Headers

In the Next.js config file, add HTTP security headers to all routes. Include X-Content-Type-Options set to nosniff, X-Frame-Options set to DENY, X-XSS-Protection set to 1 mode block, Referrer-Policy set to strict-origin-when-cross-origin, and Permissions-Policy restricting camera, microphone, and geolocation.

Add a long-duration cache control header for all assets in the images folder.

Enable compression in the Next.js config.

---

## SECTION 16 — Fix Accessibility Issues

Add aria-current set to "page" to the active link in the navigation bar.

Add aria-label attributes to any icon-only buttons, including the mobile menu toggle and any social icon links.

Make sure the mobile navigation menu uses aria-expanded on its toggle button, and the menu panel uses role="dialog" or role="navigation" with an aria-label.

Add visible focus rings to all interactive elements. Do not use outline: none without a replacement focus indicator.

Use semantic HTML throughout: nav for navigation, main for the main content area, article for blog posts, section with aria-label for major page sections, footer for the footer.

Verify that all text on dark backgrounds meets WCAG AA contrast ratio of 4.5 to 1 minimum. Adjust colors where they fail.

---

## SECTION 17 — Add Social Links to the Footer

Add icon links in the footer for LinkedIn, GitHub, and Twitter/X. Make sure each link opens in a new tab, has rel="noopener noreferrer", and has an aria-label describing the destination. Source the actual social profile URLs from the site owner or use placeholder URLs that can be updated.

Add a line in the footer that says "Based in India · Serving clients globally" to support local SEO signals.

---

## SECTION 18 — Google Search Console Verification

Add a meta tag in the site's head for Google Search Console verification. Leave the content value as a placeholder comment clearly labeled so the site owner can paste in their verification code. Do not hardcode a fake verification string.

---

## SECTION 19 — Final Checks

After implementing all sections above, do the following verification steps.

Run a build to confirm there are no TypeScript or build errors.

Check that /sitemap.xml renders a valid XML document with all expected URLs.

Check that /robots.txt renders correctly and includes the sitemap URL.

Check that the home page, a blog post page, and a portfolio page each have unique title, description, og:title, og:description, og:url, and og:image values that are all different from each other.

Check that all JSON-LD scripts are valid by reviewing the raw HTML output and ensuring no syntax errors exist.

Check that no image is missing an alt attribute.

Check that the canonical URL on every page matches the page's actual URL and uses the amextechnology.com domain, not amex-tech.vercel.app.

Report a summary of everything that was implemented and flag anything that required a placeholder or needs manual input from the site owner such as social profile URLs, Google verification code, or icon assets.


---

## Assistant <sup>15/06/2026, 15:23:41</sup>

Please run /login · API Error: 401 Invalid authentication credentials


---

## User <sup>15/06/2026, 15:24:39</sup>

<command-name>/login</command-name>
            <command-message>login</command-message>
            <command-args></command-args>


---

## User <sup>15/06/2026, 15:24:39</sup>

<local-command-stdout>Login successful</local-command-stdout>


---
