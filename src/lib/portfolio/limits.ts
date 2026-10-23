// Shared by the admin form (live counters) and the server actions (enforcement).
// Limits keep the grid cards and case-study sections looking balanced.

export const PORTFOLIO_CATEGORIES = ["Web", "Mobile App", "SaaS", "AI", "Automation"] as const;

export const LIMITS = {
  titleChars: 60,
  tags: 3,
  tagChars: 30,
  technologies: 16,
  images: 12,
  imageBytes: 8 * 1024 * 1024,
  shortDescWords: 25, // grid card
  descriptionWords: 90, // "About the project"
  problemWords: 70, // "What we solved" intro
  results: 5,
  resultWords: 20,
} as const;

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export function countWords(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export type ProjectInput = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  technologies: string[];
  shortDesc: string;
  description: string;
  problem: string;
  results: string[];
  liveUrl: string;
  images: { src: string; alt: string; caption: string }[];
  coverIndex: number;
  published: boolean;
};

/** Returns a list of human-readable problems; empty means valid. */
export function validateProject(p: ProjectInput): string[] {
  const errors: string[] = [];
  if (!p.title.trim()) errors.push("Title is required.");
  if (p.title.length > LIMITS.titleChars) errors.push(`Title must be ${LIMITS.titleChars} characters or fewer.`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) errors.push("URL slug may only contain lowercase letters, numbers and dashes.");
  if (!(PORTFOLIO_CATEGORIES as readonly string[]).includes(p.category)) errors.push("Pick a category.");
  if (p.tags.length > LIMITS.tags) errors.push(`Use at most ${LIMITS.tags} tags.`);
  if (p.tags.some((t) => t.length > LIMITS.tagChars)) errors.push(`Tags must be ${LIMITS.tagChars} characters or fewer.`);
  if (p.technologies.length === 0) errors.push("Add at least one technology.");
  if (p.technologies.length > LIMITS.technologies) errors.push(`Use at most ${LIMITS.technologies} technologies.`);
  if (p.images.length === 0) errors.push("Upload at least one image.");
  if (p.images.length > LIMITS.images) errors.push(`Use at most ${LIMITS.images} images.`);
  if (p.coverIndex < 0 || p.coverIndex >= p.images.length) errors.push("Choose a cover image.");

  const words: [string, string, number][] = [
    ["Card description", p.shortDesc, LIMITS.shortDescWords],
    ["About the project", p.description, LIMITS.descriptionWords],
    ["What we solved", p.problem, LIMITS.problemWords],
  ];
  for (const [label, text, max] of words) {
    if (!text.trim()) errors.push(`${label} is required.`);
    else if (countWords(text) > max) errors.push(`${label} must be ${max} words or fewer.`);
  }

  const results = p.results.filter((r) => r.trim());
  if (results.length > LIMITS.results) errors.push(`Use at most ${LIMITS.results} results.`);
  if (results.some((r) => countWords(r) > LIMITS.resultWords)) errors.push(`Each result must be ${LIMITS.resultWords} words or fewer.`);

  if (p.liveUrl.trim()) {
    try {
      const u = new URL(p.liveUrl.trim());
      if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error();
    } catch {
      errors.push("Live link must be a full URL starting with https://");
    }
  }
  return errors;
}
