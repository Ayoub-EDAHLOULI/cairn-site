import type { CSSProperties } from "react";
import { CONTOUR_CENTER, TRAIL, VIEW_HEIGHT, VIEW_WIDTH, contours, scalePath } from "@/lib/backdrop/contours";
import { HeroCanvas } from "./HeroCanvas";
import styles from "./TrailBackdrop.module.css";

/** Sets a CSS custom property (used to stagger the load animations). */
const cssVar = (name: string, value: string | number) => ({ [name]: value }) as CSSProperties;

const viewBox = `0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`;

/**
 * A small cairn of three stones, centred on its base stone. `stackAt` is when the trail's draw-in
 * reaches it; its stones then drop into place, bottom first.
 */
function Cairn({ x, y, stackAt }: { x: number; y: number; stackAt: string }) {
  return (
    <g className={styles.cairn} style={cssVar("--stack-at", stackAt)}>
      <ellipse cx={x} cy={y} rx="12" ry="5" style={cssVar("--i", 0)} />
      <ellipse cx={x - 1} cy={y - 9} rx="8" ry="4" style={cssVar("--i", 1)} />
      <ellipse cx={x} cy={y - 16} rx="5" ry="3" style={cssVar("--i", 2)} />
    </g>
  );
}

/**
 * Decorative hero background, in three layers:
 * 1. the topographic rings (SVG: first paint, and the fallback for no-JS, touch and reduced motion);
 * 2. the cursor-reactive canvas, which takes over from the rings for mouse users;
 * 3. the dotted trail and two cairns (SVG), always on top.
 */
export function TrailBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <svg
        className={`${styles.layer} ${styles.rings}`}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        {/* Drawn in once on load, inner ring first (CSS, under .motion-ok). */}
        <g className={styles.contours} transform={`translate(${CONTOUR_CENTER.x} ${CONTOUR_CENTER.y})`}>
          {contours.map(({ scale, d }, index) => (
            <path key={scale} d={scalePath(d, scale)} pathLength={1} style={cssVar("--i", index)} />
          ))}
        </g>
      </svg>

      <HeroCanvas className={`${styles.layer} ${styles.canvas}`} />

      <svg className={styles.layer} viewBox={viewBox} preserveAspectRatio="xMidYMid slice" focusable="false">
        {/* The dotted trail shows through a solid copy of itself, which draws in once (CSS, under .motion-ok). */}
        <mask id="trail-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width={VIEW_WIDTH} height={VIEW_HEIGHT}>
          <path className={styles.trailMask} d={TRAIL} pathLength={1} />
        </mask>
        <path className={styles.trail} d={TRAIL} mask="url(#trail-reveal)" />
        <Cairn x={470} y={596} stackAt="900ms" />
        <Cairn x={1080} y={412} stackAt="1500ms" />
      </svg>
    </div>
  );
}
