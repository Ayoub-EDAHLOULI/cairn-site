import { useEffect, useEffectEvent, type RefObject } from "react";

type Options = {
  /** Fraction of the element that must be visible. Avoid high values on elements that can be taller than the viewport. */
  threshold?: number;
  /** IntersectionObserver rootMargin, e.g. "0px 0px -25% 0px" to fire when the top passes 75% of the viewport. */
  rootMargin?: string;
  /** Observe only while true. */
  enabled?: boolean;
};

/** Calls `onEnter` once, the first time the element scrolls into view. */
export function useInView(
  ref: RefObject<Element | null>,
  onEnter: () => void,
  { threshold = 0, rootMargin = "0px", enabled = true }: Options = {},
) {
  const enter = useEffectEvent(onEnter);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;
    if (!("IntersectionObserver" in window)) {
      enter();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        enter();
      },
      { threshold, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, enabled, threshold, rootMargin]);
}
