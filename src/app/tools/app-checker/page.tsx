import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AppChecker from "@/components/tools/AppChecker";

const title = "Free App Checker for Lovable, Bolt & AI-Built Apps";
const description =
  "Check an app built with Lovable, Bolt, Replit or v0 for security problems, search visibility problems and slow loading. Free score in 30 seconds.";
const pageUrl = "https://amextechnology.com/tools/app-checker";

export const metadata: Metadata = {
  title: { absolute: `${title} | Amex Technology` },
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: `${title} | Amex Technology`, description, url: pageUrl },
  twitter: { title: `${title} | Amex Technology`, description },
};

const checks = [
  {
    heading: "Security",
    items: [
      "Private passwords and keys accidentally visible to anyone who visits your site",
      "Database master keys left exposed on your public site",
      "Database access that isn't properly restricted",
      "Files that reveal how your app is built",
      "Secure connection (HTTPS) and missing security settings",
    ],
  },
  {
    heading: "SEO & AI search",
    items: [
      "Pages that look empty to Google and AI search tools",
      "Placeholder page titles like “Lovable App”",
      "Missing page descriptions, social sharing previews and main headings",
      "A “do not show in Google” setting left on from testing",
      "Missing site map and pages that wrongly look like errors",
    ],
  },
  {
    heading: "Speed",
    items: ["How quickly your site responds", "How much your homepage has to download", "File compression"],
  },
];

const faq = [
  {
    question: "Is the check really free?",
    answer:
      "Yes. The check gives you a score and the three most serious problems on screen, and you can get the full report with every issue, where we found it and how to fix it, free by email.",
  },
  {
    question: "Do you access my database or log in to my app?",
    answer:
      "No. We only look at what any visitor's browser can see on your public homepage. We never log in, send data to your database or try hidden pages.",
  },
  {
    question: "Which apps does it work with?",
    answer:
      "Any public website. It's tuned for apps built with Lovable, Bolt.new, Replit, v0, Cursor and other AI app builders, and for apps that use Supabase or Firebase.",
  },
  {
    question: "Why does an exposed database master key matter so much?",
    answer:
      "A master key bypasses all the protections on your database. Anyone who copies it from your site can read, change or delete all of your data. If the check finds one, replace it immediately.",
  },
  {
    question: "Can you fix the problems for me?",
    answer: "Yes. Our developers fix most of these issues within 24 hours. Use the “have us fix everything” link after your check, or visit our 24-hour bug fix page.",
  },
];

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Vibe-Coded App Checker",
  url: pageUrl,
  description,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free check and full report by email" },
  provider: { "@type": "Organization", name: "Amex Technology", url: "https://amextechnology.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://amextechnology.com" },
    { "@type": "ListItem", position: 2, name: "App Checker", item: pageUrl },
  ],
};

export default async function AppCheckerPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { url } = await searchParams;
  const initialUrl = typeof url === "string" ? url.slice(0, 300) : "";

  return (
    <div className="bg-[#f7f6f2] text-[#1a211d] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "App Checker" }]} />

        <section className="pt-8 pb-10 max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-wider mb-4">Free tool</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Is your AI-built app leaking keys or invisible on Google?
          </h1>
          <p className="text-[#3d453b] text-xl leading-8 mb-8">
            Paste your Lovable, Bolt, Replit or v0 app&apos;s address. In about 30 seconds you&apos;ll get a security, SEO and speed score, and the
            problems that need fixing first.
          </p>
          <AppChecker initialUrl={initialUrl} />
        </section>

        <section className="pb-12 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">What we check</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {checks.map((group) => (
              <div key={group.heading} className="p-6 rounded-2xl border border-[#dadcd1] bg-[#f7f6f2]">
                <h3 className="text-lg font-semibold mb-3">{group.heading}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-[#3d453b] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-24 max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Questions</h2>
          <div className="space-y-4">
            {faq.map((q) => (
              <div key={q.question} className="p-6 rounded-2xl border border-[#dadcd1] bg-[#f7f6f2]">
                <h3 className="font-semibold mb-2">{q.question}</h3>
                <p className="text-[#4d554b] leading-relaxed">{q.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[#3d453b]">
            Already know what&apos;s broken?{" "}
            <Link href="/fix" className="font-semibold text-[#7A5807] hover:underline">
              Get it fixed in 24 hours
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
