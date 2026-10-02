// The five kinds of entries in Cairn. Colors are CSS custom properties from tokens.css.

export type KindId = "command" | "script" | "code" | "note" | "idea";

export type Kind = {
  id: KindId;
  /** Singular, as shown on a badge. */
  label: string;
  /** Plural, as shown in the five-kinds section. */
  plural: string;
  glyph: string;
  /** CSS color, e.g. `var(--kind-command)`. */
  color: string;
  description: string;
  /** Command and script titles are code, so they render in the mono font. */
  monoTitle: boolean;
};

export const kinds: Record<KindId, Kind> = {
  command: {
    id: "command",
    label: "Command",
    plural: "Commands",
    glyph: ">_",
    color: "var(--kind-command)",
    description: "The one-liners you look up every few weeks.",
    monoTitle: true,
  },
  script: {
    id: "script",
    label: "Script",
    plural: "Scripts",
    glyph: "#!",
    color: "var(--kind-script)",
    description: "Multi-line PowerShell or cmd you run as a whole.",
    monoTitle: true,
  },
  code: {
    id: "code",
    label: "Code",
    plural: "Code",
    glyph: "</>",
    color: "var(--kind-code)",
    description: "The hook or query you always end up rewriting.",
    monoTitle: false,
  },
  note: {
    id: "note",
    label: "Note",
    plural: "Notes",
    glyph: "¶",
    color: "var(--kind-note)",
    description: "The fix you found after an hour of searching.",
    monoTitle: false,
  },
  idea: {
    id: "idea",
    label: "Idea",
    plural: "Ideas",
    glyph: "✦",
    color: "var(--kind-idea)",
    description: "Half-formed thoughts, saved before they're gone.",
    monoTitle: false,
  },
};

/** Display order in the five-kinds section. */
export const kindOrder: KindId[] = [
  "command",
  "script",
  "code",
  "note",
  "idea",
];
