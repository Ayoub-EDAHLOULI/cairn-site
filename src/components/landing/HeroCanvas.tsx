"use client";

import { useEffect, useRef } from "react";
import { motionAllowed } from "@/lib/motion";

/** When the SVG rings finish drawing in (see TrailBackdrop.module.css); the canvas takes over after. */
const DRAW_IN_MS = 2400;

/**
 * The cursor-reactive layer of the hero backdrop (lib/backdrop/topoField). Mouse users only, never
 * under reduced motion; everyone else keeps the static SVG rings, and the canvas code is never
 * downloaded for them.
 */
export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let cancelled = false;
    let stop = () => {};
    // First visit: let the SVG draw-in finish, then open with a short comet flight.
    // Return visit (motion already played): take over at once, without the flight.
    const firstVisit = motionAllowed();
    const timer = setTimeout(
      async () => {
        const [{ runBackdrop }, { createScene }] = await Promise.all([
          import("@/lib/backdrop/runner"),
          import("@/lib/backdrop/topoField"),
        ]);
        if (!cancelled) stop = runBackdrop(canvas, createScene({ intro: firstVisit }));
      },
      firstVisit ? DRAW_IN_MS : 0,
    );

    return () => {
      cancelled = true;
      clearTimeout(timer);
      stop();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
