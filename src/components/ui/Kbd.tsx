import type { ReactNode } from "react";
import styles from "./Kbd.module.css";

/** A small inline keycap, like the ↵ in the launcher footer. */
export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className={styles.kbd}>{children}</kbd>;
}
