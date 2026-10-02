// Chapters 6–8: Saving new entries; Editing, favorites and deleting; The action panel.

import { Callout, CalloutLabel } from "../Callout";
import { Chapter } from "../Chapter";
import { ActionPanelFigure } from "../figures";
import { Keys } from "../Keys";
import s from "../guide.module.css";

export function SavingEntries() {
  return (
    <Chapter id="saving">
      <p>
        Press <Keys k={["Ctrl", "N"]} /> in Cairn. The editor opens, with the kind already set to the chip you were on
        (Commands if you were on All).
      </p>
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Tips</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Content</b>
              </td>
              <td className={s.wrap}>
                The command, script, code or text. Required for commands, scripts and code. <kbd>Tab</kbd> moves to the
                next field (it doesn&apos;t indent).
              </td>
            </tr>
            <tr>
              <td>
                <b>Title</b>
              </td>
              <td className={s.wrap}>Optional. Leave it empty and Cairn uses the first line of the content.</td>
            </tr>
            <tr>
              <td>
                <b>Type</b>
              </td>
              <td className={s.wrap}>
                Command, Script, Code, Note, Idea. Use <kbd>←</kbd> <kbd>→</kbd> to change it.
              </td>
            </tr>
            <tr>
              <td>
                <b>Shell</b> or <b>Language</b>
              </td>
              <td className={s.wrap}>
                Shown for commands and scripts (<code>powershell</code>, <code>bash</code>, <code>cmd</code>…) and for
                code (<code>typescript</code>, <code>rust</code>, <code>sql</code>…). Suggestions appear as you type.
              </td>
            </tr>
            <tr>
              <td>
                <b>Why</b>
              </td>
              <td className={s.wrap}>
                <b>The most important field.</b> One sentence, in the words you&apos;d search with.
              </td>
            </tr>
            <tr>
              <td>
                <b>Tags</b>
              </td>
              <td className={s.wrap}>
                Type a tag and press <kbd>Enter</kbd> (or a comma). <kbd>Backspace</kbd> in an empty tag box removes the
                last one. Existing tags are suggested.
              </td>
            </tr>
            <tr>
              <td>
                <b>Favorite</b>
              </td>
              <td className={s.wrap}>
                Switch it on to keep the entry at the top of <em>Favorites and recent</em>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          <Keys k={["Ctrl", "Enter"]} /> saves. You&apos;re back in the search with the new entry selected.
        </li>
        <li>
          <kbd>Esc</kbd> cancels. If you&apos;ve typed anything, Cairn asks first: <b>&quot;Discard changes? Press Esc
          again&quot;</b>.
        </li>
      </ul>
      <Callout kind="tip">
        <p>
          <CalloutLabel>Your draft is safe.</CalloutLabel> If you click elsewhere or press <Keys k={["Alt", "Space"]} />{" "}
          while writing, Cairn hides, but your draft is waiting, untouched, when you come back. Only <kbd>Esc</kbd>{" "}
          throws it away.
        </p>
      </Callout>

      <h3>How tags are tidied up</h3>
      <p>Cairn cleans tags so the same tag is never saved twice in different spellings:</p>
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>You type</th>
              <th>Saved as</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>#Docker</code>
              </td>
              <td>
                <code>docker</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>dev ops</code>
              </td>
              <td>
                <code>dev-ops</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>docker, k8s</code>
              </td>
              <td className={s.wrap}>
                <code>docker</code> and <code>k8s</code> (commas separate tags)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="placeholders">Placeholders</h3>
      <p>
        Write <code>{"{{name}}"}</code> in your content for the parts that change each time, or{" "}
        <code>{"{{name:default}}"}</code> with a default value:
      </p>
      <pre>
        <code>{"docker exec -it {{container}} psql -U {{user:postgres}}"}</code>
      </pre>
      <p>
        For now, Cairn copies placeholders as they are, so you replace them after pasting.{" "}
        <b>Filling them in from Cairn, with suggestions from the values you used before, is coming soon.</b>
      </p>
    </Chapter>
  );
}

export function EditingAndDeleting() {
  return (
    <Chapter id="editing">
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>To…</th>
              <th>Do this</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Edit</b> an entry
              </td>
              <td className={s.wrap}>
                Select it, press <Keys k={["Ctrl", "E"]} />. Same editor, same rules. Saving without changes changes
                nothing.
              </td>
            </tr>
            <tr>
              <td>
                <b>Favorite</b> or <b>unfavorite</b>
              </td>
              <td className={s.wrap}>
                <Keys k={["Ctrl", "K"]} />, then <b>Add to favorites</b> (or <b>Remove from favorites</b>), or the switch
                in the editor.
              </td>
            </tr>
            <tr>
              <td>
                <b>Delete</b>
              </td>
              <td className={s.wrap}>
                Select it, press <Keys k={["Ctrl", "Shift", "Backspace"]} /> <b>twice</b>. The first press warns you in
                red; moving to another entry cancels.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Callout kind="note">
        <p>
          <kbd>Backspace</kbd> is the key just above <kbd>Enter</kbd> that erases backwards, not the <kbd>Delete</kbd>{" "}
          key.
        </p>
      </Callout>
      <p>
        Deleted entries disappear from Cairn right away. They&apos;re kept in your database for now, and a way to
        restore them is planned.
      </p>
    </Chapter>
  );
}

export function ActionPanel() {
  return (
    <Chapter id="actions">
      <p>
        Don&apos;t want to learn shortcuts? Press <Keys k={["Ctrl", "K"]} /> (or click <b>Actions</b> at the bottom
        right). A small menu lists everything you can do with the selected entry:
      </p>
      <ActionPanelFigure />
      <ul>
        <li>
          <b>Type</b> to filter (<code>fav</code>, <code>del</code>…), <kbd>↑</kbd> <kbd>↓</kbd> to move,{" "}
          <kbd>Enter</kbd> to run.
        </li>
        <li>
          <kbd>Esc</kbd> closes the panel. Every shortcut keeps working while it&apos;s open.
        </li>
        <li>Each row shows its shortcut, so the panel teaches you as you go.</li>
      </ul>
    </Chapter>
  );
}
