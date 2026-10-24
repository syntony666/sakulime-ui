import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { transformSync } from "esbuild";

const read = (path) => readFileSync(path, "utf8").trim();
const join = (...parts) => parts.join("\n") + "\n";
const minify = (css) => transformSync(css, { loader: "css", minify: true }).code;
const out = (dir) => {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
};

const tokens = read("packages/shared/vars.css");
const themeFiles = readdirSync("packages/shared/theme").filter((f) => f.endsWith(".css"));
const layout = read("packages/layout/src/layout.css");

// @sakulime-ui/theme — one minified palette per file
out("packages/shared/theme/dist");
for (const f of themeFiles) {
  const name = f.replace(".css", ".min.css");
  writeFileSync(`packages/shared/theme/dist/${name}`, minify(read(`packages/shared/theme/${f}`)));
}

// @sakulime-ui/layout — tokens + layout
out("packages/layout/dist");
writeFileSync("packages/layout/dist/index.min.css", minify(join(tokens, layout)));

// sakulime-ui — everything: core bundle already carries tokens, themes and
// components; the meta package only adds layout on top
out("dist");
const coreCss = read("packages/core/dist/index.min.css");
const layoutCss = read("packages/layout/dist/index.min.css");
writeFileSync("dist/sakulime.min.css", join(coreCss, layoutCss));
cpSync("packages/core/dist/index.min.js", "dist/sakulime.min.js");

console.log(`built: theme/${themeFiles.length} layout dist/`);
