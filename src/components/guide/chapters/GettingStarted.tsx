// Chapters 1–3: Before you start, Install Cairn, Your first minute.

import type { CSSProperties, ReactNode } from "react";
import { RELEASE } from "@/content/links";
import { kinds, type KindId } from "@/content/kinds";
import { KindGlyph } from "@/components/ui/KindGlyph";
import { Callout, CalloutLabel } from "../Callout";
import { Chapter } from "../Chapter";
import { AnnotatedWindow } from "../figures";
import { Keys } from "../Keys";
import s from "../guide.module.css";

function KindRow({ kind, children }: { kind: KindId; children: ReactNode }) {
  return (
    <div className={s.kind}>
      <span className={s.glyph} style={{ "--kind": kinds[kind].color } as CSSProperties} aria-hidden="true">
        <KindGlyph kind={kinds[kind]} />
      </span>
      <b>{kinds[kind].label}</b>
      <span className={s.kindText}>{children}</span>
    </div>
  );
}

export function BeforeYouStart() {
  return (
    <Chapter id="start">
      <h3>What Cairn is</h3>
      <p>
        Cairn is a small window that appears when you press <Keys k={["Alt", "Space"]} />. You type what you&apos;re
        looking for, the way you remember it (<em>&quot;start the database&quot;</em>), and Cairn finds the exact
        command you saved months ago (<code>Start-Service postgresql-x64-18</code>). Press <kbd>Enter</kbd> and
        it&apos;s on your clipboard.
      </p>
      <p>You can keep five kinds of things in it:</p>
      <div className={s.kinds}>
        <KindRow kind="command">
          <code>git log --oneline --graph -20</code>
        </KindRow>
        <KindRow kind="script">
          a <code>backup-dev-db.ps1</code> you run before migrations
        </KindRow>
        <KindRow kind="code">a React hook, a SQL query you always rewrite</KindRow>
        <KindRow kind="note">&quot;Postgres won&apos;t start: port 5432 is in use, here&apos;s the fix&quot;</KindRow>
        <KindRow kind="idea">&quot;Import my PowerShell aliases into Cairn&quot;</KindRow>
      </div>

      <h3>The one habit that makes Cairn work</h3>
      <p>
        Every entry has a field called <b>Why</b>: one sentence saying <em>why you saved it</em>.
      </p>
      <Callout kind="tip">
        <p>
          <CalloutLabel>Write the why the way you&apos;ll search for it later.</CalloutLabel> Not{" "}
          <em>&quot;pg command&quot;</em>, but <em>&quot;Start the local database when the app can&apos;t connect.&quot;</em>
        </p>
        <p>
          Cairn searches the why as seriously as the command itself. That&apos;s how <em>&quot;start database&quot;</em>{" "}
          finds <code>Start-Service postgresql-x64-18</code>.
        </p>
      </Callout>

      <h3>What you need</h3>
      <ul>
        <li>
          <b>Windows 10 or 11.</b>
        </li>
        <li>
          <b>Microsoft Edge WebView2.</b> It&apos;s already installed on up-to-date Windows 10 and 11, so you almost
          certainly have it.
        </li>
        <li>No account, no internet connection, no sign-up. Ever.</li>
      </ul>
    </Chapter>
  );
}

export function InstallCairn() {
  return (
    <Chapter id="install">
      <ol className={s.steps}>
        <li>
          <b>Run the installer</b> you were given: <code>{`cairn_${RELEASE}_x64-setup.exe`}</code> (or the{" "}
          <code>.msi</code>).
        </li>
        <li>
          <b>If Windows SmartScreen says &quot;Windows protected your PC&quot;</b>, click <b>More info</b>, then{" "}
          <b>Run anyway</b>. This early version isn&apos;t code-signed yet, so Windows doesn&apos;t recognise the
          publisher.
        </li>
        <li>Follow the installer&apos;s steps. Cairn starts when it finishes.</li>
      </ol>
      <p>
        You&apos;ll know Cairn is running when you see <b>its icon in the system tray</b> (bottom-right of the
        taskbar; it may be hidden behind the <b>^</b> arrow). Hover over it: the tooltip says <b>Cairn</b> and shows
        its shortcut.
      </p>

      <h3>Start Cairn with Windows (optional)</h3>
      <p>Cairn doesn&apos;t start automatically yet (a setting for that is coming). Until then:</p>
      <ol className={s.steps}>
        <li>
          Press <Keys k={["Win", "R"]} />, type <code>shell:startup</code>, press <kbd>Enter</kbd>. A folder opens.
        </li>
        <li>
          Right-click inside it, choose <b>New → Shortcut</b>, and point it to Cairn (usually in{" "}
          <code>C:\Program Files\cairn\</code> or <code>%LOCALAPPDATA%\cairn\</code>).
        </li>
      </ol>
      <p>From the next restart, Cairn is ready in the tray as soon as Windows is.</p>
    </Chapter>
  );
}

export function FirstMinute() {
  return (
    <Chapter id="first">
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Do this</th>
              <th>What happens</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Press <Keys k={["Alt", "Space"]} />
              </td>
              <td className={s.wrap}>Cairn appears in the middle of the screen.</td>
            </tr>
            <tr>
              <td>
                Type <code>start</code>
              </td>
              <td className={s.wrap}>Results appear as you type.</td>
            </tr>
            <tr>
              <td>
                Press <kbd>↓</kbd> a few times
              </td>
              <td className={s.wrap}>The selection moves; the right side shows details.</td>
            </tr>
            <tr>
              <td>
                Press <kbd>Enter</kbd>
              </td>
              <td className={s.wrap}>The entry is copied, and Cairn gets out of the way.</td>
            </tr>
            <tr>
              <td>
                Press <Keys k={["Ctrl", "V"]} /> anywhere
              </td>
              <td className={s.wrap}>There it is.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        To make Cairn go away without doing anything, press <kbd>Esc</kbd>, or just click somewhere else.
      </p>
      <Callout kind="note">
        <p>
          Cairn never really closes when you hide it. It waits in the tray, so the next <Keys k={["Alt", "Space"]} />{" "}
          is instant, and it remembers what you were typing.
        </p>
      </Callout>

      <h3>The window, top to bottom</h3>
      <AnnotatedWindow />
    </Chapter>
  );
}
