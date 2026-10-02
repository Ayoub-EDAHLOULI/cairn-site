import type { CSSProperties } from "react";
import { kindOrder, kinds } from "@/content/kinds";
import { KindGlyph } from "@/components/ui/KindGlyph";
import styles from "./KindsSection.module.css";

export function KindsSection() {
  return (
    <section className={styles.section} aria-labelledby="kinds-title">
      <div className="container">
        <h2 id="kinds-title" className={styles.title}>
          Five kinds of things worth keeping.
        </h2>
        <p className={`lead ${styles.lead}`}>
          No folders to maintain. Pick a kind, add a few tags, and filter with a keystroke.
        </p>
        <ul className={styles.strip}>
          {kindOrder.map((id) => {
            const kind = kinds[id];
            return (
              <li key={id} className={styles.kind} style={{ "--kind": kind.color } as CSSProperties}>
                <span className={styles.glyph} aria-hidden="true">
                  <KindGlyph kind={kind} />
                </span>
                <h3 className={styles.name}>{kind.plural}</h3>
                <p className={styles.description}>{kind.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
