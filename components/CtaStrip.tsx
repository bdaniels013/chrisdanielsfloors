import Link from "next/link";
import Reveal from "./motion/Reveal";
import { site } from "@/lib/site";

export default function CtaStrip() {
  return (
    <section className="relative overflow-hidden bg-steel text-cream">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-steel-deep via-steel to-steel-mist drift"
        style={{ backgroundSize: "200% 200%" }}
      />
      <div aria-hidden className="absolute inset-0 plank-overlay opacity-30" />
      <div aria-hidden className="absolute inset-0 noise" />

      <div className="relative mx-auto max-w-shell px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <div className="grid items-center gap-10 md:grid-cols-[2fr_1fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-oak-soft">
                {site.taglines.service}
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight md:text-6xl">
                Call {site.phone.display}.
                <br className="hidden md:block" />
                <span className="font-serif italic">
                  Chris will come measure it himself.
                </span>
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={site.phone.href}
                className="group rounded-sm bg-cream px-6 py-3.5 text-center text-[11px] font-medium uppercase tracking-button text-charcoal shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-paper hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
              >
                Call {site.phone.display}
              </a>
              <a
                href={site.phone.sms}
                className="rounded-sm border border-cream/70 px-6 py-3.5 text-center text-[11px] font-medium uppercase tracking-button text-cream backdrop-blur-sm transition-colors hover:border-cream hover:bg-cream/10"
              >
                Text us
              </a>
              <Link
                href="/contact"
                className="rounded-sm border border-cream/30 px-6 py-3.5 text-center text-[11px] font-medium uppercase tracking-button text-cream/90 transition-colors hover:bg-cream/10"
              >
                Request a quote
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
