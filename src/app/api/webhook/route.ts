export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Webhook signature failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { service, package: pkg } = session.metadata || {};
    const clientEmail = session.customer_details?.email || "";
    const amount = (session.amount_total || 0) / 100;

    await supabase.from("orders").insert({
      client_email: clientEmail,
      service,
      package_name: pkg,
      price: amount,
      status: "pending",
      stripe_session_id: session.id,
    });
  }

  return NextResponse.json({ received: true });
}
