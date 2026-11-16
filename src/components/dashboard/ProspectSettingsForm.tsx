"use client";

import { useState, useTransition } from "react";
import { Save, Play, CheckCircle2, XCircle } from "lucide-react";
import { saveProspectSettings, runProspectTickNow } from "@/app/dashboard/prospecting/actions";
import { PLATFORM_LABEL, type Platform, type ProspectSettings } from "@/lib/prospects/types";

const inputCls = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#B8860B]/50";
const card = "bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3";
const CAP_PLATFORMS: Platform[] = ["reddit", "x", "linkedin", "hn", "bluesky", "jobboard", "facebook", "discord"];

function Key({ ok, label, hint }: { ok: boolean; label: string; hint: string }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      {ok ? <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> : <XCircle className="w-4 h-4 text-red-500 mt-0.5" />}
      <span><strong>{label}</strong>{ok ? "" : <span className="text-slate-500">: {hint}</span>}</span>
    </li>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-slate-500">{hint}</span>}
    </label>
  );
}

export default function ProspectSettingsForm({ settings: s, keys }: { settings: ProspectSettings; keys: { reddit: boolean; apify: boolean; nvidia: boolean; cron: boolean; sales: string[] } }) {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Prospect settings</h1>
        <p className="text-sm text-slate-500">What the tool watches, how often, and how much it may spend.</p>
      </header>

      <section className={card}>
        <h2 className="font-semibold text-slate-900">Setup checklist (Vercel environment variables)</h2>
        <ul className="space-y-1.5">
          <Key ok={keys.reddit} label="Reddit" hint="add REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET (reddit.com/prefs/apps → script app)" />
          <Key ok={keys.apify} label="Apify (X + LinkedIn)" hint="add APIFY_TOKEN, and set a $15 monthly limit in Apify → Settings → Usage" />
          <Key ok={keys.nvidia} label="Nemotron AI" hint="add NVIDIA_API_KEY (same key as FirmsLedger)" />
          <Key ok={keys.cron} label="Scheduler secret" hint="CRON_SECRET is missing" />
          <Key ok={keys.sales.length > 0} label={`Sales logins${keys.sales.length ? `: ${keys.sales.join(", ")}` : ""}`} hint="add SALES_EMAILS (comma-separated)" />
        </ul>
        <button
          type="button"
          disabled={pending}
          onClick={() => start(async () => { const r = await runProspectTickNow(); setMsg(r.error ? { ok: false, text: r.error } : { ok: true, text: r.summary ?? "Done" }); })}
          className="flex items-center gap-1.5 text-sm text-slate-700 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 disabled:opacity-50"
        >
          <Play className="w-4 h-4" /> {pending ? "Running…" : "Run a check now"}
        </button>
      </section>

      <form
        action={(fd) => start(async () => { const r = await saveProspectSettings(fd); setMsg(r.error ? { ok: false, text: r.error } : { ok: true, text: "Saved." }); })}
        className="space-y-5"
      >
        <section className={card}>
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <input type="checkbox" name="reddit_enabled" defaultChecked={s.reddit.enabled} /> Reddit <span className="text-xs font-normal text-slate-500">(free)</span>
          </h2>
          <Field label="Check every (minutes)"><input name="reddit_every" type="number" min={2} defaultValue={s.reddit.everyMin} className={inputCls} /></Field>
          <Field label="Subreddits (one per line)"><textarea name="reddit_subs" rows={6} defaultValue={s.reddit.subreddits.join("\n")} className={inputCls} /></Field>
          <Field label="Extra search across all of Reddit" hint="Reddit search syntax; quotes and OR work."><input name="reddit_search" defaultValue={s.reddit.search} className={inputCls} /></Field>
        </section>

        <section className={card}>
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <input type="checkbox" name="hn_enabled" defaultChecked={s.hn.enabled} /> Hacker News <span className="text-xs font-normal text-slate-500">(free, contract/freelance posts in &quot;Who is hiring?&quot;)</span>
          </h2>
          <Field label="Check every (minutes)"><input name="hn_every" type="number" min={5} defaultValue={s.hn.everyMin} className={inputCls} /></Field>
        </section>

        <section className={card}>
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <input type="checkbox" name="bsky_enabled" defaultChecked={s.bluesky.enabled} /> Bluesky <span className="text-xs font-normal text-slate-500">(free)</span>
          </h2>
          <Field label="Check every (minutes)"><input name="bsky_every" type="number" min={3} defaultValue={s.bluesky.everyMin} className={inputCls} /></Field>
          <Field label="Exact phrases to search (one per line)"><textarea name="bsky_queries" rows={4} defaultValue={s.bluesky.queries.join("\n")} className={inputCls} /></Field>
        </section>

        <section className={card}>
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <input type="checkbox" name="jobs_enabled" defaultChecked={s.jobs.enabled} /> Remote job boards <span className="text-xs font-normal text-slate-500">(free: RemoteOK, Remotive, We Work Remotely; contract / freelance / part-time dev roles only)</span>
          </h2>
          <Field label="Check every (minutes)"><input name="jobs_every" type="number" min={15} defaultValue={s.jobs.everyMin} className={inputCls} /></Field>
        </section>

        <section className={card}>
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <input type="checkbox" name="x_enabled" defaultChecked={s.x.enabled} /> X <span className="text-xs font-normal text-slate-500">(Apify, about ${s.x.pricePerItem}/tweet, {s.x.hoursPT[0]}:00–{s.x.hoursPT[1]}:00 PT)</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Check every (minutes)"><input name="x_every" type="number" min={15} defaultValue={s.x.everyMin} className={inputCls} /></Field>
            <Field label="Tweets per check"><input name="x_max" type="number" min={10} defaultValue={s.x.maxItems} className={inputCls} /></Field>
          </div>
          <Field label="Search query" hint="X search syntax. One combined query keeps the cost down."><textarea name="x_query" rows={3} defaultValue={s.x.query} className={inputCls} /></Field>
        </section>

        <section className={card}>
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <input type="checkbox" name="li_enabled" defaultChecked={s.linkedin.enabled} /> LinkedIn <span className="text-xs font-normal text-slate-500">(Apify, about ${s.linkedin.pricePerItem}/post, weekdays {s.linkedin.hoursPT[0]}:00–{s.linkedin.hoursPT[1]}:00 PT)</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Check every (minutes)"><input name="li_every" type="number" min={30} defaultValue={s.linkedin.everyMin} className={inputCls} /></Field>
            <Field label="Posts per check"><input name="li_max" type="number" min={5} defaultValue={s.linkedin.maxPosts} className={inputCls} /></Field>
          </div>
          <Field label="Searches (one per line)"><textarea name="li_queries" rows={3} defaultValue={s.linkedin.queries.join("\n")} className={inputCls} /></Field>
        </section>

        <section className={card}>
          <h2 className="font-semibold text-slate-900">Filters</h2>
          <Field label="Keywords: a post needs at least one (one per line)"><textarea name="keywords" rows={6} defaultValue={s.keywords.join("\n")} className={inputCls} /></Field>
          <Field label="Exclude: drop posts containing any of these"><textarea name="exclude" rows={4} defaultValue={s.exclude.join("\n")} className={inputCls} /></Field>
          <Field label="Projects the AI may mention in replies (one per line, real ones only)"><textarea name="projects" rows={5} defaultValue={s.projects.join("\n")} className={inputCls} /></Field>
        </section>

        <section className={card}>
          <h2 className="font-semibold text-slate-900">Budget and limits</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Monthly Apify budget (USD)" hint="X and LinkedIn pause when reached. Reddit and HN keep running."><input name="budget" type="number" step="1" min={0} defaultValue={s.monthlyBudgetUsd} className={inputCls} /></Field>
            <Field label="Follow up after (days)"><input name="follow_up_days" type="number" min={1} defaultValue={s.followUpDays} className={inputCls} /></Field>
          </div>
          <p className="text-xs text-slate-500">Daily sending limits per platform (0 = no limit)</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CAP_PLATFORMS.map((p) => (
              <Field key={p} label={PLATFORM_LABEL[p]}><input name={`cap_${p}`} type="number" min={0} defaultValue={s.dailyCaps[p] ?? 0} className={inputCls} /></Field>
            ))}
          </div>
        </section>

        {msg && <p className={`text-sm ${msg.ok ? "text-green-700" : "text-red-600"}`}>{msg.text}</p>}
        <button disabled={pending} className="flex items-center gap-1.5 text-white font-semibold px-5 py-2.5 rounded-lg text-sm disabled:opacity-50" style={{ background: "linear-gradient(135deg, #B8860B, #9C7208)" }}>
          <Save className="w-4 h-4" /> Save settings
        </button>
      </form>
    </main>
  );
}
