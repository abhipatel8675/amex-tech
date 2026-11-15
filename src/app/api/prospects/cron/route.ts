import { NextResponse, type NextRequest } from "next/server";
import { leadsDb } from "@/lib/leads";
import { tick } from "@/lib/prospects/engine";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

// Called every few minutes by the Cloudflare Worker in workers/prospect-cron.
// Each source decides for itself whether it is due (see Settings).
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = leadsDb();
  if (!db) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });

  const started = Date.now();
  try {
    const result = await tick(db, started + 50000);
    return NextResponse.json({ ok: true, ms: Date.now() - started, ...result });
  } catch (err) {
    console.error("prospects cron:", err);
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
