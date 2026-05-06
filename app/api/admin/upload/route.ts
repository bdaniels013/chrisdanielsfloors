import { NextResponse, type NextRequest } from "next/server";
import { addPhoto, PHOTO_CATEGORIES, type PhotoCategory } from "@/lib/photos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB per file

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const category = String(formData.get("category") || "");
    const title = String(formData.get("title") || "") || undefined;
    const caption = String(formData.get("caption") || "") || undefined;

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Missing file." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `File too large. Max ${MAX_BYTES / 1024 / 1024} MB.` },
        { status: 413 }
      );
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image." }, { status: 400 });
    }
    if (!PHOTO_CATEGORIES.includes(category as PhotoCategory)) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    const photo = await addPhoto({
      file,
      category: category as PhotoCategory,
      title,
      caption,
    });
    return NextResponse.json({ photo });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
