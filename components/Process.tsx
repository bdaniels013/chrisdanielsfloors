import Eyebrow from "./Eyebrow";
import Reveal, { Stagger, StaggerItem } from "./motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Free in-home estimate",
    body:
      "Call (228) 596-0472. Chris will come measure it himself, talk through what the room calls for, and leave a written quote — no pressure, no follow-up calls.",
  },
  {
    n: "02",
    title: "Remove the existing floor",
    body:
      "Carpet, hardwood, tile, vinyl — we remove and dispose of it cleanly, with the right tools for the substrate.",
  },
  {
    n: "03",
    title: "Prep the subfloor",
    body:
      "Level under the island. Patch the low spots. A floor only stays flat if the subfloor under it does.",
  },
  {
    n: "04",
    title: "Install with care",
    body:
      "LVP, tile, hardwood, or carpet. Tight seams. Quiet thresholds. Cuts measured twice, set once.",
  },
  {
    n: "05",
    title: "Finishing touches",
    body:
      "Shoe molding reset, baseboards back where they belong, a clean broom-down before we leave.",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-cream">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-steel-deep/90"
      />
      <div aria-hidden className="absolute inset-0 noise" />

      <div className="relative mx-auto max-w-shell px-6 py-24 md:px-12 md:py-32">
        <Reveal className="max-w-2xl">
          <Eyebrow number="03" variant="dark">
            How a job goes
          </Eyebrow>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            Five steps.
            <span className="block italic text-oak-soft">
              The same steps, every time.
            </span>
          </h2>
          <p className="mt-6 max-w-prose text-cream/80">
            Confidence doesn&apos;t shout. The process is calm because the
            crew has done it for thirty years.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-md bg-cream/10 md:grid-cols-5">
          {steps.map((step, i) => (
            <StaggerItem key={step.n}>
              <div className="relative h-full bg-charcoal/85 p-7 transition-colors hover:bg-charcoal md:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif italic text-oak-soft">{step.n}</span>
                  <span className="text-[10px] uppercase tracking-button text-cream/40">
                    Step {i + 1}/{steps.length}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-xl leading-snug text-cream">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/75">
                  {step.body}
                </p>
                <span
                  aria-hidden
                  className="mt-6 block h-px w-10 bg-oak transition-all duration-500 group-hover:w-20"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
