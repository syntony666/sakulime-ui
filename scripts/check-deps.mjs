/* Isolated-workspace deps guard: bare imports in workspace build
   configs must be declared in that workspace's own dependencies —
   isolated builds (Cloudflare, publish) never see root-hoisted
   devDeps. `vite` is exempt: root scripts orchestrate the workspace
   build and provide the binary. Add new build configs to `configs`
   as they appear. */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const require = createRequire(import.meta.url);

const configs = [
  ["doc/package.json", ["doc/.vitepress/config.mts"]],
  ["packages/core/package.json", ["packages/core/vite.config.ts"]],
];
const exempt = new Set(["vite"]);

const specifiers = (file) =>
  [
    ...readFileSync(file, "utf8").matchAll(
      /(?:from|import)\s+["']([^"']+)["']/g,
    ),
  ]
    .map((m) => m[1])
    .filter(
      (s) => !s.startsWith(".") && !s.startsWith("/") && !s.startsWith("node:"),
    )
    .map((s) =>
      s.startsWith("@") ? s.split("/").slice(0, 2).join("/") : s.split("/")[0],
    );

const missing = [];
for (const [pkgPath, files] of configs) {
  const pkg = require(`../${pkgPath}`);
  const declared = { ...pkg.dependencies, ...pkg.devDependencies };
  for (const spec of files.flatMap(specifiers))
    if (!declared[spec] && !exempt.has(spec)) missing.push(`${spec} in ${pkgPath}`);
}
if (missing.length)
  throw new Error(`undeclared build-config imports: ${missing.join(", ")}`);
