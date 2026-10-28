import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { leadsDb, saveLead } from "@/lib/leads";

export const runtime = "nodejs";

// Cal.com webhook (Settings → Developer → Webhooks, secret = CAL_WEBHOOK_SECRET).
// A booking moves the matching lead to "call" with the follow-up set to the call
// date, or creates a new lead when the person isn't in the pipeline yet.

type CalPayload = {
  triggerEvent?: string;
  payload?: {
    uid?: string;
    title?: string;
    startTime?: string;
    attendees?: { name?: string; email?: string; phoneNumber?: string }[];
    responses?: Record<string, { value?: unknown } | undefined>;
    additionalNotes?: string;
  };
};

function verified(raw: string, signature: string | null): boolean {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  // Cal.com's docs don't state the digest encoding, so accept hex or base64.
  const digest = createHmac("sha256", secret).update(raw).digest();
  const given = Buffer.from(signature.trim());
  return [digest.toString("hex"), digest.toString("base64")].some((enc) => {
    const expected = Buffer.from(enc);
    return expected.length === given.length && timingSafeEqual(expected, given);
  });
}

const pacificDay = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
const pacificTime = (iso: string) => new Date(iso).toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "medium", timeStyle: "short" });

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (!verified(raw, req.headers.get("x-cal-signature-256"))) return NextResponse.json({ error: "Bad signature" }, { status: 401 });
  const db = leadsDb();
  if (!db) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });

  let event: CalPayload;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const kind = event.triggerEvent ?? "";
  const p = event.payload ?? {};
  const attendee = p.attendees?.[0];
  const email = attendee?.email?.trim().toLowerCase();
  if (!email || !p.startTime) return NextResponse.json({ ok: true, ignored: "no attendee or time" });

  const when = pacificTime(p.startTime);
  const line =
    kind === "BOOKING_CANCELLED" ? `Call on ${when} was cancelled.` : kind === "BOOKING_RESCHEDULED" ? `Call moved to ${when}.` : `Booked a call for ${when}.`;
  if (!["BOOKING_CREATED", "BOOKING_RESCHEDULED", "BOOKING_CANCELLED"].includes(kind)) {
    return NextResponse.json({ ok: true, ignored: kind });
  }

  const { data: existing } = await db.from("leads").select("id, notes, status").ilike("email", email).order("created_at", { ascending: false }).limit(1);
  const lead = existing?.[0];
  if (lead) {
    const cancelled = kind === "BOOKING_CANCELLED";
    await db
      .from("leads")
      .update({
        status: cancelled ? lead.status : "call",
        next_follow_up: pacificDay(cancelled ? new Date().toISOString() : p.startTime),
        notes: [lead.notes, line].filter(Boolean).join("\n"),
      })
      .eq("id", lead.id);
    return NextResponse.json({ ok: true, updated: lead.id });
  }
  if (kind === "BOOKING_CANCELLED") return NextResponse.json({ ok: true, ignored: "cancel for unknown lead" });

  const answers = Object.entries(p.responses ?? {})
    .filter(([k]) => !["name", "email", "guests", "rescheduleReason"].includes(k))
    .map(([k, v]) => (v?.value ? `${k}: ${String(v.value)}` : ""))
    .filter(Boolean);
  await saveLead({
    source: "booking",
    status: "call",
    name: attendee?.name,
    email,
    phone: attendee?.phoneNumber,
    message: [p.title, p.additionalNotes, ...answers].filter(Boolean).join("\n"),
    next_follow_up: pacificDay(p.startTime),
    notes: line,
    meta: { cal_uid: p.uid },
  });
  return NextResponse.json({ ok: true, created: true });
}
