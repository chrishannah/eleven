# Repository guidance

This is the Eleventy 3 source for `chrishannah.me`. Read `CLAUDE.md` before making changes; its architecture, content model, external-service notes, and project-specific learnings apply to every coding agent. Treat the current repository as authoritative if that document has drifted, and update the document when an architectural change makes it inaccurate.

## Working here

- Install exactly from the lockfile with `npm ci`.
- Use `npm run dev` for the fast development server, `npm start` for a full development build, and `npm run build` for production verification.
- `public/`, `.cache/`, `.vercel/`, `.env*.local`, and installed dependencies are generated or local state; do not edit or commit them.
- The `blog-editor/` directory is a separate Next.js application with its own `package.json` and lockfile. Run its commands from that directory and only touch it when the task concerns the editor.
- Preserve post frontmatter and the established content locations under `posts/YYYY/MM/`. Do not rewrite editorial content unless the task explicitly requests it.
- Keep secrets out of source and logs. External-data builds may require credentials or network access; report unavailable integrations separately from code failures.

## Verification

Run `npm run build` after site, template, data, CSS, JavaScript, or API changes. There is no root lint or test script, so add focused checks only when they are part of the requested change. For editor changes, run the editor's own build from `blog-editor/`.

Keep changes surgical and preserve unrelated working-tree changes. Do not commit, deploy, publish inbox content, or push unless explicitly asked.
