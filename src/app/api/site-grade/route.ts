import { NextResponse, type NextRequest } from "next/server";
import { gradeSite, toGradePreview } from "@/lib/siteGrader/grade";
import { BlockedUrlError } from "@/lib/appChecker/safeFetch";

export const runtime = "nodejs";
export const maxDuration = 30;

// Best-effort per-instance limit, like /api/app-check.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SCANS = 10;
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
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many checks. Please wait a few minutes and try again." }, { status: 429 });

  let url = "";
  try {
    const body = await req.json();
    url = typeof body.url === "string" ? body.url : "";
  } catch {}
  if (!url) return NextResponse.json({ error: "Enter your website address." }, { status: 400 });

  try {
    return NextResponse.json(toGradePreview(await gradeSite(url)));
  } catch (err) {
    if (err instanceof BlockedUrlError) return NextResponse.json({ error: err.message }, { status: 400 });
    const aborted = err instanceof Error && (err.name === "AbortError" || /abort/i.test(err.message));
    return NextResponse.json(
      { error: aborted ? "Your site took too long to respond. Check that it's online and try again." : "We couldn't load that site. Check the address and that it's online." },
      { status: 502 }
    );
  }
}
