import { NextResponse, type NextRequest } from "next/server";
import {
  addPhotoRecord,
  PHOTO_CATEGORIES,
  type PhotoCategory,
} from "@/lib/photos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      url?: string;
      pathname?: string;
      category?: string;
      title?: string;
      caption?: string;
      contentType?: string;
    };

    if (!body.url || !body.pathname) {
      return NextResponse.json(
        { error: "url and pathname are required." },
        { status: 400 }
      );
    }
    if (
      !body.category ||
      !PHOTO_CATEGORIES.includes(body.category as PhotoCategory)
    ) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    const photo = await addPhotoRecord({
      url: body.url,
      pathname: body.pathname,
      category: body.category as PhotoCategory,
      title: body.title,
      caption: body.caption,
      contentType: body.contentType,
    });
    return NextResponse.json({ photo });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Record failed.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
