import { put, del, list, head } from "@vercel/blob";
import { unstable_noStore as noStore } from "next/cache";

export const PHOTO_CATEGORIES = [
  "hero",
  "knox",
  "nora",
  "gallery-lvp",
  "gallery-hardwood",
  "gallery-tile",
  "gallery-carpet",
  "installation",
] as const;

export type PhotoCategory = (typeof PHOTO_CATEGORIES)[number];

export type Photo = {
  id: string;
  url: string;
  pathname: string;
  category: PhotoCategory;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
  uploadedAt: string;
  sortOrder: number;
};

type Manifest = { photos: Photo[]; version: number };

const MANIFEST_KEY = "manifest.json";
const EMPTY_MANIFEST: Manifest = { photos: [], version: 1 };

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function findManifestUrl(): Promise<string | null> {
  // Blob `put` with addRandomSuffix:false still rewrites; we look up by exact pathname.
  try {
    const found = await list({ prefix: MANIFEST_KEY, limit: 1 });
    return found.blobs[0]?.url ?? null;
  } catch {
    return null;
  }
}

export async function readManifest(): Promise<Manifest> {
  noStore();
  if (!hasBlobToken()) return EMPTY_MANIFEST;
  const url = await findManifestUrl();
  if (!url) return EMPTY_MANIFEST;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return EMPTY_MANIFEST;
    const data = (await res.json()) as Manifest;
    if (!data.photos || !Array.isArray(data.photos)) return EMPTY_MANIFEST;
    return data;
  } catch {
    return EMPTY_MANIFEST;
  }
}

async function writeManifest(manifest: Manifest): Promise<void> {
  await put(MANIFEST_KEY, JSON.stringify(manifest, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function addPhoto(input: {
  file: File;
  category: PhotoCategory;
  title?: string;
  caption?: string;
}): Promise<Photo> {
  if (!hasBlobToken()) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not configured. Enable Vercel Blob in your project."
    );
  }
  const safeName = input.file.name.replace(/[^a-z0-9.\-_]+/gi, "-").toLowerCase();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const blobPath = `photos/${input.category}/${id}-${safeName}`;

  const blob = await put(blobPath, input.file, {
    access: "public",
    addRandomSuffix: false,
    contentType: input.file.type || undefined,
  });

  const manifest = await readManifest();
  const sortOrder =
    manifest.photos
      .filter((p) => p.category === input.category)
      .reduce((max, p) => Math.max(max, p.sortOrder), -1) + 1;

  const photo: Photo = {
    id,
    url: blob.url,
    pathname: blob.pathname,
    category: input.category,
    title: input.title?.trim() || undefined,
    caption: input.caption?.trim() || undefined,
    uploadedAt: new Date().toISOString(),
    sortOrder,
  };
  manifest.photos.push(photo);
  await writeManifest(manifest);
  return photo;
}

export async function deletePhoto(id: string): Promise<void> {
  const manifest = await readManifest();
  const target = manifest.photos.find((p) => p.id === id);
  if (!target) return;
  try {
    await del(target.url);
  } catch {
    // Ignore delete failures — still remove from manifest so UI is consistent.
  }
  manifest.photos = manifest.photos.filter((p) => p.id !== id);
  await writeManifest(manifest);
}

export async function updatePhoto(
  id: string,
  patch: { title?: string; caption?: string; sortOrder?: number; category?: PhotoCategory }
): Promise<Photo | null> {
  const manifest = await readManifest();
  const photo = manifest.photos.find((p) => p.id === id);
  if (!photo) return null;
  if (patch.title !== undefined) photo.title = patch.title.trim() || undefined;
  if (patch.caption !== undefined) photo.caption = patch.caption.trim() || undefined;
  if (patch.sortOrder !== undefined) photo.sortOrder = patch.sortOrder;
  if (patch.category !== undefined) photo.category = patch.category;
  await writeManifest(manifest);
  return photo;
}

export async function getPhotos(category?: PhotoCategory): Promise<Photo[]> {
  const manifest = await readManifest();
  const filtered = category
    ? manifest.photos.filter((p) => p.category === category)
    : manifest.photos;
  return filtered.slice().sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.uploadedAt.localeCompare(b.uploadedAt);
  });
}

export async function getGalleryPhotos(): Promise<Photo[]> {
  const all = await readManifest();
  const galleryCategories: PhotoCategory[] = [
    "gallery-lvp",
    "gallery-hardwood",
    "gallery-tile",
    "gallery-carpet",
    "installation",
    "knox",
    "nora",
  ];
  return all.photos
    .filter((p) => galleryCategories.includes(p.category))
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getHeroPhoto(): Promise<Photo | null> {
  const heroes = await getPhotos("hero");
  return heroes[0] ?? null;
}

export function categoryLabel(c: PhotoCategory): string {
  switch (c) {
    case "hero":
      return "Hero (homepage)";
    case "knox":
      return "Knox Collection";
    case "nora":
      return "Nora Collection";
    case "gallery-lvp":
      return "Gallery — LVP";
    case "gallery-hardwood":
      return "Gallery — Hardwood";
    case "gallery-tile":
      return "Gallery — Tile";
    case "gallery-carpet":
      return "Gallery — Carpet";
    case "installation":
      return "Installation";
  }
}

export function publicCategoryTag(c: PhotoCategory): string {
  switch (c) {
    case "knox":
      return "Knox";
    case "nora":
      return "Nora";
    case "gallery-lvp":
      return "LVP";
    case "gallery-hardwood":
      return "Hardwood";
    case "gallery-tile":
      return "Tile";
    case "gallery-carpet":
      return "Carpet";
    case "installation":
      return "Installation";
    case "hero":
      return "Featured";
  }
}

// Re-export for use in admin route to verify configuration.
export { hasBlobToken, head };
