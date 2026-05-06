import { NextResponse, type NextRequest } from "next/server";
import {
  deletePhoto,
  updatePhoto,
  PHOTO_CATEGORIES,
  type PhotoCategory,
} from "@/lib/photos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deletePhoto(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Delete failed.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = (await req.json()) as {
      title?: string;
      caption?: string;
      sortOrder?: number;
      category?: string;
    };
    const patch: {
      title?: string;
      caption?: string;
      sortOrder?: number;
      category?: PhotoCategory;
    } = {};
    if (body.title !== undefined) patch.title = body.title;
    if (body.caption !== undefined) patch.caption = body.caption;
    if (body.sortOrder !== undefined) patch.sortOrder = Number(body.sortOrder);
    if (body.category !== undefined) {
      if (!PHOTO_CATEGORIES.includes(body.category as PhotoCategory)) {
        return NextResponse.json({ error: "Invalid category." }, { status: 400 });
      }
      patch.category = body.category as PhotoCategory;
    }
    const photo = await updatePhoto(params.id, patch);
    if (!photo) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ photo });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Update failed.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
