import Link from "next/link";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-cream">
      {/* Background gradients per brand guidelines */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(135deg, rgba(31,36,40,0.62) 0%, rgba(79,106,134,0.55) 100%), radial-gradient(ellipse at top right, #E5D2BD 0%, #F4EFE6 60%)",
        }}
      />
      {/* Plank stripe overlay */}
      <div aria-hidden className="absolute inset-0 -z-10 plank-overlay" />

      <div className="mx-auto flex min-h-[88vh] max-w-shell flex-col justify-between px-6 py-12 md:min-h-[92vh] md:px-12 md:py-16">
        {/* Top meta */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-cover opacity-90">
          <span>Vol. 01 · {new Date().getFullYear()}</span>
          <span className="hidden md:inline">{site.serviceArea}</span>
        </div>

        {/* Center wordmark */}
        <div className="my-auto flex flex-col items-center text-center fade-in">
          <h1 className="font-script text-7xl leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.25)] sm:text-8xl md:text-[8rem]">
            Chris Daniels
          </h1>
          <span aria-hidden className="my-7 block h-px w-64 bg-cream/55 md:w-80" />
          <span
            className="font-sans text-base font-light uppercase md:text-xl"
            style={{ letterSpacing: "0.6em", paddingLeft: "0.6em" }}
          >
            Floors
          </span>
          <p className="mt-8 max-w-2xl font-serif text-base italic opacity-95 md:text-lg">
            Hardwood, tile, and luxury vinyl plank — installed by hand, finished
            tight, signed with a name.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-cream px-7 py-3 text-[11px] font-medium uppercase tracking-button text-charcoal transition-transform hover:-translate-y-px hover:bg-paper"
            >
              Get a Free Quote
            </Link>
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2 rounded-sm border border-cream/70 px-7 py-3 text-[11px] font-medium uppercase tracking-button text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              {site.phone.display}
            </a>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="flex items-end justify-between text-[11px] uppercase tracking-cover opacity-90">
          <span className="font-serif text-sm italic normal-case tracking-normal opacity-95">
            {site.taglines.primary}
          </span>
          <span className="hidden md:inline">Est. {site.established}</span>
        </div>
      </div>
    </section>
  );
}
