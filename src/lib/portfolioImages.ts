// Marketing images that already show the site on a laptop and phone. They're
// displayed as-is, never wrapped in another browser frame.
export function isDeviceMockup(src?: string): boolean {
  return Boolean(src && src.includes("/mockup-"));
}
