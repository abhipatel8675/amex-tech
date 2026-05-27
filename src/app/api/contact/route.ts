import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, service, budget, message } = await req.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: Add Resend email sending here when you set up RESEND_API_KEY
    // Example:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "noreply@amextechnology.com",
    //   to: "abhipatel8675@gmail.com",
    //   subject: `New inquiry from ${name} — ${service}`,
    //   html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Service:</b> ${service}</p><p><b>Budget:</b> ${budget}</p><p><b>Message:</b> ${message}</p>`,
    // });

    console.log("New inquiry:", { name, email, service, budget, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
