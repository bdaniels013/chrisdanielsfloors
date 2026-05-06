"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "h1" | "h2" | "h3" | "p";
  once?: boolean;
  amount?: number;
};

export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
  once = true,
  amount = 0.2,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;
  if (reduce) {
    return <Comp className={className}>{children}</Comp>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </Comp>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.08,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
