import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { scanApp } from "@/lib/appChecker/scan";
import { BlockedUrlError } from "@/lib/appChecker/safeFetch";
import { reportEmailText, leadAlertText, LEAD_SUBJECT_PREFIX } from "@/lib/appChecker/reportEmail";
import { saveLead } from "@/lib/leads";

export const runtime = "nodejs";
export const maxDuration = 60;

// Best-effort per-instance limit, like /api/app-check.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_IP = 5;
const hits = new Map<string, number[]>();
function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > MAX_PER_IP;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  const user = process.env.ZOHO_USER;
  const pass = process.env.ZOHO_APP_PASSWORD;
  if (!user || !pass) return NextResponse.json({ error: "Email reports aren't available right now." }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let url = "";
  let email = "";
  let name = "";
  let consent = false;
  try {
    const body = await req.json();
    url = typeof body.url === "string" ? body.url : "";
    email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : "";
    name = typeof body.name === "string" ? body.name.trim().replace(/[\r\n<>]/g, "").slice(0, 80) : "";
    consent = body.consent === true;
  } catch {}
  if (!url) return NextResponse.json({ error: "Run a check first." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!consent) return NextResponse.json({ error: "Please tick the box so we can email you the report." }, { status: 400 });

  // Re-run the scan on the server so the emailed report can't be tampered with.
  let result;
  try {
    result = await scanApp(url);
  } catch (err) {
    const message = err instanceof BlockedUrlError ? err.message : "We couldn't re-check that site. Please try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  await saveLead({
    source: "app_checker",
    name,
    email,
    website: result.finalUrl,
    message: `App Checker score ${result.score}/100`,
    meta: { score: result.score },
  });

  const transport = nodemailer.createTransport({ host: "smtppro.zoho.in", port: 465, secure: true, auth: { user, pass } });
  const host = new URL(result.finalUrl).hostname;
  try {
    await transport.sendMail({
      from: { name: "Abhi Patel", address: user },
      to: email,
      subject: `Your App Checker report for ${host}: ${result.score}/100`,
      text: reportEmailText(result, name),
    });
    await transport.sendMail({
      from: { name: "App Checker", address: user },
      to: user,
      replyTo: email,
      subject: `${LEAD_SUBJECT_PREFIX} ${host} scored ${result.score} (${email})`,
      text: leadAlertText(result, email, name, new Date().toISOString()),
    });
  } catch {
    return NextResponse.json({ error: "We couldn't send the email right now. Please try again in a few minutes." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
