import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await saveLead({ source: "contact_section", name, email, service, message });

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "6f0ed673-ac8c-4571-b8a1-e02c9fa3773e",
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
