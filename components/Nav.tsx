"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, site } from "@/lib/site";
import ScrollProgress from "./motion/ScrollProgress";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <>
      <ScrollProgress />
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "border-line/80 bg-paper/85 backdrop-blur-xl shadow-[0_2px_24px_rgba(31,36,40,0.06)]"
            : "border-transparent bg-paper/40 backdrop-blur-md"
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
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`link-underline text-[11px] font-medium uppercase tracking-nav transition-colors ${
                        active ? "text-steel" : "text-charcoal-mid hover:text-steel"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href={site.phone.href}
                  className="rounded-sm bg-charcoal px-4 py-2 text-[11px] font-medium uppercase tracking-button text-cream shadow-[0_4px_14px_rgba(31,36,40,0.18)] transition-all hover:-translate-y-0.5 hover:bg-steel-deep hover:shadow-[0_8px_24px_rgba(31,36,40,0.28)]"
                >
                  {site.phone.display}
                </a>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 -mr-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              aria-hidden
              className={`block h-px w-6 bg-charcoal transition-transform duration-300 ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`mt-1 block h-px w-6 bg-charcoal transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              aria-hidden
              className={`mt-1 block h-px w-6 bg-charcoal transition-transform duration-300 ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              key="mobile-nav"
              aria-label="Mobile primary"
              className="md:hidden border-t border-line bg-paper"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <ul className="flex flex-col px-5 py-4">
                {nav.map((item) => (
                  <li key={item.href} className="border-b border-line/60 last:border-0">
                    <Link
                      href={item.href}
                      className="block py-3 text-sm uppercase tracking-nav text-charcoal-mid hover:text-steel"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4">
                  <a
                    href={site.phone.href}
                    className="inline-block rounded-sm bg-charcoal px-4 py-3 text-xs uppercase tracking-button text-cream"
                  >
                    Call {site.phone.display}
                  </a>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
