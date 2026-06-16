"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface LightboxState {
  src: string;
  caption: string;
}

export default function BlogPostContent({ html }: { html: string }) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onClick(e: MouseEvent) {
      const fig = (e.target as Element).closest(".blog-figure") as HTMLElement | null;
      if (!fig) return;
      const src =
        fig.dataset.src ||
        (fig.querySelector("img") as HTMLImageElement | null)?.src ||
        "";
      const caption =
        fig.dataset.caption ||
        fig.querySelector("figcaption")?.textContent ||
        "";
      if (src) setLightbox({ src, caption });
    }
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <div
        ref={ref}
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.caption}
            style={{
              maxHeight: "80vh",
              maxWidth: "90vw",
              borderRadius: 8,
              objectFit: "contain",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {lightbox.caption && (
            <p
              style={{
                marginTop: 16,
                fontSize: 13,
                fontStyle: "italic",
                color: "rgba(148,163,184,0.8)",
                textAlign: "center",
                maxWidth: 640,
              }}
            >
              {lightbox.caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
