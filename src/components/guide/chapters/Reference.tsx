// Chapters 9–13: Settings, Keyboard cheat sheet, Your data and privacy, Troubleshooting,
// What's coming next.

import type { ReactNode } from "react";
import { Callout } from "../Callout";
import { Chapter } from "../Chapter";
import { CheatSheet, ClosingCard } from "../figures";
import { Keys } from "../Keys";
import s from "../guide.module.css";

export function Settings() {
  return (
    <Chapter id="settings">
      <p>
        Open them with <Keys k={["Ctrl", ","]} /> (comma), from <Keys k={["Ctrl", "K"]} /> then <b>Settings</b>, or by
        right-clicking the tray icon and choosing <b>Settings…</b>. Every change applies <b>immediately</b>, and Cairn
        remembers it.
      </p>
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Setting</th>
              <th>Choices</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Theme</b>
              </td>
              <td className={s.wrap}>
                <b>System</b> follows Windows and shows which theme it&apos;s using right now. <b>Light</b> is warm
                white, <b>Dark</b> is warm charcoal.
              </td>
            </tr>
            <tr>
              <td>
                <b>Accent color</b>
              </td>
              {/* The source's "Try them on this page with the swatches at the top" is dropped: the site has no swatches. */}
              <td className={s.wrap}>
                <b>Majorelle</b> (violet, the default), <b>Zellige teal</b>, <b>Terracotta</b> or <b>Saffron</b>. It
                colors the selection, the active chip, buttons and the Cairn mark.
              </td>
            </tr>
            <tr>
              <td>
                <b>Show detail pane</b>
              </td>
              <td className={s.wrap}>
                The right-hand pane with the full content, the why and the tags. <Keys k={["Ctrl", "D"]} /> flips the
                same switch from the search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <b>From the keyboard:</b> the arrows move between choices (<kbd>←</kbd> <kbd>→</kbd> along a row,{" "}
        <kbd>↑</kbd> <kbd>↓</kbd> to the row above or below), and <kbd>Enter</kbd> applies the one you&apos;re on.
        Settings opens on your current theme, so you can start right away.
      </p>
      <p>
        Press <kbd>Esc</kbd> (or click <b>Back to search</b>) to return.
      </p>
      <Callout kind="note">
        <p>More sections (shortcuts, search, backup…) will appear here as those features arrive.</p>
      </Callout>
    </Chapter>
  );
}

export function KeyboardCheatSheet() {
  return (
    <Chapter id="keys">
      <CheatSheet />

      <h3>Hide or quit?</h3>
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>You want to…</th>
              <th>Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Hide</b> Cairn (it stays ready)
              </td>
              <td className={s.wrap}>
                <kbd>Esc</kbd>, click elsewhere, <Keys k={["Alt", "F4"]} />, the <b>yellow</b> button, or{" "}
                <Keys k={["Alt", "Space"]} />
              </td>
            </tr>
            <tr>
              <td>
                <b>Quit</b> Cairn completely
              </td>
              <td className={s.wrap}>
                The <b>red</b> button, the tray icon&apos;s <b>Quit Cairn</b>, or <Keys k={["Ctrl", "K"]} /> then{" "}
                <b>Quit Cairn</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Bring it back</b>
              </td>
              <td className={s.wrap}>
                <Keys k={["Alt", "Space"]} />, or left-click the tray icon
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Chapter>
  );
}

export function DataAndPrivacy() {
  return (
    <Chapter id="data">
      <p>
        <b>Cairn never connects to the internet.</b> No account, no sync, no analytics, no telemetry. Even its fonts
        are built in.
      </p>
      <p>
        Everything you save lives in <b>one file on your computer</b>:
      </p>
      <pre>
        <code>%LOCALAPPDATA%\com.ayoubedahlouli.cairn\cairn.db</code>
      </pre>
      <p>Paste that into the File Explorer address bar to open the folder.</p>

      <h3>Backing up</h3>
      <p>Built-in backup and export are coming. Until then:</p>
      <ol className={s.steps}>
        <li>
          <b>Quit</b> Cairn (tray icon, then <b>Quit Cairn</b>), so the file isn&apos;t in use.
        </li>
        <li>
          Copy <code>cairn.db</code> somewhere safe. If you see <code>cairn.db-wal</code> and <code>cairn.db-shm</code>{" "}
          next to it, copy them too.
        </li>
      </ol>
      <p>To restore, quit Cairn and put the file back in the same folder.</p>

      <h3>Appearance</h3>
      <p>
        By default Cairn follows your <b>Windows light or dark setting</b> (<em>Settings → Personalization → Colors</em>
        ). To choose yourself, open Cairn&apos;s own <a href="#settings">Settings</a>.
      </p>
    </Chapter>
  );
}

