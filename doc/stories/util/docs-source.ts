// Shared docs.source transform for gallery stories — the shown code
// should read like real usage, not the render implementation:
//   1. strip anonymous wrapper divs (row/stage shells) — stop at any
//      element carrying an sl-* attribute, that's the real markup
//   2. strip demo-only elements — before the >< split inserts newlines
//   3. strip demo inline styles — they aren't part of the API
//   4. one element per line
const stripShells = (code: string): string => {
  let c = code.trim();
  while (/^<div(?![^>]*\s+sl-)[^>]*>/.test(c)) {
    c = c
      .replace(/^<div[^>]*>/, "")
      .replace(/<\/div>\s*$/, "")
      .trim();
  }
  return c
    .replace(/<span class="axis-sep"><\/span>/g, "")
    .replace(/></g, ">\n<");
};

export const showMarkup = (code: string): string =>
  stripShells(code).replace(/\s+style="[^"]*"/g, "");

// markup display — the demo's code panel runs the shown source through
// a tiny tokenizer instead of a full highlighter: sl-* attribute names
// get the accent color, quoted values get a pill, tag scaffold stays
// plain. Escaping happens per-token, so the output is safe for v-html.
const escHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const hlSpan = (cls: string, s: string): string =>
  `<span class="${cls}">${escHtml(s)}</span>`;

export const highlightMarkup = (code: string): string => {
  const src = showMarkup(code);
  let out = "";
  let inTag = false;
  let i = 0;
  while (i < src.length) {
    if (src[i] === "<") {
      const m = /^<\/?[\w-]+/.exec(src.slice(i));
      inTag = true;
      if (m) {
        const t = m[0];
        const slash = t[1] === "/" ? "/" : "";
        out += escHtml(`<${slash}`) + hlSpan("sl-hl-tag", t.slice(slash ? 2 : 1));
        i += t.length;
      } else {
        out += escHtml(src[i++]);
      }
      continue;
    }
    if (src[i] === ">") {
      inTag = false;
      out += escHtml(src[i++]);
      continue;
    }
    if (inTag) {
      const m = /^[\w-]+(?:="[^"]*")?/.exec(src.slice(i));
      if (m) {
        const t = m[0];
        const eq = t.indexOf("=");
        if (eq === -1) {
          out += hlSpan("sl-hl-attr", t);
        } else {
          out +=
            hlSpan("sl-hl-attr", t.slice(0, eq)) +
            '="' +
            hlSpan("sl-hl-val", t.slice(eq + 2, -1)) +
            '"';
        }
        i += t.length;
        continue;
      }
    }
    out += escHtml(src[i++]);
  }
  return out;
};
