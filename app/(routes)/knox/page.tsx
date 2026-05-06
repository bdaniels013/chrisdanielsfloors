import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import PullQuote from "@/components/PullQuote";
import ProductGallery from "@/components/ProductGallery";
import CtaStrip from "@/components/CtaStrip";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { getPhotos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Knox Collection — Luxury Vinyl Plank",
  description:
    "Warm-toned LVP — oak, walnut, and aged hickory. 100% waterproof, 20mil wear layer, glue-down install.",
};

export const dynamic = "force-dynamic";

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

export default async function KnoxPage() {
  const photos = await getPhotos("knox");

  return (
    <>
      <section className="relative bg-paper">
        <div className="mx-auto grid max-w-shell gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-12 md:py-32">
          <Reveal>
            <Eyebrow number="01">Knox Collection</Eyebrow>
            <h1 className="font-serif text-4xl leading-tight tracking-tight md:text-7xl">
              Sleek, durable LVP
              <span className="block italic text-oak-deep">for the rooms you actually live in.</span>
            </h1>
            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-charcoal-mid">
              100% waterproof luxury vinyl with hyper-realistic wood and stone
              textures. Warm tones — oak, walnut, aged hickory — engineered to
              hold up to wet feet, sand, and dogs.
            </p>
            <PullQuote>The right call for most homes near the water.</PullQuote>
          </Reveal>
          <Reveal delay={0.1}>
            <ProductGallery
              photos={photos}
              fallbackShots={["plank-detail", "room-wide", "grain-texture", "threshold"]}
              alt="Knox Collection LVP installation"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-shell px-6 py-24 md:px-12 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <Eyebrow number="02">Why Knox</Eyebrow>
              <h2 className="font-serif text-3xl md:text-5xl">
                Engineered for the Coast.
              </h2>
              <p className="mt-4 max-w-prose text-charcoal-mid">
                Spec by spec, this is the LVP we install in most of our jobs.
                Tradeoffs are named, not hidden.
              </p>
            </Reveal>
            <Stagger className="grid gap-px overflow-hidden rounded-md bg-line/60 sm:grid-cols-2">
              {features.map(([title, body]) => (
                <StaggerItem key={title}>
                  <div className="lift bg-cream p-6 transition-colors hover:bg-paper">
                    <h3 className="font-serif text-lg text-charcoal">{title}</h3>
                    <p className="mt-2 text-sm text-charcoal-mid">{body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-oak-deep/30"
        />
        <div aria-hidden className="absolute inset-0 noise" />
        <div className="relative mx-auto max-w-shell px-6 py-20 md:px-12 md:py-24">
          <Reveal>
            <Eyebrow number="03" variant="dark">
              Specs
            </Eyebrow>
          </Reveal>
          <Stagger className="mt-8 grid gap-px overflow-hidden rounded-md bg-cream/10 md:grid-cols-5">
            {specs.map(([k, val]) => (
              <StaggerItem key={k}>
                <div className="bg-charcoal/90 p-6">
                  <dt className="text-[11px] uppercase tracking-eyebrow text-oak-soft">
                    {k}
                  </dt>
                  <dd className="mt-2 font-serif text-xl text-cream">{val}</dd>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
