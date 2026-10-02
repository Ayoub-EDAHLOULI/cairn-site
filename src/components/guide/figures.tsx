// The guide's static figures, built in HTML (no images): the annotated Cairn window, the action
// panel, the keyboard cheat sheet and the closing card.

import type { CSSProperties } from "react";
import { kinds, type KindId } from "@/content/kinds";
import { CairnMark } from "@/components/ui/CairnMark";
import { KindGlyph } from "@/components/ui/KindGlyph";
import { Keys } from "./Keys";
import f from "./figures.module.css";

const kindStyle = (kind: KindId) => ({ "--kind": kinds[kind].color }) as CSSProperties;

function Pin({ n }: { n: number }) {
  return <span className={f.pin}>{n}</span>;
}

function Glyph({ kind }: { kind: KindId }) {
  return (
    <span className={f.glyph} style={kindStyle(kind)}>
      <KindGlyph kind={kinds[kind]} />
    </span>
  );
}

/** The Cairn window with numbered parts, and the legend explaining them. */
export function AnnotatedWindow() {
  return (
    <figure className={f.annotated} aria-label="The Cairn window with numbered parts">
      {/* A picture: the legend below carries the information. */}
      <div className={f.window} aria-hidden="true">
        <div className={`${f.bar} ${f.titleBar}`}>
          <Pin n={1} />
          <span className={f.dots}>
            <span className={`${f.dot} ${f.yellow}`} />
            <span className={`${f.dot} ${f.red}`} />
          </span>
        </div>
        <div className={f.bar}>
          <Pin n={2} />
          <span className={f.placeholder}>Search commands, scripts, notes…</span>
          <span className={f.meta}>13 results · 16 ms</span>
        </div>
        <div className={`${f.bar} ${f.chipBar}`}>
          <Pin n={3} />
          <span className={`${f.chip} ${f.chipActive}`}>All 13</span>
          <span className={`${f.chip} ${f.chipPlain}`}>Commands 6</span>
          <span className={`${f.chip} ${f.chipPlain}`}>Scripts 1</span>
          <span className={f.grow} />
          <span className={f.meta}>Tab to switch</span>
        </div>
        <div className={f.body}>
          <ul className={f.list}>
            <li className={f.section}>
              <Pin n={4} />
              <span className={f.sectionLabel}>Favorites and recent</span>
            </li>
            <li className={f.selected}>
              <Glyph kind="command" />
              <span className={f.rowTitle}>Start-Service postgresql-x64-18</span>
            </li>
            <li>
              <Glyph kind="command" />
              <span className={f.rowTitle}>git log --oneline --graph -20</span>
            </li>
            <li>
              <Glyph kind="script" />
              <span className={f.rowTitle}>backup-dev-db.ps1</span>
            </li>
            <li>
              <Glyph kind="note" />
              <span className={`${f.rowTitle} ${f.rowTitleSans}`}>Port 5432 in use</span>
            </li>
          </ul>
          <div className={f.detail}>
            <div className={f.detailBadges}>
              <Pin n={5} />
              <span className={`${f.chip} ${f.chipKind}`} style={kindStyle("command")}>
                Command
              </span>
              <span className={`${f.chip} ${f.chipPlain}`}>PowerShell</span>
            </div>
            <pre>Start-Service postgresql-x64-18</pre>
            <span className={f.label}>Why I saved this</span>
            <span className={f.muted}>Tags, used, last used</span>
          </div>
        </div>
        <div className={f.foot}>
          <Pin n={6} />
          <span>Cairn</span>
          <span className={f.status}>
            Copy to clipboard <kbd>Enter</kbd> · Actions <Keys k={["Ctrl", "K"]} />
          </span>
        </div>
      </div>
      <ol className={f.legend}>
        <li>
          <Pin n={1} />
          <span>
            <b>Title bar.</b> Drag it to move the window. The <b>yellow</b> button hides Cairn, the <b>red</b> one
            quits it.
          </span>
        </li>
        <li>
          <Pin n={2} />
          <span>
            <b>Search box</b>, with the number of results and how long the search took.
          </span>
        </li>
        <li>
          <Pin n={3} />
          <span>
            <b>Filter chips</b> for each kind, with their counts.
          </span>
        </li>
        <li>
          <Pin n={4} />
          <span>
            <b>Results.</b> With an empty search: your favorites and recent entries.
          </span>
        </li>
        <li>
          <Pin n={5} />
          <span>
            <b>Details pane</b>: the full content, the why, tags and usage.
          </span>
        </li>
        <li>
          <Pin n={6} />
          <span>
            <b>Footer</b> with the main action and the action panel.
          </span>
        </li>
      </ol>
    </figure>
  );
}

