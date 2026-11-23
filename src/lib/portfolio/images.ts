import type { Project } from "@/data/projects";

/** The picture used on cards: the project's cover, or its first gallery image. */
export function projectLeadImage(p: Pick<Project, "image" | "gallery">): string | undefined {
  return p.image ?? p.gallery?.[0]?.src;
}
