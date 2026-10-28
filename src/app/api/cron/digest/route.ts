import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { leadsDb, LEAD_SOURCE_LABEL, type Lead } from "@/lib/leads";
import { loadOutreachSnapshot } from "@/lib/outreach";

export const runtime = "nodejs";
export const maxDuration = 60;

// Morning email (Vercel Cron, see vercel.json): new leads, calls and follow-ups
// due today, and how outreach is doing. Vercel sends CRON_SECRET as a bearer token.

const OPEN = ["new", "contacted", "replied", "call", "quoted"];
const EMAILED = ["contacted", "followed_up", "done", "replied", "optout", "bounced"];
const pacificDay = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
const who = (l: Lead) => `${l.company || l.name || l.email}${l.email && (l.company || l.name) ? ` <${l.email}>` : ""}${l.phone ? ` · ${l.phone}` : ""}`;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = leadsDb();
  const user = process.env.ZOHO_USER;
  const pass = process.env.ZOHO_APP_PASSWORD;
  if (!db || !user || !pass) return NextResponse.json({ error: "Supabase or email is not configured" }, { status: 503 });

  const now = new Date();
  const today = pacificDay(now);
  const since = new Date(now.getTime() - 86400000).toISOString();
  const { data, error } = await db.from("leads").select("*").order("created_at", { ascending: false }).limit(2000);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const leads = (data as Lead[]) ?? [];

  const fresh = leads.filter((l) => l.created_at >= since);
  const calls = leads.filter((l) => l.status === "call" && l.next_follow_up === today);
  const due = leads.filter((l) => OPEN.includes(l.status) && l.status !== "call" && l.next_follow_up && l.next_follow_up <= today);
  const quoted = leads.filter((l) => l.status === "quoted").reduce((n, l) => n + Number(l.quote_amount ?? 0), 0);

  const snap = await loadOutreachSnapshot(db);
  const outreach: string[] = [];
  if (snap) {
    const emailed = snap.contacts.filter((c) => EMAILED.includes(c.status));
    const n = (s: string) => snap.contacts.filter((c) => c.status === s).length;
    const yesterday = pacificDay(new Date(now.getTime() - 86400000));
    const sentYesterday = snap.contacts.filter((c) => c.last_sent_at && pacificDay(new Date(c.last_sent_at)) === yesterday).length;
    const rate = (x: number) => (emailed.length ? `${Math.round((x / emailed.length) * 1000) / 10}%` : "0%");
    outreach.push(
      `Sending is ${snap.enabled ? "ON" : "PAUSED"}. Sent yesterday: ${sentYesterday}. Waiting to send: ${n("new")}.`,
      `All time: ${emailed.length} emailed · ${n("replied")} replied (${rate(n("replied"))}) · ${n("bounced")} bounced (${rate(n("bounced"))}) · ${n("optout")} opted out.`,
    );
    if (emailed.length >= 20 && n("bounced") / emailed.length > 0.02) outreach.push("Warning: bounce rate is above 2%, which risks the sending domain.");
  }

  const section = (heading: string, rows: string[], empty: string) => [`== ${heading} ==`, ...(rows.length ? rows : [empty]), ""];
  const text = [
    `Good morning. Here's your lead pipeline for ${today}.`,
    "",
    ...section(`CALLS TODAY (${calls.length})`, calls.map((l) => `  - ${who(l)}${l.notes ? `\n    ${l.notes.split("\n").at(-1)}` : ""}`), "  No calls booked today."),
    ...section(`FOLLOW UP TODAY (${due.length})`, due.map((l) => `  - [${l.status}] ${who(l)}${l.next_follow_up! < today ? ` (overdue since ${l.next_follow_up})` : ""}`), "  Nothing due."),
    ...section(
      `NEW LEADS IN THE LAST 24 HOURS (${fresh.length})`,
      fresh.map((l) => `  - ${LEAD_SOURCE_LABEL[l.source] ?? l.source}: ${who(l)}${l.message ? `\n    ${l.message.replace(/\s+/g, " ").slice(0, 160)}` : ""}`),
      "  None yesterday.",
    ),
    ...section("OUTREACH", outreach.map((l) => `  ${l}`), "  No outreach data yet."),
    `Open quotes: $${quoted.toLocaleString("en-US")}`,
    "",
    "Dashboard: https://amextechnology.com/dashboard/dev",
  ].join("\n");

  const transport = nodemailer.createTransport({ host: "smtppro.zoho.in", port: 465, secure: true, auth: { user, pass } });
  await transport.sendMail({
    from: { name: "Lead pipeline", address: user },
    to: user,
    subject: `[DIGEST] ${calls.length} calls · ${due.length} follow-ups · ${fresh.length} new leads`,
    text,
  });
  return NextResponse.json({ ok: true, calls: calls.length, due: due.length, fresh: fresh.length });
}
