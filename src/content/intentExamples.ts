// The "You type → Cairn finds" table. search.test.ts checks that each query finds `entryId` first
// in the demo entries, and that `shown` appears in that entry, so the table never claims more than the demo does.

export type IntentExample = {
  query: string;
  /** The demo entry this query finds first. */
  entryId: string;
  /** What the table shows: the entry's title, or a line of its content. */
  shown: string;
};

export const intentExamples: IntentExample[] = [
  { query: "start the database", entryId: "start-postgres", shown: "Start-Service postgresql-x64-18" },
  { query: "port in use", entryId: "port-5432", shown: "netstat -ano | findstr 5432" },
  { query: "open psql in docker", entryId: "docker-psql", shown: "docker exec -it pg-dev psql -U postgres" },
  { query: "backup before migration", entryId: "backup-dev-db", shown: "backup-dev-db.ps1" },
];
