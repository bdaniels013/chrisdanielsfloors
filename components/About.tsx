import Eyebrow from "./Eyebrow";
import PullQuote from "./PullQuote";
import SmartImage from "./SmartImage";
import Reveal from "./motion/Reveal";
import { site } from "@/lib/site";
import { getGalleryPhotos } from "@/lib/photos";

export default async function About() {
  const photos = await getGalleryPhotos();
  const slot = (i: number) => photos[i]?.url ?? null;

  return (
    <section className="relative bg-cream">
      <div className="mx-auto max-w-shell px-6 py-24 md:grid md:grid-cols-2 md:gap-16 md:px-12 md:py-32">
        <Reveal>
          <Eyebrow number="02">About Chris</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            Thirty years
            <span className="block italic text-steel">on the Coast.</span>
          </h2>
          <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-charcoal-mid">
            Chris Daniels has been installing floors on the Mississippi Gulf
            Coast since {site.established}. Hardwood. Tile. Luxury vinyl plank.
            Big jobs, small jobs, and everything in between — homes, churches,
            clinics, the coffee shop down the street.
          </p>
          <p className="mt-4 max-w-prose text-[17px] leading-relaxed text-charcoal-mid">
            The work has always been the same: measured twice, set tight, and
            signed with a name. No salesmen. No subcontracted-out crews. The
            person who answers the phone is the same person who shows up to
            measure your kitchen.
          </p>

          <PullQuote>
            A floor is the one part of a home you trust without thinking. The
            brand exists to earn that quiet trust — and never break it.
          </PullQuote>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
            <li>
              <span className="block font-serif text-3xl text-charcoal">
                {site.yearsExperience}+
              </span>
              <span className="text-[11px] uppercase tracking-eyebrow text-charcoal-soft">
                Years on the Coast
              </span>
            </li>
            <li>
              <span className="block font-serif text-3xl text-charcoal">
                {new Date().getFullYear() - site.established}
              </span>
              <span className="text-[11px] uppercase tracking-eyebrow text-charcoal-soft">
                Years in business
              </span>
            </li>
            <li>
              <span className="block font-serif text-3xl text-charcoal">1</span>
              <span className="text-[11px] uppercase tracking-eyebrow text-charcoal-soft">
                Name on every job
              </span>
            </li>
            <li>
              <span className="block font-serif text-3xl text-charcoal">$0</span>
              <span className="text-[11px] uppercase tracking-eyebrow text-charcoal-soft">
                In-home estimate fee
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 md:mt-0">
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <div className="kenburn lift overflow-hidden rounded-md">
              <SmartImage src={slot(0)} alt="Project detail" shot="hands-at-work" ratio="3/4" />
            </div>
            <div className="kenburn lift mt-10 overflow-hidden rounded-md">
              <SmartImage src={slot(1)} alt="Plank grain" shot="plank-detail" ratio="3/4" />
            </div>
            <div className="kenburn lift overflow-hidden rounded-md">
              <SmartImage src={slot(2)} alt="Room wide" shot="room-wide" ratio="4/3" />
            </div>
            <div className="kenburn lift mt-10 overflow-hidden rounded-md">
              <SmartImage src={slot(3)} alt="Wood grain" shot="grain-texture" ratio="4/3" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
