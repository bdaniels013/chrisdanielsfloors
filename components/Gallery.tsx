"use client";

import { useState } from "react";
import PlaceholderImage from "./PlaceholderImage";

type Project = {
  id: string;
  title: string;
  category: "LVP" | "Hardwood" | "Tile" | "Carpet";
  shot:
    | "room-wide"
    | "plank-detail"
    | "tile-flatlay"
    | "hands-at-work"
    | "grain-texture"
    | "threshold";
  caption: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "Knox kitchen run",
    category: "LVP",
    shot: "room-wide",
    caption: "Knox Collection. Kitchen-to-living-room run, no transition strip.",
  },
  {
    id: "2",
    title: "Plank macro",
    category: "LVP",
    shot: "plank-detail",
    caption: "20mil wear layer. Hyper-real wood grain.",
  },
  {
    id: "3",
    title: "Bathroom tile",
    category: "Tile",
    shot: "tile-flatlay",
    caption: "Coast-facing bath. Sealed grout, level pan.",
  },
  {
    id: "4",
    title: "Threshold detail",
    category: "Hardwood",
    shot: "threshold",
    caption: "LVP-to-tile transition, cut on site.",
  },
  {
    id: "5",
    title: "Den floor reset",
    category: "LVP",
    shot: "grain-texture",
    caption: "Old carpet out, Nora Collection in.",
  },
  {
    id: "6",
    title: "Knee-on-pad",
    category: "LVP",
    shot: "hands-at-work",
    caption: "Glue-down, plank by plank.",
  },
  {
    id: "7",
    title: "Living room wide",
    category: "Hardwood",
    shot: "room-wide",
    caption: "Oak hardwood across a 24-foot run.",
  },
  {
    id: "8",
    title: "Tile flat lay",
    category: "Tile",
    shot: "tile-flatlay",
    caption: "Subway run with thin grout line.",
  },
];

const categories = ["All", "LVP", "Hardwood", "Tile", "Carpet"] as const;

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = c === filter;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 text-[11px] font-medium uppercase tracking-button transition-colors ${
                active
                  ? "border-charcoal bg-charcoal text-cream"
                  : "border-line bg-paper text-charcoal-mid hover:border-steel hover:text-steel"
              }`}
              type="button"
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <figure key={p.id} className="group">
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
    </div>
  );
}
