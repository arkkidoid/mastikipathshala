import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "mkp_session";
const ALG = "HS256";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secretKey() {
  const secret =
    process.env.AUTH_SECRET ||
    (process.env.NODE_ENV !== "production"
      ? "dev-only-insecure-secret-change-me"
      : "");
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export type SessionPayload = { sub: string; role: "admin" };

export async function signSession(email: string): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: ALG })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifySession(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (payload.role !== "admin" || !payload.sub) return null;
    return { sub: String(payload.sub), role: "admin" };
  } catch {
    return null;
  }
}

/** Constant-time string compare to avoid leaking length/però timing. */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    // still do a comparison to keep timing roughly constant
    let r = 1;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      r |= (a.charCodeAt(i % a.length || 0) ^ b.charCodeAt(i % b.length || 0)) | 1;
    }
    return false;
  }
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export function checkCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const adminPass = process.env.ADMIN_PASSWORD || "";
  if (!adminEmail || !adminPass) return false;
  const okEmail = safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase());
  const okPass = safeEqual(password, adminPass);
  return okEmail && okPass;
}

export const SESSION_MAX_AGE = MAX_AGE;
