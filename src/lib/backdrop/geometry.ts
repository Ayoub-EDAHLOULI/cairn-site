import { CONTOUR_CENTER, VIEW_HEIGHT, VIEW_WIDTH, contours } from "./contours";
import { cubicPoint, parseCubicPath, sliceTransform } from "./math";

/** Points sampled along each cubic segment of a ring (4 segments per ring): dense enough that a bent ring stays smooth. */
const SAMPLES_PER_SEGMENT = 100;

/** Where the viewBox lands on a canvas of this size (same mapping as the SVG's `xMidYMid slice`). */
export function viewTransform(width: number, height: number) {
  return sliceTransform(width, height, VIEW_WIDTH, VIEW_HEIGHT);
}

/** The rings as flat [x0, y0, x1, y1, …] arrays in canvas pixels, plus the viewBox scale. */
export function ringPoints(width: number, height: number) {
  const { scale, offsetX, offsetY } = viewTransform(width, height);
  const toX = (x: number, ringScale: number) => (CONTOUR_CENTER.x + x * ringScale) * scale + offsetX;
  const toY = (y: number, ringScale: number) => (CONTOUR_CENTER.y + y * ringScale) * scale + offsetY;

  const rings = contours.map(({ scale: ringScale, d }) => {
    const { start, segments } = parseCubicPath(d);
    const points = new Float32Array(segments.length * SAMPLES_PER_SEGMENT * 2);
    let [x0, y0] = start;
    let index = 0;
    for (const [x1, y1, x2, y2, x3, y3] of segments) {
      for (let k = 0; k < SAMPLES_PER_SEGMENT; k++) {
        const t = k / SAMPLES_PER_SEGMENT;
        points[index++] = toX(cubicPoint(x0, x1, x2, x3, t), ringScale);
        points[index++] = toY(cubicPoint(y0, y1, y2, y3, t), ringScale);
      }
      x0 = x3;
      y0 = y3;
    }
    return points;
  });

  return { rings, scale };
}
