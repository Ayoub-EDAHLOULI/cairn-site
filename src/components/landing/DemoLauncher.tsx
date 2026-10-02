import type { CSSProperties } from "react";
import { demoEntries, type DemoEntry } from "@/content/demoEntries";
import { kinds } from "@/content/kinds";
import { CairnMark } from "@/components/ui/CairnMark";
import { Kbd } from "@/components/ui/Kbd";
import { SearchIcon } from "@/components/ui/icons";
import styles from "./DemoLauncher.module.css";

const INITIAL_QUERY = "start database";

// Static for now: the results search() must return for INITIAL_QUERY, in order.
// Step 3 replaces this with search() and a test locks the two together.
const initialResults = ["start-postgres", "port-5432"].map(
  (id) => demoEntries.find((entry) => entry.id === id)!,
);

/** Sets `--kind` so the badge styles can pick up the entry kind's color. */
function kindStyle(entry: DemoEntry) {
  return { "--kind": kinds[entry.kind].color } as CSSProperties;
}

/** A working miniature of Cairn. Static markup in its initial state (interactive in step 3). */
export function DemoLauncher() {
  const results = initialResults;
  const selected = results[0];
  const count = `${results.length} ${results.length === 1 ? "result" : "results"}`;

  return (
    <div className={styles.launcher}>
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          type="text"
          className={styles.input}
          defaultValue={INITIAL_QUERY}
          aria-label="Try searching Cairn"
          placeholder="Type what you remember…"
          autoComplete="off"
          spellCheck={false}
        />
        <span className={styles.count}>{count}</span>
      </div>

      <div className={styles.body}>
        <ul className={styles.list}>
          {results.map((entry) => {
            const kind = kinds[entry.kind];
            return (
              <li
                key={entry.id}
                className={`${styles.row} ${entry === selected ? styles.selected : ""}`}
                style={kindStyle(entry)}
              >
                <span className={styles.glyph} aria-hidden="true">
                  {kind.glyph}
                </span>
                <span className={styles.rowText}>
                  <span className={`${styles.rowTitle} ${kind.monoTitle ? styles.mono : ""}`}>{entry.title}</span>
                  <span className={styles.rowWhy}>{entry.why}</span>
                </span>
              </li>
            );
          })}
        </ul>

        {selected && (
          <div className={styles.detail} style={kindStyle(selected)}>
            <div className={styles.badges}>
              <span className={styles.kindBadge}>{kinds[selected.kind].label}</span>
              <span className={styles.shellBadge}>{selected.shell}</span>
            </div>
            <pre className={styles.content}>{selected.body ?? selected.title}</pre>
            <div>
              <p className={styles.whyLabel}>Why I saved this</p>
              <p className={styles.why}>{selected.why}</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <CairnMark size={20} />
        <span>Cairn</span>
        <span className={styles.status}>
          Copy to clipboard <Kbd>↵</Kbd>
        </span>
      </div>
    </div>
  );
}
