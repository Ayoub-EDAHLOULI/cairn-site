// Pure comet logic for the hero backdrop: comets are bright heads with fading tails that run along
// the rings. No DOM, no imports: tested in comets.test.ts.

/** Wraps a point index onto a closed ring of `count` points. */
export function wrapIndex(index: number, count: number): number {
  return ((index % count) + count) % count;
}

/** Moves a comet head (a fractional point index) by `velocity` points per ms over `dt` ms, wrapping. */
export function stepHead(head: number, velocity: number, dt: number, count: number): number {
  return wrapIndex(head + velocity * dt, count);
}

/** Opacity over a comet's life: quick fade-in, hold, then a long fade-out. */
export function cometOpacity(age: number, life: number): number {
  if (age <= 0 || age >= life) return 0;
  const t = age / life;
  if (t < 0.08) return t / 0.08;
  if (t > 0.55) return (1 - t) / 0.45;
  return 1;
}

/** Cursor speed (px/ms) below which no comets launch: resting hands shouldn't spark. */
const MIN_SPEED = 0.15;
/** Comets per ms per unit of speed above the minimum, and the hard ceiling on that rate. */
const RATE_GAIN = 0.012;
const MAX_RATE = 0.03;

/**
 * How many comets a cursor moving at `speed` px/ms launches in `dt` ms. Fractions carry over
 * between frames, so slow movement still launches the occasional comet.
 */
export function emission(speed: number, dt: number, carry: number): { count: number; carry: number } {
  const rate = Math.min(MAX_RATE, Math.max(0, (speed - MIN_SPEED) * RATE_GAIN));
  const total = carry + rate * dt;
  const count = Math.floor(total);
  return { count, carry: total - count };
}
