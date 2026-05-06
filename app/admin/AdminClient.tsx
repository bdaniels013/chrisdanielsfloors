"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import {
  PHOTO_CATEGORIES,
  categoryLabel,
  type Photo,
  type PhotoCategory,
} from "@/lib/photos";

type ToastKind = "info" | "error" | "ok";
type Toast = { id: number; kind: ToastKind; text: string };

export default function AdminClient({ blobConfigured }: { blobConfigured: boolean }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | PhotoCategory>("all");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [busy, setBusy] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadCategory, setUploadCategory] = useState<PhotoCategory>("gallery-lvp");
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [progress, setProgress] = useState<{ name: string; percent: number } | null>(
    null
  );

  const pushToast = useCallback((kind: ToastKind, text: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, kind, text }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      kind === "error" ? 6000 : 3500
    );
  }, []);

  const loadManifest = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/manifest", { cache: "no-store" });
      const data = await res.json();
      setPhotos(Array.isArray(data?.photos) ? data.photos : []);
    } catch {
      pushToast("error", "Could not load manifest.");
    } finally {
      setLoading(false);
    }
  }, [pushToast]);

  useEffect(() => {
    loadManifest();
  }, [loadManifest]);

  const filtered = useMemo(() => {
    const list = filter === "all" ? photos : photos.filter((p) => p.category === filter);
    return list.slice().sort((a, b) => a.sortOrder - b.sortOrder);
  }, [photos, filter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: photos.length };
    for (const cat of PHOTO_CATEGORIES) c[cat] = 0;
    for (const p of photos) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, [photos]);

  const uploadOne = useCallback(
    async (file: File, category: PhotoCategory, title?: string, caption?: string) => {
      // Step 1: client-direct upload to Vercel Blob (bypasses the 4.5 MB
      // serverless function body limit).
      const safeName = file.name.replace(/[^a-z0-9.\-_]+/gi, "-").toLowerCase();
      const pathname = `photos/${category}/${safeName}`;
      const blob = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/blob-upload",
        onUploadProgress: ({ percentage }) => {
          setProgress({ name: file.name, percent: Math.round(percentage) });
        },
      });

      // Step 2: record in manifest (gated by Basic Auth middleware).
      const res = await fetch("/api/admin/photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: blob.url,
          pathname: blob.pathname,
          category,
          title,
          caption,
          contentType: file.type,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      return data.photo as Photo;
    },
    []
  );

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const arr = Array.from(files);
      if (arr.length === 0) return;
      setBusy(true);
      let added = 0;
      for (const file of arr) {
        try {
          if (!file.type.startsWith("image/")) {
            pushToast("error", `${file.name} is not an image.`);
            continue;
          }
          const photo = await uploadOne(
            file,
            uploadCategory,
            uploadTitle,
            uploadCaption
          );
          setPhotos((prev) => [...prev, photo]);
          added += 1;
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Upload failed.";
          pushToast("error", `${file.name}: ${msg}`);
        }
      }
      setProgress(null);
      setBusy(false);
      if (added > 0) {
        pushToast(
          "ok",
          `${added} photo${added === 1 ? "" : "s"} uploaded to ${categoryLabel(uploadCategory)}.`
        );
        setUploadCaption("");
        setUploadTitle("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [uploadCategory, uploadTitle, uploadCaption, pushToast, uploadOne]
  );

  // Drag & drop
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    const onOver = (e: DragEvent) => {
      e.preventDefault();
      el.classList.add("ring-2", "ring-steel", "bg-cream");
    };
    const onLeave = () => el.classList.remove("ring-2", "ring-steel", "bg-cream");
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      onLeave();
      if (e.dataTransfer?.files?.length) handleFiles(e.dataTransfer.files);
    };
    el.addEventListener("dragover", onOver);
    el.addEventListener("dragleave", onLeave);
    el.addEventListener("drop", onDrop);
    return () => {
      el.removeEventListener("dragover", onOver);
      el.removeEventListener("dragleave", onLeave);
      el.removeEventListener("drop", onDrop);
    };
  }, [handleFiles]);

  const onDelete = async (photo: Photo) => {
    if (!confirm(`Delete "${photo.title || photo.id}"? This can't be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/photo/${photo.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
      pushToast("ok", "Deleted.");
    } catch (err) {
      pushToast("error", err instanceof Error ? err.message : "Delete failed.");
    }
  };

  const onPatch = async (id: string, patch: Partial<Photo>) => {
    try {
      const res = await fetch(`/api/admin/photo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed.");
      setPhotos((prev) => prev.map((p) => (p.id === id ? data.photo : p)));
    } catch (err) {
      pushToast("error", err instanceof Error ? err.message : "Update failed.");
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-6 py-4 md:px-12">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-eyebrow text-charcoal-soft">
              Admin
            </p>
            <h1 className="font-serif text-2xl text-charcoal">Photo Manager</h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-charcoal-mid">
            <span className="hidden sm:inline">
              {photos.length} photo{photos.length === 1 ? "" : "s"} stored
            </span>
            <a
              href="/"
              className="rounded-sm border border-line bg-cream px-3 py-1.5 text-[11px] font-medium uppercase tracking-button text-charcoal hover:bg-paper"
            >
              View site
            </a>
          </div>
        </div>
      </header>

      {!blobConfigured && (
        <div className="border-b border-amber-300 bg-amber-50 px-6 py-3 text-sm text-amber-900">
          <strong>Vercel Blob isn&apos;t configured.</strong> Enable Blob storage in your
          Vercel project (Storage → Create → Blob), then redeploy. The
          <code className="mx-1 rounded bg-amber-100 px-1">BLOB_READ_WRITE_TOKEN</code>
          env var will be added automatically.
        </div>
      )}

      <main className="mx-auto max-w-shell px-6 py-10 md:px-12 md:py-14">
        {/* Upload card */}
        <section className="rounded-md border border-line bg-cream/60 p-6 md:p-8">
          <h2 className="font-serif text-xl text-charcoal">Upload photos</h2>
          <p className="mt-1 text-sm text-charcoal-mid">
            Drag &amp; drop, or click to choose. JPG, PNG, WebP, AVIF, or HEIC,
            up to 25 MB each. Photos upload directly to Vercel Blob.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-eyebrow text-charcoal-soft">
                Category
              </span>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value as PhotoCategory)}
                className="mt-1.5 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm"
              >
                {PHOTO_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {categoryLabel(c)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-eyebrow text-charcoal-soft">
                Title (optional)
              </span>
              <input
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="e.g. Knox kitchen run"
                className="mt-1.5 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-eyebrow text-charcoal-soft">
                Caption (optional)
              </span>
              <input
                value={uploadCaption}
                onChange={(e) => setUploadCaption(e.target.value)}
                placeholder="Short description shown under the photo"
                className="mt-1.5 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm"
              />
            </label>
          </div>

          <div
            ref={dropRef}
            className="mt-6 cursor-pointer rounded-md border-2 border-dashed border-line bg-paper/70 px-6 py-10 text-center transition-colors hover:border-steel"
            onClick={() => fileInputRef.current?.click()}
          >
            <p className="font-serif text-lg text-charcoal">
              Drop photos here, or click to choose
            </p>
            <p className="mt-1 text-sm text-charcoal-soft">
              They&apos;ll go to <strong>{categoryLabel(uploadCategory)}</strong>.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) handleFiles(e.target.files);
              }}
            />
          </div>

          {progress && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-charcoal-mid">
                <span>Uploading {progress.name}</span>
                <span>{progress.percent}%</span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full bg-steel transition-all"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
            </div>
          )}
          {busy && !progress && (
            <p className="mt-3 text-xs text-charcoal-soft">Working…</p>
          )}
        </section>

        {/* Filter chips */}
        <div className="mt-12 flex flex-wrap gap-2">
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label={`All · ${counts.all}`}
          />
          {PHOTO_CATEGORIES.map((c) => (
            <FilterChip
              key={c}
              active={filter === c}
              onClick={() => setFilter(c)}
              label={`${categoryLabel(c)} · ${counts[c] || 0}`}
            />
          ))}
        </div>

        {/* Photo grid */}
        <section className="mt-6">
          {loading ? (
            <p className="py-12 text-center text-sm text-charcoal-soft">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="rounded-md border border-dashed border-line py-12 text-center text-sm text-charcoal-soft">
              No photos in this category yet. Upload some above.
            </p>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <PhotoCard
                  key={p.id}
                  photo={p}
                  onDelete={() => onDelete(p)}
                  onPatch={(patch) => onPatch(p.id, patch)}
                />
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-sm px-4 py-2 text-sm shadow-lg ${
              t.kind === "error"
                ? "bg-red-700 text-white"
                : t.kind === "ok"
                  ? "bg-charcoal text-cream"
                  : "bg-steel text-cream"
            }`}
          >
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-button transition-colors ${
        active
          ? "border-charcoal bg-charcoal text-cream"
          : "border-line bg-paper text-charcoal-mid hover:border-steel hover:text-steel"
      }`}
    >
      {label}
    </button>
  );
}

