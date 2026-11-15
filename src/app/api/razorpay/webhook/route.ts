import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { leadsDb, type Lead } from "@/lib/leads";
import { verifyWebhookSignature, type LeadPayment } from "@/lib/razorpay";

export const runtime = "nodejs";

// Razorpay webhook (payment_link.paid / .cancelled / .expired). On paid: the
// lead becomes Won, the payment is saved in meta.payments and you get an alert.
// Razorpay retries on non-2xx, so a repeat delivery must be harmless.

type LinkEntity = { id: string; status: string; amount_paid?: number; currency: string; notes?: { lead_id?: string } };
type PaymentEntity = { id: string; method?: string; email?: string };

export async function POST(req: Request) {
  const raw = await req.text();
  if (!verifyWebhookSignature(raw, req.headers.get("x-razorpay-signature"))) {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  const event = JSON.parse(raw);
  const status = ({ "payment_link.paid": "paid", "payment_link.cancelled": "cancelled", "payment_link.expired": "expired" } as const)[
    event.event as string
  ];
  if (!status) return NextResponse.json({ ignored: event.event });

  const link: LinkEntity | undefined = event.payload?.payment_link?.entity;
  const payment: PaymentEntity | undefined = event.payload?.payment?.entity;
  const leadId = link?.notes?.lead_id;
  const db = leadsDb();
  if (!link || !leadId || !db) return NextResponse.json({ ignored: "no lead" });

  const { data: lead, error } = await db.from("leads").select("*").eq("id", leadId).single<Lead>();
  if (error || !lead) return NextResponse.json({ ignored: "lead not found" });

  const payments = (Array.isArray(lead.meta?.payments) ? lead.meta.payments : []) as LeadPayment[];
  const entry = payments.find((p) => p.link_id === link.id);
  if (!entry) return NextResponse.json({ ignored: "unknown link" });
  if (entry.status === status) return NextResponse.json({ ok: true, duplicate: true });

  entry.status = status;
  const update: Partial<Lead> = { meta: { ...lead.meta, payments } };
  if (status === "paid") {
    entry.paid_at = new Date().toISOString();
    entry.payment_id = payment?.id;
    entry.method = payment?.method;
    const paidTotal = payments.filter((p) => p.status === "paid" && p.currency === entry.currency).reduce((n, p) => n + p.amount, 0);
    update.status = "won";
    update.quote_amount = Math.max(Number(lead.quote_amount ?? 0), paidTotal);
    const stamp = `${entry.paid_at.slice(0, 10)}: paid ${entry.currency} ${entry.amount} via Razorpay (${payment?.id ?? link.id})`;
    update.notes = lead.notes ? `${lead.notes}\n${stamp}` : stamp;
  }

  const { error: saveError } = await db.from("leads").update(update).eq("id", leadId);
  if (saveError) return NextResponse.json({ error: saveError.message }, { status: 500 });

  if (status === "paid") await alert(lead, entry, payment?.email).catch((e) => console.error("razorpay alert:", e));
  return NextResponse.json({ ok: true });
}

async function alert(lead: Lead, p: LeadPayment, payerEmail?: string) {
  const user = process.env.ZOHO_USER;
  const pass = process.env.ZOHO_APP_PASSWORD;
  if (!user || !pass) return;
  const who = lead.company || lead.name || lead.email || "A client";
  const transport = nodemailer.createTransport({ host: "smtppro.zoho.in", port: 465, secure: true, auth: { user, pass } });
  await transport.sendMail({
    from: { name: "Lead pipeline", address: user },
    to: user,
    subject: `[PAID] ${who} paid ${p.currency} ${p.amount}`,
    text: [
      `${who} paid ${p.currency} ${p.amount} for "${p.description}".`,
      "",
      `Payment: ${p.payment_id ?? "?"}${p.method ? ` (${p.method})` : ""}`,
      `Payer email: ${payerEmail || lead.email || "?"}`,
      "The lead is now marked Won: https://amextechnology.com/dashboard/dev/leads",
    ].join("\n"),
  });
}
