"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PlaceholderImage from "./PlaceholderImage";
import type { Photo } from "@/lib/photos";

type Category = "All" | "LVP" | "Hardwood" | "Tile" | "Carpet" | "Installation";

type ItemFromManifest = {
  id: string;
  src: string;
  title?: string;
  caption?: string;
  category: Category;
};

type DemoItem = {
  id: string;
  shot:
    | "room-wide"
    | "plank-detail"
    | "tile-flatlay"
    | "hands-at-work"
    | "grain-texture"
    | "threshold";
  title: string;
  caption: string;
  category: Category;
};

const demoItems: DemoItem[] = [
  {
    id: "demo-1",
    shot: "room-wide",
    title: "Knox kitchen run",
    category: "LVP",
    caption: "Knox Collection. Kitchen-to-living-room run, no transition strip.",
  },
  {
    id: "demo-2",
    shot: "plank-detail",
    title: "Plank macro",
    category: "LVP",
    caption: "20mil wear layer. Hyper-real wood grain.",
  },
  {
    id: "demo-3",
    shot: "tile-flatlay",
    title: "Bathroom tile",
    category: "Tile",
    caption: "Coast-facing bath. Sealed grout, level pan.",
  },
  {
    id: "demo-4",
    shot: "threshold",
    title: "Threshold detail",
    category: "Hardwood",
    caption: "LVP-to-tile transition, cut on site.",
  },
  {
    id: "demo-5",
    shot: "grain-texture",
    title: "Den floor reset",
    category: "LVP",
    caption: "Old carpet out, Nora Collection in.",
  },
  {
    id: "demo-6",
    shot: "hands-at-work",
    title: "Knee-on-pad",
    category: "Installation",
    caption: "Glue-down, plank by plank.",
  },
  {
    id: "demo-7",
    shot: "room-wide",
    title: "Living room wide",
    category: "Hardwood",
    caption: "Oak hardwood across a 24-foot run.",
  },
  {
    id: "demo-8",
    shot: "tile-flatlay",
    title: "Tile flat lay",
    category: "Tile",
    caption: "Subway run with thin grout line.",
  },
];

const categories: Category[] = ["All", "LVP", "Hardwood", "Tile", "Carpet", "Installation"];

function categoryFromPhoto(p: Photo): Category {
  switch (p.category) {
    case "gallery-lvp":
    case "knox":
    case "nora":
      return "LVP";
    case "gallery-hardwood":
      return "Hardwood";
    case "gallery-tile":
      return "Tile";
    case "gallery-carpet":
      return "Carpet";
    case "installation":
      return "Installation";
    default:
      return "LVP";
  }
}

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<Category>("All");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const realItems: ItemFromManifest[] = photos.map((p) => ({
    id: p.id,
    src: p.url,
    title: p.title,
    caption: p.caption,
    category: categoryFromPhoto(p),
  }));

  const usingReal = realItems.length > 0;

  const visibleReal = useMemo(
    () => (filter === "All" ? realItems : realItems.filter((p) => p.category === filter)),
    [realItems, filter]
  );
  const visibleDemo = useMemo(
    () => (filter === "All" ? demoItems : demoItems.filter((p) => p.category === filter)),
    [filter]
  );

  const lightboxSlides = visibleReal.map((p) => ({
    src: p.src,
    alt: p.title || "Project photo",
    title: p.title,
    description: p.caption,
  }));

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = c === filter;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 text-[11px] font-medium uppercase tracking-button transition-all ${
                active
                  ? "border-charcoal bg-charcoal text-cream shadow-[0_4px_12px_rgba(31,36,40,0.18)]"
                  : "border-line bg-paper text-charcoal-mid hover:border-steel hover:text-steel"
              }`}
              type="button"
            >
              {c}
            </button>
          );
        })}
      </div>

      {!usingReal && (
        <p className="mb-6 rounded-md border border-dashed border-line bg-cream/50 px-4 py-3 text-sm text-charcoal-mid">
          Showing brand placeholders. Real photos upload at{" "}
          <a href="/admin" className="underline">
            /admin
          </a>{" "}
          will appear here automatically.
        </p>
      )}

      {/* Masonry-style columns */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {usingReal
          ? visibleReal.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="kenburn lift mb-5 block w-full break-inside-avoid overflow-hidden rounded-md text-left"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              >
                <div className="relative">
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image
                    src={p.src}
                    alt={p.title || "Project photo"}
                    width={900}
                    height={1200}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full object-cover img-target"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                {(p.title || p.caption) && (
                  <figcaption className="mt-3 flex items-baseline justify-between gap-3 px-1 text-sm text-charcoal-mid">
                    {p.title && (
                      <span className="font-serif italic text-charcoal">{p.title}</span>
                    )}
                    <span className="text-[10px] uppercase tracking-button text-charcoal-soft">
                      {p.category}
                    </span>
                  </figcaption>
                )}
                {p.caption && (
                  <p className="mt-1 px-1 text-sm text-charcoal-mid">{p.caption}</p>
                )}
              </button>
            ))
          : visibleDemo.map((p) => (
              <figure
                key={p.id}
                className="mb-5 break-inside-avoid overflow-hidden rounded-md"
              >
                <PlaceholderImage shot={p.shot} ratio="4/3" label={p.title} />
                <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-sm text-charcoal-mid">
                  <span className="font-serif italic text-charcoal">{p.title}</span>
                  <span className="text-[10px] uppercase tracking-button text-charcoal-soft">
                    {p.category}
                  </span>
                </figcaption>
                <p className="mt-1 text-sm text-charcoal-mid">{p.caption}</p>
              </figure>
            ))}
      </div>

      {usingReal && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={lightboxSlides}
          on={{ view: ({ index: i }) => setIndex(i) }}
        />
      )}
    </div>
  );
}
