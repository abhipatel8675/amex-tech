"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export default function PendingButton({ children, className, style, formAction, onClick }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; formAction?: (fd: FormData) => void | Promise<void>; onClick?: React.MouseEventHandler<HTMLButtonElement> }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} formAction={formAction} onClick={onClick} className={`${className ?? ""} disabled:opacity-60 disabled:cursor-wait`} style={style}>
      {pending ? <span className="inline-flex items-center gap-1"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</span> : children}
    </button>
  );
}
