"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  phone: { display: string; href: string };
  taglinePrimary: string;
};

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function HeroMotion({ phone, taglinePrimary }: Props) {
  const reduce = useReducedMotion();
  const fade = (delay: number, y = 16) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease, delay },
        };

  return (
    <div className="my-auto flex flex-col items-center text-center">
      <motion.h1
        {...fade(0.05, 24)}
        className="font-script text-7xl leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)] sm:text-8xl md:text-[8.5rem]"
      >
        Chris Daniels
      </motion.h1>

      <motion.span
        aria-hidden
        {...(reduce
          ? {}
          : {
              initial: { scaleX: 0, opacity: 0 },
              animate: { scaleX: 1, opacity: 1 },
              transition: { duration: 1.1, ease, delay: 0.45 },
            })}
        className="my-7 block h-px w-64 origin-center bg-cream/60 md:w-96"
      />

      <motion.span
        {...fade(0.55)}
        className="font-sans text-base font-light uppercase md:text-xl"
        style={{ letterSpacing: "0.6em", paddingLeft: "0.6em" }}
      >
        Floors
      </motion.span>

      <motion.p
        {...fade(0.75)}
        className="mt-8 max-w-2xl font-serif text-base italic opacity-95 md:text-lg"
      >
        Hardwood, tile, and luxury vinyl plank — installed by hand, finished
        tight, signed with a name.
      </motion.p>

      <motion.div
        {...fade(0.95)}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
      >
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-sm bg-cream px-7 py-3.5 text-[11px] font-medium uppercase tracking-button text-charcoal shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-paper hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
        >
          Get a Free Quote
          <svg
            aria-hidden
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
        <a
          href={phone.href}
          className="inline-flex items-center gap-2 rounded-sm border border-cream/70 px-7 py-3.5 text-[11px] font-medium uppercase tracking-button text-cream backdrop-blur-sm transition-colors hover:border-cream hover:bg-cream/10"
        >
          <svg
            aria-hidden
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
          </svg>
          {phone.display}
        </a>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 0.7 },
              transition: { delay: 1.6, duration: 0.8 },
            })}
        className="mt-16 flex flex-col items-center gap-2 text-[10px] uppercase tracking-cover text-cream/70"
      >
        <span>Scroll</span>
        <motion.span
          className="block h-7 w-px bg-cream/60"
          animate={
            reduce
              ? undefined
              : { scaleY: [0.4, 1, 0.4], originY: 0 }
          }
          transition={
            reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </motion.div>

      {/* Hidden tagline for SEO */}
      <span className="sr-only">{taglinePrimary}</span>
    </div>
  );
}
