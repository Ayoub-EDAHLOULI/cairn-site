# CLAUDE.md — cairn-site

This file is read at the start of every session. Keep it accurate: when a decision changes, update this file in the same step.

## What this is

The public website for **Cairn**, an open-source, offline, Raycast-style desktop launcher for Windows that keeps commands, scripts, code, notes and ideas with **the reason each was saved**, and finds them by what you remember.

The site has two pages:
- `/` — the landing page. Its job: show Cairn working within five seconds, then get a download or a GitHub visit.
- `/guide` — the Cairn Field Guide (user manual).

Links:
- Repo: `https://github.com/Ayoub-EDAHLOULI/cairn`
- Download: `https://github.com/Ayoub-EDAHLOULI/cairn/releases/latest` (always the newest installer; the site never hardcodes a version file)
- Author: Ayoub Edahlouli, `https://ayoubedahlouli.com`
- License: MIT

Non-negotiables:
- **The site practices what Cairn preaches:** no analytics, no cookies, no tracking pixels, no third-party scripts, no runtime requests to other domains (fonts are self-hosted at build time).
- **Honest copy:** only version 0.1 features are described as available. Everything else is labelled as coming.
- **Fast and accessible:** see budgets below.

## Working agreement (read before every task)

The owner prefers **incremental, step-confirmed work** and **honest critical feedback**.

1. **Plan first.** For any task, reply with a short plan (files, approach, risks) and **wait for confirmation** before writing code.
2. **One step at a time.** Implement only the confirmed roadmap step.
3. **Verify** after each step: `npm run lint`, `npm run build` (must produce the static export in `out/` with no errors), and `npm test` once tests exist. Don't start `npm run dev` yourself; ask the owner to run it and check the page.
4. **Summarize** each step: what changed, how to check it in the browser, and a suggested commit message (Conventional Commits). **Never commit or push.**
5. **Ask before adding any dependency.** State why, and the lighter alternative.
6. **Push back** when a request conflicts with this file, hurts performance or accessibility, or adds scope.

## Stack

- **Next.js** (App Router) + **TypeScript** (strict), `output: 'export'` in `next.config` (pure static site, deployable anywhere).
- **Styling:** CSS Modules + global CSS variables in `src/styles/tokens.css`. No Tailwind, no UI kit, no CSS-in-JS.
- **Fonts:** `next/font/google` for **Geist** (UI) and **JetBrains Mono** (code). It downloads them at build time and serves them from the site, so visitors never contact Google.
- **Images:** `next/image` with `unoptimized: true` (required for static export), or inline SVG for icons and illustrations.
- **Animation:** CSS + a small `IntersectionObserver` hook. **No animation library** (see Motion).
- **Tests:** propose a test runner (e.g. Vitest) in the step that needs it; ask first.

## Folder structure

```
src/
  app/
    layout.tsx          # html, fonts, metadata, skip link, Header, Footer
    page.tsx            # landing page: composes the sections in order
    guide/page.tsx      # the Field Guide
    sitemap.ts, robots.ts
  components/
    layout/             # Header, Footer, SkipLink
    landing/            # Hero, TrailBackdrop, DemoLauncher, IntentSection, KindsSection,
                        # KeyboardSection, OfflineSection, RoadmapSection, FaqSection, FinalCta
    guide/              # Callout, KeyCombo, KindRow, ...
    ui/                 # Button, Kbd, CairnMark
  content/              # typed data: demoEntries.ts, faq.ts, roadmap.ts, kinds.ts, links.ts
  lib/
    search.ts           # demo search (pure function, unit-tested)
  hooks/
    useInView.ts        # IntersectionObserver, fires once
    usePrefersReducedMotion.ts
  styles/
    tokens.css, globals.css
design/                 # design reference (see design/README.md); not shipped
```

Copy that may change (FAQ, roadmap, links, demo entries) lives in `src/content/`, never hardcoded inside components.

## Design reference

`design/` holds the source of the design canvas. Read `design/README.md` first. Before building a section, open `design/landing-desktop.dc.html` (and the phone board for mobile) and match it. `/guide` is converted from `design/field-guide.html`. If the design and this file disagree, **this file wins**; flag the mismatch.

## Tokens (`src/styles/tokens.css`)

The site is **dark only**.

