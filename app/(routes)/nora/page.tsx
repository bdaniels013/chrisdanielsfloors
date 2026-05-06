import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import PullQuote from "@/components/PullQuote";
import PlaceholderImage from "@/components/PlaceholderImage";
import CtaStrip from "@/components/CtaStrip";

export const metadata: Metadata = {
  title: "Nora Collection — Luxury Vinyl Plank",
  description:
    "Cool-toned LVP — driftwood, fog, and washed pine. Rigid core, 22mil wear layer, click-lock with IXPE backing.",
};

const features = [
  ["100% Waterproof", "Long-term resilience in moisture-prone spaces."],
  ["Scratch & Dent Resistant", "UV coating resists scratches, stains, and fading."],
  ["Click-Lock Install", "Tongue-and-groove — no glue, no mess."],
  ["IXPE Acoustic Backing", "Quieter underfoot, kinder to the room."],
  ["Eco-Friendly", "Low-emission build, recyclable wear layer."],
  ["Low Maintenance", "Sweep and damp-mop. That's the routine."],
];

const specs = [
  ["Type", "Luxury Vinyl Plank · Click-Lock"],
  ["Construction", "Rigid Core + 1.5 mm IXPE"],
  ["Plank size", "7″ × 48″"],
  ["Wear layer", "22 mil"],
  ["Overall thickness", "5.5 mm"],
  ["Carton coverage", "19.2 sq ft"],
  ["Pallet coverage", "1141.2 sq ft"],
];

export default function NoraPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto grid max-w-shell gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-12 md:py-32">
          <div>
            <Eyebrow number="01">Nora Collection</Eyebrow>
            <h1 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">
              Premium LVP, finished with a refined eye.
            </h1>
            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-charcoal-mid">
              Elevate your space with the Nora Collection — a premium flooring
              solution built for durability, elegance, and everyday performance.
              Rich wood-look design with micro-bevel edge detailing and a UV
              coating that keeps colors true under Coast-facing light.
            </p>
            <PullQuote>
              Built for kitchens, baths, and Coast-facing rooms with strong light.
            </PullQuote>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <PlaceholderImage shot="threshold" ratio="3/4" />
            <PlaceholderImage shot="room-wide" ratio="3/4" className="mt-12" />
            <PlaceholderImage shot="tile-flatlay" ratio="4/3" />
            <PlaceholderImage shot="plank-detail" ratio="4/3" className="mt-12" />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-shell px-6 py-20 md:px-12 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
            <div>
              <Eyebrow number="02">Why Nora</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl">Refined where Knox is rugged.</h2>
              <p className="mt-4 max-w-prose text-charcoal-mid">
                If Knox is the workhorse, Nora is the dress shirt. Cooler tones,
                tighter bevel, click-lock for a quicker install — same waterproof
                core underneath.
              </p>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-sm bg-line/60 sm:grid-cols-2">
              {features.map(([title, body]) => (
                <li key={title} className="bg-cream p-6">
                  <h3 className="font-serif text-lg text-charcoal">{title}</h3>
                  <p className="mt-2 text-sm text-charcoal-mid">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-shell px-6 py-16 md:px-12 md:py-24">
          <Eyebrow number="03" variant="dark">
            Specs
          </Eyebrow>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-sm bg-cream/10 md:grid-cols-4">
            {specs.map(([k, val]) => (
              <div key={k} className="bg-charcoal p-6">
                <dt className="text-[11px] uppercase tracking-eyebrow text-oak-soft">
                  {k}
                </dt>
                <dd className="mt-2 font-serif text-xl text-cream">{val}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
