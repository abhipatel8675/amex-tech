"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Send, Package, LogOut, MailCheck, Mail, ArrowLeft, MapPin, UserSearch } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/client";

const TABS = [
  { href: "/dashboard/dev", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/dev/leads", label: "Leads", icon: Users },
  { href: "/dashboard/dev/emails", label: "Emails", icon: Mail },
  { href: "/dashboard/dev/outreach", label: "Outreach", icon: Send },
  { href: "/dashboard/dev/queue", label: "Queue", icon: MailCheck },
  { href: "/dashboard/dev/cold-leads", label: "Cold leads", icon: UserSearch },
  { href: "/dashboard/dev/lead-sources", label: "Lead sources", icon: MapPin },
  { href: "/dashboard/dev/orders", label: "Orders", icon: Package },
];

// Sidebar on desktop, scrolling tab bar on phones, for every /dashboard/dev page.
export default function DevShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string) => (href === "/dashboard/dev" ? pathname === href : pathname.startsWith(href));

  const signOut = async () => {
    await createClient().auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 md:pl-60">
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-60 flex-col bg-[#0F172A] text-slate-300">
        <Link href="/" aria-label="Amex Technology home" className="flex items-center gap-2 px-5 h-16 border-b border-white/10">
          <Logo markSize={28} textClassName="text-base !text-white" />
        </Link>
        <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Dashboard pages">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-[#B8860B]/15 text-[#F5C451]" : "hover:bg-white/5 hover:text-white"}`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/5 hover:text-white"><ArrowLeft className="w-4 h-4" /> Back to site</Link>
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/5 hover:text-white"><LogOut className="w-4 h-4" /> Sign out</button>
        </div>
      </aside>

      <header className="md:hidden sticky top-0 z-50 bg-[#0F172A] text-slate-300">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" aria-label="Amex Technology home"><Logo markSize={26} textClassName="text-base !text-white" /></Link>
          <button onClick={signOut} aria-label="Sign out" className="p-2 rounded-lg hover:bg-white/5"><LogOut className="w-4 h-4" /></button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-2 pb-2" aria-label="Dashboard pages">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.href);
            return (
              <Link key={tab.href} href={tab.href} aria-current={active ? "page" : undefined} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${active ? "bg-[#B8860B]/20 text-[#F5C451]" : "hover:bg-white/5"}`}>
                <Icon className="w-4 h-4" /> {tab.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {children}
    </div>
  );
}
