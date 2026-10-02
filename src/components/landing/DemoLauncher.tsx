"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { demoEntries, type DemoEntry } from "@/content/demoEntries";
import { kinds } from "@/content/kinds";
import { useInView } from "@/hooks/useInView";
import { motionAllowed, whenPageVisible } from "@/lib/motion";
import { search } from "@/lib/search";
import { CairnMark } from "@/components/ui/CairnMark";
import { Kbd } from "@/components/ui/Kbd";
import { KindGlyph } from "@/components/ui/KindGlyph";
import { SearchIcon } from "@/components/ui/icons";
import styles from "./DemoLauncher.module.css";

// The static HTML renders this state; search.test.ts locks its results.
const INITIAL_QUERY = "start database";
/** Wait for typing to pause before announcing the result count. */
const ANNOUNCE_DELAY_MS = 400;
/** Autoplay: the launcher rises in, then the initial query types itself. */
const RISE_MS = 600;
const TYPE_MS = 60;

/** Module-level: the autoplay runs at most once per visit, even if the page is re-rendered via next/link. */
let autoplayed = false;

/** "wait": hidden until in view (only under .motion-ok); "playing": rising and typing; null: idle. */
type AutoplayPhase = "wait" | "playing" | null;

function countLabel(count: number) {
  return `${count} ${count === 1 ? "result" : "results"}`;
}

/** Sets `--kind` so the badge styles can pick up the entry kind's color. */
function kindStyle(entry: DemoEntry) {
  return { "--kind": kinds[entry.kind].color } as CSSProperties;
}

/**
 * A working miniature of Cairn: the combobox + listbox pattern, with focus always in the input.
 * Keyboard handlers live on the input only, so page scrolling keys keep working elsewhere.
 */
