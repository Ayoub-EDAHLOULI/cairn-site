// The demo search. Same rules as Cairn 0.1, whose FTS5 index tokenizes queries and content the same way:
// - case and accents are ignored;
// - text is split into words on anything that is not a letter or digit;
// - a query word of 2+ characters matches any word it is a prefix of; a 1-character word must match exactly;
// - entries matching every query word are returned; if there are none, entries matching any word,
//   ranked by how many words they match (title matches weigh more).
// Pure: no DOM, no React. Tested in search.test.ts.

export type Searchable = {
  title: string;
  why: string;
  tags: readonly string[];
  body?: string;
};

const HIT_WEIGHT = 10;
const TITLE_HIT_WEIGHT = 3;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Splits text into normalized words on anything that is not a letter or digit. */
export function tokenize(text: string): string[] {
  return normalize(text)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function matches(token: string, words: readonly string[]): boolean {
  return words.some((word) => (token.length > 1 ? word.startsWith(token) : word === token));
}

/** Returns the entries matching `query`, best first. An empty query returns every entry in order. */
export function search<T extends Searchable>(entries: readonly T[], query: string): T[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return entries.slice();

  const scored = entries.map((entry) => {
    const words = tokenize([entry.title, entry.why, entry.tags.join(" "), entry.body ?? ""].join(" "));
    const titleWords = tokenize(entry.title);
    const hits = tokens.filter((token) => matches(token, words)).length;
    const titleHits = tokens.filter((token) => matches(token, titleWords)).length;
    return { entry, hits, score: hits * HIT_WEIGHT + titleHits * TITLE_HIT_WEIGHT };
  });

  const matchingAll = scored.filter((s) => s.hits === tokens.length);
  const pool = matchingAll.length > 0 ? matchingAll : scored.filter((s) => s.hits > 0);

  // Array.prototype.sort is stable, so ties keep the original entry order.
  return pool.sort((a, b) => b.score - a.score).map((s) => s.entry);
}
