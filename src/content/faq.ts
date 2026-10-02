// The FAQ. Facts must match the Field Guide (/guide), which documents the current version.

import { VERSION } from "./links";

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "Is Cairn free?",
    answer: "Yes. Cairn is free and open source under the MIT license, with no paid tier and no account.",
  },
  {
    question: "Why does Windows warn me when I install it?",
    answer:
      `Version ${VERSION} isn’t code-signed yet, so Windows SmartScreen doesn’t recognise the publisher. Click More info, then Run anyway. The source and the build are on GitHub if you’d rather check first.`,
  },
  {
    question: "Does it work on macOS or Linux?",
    answer:
      `Not yet. Cairn is built with Tauri, which runs on all three, but version ${VERSION} is tested and released for Windows 10 and 11 only.`,
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
];
