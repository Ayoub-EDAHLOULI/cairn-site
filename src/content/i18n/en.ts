// English copy (the default language). Facts must match the Field Guide (/guide), which documents the
// current version. Commands, shortcuts, the demo and kind names are not here: they stay English everywhere.

import { VERSION } from "@/content/links";
import type { Dictionary } from "./types";

export const en: Dictionary = {
  locale: "en",
  ogLocale: "en_US",
  languageName: "English",

  meta: {
    title: "Cairn: find the command you already figured out",
    description:
      "Cairn keeps your commands, scripts and snippets with the reason you saved them, and finds them by what you remember. A keystroke away, fully offline. Free and open source, for Windows 10 and 11.",
    ogHeadline: "Find the command you already figured out.",
    ogSubline: "Free and open source · Fully offline · Windows 10 and 11",
  },

  a11y: {
    skipLink: "Skip to content",
    backToTop: "Back to top",
    pauseAnimation: "Pause background animation",
    resumeAnimation: "Resume background animation",
    mainNav: "Main",
    footerNav: "Footer",
    languageNav: "Language",
  },

  header: {
    nav: { features: "Features", privacy: "Privacy", roadmap: "Roadmap", faq: "FAQ", guide: "Guide", github: "GitHub" },
    download: "Download",
    github: "GitHub",
  },

  guideInEnglish: "",

  hero: {
    pill: `Version ${VERSION} is out. Free and open source.`,
    title: "Find the command you already figured out.",
    subtitle:
      "Cairn keeps your commands, scripts and snippets with the reason you saved them, and finds them by what you remember. A keystroke away, fully offline.",
    download: "Download for Windows",
    github: "View on GitHub",
    smallPrint: "Windows 10 and 11. No account needed.",
    smallPrintPhone: "Cairn runs on Windows 10 and 11.",
    captionBefore: "This is the real search, running in your browser. Try",
    captionOr: "or",
    captionAfter: ".",
  },

  intent: {
    title: "Search by what you remember, not what you typed.",
    paragraph1:
      "Every entry carries one sentence: why you saved it. Cairn searches that sentence as seriously as the command itself, so the words you remember months later are enough.",
    paragraph2:
      "Typing partial words works, accents don't matter, and if no entry has every word, Cairn shows the closest ones instead of nothing.",
    tableCaption: "Example searches and what Cairn finds",
    youType: "You type",
    cairnFinds: "Cairn finds",
  },

  kinds: {
    title: "Five kinds of things worth keeping.",
    lead: "No folders to maintain. Pick a kind, add a few tags, and filter with a keystroke.",
    descriptions: {
      command: "The one-liners you look up every few weeks.",
      script: "Multi-line PowerShell or cmd you run as a whole.",
      code: "The hook or query you always end up rewriting.",
      note: "The fix you found after an hour of searching.",
      idea: "Half-formed thoughts, saved before they're gone.",
    },
  },

  keyboard: {
    title: "Never leave the keyboard.",
    lead: "Open Cairn from anywhere, type, and press Enter to copy. Ctrl Enter pastes straight into the window you came from. Ctrl K shows every action, with its shortcut, so you learn as you go.",
    figcaption: "Cairn's action panel for the selected entry, opened with Ctrl K.",
  },

  offline: {
    title: "Offline by design. Your notes never leave your machine.",
    lead: "Commands hold server names, paths and sometimes passwords. Cairn makes no network requests at all: everything lives in one SQLite file you can copy, back up or delete.",
    pathLabel: "Database location",
    facts: [
      { title: "No account", text: "Install it and start typing. Nothing to sign up for, ever." },
      { title: "No telemetry", text: "No analytics, no crash reports sent anywhere. Even the fonts are built in." },
      { title: "Open source", text: "Every line is on GitHub, so you don't have to take our word for any of this." },
    ],
  },

  roadmap: {
    title: "On the trail ahead.",
    lead: `Version ${VERSION} is the foundation. Here's what comes next, in order.`,
    stops: [
      { label: "Available now", title: `Version ${VERSION}`, text: "Search by intent, actions, editor, themes, run and paste." },
      { label: "Next", title: "Smarter search", text: "Typo tolerance, and what you use often rises to the top." },
      { label: "Then", title: "Search by meaning", text: "Find entries by idea, with a model that runs on your computer." },
      { label: "Then", title: "Capture faster", text: "Quick capture, fill parameters, and import from shell history." },
      { label: "Later", title: "Local AI helpers", text: "A suggested why, automatic tags, questions about your entries." },
    ],
  },

  faq: {
    title: "Questions",
    items: [
      {
        question: "Is Cairn free?",
        answer: "Yes. Cairn is free and open source under the MIT license, with no paid tier and no account.",
      },
      {
        question: "Why does Windows warn me when I install it?",
        answer: `Version ${VERSION} isn’t code-signed yet, so Windows SmartScreen doesn’t recognise the publisher. Click More info, then Run anyway. The source and the build are on GitHub if you’d rather check first.`,
      },
      {
        question: "Does it work on macOS or Linux?",
        answer: `Not yet. Cairn is built with Tauri, which runs on all three, but version ${VERSION} is tested and released for Windows 10 and 11 only.`,
      },
      {
        question: "Where is my data stored?",
        answer:
          "In one SQLite file on your computer, under %LOCALAPPDATA%. Cairn never sends it anywhere. To back it up, quit Cairn and copy cairn.db, plus cairn.db-wal and cairn.db-shm if they’re still next to it.",
      },
      {
        question: "What if Alt Space is already taken?",
        answer:
          "If another app such as PowerToys Run uses Alt Space, Cairn falls back to Ctrl Shift Space. The tray icon’s tooltip always shows the shortcut that works.",
      },
    ],
  },

  cta: {
    title: "Leave a stone for your future self.",
    text: "Free, open source and offline. Windows 10 and 11.",
    download: "Download for Windows",
    guide: "Read the Field Guide",
  },

  footer: {
    madeByBefore: "MIT licensed. Made by",
    madeByAfter: ".",
    github: "GitHub",
    releases: "Releases",
    guide: "Field Guide",
  },
};
