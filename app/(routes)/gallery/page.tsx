import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import Gallery from "@/components/Gallery";
import BeforeAfter from "@/components/BeforeAfter";
import PlaceholderImage from "@/components/PlaceholderImage";
import CtaStrip from "@/components/CtaStrip";
import Reveal from "@/components/motion/Reveal";
import { getGalleryPhotos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Recent flooring projects across the Mississippi Gulf Coast — LVP, hardwood, tile, and carpet installations.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <>
      <section className="relative bg-paper">
        <div className="mx-auto max-w-shell px-6 py-24 md:px-12 md:py-32">
          <Reveal>
            <Eyebrow number="01">Project gallery</Eyebrow>
            <h1 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight md:text-7xl">
              The art of
              <span className="italic text-steel"> flooring.</span>
            </h1>
            <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-charcoal-mid">
              Real rooms on the Coast. No stock photography, no staged corners —
              just what got installed and how it looks now.
            </p>
          </Reveal>

          <div className="mt-14">
            <Gallery photos={photos} />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-shell px-6 py-24 md:px-12 md:py-28">
          <Reveal>
            <Eyebrow number="02">Before & after</Eyebrow>
            <h2 className="max-w-2xl font-serif text-3xl md:text-5xl">
              Drag the slider.
              <span className="block italic text-steel">Same room, two stories.</span>
            </h2>
            <p className="mt-4 max-w-prose text-charcoal-mid">
              The grain of an oak plank tells you everything about the tree it
              came from. A floor is just a story laid flat.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <BeforeAfter
              label="Den · Old carpet → Knox Collection LVP"
              beforeShot={
                <PlaceholderImage
                  shot="grain-texture"
                  ratio="4/3"
                  className="h-full w-full"
                />
              }
              afterShot={
                <PlaceholderImage shot="room-wide" ratio="4/3" className="h-full w-full" />
              }
            />
            <BeforeAfter
              label="Bath · Tile reset"
              beforeShot={
                <PlaceholderImage
                  shot="hands-at-work"
                  ratio="4/3"
                  className="h-full w-full"
                />
              }
              afterShot={
                <PlaceholderImage
                  shot="tile-flatlay"
                  ratio="4/3"
                  className="h-full w-full"
                />
              }
            />
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
