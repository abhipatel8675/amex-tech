import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful | Amex Technology",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-lg text-[#6b7280] mb-8">
            We received your payment. Expect an email from us within 1 hour to kick off your project.
          </p>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 mb-8 text-left space-y-2">
            <p className="text-sm text-[#9ca3af]">📧 Check your inbox for confirmation</p>
            <p className="text-sm text-[#9ca3af]">⚡ Work starts within 24 hours</p>
            <p className="text-sm text-[#9ca3af]">💬 We'll reach out to collect project details</p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
          >
            Back to Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
