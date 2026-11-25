import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful | Amex Technology",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#9a722a]/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#7A5807]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-lg text-[#111111] mb-8">
            We received your payment. Expect an email from us within 1 hour to kick off your project.
          </p>
          <div className="bg-white border border-[#dadcd1] rounded-2xl p-6 mb-8 text-left space-y-2">
            <p className="text-sm text-[#111111]">📧 Check your inbox for confirmation</p>
            <p className="text-sm text-[#111111]">⚡ Work starts within 24 hours</p>
            <p className="text-sm text-[#111111]">💬 We'll reach out to collect project details</p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            style={{ background: "linear-gradient(135deg, #9a722a 0%, #9C7208 100%)" }}
          >
            Back to Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
