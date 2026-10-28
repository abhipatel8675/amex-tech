import { safeFetch, normalizeUrl } from "@/lib/appChecker/safeFetch";

// Free website grader for local service businesses (/tools/website-grader).
// One fetch of the public homepage; every check is something a customer or
// Google would notice, phrased for a business owner rather than a developer.

export type CheckId =
  | "https" | "mobile" | "speed" | "weight" | "call" | "form" | "title" | "city"
  | "description" | "h1" | "schema" | "footer" | "alt" | "social";

export type Check = {
  id: CheckId;
  group: "Getting found on Google" | "Turning visitors into calls" | "Trust & speed";
  pass: boolean;
  weight: number;
  title: string;      // what we found (shown whether it passed or not)
  why: string;        // why it costs the business customers
  fix: string;        // what to do
};

export type GradeResult = {
  url: string;
  finalUrl: string;
  host: string;
  gradedAt: string;
  score: number;
  grade: string;
  city: string | null;
  stats: { responseMs: number; pageKb: number; builder: string | null };
  checks: Check[];
};

const CITY_RE = /\b(los angeles|gardena|torrance|long beach|carson|hawthorne|inglewood|compton|redondo beach|manhattan beach|hermosa beach|lawndale|lomita|harbor city|san pedro|wilmington|downey|norwalk|whittier|cerritos|lakewood|bellflower|paramount|south gate|lynwood|huntington park|bell gardens|culver city|santa monica|west hollywood|beverly hills|pasadena|glendale|burbank|alhambra|monterey park|el monte|west covina|arcadia|pomona|anaheim|irvine|santa ana|orange county|riverside|san diego|san jose|san francisco|sacramento|fresno|oakland|[a-z]+,\s*(ca|california)\b)/i;
const BUILDERS: [RegExp, string][] = [
  [/wixstatic|static\.parastorage/i, "Wix"],
  [/squarespace/i, "Squarespace"],
  [/img1\.wsimg\.com|godaddy/i, "GoDaddy"],
  [/weebly/i, "Weebly"],
  [/wp-content|wordpress/i, "WordPress"],
  [/webflow/i, "Webflow"],
  [/duda|dudaone/i, "Duda"],
];

const text = (html: string) =>
  html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&amp;/g, " ").replace(/\s+/g, " ");
const attr = (html: string, re: RegExp) => html.match(re)?.[1]?.trim() ?? "";

export function letter(score: number) {
  return score >= 90 ? "A" : score >= 80 ? "B" : score >= 65 ? "C" : score >= 50 ? "D" : "F";
}

