// The action panel (Ctrl K) as shown in the keyboard section. All of these exist in Cairn 0.1
// (the real panel also has New entry and Quit Cairn).

export type Action = {
  label: string;
  /** Shortcut as displayed; empty when the action has none. */
  keys: string;
  danger?: boolean;
};

export const actions: Action[] = [
  { label: "Copy to clipboard", keys: "↵" },
  { label: "Paste into active window", keys: "Ctrl ↵" },
  { label: "Run in PowerShell", keys: "Ctrl R" },
  { label: "Edit", keys: "Ctrl E" },
  { label: "Add to favorites", keys: "" },
  { label: "Delete", keys: "Ctrl ⇧ ⌫", danger: true },
  { label: "Settings", keys: "Ctrl ," },
];
