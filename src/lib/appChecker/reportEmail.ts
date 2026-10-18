import type { Finding, ScanResult, Severity } from "./scan";

const LABEL: Record<Finding["category"], string> = {
  security: "SECURITY",
  seo: "SEO & AI SEARCH",
  performance: "SPEED",
  reliability: "RELIABILITY",
};
const ORDER: Finding["category"][] = ["reliability", "security", "seo", "performance"];
const SEVERITY_WORD: Record<Severity, string> = { critical: "CRITICAL", high: "High", medium: "Medium", low: "Low" };

// Plain-text report emailed to someone who asked for it on /tools/app-checker.
export function reportEmailText(result: ScanResult, name?: string): string {
  const host = new URL(result.finalUrl).hostname;
  const lines: string[] = [
    `Hi${name ? ` ${name}` : ""},`,
    "",
    `Here's the full App Checker report for ${host}.`,
    "",
    `Score: ${result.score}/100 (grade ${result.grade})`,
    `Issues found: ${result.findings.length}`,
    result.stack.length ? `Built with: ${result.stack.join(", ")}` : "",
    "",
  ];
  if (result.findings.length === 0) {
    lines.push("We didn't find any problems. Your app passed every check.");
  }
  for (const cat of ORDER) {
    const items = result.findings.filter((f) => f.category === cat);
    if (!items.length) continue;
    lines.push(`== ${LABEL[cat]} ==`, "");
    items.forEach((f, i) => {
      lines.push(`${i + 1}. [${SEVERITY_WORD[f.severity]}] ${f.title}`);
      lines.push(`   ${f.detail}`);
      if (f.evidence?.length) lines.push(`   Found: ${f.evidence.join("; ")}`);
      lines.push(`   How to fix: ${f.fix}`, "");
    });
  }
  lines.push(
    "Want these fixed for you? Reply to this email and I'll send a free quote. Most fixes are done within 24 hours.",
    "",
    "Best,",
    "Abhi Patel",
    "Amex Technology · amextechnology.com",
    "",
    "--",
    "You're getting this because you asked for your App Checker report. I may follow up once or twice about these results.",
    'Reply "unsubscribe" and I won\'t email you again.',
  );
  return lines.filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n");
}

// Sent to Abhi's own inbox. The outreach system reads the JSON line below each
// morning and starts the follow-up sequence, so its format must stay stable.
export const LEAD_SUBJECT_PREFIX = "[App Checker lead]";
export function leadAlertText(result: ScanResult, email: string, name: string, consentAt: string): string {
  const counts = { critical: 0, high: 0, medium: 0, low: 0 } as Record<Severity, number>;
  for (const f of result.findings) counts[f.severity]++;
  const data = {
    v: 1,
    email,
    name,
    url: result.finalUrl,
    score: result.score,
    grade: result.grade,
    stack: result.stack,
    counts,
    top: result.findings.slice(0, 3).map((f) => f.title),
    consent_at: consentAt,
  };
  return [
    `New App Checker lead: ${name || email} <${email}>`,
    `App: ${result.finalUrl}`,
    `Score: ${result.score}/100 · ${counts.critical} critical, ${counts.high} high, ${counts.medium} medium, ${counts.low} low`,
    result.stack.length ? `Built with: ${result.stack.join(", ")}` : "",
    "",
    "Top issues:",
    ...result.findings.slice(0, 5).map((f) => `  - [${f.severity}] ${f.title}`),
    "",
    "They opted in to the report and follow-ups. The outreach system will email them on day 2 and day 7 unless they reply.",
    "",
    `APPCHECK-LEAD ${JSON.stringify(data)}`,
  ].join("\n");
}
