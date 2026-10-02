# cairn-site

The website for [Cairn](https://github.com/Ayoub-EDAHLOULI/cairn), an open-source, offline launcher for Windows that keeps your commands, scripts and notes with the reason you saved them.

Two pages: the landing page (`/`) and the Cairn Field Guide (`/guide`). It is a static Next.js export: no server, no analytics, no cookies, no third-party requests.

## Scripts

```bash
npm install
npm run dev        # local development server
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
npm run build      # static export to out/
npx serve out      # preview the exported site
```

Project conventions, design tokens and the roadmap are in [CLAUDE.md](CLAUDE.md). The design reference is in [design/](design/README.md).

## License

MIT. Made by [Ayoub Edahlouli](https://ayoubedahlouli.com).
