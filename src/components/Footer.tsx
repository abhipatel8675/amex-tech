import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold">
          <div className="w-6 h-6 bg-[#00dc82] rounded-md flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-black" />
          </div>
          <span>Amex<span className="text-[#00dc82]">Technology</span></span>
        </div>

        <p className="text-xs text-[#6b7280] text-center">
          Full Stack Development · Bug Fixes · Deployment · Mobile Apps · AI App Fix
        </p>

        <p className="text-xs text-[#6b7280]">
          © {new Date().getFullYear()} Amex Technology. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