function PhotoCard({
  photo,
  onDelete,
  onPatch,
}: {
  photo: Photo;
  onDelete: () => void;
  onPatch: (patch: Partial<Photo>) => void;
}) {
  const [title, setTitle] = useState(photo.title ?? "");
  const [caption, setCaption] = useState(photo.caption ?? "");
  const [category, setCategory] = useState<PhotoCategory>(photo.category);
  const dirty =
    title !== (photo.title ?? "") ||
    caption !== (photo.caption ?? "") ||
    category !== photo.category;

  return (
    <li className="flex flex-col overflow-hidden rounded-md border border-line bg-cream/40">
      <div className="relative aspect-[4/3] bg-charcoal/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.url}
          alt={photo.title ?? "Uploaded photo"}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 text-sm">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full rounded-sm border border-line bg-paper px-2 py-1 text-sm"
        />
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption"
          rows={2}
          className="w-full rounded-sm border border-line bg-paper px-2 py-1 text-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as PhotoCategory)}
          className="w-full rounded-sm border border-line bg-paper px-2 py-1 text-sm"
        >
          {PHOTO_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {categoryLabel(c)}
            </option>
          ))}
        </select>
        <div className="mt-1 flex items-center gap-2">
          <button
            type="button"
            disabled={!dirty}
            onClick={() => onPatch({ title, caption, category })}
            className="rounded-sm bg-charcoal px-3 py-1.5 text-[11px] font-medium uppercase tracking-button text-cream disabled:opacity-40"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-sm border border-line px-3 py-1.5 text-[11px] font-medium uppercase tracking-button text-red-700 hover:bg-red-50"
          >
            Delete
          </button>
          <a
            href={photo.url}
            target="_blank"
            rel="noopener"
            className="ml-auto text-[11px] uppercase tracking-button text-charcoal-soft hover:text-steel"
          >
            Open ↗
          </a>
        </div>
      </div>
    </li>
  );
}
