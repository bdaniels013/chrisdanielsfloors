import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import PullQuote from "@/components/PullQuote";
import PlaceholderImage from "@/components/PlaceholderImage";
import CtaStrip from "@/components/CtaStrip";

export const metadata: Metadata = {
  title: "Knox Collection — Luxury Vinyl Plank",
  description:
    "Warm-toned LVP — oak, walnut, and aged hickory. 100% waterproof, 20mil wear layer, glue-down install.",
};

const features = [
  ["100% Waterproof", "Right for kitchens, baths, basements — and Coast humidity."],
  ["Scratch & Dent Resistant", "Built for high-traffic rooms with kids, dogs, and sand."],
  ["Glue-Down Install", "For DIY-savvy owners or professional installs."],
  ["Quiet Underfoot", "Sound-dampened so footfalls don't echo."],
  ["Eco-Friendly", "Made with sustainable materials."],
  ["Low Maintenance", "Sweep and damp-mop. That's the routine."],
];

const specs = [
  ["Type", "Luxury Vinyl Tile · Glue-Down"],
  ["Plank size", "7.24″ × 48.30″"],
  ["Wear layer", "20 mil"],
  ["Overall thickness", "2.0 mm"],
  ["Carton coverage", "49 sq ft"],
];

export default function KnoxPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto grid max-w-shell gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-12 md:py-32">
          <div>
            <Eyebrow number="01">Knox Collection</Eyebrow>
            <h1 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">
              Sleek, durable LVP for the rooms you actually live in.
            </h1>
            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-charcoal-mid">
              100% waterproof luxury vinyl with hyper-realistic wood and stone
              textures. Warm tones — oak, walnut, aged hickory — engineered to
                hold up to wet feet, sand, and dogs.
            </p>
            <PullQuote>
              The right call for most homes near the water.
            </PullQuote>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <PlaceholderImage shot="plank-detail" ratio="3/4" />
            <PlaceholderImage shot="room-wide" ratio="3/4" className="mt-12" />
            <PlaceholderImage shot="grain-texture" ratio="4/3" />
            <PlaceholderImage shot="threshold" ratio="4/3" className="mt-12" />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-shell px-6 py-20 md:px-12 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
            <div>
              <Eyebrow number="02">Why Knox</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl">Engineered for the Coast.</h2>
              <p className="mt-4 max-w-prose text-charcoal-mid">
                Spec by spec, this is the LVP we install in most of our jobs.
                Tradeoffs are named, not hidden.
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
          <dl className="mt-8 grid gap-px overflow-hidden rounded-sm bg-cream/10 md:grid-cols-5">
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
