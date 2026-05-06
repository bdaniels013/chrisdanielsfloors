import { NextResponse } from "next/server";
import { readManifest } from "@/lib/photos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const manifest = await readManifest();
  return NextResponse.json(manifest);
}
