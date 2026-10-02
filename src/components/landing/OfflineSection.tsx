import { Reveal } from "@/components/ui/Reveal";
import { TypedText } from "@/components/ui/TypedText";
import styles from "./OfflineSection.module.css";

const DATABASE_PATH = "%LOCALAPPDATA%\\com.ayoubedahlouli.cairn\\cairn.db";

const facts = [
  { title: "No account", text: "Install it and start typing. Nothing to sign up for, ever." },
  { title: "No telemetry", text: "No analytics, no crash reports sent anywhere. Even the fonts are built in." },
  { title: "Open source", text: "Every line is on GitHub, so you don't have to take our word for any of this." },
];

export function OfflineSection() {
  return (
    <section id="offline" className="section" aria-labelledby="offline-title">
      <div className="container">
        <h2 id="offline-title" className={`section-title ${styles.title}`}>
          Offline by design. Your notes never leave your machine.
        </h2>
        <p className={`lead ${styles.lead}`}>
          Commands hold server names, paths and sometimes passwords. Cairn makes no network requests at all:
          everything lives in one SQLite file you can copy, back up or delete.
        </p>
        {/* Focusable so keyboard users can scroll it when the path overflows on narrow screens. */}
        <Reveal>
          <div className={styles.path} tabIndex={0} role="region" aria-label="Database location">
            <code>
              <TypedText text={DATABASE_PATH} charClassName={styles.char} />
            </code>
          </div>
        </Reveal>
        <ul className={styles.facts}>
          {facts.map((fact) => (
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
