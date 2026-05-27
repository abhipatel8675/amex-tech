import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { name, price, description, service } = await req.json();

    if (!name || !price) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(price * 100),
      currency: "INR",
      notes: { service, package: name, description },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
  }
}
