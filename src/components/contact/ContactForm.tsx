"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const services = [
  "Custom Website Development",
  "Web Application Development",
  "Mobile App Development",
  "SaaS Development",
  "API Development & Integration",
  "Backend Development",
  "DevOps & Deployment",
  "UI/UX Design",
  "Maintenance & Support",
  "Other / Not Sure",
];

const budgets = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
];

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setBudget = (budget: string) =>
    setForm((prev) => ({ ...prev, budget }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fullMessage = [
      form.message,
      form.company ? `Company: ${form.company}` : "",
      form.budget ? `Budget: ${form.budget}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.service || "Not specified",
          message: fullMessage,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please email us directly at contact@amextechnology.com");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-[#00dc82]/10 border border-[#00dc82]/20 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-[#00dc82]" />
        </div>
        <h3 className="text-xl font-bold text-white">Message Sent</h3>
        <p className="text-sm text-[#555] max-w-xs">
          We'll review your project and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#555] mb-2">
            Name <span className="text-[#00dc82]">*</span>
          </label>
          <input
            required
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00dc82]/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-[#555] mb-2">
            Email <span className="text-[#00dc82]">*</span>
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@company.com"
            className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00dc82]/40 transition-colors"
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label className="block text-xs text-[#555] mb-2">Company / Project Name</label>
        <input
          value={form.company}
          onChange={set("company")}
          placeholder="Acme Inc. (optional)"
          className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00dc82]/40 transition-colors"
        />
      </div>

      {/* Service */}
      <div>
        <label className="block text-xs text-[#555] mb-2">
          Service Needed <span className="text-[#00dc82]">*</span>
        </label>
        <select
          required
          value={form.service}
          onChange={set("service")}
          className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00dc82]/40 transition-colors appearance-none"
        >
          <option value="" disabled>
            Select a service...
          </option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-xs text-[#555] mb-3">Approximate Budget</label>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all ${
                form.budget === b
                  ? "bg-[#00dc82]/10 border-[#00dc82]/30 text-[#00dc82]"
                  : "border-[#1a1a1a] text-[#555] hover:border-[#2a2a2a] hover:text-[#888]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs text-[#555] mb-2">
          Project Details <span className="text-[#00dc82]">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us what you're building — the problem you're solving, key features, tech constraints, and your timeline..."
          className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#00dc82]/40 transition-colors resize-none"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-[#00dc82] text-black text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#00dc82]/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            Send Message <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
