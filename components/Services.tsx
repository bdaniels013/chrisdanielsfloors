import Link from "next/link";
import Eyebrow from "./Eyebrow";

const services = [
  {
    eyebrow: "01",
    title: "Knox Collection",
    sub: "Luxury Vinyl Plank",
    body:
      "Warm-toned LVP — oak, walnut, and aged hickory. The default for living rooms, dens, and bedrooms. 100% waterproof, 20mil wear layer, glue-down install.",
    href: "/knox",
    accent: "warm",
  },
  {
    eyebrow: "02",
    title: "Nora Collection",
    sub: "Luxury Vinyl Plank",
    body:
      "Cool-toned LVP — driftwood, fog, and washed pine. Built for kitchens, baths, and Coast-facing rooms. Rigid core, 22mil wear layer, click-lock with IXPE backing.",
    href: "/nora",
    accent: "cool",
  },
  {
    eyebrow: "03",
    title: "Installation",
    sub: "LVP · Carpet · Tile · Hardwood",
    body:
      "Removal, subfloor prep, install, and finishing — quiet seams, level under the island, baseboards reset. Hands-on, measured twice, signed with a name.",
    href: "/installation",
    accent: "neutral",
  },
];

const accentColor: Record<string, string> = {
  warm: "border-l-oak",
  cool: "border-l-steel-mist",
  neutral: "border-l-charcoal",
};

export default function Services() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-shell px-6 py-20 md:px-12 md:py-28">
        <div className="max-w-2xl">
          <Eyebrow number="01">What we do</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            Three offerings. One standard of work.
          </h2>
          <p className="mt-6 max-w-prose text-charcoal-mid">
            We keep the menu narrow on purpose. Hardwood, tile, and luxury
            vinyl plank — installed clean, finished tight, with the same hands
            on every job.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className={`group flex flex-col border border-line bg-cream/40 p-7 transition-colors hover:bg-cream md:p-8 border-l-4 ${
                accentColor[s.accent]
              }`}
            >
              <span className="font-serif italic text-oak">{s.eyebrow}</span>
              <h3 className="mt-2 font-serif text-2xl text-charcoal md:text-[26px]">
                {s.title}
              </h3>
              <span className="mt-1 text-[11px] font-medium uppercase tracking-eyebrow text-charcoal-soft">
                {s.sub}
              </span>
              <p className="mt-5 text-[15px] leading-relaxed text-charcoal-mid">
                {s.body}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-button text-steel transition-colors group-hover:text-steel-deep">
                Learn more
                <svg
                  aria-hidden
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
