"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { PlusCircle, Bookmark } from "lucide-react";
import { addManualProspect } from "@/app/dashboard/prospecting/actions";
import { PLATFORMS, PLATFORM_LABEL, platformFromUrl, type Platform } from "@/lib/prospects/types";

const inputCls = "w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#B8860B]/50";

// For posts found by hand (Discord, Slack, Nextdoor, Craigslist, Facebook…).
// The AI still scores it and drafts a reply; it lands in the feed within a few minutes.
export default function QuickAddForm({ initial }: { initial: { url: string; body: string; title: string } }) {
  const [url, setUrl] = useState(initial.url);
  const [platform, setPlatform] = useState<Platform>(initial.url ? platformFromUrl(initial.url) : "other");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const bookmarkRef = useRef<HTMLAnchorElement>(null);

  // React 19 refuses javascript: URLs in JSX, so the bookmarklet href is set directly.
  useEffect(() => {
    const origin = window.location.origin;
    bookmarkRef.current?.setAttribute(
      "href",
      `javascript:(()=>{const s=String(getSelection()).slice(0,3000);window.open('${origin}/dashboard/sales/add?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title.slice(0,200))+'&text='+encodeURIComponent(s),'_blank')})()`,
    );
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-bold text-slate-900">Quick add</h1>
      <p className="text-sm text-slate-500 mb-5">Found someone asking for a developer by hand? Paste it here. The AI scores it, drafts a reply, and it shows up in the feed in a few minutes.</p>

      <form
        action={(fd) =>
          start(async () => {
            const r = await addManualProspect(fd);
            setMsg(r.error ? { ok: false, text: r.error } : { ok: true, text: "Added. It will appear in the feed with a drafted reply shortly." });
          })
        }
        className="space-y-3 bg-white border border-slate-200 rounded-xl p-4 sm:p-5"
      >
        <div>
          <label className="text-xs font-medium text-slate-600" htmlFor="qa-url">Post link *</label>
          <input id="qa-url" name="url" required value={url} onChange={(e) => { setUrl(e.target.value); setPlatform(platformFromUrl(e.target.value)); }} placeholder="https://..." className={inputCls} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-600" htmlFor="qa-platform">Platform</label>
            <select id="qa-platform" name="platform" value={platform} onChange={(e) => setPlatform(e.target.value as Platform)} className={inputCls}>
              {PLATFORMS.map((p) => <option key={p} value={p}>{PLATFORM_LABEL[p]}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600" htmlFor="qa-community">Group / server / channel</label>
            <input id="qa-community" name="community" placeholder="e.g. Lovable Discord #jobs" className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600" htmlFor="qa-author">Who posted it</label>
            <input id="qa-author" name="author" placeholder="Name or handle" className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600" htmlFor="qa-author-url">Their profile link</label>
            <input id="qa-author-url" name="author_url" placeholder="https://..." className={inputCls} />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600" htmlFor="qa-title">Title</label>
          <input id="qa-title" name="title" defaultValue={initial.title} className={inputCls} />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600" htmlFor="qa-body">Post text *</label>
          <textarea id="qa-body" name="body" required rows={6} defaultValue={initial.body} placeholder="Paste what they wrote" className={inputCls} />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600" htmlFor="qa-notes">Notes</label>
          <input id="qa-notes" name="notes" placeholder="Anything useful (budget mentioned in comments, etc.)" className={inputCls} />
        </div>
        {msg && <p className={`text-sm ${msg.ok ? "text-green-700" : "text-red-600"}`}>{msg.text}</p>}
        <button disabled={pending} className="flex items-center gap-1.5 text-white font-semibold px-5 py-2.5 rounded-lg text-sm disabled:opacity-50" style={{ background: "linear-gradient(135deg, #B8860B, #9C7208)" }}>
          <PlusCircle className="w-4 h-4" /> {pending ? "Adding…" : "Add to feed"}
        </button>
      </form>

      <section className="mt-6 bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
        <h2 className="font-semibold text-slate-900 flex items-center gap-1.5"><Bookmark className="w-4 h-4" /> One-click bookmarklet</h2>
        <p className="text-sm text-slate-600 mt-1">Drag this button to your bookmarks bar. On any post, select the post text, then click the bookmark: this form opens already filled in.</p>
        <a ref={bookmarkRef} onClick={(e) => e.preventDefault()} className="inline-block mt-3 text-sm font-semibold text-[#7A5807] border border-[#B8860B]/40 bg-[#B8860B]/10 px-3 py-2 rounded-lg cursor-move">
          + Add to Amex feed
        </a>
      </section>
    </main>
  );
}
