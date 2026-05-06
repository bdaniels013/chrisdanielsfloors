import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-cream/90">
      <div className="mx-auto max-w-shell px-6 py-20 md:px-12">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <span className="font-script text-4xl text-cream">
              Chris Daniels
            </span>
            <span aria-hidden className="my-3 block h-px w-32 bg-oak-soft/70" />
            <span className="block font-sans text-xs uppercase tracking-floors text-cream/85">
              Floors
            </span>
            <p className="mt-6 max-w-md font-serif italic text-cream/85">
              {site.taglines.primary}
            </p>
            <p className="mt-2 max-w-md text-sm text-cream/70">
              Hardwood, tile, and luxury vinyl plank — installed by hand,
              finished tight, signed with a name.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-oak-soft">
              Visit
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/80 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-oak-soft">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={site.phone.href}
                  className="block text-cream transition-colors hover:text-oak-soft"
                >
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.phone.sms}
                  className="block text-cream/85 transition-colors hover:text-oak-soft"
                >
                  Text us
                </a>
              </li>
              <li className="pt-2 text-cream/75">{site.serviceArea}</li>
            </ul>

            <h3 className="mt-8 text-[11px] font-semibold uppercase tracking-eyebrow text-oak-soft">
              Hours
            </h3>
            <ul className="mt-4 space-y-1 text-sm text-cream/80">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-cream/70">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-cream/10 pt-6 text-[11px] uppercase tracking-cover text-cream/55 md:flex-row md:items-center">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span>
            Est. {site.established} · {site.serviceArea}
          </span>
        </div>
      </div>
    </footer>
  );
}
