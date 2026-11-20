// The privacy policy (/privacy/), English only. Linked from Microsoft Partner Center, so keep it
// accurate to what the app really does, and bump `updated` whenever the text changes.

import { links } from "./links";

/** A run of text; `{ code }` renders as inline code (paths, shortcuts). */
export type Segment = string | { code: string };
export type Paragraph = Segment[];

export type PrivacySection = {
  title: string;
  paragraphs: Paragraph[];
};

export const privacy = {
  heading: "Privacy policy",
  updated: "Last updated: November 20, 2026",
  intro:
    "Cairn does not collect, store or transmit any personal information. There is no account, no sync, no telemetry, no analytics, no crash reporting and no auto-update, and the app never connects to the internet. This page explains exactly what stays on your device.",
  sections: [
    {
      title: "What the app stores",
      paragraphs: [
        [
          "Your entries, their tags, and how often and when you last copied, pasted or ran each one (Cairn uses this to rank results) are kept in one file on your computer: ",
          { code: "%LOCALAPPDATA%\\com.ayoubedahlouli.cairn\\cairn.db" },
          ". Your appearance settings are saved locally too. None of it ever leaves your device.",
        ],
        [
          "With the Microsoft Store version, uninstalling the app removes this data, unless the folder was created earlier by the version from GitHub; in that case it stays where it is.",
        ],
      ],
    },
    {
      title: "Clipboard, keyboard and terminal",
      paragraphs: [
        [
          "Cairn writes to your clipboard only when you copy or paste an entry, and it never reads your clipboard. It registers one global shortcut (",
          { code: "Alt+Space" },
          ", or ",
          { code: "Ctrl+Shift+Space" },
          " if that one is taken) to open itself, and does not record any other keystrokes.",
        ],
        [
          "When you paste an entry, Cairn sends ",
          { code: "Ctrl+V" },
          " to the window you were using. When you run an entry, it opens a terminal on your computer with the command you saved. Both happen only when you ask for them.",
        ],
      ],
    },
    {
      title: "Network access",
      paragraphs: [
        ["Cairn makes no network calls. Even its fonts are built into the app."],
        [
          "Cairn displays its interface with Microsoft Edge WebView2, a component of Windows. Any diagnostic data WebView2 itself may send is governed by your Windows settings and the Microsoft Privacy Statement, not by Cairn.",
        ],
      ],
    },
    {
      title: "Microsoft Store",
      paragraphs: [
        [
          "If you install Cairn from the Microsoft Store, Microsoft handles the download and licensing under the Microsoft Privacy Statement. Microsoft may share aggregated, anonymous statistics with us, such as install and crash counts. We cannot identify you from them.",
        ],
      ],
    },
    {
      title: "This website",
      paragraphs: [
        [
          "This website has no analytics, tracking, ads or cookies, and its fonts are served from this site. Like any web server, ours may keep standard technical logs (such as IP address and pages requested) for security and to keep the site running.",
        ],
      ],
    },
    {
      title: "Children",
      paragraphs: [["Cairn collects no personal information from anyone, including children under 13."]],
    },
    {
      title: "Changes",
      paragraphs: [["If this policy changes, the new version will be posted on this page with an updated date."]],
    },
  ] satisfies PrivacySection[],
  contactLead: "Questions about privacy?",
  contactLink: "Open an issue on GitHub",
  contactHref: `${links.repo}/issues`,
};
