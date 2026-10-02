# cairn-site design reference

Reference only: nothing in this folder is shipped or imported by the site.

| File | What it is | Used in step |
|---|---|---|
| `landing-desktop.dc.html` | The full landing page, desktop. Contains the demo launcher logic and the real copy. | 1–7 |
| `landing-phone.dc.html` | The same page at 390px wide (it just mounts the desktop file). Its `@media (max-width:700px)` rules live in the desktop file's `<helmet>`. | 6 |
| `field-guide.html` | A finished, self-contained HTML version of the Cairn Field Guide. Source for `/guide`: keep its content, components (callouts, keycaps, kinds list, annotated window, action panel figure, cheat sheet, troubleshooting accordion) and reading layout; replace its own top bar with the site's header and drop its theme and accent controls (the site is dark only). | 8 |
| `screenshots/` | Optional images of the boards, if the owner adds them. | all |

## Reading a `.dc.html` file

- The markup inside `<x-dc>` is the layout. Inline `style="…"` values (sizes, spacing, radii, font sizes, colors) are the intended values. Map raw colors to the tokens in `CLAUDE.md`.
- `{{accent}}` and `{{accentText}}` are the accent tokens (`--accent`, `--accent-text`).
- `<sc-for list="{{rows}}" as="r">` = `rows.map(r => …)`; `<sc-if value="{{x}}">` = `{x && …}`.
- `onClick="{{pick}}"`, `onChange="{{onQ}}"` = event handlers; their behavior is in the `class Component extends DCLogic` script at the bottom (`renderVals()`).
- That script also holds the demo entries, the FAQ text and the demo search function. Move them into `src/content/` and `src/lib/search.ts` as typed code.
- Ignore `<helmet>`, `support.js`, `data-props`, `<dc-import>` and the Google Fonts `<link>` (the site self-hosts fonts with `next/font`).
- The design has no motion; motion is specified only in `CLAUDE.md`.

When this folder and `CLAUDE.md` disagree, `CLAUDE.md` wins; point out the mismatch.
