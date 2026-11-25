// Standard service names shown wherever a project category is displayed
// (portfolio filter, project cards, case study pages, homepage).
// Kept dependency-free so it can be used from edge routes too.
export const categoryGroups = [
  { name: "Websites", categories: ["Web"] },
  { name: "Web Apps & SaaS", categories: ["SaaS"] },
  { name: "Mobile Apps", categories: ["Mobile App"] },
  { name: "AI & Automation", categories: ["AI", "Automation"] },
] as const;
export type CategoryGroupName = (typeof categoryGroups)[number]["name"];

export function categoryLabel(category: string): string {
  return categoryGroups.find((g) => (g.categories as readonly string[]).includes(category))?.name ?? category;
}
