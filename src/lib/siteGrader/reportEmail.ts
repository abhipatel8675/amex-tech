import type { GradeResult } from "./grade";

// Booking page for "book a free call" links (Cal.com). Falls back to the contact page.
export const BOOKING_URL = process.env.NEXT_PUBLIC_CAL_LINK || "https://amextechnology.com/contact?service=Website";

// Plain-text report emailed to someone who asked for it on /tools/website-grader.
export function gradeReportText(r: GradeResult, name?: string): string {
  const failed = r.checks.filter((c) => !c.pass);
  const passed = r.checks.filter((c) => c.pass);
  const lines: string[] = [
    `Hi${name ? ` ${name}` : ""},`,
    "",
    `Here's the full Website Grader report for ${r.host}.`,
    "",
    `Score: ${r.score}/100 (grade ${r.grade})`,
    `${failed.length} things to fix, ${passed.length} already done well.`,
    "",
  ];
  if (failed.length) {
    lines.push("== WHAT TO FIX (most important first) ==", "");
    failed.forEach((c, i) => {
      lines.push(`${i + 1}. ${c.title}`, `   Why it matters: ${c.why}`, `   How to fix: ${c.fix}`, "");
    });
  }
  if (passed.length) {
    lines.push("== ALREADY GOOD ==", ...passed.map((c) => `  ✓ ${c.title}`), "");
  }
  lines.push(
    failed.length
      ? "Want these fixed for you? Pick a time for a free 15-minute call and I'll walk you through it:"
      : "Your site passed every check. If you'd like help getting more calls from it, pick a time for a free 15-minute call:",
    BOOKING_URL,
    "",
    "Best,",
    "Abhi Patel",
    "Amex Technology · amextechnology.com",
    "",
    "--",
    "You're getting this because you asked for your Website Grader report.",
    'Reply "unsubscribe" and I won\'t email you again.',
  );
  return lines.join("\n");
}

export const GRADER_LEAD_PREFIX = "[LEAD] Website Grader:";
export function graderAlertText(r: GradeResult, email: string, name: string, phone: string): string {
  return [
    `New Website Grader lead: ${name || email} <${email}>${phone ? ` · ${phone}` : ""}`,
    `Site: ${r.finalUrl}`,
    `Score: ${r.score}/100 (${r.grade})${r.stats.builder ? ` · built with ${r.stats.builder}` : ""}`,
    "",
    "Problems:",
    ...r.checks.filter((c) => !c.pass).map((c) => `  - ${c.title}`),
    "",
    "They're in the dashboard under Leads with a follow-up due today.",
  ].join("\n");
}
