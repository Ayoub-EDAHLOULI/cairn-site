// Landing-page motion. `motion-ok` on <html> is the single source of truth for "motion may play":
// - the inline head script below adds it before first paint unless the visitor prefers reduced motion;
// - pre-animation states are styled only under `.motion-ok`, so without JS (or with reduced motion)
//   everything shows in its final state;
// - safety net: if the app hasn't hydrated within 4s (bundle failed or stalled), the class is removed
//   and everything snaps to its final state;
// - MotionReady removes it when the visitor leaves "/", so returning via next/link never replays.

export const MOTION_CLASS = "motion-ok";

/** Runs in <head> before first paint. Keep it tiny and dependency-free. */
export const motionHeadScript = `(function(){var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("${MOTION_CLASS}");setTimeout(function(){if(!window.__cairnReady)d.classList.remove("${MOTION_CLASS}")},4000)})();`;

export function motionAllowed(): boolean {
  return document.documentElement.classList.contains(MOTION_CLASS);
}

/** Calls `fn` now if the page is visible, otherwise once it becomes visible. Returns a cancel function. */
export function whenPageVisible(fn: () => void): () => void {
  if (document.visibilityState === "visible") {
    fn();
    return () => {};
  }
  const onChange = () => {
    if (document.visibilityState !== "visible") return;
    document.removeEventListener("visibilitychange", onChange);
    fn();
  };
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}
