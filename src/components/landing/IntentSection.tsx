import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/i18n";
import { intentExamples } from "@/content/intentExamples";
import { Reveal } from "@/components/ui/Reveal";
import { TypedText } from "@/components/ui/TypedText";
import styles from "./IntentSection.module.css";

export function IntentSection({ t }: { t: Dictionary }) {
  return (
    <section id="features" className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 className="section-title">{t.intent.title}</h2>
          <p className={`lead ${styles.copy}`}>{t.intent.paragraph1}</p>
          <p className={`lead ${styles.copy} ${styles.second}`}>{t.intent.paragraph2}</p>
        </div>

        <Reveal className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="visually-hidden">{t.intent.tableCaption}</caption>
            <thead>
              <tr>
                <th scope="col">{t.intent.youType}</th>
                <th scope="col">{t.intent.cairnFinds}</th>
              </tr>
            </thead>
            {/* The rows run the real (English) demo search, so they stay English in every language. */}
            <tbody lang="en">
              {intentExamples.map((example, row) => (
                <tr key={example.query} style={{ "--row": row, "--len": example.query.length } as CSSProperties}>
                  <td className={styles.query}>
                    <TypedText text={example.query} charClassName={styles.char} />
                  </td>
                  <td>
                    <code className={styles.found}>{example.shown}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
