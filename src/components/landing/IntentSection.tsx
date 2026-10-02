import { intentExamples } from "@/content/intentExamples";
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

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="visually-hidden">Example searches and what Cairn finds</caption>
            <thead>
              <tr>
                <th scope="col">You type</th>
                <th scope="col">Cairn finds</th>
              </tr>
            </thead>
            <tbody>
              {intentExamples.map((example) => (
                <tr key={example.query}>
                  <td className={styles.query}>{example.query}</td>
                  <td>
                    <code className={styles.found}>{example.shown}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
