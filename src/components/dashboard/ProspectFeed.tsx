"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { ExternalLink, Copy, Check, Send, SkipForward, RefreshCw, MessageSquareReply, Clock, Volume2, VolumeX, Sparkles, UserRound, Undo2, Ban } from "lucide-react";
import { PLATFORM_LABEL, PLATFORM_COLOR, PLATFORMS, type Platform, type Prospect } from "@/lib/prospects/types";
import {
  listProspects, markSent, markFollowedUp, markReplied, setProspectStatus, saveDraft, redraft,
  type FeedQuery, type FeedStats, type FeedView,
} from "@/app/dashboard/prospecting/actions";

const POLL_MS = 15000;
const VIEWS: { id: FeedView; label: string }[] = [
  { id: "new", label: "New posts" },
  { id: "followup", label: "Follow up due" },
  { id: "sent", label: "Sent" },
  { id: "replied", label: "Replied" },
  { id: "skipped", label: "Skipped / closed" },
];
const AGES = [{ h: 1, label: "1h" }, { h: 6, label: "6h" }, { h: 24, label: "24h" }, { h: 72, label: "3 days" }];

const inputCls = "bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#B8860B]/50";

function ago(iso: string | null) {
  if (!iso) return "";
  const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return h < 48 ? `${h}h ago` : `${Math.round(h / 24)}d ago`;
}

function readPref(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
function writePref(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function beep() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.06, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.25);
  } catch {}
}

function ScorePill({ score }: { score: number | null }) {
  if (score === null) return <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">unscored</span>;
  const color = score >= 7 ? "#16a34a" : score >= 4 ? "#CC9A1A" : "#94a3b8";
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full border" style={{ color, borderColor: `${color}55`, background: `${color}12` }}>
      {score}/10
    </span>
  );
}

