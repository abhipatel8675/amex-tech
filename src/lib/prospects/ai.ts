import type { Prospect, ProspectAi, ProspectSettings } from "./types";

// NVIDIA Nemotron through the OpenAI-compatible endpoint (same setup as FirmsLedger).
const ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = process.env.NVIDIA_MODEL || "nvidia/nemotron-3-ultra-550b-a55b";

export const aiConfigured = () => Boolean(process.env.NVIDIA_API_KEY);

async function askNemotron(messages: { role: "system" | "user"; content: string }[], timeoutMs: number) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.3,
      max_tokens: 700,
      chat_template_kwargs: { enable_thinking: false },
      messages,
    }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`NVIDIA API ${res.status}`);
  const text: string = (await res.json()).choices?.[0]?.message?.content || "";
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("AI reply had no JSON");
  return JSON.parse(text.slice(start, end + 1)) as Record<string, unknown>;
}

export type Classification = { ai: ProspectAi; score: number; draft: string | null };

// Decides whether the post is a real buyer, scores it, and drafts a reply.
export async function classifyProspect(p: Prospect, settings: ProspectSettings, timeoutMs = 25000): Promise<Classification> {
  const voice = p.platform === "linkedin" ? "first person singular (\"I\")" : "first person plural (\"we\"), as a small dev studio";
  const system = [
    "You screen public social posts for a small software studio (Next.js, React, React Native, Supabase, Node, Python, AI agents/LLM apps, GoHighLevel, Shopify, WordPress, fixing apps built with Lovable/Bolt/Replit/Cursor).",
    "Return ONLY a JSON object with these keys:",
    '  "is_buyer": true only if the author wants to hire or pay someone for software/web/app/automation work, or clearly needs paid technical help. False for developers advertising themselves, job seekers, people only asking for advice with no intent to hire, spam, surveys, equity-only/unpaid requests, and authors who state they are based in India, Pakistan or Bangladesh.',
    '  "need": one short line describing what they need.',
    '  "category": one of web_app, mobile_app, ai, fix_bug, ai_builder_fix, website, ecommerce, automation_crm, cofounder, other.',
    '  "budget": the budget if stated, else null.',
    '  "urgency": "high", "medium" or "low".',
    '  "score": integer 0-10 for how good a lead this is (clear need + budget + fits our stack = high; vague or tiny = low; not a buyer = 0).',
    '  "reason": one short sentence explaining the score.',
    `  "reply": if is_buyer, a reply to send them on ${p.platform}, written in ${voice}. Under 80 words. Plain text, no hashtags, no emojis, no links, no prices. Reference their specific problem, mention at most ONE relevant project from the list below if it truly fits, and end with one specific question about their project. If not a buyer, null.`,
    "Never invent projects, clients, numbers or credentials. Only use these real projects:",
    ...settings.projects.map((x) => `  - ${x}`),
  ].join("\n");

  const post = [
    `Platform: ${p.platform}${p.community ? ` (${p.community})` : ""}`,
    p.author ? `Author: ${p.author}` : "",
    p.title ? `Title: ${p.title}` : "",
    `Post:\n${(p.body || "").slice(0, 3500)}`,
  ].filter(Boolean).join("\n");

  const out = await askNemotron([{ role: "system", content: system }, { role: "user", content: post }], timeoutMs);
  const score = Math.max(0, Math.min(10, Math.round(Number(out.score) || 0)));
  const isBuyer = out.is_buyer === true;
  const urgency = ["high", "medium", "low"].includes(String(out.urgency)) ? (out.urgency as ProspectAi["urgency"]) : "low";
  return {
    ai: {
      is_buyer: isBuyer,
      need: typeof out.need === "string" ? out.need.slice(0, 200) : undefined,
      category: typeof out.category === "string" ? out.category : "other",
      budget: typeof out.budget === "string" && out.budget.trim() ? out.budget.slice(0, 80) : null,
      urgency,
      reason: typeof out.reason === "string" ? out.reason.slice(0, 300) : undefined,
    },
    score: isBuyer ? score : 0,
    draft: isBuyer && typeof out.reply === "string" && out.reply.trim() ? out.reply.trim().slice(0, 1200) : null,
  };
}