| Token | Value | Use |
|---|---|---|
| `--bg` | #141414 | page background |
| `--surface` | #191919 | launcher window, cards, alternate section band |
| `--panel` | #202020 | launcher footer, action panel, secondary button |
| `--raised` | #2C2C2B | chips, small fills |
| `--border` | #2F2F2E | component borders |
| `--divider` | #222221 | section dividers |
| `--text` | #EDEDEC | primary text |
| `--text-2` | #B4B3AF | body copy under headings |
| `--muted` | #9B9A97 | labels, secondary info |
| `--faint` | #8A8986 | small print (still ≥ 4.5:1 on `--bg`) |
| `--accent` | #6050DC | Majorelle: primary buttons, selection, mark |
| `--accent-soft` | `color-mix(in srgb, var(--accent) 24%, transparent)` | selected rows |
| `--accent-text` | #B0A8EE | accent-colored text on dark |
| `--danger` | #FF8A80 | Delete in the action panel |
| `--focus` | #8B7FF0 | focus ring (`:focus-visible`) |
| `--contour` | #252524 | hero backdrop contour lines |
| `--stone` | #3A3A39 | roadmap dashes, backdrop cairns, outline button border |
| `--stone-edge` | #4A4A48 | upcoming roadmap stones, outline button hover |

Design colors without their own token map to the nearest one: links #A79EF0 → `--accent-text` (hover `--text`), row dividers #252524 → `--divider`, header border #2A2A29 → `--border`, pill #1A1A1A → `--surface`. Kind colors are `--kind-command`, `--kind-script`, `--kind-code`, `--kind-note`, `--kind-idea`. Internal links use `next/link`, external ones a plain `<a>`.

Entry kinds (glyph, color): Command `>_` #6FB3E0 · Script `#!` #FFA95E · Code `</>` #5EC2AE · Note `¶` #B4B3AF · Idea `✦` #E6BE3A. Badge background = the color at 15% alpha.

Type: headings Geist 700 with tight tracking (≈ −0.03em to −0.04em); hero H1 `clamp(42px, 7vw, 76px)`; section H2 `clamp(32px, 4vw, 46px)`; body 17px / 1.6. Radii: buttons 11, launcher 16, cards 14, rows 8. Content max-width 1120px, side padding 24px. Section vertical padding 120px (64px on phones).

## The landing page, section by section

1. **Header** (sticky, blurred): Cairn mark + name; links Features, Privacy, Roadmap, FAQ, GitHub; Download button. Phones: logo + one button only.
2. **Hero** (`#top`): pill linking to the roadmap ("Version 0.1 is out. Free and open source."), H1 "Find the command you already figured out.", subtitle, **Download for Windows** + **View on GitHub**, small print "Windows 10 and 11. No account needed.", then the **demo launcher**. Behind it, `TrailBackdrop`: faint topographic contour lines, a dotted accent trail, two small cairns (decorative SVG, `aria-hidden`).
3. **Search by what you remember** (`#features`): text + the "You type → Cairn finds" table (4 rows).
4. **Five kinds**: one bordered strip of 5 columns (stacks on phones).
5. **Never leave the keyboard**: big Alt + Space keycaps, copy, and a static action panel.
6. **Offline by design** (`#offline`): copy, the database path in a code block, three facts.
7. **On the trail ahead** (`#roadmap`): horizontal trail; only "Version 0.1" is solid and marked available; the rest dashed and labelled Next / Then / Later.
8. **Questions** (`#faq`): accordion of real `<button aria-expanded>` elements.
9. **Final CTA**: mark, "Leave a stone for your future self.", Download + Read the Field Guide.
10. **Footer**: MIT, author link, GitHub, Releases, Field Guide.

### Demo launcher (the most important component)

A working miniature of Cairn, using the entries in `src/content/demoEntries.ts`.
- **Search** (`src/lib/search.ts`, pure and unit-tested): accent-insensitive, words prefix-match (1-letter words match exactly), every word must match somewhere in title, why, tags or content; if nothing matches all words, fall back to entries matching any, ranked by matches (title matches weigh more). Same rules as the real app.
- **Keyboard:** ↑/↓ move, Enter copies the selected entry with the Clipboard API and shows "Copied to clipboard" in the footer (if the API fails, say nothing; never claim it copied). Handlers live on the input only, never on `window`: page scrolling keys must keep working.
- **Accessibility:** combobox + listbox pattern (`role="combobox"`, `aria-controls`, `aria-activedescendant`, `role="option"` with `aria-selected`); a polite live region announces the result count.
- **Phones (≤ 700px):** results list only, no detail pane.
- Initial query "start database" with `Start-Service postgresql-x64-18` selected (see Motion for the autoplay).
- **Fixed height:** the launcher body has a fixed height whatever the query (no layout shift while typing); the results list scrolls inside it. When the selection moves out of view, scroll only the list (set its `scrollTop`), never `scrollIntoView`, which can scroll the page.

### Mobile download behavior

