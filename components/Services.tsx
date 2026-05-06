import Link from "next/link";
import Eyebrow from "./Eyebrow";
import Reveal, { Stagger, StaggerItem } from "./motion/Reveal";
import SmartImage from "./SmartImage";
import { getPhotos, type Photo } from "@/lib/photos";

type Service = {
  eyebrow: string;
  title: string;
  sub: string;
  body: string;
  href: string;
  shot: "plank-detail" | "tile-flatlay" | "hands-at-work";
  category: "knox" | "nora" | "installation";
  accent: "warm" | "cool" | "neutral";
};

const services: Service[] = [
  {
    eyebrow: "01",
    title: "Knox Collection",
    sub: "Luxury Vinyl Plank",
    body:
      "Warm-toned LVP — oak, walnut, and aged hickory. The default for living rooms, dens, and bedrooms. 100% waterproof, 20mil wear layer, glue-down install.",
    href: "/knox",
    shot: "plank-detail",
    category: "knox",
    accent: "warm",
  },
  {
    eyebrow: "02",
    title: "Nora Collection",
    sub: "Luxury Vinyl Plank",
    body:
      "Cool-toned LVP — driftwood, fog, and washed pine. Built for kitchens, baths, and Coast-facing rooms. Rigid core, 22mil wear layer, click-lock with IXPE backing.",
    href: "/nora",
    shot: "tile-flatlay",
    category: "nora",
    accent: "cool",
  },
  {
    eyebrow: "03",
    title: "Installation",
    sub: "LVP · Carpet · Tile · Hardwood",
    body:
      "Removal, subfloor prep, install, and finishing — quiet seams, level under the island, baseboards reset. Hands-on, measured twice, signed with a name.",
    href: "/installation",
    shot: "hands-at-work",
    category: "installation",
    accent: "neutral",
  },
];

const accentBar: Record<Service["accent"], string> = {
  warm: "from-oak via-oak-deep to-oak",
  cool: "from-steel-mist via-steel to-steel-deep",
  neutral: "from-charcoal via-steel-deep to-charcoal",
};

export default async function Services() {
  // Pull a representative image for each category if available.
  const [knox, nora, install] = await Promise.all([
    getPhotos("knox"),
    getPhotos("nora"),
    getPhotos("installation"),
  ]);
  const firstUrl = (arr: Photo[]) => arr[0]?.url ?? null;
  const cover: Record<Service["category"], string | null> = {
    knox: firstUrl(knox),
    nora: firstUrl(nora),
    installation: firstUrl(install),
  };

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-shell px-6 py-24 md:px-12 md:py-32">
        <Reveal className="max-w-2xl">
          <Eyebrow number="01">What we do</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            Three offerings.
            <span className="block italic text-steel">One standard of work.</span>
          </h2>
          <p className="mt-6 max-w-prose text-charcoal-mid">
            We keep the menu narrow on purpose. Hardwood, tile, and luxury
            vinyl plank — installed clean, finished tight, with the same hands
            on every job.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <Link
                href={s.href}
                className="group lift kenburn relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-cream/40"
              >
                {/* Cover image */}
                <div className="relative h-56 overflow-hidden md:h-60">
                  <SmartImage
                    src={cover[s.category]}
                    alt={s.title}
                    shot={s.shot}
                    ratio="16/9"
                    rounded={false}
                    className="!aspect-auto h-full"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${accentBar[s.accent]}`}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-transparent"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-cream/95 px-3 py-1 text-[10px] font-medium uppercase tracking-button text-charcoal">
                    <span className="h-1 w-1 rounded-full bg-oak" />
                    {s.sub}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <span className="font-serif italic text-oak">{s.eyebrow}</span>
                  <h3 className="mt-2 font-serif text-2xl text-charcoal md:text-[26px]">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-charcoal-mid">
                    {s.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-button text-steel transition-colors group-hover:text-steel-deep">
                    Learn more
                    <svg
                      aria-hidden
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
