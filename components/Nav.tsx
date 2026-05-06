"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors backdrop-blur ${
        scrolled
          ? "border-line bg-paper/95"
          : "border-transparent bg-paper/80"
      }`}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between px-5 py-3 md:px-12 md:py-4">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="group flex items-baseline gap-1.5"
        >
          <span className="font-script text-2xl text-steel transition-colors group-hover:text-steel-deep">
            Chris
          </span>
          <span className="font-serif text-base font-semibold tracking-tight text-charcoal">
            Daniels Floors
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[11px] font-medium uppercase tracking-nav text-charcoal-mid transition-colors hover:text-steel"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.phone.href}
                className="rounded-sm bg-charcoal px-4 py-2 text-[11px] font-medium uppercase tracking-button text-cream transition-colors hover:bg-steel-deep"
              >
                {site.phone.display}
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="block h-px w-6 bg-charcoal" />
          <span aria-hidden className="mt-1.5 block h-px w-6 bg-charcoal" />
          <span aria-hidden className="mt-1.5 block h-px w-6 bg-charcoal" />
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile primary"
          className="border-t border-line bg-paper md:hidden"
        >
          <ul className="flex flex-col px-5 py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 text-sm uppercase tracking-nav text-charcoal-mid"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a
                href={site.phone.href}
                className="inline-block rounded-sm bg-charcoal px-4 py-2 text-xs uppercase tracking-button text-cream"
              >
                Call {site.phone.display}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
