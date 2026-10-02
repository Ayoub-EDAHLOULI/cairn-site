import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { demoEntries } from "../content/demoEntries.ts";
import { search, tokenize, type Searchable } from "./search.ts";

const ids = (results: { id: string }[]) => results.map((r) => r.id);

type Fixture = Searchable & { id: string };
const fixture = (id: string, title: string, why = "", tags: string[] = [], body?: string): Fixture => ({
  id,
  title,
  why,
  tags,
  body,
});

describe("search() on the demo entries", () => {
  test('"start database" returns the Start-Service command then the "won\'t start" note (the hero\'s static state)', () => {
    assert.deepEqual(ids(search(demoEntries, "start database")), ["start-postgres", "port-5432"]);
  });

  test("the caption's examples find the right entry first", () => {
    assert.equal(search(demoEntries, "port in use")[0]?.id, "port-5432");
    assert.equal(search(demoEntries, "git history")[0]?.id, "git-graph");
  });

  test("queries are split on punctuation like the content", () => {
    assert.equal(search(demoEntries, "Start-Service")[0]?.id, "start-postgres");
    assert.equal(search(demoEntries, "x64-18")[0]?.id, "start-postgres");
  });

  test("an empty or blank query returns every entry in order", () => {
    assert.deepEqual(ids(search(demoEntries, "")), ids(demoEntries));
    assert.deepEqual(ids(search(demoEntries, "  -  ")), ids(demoEntries));
  });
});

describe("search() rules", () => {
  const entries = [
    fixture("cafe", "Café notes", "Where the good espresso is"),
    fixture("db", "Database backup", "Nightly dump", ["postgres"]),
    fixture("letter", "Run with flag", "", [], "pg_dump -F c devdb"),
    fixture("cairn", "Cairn release", "Ship it"),
  ];

  test("ignores case and accents, both ways", () => {
    assert.deepEqual(ids(search(entries, "CAFE")), ["cafe"]);
    assert.deepEqual(ids(search([fixture("plain", "cafe notes")], "café")), ["plain"]);
  });

  test("matches word prefixes only", () => {
    assert.deepEqual(ids(search(entries, "datab")), ["db"]);
    assert.deepEqual(ids(search(entries, "tabase")), []);
  });

  test("a one-letter word must match a whole word", () => {
    assert.deepEqual(ids(search(entries, "c")), ["letter"]);
  });

  test("searches title, why, tags and body", () => {
    assert.deepEqual(ids(search(entries, "espresso")), ["cafe"]);
    assert.deepEqual(ids(search(entries, "postgres")), ["db"]);
    assert.deepEqual(ids(search(entries, "devdb")), ["letter"]);
  });

  test("requires every word when some entry has them all", () => {
    assert.deepEqual(ids(search(entries, "database nightly")), ["db"]);
  });

  test("falls back to entries matching any word, ranked by matches", () => {
    const pool = [
      fixture("one", "Alpha", "nothing else"),
      fixture("two", "Something", "alpha and beta"),
    ];
    // No entry has all three words: "two" matches two of them, "one" only one.
    assert.deepEqual(ids(search(pool, "alpha beta gamma")), ["two", "one"]);
  });

  test("title matches weigh more than other fields", () => {
    const pool = [fixture("why", "Something", "deploy script"), fixture("title", "Deploy", "something")];
    assert.deepEqual(ids(search(pool, "deploy")), ["title", "why"]);
  });

  test("ties keep the original order", () => {
    const pool = [fixture("a", "Tie"), fixture("b", "Tie")];
    assert.deepEqual(ids(search(pool, "tie")), ["a", "b"]);
  });

  test("returns nothing when no word matches", () => {
    assert.deepEqual(search(entries, "kubernetes"), []);
  });
});

describe("tokenize()", () => {
  test("splits on anything that is not a letter or digit", () => {
    assert.deepEqual(tokenize("Start-Service postgresql-x64-18"), ["start", "service", "postgresql", "x64", "18"]);
    assert.deepEqual(tokenize("won’t  Élan"), ["won", "t", "elan"]);
  });
});
