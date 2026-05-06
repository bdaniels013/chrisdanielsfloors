import Eyebrow from "./Eyebrow";

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
    <section className="bg-charcoal text-cream">
      <div className="mx-auto max-w-shell px-6 py-20 md:px-12 md:py-32">
        <div className="max-w-2xl">
          <Eyebrow number="03" variant="dark">
            How a job goes
          </Eyebrow>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            Five steps. The same steps, every time.
          </h2>
          <p className="mt-6 max-w-prose text-cream/85">
            Confidence doesn&apos;t shout. The process is calm because the
            crew has done it for thirty years.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-sm bg-cream/10 md:grid-cols-5">
          {steps.map((step) => (
            <li
              key={step.n}
              className="bg-charcoal p-8"
            >
              <span className="font-serif italic text-oak-soft">{step.n}</span>
              <h3 className="mt-2 font-serif text-xl leading-snug text-cream">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