function ProspectCard({ p, view, fresh, onDone, isDev }: { p: Prospect; view: FeedView; fresh: boolean; onDone: (msg?: string) => void; isDev: boolean }) {
  const [draft, setDraft] = useState(p.draft ?? "");
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState("");
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  const run = (fn: () => Promise<{ error?: string } | void>, okMsg?: string) =>
    start(async () => {
      setErr(null);
      const r = await fn();
      if (r && "error" in r && r.error) setErr(r.error);
      else onDone(okMsg);
    });

  const copyAndOpen = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
    window.open(p.url, "_blank", "noopener,noreferrer");
    if (draft !== (p.draft ?? "")) void saveDraft(p.id, draft);
  };

  const body = [p.title, p.body].filter(Boolean).join("\n\n");
  const long = body.length > 420;
  const color = PLATFORM_COLOR[p.platform];

  return (
    <article className={`bg-white border rounded-xl p-4 sm:p-5 transition-colors ${fresh ? "border-[#B8860B] ring-2 ring-[#B8860B]/15" : "border-slate-200"}`}>
      <header className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        {fresh && <span className="font-bold text-[#7A5807] bg-[#B8860B]/15 px-2 py-0.5 rounded-full">NEW</span>}
        <span className="font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: color }}>{PLATFORM_LABEL[p.platform]}</span>
        {p.community && <span>{p.community}</span>}
        {p.author && (
          <span className="flex items-center gap-1">
            <UserRound className="w-3.5 h-3.5" />
            {p.author_url ? <a href={p.author_url} target="_blank" rel="noopener noreferrer" className="hover:underline">{p.author}</a> : p.author}
          </span>
        )}
        <span>· {ago(p.posted_at ?? p.created_at)}</span>
        {p.origin === "manual" && <span className="px-2 py-0.5 rounded-full bg-slate-100">added by hand</span>}
        <span className="ml-auto"><ScorePill score={p.score} /></span>
      </header>

      {(p.ai?.need || p.ai?.budget) && (
        <p className="mt-3 text-sm text-slate-900">
          <Sparkles className="inline w-4 h-4 text-[#B8860B] mr-1 -mt-0.5" />
          <strong>{p.ai.need ?? "Need unclear"}</strong>
          {p.ai.budget && <span className="ml-2 text-green-700">Budget: {p.ai.budget}</span>}
          {p.ai.urgency === "high" && <span className="ml-2 text-red-600">Urgent</span>}
        </p>
      )}
      {p.ai?.reason && <p className="mt-1 text-xs text-slate-500">{p.ai.reason}</p>}

      <div className={`mt-3 text-sm text-slate-700 whitespace-pre-wrap break-words ${!expanded && long ? "line-clamp-6" : ""}`}>{body || "(no text)"}</div>
      {long && (
        <button onClick={() => setExpanded(!expanded)} className="mt-1 text-xs text-[#7A5807] hover:underline">
          {expanded ? "Show less" : "Show full post"}
        </button>
      )}

      {(view === "new" || view === "followup") && (
        <div className="mt-4">
          <label className="text-xs font-medium text-slate-600" htmlFor={`d-${p.id}`}>
            {view === "followup" ? "Your first message (send a short, friendly nudge in the same thread)" : "Reply (edit before sending)"}
          </label>
          <textarea id={`d-${p.id}`} value={draft} onChange={(e) => setDraft(e.target.value)} rows={4} className={`${inputCls} w-full mt-1`} placeholder={p.status === "new" && !p.draft ? "No draft yet. Write one or click Redraft." : ""} />
        </div>
      )}
      {view !== "new" && view !== "followup" && p.draft && <p className="mt-3 text-xs text-slate-500 whitespace-pre-wrap border-l-2 border-slate-200 pl-3">{p.draft}</p>}
      {p.notes && <p className="mt-2 text-xs text-slate-500 whitespace-pre-wrap">{p.notes}</p>}
      {view === "sent" && (
        <p className="mt-2 text-xs text-slate-500">Sent {ago(p.sent_at)}{p.sent_by ? ` by ${p.sent_by}` : ""} · follow up on {p.follow_up_at}{p.followed_up_at ? " (already followed up once)" : ""}</p>
      )}
      {view === "replied" && p.lead_id && <p className="mt-2 text-xs text-green-700">Moved to the leads pipeline{isDev ? "" : " for Abhi"}.</p>}

      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}

      <footer className="mt-4 flex flex-wrap gap-2">
        {(view === "new" || view === "followup") && (
          <button onClick={copyAndOpen} className="flex items-center gap-1.5 text-sm font-semibold text-white px-3.5 py-2 rounded-lg" style={{ background: "linear-gradient(135deg, #B8860B, #9C7208)" }}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copied, now paste & send" : "Copy + open post"}
          </button>
        )}
        {view !== "new" && view !== "followup" && (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-slate-700 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50">
            <ExternalLink className="w-4 h-4" /> Open post
          </a>
        )}
        {view === "new" && (
          <>
            <button disabled={pending} onClick={() => run(() => markSent(p.id, draft), "Marked as sent")} className="flex items-center gap-1.5 text-sm text-slate-700 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 disabled:opacity-50">
              <Send className="w-4 h-4" /> Mark sent
            </button>
            <button disabled={pending} onClick={() => run(() => setProspectStatus(p.id, "skipped"))} className="flex items-center gap-1.5 text-sm text-slate-500 px-3 py-2 rounded-lg hover:bg-slate-50 disabled:opacity-50">
              <SkipForward className="w-4 h-4" /> Skip
            </button>
            <button
              disabled={pending}
              onClick={() => start(async () => { setErr(null); const r = await redraft(p.id); if (r.error) setErr(r.error); else setDraft(r.draft ?? ""); })}
              className="flex items-center gap-1.5 text-sm text-slate-500 px-3 py-2 rounded-lg hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${pending ? "animate-spin" : ""}`} /> Redraft
            </button>
          </>
        )}
        {(view === "sent" || view === "followup") && (
          <>
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What did they say? (optional)" className={`${inputCls} flex-1 min-w-[180px]`} />
            <button disabled={pending} onClick={() => run(() => markReplied(p.id, note), "Moved to leads")} className="flex items-center gap-1.5 text-sm font-semibold text-green-700 border border-green-200 bg-green-50 px-3 py-2 rounded-lg disabled:opacity-50">
              <MessageSquareReply className="w-4 h-4" /> They replied
            </button>
            {view === "followup" && !p.followed_up_at && (
              <button disabled={pending} onClick={() => run(() => markFollowedUp(p.id), "Follow-up logged")} className="flex items-center gap-1.5 text-sm text-slate-700 border border-slate-200 px-3 py-2 rounded-lg disabled:opacity-50">
                <Clock className="w-4 h-4" /> Followed up
              </button>
            )}
            <button disabled={pending} onClick={() => run(() => setProspectStatus(p.id, "lost"))} className="flex items-center gap-1.5 text-sm text-slate-500 px-3 py-2 rounded-lg hover:bg-slate-50 disabled:opacity-50">
              <Ban className="w-4 h-4" /> No reply, close
            </button>
          </>
        )}
        {view === "skipped" && (
          <button disabled={pending} onClick={() => run(() => setProspectStatus(p.id, "new"))} className="flex items-center gap-1.5 text-sm text-slate-700 border border-slate-200 px-3 py-2 rounded-lg disabled:opacity-50">
            <Undo2 className="w-4 h-4" /> Back to feed
          </button>
        )}
      </footer>
    </article>
  );
}

