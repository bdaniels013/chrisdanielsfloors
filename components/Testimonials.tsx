"use client";

import Eyebrow from "./Eyebrow";
import Reveal from "./motion/Reveal";

const testimonials = [
  {
    quote:
      "Chris measured the kitchen himself, gave us a quote on the spot, and the floor was in by the next week. Cleaner job than the contractor who built the house.",
    author: "Allie M.",
    place: "Ocean Springs, MS",
  },
  {
    quote:
      "He pulled up the old carpet, leveled the subfloor, and laid the LVP in two days. Tight seams, perfect transitions. Looks like art.",
    author: "Garrett T.",
    place: "Biloxi, MS",
  },
  {
    quote:
      "We've used Chris for our church, our coffee shop, and our home. He shows up. He finishes. The work holds up.",
    author: "Pastor R.",
    place: "Gulfport, MS",
  },
  {
    quote:
      "I've been a contractor for twenty years. Chris is the only flooring sub I trust to send straight to a customer.",
    author: "Mike D.",
    place: "Pass Christian, MS",
  },
  {
    quote:
      "Honest pricing, no surprise add-ons. The floor still looks brand new four summers later.",
    author: "Karen J.",
    place: "Long Beach, MS",
  },
  {
    quote:
      "Couldn't believe the difference. Old vinyl gone, Knox plank in. Whole house feels new.",
    author: "Daniel & Pat S.",
    place: "Diamondhead, MS",
  },
];

export default function Testimonials() {
  // Duplicate for the seamless marquee.
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-shell px-6 pt-20 md:px-12 md:pt-28">
        <Reveal className="max-w-2xl">
          <Eyebrow number="05">What folks say</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            The work speaks first.
            <span className="block italic text-steel">Customers second.</span>
          </h2>
        </Reveal>
      </div>

      {/* Marquee track */}
      <div
        className="group/track relative mt-12 overflow-hidden pb-20 md:pb-28"
        aria-label="Customer testimonials"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent"
        />

        <div className="marquee group-hover/track:[animation-play-state:paused] flex w-max gap-6 px-6 md:gap-8 md:px-12">
          {loop.map((t, i) => (
            <figure
              key={i}
              className="w-[78vw] max-w-[420px] shrink-0 rounded-md border border-line bg-paper p-7 shadow-[var(--shadow-elev-1)] md:p-8"
            >
              <div aria-hidden className="font-serif text-4xl leading-none text-oak">
                &ldquo;
              </div>
              <blockquote className="mt-2 text-[15px] leading-relaxed text-charcoal-mid">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-baseline justify-between border-t border-line pt-4 text-sm">
                <span className="font-serif italic text-charcoal">{t.author}</span>
                <span className="text-[10px] uppercase tracking-button text-charcoal-soft">
                  {t.place}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
