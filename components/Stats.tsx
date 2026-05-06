"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

const stats = [
  { value: site.yearsExperience, suffix: "+", label: "Years on the Coast" },
  { value: 1000, suffix: "+", label: "Floors installed" },
  { value: 5, suffix: "★", label: "Customer rating" },
  { value: 0, prefix: "$", label: "In-home estimate fee" },
];

function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(reduce ? to : 0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1] });
    return controls.stop;
  }, [inView, mv, to, reduce]);

  return (
    <span ref={ref} className="font-serif text-5xl text-cream md:text-6xl">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-cream">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-steel-deep opacity-90"
      />
      <div aria-hidden className="absolute inset-0 noise" />
      <div className="relative mx-auto max-w-shell px-6 py-20 md:px-12 md:py-24">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-cream/15 pl-5">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              <p className="mt-3 text-[11px] font-medium uppercase tracking-eyebrow text-cream/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
