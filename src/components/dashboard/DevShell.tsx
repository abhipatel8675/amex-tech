"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Package, LogOut } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/client";

const TABS = [
  { href: "/dashboard/dev", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/dev/leads", label: "Leads", icon: Users },
  { href: "/dashboard/dev/orders", label: "Orders", icon: Package },
];

// Shared header and page tabs for every /dashboard/dev page.
export default function DevShell({ children }: { children: React.ReactNode }) {
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
            <span className="hidden sm:inline text-xs bg-[#B8860B]/10 border border-[#B8860B]/20 text-[#7A5807] px-2 py-0.5 rounded-full">Dev</span>
          </div>
          <button onClick={signOut} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors">
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
        <nav className="max-w-5xl mx-auto px-6 flex gap-1 overflow-x-auto" aria-label="Dashboard pages">
          {TABS.map((tab) => {
            const active = tab.href === "/dashboard/dev" ? pathname === tab.href : pathname.startsWith(tab.href);
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
