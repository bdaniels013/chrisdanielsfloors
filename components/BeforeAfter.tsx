"use client";

import { useState, useRef, useCallback } from "react";

type Props = {
  beforeShot: React.ReactNode;
  afterShot: React.ReactNode;
  label?: string;
};

export default function BeforeAfter({ beforeShot, afterShot, label }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  return (
    <figure className="my-6">
      <div
        ref={ref}
        className="relative isolate aspect-[4/3] w-full select-none overflow-hidden rounded-sm border border-line/60"
        onMouseMove={(e) => e.buttons === 1 && update(e.clientX)}
        onTouchMove={(e) => update(e.touches[0].clientX)}
        onClick={(e) => update(e.clientX)}
      >
        <div className="absolute inset-0 -z-10">{beforeShot}</div>
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <div className="h-full w-screen max-w-none">{afterShot}</div>
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-charcoal/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-button text-cream">
          After
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-cream/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-button text-charcoal">
          Before
        </span>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-cream"
          style={{ left: `${pos}%` }}
        />
        <button
          type="button"
          aria-label="Drag to compare before and after"
          className="absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-charcoal/20 bg-cream shadow-md"
          style={{ left: `${pos}%` }}
          onMouseDown={() => {}}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1F2428" strokeWidth="2" aria-hidden>
            <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
          </svg>
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Before/after slider position"
          className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0"
        />
      </div>
      {label && (
        <figcaption className="mt-3 text-[11px] uppercase tracking-eyebrow text-charcoal-soft">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
