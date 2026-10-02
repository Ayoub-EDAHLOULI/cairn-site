// Pure math for the cursor-reactive backdrop. No DOM, no imports: tested in math.test.ts.

/**
 * 1 at the centre, easing to 0 at `radius` and beyond. Flat at both ends ((1 − d²/r²)²), so a line
 * bent around the cursor stays a smooth curve instead of forming a kink right under it.
 */
export function falloff(distance: number, radius: number): number {
  if (distance >= radius) return 0;
  const t = 1 - (distance * distance) / (radius * radius);
  return t * t;
}

/** Moves `current` a fraction `rate` (0–1) of the way to `target`: frame-by-frame easing. */
export function approach(current: number, target: number, rate: number): number {
  return current + (target - current) * rate;
}

/** The canvas equivalent of SVG `preserveAspectRatio="xMidYMid slice"`: scale and offset of the viewBox. */
export function sliceTransform(width: number, height: number, viewWidth: number, viewHeight: number) {
  const scale = Math.max(width / viewWidth, height / viewHeight);
  return {
    scale,
    offsetX: (width - viewWidth * scale) / 2,
    offsetY: (height - viewHeight * scale) / 2,
  };
}

/** Parses an absolute "M x,y C … C … Z" path into its start point and cubic segments. */
export function parseCubicPath(d: string): { start: [number, number]; segments: number[][] } {
  const numbers = (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
  const segments: number[][] = [];
  for (let i = 2; i + 6 <= numbers.length; i += 6) segments.push(numbers.slice(i, i + 6));
  return { start: [numbers[0], numbers[1]], segments };
}

/** A point on the cubic Bézier p0 → p3 at t (0–1). */
export function cubicPoint(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number,
): number {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

/** "#6050dc" → [96, 80, 220]. */
export function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)) as [number, number, number];
}
