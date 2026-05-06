import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REALM = "Chris Daniels Floors — Admin";

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

export function middleware(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASS;
  if (!expectedUser || !expectedPass) {
    return new NextResponse(
      "Admin not configured. Set ADMIN_USER and ADMIN_PASS environment variables.",
      { status: 503 }
    );
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  let decoded: string;
  try {
    decoded = atob(auth.slice("Basic ".length));
  } catch {
    return unauthorized();
  }
  const sep = decoded.indexOf(":");
  if (sep === -1) return unauthorized();
  const user = decoded.slice(0, sep);
  const pass = decoded.slice(sep + 1);

  if (
    !constantTimeEqual(user, expectedUser) ||
    !constantTimeEqual(pass, expectedPass)
  ) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
