import type { Dictionary } from "@/content/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { TypedText } from "@/components/ui/TypedText";
import styles from "./OfflineSection.module.css";

const DATABASE_PATH = "%LOCALAPPDATA%\\com.ayoubedahlouli.cairn\\cairn.db";

export function OfflineSection({ t }: { t: Dictionary }) {
  return (
    <section id="offline" className="section" aria-labelledby="offline-title">
      <div className="container">
        <h2 id="offline-title" className={`section-title ${styles.title}`}>
          {t.offline.title}
        </h2>
        <p className={`lead ${styles.lead}`}>{t.offline.lead}</p>
        {/* Focusable so keyboard users can scroll it when the path overflows on narrow screens. */}
        <Reveal>
          <div className={styles.path} tabIndex={0} role="region" aria-label={t.offline.pathLabel}>
            <code>
              <TypedText text={DATABASE_PATH} charClassName={styles.char} />
            </code>
          </div>
        </Reveal>
        <ul className={styles.facts}>
          {t.offline.facts.map((fact) => (
            <li key={fact.title} className={styles.fact}>
              <h3 className={styles.factTitle}>{fact.title}</h3>
              <p className={styles.factText}>{fact.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
