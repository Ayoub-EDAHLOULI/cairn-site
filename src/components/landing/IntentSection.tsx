import type { CSSProperties } from "react";
import { intentExamples } from "@/content/intentExamples";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./IntentSection.module.css";

export function IntentSection() {
  return (
    <section id="features" className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 className="section-title">Search by what you remember, not what you typed.</h2>
          <p className={`lead ${styles.copy}`}>
            Every entry carries one sentence: why you saved it. Cairn searches that sentence as seriously as the
            command itself, so the words you remember months later are enough.
          </p>
          <p className={`lead ${styles.copy} ${styles.second}`}>
            Typing partial words works, accents don&apos;t matter, and if no entry has every word, Cairn shows the
            closest ones instead of nothing.
          </p>
        </div>

        <Reveal className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="visually-hidden">Example searches and what Cairn finds</caption>
            <thead>
              <tr>
                <th scope="col">You type</th>
                <th scope="col">Cairn finds</th>
              </tr>
            </thead>
            <tbody>
              {intentExamples.map((example, row) => (
                <tr key={example.query} style={{ "--row": row, "--len": example.query.length } as CSSProperties}>
                  <td className={styles.query}>
                    {/* Typing effect: every character is laid out from the start and only fades in, so rows
                        never change size. Screen readers get the plain text instead of single letters. */}
                    <span className={`visually-hidden ${styles.spoken}`}>{example.query}</span>
                    <span aria-hidden="true">
                      {[...example.query].map((char, index) => (
                        <span key={index} className={styles.char} style={{ "--i": index } as CSSProperties}>
                          {char}
                        </span>
                      ))}
                    </span>
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
