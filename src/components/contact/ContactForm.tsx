"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2 } from "lucide-react";
import { services as listedServices } from "@/data/services";

// Listed services plus "Quick Bug Fix", which isn't a listed service but is
// what the blog fix CTAs and App Checker prefill.
const services = [
  ...listedServices.map((s) => s.title),
  "AI Operations Assistant",
  "Hire Developers",
  "Quick Bug Fix",
  "Other / Not Sure",
];

// Older links (local SEO pages, Website Grader emails) use these
// service names; map them to an option in the list so the select is prefilled.
const SERVICE_ALIASES: Record<string, string> = {
  "Law firm website": "Websites & Web Apps",
  "Google Business Profile setup": "SEO & Getting Found Online",
  Website: "Websites & Web Apps",
};

const budgets = [
  "Small fix or update",
  "New website",
  "Web or mobile app",
  "AI or automation",
  "Ongoing support",
  "Not sure yet",
];

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

// Prefill from links like /contact?service=...&message=... (used by the blog fix CTA).
// useSearchParams needs a Suspense boundary on prerendered pages; the fallback is
// the same form without prefill, so the initial HTML still contains the form.
export default function ContactForm() {
  return (
    <Suspense fallback={<ContactFormFields />}>
      <ContactFormWithParams />
    </Suspense>
  );
}

function ContactFormWithParams() {
  const params = useSearchParams();
  const raw = params.get("service");
  const message = params.get("message");
  const service = raw
    ? services.includes(raw)
      ? raw
      : (SERVICE_ALIASES[raw] ?? "")
    : "";
  return (
    <ContactFormFields
      key={`${raw}:${message}`}
      initialService={service}
      initialMessage={message ? message.slice(0, 500) : ""}
    />
  );
}

function ContactFormFields({
  initialService = "",
  initialMessage = "",
}: {
  initialService?: string;
  initialMessage?: string;
}) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    service: initialService,
    budget: "",
    message: initialMessage,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    const fullMessage = [
      form.message,
      form.company ? `Company: ${form.company}` : "",
      form.budget ? `Project size: ${form.budget}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "6f0ed673-ac8c-4571-b8a1-e02c9fa3773e",
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
      // Copy into the leads pipeline; never block the visitor on it.
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          service: form.service,
          budget: form.budget,
          message: form.message,
        }),
      }).catch(() => {});
      setSuccess(true);
      // GA4 conversion tracking
      const w =
        typeof window !== "undefined"
          ? (window as unknown as { gtag?: (...args: unknown[]) => void })
          : undefined;
      if (w && typeof w.gtag === "function") {
        w.gtag("event", "generate_lead", {
          event_category: "contact",
          event_label: form.service,
        });
      }
    } catch {
      setError("Something went wrong. Email us at abhi@amextech.org");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white border border-[#dadcd1] rounded-[5px] px-4 py-3.5 text-base text-[#111111] placeholder-[#8a8e82] focus:outline-none focus:border-[#9a722a] focus:ring-1 focus:ring-[#9a722a]/25 transition-all duration-200";

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#B8860B]/10 border border-[#B8860B]/25 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[#7A5807]" />
        </div>
        <h3 className="text-2xl font-bold text-[#111111]">Message Received</h3>
        <p className="text-base text-[#4d554b] max-w-xs leading-7">
          We&apos;ll review your project details and reply with practical next
          steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-[#4d554b] mb-2.5"
          >
            Full Name <span className="text-[#7A5807]">*</span>
          </label>
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
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-[#4d554b] mb-2.5"
          >
            Email <span className="text-[#7A5807]">*</span>
          </label>
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
        <label
          htmlFor="contact-company"
          className="block text-sm font-medium text-[#4d554b] mb-2.5"
        >
          Company / Project Name
        </label>
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
        <label
          htmlFor="contact-service"
          className="block text-sm font-medium text-[#4d554b] mb-2.5"
        >
          Project Type <span className="text-[#7A5807]">*</span>
        </label>
        <select
          id="contact-service"
          name="service"
          required
          value={form.service}
          onChange={set("service")}
          className={inputCls}
        >
          <option value="" disabled>
            Select a service...
          </option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className="block text-sm font-medium text-[#4d554b] mb-3.5"
          id="budget-label"
        >
          Project Size
        </label>
        <div
          role="group"
          aria-labelledby="budget-label"
          className="flex flex-wrap gap-2.5"
        >
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              aria-pressed={form.budget === b}
              onClick={() => setForm((p) => ({ ...p, budget: b }))}
              className={`text-sm font-medium px-4 py-2 rounded-[5px] border transition-all duration-200 ${
                form.budget === b
                  ? "bg-[#1a1a1a] border-[#1a1a1a] text-white"
                  : "border-[#dadcd1] bg-white text-[#4d554b] hover:border-[#9a722a] hover:text-[#111111]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-[#4d554b] mb-2.5"
        >
          Project Details <span className="text-[#7A5807]">*</span>
        </label>
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

      {error && (
        <p
          role="alert"
          className="text-sm text-red-700 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group mt-1 flex w-full items-center justify-center gap-2 rounded-[5px] bg-[#1a1a1a] py-4 text-base font-medium text-white transition-colors duration-200 hover:bg-[#3d493d] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            Send Message{" "}
            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
