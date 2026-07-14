import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service for Amex Technology. By using our website and services you agree to these terms governing acceptable use, accounts, liability, and more.",
  alternates: {
    canonical: "https://amextechnology.com/terms",
  },
  openGraph: {
    title: "Terms of Service | Amex Technology",
    description:
      "Read the Terms of Service for Amex Technology — acceptable use, accounts, liability, and governing law.",
    url: "https://amextechnology.com/terms",
  },
};

const LAST_UPDATED = "July 11, 2026";
const CONTACT_EMAIL = "abhipatel8675@gmail.com";

export default function TermsPage() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />

      {/* Hero */}
      <section className="pt-8 pb-10 max-w-3xl mx-auto px-6">
        <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-5">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-base leading-7">
          Last updated: <span className="text-slate-300">{LAST_UPDATED}</span>
        </p>
      </section>

      {/* Content */}
      <article className="pb-28 max-w-3xl mx-auto px-6">
        <div className="border-t border-white/[0.06] pt-10 flex flex-col gap-12">

          {/* 1 — Acceptance */}
          <Section id="acceptance" title="1. Acceptance of Terms">
            <p>
              By accessing or using{" "}
              <a href="https://amextechnology.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                amextechnology.com
              </a>{" "}
              (the &ldquo;Site&rdquo;) or any services offered by Amex Technology (&ldquo;we,&rdquo;
              &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you (&ldquo;you&rdquo; or &ldquo;User&rdquo;) agree to
              be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to all of these
              Terms, do not use the Site or our services.
            </p>
            <p>
              These Terms apply to all visitors, registered users, and clients who access or use the Site.
              They are in addition to any separate written agreement or proposal we may have with you as a client.
            </p>
          </Section>

          {/* 2 — Description of Service */}
          <Section id="description" title="2. Description of Service">
            <p>
              Amex Technology is a software development agency based in India that provides custom software
              development services including, but not limited to, website development, web application
              development, mobile app development, SaaS platform development, API development, DevOps,
              UI/UX design, and maintenance and support.
            </p>
            <p>
              The Site serves as a marketing and client portal. It includes:
            </p>
            <ul>
              <li>Information about our services, portfolio, and team.</li>
              <li>A contact and project inquiry form.</li>
              <li>A client dashboard accessible to registered users for project updates and communications.</li>
              <li>A blog with technical articles and engineering guides.</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the Site or services at any
              time, with or without notice.
            </p>
          </Section>

          {/* 3 — User Accounts */}
          <Section id="accounts" title="3. User Accounts">
            <p>
              Certain areas of the Site, specifically the client dashboard (/dashboard), require you to create
              an account. By registering for an account:
            </p>
            <ul>
              <li>
                You agree to provide accurate, current, and complete registration information and to keep it
                updated.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account.
              </li>
              <li>
                You agree to notify us immediately at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                if you suspect any unauthorised access to or use of your account.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that are found to be in violation of
                these Terms, without prior notice.
              </li>
              <li>
                You may not transfer, sell, or otherwise assign your account to any third party without our
                prior written consent.
              </li>
            </ul>
          </Section>

          {/* 4 — Acceptable Use */}
          <Section id="acceptable-use" title="4. Acceptable Use Policy">
            <p>
              You agree to use the Site and our services only for lawful purposes and in a manner that does
              not infringe the rights of others. You must not:
            </p>
            <ul>
              <li>
                Use the Site to transmit any unlawful, defamatory, abusive, threatening, obscene, or otherwise
                objectionable content.
              </li>
              <li>
                Attempt to gain unauthorised access to any part of the Site, our servers, or any system or
                network connected to our services.
              </li>
              <li>
                Introduce viruses, malware, or any other harmful code or technology into the Site.
              </li>
              <li>
                Scrape, crawl, or systematically extract data from the Site without our prior written consent.
              </li>
              <li>
                Use our services to engage in any activity that violates applicable laws or regulations,
                including data protection and privacy laws.
              </li>
              <li>
                Impersonate any person or entity, or misrepresent your affiliation with any person or entity.
              </li>
              <li>
                Use automated tools (bots, scripts, crawlers) to interact with the Site in a way that
                places excessive load on our infrastructure.
              </li>
            </ul>
            <p>
              We reserve the right to investigate and take appropriate legal action against anyone who, in our
              sole discretion, violates these provisions, including suspending or terminating their access to
              the Site.
            </p>
          </Section>

          {/* 5 — Intellectual Property */}
          <Section id="ip" title="5. Intellectual Property">
            <p>
              All content on the Site — including text, graphics, logos, images, code, and other materials —
              is owned by or licensed to Amex Technology and is protected by applicable copyright, trademark,
              and other intellectual property laws.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable licence to access and use the Site
              for personal, non-commercial informational purposes only. This licence does not include the right
              to:
            </p>
            <ul>
              <li>Copy, reproduce, or distribute any content from the Site without our written permission.</li>
              <li>Modify, reverse-engineer, or create derivative works of the Site or its content.</li>
              <li>Remove or alter any proprietary notices, labels, or marks on the Site.</li>
            </ul>
            <p>
              Work product and deliverables created as part of a client engagement are governed by the terms
              of your individual project agreement or proposal, which takes precedence over these Terms with
              respect to intellectual property ownership.
            </p>
          </Section>

          {/* 6 — Disclaimer */}
          <Section id="disclaimer" title="6. Disclaimer of Warranties">
            <p>
              The Site and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
              basis, without warranties of any kind, either express or implied. To the fullest extent permitted
              by applicable law, we disclaim all warranties, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p>
              We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other
              harmful components. We do not warrant the accuracy, completeness, or usefulness of any
              information on the Site.
            </p>
          </Section>

          {/* 7 — Limitation of Liability */}
          <Section id="liability" title="7. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, Amex Technology and its directors, employees,
              agents, and affiliates shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages — including but not limited to loss of profits, data, goodwill, or business
              interruption — arising out of or in connection with your use of, or inability to use, the Site
              or our services, even if we have been advised of the possibility of such damages.
            </p>
            <p>
              Our total aggregate liability to you for any claim arising out of or relating to these Terms or
              your use of the Site shall not exceed the greater of (a) the amount you paid us in the three
              months preceding the claim, or (b) INR 5,000.
            </p>
            <p>
              Some jurisdictions do not allow the exclusion of certain warranties or the limitation of
              liability for consequential or incidental damages, so the above limitations may not apply to you
              in full.
            </p>
          </Section>

          {/* 8 — Third-Party Links */}
          <Section id="third-party-links" title="8. Third-Party Links">
            <p>
              The Site may contain links to third-party websites or services that are not owned or controlled
              by Amex Technology. We have no control over, and assume no responsibility for, the content,
              privacy policies, or practices of any third-party websites. We encourage you to review the
              terms and privacy policies of any third-party site you visit.
            </p>
          </Section>

          {/* 9 — Governing Law */}
          <Section id="governing-law" title="9. Governing Law and Dispute Resolution">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of
              India, without regard to its conflict of law provisions. The courts located in India shall have
              exclusive jurisdiction over any dispute arising from or relating to these Terms or your use of
              the Site.
            </p>
            <p>
              Before initiating any formal legal proceedings, you agree to first contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              and attempt to resolve the dispute informally. We will make reasonable efforts to resolve any
              issue within 30 days of receiving notice.
            </p>
          </Section>

          {/* 10 — Changes */}
          <Section id="changes" title="10. Changes to These Terms">
            <p>
              We reserve the right to update or modify these Terms at any time at our sole discretion. The
              &ldquo;Last updated&rdquo; date at the top of this page will reflect the most recent revision.
              Your continued use of the Site after any changes are posted constitutes your acceptance of the
              revised Terms. We encourage you to review these Terms periodically.
            </p>
            <p>
              For material changes, we will make reasonable efforts to provide advance notice — for example,
              by emailing registered users or displaying a prominent notice on the Site.
            </p>
          </Section>

          {/* 11 — Contact */}
          <Section id="contact" title="11. Contact Us">
            <p>
              If you have any questions about these Terms of Service, please contact us:
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

          {/* Related links */}
          <div className="pt-4 border-t border-white/[0.06]">
            <p className="text-sm text-slate-500">
              Also see our{" "}
              <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

        </div>
      </article>

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
      <div className="flex flex-col gap-4 text-base leading-8 text-slate-400 [&_strong]:text-slate-300 [&_a]:underline-offset-2 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:marker:text-indigo-500">
        {children}
      </div>
    </section>
  );
}
