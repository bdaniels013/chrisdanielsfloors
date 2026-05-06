import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import Gallery from "@/components/Gallery";
import BeforeAfter from "@/components/BeforeAfter";
import PlaceholderImage from "@/components/PlaceholderImage";
import CtaStrip from "@/components/CtaStrip";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Recent flooring projects across the Mississippi Gulf Coast — LVP, hardwood, tile, and carpet installations.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-shell px-6 py-20 md:px-12 md:py-32">
          <Eyebrow number="01">Project gallery</Eyebrow>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            The art of flooring.
          </h1>
          <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-charcoal-mid">
            Real rooms on the Coast. No stock photography, no staged corners —
            just what got installed and how it looks now.
          </p>

          <div className="mt-14">
            <Gallery />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-shell px-6 py-20 md:px-12 md:py-28">
          <Eyebrow number="02">Before & after</Eyebrow>
          <h2 className="max-w-2xl font-serif text-3xl md:text-5xl">
            Drag the slider. Same room, two stories.
          </h2>
          <p className="mt-4 max-w-prose text-charcoal-mid">
            The grain of an oak plank tells you everything about the tree it
            came from. A floor is just a story laid flat.
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <BeforeAfter
              label="Den · Old carpet → Knox Collection LVP"
              beforeShot={
                <PlaceholderImage shot="grain-texture" ratio="4/3" className="h-full w-full" />
              }
              afterShot={
                <PlaceholderImage shot="room-wide" ratio="4/3" className="h-full w-full" />
              }
            />
            <BeforeAfter
              label="Bath · Tile reset"
              beforeShot={
                <PlaceholderImage shot="hands-at-work" ratio="4/3" className="h-full w-full" />
              }
              afterShot={
                <PlaceholderImage shot="tile-flatlay" ratio="4/3" className="h-full w-full" />
              }
            />
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