export default function ProspectFeed({ isDev }: { isDev: boolean }) {
  const [q, setQ] = useState<FeedQuery>({ view: "new", platform: "all", maxAgeHours: 24, minScore: 0 });
  const [items, setItems] = useState<Prospect[]>([]);
  const [stats, setStats] = useState<FeedStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [fresh, setFresh] = useState<Set<string>>(new Set());
  const [sound, setSound] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const known = useRef<Set<string> | null>(null);
  const qRef = useRef(q);

  const load = useCallback(async (resetKnown = false) => {
    try {
      const r = await listProspects(qRef.current);
      if (resetKnown || !known.current) {
        known.current = new Set(r.items.map((i) => i.id));
      } else if (qRef.current.view === "new") {
        const added = r.items.filter((i) => !known.current!.has(i.id)).map((i) => i.id);
        if (added.length) {
          added.forEach((id) => known.current!.add(id));
          setFresh((prev) => new Set([...prev, ...added]));
          if (readPref("prospect-sound", "off") === "on") beep();
        }
      }
      setItems(r.items);
      setStats(r.stats);
      setSound(readPref("prospect-sound", "off") === "on");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the feed");
    } finally {
      setLoaded(true);
    }
  }, []);

  // Keep the poller reading the latest filters, then reload with them.
  useEffect(() => {
    qRef.current = q;
    void load(true);
  }, [q, load]);

  useEffect(() => {
    const t = setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, POLL_MS);
    return () => clearInterval(t);
  }, [load]);

  const done = (msg?: string) => {
    if (msg) {
      setToast(msg);
      setTimeout(() => setToast(null), 2500);
    }
    void load();
  };

  const capLine = stats
    ? (["reddit", "x", "linkedin", "hn", "bluesky", "jobboard"] as Platform[])
        .filter((p) => stats.caps[p])
        .map((p) => `${PLATFORM_LABEL[p]} ${stats.sentToday[p] ?? 0}/${stats.caps[p]}`)
        .join(" · ")
    : "";

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prospecting</h1>
          <p className="text-sm text-slate-500">People asking for a developer right now. Reply fast, reply personal. Updates every 15 seconds.</p>
        </div>
        <button
          onClick={() => { const next = !sound; setSound(next); writePref("prospect-sound", next ? "on" : "off"); if (next) beep(); }}
          className="flex items-center gap-1.5 text-sm text-slate-600 border border-slate-200 bg-white px-3 py-2 rounded-lg"
          aria-pressed={sound}
        >
          {sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />} Sound {sound ? "on" : "off"}
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { label: "Found today", value: stats.todayFound, sub: stats.waitingForAi ? `${stats.waitingForAi} being screened` : "screened by AI" },
            { label: "Sent today", value: Object.values(stats.sentToday).reduce((a, b) => a + (b ?? 0), 0), sub: capLine || "no caps set" },
            { label: "Replies today", value: stats.repliedToday, sub: `${stats.skippedToday} skipped` },
            { label: "Follow-ups due", value: stats.followUpsDue, sub: isDev ? `Apify $${stats.apifySpend.toFixed(2)} / $${stats.apifyBudget}` : "check the Follow up tab" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3">
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-[13px] text-slate-500 truncate">{s.sub}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-1 overflow-x-auto mb-3 border-b border-slate-200" role="tablist">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={q.view === v.id}
            onClick={() => { setFresh(new Set()); setQ({ ...q, view: v.id }); }}
            className={`px-3 py-2 text-sm whitespace-nowrap border-b-2 ${q.view === v.id ? "border-[#B8860B] text-slate-900 font-medium" : "border-transparent text-slate-500"}`}
          >
            {v.label}
            {v.id === "followup" && stats?.followUpsDue ? <span className="ml-1 text-xs text-[#7A5807]">({stats.followUpsDue})</span> : null}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <select value={q.platform} onChange={(e) => setQ({ ...q, platform: e.target.value as FeedQuery["platform"] })} className={inputCls} aria-label="Platform">
          <option value="all">All platforms</option>
          {PLATFORMS.map((p) => <option key={p} value={p}>{PLATFORM_LABEL[p]}</option>)}
        </select>
        {q.view === "new" && (
          <>
            <select value={q.maxAgeHours} onChange={(e) => setQ({ ...q, maxAgeHours: Number(e.target.value) })} className={inputCls} aria-label="Age">
              {AGES.map((a) => <option key={a.h} value={a.h}>Last {a.label}</option>)}
            </select>
            <select value={q.minScore} onChange={(e) => setQ({ ...q, minScore: Number(e.target.value) })} className={inputCls} aria-label="Minimum score">
              <option value={0}>Any score</option>
              <option value={4}>Score 4+</option>
              <option value={7}>Score 7+ (best)</option>
            </select>
          </>
        )}
        <button onClick={() => load()} className="flex items-center gap-1.5 text-sm text-slate-600 border border-slate-200 bg-white px-3 py-2 rounded-lg">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}

      <div className="space-y-3">
        {items.map((p) => (
          <ProspectCard key={p.id} p={p} view={q.view} fresh={fresh.has(p.id)} isDev={isDev} onDone={done} />
        ))}
        {loaded && !items.length && !error && (
          <p className="text-sm text-slate-500 bg-white border border-dashed border-slate-300 rounded-xl p-8 text-center">
            {q.view === "new" ? "Nothing new right now. New posts appear here automatically; meanwhile, check the Playbook for manual searches." : "Nothing here yet."}
          </p>
        )}
      </div>

      {isDev && stats && stats.lastRuns.length > 0 && (
        <p className="mt-6 text-xs text-slate-500">
          Last checks: {stats.lastRuns.map((r) => `${r.source} ${ago(r.created_at)} (${r.status === "failed" ? `failed: ${r.error ?? ""}` : r.status === "running" ? "running" : `${r.kept} new`})`).join(" · ")}
        </p>
      )}

      {toast && <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg">{toast}</div>}
    </main>
  );
}
