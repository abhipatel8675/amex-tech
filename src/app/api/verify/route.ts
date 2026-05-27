import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, service, packageName, price, clientEmail } =
      await req.json();

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase.from("orders").insert({
      client_email: clientEmail,
      service,
      package_name: packageName,
      price,
      status: "pending",
      stripe_session_id: razorpay_payment_id,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
