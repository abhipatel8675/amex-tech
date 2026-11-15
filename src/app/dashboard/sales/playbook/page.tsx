export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { currentUser } from "@/lib/access";

export const metadata: Metadata = { title: "Playbook", robots: { index: false, follow: false } };

const reddit = (q: string) => `https://www.reddit.com/search/?q=${encodeURIComponent(q)}&sort=new&t=week`;
const x = (q: string) => `https://x.com/search?q=${encodeURIComponent(q)}&f=live`;
const li = (q: string) => `https://www.linkedin.com/search/results/content/?keywords=${encodeURIComponent(q)}&sortBy=%22date_posted%22`;

const SEARCHES: { group: string; note: string; links: { label: string; href: string }[] }[] = [
  {
    group: "Reddit (also checked automatically every few minutes)",
    note: "Use these for subreddits the tool doesn't watch yet. Sort is already set to New.",
    links: [
      { label: "[Hiring] developer", href: reddit('"[Hiring]" developer') },
      { label: '"looking for a developer"', href: reddit('"looking for a developer"') },
      { label: '"need a developer"', href: reddit('"need a developer"') },
      { label: "Lovable broken / deploy", href: reddit("lovable (broken OR bug OR deploy)") },
      { label: "Supabase RLS help", href: reddit("supabase RLS help") },
      { label: "r/forhire Hiring", href: "https://www.reddit.com/r/forhire/new/" },
    ],
  },
  {
    group: "X (checked automatically every 2 hours; search by hand in between)",
    note: "Opens the Latest tab.",
    links: [
      { label: '"looking for a developer"', href: x('"looking for a developer" -filter:retweets') },
      { label: '"need a developer"', href: x('"need a developer" -filter:retweets') },
      { label: '"anyone know a good developer"', href: x('"anyone know a good developer"') },
      { label: "Lovable stuck / broken", href: x("lovable (stuck OR broken OR help) -filter:retweets") },
      { label: "technical cofounder", href: x('"technical cofounder" -filter:retweets') },
      { label: "vibe coded broken", href: x('"vibe coded" (broken OR help)') },
    ],
  },
  {
    group: "LinkedIn (checked automatically every 3 hours on weekdays)",
    note: "Sorted by newest. Reply from your personal profile; company Pages can't DM.",
    links: [
      { label: '"looking for a developer"', href: li('"looking for a developer"') },
      { label: '"need a web developer"', href: li('"need a web developer"') },
      { label: '"recommend a developer"', href: li('"recommend a developer"') },
      { label: '"looking for a freelance developer"', href: li('"looking for a freelance developer"') },
    ],
  },
  {
    group: "Check by hand daily, then Quick add",
    note: "These sites block automatic checking.",
    links: [
      { label: "Craigslist LA: computer gigs", href: "https://losangeles.craigslist.org/search/cpg" },
      { label: "Craigslist LA: 'website' gigs", href: "https://losangeles.craigslist.org/search/ggg?query=website" },
      { label: "Wellfound: contract roles", href: "https://wellfound.com/jobs" },
      { label: "Indie Hackers: looking to partner", href: "https://www.indiehackers.com/" },
      { label: "Hacker News: Who is hiring", href: "https://news.ycombinator.com/submitted?id=whoishiring" },
      { label: "Nextdoor (LA)", href: "https://nextdoor.com/" },
    ],
  },
];

const TEMPLATES = [
  {
    title: "Someone asking for a developer",
    text: "Hey [Name], saw your post about [project]. We build exactly this kind of thing in Next.js/Supabase. Recently shipped [similar project]. What's the main thing you need done first? Happy to give a quick scope, no strings.",
  },
  {
    title: "Broken Lovable / Bolt / AI-built app",
    text: "Hey [Name], saw you're stuck on [issue]. We fix these a lot; it's usually [likely cause, e.g. Supabase RLS / env vars / deploy config]. Want us to take a quick look? We can usually tell you the fix in 10 minutes.",
  },
  {
    title: "Follow-up (once, after 3 days)",
    text: "Hey [Name], just checking in on [project]. Still happy to help if you haven't found someone. Is it still open?",
  },
];

export default async function PlaybookPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  if (user.role === "client") redirect("/dashboard/client");

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-slate-800">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Playbook</h1>
        <p className="text-sm text-slate-500">How we find clients: only people who publicly ask for help. No cold emails.</p>
      </header>

      <section className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <h2 className="font-semibold text-slate-900">Daily routine (about 1 hour, spread across the day)</h2>
        <ol className="mt-2 text-sm list-decimal pl-5 space-y-1">
          <li>Keep the <strong>Feed</strong> open. Reply to new posts within 1–2 hours; after that they already have 20+ replies.</li>
          <li>Start with <strong>Score 7+</strong>, then work down. Skip anything that doesn&apos;t fit.</li>
          <li>Edit the AI draft so it sounds like you, then <strong>Copy + open post</strong>, paste, send, and click <strong>Mark sent</strong>.</li>
          <li>Twice a day, run the manual searches below and use <strong>Quick add</strong> for anything good.</li>
          <li>Check <strong>Follow up due</strong> every morning: one short nudge, then close it.</li>
          <li>When someone answers, click <strong>They replied</strong> with a note. Abhi takes it from there.</li>
        </ol>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <h2 className="font-semibold text-slate-900">Rules</h2>
        <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
          <li>Every message is personal and about <em>their</em> post. Never paste the same message to many people.</li>
          <li>No prices, links or long pitches in the first message. End with one question.</li>
          <li>Stay under the daily limits shown on the Feed (protects the accounts from bans).</li>
          <li>Follow up once. If no answer, close it.</li>
          <li>Skip: equity-only or &quot;no budget&quot;, &quot;free test task first&quot;, anyone pushing to Telegram/WhatsApp right away, crypto payments, and clients based in India, Pakistan or Bangladesh.</li>
          <li>Never share account passwords outside the password manager.</li>
        </ul>
      </section>

      {SEARCHES.map((g) => (
        <section key={g.group} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
          <h2 className="font-semibold text-slate-900">{g.group}</h2>
          <p className="text-xs text-slate-500 mb-3">{g.note}</p>
          <div className="flex flex-wrap gap-2">
            {g.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50">
                {l.label} <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ))}
          </div>
        </section>
      ))}

      <section className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <h2 className="font-semibold text-slate-900">Message templates (when there&apos;s no AI draft)</h2>
        <div className="mt-3 space-y-3">
          {TEMPLATES.map((t) => (
            <div key={t.title}>
              <p className="text-sm font-medium">{t.title}</p>
              <p className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3 mt-1">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <h2 className="font-semibold text-slate-900">Communities to join and watch</h2>
        <p className="text-sm text-slate-600 mt-1">Discord: Lovable, Bolt, Supabase, Cursor and GoHighLevel servers (#jobs / #help). Facebook groups: &quot;SaaS Founders&quot;, &quot;Startup Founders&quot;, &quot;GoHighLevel Users&quot;, LA small-business groups. Use Quick add for anything you find there.</p>
      </section>
    </main>
  );
}
