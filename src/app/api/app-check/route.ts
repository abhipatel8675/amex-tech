import { NextResponse, type NextRequest } from "next/server";
import { scanApp, toPreview } from "@/lib/appChecker/scan";
import { BlockedUrlError } from "@/lib/appChecker/safeFetch";

export const runtime = "nodejs";
export const maxDuration = 60;

// Best-effort per-instance limit; serverless instances don't share memory, so
// this slows down abuse rather than strictly enforcing a quota.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SCANS = 8;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > MAX_SCANS;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many checks. Please wait a few minutes and try again." }, { status: 429 });
  }

  let url = "";
  let consent = false;
  try {
    const body = await req.json();
    url = typeof body.url === "string" ? body.url : "";
    consent = body.consent === true;
  } catch {}
  if (!url) return NextResponse.json({ error: "Enter your app's address." }, { status: 400 });
  if (!consent) return NextResponse.json({ error: "Please confirm you own this app or have permission to check it." }, { status: 400 });

  try {
    const result = await scanApp(url);
    return NextResponse.json({ ...toPreview(result), paymentsEnabled: Boolean(process.env.STRIPE_SECRET_KEY) });
  } catch (err) {
    if (err instanceof BlockedUrlError) return NextResponse.json({ error: err.message }, { status: 400 });
    const aborted = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      { error: aborted ? "The site took too long to respond. Check that it's online and try again." : "We couldn't load that site. Check the address and that it's online." },
      { status: 502 }
    );
  }
}
