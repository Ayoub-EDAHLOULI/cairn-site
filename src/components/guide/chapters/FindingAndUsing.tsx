// Chapters 4–5: Finding things, Using what you found.

import { Callout } from "../Callout";
import { Chapter } from "../Chapter";
import { Keys } from "../Keys";
import s from "../guide.module.css";

export function FindingThings() {
  return (
    <Chapter id="finding">
      <h3>Just type</h3>
      <p>
        Type what you remember, in any words. Cairn looks in the <b>title</b>, the <b>content</b>, the <b>why</b> and
        the <b>tags</b> all at once, and puts the best match on top.
      </p>
      <ul>
        <li>
          <b>Words are matched as you type:</b> <code>datab</code> already finds <em>database</em>.
        </li>
        <li>
          <b>Every word should appear somewhere.</b> If no entry has all of them, Cairn shows the entries that match{" "}
          <em>some</em> of them instead, best first. So <em>&quot;start the database please&quot;</em> still finds
          your Postgres command.
        </li>
        <li>
          <b>Accents don&apos;t matter:</b> <code>cafe</code> finds <em>café</em>.
        </li>
      </ul>
      <Callout kind="tip">
        <p>
          Fewer, more distinctive words work best. <code>postgres start</code> beats{" "}
          <code>how do I start the postgres thing</code>.
        </p>
      </Callout>

      <h3>With an empty search box</h3>
      <p>
        You see <b>Favorites and recent</b>: your favorites first, then what you used most recently, then everything
        else, newest first. Most of the time, what you need is already in the top three.
      </p>

      <h3>Shortcuts inside the search box</h3>
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Meaning</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>&gt;</code> at the start
              </td>
              <td className={s.wrap}>
                <b>Commands only</b> (the Commands chip switches on)
              </td>
              <td>
                <code>&gt;docker</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>#tag</code> anywhere
              </td>
              <td className={s.wrap}>
                <b>Only entries with this exact tag.</b> Add several to require all of them.
              </td>
              <td>
                <code>#postgres #docker exec</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>?</code> at the start
              </td>
              <td className={s.wrap}>Reserved for asking questions (coming later); for now it&apos;s ordinary search</td>
              <td>
                <code>? restart api</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Callout kind="note">
        <p>
          <code>#tag</code> is exact: <code>#docker</code> won&apos;t match an entry tagged <code>dockerfile</code>.
          Plain words (without <code>#</code>) also look inside tags, but loosely.
        </p>
      </Callout>

      <h3>Filter chips</h3>
      <p>
        Under the search box: <b>All</b>, <b>Commands</b>, <b>Scripts</b>, <b>Code</b>, <b>Notes</b> and <b>Ideas</b>,
        each with its number of matches.
      </p>
      <ul>
        <li>
          Press <kbd>Tab</kbd> for the next chip, <Keys k={["Shift", "Tab"]} /> for the previous one. It wraps around.
        </li>
        <li>Or click a chip. You can keep typing right away.</li>
      </ul>
      <p>
        If a chip says <em>&quot;Nothing of this type matches&quot;</em>, look at the other chips&apos; numbers: your
        entry is probably in another kind.
      </p>

      <h3>Moving around</h3>
      <div className={s.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <kbd>↑</kbd> <kbd>↓</kbd>
              </td>
              <td className={s.wrap}>Move through the results</td>
            </tr>
            <tr>
              <td>
                <Keys k={["Ctrl", "D"]} />
              </td>
              <td className={s.wrap}>Hide or show the details pane (more room for the list)</td>
            </tr>
            <tr>
              <td>
                <kbd>Esc</kbd>
              </td>
              <td className={s.wrap}>Clear the search; press again to hide Cairn</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Chapter>
  );
}

export function UsingWhatYouFound() {
  return (
    <Chapter id="using">
      <p>Select an entry, then choose what to do with it.</p>

      <h3>
        <kbd>Enter</kbd> Copy
      </h3>
      <p>Copies the entry to the clipboard and hides Cairn. The search box is empty again next time.</p>

      <h3>
        <Keys k={["Ctrl", "Enter"]} /> Paste straight into your app
      </h3>
      <p>
        Cairn remembers which window you were in when you pressed <Keys k={["Alt", "Space"]} />.{" "}
        <Keys k={["Ctrl", "Enter"]} /> copies the entry, switches back to that window and pastes it for you, at the
        cursor.
      </p>
      <Callout kind="important">
        <ul>
          <li>
            If that window was <b>closed</b> meanwhile, Cairn stays open and says <b>&quot;Copied; paste with
            Ctrl+V&quot;</b>. The content is on your clipboard; paste it wherever you like.
          </li>
          <li>
            Apps <b>running as administrator</b> don&apos;t accept keystrokes from normal apps (a Windows security
            rule). Cairn switches to them, but nothing is typed. Just press <Keys k={["Ctrl", "V"]} /> yourself: the
            content is already on the clipboard.
          </li>
        </ul>
      </Callout>

      <h3>
        <Keys k={["Ctrl", "R"]} /> Run it in a terminal
      </h3>
      <p>
        For <b>commands and scripts</b> only. Cairn opens <b>Windows Terminal</b> (or a classic console window) in
        your home folder and runs the entry there. The window stays open so you can read the output.
      </p>
      <ul>
        <li>
          <b>
            Press <Keys k={["Ctrl", "R"]} /> twice.
          </b>{" "}
          The first press asks <em>&quot;Press Ctrl+R again to run in PowerShell&quot;</em>. Running something
          can&apos;t be undone, and Ctrl+R is also &quot;reload&quot; in browsers, so Cairn makes sure you meant it.
        </li>
        <li>
          <b>Shells:</b> <b>PowerShell</b> (also used when no shell is set) and <b>cmd</b>. Entries marked{" "}
          <code>bash</code>, <code>zsh</code> and others can&apos;t be run yet; Cairn tells you so.
        </li>
        <li>
          Entries with <code>{"{{placeholders}}"}</code> can&apos;t be run yet either (see{" "}
          <a href="#placeholders">Placeholders</a>).
        </li>
      </ul>
    </Chapter>
  );
}
