import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clearCookieResponse(redirectTo?: string) {
  const res = redirectTo
    ? NextResponse.redirect(redirectTo, { status: 303 })
    : NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}

export async function POST() {
  return clearCookieResponse();
}

export async function GET(req: Request) {
  const url = new URL("/admin/login", req.url);
  return clearCookieResponse(url.toString());
}
