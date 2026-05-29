"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Zap, LogOut, Package, Clock, CheckCircle, AlertCircle, Download } from "lucide-react";
import type { User } from "@supabase/supabase-js";

type Order = {
  id: string;
  service: string;
  package_name: string;
  price: number;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  project_details: string | null;
  deliverable_url: string | null;
  created_at: string;
};

const STATUS = {
  pending: { label: "Pending Details", color: "#f59e0b", icon: Clock },
  in_progress: { label: "In Progress", color: "#60a5fa", icon: Package },
  completed: { label: "Completed", color: "#818CF8", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "#ef4444", icon: AlertCircle },
};

function OrderCard({ order, onSubmitDetails }: { order: Order; onSubmitDetails: (id: string, details: string) => void }) {
  const [showForm, setShowForm] = useState(false);
  const [details, setDetails] = useState(order.project_details || "");
  const [saving, setSaving] = useState(false);
  const s = STATUS[order.status];
  const Icon = s.icon;

  const submit = async () => {
    setSaving(true);
    await onSubmitDetails(order.id, details);
    setSaving(false);
    setShowForm(false);
  };

  return (
    <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#2f2f2f] transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-base">{order.service}</h3>
          <p className="text-sm text-[#6b7280]">{order.package_name} — ${order.price}</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: `${s.color}40`, color: s.color, background: `${s.color}10` }}>
          <Icon className="w-3 h-3" />
          {s.label}
        </div>
      </div>

      <p className="text-xs text-[#6b7280] mb-4">
        Ordered {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </p>

      {order.status === "pending" && !order.project_details && (
        !showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-2 text-sm bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-all"
          >
            Submit Project Details
          </button>
        ) : (
          <div className="space-y-3">
            <textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe your project — what needs to be built or fixed, your tech stack, deadline, any relevant links..."
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#3f3f3f] focus:outline-none focus:border-indigo-500/50 resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={submit}
                disabled={saving || !details}
                className="flex-1 py-2 text-sm text-white font-semibold rounded-lg disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
              >
                {saving ? "Saving..." : "Submit"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-[#1f1f1f] rounded-lg hover:border-[#2f2f2f] text-[#6b7280]">
                Cancel
              </button>
            </div>
          </div>
        )
      )}

      {order.project_details && (
        <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-3 mb-3">
          <p className="text-xs text-[#6b7280] mb-1">Your project details:</p>
          <p className="text-sm text-[#9ca3af]">{order.project_details}</p>
        </div>
      )}

      {order.deliverable_url && (
        <a
          href={order.deliverable_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 w-full py-2 text-sm bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-all justify-center"
        >
          <Download className="w-4 h-4" /> Download Deliverable
        </a>
      )}
    </div>
  );
}

export default function ClientDashboard({ user, orders }: { user: User; orders: Order[] }) {
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const submitDetails = async (orderId: string, details: string) => {
    const supabase = createClient();
    await supabase.from("orders").update({ project_details: details }).eq("id", orderId);
    router.refresh();
  };

  const stats = {
    total: orders.length,
    active: orders.filter(o => o.status === "in_progress").length,
    completed: orders.filter(o => o.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#1f1f1f] bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            Amex<span className="text-indigo-400">Technology</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#6b7280] hidden sm:block">{user.email}</span>
            <button onClick={signOut} className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">My Orders</h1>
          <p className="text-[#6b7280]">Track your projects and submit details.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Orders", value: stats.total, color: "#ededed" },
            { label: "In Progress", value: stats.active, color: "#60a5fa" },
            { label: "Completed", value: stats.completed, color: "#818CF8" },
          ].map((s) => (
            <div key={s.label} className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-sm text-[#6b7280]">{s.label}</div>
            </div>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] border border-[#1f1f1f] rounded-2xl">
            <Package className="w-12 h-12 text-[#2f2f2f] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-[#6b7280] mb-6">Purchase a service to get started.</p>
            <a
              href="/services"
              className="text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
            >
              Browse Services
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onSubmitDetails={submitDetails} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
