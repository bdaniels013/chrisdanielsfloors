import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionCookieValue } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/heic",
  "image/heif",
];

async function isAdmin(req: NextRequest): Promise<boolean> {
  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySessionCookieValue(cookie);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        // /api/blob-upload sits outside /api/admin so the upload-completed
        // webhook from Vercel can reach it without auth (handleUpload
        // validates Vercel's signature internally). For the token-generation
        // call, we re-check the admin session cookie manually.
        if (!(await isAdmin(request))) {
          throw new Error("Unauthorized.");
        }
        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: 25 * 1024 * 1024, // 25 MB
          addRandomSuffix: true,
          tokenPayload: clientPayload ?? undefined,
        };
      },
      onUploadCompleted: async () => {
        // Manifest is written by the client immediately after `upload()`
        // resolves via POST /api/admin/photo. This webhook is a no-op.
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
