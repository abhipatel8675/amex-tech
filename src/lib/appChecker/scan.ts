import { safeFetch, normalizeUrl, BlockedUrlError, type SafeResponse } from "./safeFetch";

// Passive checks only: we read what any browser downloads from the page (HTML,
// its own JavaScript files, robots.txt, sitemap.xml) and never try logins,
// hidden paths or the app's database.

export type Severity = "critical" | "high" | "medium" | "low";
export type Category = "security" | "seo" | "performance" | "reliability";

export type Finding = {
  id: string;
  severity: Severity;
  category: Category;
  title: string;
  detail: string;
  fix: string;
  evidence?: string[];
};

export type ScanResult = {
  url: string;
  finalUrl: string;
  scannedAt: string;
  score: number;
  grade: string;
  stack: string[];
  stats: { htmlMs: number; scripts: number; jsKb: number };
  findings: Finding[];
};

const SEVERITY_ORDER: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const SEVERITY_PENALTY: Record<Severity, number> = { critical: 30, high: 15, medium: 7, low: 3 };

const MAX_SCRIPTS = 15;
const MAX_SCRIPT_BYTES = 3_000_000;
const MAX_TOTAL_JS_BYTES = 12_000_000;

type SecretRule = { id: string; label: string; severity: Severity; re: RegExp; fix: string };

const SECRET_RULES: SecretRule[] = [
  {
    id: "stripe-secret-live",
    label: "Stripe live secret key",
    severity: "critical",
    re: /\b[sr]k_live_[0-9a-zA-Z]{20,}\b/g,
    fix: "Roll this key in the Stripe dashboard now, then move all Stripe calls that need it to a server route or edge function.",
  },
  {
    id: "stripe-secret-test",
    label: "Stripe test secret key",
    severity: "high",
    re: /\bsk_test_[0-9a-zA-Z]{20,}\b/g,
    fix: "Roll the key in Stripe and keep secret keys on the server. Only publishable keys (pk_) belong in the browser.",
  },
  {
    id: "openai-key",
    label: "OpenAI API key",
    severity: "critical",
    re: /\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{32,}\b/g,
    fix: "Revoke the key at platform.openai.com, then call OpenAI from a server route so the key never reaches the browser.",
  },
  {
    id: "anthropic-key",
    label: "Anthropic API key",
    severity: "critical",
    re: /\bsk-ant-[A-Za-z0-9_-]{20,}\b/g,
    fix: "Revoke the key in the Anthropic console and move the API call to a server route.",
  },
  {
    id: "supabase-secret",
    label: "Supabase secret key",
    severity: "critical",
    re: /\bsb_secret_[A-Za-z0-9_-]{20,}\b/g,
    fix: "Rotate the secret key in Supabase (Settings → API Keys). Use the publishable key in the browser and keep the secret key server-side.",
  },
  {
    id: "github-token",
    label: "GitHub token",
    severity: "critical",
    re: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/g,
    fix: "Revoke the token in GitHub settings and remove it from the frontend code.",
  },
  {
    id: "sendgrid-key",
    label: "SendGrid API key",
    severity: "critical",
    re: /\bSG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43}\b/g,
    fix: "Delete the key in SendGrid and send email from a server route instead.",
  },
  {
    id: "resend-key",
    label: "Resend API key",
    severity: "high",
    re: /\bre_[A-Za-z0-9]{8,}_[A-Za-z0-9]{16,}\b/g,
    fix: "Revoke the key in Resend. Anyone holding it can send email as your domain. Send email from a server route.",
  },
  {
    id: "aws-key",
    label: "AWS access key ID",
    severity: "high",
    re: /\bAKIA[0-9A-Z]{16}\b/g,
    fix: "Deactivate the key in AWS IAM and use short-lived credentials on the server instead.",
  },
  {
    id: "private-key",
    label: "Private key",
    severity: "critical",
    re: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
    fix: "Treat the key as compromised: replace it and remove it from the bundle.",
  },
];

const JWT_RE = /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g;
const GOOGLE_KEY_RE = /\bAIza[0-9A-Za-z_-]{35}\b/g;

