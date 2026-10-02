"use client";

import { useRef, useState, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = {
  className?: string;
  children: ReactNode;
};

// Plays once the element's top passes 75% of the viewport height. Unlike a visibility threshold,
// this also fires for elements taller than the viewport (e.g. on a landscape phone).
const ROOT_MARGIN = "0px 0px -25% 0px";

/**
 * Sets `data-reveal="wait"` until the element scrolls into view, then `"play"`. Section CSS keys its
 * pre-states and animations on that attribute under `.motion-ok`, so the sections stay server components.
 */
export function Reveal({ className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"wait" | "play">("wait");
  useInView(ref, () => setState("play"), { rootMargin: ROOT_MARGIN, enabled: state === "wait" });

  return (
    <div ref={ref} className={className} data-reveal={state}>
      {children}
    </div>
  );
}