export async function gradeSite(input: string): Promise<GradeResult> {
  const url = normalizeUrl(input);
  const res = await safeFetch(url, { timeoutMs: 15_000, maxBytes: 3_000_000 });
  if (res.status >= 400) throw new Error(`The site answered with an error (HTTP ${res.status}).`);
  const html = res.body;
  const final = new URL(res.url);
  const body = text(html);
  const title = attr(html, /<title[^>]*>([\s\S]*?)<\/title>/i).replace(/\s+/g, " ");
  const description =
    attr(html, /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const city = (title.match(CITY_RE) ?? body.match(CITY_RE))?.[0] ?? null;
  const builder = BUILDERS.find(([re]) => re.test(html))?.[1] ?? null;
  const years = [...html.matchAll(/(?:©|&copy;|copyright)\s*(?:\d{4}\s*[-–]\s*)?(20\d{2})/gi)].map((m) => Number(m[1]));
  const footerYear = years.length ? Math.max(...years) : null;
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  const noAlt = imgs.filter((t) => !/\balt=["'][^"']+["']/i.test(t)).length;
  const pageKb = Math.round(res.bytes / 1024);
  const thisYear = new Date().getFullYear();
  // Builder sites load forms with JavaScript, so a missing <form> there isn't proof.
  const hasForm = /<form\b|jotform|typeform|hsforms|calendly|cal\.com|housecallpro|jobber|servicetitan|book(ing)?[- ]?now|request (a )?(quote|estimate)/i.test(html) || builder === "Wix";

  const checks: Check[] = [
    {
      id: "https", group: "Trust & speed", weight: 12, pass: final.protocol === "https:",
      title: final.protocol === "https:" ? "Secure connection (HTTPS)" : 'Chrome shows "Not Secure" on your site',
      why: "Visitors see a warning next to your address and many leave before the page loads.",
      fix: "Install a free SSL certificate and redirect every page to https://.",
    },
    {
      id: "mobile", group: "Turning visitors into calls", weight: 12, pass: /<meta[^>]+name=["']viewport/i.test(html),
      title: /<meta[^>]+name=["']viewport/i.test(html) ? "Set up for phone screens" : "Not set up for phone screens",
      why: "Most people searching for local services are on a phone. A desktop-only page is tiny and hard to tap.",
      fix: "Make the site responsive so text, buttons and forms fit any screen.",
    },
    {
      id: "call", group: "Turning visitors into calls", weight: 10, pass: /href=["']tel:/i.test(html),
      title: /href=["']tel:/i.test(html) ? "Tap-to-call phone number" : "No tap-to-call phone number",
      why: "On a phone, customers expect to tap your number to call. If they have to copy it, many won't.",
      fix: "Link your phone number (tel:) in the header and on every page.",
    },
    {
      id: "form", group: "Turning visitors into calls", weight: 10, pass: hasForm,
      title: hasForm ? "Quote or contact form found" : "No quote form on the homepage",
      why: "People browsing after hours won't call. A short quote form catches those jobs while you sleep.",
      fix: "Add a 3–4 field quote request form near the top of the homepage.",
    },
    {
      id: "speed", group: "Trust & speed", weight: 8, pass: res.ms < 1500,
      title: `Server responded in ${(res.ms / 1000).toFixed(1)}s`,
      why: "Slow sites lose visitors and rank lower on Google, especially on mobile data.",
      fix: "Use faster hosting and caching. Under 1 second is a good target.",
    },
    {
      id: "weight", group: "Trust & speed", weight: 5, pass: pageKb < 1500,
      title: `Homepage HTML is ${pageKb.toLocaleString()} KB`,
      why: "Heavy pages take longer to show on phones.",
      fix: "Trim unused code and builder bloat; compress images.",
    },
    {
      id: "title", group: "Getting found on Google", weight: 8, pass: title.length >= 15 && title.length <= 70 && !/^(home|welcome|untitled)/i.test(title),
      title: title ? `Google title: "${title.slice(0, 80)}"` : "No page title",
      why: "The title is the blue headline people click on Google. Vague titles like \"Home\" get skipped.",
      fix: "Use \"Your Service in Your City | Business Name\", 50–60 characters.",
    },
    {
      id: "city", group: "Getting found on Google", weight: 8, pass: !!city,
      title: city ? `Mentions your area (${city})` : "Your city or service area isn't mentioned",
      why: "Google matches local searches like \"plumber near me\" to pages that name the area you serve.",
      fix: "Name your city and service areas in the title, headings and text.",
    },
    {
      id: "description", group: "Getting found on Google", weight: 6, pass: description.length >= 50,
      title: description ? "Has a Google description" : "No description for Google results",
      why: "Without one, Google picks random text from the page for your search listing.",
      fix: "Write a 140–160 character summary of what you do, where, and how to reach you.",
    },
    {
      id: "h1", group: "Getting found on Google", weight: 4, pass: /<h1\b/i.test(html),
      title: /<h1\b/i.test(html) ? "Has a main heading" : "No main heading (H1)",
      why: "The main heading tells Google and visitors what the page is about.",
      fix: "Add one clear heading, like \"Licensed Plumber in Torrance\".",
    },
    {
      id: "schema", group: "Getting found on Google", weight: 7, pass: /"@type"\s*:\s*"(LocalBusiness|Plumber|RoofingContractor|HVACBusiness|Electrician|HomeAndConstructionBusiness|GeneralContractor|HousePainter|Locksmith|MovingCompany|ProfessionalService|AutoRepair|Dentist|Restaurant|Store)/i.test(html),
      title: "Local business details for Google",
      why: "Structured business data (name, phone, address, hours) helps you appear in map results.",
      fix: "Add LocalBusiness schema with your name, phone, address, hours and service area.",
    },
    {
      id: "footer", group: "Trust & speed", weight: 4, pass: !footerYear || footerYear >= thisYear - 1,
      title: footerYear && footerYear < thisYear - 1 ? `Footer still says © ${footerYear}` : "Looks up to date",
      why: "An old year makes visitors wonder if you're still in business.",
      fix: "Update the footer year (or make it update automatically) and refresh old content.",
    },
    {
      id: "alt", group: "Getting found on Google", weight: 3, pass: imgs.length === 0 || noAlt / imgs.length <= 0.3,
      title: imgs.length ? `${noAlt} of ${imgs.length} images have no description` : "Image descriptions",
      why: "Google can't see pictures; descriptions (alt text) let your work photos show in image search.",
      fix: "Describe each photo, like \"new roof install in Long Beach\".",
    },
    {
      id: "social", group: "Trust & speed", weight: 3, pass: /<meta[^>]+property=["']og:image/i.test(html),
      title: "Preview image when shared",
      why: "When your link is shared by text or on Facebook, a missing preview looks unfinished.",
      fix: "Add an og:image with your logo or a job photo.",
    },
  ];

  const total = checks.reduce((n, c) => n + c.weight, 0);
  const score = Math.round((checks.reduce((n, c) => n + (c.pass ? c.weight : 0), 0) / total) * 100);
  return {
    url: url.toString(),
    finalUrl: res.url,
    host: final.hostname.replace(/^www\./, ""),
    gradedAt: new Date().toISOString(),
    score,
    grade: letter(score),
    city,
    stats: { responseMs: res.ms, pageKb, builder },
    checks: checks.sort((a, b) => Number(a.pass) - Number(b.pass) || b.weight - a.weight),
  };
}

// What the page shows before the email gate: score and the top 3 problems.
export function toGradePreview(r: GradeResult) {
  const failed = r.checks.filter((c) => !c.pass);
  return {
    url: r.url,
    finalUrl: r.finalUrl,
    host: r.host,
    score: r.score,
    grade: r.grade,
    stats: r.stats,
    passed: r.checks.length - failed.length,
    failedCount: failed.length,
    top: failed.slice(0, 3).map(({ id, title, why, group }) => ({ id, title, why, group })),
  };
}
export type GradePreview = ReturnType<typeof toGradePreview>;
