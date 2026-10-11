import type { BlogPost } from "@/data/blog";

// "We'll fix it for you" offer shown on troubleshooting blog posts. Every CTA
// leads to the contact form with the service and a starter message prefilled.
export const FIX_OFFER = {
  name: "Bug Fix Service",
  contactService: "Quick Bug Fix",
  includes: [
    "Your bug or error fixed by a senior developer",
    "Most fixes delivered within 24 hours",
    "Short write-up of the root cause and what changed",
    "Free assessment before any work starts",
  ],
};

const TOPICS: { match: RegExp; label: string }[] = [
  { match: /lovable/i, label: "Lovable" },
  { match: /bolt/i, label: "Bolt.new" },
  { match: /replit/i, label: "Replit" },
  { match: /supabase/i, label: "Supabase" },
  { match: /fire(base|store)/i, label: "Firebase" },
  { match: /vercel/i, label: "Vercel" },
  { match: /nextjs|next\.js/i, label: "Next.js" },
  { match: /cloudflare|godaddy|dns|domain/i, label: "domain & DNS" },
  { match: /resend|email/i, label: "email" },
];

export function getFixTopic(post: Pick<BlogPost, "slug" | "tags">): string {
  const haystack = [post.slug, ...post.tags].join(" ");
  return TOPICS.find((t) => t.match.test(haystack))?.label ?? "app";
}

export function getFixHref(source: string, topic: string): string {
  const params = new URLSearchParams({
    service: FIX_OFFER.contactService,
    message: `I need help fixing a ${topic} issue (from: ${source}).`,
  });
  return `/contact?${params.toString()}`;
}
