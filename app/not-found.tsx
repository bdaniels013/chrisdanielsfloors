import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid min-h-[60vh] max-w-shell place-items-center px-6 py-24 text-center md:px-12">
        <div>
          <span className="font-serif italic text-oak">404</span>
          <h1 className="mt-3 font-serif text-4xl leading-tight md:text-6xl">
            Wrong threshold.
          </h1>
          <p className="mt-4 max-w-prose text-charcoal-mid">
            That page isn&apos;t laid down. Head back to the homepage or call
            us — we&apos;ll point you the right way.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-sm bg-charcoal px-6 py-3 text-[11px] font-medium uppercase tracking-button text-cream transition-colors hover:bg-steel-deep"
            >
              Back home
            </Link>
            <Link
              href="/contact"
              className="rounded-sm border border-charcoal px-6 py-3 text-[11px] font-medium uppercase tracking-button text-charcoal transition-colors hover:bg-charcoal hover:text-cream"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
