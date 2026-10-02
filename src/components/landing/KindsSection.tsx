import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/i18n";
import { kindOrder, kinds } from "@/content/kinds";
import { KindGlyph } from "@/components/ui/KindGlyph";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./KindsSection.module.css";

export function KindsSection({ t }: { t: Dictionary }) {
  return (
    <section className={styles.section} aria-labelledby="kinds-title">
      <div className="container">
        <h2 id="kinds-title" className={styles.title}>
          {t.kinds.title}
        </h2>
        <p className={`lead ${styles.lead}`}>{t.kinds.lead}</p>
        <Reveal>
          <ul className={styles.strip}>
            {kindOrder.map((id, index) => {
              const kind = kinds[id];
              return (
                <li key={id} className={styles.kind} style={{ "--kind": kind.color, "--i": index } as CSSProperties}>
                  <span className={styles.glyph} aria-hidden="true">
                    <KindGlyph kind={kind} />
                  </span>
                  {/* Kind names stay English: they are what the app shows. */}
                  <h3 className={styles.name} lang="en">
                    {kind.plural}
                  </h3>
                  <p className={styles.description}>{t.kinds.descriptions[id]}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
