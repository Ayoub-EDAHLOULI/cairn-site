import { actions } from "@/content/actions";
import { demoEntries } from "@/content/demoEntries";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./KeyboardSection.module.css";

const panelEntry = demoEntries[0];

export function KeyboardSection() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="keyboard-title">
      <Reveal className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <div className={styles.keys}>
            {/* Each keycap is a static base (the visible bottom edge) and a cap that moves down to press. */}
            <kbd className={`${styles.keycap} ${styles.alt}`}>
              <span className={styles.cap}>Alt</span>
            </kbd>
            <span className={styles.plus}>+</span>
            <kbd className={`${styles.keycap} ${styles.space}`}>
              <span className={styles.cap}>Space</span>
            </kbd>
          </div>
          <h2 id="keyboard-title" className="section-title">
            Never leave the keyboard.
          </h2>
          <p className={`lead ${styles.lead}`}>
            Open Cairn from anywhere, type, and press Enter to copy. Ctrl Enter pastes straight into the window you
            came from. Ctrl K shows every action, with its shortcut, so you learn as you go.
          </p>
        </div>

        {/* A static picture of the action panel: nothing here is interactive. */}
        <figure className={styles.figure}>
          <div className={styles.panel}>
            <p className={styles.entry}>{panelEntry.title}</p>
            <ul className={styles.actions}>
              {actions.map((action, index) => (
                <li
                  key={action.label}
                  className={`${styles.action} ${index === 0 ? styles.selected : ""} ${
                    action.danger ? styles.danger : ""
                  }`}
                >
                  <span className={styles.label}>{action.label}</span>
                  {action.keys && <kbd className={styles.shortcut}>{action.keys}</kbd>}
                </li>
              ))}
            </ul>
            <div className={styles.filter} aria-hidden="true">
              Search actions…
            </div>
          </div>
          <figcaption className="visually-hidden">
            Cairn&apos;s action panel for the selected entry, opened with Ctrl K.
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
