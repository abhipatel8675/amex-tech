import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "034118ee-2ebc-45db-813d-1d54e5dff988",
        subject: `New newsletter subscriber — ${email}`,
        from_name: "Amex Technology Newsletter",
        replyto: email,
        email,
        message: `New newsletter subscription request from ${email}`,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      console.error("Web3Forms newsletter error:", data);
      return NextResponse.json({ error: data.message || "Failed to subscribe. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
