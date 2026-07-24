import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Amex Technology collects, uses, and protects your personal information. We are committed to handling your data with transparency and care.",
  alternates: {
    canonical: "https://amextechnology.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Amex Technology",
    description:
      "Learn how Amex Technology collects, uses, and protects your personal information.",
    url: "https://amextechnology.com/privacy",
  },
};

const LAST_UPDATED = "July 11, 2026";
const CONTACT_EMAIL = "abhipatel8675@gmail.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://amextechnology.com/privacy" },
  ],
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

        {/* Hero */}
        <section className="pt-8 pb-10 max-w-[92rem] mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-5">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-base leading-7">
            Last updated: <span className="text-slate-300">{LAST_UPDATED}</span>
          </p>
        </section>

        {/* Content */}
        <article className="pb-28 max-w-[92rem] mx-auto px-6">
          <div className="border-t border-white/[0.06] pt-10 flex flex-col gap-12">

            {/* 1 — Introduction */}
            <Section id="introduction" title="1. Introduction">
              <p>
                Amex Technology (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates{" "}
                <a href="https://amextechnology.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  amextechnology.com
                </a>{" "}
                (the &ldquo;Site&rdquo;). This Privacy Policy explains what information we collect, how we use it, who
                we share it with, and what choices you have.
              </p>
              <p>
                By using the Site you agree to the collection and use of information in accordance with this policy.
                If you do not agree, please do not use the Site.
              </p>
            </Section>

            {/* 2 — Data collected */}
            <Section id="data-collected" title="2. Information We Collect">
              <Subsection title="2.1 Information you provide directly">
                <ul>
                  <li>
                    <strong>Contact form submissions</strong> — When you fill out our contact or project inquiry
                    form, we collect your name, email address, company name, project description, and any other
                    details you include in the message.
                  </li>
                  <li>
                    <strong>Account information</strong> — If you create an account via our client dashboard
                    (/login, /dashboard), we collect your email address and a hashed password managed through
                    Supabase Auth. You may also provide additional profile details voluntarily.
                  </li>
                  <li>
                    <strong>Payment information</strong> — If you make a payment through our Site, payment data
                    is processed directly by Stripe. We do not store your full card number, CVV, or other
                    sensitive payment credentials on our servers.
                  </li>
                </ul>
              </Subsection>

              <Subsection title="2.2 Information collected automatically">
                <ul>
                  <li>
                    <strong>Usage and analytics data</strong> — We use Google Analytics to collect information
                    about how visitors interact with the Site, including pages visited, time spent, referral
                    source, browser type, device type, and approximate geographic location (country/city level).
                    This data is anonymised and aggregated.
                  </li>
                  <li>
                    <strong>Log data</strong> — Our hosting infrastructure (Vercel) and CDN (Cloudflare)
                    automatically record standard server logs, including IP addresses, request timestamps, HTTP
                    status codes, and referring URLs. These logs are retained for security and debugging
                    purposes.
                  </li>
                  <li>
                    <strong>Cookies</strong> — See Section 4 below for full details.
                  </li>
                </ul>
              </Subsection>
            </Section>

            {/* 3 — How we use data */}
            <Section id="how-we-use" title="3. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to project inquiries and contact form submissions.</li>
                <li>Provide, maintain, and improve the Site and our services.</li>
                <li>Authenticate users and manage client dashboard access.</li>
                <li>Process payments and send transactional confirmations.</li>
                <li>Analyse site usage to understand what content is most valuable and to improve user experience.</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
                <li>Comply with applicable laws and legal obligations.</li>
              </ul>
              <p>
                We do not sell, rent, or trade your personal information to third parties for their own marketing
                purposes.
              </p>
            </Section>

            {/* 4 — Cookies */}
            <Section id="cookies" title="4. Cookies and Tracking Technologies">
              <p>
                The Site uses cookies and similar technologies. A cookie is a small text file placed on your device
                by a website you visit.
              </p>

              <Subsection title="4.1 Types of cookies we use">
                <ul>
                  <li>
                    <strong>Strictly necessary cookies</strong> — Required for the Site to function (e.g.,
                    authentication session tokens for the client dashboard). These cannot be disabled.
                  </li>
                  <li>
                    <strong>Analytics cookies</strong> — Set by Google Analytics to collect anonymised usage
                    statistics (e.g., <code>_ga</code>, <code>_gid</code>). These help us understand how visitors
                    interact with the Site.
                  </li>
                  <li>
                    <strong>Performance and security cookies</strong> — Set by Cloudflare for DDoS protection,
                    bot detection, and performance optimisation (e.g., <code>__cf_bm</code>,
                    <code>cf_clearance</code>).
                  </li>
                </ul>
              </Subsection>

              <Subsection title="4.2 Managing cookies">
                <p>
                  You can control or delete cookies through your browser settings. Disabling analytics cookies will
                  not affect your ability to use the Site, but disabling strictly necessary cookies may prevent
                  login functionality from working correctly. You can also opt out of Google Analytics tracking via
                  the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </p>
              </Subsection>
            </Section>

            {/* 5 — Third parties */}
            <Section id="third-parties" title="5. Third-Party Services">
              <p>
                We use the following third-party services that may process your data. Each is governed by its own
                privacy policy.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="text-left py-3 pr-6 text-slate-400 font-semibold">Service</th>
                      <th className="text-left py-3 pr-6 text-slate-400 font-semibold">Purpose</th>
                      <th className="text-left py-3 text-slate-400 font-semibold">Policy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {[
                      {
                        name: "Google Analytics",
                        purpose: "Website usage analytics",
                        url: "https://policies.google.com/privacy",
                        label: "Google Privacy Policy",
                      },
                      {
                        name: "Vercel",
                        purpose: "Site hosting & deployment",
                        url: "https://vercel.com/legal/privacy-policy",
                        label: "Vercel Privacy Policy",
                      },
                      {
                        name: "Cloudflare",
                        purpose: "CDN, DDoS protection & DNS",
                        url: "https://www.cloudflare.com/privacypolicy/",
                        label: "Cloudflare Privacy Policy",
                      },
                      {
                        name: "Supabase",
                        purpose: "Authentication & database",
                        url: "https://supabase.com/privacy",
                        label: "Supabase Privacy Policy",
                      },
                      {
                        name: "Stripe",
                        purpose: "Payment processing",
                        url: "https://stripe.com/privacy",
                        label: "Stripe Privacy Policy",
                      },
                      {
                        name: "Resend",
                        purpose: "Transactional email delivery",
                        url: "https://resend.com/legal/privacy-policy",
                        label: "Resend Privacy Policy",
                      },
                    ].map((row) => (
                      <tr key={row.name}>
                        <td className="py-3 pr-6 text-slate-300 font-medium">{row.name}</td>
                        <td className="py-3 pr-6 text-slate-400">{row.purpose}</td>
                        <td className="py-3">
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                          >
                            {row.label}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* 6 — Retention */}
            <Section id="retention" title="6. Data Retention">
              <p>
                We retain personal data only for as long as necessary to fulfil the purposes described in this
                policy:
              </p>
              <ul>
                <li>
                  <strong>Contact form submissions</strong> — Retained for up to 3 years for business and
                  correspondence records, then deleted.
                </li>
                <li>
                  <strong>Account data</strong> — Retained for the lifetime of your account. If you request
                  deletion, we will remove your account and associated data within 30 days.
                </li>
                <li>
                  <strong>Analytics data</strong> — Retained in Google Analytics for 14 months per our GA4
                  data retention settings.
                </li>
                <li>
                  <strong>Server logs</strong> — Retained by Vercel and Cloudflare per their own retention
                  policies (typically 30–90 days).
                </li>
              </ul>
            </Section>

            {/* 7 — User rights */}
            <Section id="your-rights" title="7. Your Rights">
              <p>
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul>
                <li>
                  <strong>Access</strong> — Request a copy of the personal data we hold about you.
                </li>
                <li>
                  <strong>Correction</strong> — Ask us to correct inaccurate or incomplete data.
                </li>
                <li>
                  <strong>Deletion</strong> — Request that we delete your personal data. We will comply within
                  30 days, subject to any legal obligations to retain it.
                </li>
                <li>
                  <strong>Restriction</strong> — Ask us to restrict processing of your data in certain
                  circumstances.
                </li>
                <li>
                  <strong>Objection</strong> — Object to processing based on legitimate interests.
                </li>
                <li>
                  <strong>Portability</strong> — Request your data in a machine-readable format.
                </li>
              </ul>
              <p>
                To exercise any of these rights, email us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                with the subject line &ldquo;Privacy Request.&rdquo; We will respond within 30 days.
              </p>
            </Section>

            {/* 8 — Children */}
            <Section id="children" title="8. Children's Privacy">
              <p>
                The Site is not directed at children under the age of 13. We do not knowingly collect personal
                information from children. If you believe we have inadvertently collected such information, please
                contact us and we will delete it promptly.
              </p>
            </Section>

            {/* 9 — Changes */}
            <Section id="changes" title="9. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top
                of this page reflects the most recent revision. Continued use of the Site after changes are posted
                constitutes your acceptance of the updated policy. For material changes, we will make reasonable
                efforts to notify users directly (e.g., via email or a notice on the Site).
              </p>
            </Section>

            {/* 10 — Contact */}
            <Section id="contact" title="10. Contact Us">
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please
                contact us:
              </p>
              <div className="mt-4 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] text-sm leading-7 text-slate-300">
                <p className="font-semibold text-white mb-1">Amex Technology</p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p>Website: amextechnology.com</p>
                <p>Country: India</p>
              </div>
            </Section>

          </div>
        </article>

      </main>
      <Footer />
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex flex-col gap-4 scroll-mt-24">
      <h2 className="text-xl font-bold text-white" style={{ letterSpacing: "-0.015em" }}>
        {title}
      </h2>
      <div className="flex flex-col gap-4 text-base leading-8 text-slate-400 [&_strong]:text-slate-300 [&_a]:underline-offset-2 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:marker:text-indigo-500 [&_code]:text-indigo-300 [&_code]:bg-indigo-500/[0.08] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm">
        {children}
      </div>
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-semibold text-slate-300">{title}</h3>
      {children}
    </div>
  );
}
