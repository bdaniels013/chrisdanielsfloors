import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  checkPassword,
  createSessionCookieValue,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let password = "";
  let next = "/admin";
  try {
    const ctype = req.headers.get("content-type") || "";
    if (ctype.includes("application/json")) {
      const body = (await req.json()) as { password?: string; next?: string };
      password = body.password ?? "";
      next = sanitizeNext(body.next);
    } else {
      const form = await req.formData();
      password = String(form.get("password") || "");
      next = sanitizeNext(String(form.get("next") || ""));
    }
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Brief throttle to slow brute force.
  await new Promise((r) => setTimeout(r, 300));

  if (!(await checkPassword(password))) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const cookieValue = await createSessionCookieValue();
  if (!cookieValue) {
    return NextResponse.json(
      { error: "Server not configured." },
      { status: 503 }
    );
  }

  const res = NextResponse.json({ ok: true, next });
  res.cookies.set(SESSION_COOKIE, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
  return res;
}

function sanitizeNext(value: string | undefined): string {
  if (!value) return "/admin";
  // Only allow same-origin paths under /admin to prevent open redirect.
  if (!value.startsWith("/admin")) return "/admin";
  if (value.startsWith("/admin/login")) return "/admin";
  return value;
}
