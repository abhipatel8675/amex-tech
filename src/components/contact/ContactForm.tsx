"use client";

import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, ChevronDown } from "lucide-react";

const services = [
  "Custom Website Development", "Web Application Development", "Mobile App Development",
  "SaaS Development", "API Development & Integration", "Backend Development",
  "DevOps & Deployment", "UI/UX Design", "SEO Services", "AI & Automation Services",
  "Maintenance & Support", "Other / Not Sure",
];

const budgets = ["Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"];

type FormState = { name: string; email: string; company: string; service: string; budget: string; message: string };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", service: "", budget: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [serviceOpen, setServiceOpen] = useState(false);
  const serviceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target as Node)) {
        setServiceOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fullMessage = [form.message, form.company ? `Company: ${form.company}` : "", form.budget ? `Budget: ${form.budget}` : ""].filter(Boolean).join("\n\n");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "034118ee-2ebc-45db-813d-1d54e5dff988",
          subject: `New inquiry from ${form.name} — ${form.service || "Not specified"}`,
          from_name: form.name,
          replyto: form.email,
          name: form.name,
          email: form.email,
          service: form.service || "Not specified",
          message: fullMessage,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSuccess(true);
      // GA4 conversion tracking
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag("event", "generate_lead", { event_category: "contact", event_label: form.service });
      }
    } catch {
      setError("Something went wrong. Email us at abhipatel8675@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200";

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Message Received</h3>
        <p className="text-base text-slate-400 max-w-xs leading-7">
          We&apos;ll review your project details and get back to you within 4 hours.
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
            placeholder="Jane Smith"
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
        <label className="block text-sm font-medium text-slate-400 mb-2.5">Project Type <span className="text-indigo-400">*</span></label>
        <div ref={serviceRef} className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={serviceOpen}
            onClick={() => setServiceOpen((o) => !o)}
            className={`${inputCls} flex items-center justify-between text-left ${form.service ? "text-white" : "text-slate-500"}`}
          >
            <span>{form.service || "Select a service..."}</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""}`} />
          </button>

          {serviceOpen && (
            <ul
              role="listbox"
              aria-label="Project type"
              className="absolute z-50 w-full mt-1.5 rounded-xl border border-white/[0.1] bg-[#0d0d1a] shadow-2xl overflow-hidden"
            >
              {services.map((s) => (
                <li
                  key={s}
                  role="option"
                  aria-selected={form.service === s}
                  onClick={() => { setForm((p) => ({ ...p, service: s })); setServiceOpen(false); }}
                  className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-150 ${
                    form.service === s
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
          {/* hidden input to satisfy form required validation */}
          <input type="hidden" name="service" value={form.service} required />
        </div>
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
        className="group w-full flex items-center justify-center gap-2 text-base font-semibold text-white py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed btn-glow mt-1"
        style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
      >
        {loading ? "Sending..." : (
          <>Send Message <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
        )}
      </button>
    </form>
  );
}
