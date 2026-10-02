import styles from "./TrailBackdrop.module.css";

// One closed contour shape, repeated at growing scales like a topographic map.
const CONTOUR =
  "M0,-225 C180,-235 320,-145 330,-15 C340,125 200,215 10,225 C-180,235 -330,155 -340,5 C-350,-145 -180,-215 0,-225Z";
const contours: { scale: number; d: string }[] = [
  { scale: 0.55, d: CONTOUR },
  { scale: 0.9, d: CONTOUR },
  {
    scale: 1.3,
    d: "M0,-225 C190,-240 330,-140 335,-10 C345,135 195,225 5,232 C-190,240 -340,150 -345,0 C-350,-150 -185,-215 0,-225Z",
  },
  {
    scale: 1.75,
    d: "M0,-225 C175,-245 335,-150 330,-20 C330,130 205,220 15,228 C-175,236 -335,160 -342,10 C-348,-140 -190,-210 0,-225Z",
  },
  {
    scale: 2.25,
    d: "M0,-225 C185,-232 325,-150 332,-12 C340,128 198,218 8,226 C-182,234 -332,152 -340,2 C-348,-148 -182,-218 0,-225Z",
  },
  { scale: 2.8, d: CONTOUR },
];

const TRAIL =
  "M60,880 C220,780 300,640 470,600 C640,560 760,640 930,520 C1080,415 1180,300 1360,250";

/** A small cairn of three stones, centred on its base stone. */
function Cairn({ x, y }: { x: number; y: number }) {
  return (
    <g className={styles.cairn}>
      <ellipse cx={x} cy={y} rx="12" ry="5" />
      <ellipse cx={x - 1} cy={y - 9} rx="8" ry="4" />
      <ellipse cx={x} cy={y - 16} rx="5" ry="3" />
    </g>
  );
}

/** Decorative hero background: contour lines, a dotted trail and two cairns. */
export function TrailBackdrop() {
  return (
    <svg
      className={styles.backdrop}
      viewBox="0 0 1400 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className={styles.contours} transform="translate(700 560)">
        {contours.map(({ scale, d }) => (
          <path
            key={scale}
            d={d}
            transform={`scale(${scale})`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      {/* The dotted trail shows through a solid copy of itself, which draws in once (CSS, under .motion-ok). */}
      <mask id="trail-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1400" height="900">
        <path className={styles.trailMask} d={TRAIL} pathLength={1} />
      </mask>
      <path className={styles.trail} d={TRAIL} mask="url(#trail-reveal)" />
      <Cairn x={470} y={596} />
      <Cairn x={1080} y={412} />
    </svg>
  );
}
