import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { leadsDb, saveLead } from "@/lib/leads";
import { saveOutreachSnapshot, type OutreachContact } from "@/lib/outreach";

export const runtime = "nodejs";
export const maxDuration = 60;

// Called by the amex-outreach runs (daily send, weekly finder) with the whole
// contact list. Every contact who replied becomes a lead once, with a follow-up
// due today, so replies show up on the dashboard without anyone typing them in.

function authorized(req: NextRequest): boolean {
  const expected = process.env.OUTREACH_SYNC_TOKEN;
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!expected || !given) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

function clean(c: Record<string, unknown>): OutreachContact | null {
  const id = str(c.id, 200);
  const email = str(c.email, 200).toLowerCase();
  if (!id || !email) return null;
  return {
    id,
    email,
    segment: str(c.segment, 40),
    business: str(c.business, 200),
    city: str(c.city, 80),
    category: str(c.category, 80),
    website: str(c.website, 300),
    problem: str(c.problem, 500),
    subject: str(c.subject, 300),
    status: str(c.status, 20),
    last_sent_at: str(c.last_sent_at, 40),
    replied_at: str(c.replied_at, 40),
    notes: str(c.notes, 300),
    reply_snippet: str(c.reply_snippet, 500) || undefined,
  };
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = leadsDb();
  if (!db) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {}
  if (!Array.isArray(body.contacts) || body.contacts.length > 20_000) {
    return NextResponse.json({ error: "contacts must be an array" }, { status: 400 });
  }
  const contacts = body.contacts.map((c) => clean(c ?? {})).filter((c): c is OutreachContact => c !== null);

  await saveOutreachSnapshot(db, {
    synced_at: new Date().toISOString(),
    enabled: body.enabled === true,
    from_email: str(body.from_email, 200),
    contacts,
  });

  // Replies not already in the pipeline (matched by outreach id or email).
  const replied = contacts.filter((c) => c.status === "replied");
  let added = 0;
  if (replied.length) {
    const { data: existing, error } = await db.from("leads").select("email, meta").eq("source", "outreach");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const knownIds = new Set((existing ?? []).map((l) => (l.meta as { outreach_id?: string })?.outreach_id).filter(Boolean));
    const knownEmails = new Set((existing ?? []).map((l) => l.email?.toLowerCase()).filter(Boolean));
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
    for (const c of replied) {
      if (knownIds.has(c.id) || knownEmails.has(c.email)) continue;
      await saveLead({
        source: "outreach",
        status: "replied",
        company: c.business,
        email: c.email,
        website: c.website,
        service: "Website",
        message: c.reply_snippet ? `Reply: ${c.reply_snippet}` : `Replied to "${c.subject}". Read the reply in the outreach inbox.`,
        next_follow_up: today,
        notes: c.problem ? `Cold email was about: ${c.problem}` : null,
        meta: { outreach_id: c.id, category: c.category, city: c.city, subject: c.subject, replied_at: c.replied_at },
      });
      added++;
    }
  }

  return NextResponse.json({ ok: true, contacts: contacts.length, leads_added: added });
}
