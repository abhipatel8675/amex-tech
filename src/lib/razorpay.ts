import { createHmac, timingSafeEqual } from "node:crypto";

// Razorpay Payment Links over plain REST (no SDK). Keys: RAZORPAY_KEY_ID and
// RAZORPAY_KEY_SECRET (rzp_test_… in test mode). Webhooks are signed with
// RAZORPAY_WEBHOOK_SECRET, which you choose when adding the webhook in Razorpay.

export const PAYMENT_CURRENCIES = ["USD", "INR"] as const;
export type PaymentCurrency = (typeof PAYMENT_CURRENCIES)[number];

// Stored on the lead in meta.payments so no table change is needed.
export type LeadPayment = {
  link_id: string;
  short_url: string;
  amount: number; // major units, e.g. 299
  currency: PaymentCurrency;
  description: string;
  status: "created" | "paid" | "cancelled" | "expired";
  created_at: string;
  paid_at?: string;
  payment_id?: string;
  method?: string;
};

export function razorpayConfigured() {
  return !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

type CreateLinkInput = {
  leadId: string;
  amount: number;
  currency: PaymentCurrency;
  description: string;
  customer: { name?: string | null; email?: string | null; phone?: string | null };
};

export async function createPaymentLink(input: CreateLinkInput) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error("Razorpay keys are not set");

  const customer: Record<string, string> = {};
  if (input.customer.name) customer.name = input.customer.name.slice(0, 100);
  if (input.customer.email) customer.email = input.customer.email;
  // Razorpay rejects badly formatted numbers, so only send ones that look like E.164.
  const phone = input.customer.phone?.replace(/[^\d+]/g, "");
  if (phone && /^\+?\d{10,15}$/.test(phone)) customer.contact = phone;

  const res = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(input.amount * 100),
      currency: input.currency,
      accept_partial: false,
      description: input.description.slice(0, 2048),
      customer,
      // You send the link yourself, so Razorpay doesn't email or text the client.
      notify: { sms: false, email: false },
      reminder_enable: false,
      reference_id: `${input.leadId.slice(0, 8)}-${Date.now()}`,
      notes: { lead_id: input.leadId },
      callback_url: "https://amextechnology.com/success",
      callback_method: "get",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.description || `Razorpay error ${res.status}`);
  return { id: data.id as string, short_url: data.short_url as string };
}

export function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
