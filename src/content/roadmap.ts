// "On the trail ahead". Only the current version is available; everything else is labelled as coming.
// Matches "What's coming next" in the Field Guide.

import { VERSION } from "./links";

export type RoadmapStop = {
  status: "available" | "upcoming";
  /** "Available now", "Next", "Then", "Later". */
  label: string;
  title: string;
  text: string;
};

export const roadmap: RoadmapStop[] = [
  {
    status: "available",
    label: "Available now",
    title: `Version ${VERSION}`,
    text: "Search by intent, actions, editor, themes, run and paste.",
  },
  {
    status: "upcoming",
    label: "Next",
    title: "Smarter search",
    text: "Typo tolerance, and what you use often rises to the top.",
  },
  {
    status: "upcoming",
    label: "Then",
    title: "Search by meaning",
    text: "Find entries by idea, with a model that runs on your computer.",
  },
  {
    status: "upcoming",
    label: "Then",
    title: "Capture faster",
    text: "Quick capture, fill parameters, and import from shell history.",
  },
  {
    status: "upcoming",
    label: "Later",
    title: "Local AI helpers",
    text: "A suggested why, automatic tags, questions about your entries.",
  },
];
