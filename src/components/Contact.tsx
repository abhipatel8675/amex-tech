"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Calendar, Mail, MessageSquare } from "lucide-react";

const services = [
  "AI App Fix & Deploy",
  "Bug Fixes & Debugging",
  "Full Stack Web App",
  "Deployment & DevOps",
  "Mobile App Development",
  "Custom / Not Sure",
];

const budgets = ["< $100", "$100 - $500", "$500 - $2,000", "$2,000+", "Let's discuss"];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", service: "", budget: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0d0d0d] border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-xs text-indigo-400 bg-indigo-500/10 border border-[#6366F1]/20 px-3 py-1.5 rounded-full mb-4">
              Contact
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let&apos;s Build Something Great
            </h2>
            <p className="text-[#6b7280] mb-8">
              Tell us about your project. We respond within 24 hours with a clear proposal and fixed price.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
                <div className="w-8 h-8 bg-[#111111] border border-[#1f1f1f] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Email</div>
                  <div className="text-[#6b7280]">abhipatel8675@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
                <div className="w-8 h-8 bg-[#111111] border border-[#1f1f1f] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Book a Free Call</div>
                  <div className="text-[#6b7280]">30-min discovery call, no obligation</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
                <div className="w-8 h-8 bg-[#111111] border border-[#1f1f1f] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Response Time</div>
                  <div className="text-[#6b7280]">Average 1 hour · Available Mon–Sat</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#6b7280] mb-1.5 block">Your Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="John Smith"
                  className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-base text-white placeholder:text-[#3f3f3f] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-[#6b7280] mb-1.5 block">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="john@company.com"
                  className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-base text-white placeholder:text-[#3f3f3f] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#6b7280] mb-1.5 block">Service Needed *</label>
              <select
                required
                value={form.service}
                onChange={(e) => set("service", e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-base text-white focus:outline-none focus:border-[#6366F1]/50 transition-colors"
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-[#6b7280] mb-1.5 block">Budget Range</label>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => set("budget", b)}
                    className={`text-sm px-3 py-1.5 rounded-lg border transition-all ${
                      form.budget === b
                        ? "border-[#6366F1] bg-indigo-500/10 text-indigo-400"
                        : "border-[#1f1f1f] text-[#6b7280] hover:border-[#2f2f2f]"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-[#6b7280] mb-1.5 block">Project Details *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Describe what you need — current stack, what's broken or what you want to build, deadline..."
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-base text-white placeholder:text-[#3f3f3f] focus:outline-none focus:border-[#6366F1]/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="flex items-center justify-center gap-2 w-full bg-indigo-500 text-black font-semibold py-3 rounded-xl hover:bg-indigo-500/90 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {status === "sending" ? (
                "Sending..."
              ) : status === "sent" ? (
                "Message Sent! We'll reply within 24hrs"
              ) : (
                <>
                  Send Message <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {status === "error" && (
              <p className="text-xs text-red-400 text-center">
                Something went wrong. Email us directly at abhipatel8675@gmail.com
              </p>
            )}

            <p className="text-[10px] text-[#6b7280] text-center">
              We respond within 24 hours with a clear proposal. No spam, ever.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
