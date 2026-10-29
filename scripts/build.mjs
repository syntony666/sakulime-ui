import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { createRequire } from "node:module";
import { buildSync, transformSync } from "esbuild";

const req = createRequire(import.meta.url);
const pkgDir = (name) => dirname(req.resolve(`${name}/package.json`));
const read = (path) => readFileSync(path, "utf8").trim();
const join = (...parts) => parts.join("\n") + "\n";
const minify = (css) => transformSync(css, { loader: "css", minify: true }).code;
const out = (dir) => {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
};

const themeDir = pkgDir("@sakulime-ui/theme");
const layoutDir = pkgDir("@sakulime-ui/layout");
const coreDir = pkgDir("@sakulime-ui/core");

const tokens = read(req.resolve("@sakulime-ui/shared/vars.css"));
const themeFiles = readdirSync(themeDir).filter((f) => f.endsWith(".css"));
const layout = read(req.resolve("@sakulime-ui/layout/index.css"));

// @sakulime-ui/theme — one minified palette per file; bundle so each
// theme's @import of the shared derived layer inlines into dist
out(`${themeDir}/dist`);
for (const f of themeFiles) {
  const name = f.replace(".css", ".min.css");
  const result = buildSync({
    entryPoints: [`${themeDir}/${f}`],
    bundle: true,
    minify: true,
    write: false,
    outfile: name,
    logLevel: "silent",
  });
  writeFileSync(`${themeDir}/dist/${name}`, result.outputFiles[0].text);
}

// @sakulime-ui/layout — tokens + layout
out(`${layoutDir}/dist`);
writeFileSync(`${layoutDir}/dist/index.min.css`, minify(join(tokens, layout)));

// sakulime-ui — everything: core bundle already carries tokens, themes and
// components; the meta package only adds layout on top
out("dist");
const coreCss = read(`${coreDir}/dist/index.min.css`);
const layoutCss = read(`${layoutDir}/dist/index.min.css`);
writeFileSync("dist/sakulime.min.css", join(coreCss, layoutCss));
cpSync(`${coreDir}/dist/index.min.js`, "dist/sakulime.min.js");

console.log(`built: theme/${themeFiles.length} layout dist/`);