export function DemoLauncher({ autoplay: autoplayEnabled = true }: { autoplay?: boolean }) {
  const [query, setQuery] = useState(INITIAL_QUERY);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  // Without autoplay (the Field Guide), the launcher is never hidden waiting for one.
  const [autoplay, setAutoplay] = useState<AutoplayPhase>(() => (autoplayEnabled && !autoplayed ? "wait" : null));

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const announceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const autoplayTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const cancelVisibleWait = useRef<() => void>(undefined);

  const baseId = useId();
  const listId = `${baseId}-list`;
  const optionId = (entry: DemoEntry) => `${baseId}-${entry.id}`;

  const results = useMemo(() => search(demoEntries, query), [query]);
  const selected = results[Math.min(selectedIndex, results.length - 1)];
  const selectedId = selected ? optionId(selected) : undefined;

  useEffect(
    () => () => {
      clearTimeout(announceTimer.current);
      clearTimeout(autoplayTimer.current);
      cancelVisibleWait.current?.();
    },
    [],
  );

  function startAutoplay() {
    if (autoplayed) return;
    autoplayed = true;
    // `motion-ok` is the single source of truth: reduced motion and the safety net both remove it.
    if (!motionAllowed()) {
      setAutoplay(null);
      return;
    }
    setAutoplay("playing");
    setQuery("");
    setSelectedIndex(0);
    setCopied(false);
    let typed = 0;
    const typeNext = () => {
      typed += 1;
      // Set directly, not via changeQuery: the live region stays silent during autoplay.
      setQuery(INITIAL_QUERY.slice(0, typed));
      setSelectedIndex(0);
      if (typed < INITIAL_QUERY.length) {
        autoplayTimer.current = setTimeout(typeNext, TYPE_MS);
      } else {
        setAutoplay(null);
      }
    };
    autoplayTimer.current = setTimeout(typeNext, RISE_MS);
  }

  // Autoplay starts once the launcher is in view and the tab is visible (no unseen play in background tabs).
  // A low threshold: on short laptop screens the launcher starts near the bottom edge, and it is
  // invisible until it plays, so waiting for half of it would leave an empty gap under the hero.
  useInView(rootRef, () => (cancelVisibleWait.current = whenPageVisible(startAutoplay)), {
    threshold: 0.15,
    enabled: autoplay === "wait",
  });

  /** Any focus, click or keypress in the demo hands control to the visitor, leaving the query as it is. */
  function stopAutoplay() {
    if (autoplay === null) return;
    autoplayed = true;
    clearTimeout(autoplayTimer.current);
    cancelVisibleWait.current?.();
    setAutoplay(null);
  }

  // Keep the selected option visible by scrolling the list only (scrollIntoView could scroll the page).
  useLayoutEffect(() => {
    const list = listRef.current;
    const option = selectedId && document.getElementById(selectedId);
    if (!list || !option) return;
    const padding = 8;
    if (option.offsetTop < list.scrollTop + padding) {
      list.scrollTop = option.offsetTop - padding;
    } else if (option.offsetTop + option.offsetHeight > list.scrollTop + list.clientHeight - padding) {
      list.scrollTop = option.offsetTop + option.offsetHeight - list.clientHeight + padding;
    }
  }, [selectedId, results]);

  function changeQuery(next: string) {
    setQuery(next);
    setSelectedIndex(0);
    setCopied(false);
    clearTimeout(announceTimer.current);
    announceTimer.current = setTimeout(
      () => setAnnouncement(countLabel(search(demoEntries, next).length)),
      ANNOUNCE_DELAY_MS,
    );
  }

  function select(index: number) {
    setSelectedIndex(index);
    setCopied(false);
  }

  function copySelected() {
    if (!selected) return;
    const text = selected.body ?? selected.title;
    // Only claim it copied once the browser confirms; on failure, say nothing.
    try {
      navigator.clipboard?.writeText(text).then(
        () => {
          setCopied(true);
          clearTimeout(announceTimer.current);
          setAnnouncement("Copied to clipboard");
        },
        () => {},
      );
    } catch {
      // Clipboard API unavailable (e.g. insecure context): stay silent.
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    // Let an input method editor finish composing before we act on its keys.
    if (event.nativeEvent.isComposing) return;
    const count = results.length;
    const current = Math.min(selectedIndex, count - 1);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (count) select((current + 1) % count);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (count) select((current - 1 + count) % count);
        break;
      case "Enter":
        event.preventDefault();
        copySelected();
        break;
      case "Escape":
        if (query) {
          event.preventDefault();
          changeQuery("");
        }
        break;
    }
  }

  return (
    <div
      ref={rootRef}
      className={styles.launcher}
      data-autoplay={autoplay ?? undefined}
      onPointerDownCapture={stopAutoplay}
      onKeyDownCapture={stopAutoplay}
      onFocusCapture={(event) => {
        if (autoplay === null) return;
        stopAutoplay();
        // The first keystroke replaces the partial (or initial) query.
        if (event.target === inputRef.current) inputRef.current.select();
      }}
    >
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          value={query}
          onChange={(event) => changeQuery(event.target.value)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-label="Try searching Cairn"
          aria-expanded="true"
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={selectedId}
          placeholder="Type what you remember…"
          autoComplete="off"
          spellCheck={false}
        />
        <span className={styles.count}>{countLabel(results.length)}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.listWrap}>
          <ul ref={listRef} id={listId} role="listbox" aria-label="Results" className={styles.list}>
            {results.map((entry, index) => {
              const kind = kinds[entry.kind];
              const isSelected = entry === selected;
              return (
                // The one exception to the button/link rule: listbox options stay unfocusable
                // (focus remains in the combobox input), so they are <li role="option">.
                <li
                  key={entry.id}
                  id={optionId(entry)}
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.row} ${isSelected ? styles.selected : ""}`}
                  style={kindStyle(entry)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    select(index);
                    inputRef.current?.focus({ preventScroll: true });
                  }}
                >
                  <span className={styles.glyph} aria-hidden="true">
                    <KindGlyph kind={kind} />
                  </span>
                  <span className={styles.rowText}>
                    <span className={`${styles.rowTitle} ${kind.monoTitle ? styles.mono : ""}`}>{entry.title}</span>
                    <span className={styles.rowWhy}>{entry.why}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          {results.length === 0 && <p className={styles.empty}>Nothing here yet. In Cairn, Ctrl N saves it.</p>}
        </div>

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
          {copied ? "Copied to clipboard" : "Copy to clipboard"} <Kbd>↵</Kbd>
        </span>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
