import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import PullQuote from "@/components/PullQuote";
import Process from "@/components/Process";
import CtaStrip from "@/components/CtaStrip";

export const metadata: Metadata = {
  title: "Installation — LVP, Hardwood, Tile, Carpet",
  description:
    "Premium flooring installation across the Mississippi Gulf Coast. Removal, subfloor prep, install, and finishing — quiet seams, level under the island.",
};

const services = [
  {
    title: "Luxury Vinyl Plank",
    body:
      "Glue-down or click-lock. Tight seams, level transitions, hand-cut to fit. The default for Coast-facing rooms — waterproof, quiet, low-maintenance.",
  },
  {
    title: "Carpet",
    body:
      "Tear-out of old carpet, fresh padding, careful seaming. Customized to the room, the traffic pattern, and what you'll be living on.",
  },
  {
    title: "Hardwood",
    body:
      "Solid and engineered, nail-down or float. Acclimated on site so the boards don't move on you in the first humid summer.",
  },
  {
    title: "Tile",
    body:
      "Sealed grout, level pan, no-lippage finish. Bath floors, kitchens, threshold transitions where two materials meet.",
  },
];

export default function InstallationPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-shell px-6 py-20 md:px-12 md:py-32">
          <Eyebrow number="01">Installation</Eyebrow>
          <h1 className="max-w-4xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            Premium flooring solutions, hand-installed.
          </h1>
          <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-charcoal-mid">
            Our installation process is quick and easy, with minimal disruption
            to your daily routine. Home improvement projects can be stressful,
            so we make the install as smooth as possible — for you, and for the
            room.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-line/60 md:grid-cols-2">
            {services.map((s) => (
              <article key={s.title} className="bg-paper p-7 md:p-9">
                <h2 className="font-serif text-2xl text-charcoal">{s.title}</h2>
                <p className="mt-3 max-w-prose text-charcoal-mid">{s.body}</p>
              </article>
            ))}
          </div>

          <PullQuote>
            Tight seams. Quiet thresholds. A floor installed so well the
            homeowner forgets we were there.
          </PullQuote>
        </div>
      </section>

      <Process />
      <CtaStrip />
    </>
  );
}