function mask(secret: string): string {
  return secret.length <= 12 ? `${secret.slice(0, 3)}…` : `${secret.slice(0, 8)}…${secret.slice(-4)}`;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function attr(tag: string, name: string): string | undefined {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[1] ?? m[2] ?? m[3]) : undefined;
}

function metaContent(html: string, key: string): string | undefined {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const name = (attr(tag, "name") ?? attr(tag, "property") ?? "").toLowerCase();
    if (name === key) return attr(tag, "content")?.trim();
  }
  return undefined;
}

function visibleText(html: string): string {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  return body
    .replace(/<(script|style|noscript|template|svg)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectStack(html: string, headers: Headers, host: string, js: string): string[] {
  const all = `${html}\n${js.slice(0, 2_000_000)}`;
  const server = `${headers.get("server") ?? ""} ${headers.get("x-powered-by") ?? ""}`.toLowerCase();
  const found = new Set<string>();
  // Builder fingerprints (scripts, attributes, hosts), never plain mentions in page copy.
  if (/lovable-tagger|cdn\.gpteng\.co|data-lov-id|\/lovable-uploads\//i.test(all) || host.endsWith(".lovable.app")) found.add("Lovable");
  if (/bolt-(?:badge|banner)|\.bolt\.host/i.test(html) || host.endsWith(".bolt.host") || host === "bolt.new") found.add("Bolt.new");
  if (/replit-badge|__replco|replit\.com\/public\/js/i.test(html) || host.endsWith(".replit.app") || host.endsWith(".repl.co")) found.add("Replit");
  if (/vusercontent\.net|generated by v0/i.test(all)) found.add("v0");
  if (/\/_next\/static\//.test(html)) found.add("Next.js");
  else if (/<script[^>]+type=["']module["'][^>]+src=["'][^"']*\/assets\/index-[\w-]+\.js/i.test(html)) found.add("Vite + React");
  if (/supabase\.co|supabase-js|@supabase\//i.test(all)) found.add("Supabase");
  if (/firebaseapp\.com|firebaseio\.com|firebase\/app|"apiKey":\s*"AIza/i.test(all)) found.add("Firebase");
  if (headers.get("x-vercel-id") || server.includes("vercel")) found.add("Vercel");
  if (server.includes("netlify") || headers.get("x-nf-request-id")) found.add("Netlify");
  if (server.includes("cloudflare")) found.add("Cloudflare");
  // Match platform asset hosts and markup, not words: a page that merely mentions
  // "Shopify" or "Webflow" in its copy shouldn't be labelled as built with it.
  if (/\/wp-(content|includes)\//i.test(html)) found.add("WordPress");
  if (/static\.wixstatic\.com|static\.parastorage\.com/i.test(html)) found.add("Wix");
  if (/data-wf-page|website-files\.com|webflow\.js/i.test(html)) found.add("Webflow");
  if (/cdn\.shopify\.com|Shopify\.theme/i.test(html)) found.add("Shopify");
  return [...found];
}

function collectScriptUrls(html: string, base: URL): URL[] {
  const urls: URL[] = [];
  const add = (raw?: string) => {
    if (!raw) return;
    try {
      const u = new URL(raw, base);
      if (u.hostname === base.hostname && /\.m?js(\?|$)/.test(u.pathname + u.search) && !urls.some((x) => x.href === u.href)) urls.push(u);
    } catch {}
  };
  for (const tag of html.match(/<script\b[^>]*>/gi) ?? []) add(attr(tag, "src"));
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    if (/modulepreload|preload/i.test(attr(tag, "rel") ?? "") && /\.m?js/.test(attr(tag, "href") ?? "")) add(attr(tag, "href"));
  }
  return urls;
}

async function tryFetch(url: string | URL, opts?: Parameters<typeof safeFetch>[1]): Promise<SafeResponse | null> {
  try {
    return await safeFetch(url, opts);
  } catch {
    return null;
  }
}

export function gradeFor(score: number): string {
  return score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 40 ? "D" : "F";
}

export async function scanApp(input: string): Promise<ScanResult> {
  const start = normalizeUrl(input);
  const page = await safeFetch(start, { maxBytes: 2_000_000, timeoutMs: 12_000 });
  const base = new URL(page.url);
  const html = page.body;
  const findings: Finding[] = [];
  const add = (f: Finding) => findings.push(f);

  // A bot-protection challenge isn't the real site, so grading it would be wrong.
  const challenged =
    (page.status === 403 || page.status === 503 || page.status === 429) &&
    (page.headers.get("cf-mitigated") === "challenge" || /just a moment|cf-chl|attention required|px-captcha|access denied/i.test(html.slice(0, 20_000)));
  if (challenged) {
    throw new BlockedUrlError(
      "This site's bot protection (e.g. Cloudflare) blocked our check. Try your app's direct hosting address (like myapp.lovable.app or myapp.vercel.app) instead."
    );
  }

  // Reliability: an error page has nothing else worth grading.
  if (page.status >= 400) {
    const findings: Finding[] = [
      {
        id: "site-error",
        severity: "critical",
        category: "reliability",
        title: `Your homepage returns an error (HTTP ${page.status})`,
        detail: "Visitors and Google get an error page instead of your app.",
        fix: "Check your hosting dashboard for a failed deploy, expired plan or deleted project, then redeploy.",
      },
    ];
    return {
      url: start.toString(),
      finalUrl: page.url,
      scannedAt: new Date().toISOString(),
      score: 100 - SEVERITY_PENALTY.critical * 2,
      grade: gradeFor(100 - SEVERITY_PENALTY.critical * 2),
      stack: detectStack(html, page.headers, base.hostname, ""),
      stats: { htmlMs: page.ms, scripts: 0, jsKb: 0 },
      findings,
    };
  }

  // JavaScript bundles: the page's own scripts, plus chunks they import (one level deep).
  const scriptUrls = collectScriptUrls(html, base).slice(0, MAX_SCRIPTS);
  const scripts: { url: string; body: string; headers: Headers }[] = [];
  let jsBytes = 0;
  for (let i = 0; i < scriptUrls.length && scripts.length < MAX_SCRIPTS && jsBytes < MAX_TOTAL_JS_BYTES; i++) {
    const res = await tryFetch(scriptUrls[i], { maxBytes: MAX_SCRIPT_BYTES, timeoutMs: 8_000 });
    if (!res || res.status >= 400) continue;
    scripts.push({ url: res.url, body: res.body, headers: res.headers });
    jsBytes += res.bytes;
    if (i === 0) {
      for (const m of res.body.matchAll(/["'`](\/?(?:assets|_next\/static\/chunks)\/[\w./-]+\.js)["'`]/g)) {
        try {
          const u = new URL(m[1], base);
          if (u.hostname === base.hostname && !scriptUrls.some((x) => x.href === u.href) && scriptUrls.length < MAX_SCRIPTS) scriptUrls.push(u);
        } catch {}
      }
    }
  }
  const sources = [{ url: page.url, body: html }, ...scripts.map((s) => ({ url: s.url, body: s.body }))];
  const allJs = scripts.map((s) => s.body).join("\n");
  const stack = detectStack(html, page.headers, base.hostname, allJs);

  // Security: secrets shipped to the browser
  for (const rule of SECRET_RULES) {
    const hits = new Map<string, string>();
    for (const src of sources) for (const m of src.body.matchAll(rule.re)) hits.set(m[0], new URL(src.url).pathname);
    if (hits.size === 0) continue;
    add({
      id: rule.id,
      severity: rule.severity,
      category: "security",
      title: `${rule.label} is visible in your public code`,
      detail: `Anyone who opens your site can copy this key from the JavaScript it downloads. Found ${hits.size} ${hits.size === 1 ? "key" : "keys"}.`,
      fix: rule.fix,
      evidence: [...hits].slice(0, 5).map(([s, file]) => `${mask(s)} in ${file}`),
    });
  }

  const supabaseRoles = new Map<string, string>();
  for (const src of sources) {
    for (const m of src.body.matchAll(JWT_RE)) {
      const payload = decodeJwtPayload(m[0]);
      if (payload && payload.iss === "supabase" && typeof payload.role === "string") supabaseRoles.set(m[0], payload.role);
    }
  }
  const serviceRole = [...supabaseRoles].filter(([, role]) => role === "service_role");
  if (serviceRole.length > 0) {
    add({
      id: "supabase-service-role",
      severity: "critical",
      category: "security",
      title: "Your Supabase service_role key is public",
      detail:
        "This key skips every Row Level Security rule. Anyone who copies it can read, change or delete all data in your database, including user accounts.",
      fix: "Rotate the JWT secret / service_role key in Supabase now, remove it from the frontend, and do privileged work in an Edge Function or server route.",
      evidence: serviceRole.map(([t]) => mask(t)),
    });
  }
  if ([...supabaseRoles.values()].includes("anon") || /\bsb_publishable_[A-Za-z0-9_-]{20,}/.test(allJs + html)) {
    add({
      id: "supabase-rls-reminder",
      severity: "low",
      category: "security",
      title: "Supabase public key found: make sure every table has RLS",
      detail:
        "The public (anon/publishable) key is meant to be in the browser, but it only protects your data if Row Level Security is on for every table with a policy that limits who can read and write.",
      fix: "In Supabase, open Database → Tables and confirm RLS is enabled on every table, then review each policy. AI builders often create tables with RLS off or with 'allow all' policies.",
    });
  }

  const googleKeys = new Set<string>();
  for (const src of sources) for (const m of src.body.matchAll(GOOGLE_KEY_RE)) googleKeys.add(m[0]);
  if (googleKeys.size > 0) {
    add({
      id: "google-key-restrictions",
      severity: "low",
      category: "security",
      title: "Google / Firebase API key in your code: check its restrictions",
      detail:
        "Firebase and Maps keys are meant to be public, but an unrestricted key can be used by anyone on your bill (Maps, Places, Gemini and other paid Google APIs).",
      fix: "In Google Cloud Console → Credentials, restrict the key to your domain (HTTP referrers) and to only the APIs your app uses.",
      evidence: [...googleKeys].slice(0, 3).map(mask),
    });
  }

  // Security: public source maps
  const mapped = scripts.filter((s) => /\/\/[#@] sourceMappingURL=(?!data:)\S+/.test(s.body.slice(-500)) || s.headers.get("sourcemap"));
  const exposedMaps: string[] = [];
  for (const s of mapped.slice(0, 3)) {
    const ref = s.headers.get("sourcemap") ?? s.body.slice(-500).match(/\/\/[#@] sourceMappingURL=(\S+)/)?.[1];
    if (!ref) continue;
    const res = await tryFetch(new URL(ref, s.url), { maxBytes: 4_000, timeoutMs: 6_000 });
    if (res && res.status === 200 && /"mappings"|"sources"/.test(res.body)) exposedMaps.push(new URL(res.url).pathname);
  }
  if (exposedMaps.length > 0) {
    add({
      id: "source-maps",
      severity: "medium",
      category: "security",
      title: "Your original source code can be downloaded",
      detail: "Public source maps let anyone rebuild your readable source code, comments and internal API routes.",
      fix: "Turn off production source maps (Vite: build.sourcemap = false; Next.js: productionBrowserSourceMaps = false) or upload them to your error tracker privately.",
      evidence: exposedMaps,
    });
  }

  // Security: HTTPS and headers
  if (base.protocol !== "https:") {
    add({
      id: "no-https",
      severity: "high",
      category: "security",
      title: "Your site isn't using HTTPS",
      detail: "Browsers mark it 'Not secure', logins and forms are sent unencrypted, and Google ranks it lower.",
      fix: "Turn on HTTPS in your host (Vercel, Netlify and Cloudflare do this free) and redirect http:// to https://.",
    });
  } else {
    const plain = await tryFetch(`http://${base.host}/`, { maxBytes: 1_000, timeoutMs: 6_000, maxRedirects: 0 });
    if (plain && plain.status < 300) {
      add({
        id: "no-https-redirect",
        severity: "medium",
        category: "security",
        title: "http:// doesn't redirect to https://",
        detail: "People who type your address without https land on an unencrypted copy of the site.",
        fix: "Enable 'Always use HTTPS' / force HTTPS in your host or CDN settings.",
      });
    }
  }
  const h = page.headers;
  const missing: string[] = [];
  if (base.protocol === "https:" && !h.get("strict-transport-security")) missing.push("Strict-Transport-Security");
  if (!h.get("content-security-policy")) missing.push("Content-Security-Policy");
  if (!h.get("x-frame-options") && !/frame-ancestors/i.test(h.get("content-security-policy") ?? "")) missing.push("X-Frame-Options");
  if (!h.get("x-content-type-options")) missing.push("X-Content-Type-Options");
  if (missing.length > 0) {
    add({
      id: "security-headers",
      severity: missing.length >= 3 ? "medium" : "low",
      category: "security",
      title: `Missing ${missing.length} security ${missing.length === 1 ? "header" : "headers"}`,
      detail: "These headers protect visitors from clickjacking, content sniffing and protocol downgrades.",
      fix: "Add them in your host config (vercel.json headers, Netlify _headers, or next.config.js headers()).",
      evidence: missing,
    });
  }

  // SEO
  const text = visibleText(html);
  const words = text ? text.split(" ").length : 0;
  const robotsMeta = (metaContent(html, "robots") ?? "") + " " + (h.get("x-robots-tag") ?? "");
  if (/noindex/i.test(robotsMeta)) {
    add({
      id: "noindex",
      severity: "high",
      category: "seo",
      title: "Your homepage tells Google not to index it",
      detail: "A 'noindex' robots tag is set, so the page won't appear in Google at all. This is often left over from a staging setup.",
      fix: "Remove the noindex robots meta tag / X-Robots-Tag header from production.",
    });
  }
  if (words < 40 && scripts.length > 0) {
    add({
      id: "empty-shell",
      severity: "high",
      category: "seo",
      title: "Google sees an almost empty page",
      detail: `The HTML your server sends has only ${words} words of text. Your content is drawn by JavaScript after load, which is typical for Lovable, Bolt and Vite apps. Google renders it slowly or partly, and social previews and most AI search tools don't run JavaScript at all.`,
      fix: "Pre-render your public pages: move them to Next.js (or another framework with server rendering), or add a prerendering step for marketing pages. Keep the app behind login as a single-page app.",
    });
  }
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (!title) {
    add({ id: "no-title", severity: "high", category: "seo", title: "No page title", detail: "Google and browser tabs have nothing to show for your page.", fix: "Add a unique <title> of 50–60 characters that says what the app does." });
  } else if (/^(vite \+ react( \+ ts)?|vite app|react app|lovable( app| generated project)?|my (v0 )?(app|project)|bolt|replit|create next app|untitled)$/i.test(title)) {
    add({
      id: "template-title",
      severity: "medium",
      category: "seo",
      title: `Your page title is still the template default ("${title.slice(0, 40)}")`,
      detail: "This is what shows in Google results and when people share your link.",
      fix: "Replace it in index.html (or your layout metadata) with your product name and what it does.",
    });
  }
  const description = metaContent(html, "description");
  if (!description) {
    add({ id: "no-description", severity: "medium", category: "seo", title: "No meta description", detail: "Google writes its own snippet, usually a worse one.", fix: "Add a 140–160 character meta description that sells the click." });
  }
  const ogMissing = ["og:title", "og:description", "og:image"].filter((k) => !metaContent(html, k));
  if (ogMissing.length > 0) {
    add({
      id: "og-tags",
      severity: "low",
      category: "seo",
      title: "Links shared on social media won't show a proper preview",
      detail: "Missing Open Graph tags mean LinkedIn, X, Slack and iMessage show a bare link with no image or summary.",
      fix: "Add og:title, og:description and a 1200×630 og:image to your page head.",
      evidence: ogMissing,
    });
  }
  if (!/<h1[\s>]/i.test(html) && words >= 40) {
    add({ id: "no-h1", severity: "low", category: "seo", title: "No H1 heading", detail: "The main heading tells Google what the page is about.", fix: "Wrap your main headline in a single <h1>." });
  }
  if (!/<link[^>]+rel=["']canonical["']/i.test(html)) {
    add({ id: "no-canonical", severity: "low", category: "seo", title: "No canonical URL", detail: "Without it, Google may split ranking between www/non-www or preview URLs.", fix: "Add <link rel=\"canonical\" href=\"https://yourdomain.com/\">." });
  }
  if (!/<meta[^>]+name=["']viewport["']/i.test(html)) {
    add({ id: "no-viewport", severity: "medium", category: "seo", title: "Not set up for mobile", detail: "There's no viewport tag, so phones show a zoomed-out desktop page.", fix: "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">." });
  }
  const robots = await tryFetch(new URL("/robots.txt", base), { maxBytes: 50_000, timeoutMs: 6_000 });
  const robotsOk = robots && robots.status === 200 && !/<html/i.test(robots.body);
  const sitemapRef = robotsOk ? robots.body.match(/^\s*sitemap:\s*(\S+)/im)?.[1] : undefined;
  const sitemap = await tryFetch(sitemapRef ?? new URL("/sitemap.xml", base).toString(), { maxBytes: 20_000, timeoutMs: 6_000 });
  const sitemapOk = sitemap && sitemap.status === 200 && /<(urlset|sitemapindex)/i.test(sitemap.body);
  if (!robotsOk || !sitemapOk) {
    add({
      id: "robots-sitemap",
      severity: "low",
      category: "seo",
      title: `No ${[!robotsOk && "robots.txt", !sitemapOk && "sitemap.xml"].filter(Boolean).join(" or ")}`,
      detail: "These files help Google find and crawl every page of your site.",
      fix: "Add a robots.txt that points to a sitemap.xml listing your public pages, then submit the sitemap in Google Search Console.",
    });
  }
  const notFound = await tryFetch(new URL("/this-page-should-not-exist-amex-check", base), { maxBytes: 2_000, timeoutMs: 6_000 });
  if (notFound && notFound.status === 200) {
    add({
      id: "soft-404",
      severity: "low",
      category: "seo",
      title: "Missing pages return 'OK' instead of 404",
      detail: "Google can index broken or made-up URLs as real pages ('soft 404s').",
      fix: "Return a real 404 status for unknown routes (e.g. a 404.html / rewrite rule on your host).",
    });
  }

  // Performance
  const jsKb = Math.round(jsBytes / 1024);
  if (page.ms > 2_500) {
    add({
      id: "slow-response",
      severity: page.ms > 5_000 ? "high" : "medium",
      category: "performance",
      title: `Your server took ${(page.ms / 1000).toFixed(1)}s to respond`,
      detail: "Visitors stare at a blank screen while they wait, and slow sites rank and convert worse.",
      fix: "Serve the page from a CDN/edge, cache it, and check for slow database calls or cold starts on the homepage.",
    });
  }
  if (jsKb > 1_000) {
    add({
      id: "heavy-js",
      severity: jsKb > 2_500 ? "high" : "medium",
      category: "performance",
      title: `Your homepage loads ${(jsKb / 1024).toFixed(1)} MB of JavaScript`,
      detail: "Phones on mobile data take several seconds to download and run this much code before the page works.",
      fix: "Split code by route (lazy-load pages and heavy libraries), remove unused packages, and avoid importing whole icon or chart libraries.",
    });
  }
  const encoding = h.get("content-encoding");
  if (!encoding && page.bytes > 20_000) {
    add({ id: "no-compression", severity: "low", category: "performance", title: "Pages aren't compressed", detail: "Turning on gzip or Brotli usually makes HTML 70–80% smaller.", fix: "Enable compression in your host or CDN." });
  }

  findings.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
  const score = Math.max(0, 100 - findings.reduce((sum, f) => sum + SEVERITY_PENALTY[f.severity], 0));

  return {
    url: start.toString(),
    finalUrl: page.url,
    scannedAt: new Date().toISOString(),
    score,
    grade: gradeFor(score),
    stack,
    stats: { htmlMs: page.ms, scripts: scripts.length, jsKb },
    findings,
  };
}

// What the free check returns: the score and the three most serious problems,
// without fix steps or any (masked) evidence.
export function toPreview(result: ScanResult) {
  const counts = { critical: 0, high: 0, medium: 0, low: 0 } as Record<Severity, number>;
  for (const f of result.findings) counts[f.severity]++;
  return {
    url: result.url,
    finalUrl: result.finalUrl,
    score: result.score,
    grade: result.grade,
    stack: result.stack,
    stats: result.stats,
    counts,
    total: result.findings.length,
    preview: result.findings.slice(0, 3).map(({ id, severity, category, title, detail }) => ({ id, severity, category, title, detail })),
  };
}

export type ScanPreview = ReturnType<typeof toPreview>;
