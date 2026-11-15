import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";

// Shared shell for the short policy pages (refund, delivery). Same look as /terms.

export const LEGAL_EMAIL = "abhi@amextech.org";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="bg-white text-[#1a211d] min-h-screen">
      <Navbar />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: title }]} />
        <section className="pt-8 pb-10 max-w-[92rem] mx-auto px-6">
          <p className="text-sm font-semibold text-[#7A5807] uppercase tracking-widest mb-5">Legal</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">{title}</h1>
          <p className="text-[#4d554b] text-base leading-7">
            Last updated: <span className="text-[#3d453b]">{updated}</span>
          </p>
        </section>
        <article className="pb-28 max-w-[92rem] mx-auto px-6">
          <div className="border-t border-[#dadcd1] pt-10 flex flex-col gap-12">
            {children}
            <div className="pt-4 border-t border-[#dadcd1]">
              <p className="text-sm text-[#4d554b]">
                Also see our{" "}
                <Link href="/terms" className="text-[#7A5807]">Terms of Service</Link>,{" "}
                <Link href="/privacy" className="text-[#7A5807]">Privacy Policy</Link>,{" "}
                <Link href="/refund-policy" className="text-[#7A5807]">Refund &amp; Cancellation Policy</Link> and{" "}
                <Link href="/delivery-policy" className="text-[#7A5807]">Delivery Policy</Link>.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-4 scroll-mt-24">
      <h2 className="text-xl font-bold text-[#1a211d]" style={{ letterSpacing: "-0.015em" }}>{title}</h2>
      <div className="flex flex-col gap-4 text-base leading-8 text-[#4d554b] [&_strong]:text-[#3d453b] [&_a]:underline-offset-2 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:marker:text-[#7A5807]">
        {children}
      </div>
    </section>
  );
}

export function ContactBlock() {
  return (
    <div className="mt-2 p-6 rounded-2xl border border-[#dadcd1] bg-[#f7f6f2] text-sm leading-7 text-[#3d453b]">
      <p className="font-semibold text-[#1a211d] mb-1">Amex Technology</p>
      <p>
        Email: <a href={`mailto:${LEGAL_EMAIL}`} className="text-[#7A5807]">{LEGAL_EMAIL}</a>
      </p>
      <p>Website: amextechnology.com</p>
      <p>Country: India</p>
    </div>
  );
}
