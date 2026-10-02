// The hero backdrop's map: topographic rings and the trail, in a 1400×900 viewBox.
// Shared by the SVG (TrailBackdrop, first paint and fallback) and the canvas (cursor-reactive layer),
// so both draw exactly the same rings.

export const VIEW_WIDTH = 1400;
export const VIEW_HEIGHT = 900;
/** The rings are centred here (viewBox units). */
export const CONTOUR_CENTER = { x: 700, y: 560 } as const;

// One closed ring shape (absolute M/C/Z only), plus three slightly irregular variants.
const RING = "M0,-225 C180,-235 320,-145 330,-15 C340,125 200,215 10,225 C-180,235 -330,155 -340,5 C-350,-145 -180,-215 0,-225Z";
const RING_B = "M0,-225 C190,-240 330,-140 335,-10 C345,135 195,225 5,232 C-190,240 -340,150 -345,0 C-350,-150 -185,-215 0,-225Z";
const RING_C = "M0,-225 C175,-245 335,-150 330,-20 C330,130 205,220 15,228 C-175,236 -335,160 -342,10 C-348,-140 -190,-210 0,-225Z";
const RING_D = "M0,-225 C185,-232 325,-150 332,-12 C340,128 198,218 8,226 C-182,234 -332,152 -340,2 C-348,-148 -182,-218 0,-225Z";

/** Rings from the inside out. */
export const contours: { scale: number; d: string }[] = [
  { scale: 0.55, d: RING },
  { scale: 0.72, d: RING_D },
  { scale: 0.9, d: RING },
  { scale: 1.1, d: RING_C },
  { scale: 1.3, d: RING_B },
  { scale: 1.52, d: RING },
  { scale: 1.75, d: RING_C },
  { scale: 2.0, d: RING_B },
  { scale: 2.25, d: RING_D },
  { scale: 2.52, d: RING_C },
  { scale: 2.8, d: RING },
];

export const TRAIL = "M60,880 C220,780 300,640 470,600 C640,560 760,640 930,520 C1080,415 1180,300 1360,250";

/**
 * Scales every coordinate of an absolute path (M/C/Z only). Used instead of a scale() transform with
 * non-scaling-stroke, which makes Chrome ignore pathLength and breaks the SVG draw-in.
 */
export function scalePath(d: string, scale: number): string {
  return d.replace(/-?\d+(\.\d+)?/g, (n) => String(Math.round(Number(n) * scale * 10) / 10));
}
