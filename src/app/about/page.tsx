import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Shield, Clock, Code2, Rocket, Smartphone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Amex Technology",
  description: "Top Rated Plus Upwork developer. Full-Stack Engineer and SaaS specialist with 5+ years experience and $80K+ earned.",
};

const skills = [
  "React", "Next.js", "Node.js", "TypeScript", "Python", "Django",
  "Flask", "Supabase", "MongoDB", "Firebase", "GraphQL", "PostgreSQL",
  "AWS", "Vercel", "Docker", "React Native", "Flutter", "Expo",
];

const stats = [
  { icon: Star, value: "$80K+", label: "Earned on Upwork" },
  { icon: Shield, value: "100%", label: "Job Success Score" },
  { icon: Clock, value: "5+", label: "Years Experience" },
  { icon: Code2, value: "100+", label: "Apps Delivered" },
  { icon: Rocket, value: "Top Rated Plus", label: "Upwork Status" },
  { icon: Smartphone, value: "Level 2", label: "Fiverr Seller" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-36 pb-24">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-xs text-[#00dc82] bg-[#00dc82]/10 border border-[#00dc82]/20 px-3 py-1.5 rounded-full mb-6">
            About Us
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            We Build Apps That <span className="text-[#00dc82]">Actually Work</span>
          </h1>
          <p className="text-xl text-[#6b7280] leading-relaxed max-w-2xl">
            Amex Technology is a US-based software development firm led by Abhi Patel —
            a Full-Stack Engineer and SaaS specialist with 5+ years of experience helping
            founders and product teams ship production-ready applications.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-5">
                <Icon className="w-5 h-5 text-[#00dc82] mb-3" />
                <div className="text-2xl font-bold mb-1">{s.value}</div>
                <div className="text-sm text-[#6b7280]">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Story */}
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">What We Do</h2>
          <div className="space-y-4 text-base text-[#9ca3af] leading-relaxed">
            <p>
              We are not just developers — we act as a technical partner for founders and
              product teams. From architecture decisions to final deployment, we take ownership
              of the entire build so you can focus on your business.
            </p>
            <p>
              Whether you need a bug fixed in 24 hours, a full SaaS platform built from scratch,
              or your Lovable/Bolt.new app cleaned up and deployed properly — we handle it with
              speed, clean code, and clear communication.
            </p>
            <p>
              Every project comes with a fixed price, clear timeline, and direct communication.
              No agencies, no middlemen, no surprises.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="text-sm bg-[#111111] border border-[#1f1f1f] px-3 py-1.5 rounded-lg text-[#9ca3af] hover:border-[#00dc82]/30 hover:text-[#00dc82] transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#00dc82]/10 to-[#00dc82]/5 border border-[#00dc82]/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Build?</h2>
          <p className="text-[#6b7280] mb-6 text-base">
            Tell us about your project and get a proposal within 24 hours.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#00dc82] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#00dc82]/90 transition-all hover:scale-105"
          >
            Get a Free Quote
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
