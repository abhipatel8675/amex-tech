import { NextResponse, type NextRequest } from "next/server";
import { saveLead } from "@/lib/leads";

// The /contact form posts to Web3Forms from the browser, then copies the
// submission here so it lands in the leads pipeline too.

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_IP = 10;
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
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {}
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Invalid email." }, { status: 400 });

  await saveLead({
    source: "contact_form",
    name: body.name as string,
    email,
    company: body.company as string,
    service: body.service as string,
    budget: body.budget as string,
    message: body.message as string,
  });
  return NextResponse.json({ ok: true });
}
