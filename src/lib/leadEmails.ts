import type { Lead } from "./leadTypes";

export type LeadEmail = {
  id: string;
  lead_id: string | null;
  to_email: string;
  subject: string;
  body: string;
  template: string;
  created_at: string;
};

const SIGN = "Best,\nAbhi Patel\nAmex Technology";

export const TEMPLATES = [
  {
    key: "inquiry",
    label: "Reply to an inquiry",
    subject: "Your {service} project",
    body: `{hi}\n\nThanks for getting in touch about {service}. I read your message and would like to understand a bit more before I send a quote:\n- What should it do on day one?\n- Do you have a deadline?\n- Is there a site you like the look of?\n\nA short call works too if that's easier. Just reply with a time that suits you.\n\n${SIGN}`,
  },
  {
    key: "quote",
    label: "Send a quote",
    subject: "Quote for {company}",
    body: `{hi}\n\nThanks for the details. Here's what I'd build for {company}:\n- [what's included]\n\nThe price is {quote}, and it takes about [timeline] from when we start.\n\nIf that works, reply and I'll send the next steps. Happy to adjust anything.\n\n${SIGN}`,
  },
  {
    key: "after_call",
    label: "After a call",
    subject: "Following up on our call",
    body: `{hi}\n\nThanks for your time today. As promised, here's a short recap:\n- [what we agreed]\n\nNext step: [next step]. Let me know if I missed anything.\n\n${SIGN}`,
  },
  {
    key: "followup",
    label: "Follow up",
    subject: "Re: {last}",
    body: `{hi}\n\nJust checking you saw my email from {when} about {last}. Happy to answer any questions, or I'll leave it here if the timing isn't right.\n\n${SIGN}`,
  },
  { key: "custom", label: "Write my own", subject: "", body: `{hi}\n\n\n\n${SIGN}` },
] as const;

export type TemplateKey = (typeof TEMPLATES)[number]["key"];

export function fillTemplate(key: string, lead: Pick<Lead, "name" | "company" | "service" | "quote_amount">, last?: Pick<LeadEmail, "subject" | "created_at"> | null) {
  const t = TEMPLATES.find((x) => x.key === key) ?? TEMPLATES[TEMPLATES.length - 1];
  const first = (lead.name || "").trim().split(/\s+/)[0];
  const vars: Record<string, string> = {
    hi: first ? `Hi ${first},` : "Hi,",
    service: (lead.service || "website").toLowerCase(),
    company: lead.company || lead.name || "your business",
    quote: lead.quote_amount != null ? `$${Number(lead.quote_amount).toLocaleString("en-US")}` : "[price]",
    last: last?.subject.replace(/^re:\s*/i, "") || "my last email",
    when: last ? new Date(last.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }) : "last week",
  };
  const fill = (s: string) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
  return { subject: fill(t.subject), body: fill(t.body) };
}
