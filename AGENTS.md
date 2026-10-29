# AGENTS

Working agreement for coding agents in this repo. Contributor-facing rules live in [CONTRIBUTING.md](./CONTRIBUTING.md); this file covers how agents operate here.

## Protocol

- Plan before implementing non-trivial work; wait for explicit approval.
- After each step: verify, commit the completed concern, then report files touched, what changed, and the verification output. Wait for review before starting the next step, including when a check fails.
- If a change spans several concerns, split it into one commit per concern before reporting.
- State-changing actions other than commits need their own explicit approval: git checkout/merge/rebase/push/reset, dependency installs, deploys.
- Never claim a check passed unless it was actually run and observed.
- Commit messages in English, under 50 words.

## Repo notes

- `npm run build` must precede `npm run release` — publish consumes `dist/` bundles.
- `doc/` is a VitePress site. Pages are `.md` under `doc/doc/`; demos come from `.stories.ts` under `doc/stories/` rendered through the theme's `Demo`/`Playground` components. `npm run site` outputs to `doc/site`, which `doc/wrangler.toml` serves as static assets.
- Package exports resolve to **source**, not dist (`./index.css` → `src/*.css`) — that's what gives `doc/` live reload. `./package.json` is exported so `createRequire` in `scripts/build.mjs` can resolve package roots; keep it exported.
- `@sakulime-ui/shared` is internal-only: private and changesets-ignored. Its vars get inlined into every published bundle at build time.
- All four packages are `fixed` — any changeset bumps them together.
- Merge into `release/x.y.z` and then `master` with `--no-ff` only — no fast-forwards.
- Merge a topic branch into `release/x.y.z` only on explicit approval — let commits accumulate on the branch first; never merge commit-by-commit.
- Pushing `master` runs changesets/action → "chore: release" PR → merge publishes to npm via trusted publishing (OIDC + provenance, no token). Cloudflare Workers Builds deploys `doc/` independently on `master` pushes — not part of the Action.
- The docs subtree's history lives under `doc/` — don't rewrite those commits when rebasing.
- Gate release steps on local facts (`gh release view`, local git tags) — never on registry lookups; npm propagation delay makes them racy.
- When removing a subsystem, sweep its residue in the same change: hoisted deps, tsconfig includes, type imports, CI references — and run the full build before merging.
