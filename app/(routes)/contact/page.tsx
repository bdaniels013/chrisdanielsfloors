import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Free Quote",
  description:
    "Free in-home estimates across the Mississippi Gulf Coast. Tell us about the room and Chris will reach out.",
};

export default function ContactPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-shell gap-12 px-6 py-24 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-12 md:py-32">
        <Reveal>
          <Eyebrow number="01">Contact</Eyebrow>
          <h1 className="font-serif text-4xl leading-tight tracking-tight md:text-7xl">
            Let&apos;s look
            <span className="block italic text-steel">at the room.</span>
          </h1>
          <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-charcoal-mid">
            Free in-home estimate. No follow-up calls, no pressure pitch —
            we&apos;ll measure it, talk through what the room calls for, and
            leave a written quote good for thirty days.
          </p>

          <div className="mt-10 border-t border-line pt-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-steel">
              Call or text
            </h2>
            <a
              href={site.phone.href}
              className="mt-3 block font-serif text-3xl text-charcoal hover:text-steel"
            >
              {site.phone.display}
            </a>
            <p className="mt-2 text-sm text-charcoal-soft">
              Chris answers. {site.serviceArea}.
            </p>
          </div>

          <div className="mt-8 border-t border-line pt-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-steel">
              Hours
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-charcoal-mid">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-6">
                  <span>{h.day}</span>
                  <span className="text-charcoal-soft">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}
