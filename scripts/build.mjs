import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join as pjoin } from "node:path";
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
/* read the source file, not the ./index.css export — that subpath now
   resolves to the dist artifact this script produces. src/layout.css
   is an @import index over per-primitive files; inline them here so
   the published bundle stays a single concatenated sheet */
const bundle = (path) => {
  const css = read(path).replace(
    /* accept url(), either quote style, and trailing modifiers like
       layer() — a missed @import would survive into dist pointing at
       a path that doesn't exist there, so fail loudly instead */
    /@import\s+(?:url\(\s*)?["']?([^"')\s]+)["']?\s*\)?[^;]*;/g,
    (_, rel) => bundle(pjoin(dirname(path), rel))
  );
  if (/@import/.test(css)) {
    throw new Error(`uninlined @import left in ${path}`);
  }
  return css;
};
const layout = bundle(`${layoutDir}/src/layout.css`);

/* media queries can't read vars — layout.css hardcodes the container
   breakpoints as literals; fail the build if the twins drift */
const declared = new Set(
  [...tokens.matchAll(/--sl-container-(?:sm|md|lg):\s*([^;]+);/g)].map((m) => m[1].trim())
);
const literals = new Set(
  /* range syntax (width < 60rem) and classic (max-width: 60rem) both
     count — and px literals get caught as strays, not silently
     skipped, so the container scale stays the only breakpoint unit */
  [
    ...layout.matchAll(
      /\(\s*(?:min-|max-)?width\s*(?::|[<>]=?)\s*([0-9.]+(?:rem|px))\s*\)/g
    ),
  ].map((m) => m[1])
);
const missing = [...declared].filter((v) => !literals.has(v));
const stray = [...literals].filter((v) => !declared.has(v));
if (missing.length || stray.length) {
  throw new Error(
    `breakpoint drift: vars.css declares ${[...declared].join(", ")}; ` +
      `layout.css media literals found ${[...literals].join(", ")}` +
      (missing.length ? ` — missing ${missing.join(", ")}` : "") +
      (stray.length ? ` — unexpected ${stray.join(", ")}` : "")
  );
}

/* generic.css maps each generic slot to the components allowed to read
   it via :--sl-generic-* custom selectors; the lists and the actual slot
   reads in component css must agree — a listed component that never
   reads the slot is as wrong as a reader that is not listed */
const SLOTS = {
  tone: /--sl-tone-(bg|text(-invert)?)(?=\s*[:),])/,
  size: /--sl-size-(fs|h|px)(?=\s*[:),])/,
  radius: /--sl-radius(?=\s*[:),])/,
  pad: /--sl-pad(?=\s*[:),])/,
};
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");
const generic = strip(read(`${coreDir}/src/css/generic.css`));
const consumers = {};
for (const m of generic.matchAll(
  /@custom-selector\s+:--sl-generic-(\w+)\s+([^;]+);/g
)) {
  consumers[m[1]] = new Set([...m[2].matchAll(/sl-[a-z]+/g)].map((x) => x[0]));
}
/* a selector's component marks are the sl-<name> heads of its attrs —
   [sl-card--section] and [sl-card-indicate] both count as sl-card */
const rules = [];
for (const f of readdirSync(`${coreDir}/src/css`)) {
  if (!f.endsWith(".css") || f === "generic.css") continue;
  for (const m of strip(read(`${coreDir}/src/css/${f}`)).matchAll(
    /([^{}]+)\{([^{}]*)\}/g
  )) {
    rules.push({
      f,
      sel: m[1].trim().replace(/\s+/g, " "),
      body: m[2],
      marks: new Set([...m[1].matchAll(/\[(sl-[a-z]+)/g)].map((x) => x[1])),
    });
  }
}
const drift = [];
for (const attr of [...Object.keys(SLOTS), "interactive"]) {
  if (!consumers[attr]) {
    drift.push(`${attr}: :--sl-generic-${attr} list missing`);
  }
}
for (const [attr, pat] of Object.entries(SLOTS)) {
  for (const x of consumers[attr] ?? []) {
    if (!rules.some((r) => r.marks.has(x) && pat.test(r.body))) {
      drift.push(`${attr}: ${x} listed but no rule reads the slot`);
    }
  }
}
for (const r of rules) {
  for (const [attr, pat] of Object.entries(SLOTS)) {
    if (
      pat.test(r.body) &&
      ![...r.marks].some((x) => consumers[attr]?.has(x))
    ) {
      drift.push(`${attr}: ${r.f} "${r.sel}" reads the slot but is not listed`);
    }
  }
  if (
    r.marks.has("sl-interactive") &&
    ![...r.marks].some(
      (x) => x !== "sl-interactive" && consumers.interactive?.has(x)
    )
  ) {
    drift.push(
      `interactive: ${r.f} "${r.sel}" uses sl-interactive but is not listed`
    );
  }
}
for (const [attr, list] of Object.entries(consumers)) {
  for (const x of list) {
    if (!rules.some((r) => r.marks.has(x))) {
      drift.push(`${attr}: ${x} listed but [${x}] appears in no component css`);
    }
  }
}
if (drift.length) {
  throw new Error(`generic drift:\n  - ${drift.join("\n  - ")}`);
}

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
// the shared derivation layer ships too — custom themes @import it and
// author only seeds + color-scheme
cpSync(`${themeDir}/_internal/derived.css`, `${themeDir}/dist/derived.css`);

// @sakulime-ui/layout — tokens + layout
out(`${layoutDir}/dist`);
writeFileSync(`${layoutDir}/dist/index.min.css`, minify(join(tokens, layout)));

// sakulime-ui — everything: core bundle already carries tokens, themes and
// components; the meta package only adds layout on top. Layout's own
// published css still prepends tokens above — here the bare layout
// joins so the vars block lands once, not twice
out("dist");
const coreCss = read(`${coreDir}/dist/index.min.css`);
writeFileSync("dist/sakulime.min.css", join(coreCss, minify(layout)));
cpSync(`${coreDir}/dist/index.min.js`, "dist/sakulime.min.js");

console.log(`built: theme/${themeFiles.length} layout dist/`);
