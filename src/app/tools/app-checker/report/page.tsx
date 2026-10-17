import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { Wrench } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { scanApp, type Finding, type Severity } from "@/lib/appChecker/scan";
import { APP_CHECKER, appCheckerFixHref } from "@/data/appChecker";

export const maxDuration = 60;

export const metadata: Metadata = {
  title: "Your App Checker Report | Amex Technology",
  robots: { index: false, follow: false },
};

const SEVERITY_STYLE: Record<Severity, string> = {
  critical: "bg-red-50 text-red-700 border-red-200",
  high: "bg-orange-50 text-orange-700 border-orange-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-slate-50 text-slate-600 border-slate-200",
};

const CATEGORY_LABEL: Record<Finding["category"], string> = {
  security: "Security",
  seo: "SEO & AI search",
  performance: "Speed",
  reliability: "Reliability",
};

// The Stripe Checkout session id in the URL is the access token for the report:
// we only scan and show the full findings once Stripe says that session is paid.
async function paidUrl(sessionId: string): Promise<{ url?: string; error?: string }> {
  if (!process.env.STRIPE_SECRET_KEY) return { error: "Payments aren't set up yet." };
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return { error: "This report link isn't valid." };
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return { error: "We haven't received payment for this report yet." };
    if (session.metadata?.service !== APP_CHECKER.productName || !session.metadata?.url) return { error: "This report link isn't valid." };
    return { url: session.metadata.url };
  } catch {
    return { error: "We couldn't verify this report link." };
  }
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-6">{children}</main>
      <Footer />
    </div>
  );
}

export default async function ReportPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { session_id } = await searchParams;
  const { url, error } = await paidUrl(typeof session_id === "string" ? session_id : "");

  if (error || !url) {
    return (
      <Shell>
        <h1 className="text-3xl font-bold mb-4">Report unavailable</h1>
        <p className="text-slate-600 mb-6">{error}</p>
        <p className="text-slate-600">
          If you&apos;ve paid and still see this, <Link href="/contact" className="text-[#806010] font-semibold hover:underline">contact us</Link> and we&apos;ll send your report by email.
        </p>
      </Shell>
    );
  }

  let result;
  try {
    result = await scanApp(url);
  } catch {
    return (
      <Shell>
        <h1 className="text-3xl font-bold mb-4">We couldn&apos;t reach {new URL(url).hostname} right now</h1>
        <p className="text-slate-600 mb-6">Your payment is confirmed. Refresh this page in a minute to try again. This link keeps working.</p>
        <p className="text-slate-600">
          Still stuck? <Link href="/contact" className="text-[#806010] font-semibold hover:underline">Contact us</Link> and we&apos;ll email the report.
        </p>
      </Shell>
    );
  }

  const grouped = (Object.keys(CATEGORY_LABEL) as Finding["category"][])
    .map((cat) => ({ cat, items: result.findings.filter((f) => f.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <Shell>
      <p className="text-sm font-semibold text-[#806010] uppercase tracking-wider mb-3">App Checker full report</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-2 break-all">{new URL(result.finalUrl).hostname}</h1>
      <p className="text-slate-500 mb-8">
        Checked {new Date(result.scannedAt).toUTCString()}. Bookmark this page: the link keeps working and re-checks your app each
        time you open it, so you can confirm your fixes.
      </p>

      <div className="grid sm:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-500">Score</p>
          <p className="text-3xl font-bold">
            {result.score} <span className="text-base text-slate-500">/ 100 ({result.grade})</span>
          </p>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-500">Issues</p>
          <p className="text-3xl font-bold">{result.findings.length}</p>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-500">Server response</p>
          <p className="text-3xl font-bold">{(result.stats.htmlMs / 1000).toFixed(1)}s</p>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-500">JavaScript</p>
          <p className="text-3xl font-bold">{result.stats.jsKb} KB</p>
        </div>
      </div>

      {result.stack.length > 0 && <p className="text-slate-600 mb-10">Built with: {result.stack.join(", ")}</p>}

      {result.findings.length === 0 && <p className="text-lg text-slate-700 mb-10">We didn&apos;t find any problems. Your app passed every check.</p>}

      {grouped.map(({ cat, items }) => (
        <section key={cat} className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{CATEGORY_LABEL[cat]}</h2>
          <div className="space-y-4">
            {items.map((f) => (
              <article key={f.id} className="p-6 rounded-2xl border border-slate-200 bg-white">
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md border mb-3 ${SEVERITY_STYLE[f.severity]}`}>{f.severity}</span>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-600 mb-3 leading-relaxed">{f.detail}</p>
                {f.evidence && f.evidence.length > 0 && (
                  <ul className="mb-3 space-y-1">
                    {f.evidence.map((e) => (
                      <li key={e} className="text-sm font-mono text-slate-500 break-all">
                        {e}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong>How to fix:</strong> {f.fix}
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}

      {result.findings.length > 0 && (
        <div className="p-8 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06]">
          <h2 className="text-2xl font-bold mb-2">Want us to fix these for you?</h2>
          <p className="text-slate-600 mb-6">A senior developer can fix most of these within 24 hours. Send us the report and we&apos;ll quote it for free.</p>
          <Link
            href={appCheckerFixHref(result.finalUrl, result.findings.length)}
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all btn-glow"
            style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B89225 100%)" }}
          >
            <Wrench className="w-4 h-4" /> Get a free fix quote
          </Link>
        </div>
      )}
    </Shell>
  );
}
