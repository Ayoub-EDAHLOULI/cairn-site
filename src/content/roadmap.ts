// "On the trail ahead": which stops are available. Their text is per language (dictionary
// `roadmap.stops`, same order). Only the current version is available; everything else is coming.
// The stops match "What's coming next" in the Field Guide.

export type RoadmapStatus = "available" | "upcoming";

export const roadmapStatuses: RoadmapStatus[] = ["available", "upcoming", "upcoming", "upcoming", "upcoming"];
