// The Field Guide's chapters, in order: used by the trail (table of contents) and the chapter headings.

export const guideChapters = [
  { id: "start", title: "Before you start" },
  { id: "install", title: "Install Cairn" },
  { id: "first", title: "Your first minute" },
  { id: "finding", title: "Finding things" },
  { id: "using", title: "Using what you found" },
  { id: "saving", title: "Saving new entries" },
  { id: "editing", title: "Editing, favorites and deleting" },
  { id: "actions", title: "The action panel" },
  { id: "settings", title: "Settings" },
  { id: "keys", title: "Keyboard cheat sheet" },
  { id: "data", title: "Your data and privacy" },
  { id: "trouble", title: "Troubleshooting" },
  { id: "next", title: "What's coming next" },
] as const;

export type GuideChapterId = (typeof guideChapters)[number]["id"];
