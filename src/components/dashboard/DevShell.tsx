"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Send, Package, LogOut, Radar, BookOpen, PlusCircle, Settings } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/client";

const TABS = {
  dev: [
    { href: "/dashboard/dev", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/dev/leads", label: "Leads", icon: Users },
    { href: "/dashboard/dev/prospecting", label: "Prospecting", icon: Radar },
    { href: "/dashboard/dev/outreach", label: "Outreach", icon: Send },
    { href: "/dashboard/dev/orders", label: "Orders", icon: Package },
    { href: "/dashboard/dev/prospecting/settings", label: "Prospect settings", icon: Settings },
  ],
  sales: [
    { href: "/dashboard/sales", label: "Feed", icon: Radar },
    { href: "/dashboard/sales/add", label: "Quick add", icon: PlusCircle },
    { href: "/dashboard/sales/playbook", label: "Playbook", icon: BookOpen },
  ],
};

// Shared header and page tabs for every /dashboard/dev and /dashboard/sales page.
export default function DevShell({ children, variant = "dev" }: { children: React.ReactNode; variant?: "dev" | "sales" }) {
  const tabs = TABS[variant];
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await createClient().auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" aria-label="Amex Technology home">
              <Logo markSize={32} textClassName="text-lg" />
            </Link>
            <span className="hidden sm:inline text-xs bg-[#B8860B]/10 border border-[#B8860B]/20 text-[#7A5807] px-2 py-0.5 rounded-full">{variant === "dev" ? "Dev" : "Sales"}</span>
          </div>
          <button onClick={signOut} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors">
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
        <nav className="max-w-5xl mx-auto px-6 flex gap-1 overflow-x-auto" aria-label="Dashboard pages">
          {tabs.map((tab) => {
            // Exact match unless no other tab is a longer match for this path.
            const best = tabs.filter((t) => pathname === t.href || pathname.startsWith(`${t.href}/`)).sort((a, b) => b.href.length - a.href.length)[0];
            const active = best?.href === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  active ? "border-[#B8860B] text-slate-900" : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
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