// The complete panel, including New entry and Quit Cairn (the landing page shows a shorter version).
const panelActions: { label: string; keys?: string[]; danger?: boolean }[] = [
  { label: "Copy to clipboard", keys: ["Enter"] },
  { label: "Paste into active window", keys: ["Ctrl", "Enter"] },
  { label: "Run in PowerShell", keys: ["Ctrl", "R"] },
  { label: "Edit", keys: ["Ctrl", "E"] },
  { label: "Add to favorites" },
  { label: "Delete", keys: ["Ctrl", "Shift", "⌫"], danger: true },
  { label: "New entry", keys: ["Ctrl", "N"] },
  { label: "Settings", keys: ["Ctrl", ","] },
  { label: "Quit Cairn" },
];

/** The action panel (Ctrl K), as a picture. */
export function ActionPanelFigure() {
  return (
    <div
      className={f.panel}
      role="img"
      aria-label="The action panel, listing Copy, Paste, Run, Edit, Add to favorites, Delete, New entry, Settings and Quit"
    >
      <div className={f.panelEntry}>Start-Service postgresql-x64-18</div>
      {panelActions.map((action, index) => (
        <div
          key={action.label}
          className={[f.panelRow, index === 0 && f.panelRowSelected, action.danger && f.panelRowDanger]
            .filter(Boolean)
            .join(" ")}
        >
          <span className={f.panelLabel}>{action.label}</span>
          {action.keys && <Keys k={action.keys} />}
        </div>
      ))}
      <div className={f.panelSearch}>Search actions…</div>
    </div>
  );
}

type Shortcut = {
  /** One or more key combinations, each a list of keys. */
  keys: string[][];
  /** Press it twice (destructive or surprising actions). */
  twice?: boolean;
  does: string;
};

type ShortcutGroup = { id: string; title: string; shortcuts: Shortcut[] };

const cheatColumns: ShortcutGroup[][] = [
  [
    { id: "cheat-anywhere", title: "Anywhere in Windows", shortcuts: [{ keys: [["Alt", "Space"]], does: "Open or hide Cairn" }] },
    {
      id: "cheat-editor",
      title: "In the editor",
      shortcuts: [
        { keys: [["Ctrl", "Enter"]], does: "Save" },
        { keys: [["Esc"]], does: "Cancel (twice if you changed something)" },
        { keys: [["Tab"]], does: "Next field" },
      ],
    },
  ],
  [
    {
      id: "cheat-search",
      title: "In the search",
      shortcuts: [
        { keys: [["↑"], ["↓"]], does: "Move the selection" },
        { keys: [["Tab"], ["Shift", "Tab"]], does: "Next or previous chip" },
        { keys: [["Enter"]], does: "Copy and hide" },
        { keys: [["Ctrl", "Enter"]], does: "Paste into the window you came from" },
        { keys: [["Ctrl", "R"]], twice: true, does: "Run in a terminal" },
        { keys: [["Ctrl", "N"]], does: "New entry" },
        { keys: [["Ctrl", "E"]], does: "Edit the selected entry" },
        { keys: [["Ctrl", "Shift", "⌫"]], twice: true, does: "Delete the selected entry" },
        { keys: [["Ctrl", "K"]], does: "Action panel" },
        { keys: [["Ctrl", "D"]], does: "Show or hide the details pane" },
        { keys: [["Ctrl", ","]], does: "Settings" },
        { keys: [["Esc"]], does: "Close panel, then clear search, then hide" },
        { keys: [["Alt", "F4"]], does: "Hide (Cairn keeps running)" },
      ],
    },
  ],
];

function Combo({ keys }: { keys: string[] }) {
  return keys.length > 1 ? <Keys k={keys} /> : <kbd>{keys[0]}</kbd>;
}

/** Every shortcut, grouped by where it works. */
export function CheatSheet() {
  return (
    <div className={f.cheat}>
      {cheatColumns.map((groups) => (
        <section key={groups[0].id} className={f.cheatGroup} aria-labelledby={groups[0].id}>
          {groups.map((group) => [
            <h3 key={`${group.id}-title`} id={group.id}>
              {group.title}
            </h3>,
            <dl key={`${group.id}-list`}>
              {group.shortcuts.flatMap((shortcut) => [
                <dt key={`${shortcut.does}-keys`}>
                  {shortcut.keys.map((combo, i) => (
                    <span key={combo.join("+")}>
                      {i > 0 && " "}
                      <Combo keys={combo} />
                    </span>
                  ))}
                  {shortcut.twice && <span className={f.twice}>×2</span>}
                </dt>,
                <dd key={`${shortcut.does}-does`}>{shortcut.does}</dd>,
              ])}
            </dl>,
          ])}
        </section>
      ))}
    </div>
  );
}

/** The card that closes the guide. */
export function ClosingCard({ className }: { className: string }) {
  return (
    <div className={className}>
      <CairnMark size={54} variant="plain" />
      <p>Leave a stone for your future self.</p>
      <p>
        <Keys k={["Alt", "Space"]} />, and you&apos;re back on the trail.
      </p>
    </div>
  );
}
