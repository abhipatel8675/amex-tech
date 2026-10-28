import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { gradeSite } from "@/lib/siteGrader/grade";
import { gradeReportText, graderAlertText, GRADER_LEAD_PREFIX } from "@/lib/siteGrader/reportEmail";
import { BlockedUrlError } from "@/lib/appChecker/safeFetch";
import { saveLead } from "@/lib/leads";

export const runtime = "nodejs";
export const maxDuration = 60;

// Best-effort per-instance limit, like /api/app-check/email-report.
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
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().replace(/[\r\n<>]/g, "").slice(0, max) : "");

export async function POST(req: NextRequest) {
  const user = process.env.ZOHO_USER;
  const pass = process.env.ZOHO_APP_PASSWORD;
  if (!user || !pass) return NextResponse.json({ error: "Email reports aren't available right now." }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {}
  const url = clean(body.url, 300);
  const email = clean(body.email, 200).toLowerCase();
  const name = clean(body.name, 80);
  const business = clean(body.business, 160);
  const phone = clean(body.phone, 40);
  if (!url) return NextResponse.json({ error: "Run a check first." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (body.consent !== true) return NextResponse.json({ error: "Please tick the box so we can email you the report." }, { status: 400 });

  // Re-grade on the server so the emailed report can't be tampered with.
  let result;
  try {
    result = await gradeSite(url);
  } catch (err) {
    const message = err instanceof BlockedUrlError ? err.message : "We couldn't re-check that site. Please try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const failed = result.checks.filter((c) => !c.pass);
  await saveLead({
    source: "website_grader",
    name,
    email,
    phone,
    company: business || result.host,
    website: result.finalUrl,
    service: "Website",
    message: `Website Grader ${result.score}/100 (${result.grade}). To fix: ${failed.map((c) => c.title).join("; ") || "nothing"}`,
    next_follow_up: new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" }),
    meta: { score: result.score, grade: result.grade, failed: failed.map((c) => c.id), builder: result.stats.builder },
  });

  const transport = nodemailer.createTransport({ host: "smtppro.zoho.in", port: 465, secure: true, auth: { user, pass } });
  try {
    await transport.sendMail({
      from: { name: "Abhi Patel", address: user },
      to: email,
      subject: `Your website report for ${result.host}: ${result.score}/100`,
      text: gradeReportText(result, name),
    });
    await transport.sendMail({
      from: { name: "Website Grader", address: user },
      to: user,
      replyTo: email,
      subject: `${GRADER_LEAD_PREFIX} ${result.host} scored ${result.score} (${email})`,
      text: graderAlertText(result, email, name, phone),
    });
  } catch {
    return NextResponse.json({ error: "We couldn't send the email right now. Please try again in a few minutes." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
