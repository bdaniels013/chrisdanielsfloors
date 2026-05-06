// Edge-compatible session auth.
// Cookie format: `<expiryMs>.<base64url(HMAC-SHA256(expiryMs))>`
// HMAC key is derived from ADMIN_PASS, so no separate secret env var is needed.

export const SESSION_COOKIE = "cd-admin-session";
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSecret(): string | null {
  return process.env.ADMIN_PASS || null;
}

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASS);
}

function base64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

async function hmac(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return base64urlEncode(new Uint8Array(sig));
}

export async function createSessionCookieValue(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const exp = String(Date.now() + SESSION_TTL_MS);
  const sig = await hmac(exp, secret);
  return `${exp}.${sig}`;
}

export async function verifySessionCookieValue(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const secret = getSecret();
  if (!secret) return false;
  const dot = value.indexOf(".");
  if (dot === -1) return false;
  const expStr = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = await hmac(expStr, secret);
  return constantTimeEqual(expected, sig);
}

export async function checkPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASS;
  if (!expected) return false;
  if (typeof password !== "string" || password.length === 0) return false;
  // Constant-time compare on equal-length strings.
  if (password.length !== expected.length) {
    // Still do a dummy comparison to keep timing similar.
    constantTimeEqual(password, password);
    return false;
  }
  return constantTimeEqual(password, expected);
}
