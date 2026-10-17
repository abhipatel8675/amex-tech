import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

// Fetches only public http(s) URLs: every hop (including redirects) is resolved
// and rejected if it points at a private, loopback or link-local address, so the
// checker can't be used to probe our own infrastructure.

export const USER_AGENT =
  "Mozilla/5.0 (compatible; AmexAppChecker/1.0; +https://amextechnology.com/tools/app-checker)";

export class BlockedUrlError extends Error {}

export type SafeResponse = {
  url: string;
  status: number;
  headers: Headers;
  body: string;
  bytes: number;
  truncated: boolean;
  ms: number;
};

function isPrivateIPv4(ip: string): boolean {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

function isPrivateIP(ip: string): boolean {
  if (isIP(ip) === 4) return isPrivateIPv4(ip);
  const v6 = ip.toLowerCase();
  const mapped = v6.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateIPv4(mapped[1]);
  return (
    v6 === "::" ||
    v6 === "::1" ||
    v6.startsWith("fc") ||
    v6.startsWith("fd") ||
    v6.startsWith("fe8") ||
    v6.startsWith("fe9") ||
    v6.startsWith("fea") ||
    v6.startsWith("feb")
  );
}

export function normalizeUrl(input: string): URL {
  const trimmed = input.trim();
  if (!trimmed || trimmed.length > 2000) throw new BlockedUrlError("Enter a valid website address.");
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    throw new BlockedUrlError("Enter a valid website address.");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new BlockedUrlError("Only http and https addresses can be checked.");
  }
  if (url.username || url.password) throw new BlockedUrlError("Remove the login details from the address.");
  if (url.port && url.port !== "80" && url.port !== "443") {
    throw new BlockedUrlError("Only standard web ports (80 and 443) can be checked.");
  }
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new BlockedUrlError("That address isn't on the public internet.");
  }
  if (isIP(host) === 0 && !host.includes(".")) throw new BlockedUrlError("Enter a full domain, like myapp.com.");
  url.hash = "";
  return url;
}

async function assertPublicHost(url: URL): Promise<void> {
  const host = url.hostname.replace(/^\[|\]$/g, "");
  const addresses = isIP(host) ? [{ address: host }] : await lookup(host, { all: true }).catch(() => []);
  if (addresses.length === 0) throw new BlockedUrlError(`We couldn't find ${host}. Check the address.`);
  if (addresses.some((a) => isPrivateIP(a.address))) {
    throw new BlockedUrlError("That address isn't on the public internet.");
  }
}

async function readLimited(res: Response, maxBytes: number): Promise<{ body: string; bytes: number; truncated: boolean }> {
  if (!res.body) return { body: "", bytes: 0, truncated: false };
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let truncated = false;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > maxBytes) {
      chunks.push(value.subarray(0, value.byteLength - (bytes - maxBytes)));
      truncated = true;
      await reader.cancel().catch(() => {});
      break;
    }
    chunks.push(value);
  }
  return { body: Buffer.concat(chunks).toString("utf8"), bytes: Math.min(bytes, maxBytes), truncated };
}

export async function safeFetch(
  input: string | URL,
  { maxBytes = 2_000_000, timeoutMs = 10_000, maxRedirects = 4 }: { maxBytes?: number; timeoutMs?: number; maxRedirects?: number } = {}
): Promise<SafeResponse> {
  let url = typeof input === "string" ? normalizeUrl(input) : input;
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    for (let hop = 0; ; hop++) {
      await assertPublicHost(url);
      const res = await fetch(url, {
        redirect: "manual",
        signal: controller.signal,
        headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml,*/*;q=0.8" },
      });
      const location = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && location) {
        if (hop >= maxRedirects) throw new BlockedUrlError("The site redirects too many times.");
        await res.body?.cancel().catch(() => {});
        url = normalizeUrl(new URL(location, url).toString());
        continue;
      }
      const { body, bytes, truncated } = await readLimited(res, maxBytes);
      return { url: url.toString(), status: res.status, headers: res.headers, body, bytes, truncated, ms: Date.now() - started };
    }
  } finally {
    clearTimeout(timer);
  }
}
