import type { CSSProperties } from "react";
import styles from "./TypedText.module.css";

type TypedTextProps = {
  text: string;
  /** Class for each character span; the section's CSS animates it, using `--i` (the character index). */
  charClassName?: string;
};

/**
 * Text that can "type itself": every character is laid out from the start and only fades in, so
 * nothing changes size. Screen readers get one plain copy instead of single letters.
 */
export function TypedText({ text, charClassName }: TypedTextProps) {
  return (
    <>
      <span className={`visually-hidden ${styles.spoken}`}>{text}</span>
      <span aria-hidden="true">
        {[...text].map((char, index) => (
          <span key={index} className={charClassName} style={{ "--i": index } as CSSProperties}>
            {char}
          </span>
        ))}
      </span>
    </>
  );
}
