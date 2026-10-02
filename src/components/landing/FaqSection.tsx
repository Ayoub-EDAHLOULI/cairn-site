import { faq } from "@/content/faq";
import styles from "./FaqSection.module.css";

/**
 * Native <details>/<summary>: works without JavaScript, and the shared `name`
 * keeps one answer open at a time. No client code.
 */
export function FaqSection() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="faq-title" className={`section-title ${styles.title}`}>
          Questions
        </h2>
        <div className={styles.list}>
          {faq.map((item, index) => (
            <details key={item.question} name="faq" open={index === 0} className={styles.item}>
              <summary className={styles.question}>{item.question}</summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
