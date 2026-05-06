import Eyebrow from "./Eyebrow";
import Reveal, { Stagger, StaggerItem } from "./motion/Reveal";

const groups = [
  {
    n: "I",
    title: "The Gulf Coast homeowner",
    body:
      "Renovating a kitchen, redoing a den after a hurricane, finally pulling up that 1990s carpet. Practical, value-driven, wants the work done right the first time. Not chasing trends — chasing longevity.",
  },
  {
    n: "II",
    title: "The small commercial buyer",
    body:
      "A church, a clinic, a coffee shop owner. Needs a clean install on a real schedule, with a person you can call directly when something needs adjusting.",
  },
  {
    n: "III",
    title: "The general contractor",
    body:
      "A builder or remodeler who wants a flooring sub who shows up, finishes, and doesn't make their punch list longer.",
  },
];

export default function Audience() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-shell px-6 py-24 md:px-12 md:py-28">
        <Reveal className="max-w-2xl">
          <Eyebrow number="04">Who we serve</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            Three audiences.
            <span className="block italic text-steel">One way of working.</span>
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {groups.map((g) => (
            <StaggerItem key={g.title}>
              <div className="group relative h-full border-t border-line pt-8 transition-colors">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-12 bg-oak transition-all duration-500 group-hover:w-24"
                />
                <span className="font-serif italic text-oak">{g.n}</span>
                <h3 className="mt-3 font-serif text-2xl text-charcoal">{g.title}</h3>
                <p className="mt-4 text-charcoal-mid">{g.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
