"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, CircleCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import BrowserMockup from "@/components/ui/BrowserMockup";
import { isDeviceMockup } from "@/lib/portfolioImages";
import { HeroBlogList } from "@/components/ui/HeroBlogList";
import type { HeroBlogPost } from "@/data/heroPosts";
import { testimonials } from "@/data/testimonials";

// A real review from testimonials.ts (Fiverr), shown verbatim with its source.
const heroReview = testimonials.find((t) => t.name === "sarah_m_uk") ?? testimonials[0];

// Real shipped work shown in the hero, picked on the server (see pickHeroWork)
// so the full projects data never ships to the browser.
export type HeroWork = { slug: string; title: string; shortDesc: string; image?: string; liveUrl?: string };

function hostOf(url?: string) {
  try {
    return url ? new URL(url).hostname.replace(/^www\./, "") : "amextechnology.com";
  } catch {
    return "amextechnology.com";
  }
}

const GOLD = "linear-gradient(135deg, #B8860B 0%, #9C7208 100%)";

function WorkShot({ src, alt, url, className = "" }: { src: string; alt: string; url: string; className?: string }) {
  if (isDeviceMockup(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        sizes="(min-width: 1024px) 45vw, 100vw"
        className={`w-full h-auto rounded-2xl shadow-2xl ${className}`}
      />
    );
  }
  return <BrowserMockup src={src} alt={alt} url={url} className={className} />;
}

export default function Hero({
  blogPosts,
  showcase,
  recentWork,
}: {
  blogPosts: HeroBlogPost[];
  showcase: HeroWork[];
  recentWork: HeroWork[];
}) {
  return (
    <section className="relative flex items-center overflow-hidden bg-white pt-16">
      {/* Background */}
      <div className="grid-pattern absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[25%] left-[20%] w-[1000px] h-[640px] rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, #B8860B 0%, transparent 65%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[92rem] mx-auto px-6 py-14 lg:py-20">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 xl:gap-16 items-center">
          {/* ─── LEFT: message + action ─── */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-7">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase border"
                style={{
                  background: "linear-gradient(135deg, rgba(184,134,11,0.15) 0%, rgba(156,114,8,0.12) 100%)",
                  borderColor: "rgba(184,134,11,0.35)",
                  color: "#7A5807",
                  letterSpacing: "0.1em",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] animate-pulse" />
                AI &amp; Software Agency
              </span>
              <span className="text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5">
                Est. 2019
              </span>
            </div>

            {/* Slide only, no fade: hero text must be visible on first paint (LCP). */}
            <motion.h1
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[clamp(2.3rem,4.5vw,4.3rem)] font-bold leading-[1.05] tracking-[-0.035em] mb-7 text-slate-900"
            >
              <span className="block">Websites, apps</span>
              <span className="block">&amp; AI agents</span>{" "}
              <span
                className="block pb-[0.1em] text-balance"
                style={{ background: GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                that bring you customers.
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg sm:text-xl leading-8 max-w-[600px] mb-10 text-slate-700"
            >
              We build fast websites, web and mobile apps, and AI automations, then make sure people find you on Google and
              in ChatGPT, Perplexity and Gemini.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-base font-semibold text-white px-7 py-4 rounded-xl transition-all duration-300 btn-glow"
                style={{ background: GOLD }}
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 text-base font-semibold text-slate-700 px-7 py-4 rounded-xl border border-slate-300 bg-white/70 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
              >
                See Our Work
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/tools/app-checker"
                className="group inline-flex items-center gap-1.5 text-base font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#7A5807]" />
                Free App Check
              </Link>
            </motion.div>

            {/* Trust row */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} style={{ width: 16, height: 16, fill: "#FBBF24" }} viewBox="0 0 20 20" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-600">100% satisfaction</span>
                </div>
                <span className="hidden sm:block w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <CircleCheck className="w-3.5 h-3.5 text-[#7A5807]" />
                  <span className="text-sm text-slate-600">5+ years experience</span>
                </div>
                <span className="hidden sm:block w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <CircleCheck className="w-3.5 h-3.5 text-[#7A5807]" />
                  <span className="text-sm text-slate-600">200+ projects shipped</span>
                </div>
              </div>
              {recentWork.length > 0 && (
                <p className="mt-5 text-sm text-slate-600">
                  Recent work:{" "}
                  {recentWork.map((p, i) => (
                    <span key={p.slug}>
                      <Link href={`/portfolio/${p.slug}`} className="font-medium text-slate-700 hover:text-[#7A5807] transition-colors">
                        {p.title}
                      </Link>
                      {i < recentWork.length - 1 ? <span className="text-slate-300"> · </span> : null}
                    </span>
                  ))}
                </p>
              )}
            </div>

            {/* Phones and tablets: one real project instead of the desktop collage */}
            {showcase[0] && (
              <Link href={`/portfolio/${showcase[0].slug}`} className="mt-10 block lg:hidden" aria-label={`${showcase[0].title} case study`}>
                <WorkShot
                    src={showcase[0].image!} alt={`${showcase[0].title}: ${showcase[0].shortDesc}`} url={hostOf(showcase[0].liveUrl)} />
              </Link>
            )}
          </div>

          {/* ─── RIGHT: real work + real review ─── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative hidden lg:block"
          >
            <div className="relative pb-24">
              {showcase[0] && (
                <Link href={`/portfolio/${showcase[0].slug}`} className="block group" aria-label={`${showcase[0].title} case study`}>
                  <WorkShot
                    src={showcase[0].image!}
                    alt={`${showcase[0].title}: ${showcase[0].shortDesc}`}
                    url={hostOf(showcase[0].liveUrl)}
                    className="transition-transform duration-500 group-hover:-translate-y-1"
                  />
                </Link>
              )}
              {showcase[1] && (
                <Link
                  href={`/portfolio/${showcase[1].slug}`}
                  className="absolute -bottom-10 -left-8 w-[56%] block group"
                  aria-label={`${showcase[1].title} case study`}
                >
                  <WorkShot
                    src={showcase[1].image!}
                    alt={`${showcase[1].title}: ${showcase[1].shortDesc}`}
                    url={hostOf(showcase[1].liveUrl)}
                    className="ring-4 ring-white transition-transform duration-500 group-hover:-translate-y-1"
                  />
                </Link>
              )}
              {/* Real client review */}
              <div className="absolute -bottom-14 -right-2 w-[48%] rounded-2xl border border-slate-200 bg-white/95 backdrop-blur p-5 shadow-[0_12px_40px_rgba(15,23,42,0.12)]">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic line-clamp-4">&ldquo;{heroReview.content}&rdquo;</p>
                <p className="text-xs text-slate-600 mt-2">
                  — {heroReview.name}, verified {heroReview.platform} client
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Latest guides — kept for internal linking, now below the fold-line on desktop */}
        <div className="mt-16 hidden lg:block">
          <p className="mb-3 font-semibold uppercase" style={{ fontSize: 11, letterSpacing: "0.15em", color: "#7A5807" }}>
            From the blog
          </p>
          <HeroBlogList posts={blogPosts} />
        </div>
      </div>
    </section>
  );
}
