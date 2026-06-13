import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import {
  sign,
  verify,
  encodePayload,
  decodePayload,
  safeCompare,
} from "./session";

const COOKIE_NAME = "admin_session";
const SESSION_TTL = 24 * 60 * 60 * 1000;

type SessionPayload = {
  t: number;
  r: string;
};

export function verifyPassword(password: string): boolean {
  return safeCompare(password, env.ADMIN_PASSWORD);
}

export async function createSession(): Promise<void> {
  const payload: SessionPayload = { t: Date.now(), r: crypto.randomUUID() };
  const encoded = encodePayload(payload);
  const sig = sign(encoded);
  const token = `${encoded}.${sig}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 86400,
  });
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return false;

  const encoded = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);

  if (!verify(encoded, sig)) {
    await destroySession();
    return false;
  }

  const payload = decodePayload<SessionPayload>(encoded);
  if (!payload?.t) {
    await destroySession();
    return false;
  }

  if (Date.now() - payload.t > SESSION_TTL) {
    await destroySession();
    return false;
  }

  return true;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function enforceAdminAuth(): Promise<void> {
  const valid = await verifySession();
  if (!valid) {
    redirect("/admin/login");
  }
}
