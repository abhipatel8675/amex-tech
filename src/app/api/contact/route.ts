import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "034118ee-2ebc-45db-813d-1d54e5dff988",
        subject: `New inquiry from ${name} — ${service}`,
        from_name: name,
        replyto: email,
        name,
        email,
        service,
        message,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      console.error("Web3Forms error:", data);
      return NextResponse.json({ error: data.message || "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
