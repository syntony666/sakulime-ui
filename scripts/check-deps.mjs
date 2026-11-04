/* Isolated-workspace deps guard: every workspace that imports
   postcss-custom-selectors must declare it locally — isolated builds
   (Cloudflare, publish) never see root-hoisted devDeps. */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const importers = ["doc/package.json", "packages/core/package.json"];
const missing = importers.filter(
  (p) => !require(`../${p}`).devDependencies?.["postcss-custom-selectors"],
);
if (missing.length)
  throw new Error(
    `postcss-custom-selectors must be declared in: ${missing.join(", ")}`,
  );