function Trouble({ question, children }: { question: string; children: ReactNode }) {
  return (
    <details className={s.trouble}>
      <summary>{question}</summary>
      <div className={s.troubleBody}>{children}</div>
    </details>
  );
}

export function Troubleshooting() {
  return (
    <Chapter id="trouble">
      <Trouble question="Alt + Space doesn't open Cairn">
        <p>
          Another app (often <b>PowerToys Run</b>) may already use <Keys k={["Alt", "Space"]} />. Cairn then falls back
          to <Keys k={["Ctrl", "Shift", "Space"]} />. <b>Hover over the tray icon</b>: the tooltip always shows the
          shortcut that works, or says there is none (then use the tray icon itself).
        </p>
      </Trouble>

      <Trouble question="Ctrl + Shift + Backspace doesn't delete">
        <ul>
          <li>
            Press it <b>twice</b>: the first press only shows the red warning.
          </li>
          <li>
            Make sure it&apos;s <b>Backspace</b> (above Enter), not Delete.
          </li>
          <li>
            On some keyboards set up with several languages, <b>Ctrl + Shift switches the keyboard layout</b> and eats
            the shortcut. Check{" "}
            <em>Settings → Time &amp; language → Typing → Advanced keyboard settings → Input language hot keys</em>.
          </li>
        </ul>
      </Trouble>

      <Trouble question="Ctrl + Enter copied but didn't paste">
        <ul>
          <li>
            The target app may be <b>running as administrator</b>. Press <Keys k={["Ctrl", "V"]} /> yourself; the
            content is on the clipboard.
          </li>
          <li>
            If you see <b>&quot;Copied; paste with Ctrl+V&quot;</b>, the window you came from was closed, or Windows
            wouldn&apos;t bring it forward. Paste manually.
          </li>
        </ul>
      </Trouble>

      <Trouble question={'Ctrl + R says "Run supports PowerShell and cmd for now"'}>
        <p>
          The entry&apos;s shell is something else (<code>bash</code>, <code>zsh</code>…). Edit it with{" "}
          <Keys k={["Ctrl", "E"]} /> and set the shell to <code>powershell</code> or <code>cmd</code> if it&apos;s
          really a Windows command, or copy it and run it yourself.
        </p>
      </Trouble>

      <Trouble question="I can't find something I know I saved">
        <ul>
          <li>
            Try <b>fewer words</b>, or a single distinctive one.
          </li>
          <li>
            Check the <b>chip</b>: you may be filtering on Scripts while it&apos;s a Command. Press <kbd>Tab</kbd> until{" "}
            <b>All</b> is selected.
          </li>
          <li>
            Remember that <code>#tag</code> is exact; try the word without <code>#</code>.
          </li>
          <li>
            Next time, give it a better <b>why</b>. It&apos;s the part you&apos;ll remember.
          </li>
        </ul>
      </Trouble>

      <Trouble question="I opened Cairn twice">
        <p>No problem: Cairn only ever runs once. Starting it again just brings the existing window forward.</p>
      </Trouble>
    </Chapter>
  );
}

function Ahead({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li>
      <b>{title}</b>
      <span className={s.aheadText}>{children}</span>
    </li>
  );
}

export function WhatsNext() {
  return (
    <Chapter id="next">
      <p>Cairn is young. Here&apos;s what&apos;s on the trail ahead:</p>
      <ul className={s.ahead}>
        <Ahead title="Typo tolerance">
          <code>postgers</code> will still find <em>postgres</em>.
        </Ahead>
        <Ahead title="Smarter ranking">What you use often and recently rises to the top.</Ahead>
        <Ahead title="Search by meaning">
          Find entries by idea, even with completely different words, using a model that runs on your own computer.
        </Ahead>
        <Ahead title="Fill parameters">
          <code>{"{{container}}"}</code> gets a small form, with values you used before suggested.{" "}
          <Keys k={["Ctrl", "P"]} />.
        </Ahead>
        <Ahead title="Quick capture">
          <Keys k={["Alt", "Shift", "S"]} /> saves whatever is on your clipboard, in two seconds.
        </Ahead>
        <Ahead title="Shell history import">
          Cairn notices commands you keep typing in PowerShell or bash, and offers to keep them.
        </Ahead>
        <Ahead title="Local AI helpers">
          A suggested why, automatic tags, and questions about your own entries (<code>?</code>). All on your machine.
        </Ahead>
        <Ahead title="More settings">Density, start with Windows, your own shortcut, backup and export.</Ahead>
      </ul>

      <ClosingCard className={s.closing} />
    </Chapter>
  );
}
