import type { Metadata } from "next";
import { LegalPage, Section, ContactBlock, LEGAL_EMAIL } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "How cancellations and refunds work for Amex Technology website, app and software development services.",
  alternates: { canonical: "https://amextechnology.com/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund & Cancellation Policy" updated="October 30, 2026">
      <Section id="scope" title="1. Scope">
        <p>
          Amex Technology sells custom digital services: website design and development, web and mobile apps,
          automation, SEO and maintenance. We do not sell physical goods. This policy covers every payment made to us,
          including payments made through our payment links (processed by Razorpay).
        </p>
      </Section>

      <Section id="cancellation" title="2. Cancelling a Project">
        <ul>
          <li>You can cancel a project at any time by emailing <a href={`mailto:${LEGAL_EMAIL}`} className="text-[#7A5807]">{LEGAL_EMAIL}</a>.</li>
          <li><strong>Before work starts:</strong> we cancel the project and refund 100% of what you paid.</li>
          <li><strong>After work starts:</strong> you pay only for the work completed up to the cancellation date. We refund any amount paid for work we have not started.</li>
          <li>Fixed-price projects (for example, a small business website) count as started once we send you the first draft or design.</li>
        </ul>
      </Section>

      <Section id="refunds" title="3. Refunds">
        <ul>
          <li>Ask for a refund within <strong>7 days</strong> of payment if work has not started, and we refund it in full.</li>
          <li>If we cannot deliver what we agreed in the proposal or quote, we refund the part of the price for the work not delivered.</li>
          <li>Payments for completed and approved milestones are not refundable.</li>
          <li>Third-party costs paid on your behalf (domains, hosting, paid plugins, app store fees) are not refundable once purchased.</li>
        </ul>
      </Section>

      <Section id="subscriptions" title="4. Monthly Plans">
        <p>
          Monthly plans (maintenance, SEO, hosting support) can be cancelled at any time. Cancellation stops the next
          charge. The current month is not refunded, and the service continues until the end of the paid period.
        </p>
      </Section>

      <Section id="processing" title="5. How Refunds Are Paid">
        <p>
          Approved refunds are paid back to the original payment method within <strong>5–7 business days</strong>.
          Your bank or card issuer may take longer to show the credit. For international card payments, the amount you
          receive can differ slightly because of currency conversion by your bank.
        </p>
      </Section>

      <Section id="contact" title="6. Contact">
        <p>For cancellations, refunds or any payment question, contact us. We reply within 1 business day.</p>
        <ContactBlock />
      </Section>
    </LegalPage>
  );
}
