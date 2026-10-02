import styles from "./CairnMark.module.css";

type CairnMarkProps = {
  /** Outer size in px. */
  size: number;
  /** `tile`: white stones on an accent square. `plain`: accent stones, no tile. */
  variant?: "tile" | "plain";
  className?: string;
};

/** The Cairn mark: three stacked stones. Always decorative; label the parent link instead. */
export function CairnMark({ size, variant = "tile", className }: CairnMarkProps) {
  const stones = (
    <svg
      viewBox="0 0 24 24"
      width={variant === "tile" ? Math.round(size * 0.6) : size}
      height={variant === "tile" ? Math.round(size * 0.6) : size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="12" cy="19" rx="9" ry="3.2" />
      <ellipse cx="11.5" cy="12.6" rx="6.2" ry="2.8" />
      <ellipse cx="12.4" cy="6.8" rx="3.8" ry="2.4" />
    </svg>
  );

  if (variant === "plain") {
    return <span className={`${styles.plain} ${className ?? ""}`}>{stones}</span>;
  }

  return (
    <span
      className={`${styles.tile} ${className ?? ""}`}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.28) }}
      aria-hidden="true"
    >
      {stones}
    </span>
  );
}
