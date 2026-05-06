import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, isAuthConfigured, verifySessionCookieValue } from "@/lib/auth";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

const PUBLIC_PATHS = new Set([
  "/admin/login",
  "/api/admin/login",
  "/api/admin/logout",
]);

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Allow login/logout endpoints + login page through unauthenticated.
  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (!isAuthConfigured()) {
    return new NextResponse(
      "Admin not configured. Set ADMIN_PASS environment variable in Vercel.",
      { status: 503 }
    );
  }

  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  const ok = await verifySessionCookieValue(cookie);
  if (ok) return NextResponse.next();

  // For browser navigation (HTML pages), redirect to login.
  if (pathname.startsWith("/admin")) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // For API requests, return JSON 401.
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}
