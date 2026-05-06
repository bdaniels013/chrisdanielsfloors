import Link from "next/link";
import { site } from "@/lib/site";

export default function CtaStrip() {
  return (
    <section className="bg-steel text-cream">
      <div className="mx-auto max-w-shell px-6 py-16 md:px-12 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[2fr_1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-oak-soft">
              {site.taglines.service}
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">
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
              className="rounded-sm bg-cream px-6 py-3 text-center text-[11px] font-medium uppercase tracking-button text-charcoal transition-colors hover:bg-paper"
            >
              Call {site.phone.display}
            </a>
            <a
              href={site.phone.sms}
              className="rounded-sm border border-cream/70 px-6 py-3 text-center text-[11px] font-medium uppercase tracking-button text-cream transition-colors hover:bg-cream/10"
            >
              Text us
            </a>
            <Link
              href="/contact"
              className="rounded-sm border border-cream/30 px-6 py-3 text-center text-[11px] font-medium uppercase tracking-button text-cream/90 transition-colors hover:bg-cream/10"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
