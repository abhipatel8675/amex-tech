"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const supabase = createClient();

    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage("Check your email to confirm your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 font-bold text-xl mb-6">
            <div className="w-8 h-8 bg-[#00dc82] rounded-md flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            Amex<span className="text-[#00dc82]">Technology</span>
          </a>
          <h1 className="text-2xl font-bold mt-4">{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-[#6b7280] text-sm mt-1">
            {isSignup ? "Sign up to track your orders" : "Sign in to your dashboard"}
          </p>
        </div>

        <form onSubmit={handle} className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-sm text-[#6b7280] mb-1.5 block">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-base text-white placeholder:text-[#3f3f3f] focus:outline-none focus:border-[#00dc82]/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-sm text-[#6b7280] mb-1.5 block">Password</label>
            <div className="relative">
              <input
                required
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 pr-10 text-base text-white placeholder:text-[#3f3f3f] focus:outline-none focus:border-[#00dc82]/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-white"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p className="text-sm text-[#00dc82]">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00dc82] text-black font-semibold py-2.5 rounded-xl hover:bg-[#00dc82]/90 transition-all disabled:opacity-60"
          >
            {loading ? "Please wait..." : isSignup ? "Create Account" : "Sign In"}
          </button>

          <p className="text-center text-sm text-[#6b7280]">
            {isSignup ? "Already have an account?" : "No account yet?"}{" "}
            <button
              type="button"
              onClick={() => { setIsSignup(!isSignup); setError(""); setMessage(""); }}
              className="text-[#00dc82] hover:underline"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
