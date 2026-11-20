import type { Metadata } from "next";
import { LegalPage, Section, ContactBlock } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Service Delivery Policy",
  description:
    "How Amex Technology delivers website, app and software work online: delivery methods, typical timelines, how delays are handled and email confirmations.",
  alternates: { canonical: "https://amextechnology.com/delivery-policy" },
};

export default function DeliveryPolicyPage() {
  return (
    <LegalPage title="Service Delivery Policy" updated="October 30, 2026">
      <Section id="digital" title="1. Digital Services Only">
        <p>
          Amex Technology provides digital services. Nothing is physically shipped. All work is delivered online, so
          there are no shipping charges.
        </p>
      </Section>

      <Section id="how" title="2. How Work Is Delivered">
        <ul>
          <li><strong>Websites:</strong> published live on your domain or hosting, with login details sent by email.</li>
          <li><strong>Apps and software:</strong> delivered through a shared code repository (such as GitHub), a deployed link, or app store submission, as agreed in the proposal.</li>
          <li><strong>Design, SEO and reports:</strong> sent by email or a shared link.</li>
        </ul>
      </Section>

      <Section id="when" title="3. Delivery Timelines">
        <ul>
          <li>Work starts within 1–2 business days after payment and once we have the content we need from you.</li>
          <li>A small business website usually goes live in about 5 business days.</li>
          <li>Custom projects follow the timeline in your proposal or quote.</li>
          <li>You get an email confirmation when your payment is received and again when the work is delivered.</li>
        </ul>
      </Section>

      <Section id="delays" title="4. Delays">
        <p>
          Timelines can move if content, approvals or access are delayed on the client side. If a delay is on our side,
          we tell you the new date by email. If we cannot deliver at all, our{" "}
          <a href="/refund-policy" className="text-[#7A5807]">Refund &amp; Cancellation Policy</a> applies.
        </p>
      </Section>

      <Section id="contact" title="5. Contact">
        <ContactBlock />
      </Section>
    </LegalPage>
  );
}
