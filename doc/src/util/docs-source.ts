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
