import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? process.env.DEVELOPER_EMAIL;

    if (process.env.RESEND_API_KEY && CONTACT_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: CONTACT_EMAIL,
        subject: `New inquiry from ${name} — ${service}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#6366F1">New Project Inquiry</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#666;width:120px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#666">Service</td><td style="padding:8px 0">${service}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
            <h3 style="color:#333">Message</h3>
            <p style="color:#555;white-space:pre-line">${message}</p>
          </div>
        `,
      });
    } else {
      console.log("New contact inquiry:", { name, email, service, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
