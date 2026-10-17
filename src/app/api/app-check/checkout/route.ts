import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { normalizeUrl, BlockedUrlError } from "@/lib/appChecker/safeFetch";
import { APP_CHECKER } from "@/data/appChecker";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Payments not enabled" }, { status: 503 });
  }

  let url: URL;
  try {
    const body = await req.json();
    url = normalizeUrl(typeof body.url === "string" ? body.url : "");
  } catch (err) {
    const message = err instanceof BlockedUrlError ? err.message : "Enter your app's address.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = req.nextUrl.origin;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: APP_CHECKER.priceCents,
          product_data: {
            name: APP_CHECKER.productName,
            description: `Full security, SEO and speed report for ${url.hostname}`,
          },
        },
      },
    ],
    // Matches the metadata the existing /api/webhook stores in the orders table.
    metadata: { service: APP_CHECKER.productName, package: "Full report", url: url.toString() },
    success_url: `${origin}/tools/app-checker/report?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/tools/app-checker?url=${encodeURIComponent(url.toString())}`,
  });

  return NextResponse.json({ url: session.url });
}