Cairn is Windows-only, so a phone visitor can't use the installer. At ≤ 700px: the header button becomes **GitHub**, and in the hero **View on GitHub** becomes the primary button with Download secondary and the note "Cairn runs on Windows 10 and 11." CSS only, no user-agent sniffing, so the static HTML is identical for everyone and nothing shifts after load.

## Motion

Few, deliberate moments that show the product working. Every one plays **once**.

1. **Hero autoplay:** the H1, subtitle and buttons are visible in the initial HTML (never hidden waiting for JS). The launcher rises in (opacity + translateY, ~600ms). Then "start database" types itself (~60ms per character) and results update live, ending with `Start-Service postgresql-x64-18` on top. **Any focus, click or keypress in the demo stops the autoplay immediately** and hands control to the visitor.
2. **Trail draws itself:** the dotted trail path traces in once via `stroke-dashoffset` (~1.6s), subtle.
3. **You type → Cairn finds:** on entering view, each row's query types out and its result fades in, rows staggered ~250ms.
4. **Keyboard section:** the Alt then Space keycaps press down (translateY + border change), then the action panel opens with a quick scale (0.96 → 1) + fade, like in the app.
5. **Roadmap:** the solid line fills up to the "Available now" stone on entering view.

Everyday transitions: button and link hover/press 150ms; FAQ answer expand/collapse animated (grid-rows or height via `ResizeObserver`, no jump); demo selection highlight 120ms.

Rules:
- Animate only `transform` and `opacity` (plus `stroke-dashoffset` for the trail). No layout-affecting animation.
- Durations: UI 150–250ms, reveals 400–700ms. One shared easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` as `--ease`.
- **`prefers-reduced-motion: reduce`** → no autoplay typing, no reveals; everything is shown in its final state.
- No parallax, no scroll-jacking, no loops, no generic fade-up on every section.
- Content is never invisible without JavaScript: reveal states are applied by JS only after hydration.
- **No load flash:** the static HTML shows every animated component in its final state. An inline `<head>` script adds `motion-ok` to `<html>` before first paint when `prefers-reduced-motion` is not `reduce`; pre-animation states (e.g. the empty launcher before the autoplay types) are styled only under `.motion-ok`. Without JS or with reduced motion, the final state shows as-is.

## Quality budgets

- Lighthouse (mobile): **≥ 95** in Performance, Accessibility, Best Practices and SEO.
- LCP < 2.0s, CLS < 0.05, total JS for `/` kept small (no libraries beyond Next/React without approval).
- WCAG 2.2 AA: contrast ≥ 4.5:1 for text, visible focus rings, skip link, logical heading order (one H1 per page), every interactive element a real `<button>` or `<a>`, touch targets ≥ 44px.

## SEO and metadata

- Per-page `metadata`: title, description, canonical, Open Graph and Twitter card.
- Favicon and app icon from the Cairn mark (three stacked stones, white on Majorelle).
- Open Graph image 1200×630: dark background, mark, "Find the command you already figured out." (design it in the SEO step).
- `sitemap.ts` and `robots.ts`. The production domain is still **undecided**: keep it in one constant in `src/content/links.ts`.

## Roadmap

- [x] **0** Scaffold check: confirm the create-next-app setup, set `output: 'export'`, strict TS, remove template content, folder structure above. (Next 16.3.8; folders are created by the step that first needs them; no `start` script since `next start` doesn't work with a static export: preview with `npx serve out`.)
- [x] **1** Tokens, fonts, global styles, layout: Header, Footer, skip link, `CairnMark`, `Button`, `Kbd`.
- [x] **2** Hero (static): copy, buttons, `TrailBackdrop`, launcher markup with static content.
- [ ] **3** Demo launcher: `lib/search.ts` + tests, keyboard, copy, accessibility. Include a test that `search("start database")` returns exactly the Start-Service command then the "won't start" note, so the static hero markup and `search()` can't drift apart.
- [ ] **4** Sections: search by intent, five kinds, keyboard, offline.
- [ ] **5** Roadmap, FAQ, final CTA, content files.
- [ ] **6** Mobile pass (≤ 700px), including the mobile download behavior.
- [ ] **7** Motion (the five moments + transitions + reduced motion).
- [ ] **8** `/guide` from `design/field-guide.html`, using the site's header and footer.
- [ ] **9** SEO: metadata, icons, OG image, sitemap, robots.
- [ ] **10** Deploy + audit: hosting choice (GitHub Pages or Vercel), domain, Lighthouse run, fixes.

## Out of scope (unless the owner changes this)

Blog, newsletter, analytics, cookie banner (none needed: no cookies), light theme, translations, a docs framework, a changelog page (GitHub Releases is the changelog).
