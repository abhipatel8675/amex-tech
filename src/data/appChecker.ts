// Free "Vibe-Coded App Checker" at /tools/app-checker. The free scan shows the
// score and top 3 issues; the paid report unlocks every issue with fix steps.
export const APP_CHECKER = {
  productName: "App Checker Full Report",
  priceCents: 2900,
  price: "$29",
  contactService: "Quick Bug Fix",
};

export function appCheckerFixHref(url: string, issues: number): string {
  const params = new URLSearchParams({
    service: APP_CHECKER.contactService,
    message: `The App Checker found ${issues} ${issues === 1 ? "issue" : "issues"} on ${url}. Please fix them for me.`,
  });
  return `/contact?${params.toString()}`;
}

export function appCheckerReportRequestHref(url: string): string {
  const params = new URLSearchParams({
    service: APP_CHECKER.contactService,
    message: `Please send me the full App Checker report for ${url}.`,
  });
  return `/contact?${params.toString()}`;
}
