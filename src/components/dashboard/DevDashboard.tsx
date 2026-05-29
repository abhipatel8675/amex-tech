"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Zap, LogOut, Package, Clock, CheckCircle, AlertCircle, DollarSign, Users, TrendingUp, ExternalLink } from "lucide-react";
import type { User } from "@supabase/supabase-js";

type Order = {
  id: string;
  client_email: string;
  service: string;
  package_name: string;
  price: number;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  project_details: string | null;
  deliverable_url: string | null;
  created_at: string;
};

const STATUSES = ["pending", "in_progress", "completed", "cancelled"] as const;

const STATUS_META = {
  pending: { label: "Pending", color: "#f59e0b", icon: Clock },
  in_progress: { label: "In Progress", color: "#60a5fa", icon: Package },
  completed: { label: "Completed", color: "#818CF8", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "#ef4444", icon: AlertCircle },
};

function OrderRow({ order, onUpdate }: { order: Order; onUpdate: (id: string, status: string, url: string) => Promise<void> }) {
  const [status, setStatus] = useState(order.status);
  const [deliverableUrl, setDeliverableUrl] = useState(order.deliverable_url || "");
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const s = STATUS_META[status];
  const Icon = s.icon;

  const save = async () => {
    setSaving(true);
    await onUpdate(order.id, status, deliverableUrl);
    setSaving(false);
  };

  return (
    <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden hover:border-[#2f2f2f] transition-all">
      <div
        className="flex items-center justify-between p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border flex-shrink-0" style={{ borderColor: `${s.color}40`, color: s.color, background: `${s.color}10` }}>
            <Icon className="w-3 h-3" />
            {s.label}
          </div>
          <div>
            <p className="font-semibold text-sm">{order.service} — {order.package_name}</p>
            <p className="text-xs text-[#6b7280]">{order.client_email}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-bold text-indigo-400">${order.price}</p>
          <p className="text-xs text-[#6b7280]">{new Date(order.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-[#1f1f1f] pt-4 space-y-4">
          {order.project_details ? (
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-3">
              <p className="text-xs text-[#6b7280] mb-1">Client project details:</p>
              <p className="text-sm text-[#9ca3af]">{order.project_details}</p>
            </div>
          ) : (
            <p className="text-sm text-[#f59e0b]">⚠ Client has not submitted project details yet.</p>
          )}

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#6b7280] mb-1.5 block">Update Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as typeof status)}
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{STATUS_META[s].label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#6b7280] mb-1.5 block">Deliverable URL (GitHub / Drive / Live)</label>
              <input
                value={deliverableUrl}
                onChange={(e) => setDeliverableUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#3f3f3f] focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {order.deliverable_url && (
              <a href={order.deliverable_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" /> View Deliverable
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DevDashboard({ user, orders }: { user: User; orders: Order[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("all");

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const updateOrder = async (id: string, status: string, deliverableUrl: string) => {
    const supabase = createClient();
    await supabase.from("orders").update({ status, deliverable_url: deliverableUrl || null }).eq("id", id);
    router.refresh();
  };

  const totalRevenue = orders.filter(o => o.status === "completed").reduce((sum, o) => sum + o.price, 0);
  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-[#1f1f1f] bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 font-bold">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              Amex<span className="text-indigo-400">Technology</span>
            </a>
            <span className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">Dev</span>
          </div>
          <button onClick={signOut} className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Developer Dashboard</h1>
          <p className="text-[#6b7280]">Manage all client orders.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: orders.length, color: "#ededed", icon: Package },
            { label: "Active", value: orders.filter(o => o.status === "in_progress").length, color: "#60a5fa", icon: TrendingUp },
            { label: "Completed", value: orders.filter(o => o.status === "completed").length, color: "#818CF8", icon: CheckCircle },
            { label: "Revenue", value: `$${totalRevenue}`, color: "#818CF8", icon: DollarSign },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4">
                <Icon className="w-4 h-4 text-[#6b7280] mb-2" />
                <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-[#6b7280]">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", ...STATUSES].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm px-3 py-1.5 rounded-lg border transition-all ${
                filter === f
                  ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                  : "border-[#1f1f1f] text-[#6b7280] hover:border-[#2f2f2f]"
              }`}
            >
              {f === "all" ? "All" : STATUS_META[f as keyof typeof STATUS_META].label}
              {" "}({f === "all" ? orders.length : orders.filter(o => o.status === f).length})
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] border border-[#1f1f1f] rounded-2xl">
            <Users className="w-12 h-12 text-[#2f2f2f] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-[#6b7280]">Orders will appear here after clients purchase.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <OrderRow key={order.id} order={order} onUpdate={updateOrder} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
