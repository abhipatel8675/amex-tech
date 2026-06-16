"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const services = [
  "Custom Website Development", "Web Application Development", "Mobile App Development",
  "SaaS Development", "API Development & Integration", "Backend Development",
  "DevOps & Deployment", "UI/UX Design", "Maintenance & Support", "Other / Not Sure",
];

const budgets = ["Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"];

type FormState = { name: string; email: string; company: string; service: string; budget: string; message: string };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", service: "", budget: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fullMessage = [form.message, form.company ? `Company: ${form.company}` : "", form.budget ? `Budget: ${form.budget}` : ""].filter(Boolean).join("\n\n");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, service: form.service || "Not specified", message: fullMessage }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError("Something went wrong. Email us at contact@amextechnology.com");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all duration-200";

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Message Received</h3>
        <p className="text-base text-slate-400 max-w-xs leading-7">
          We'll review your project details and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-400 mb-2.5">Full Name <span className="text-indigo-400">*</span></label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            aria-label="Full name"
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-400 mb-2.5">Email <span className="text-indigo-400">*</span></label>
          <input
            id="contact-email"
            name="email"
            required
            type="email"
            autoComplete="email"
            aria-label="Email address"
            value={form.email}
            onChange={set("email")}
            placeholder="you@company.com"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className="block text-sm font-medium text-slate-400 mb-2.5">Company / Project Name</label>
        <input
          id="contact-company"
          name="company"
          autoComplete="organization"
          aria-label="Company or project name"
          value={form.company}
          onChange={set("company")}
          placeholder="Acme Inc. (optional)"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="contact-service" className="block text-sm font-medium text-slate-400 mb-2.5">Project Type <span className="text-indigo-400">*</span></label>
        <select
          id="contact-service"
          name="service"
          required
          aria-label="Project type"
          value={form.service}
          onChange={set("service")}
          className={`${inputCls} appearance-none`}
        >
          <option value="" disabled>Select a service...</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-3.5" id="budget-label">Budget Range</label>
        <div role="group" aria-labelledby="budget-label" className="flex flex-wrap gap-2.5">
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              aria-pressed={form.budget === b}
              onClick={() => setForm((p) => ({ ...p, budget: b }))}
              className={`text-sm font-medium px-4 py-2 rounded-lg border transition-all duration-200 ${
                form.budget === b
                  ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300"
                  : "border-white/[0.08] text-slate-400 hover:border-white/[0.18] hover:text-slate-200"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-400 mb-2.5">Project Details <span className="text-indigo-400">*</span></label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          aria-label="Project details"
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us what you're building — the problem you're solving, key features, tech constraints, and your timeline..."
          className={`${inputCls} resize-none`}
        />
      </div>

      {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="group flex items-center justify-center gap-2 text-base font-semibold text-white py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
        style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
      >
        {loading ? "Sending..." : (
          <>Send Message <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
        )}
      </button>
    </form>
  );
}
