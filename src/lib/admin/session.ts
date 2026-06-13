import { createHmac, timingSafeEqual } from "crypto";
import { env } from "@/lib/env";

const SECRET = env.ADMIN_SESSION_SECRET;

function fromBase64Url(base64url: string): Buffer {
  return Buffer.from(base64url.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function toBase64Url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("base64url");
}

export function verify(payload: string, signature: string): boolean {
  const expected = createHmac("sha256", SECRET).update(payload).digest();
  const actual = fromBase64Url(signature);
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

export function encodePayload(data: Record<string, unknown>): string {
  return toBase64Url(Buffer.from(JSON.stringify(data)));
}

export function decodePayload<T>(encoded: string): T | null {
  try {
    return JSON.parse(fromBase64Url(encoded).toString()) as T;
  } catch {
    return null;
  }
}
