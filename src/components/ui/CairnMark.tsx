import { STONES, STONES_VIEWBOX, TILE_RADIUS } from "@/lib/brand";
import styles from "./CairnMark.module.css";

type CairnMarkProps = {
  /** Outer size in px. */
  size: number;
  /** `tile`: white stones on the Majorelle tile (the app icon). `plain`: accent stones, no tile. */
  variant?: "tile" | "plain";
  className?: string;
};

/** The Cairn mark: three stacked stones. Always decorative; label the parent link instead. */
export function CairnMark({ size, variant = "tile", className }: CairnMarkProps) {
  const stones = STONES.map((d) => <path key={d} d={d} />);

  if (variant === "plain") {
    return (
      <svg
        className={`${styles.plain} ${className ?? ""}`}
        viewBox={STONES_VIEWBOX}
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
      >
        {stones}
      </svg>
    );
  }

  return (
    <svg
      className={`${styles.tile} ${className ?? ""}`}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <rect className={styles.tileFill} width="100" height="100" rx={TILE_RADIUS} />
      <g className={styles.stones}>{stones}</g>
    </svg>
  );
}
