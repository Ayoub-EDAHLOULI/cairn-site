import type { KindId } from "./kinds";

export type DemoEntry = {
  id: string;
  kind: KindId;
  /** Shell or language shown on the detail badge. */
  shell: string;
  title: string;
  /** The one sentence: why it was saved. */
  why: string;
  tags: string[];
  /** Content, when it differs from the title. Enter copies `body ?? title`. */
  body?: string;
};

export const demoEntries: DemoEntry[] = [
  {
    id: "start-postgres",
    kind: "command",
    shell: "PowerShell",
    title: "Start-Service postgresql-x64-18",
    why: "Start the local PostgreSQL service when the app can’t connect to the database.",
    tags: ["postgres", "windows", "database", "start"],
  },
  {
    id: "git-graph",
    kind: "command",
    shell: "bash",
    title: "git log --oneline --graph -20",
    why: "Show the last 20 commits as a compact history graph.",
    tags: ["git", "history", "log"],
  },
  {
    id: "docker-psql",
    kind: "command",
    shell: "bash",
    title: "docker exec -it pg-dev psql -U postgres",
    why: "Open a psql shell inside a running Postgres container.",
    tags: ["postgres", "docker", "database", "psql"],
  },
  {
    id: "backup-dev-db",
    kind: "script",
    shell: "PowerShell",
    title: "backup-dev-db.ps1",
    why: "Dump the dev database before running risky migrations.",
    tags: ["postgres", "backup", "database", "migration"],
    body: '$date = Get-Date -Format "yyyy-MM-dd"\npg_dump -U postgres -F c devdb > "D:\\backups\\devdb_$date.dump"',
  },
  {
    id: "port-5432",
    kind: "note",
    shell: "Windows",
    title: "Postgres won’t start: port 5432 in use",
    why: "Another instance is holding port 5432. Find the process and stop it.",
    tags: ["postgres", "troubleshooting", "port", "database"],
    body: "netstat -ano | findstr 5432\ntaskkill /PID <pid> /F",
  },
  {
    id: "use-debounce",
    kind: "code",
    shell: "TypeScript",
    title: "useDebounce hook",
    why: "Debounce a search input in React so it doesn’t fire on every keystroke.",
    tags: ["react", "typescript", "hooks", "search"],
    body: "function useDebounce<T>(value: T, ms = 200) {\n  const [v, setV] = useState(value);\n  useEffect(() => {\n    const t = setTimeout(() => setV(value), ms);\n    return () => clearTimeout(t);\n  }, [value, ms]);\n  return v;\n}",
  },
  {
    id: "import-aliases",
    kind: "idea",
    shell: "Idea",
    title: "Import my PowerShell aliases into Cairn",
    why: "Stop retyping aliases on every new machine.",
    tags: ["powershell", "ideas", "aliases"],
  },
];
