import Image from "next/image";
import { site } from "@/lib/site";
import { getHeroPhoto } from "@/lib/photos";
import HeroMotion from "./HeroMotion";

export default async function Hero() {
  const hero = await getHeroPhoto();

  return (
    <section className="relative isolate overflow-hidden text-cream">
      {/* Background — uploaded image OR gradient fallback */}
      <div aria-hidden className="absolute inset-0 -z-20">
        {hero ? (
          <>
            <Image
              src={hero.url}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />
          </>
        ) : (
          <div className="absolute inset-0 brand-gradient drift" />
        )}
      </div>

      {/* Plank stripe overlay (preserved brand primitive) */}
      <div aria-hidden className="absolute inset-0 -z-10 plank-overlay" />

      {/* Soft vignette at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(31,36,40,0.55) 100%)",
        }}
      />

      <div className="mx-auto flex min-h-[92vh] max-w-shell flex-col justify-between px-6 py-10 md:min-h-[96vh] md:px-12 md:py-14">
        {/* Top meta */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-cover opacity-90">
          <span>Vol. 01 · {new Date().getFullYear()}</span>
          <span className="hidden md:inline">{site.serviceArea}</span>
        </div>

        <HeroMotion phone={site.phone} taglinePrimary={site.taglines.primary} />

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
