// Shared docs.source transform for gallery demos — the shown code
// should read like real usage, not the render implementation:
//   1. strip anonymous wrapper divs (row/stage shells) — stop at any
//      element carrying an sl-* attribute, that's the real markup
//   2. drop demo-only elements (data-demo) — demo chrome never reaches
//      the shown code, its children go with it
//   3. strip demo-* classes — they aren't part of the API
//   4. filter inline styles — declarations that carry the mechanism
//      stay, layout furniture goes
//   5. collapse anonymous divs around a single element — caption
//      frames and spacer divs fold to the markup inside
//   6. one element per line, indented by nesting depth
const stripShells = (code: string): string => {
  let c = code.trim();
  while (/^<div(?![^>]*\s+sl-)(?![^>]*\sdata-demo[\s=>])[^>]*>/.test(c)) {
    /* strip the pair only when the trailing </div> really closes the
       leading <div> — sibling divs aren't a shell and must survive */
    const divs = c.match(/<\/?div[^>]*>/g) ?? [];
    let depth = 0;
    let closesAt = -1;
    for (let i = 0; i < divs.length; i++) {
      depth += divs[i].startsWith("</") ? -1 : 1;
      if (depth === 0) {
        closesAt = i;
        break;
      }
    }
    if (closesAt !== divs.length - 1 || !/<\/div>\s*$/.test(c)) break;
    c = c
      .replace(/^<div[^>]*>/, "")
      .replace(/<\/div>\s*$/, "")
      .trim();
  }
  return c;
};

const VOID = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

/* style declarations that carry the mechanism stay in shown code:
   --* custom props are the var API (--sl-grid-min is grid's public
   knob), font-size is the em context chip/dot/icon track, box
   dimensions are the room placement marks push against, list-style
   decides whether a list renders bullets. Position overrides,
   margins, padding and text-align are stage furniture — they strip */
const KEEP_DECL =
  /^--|^font-size$|^list-style$|^(?:(?:min|max)-)?(?:width|height|inline-size|block-size)$/;

const filterStyle = (decls: string): string =>
  decls
    .split(";")
    .map((d) => d.trim())
    .filter((d) => KEEP_DECL.test(d.slice(0, d.indexOf(":")).trim()))
    .join("; ");

// attr-level cleanup on a single tag — demo-* classes go, the style
// filter keeps load-bearing declarations only, and removal residue
// collapses back to single spaces so `<div  sl-grid--span>` doesn't leak
const cleanTag = (open: string): string =>
  open
    .replace(/\s+class="([^"]*)"/g, (_, list: string) => {
      const kept = list.split(/\s+/).filter((c) => c && !c.startsWith("demo-"));
      return kept.length ? ` class="${kept.join(" ")}"` : "";
    })
    .replace(/\s+style="([^"]*)"/g, (_, decls: string) => {
      const kept = filterStyle(decls);
      return kept ? ` style="${kept}"` : "";
    })
    .replace(/\s{2,}/g, " ")
    .replace(/\s+(\/?>)$/, "$1");

// demo-only elements carry data-demo — the whole subtree drops
const DATA_DEMO = /\sdata-demo(?:[\s=/>]|$)/;

type El = { tag: string; open: string; kids: (El | string)[]; leaf: boolean };

// shallow tree fold — the transforms above all need parent/child
// context a flat regex can't see (data-demo subtrees, single-child
// wrappers). Mismatched closes fall through as text so a malformed
// demo can't take the transform down with it
const fold = (code: string): string => {
  const toks = code.match(/<[^>]*>|[^<]+/g) ?? [];
  const root: El = { tag: "", open: "", kids: [], leaf: true };
  const stack: El[] = [root];
  for (const t of toks) {
    const close = /^<\/([a-z][\w-]*)>$/i.exec(t)?.[1];
    if (close) {
      if (stack[stack.length - 1].tag === close) stack.pop();
      else stack[stack.length - 1].kids.push(t);
      continue;
    }
    const open = /^<([a-z][\w-]*)/i.exec(t)?.[1];
    if (open) {
      const leaf = /\/>$/.test(t) || VOID.has(open.toLowerCase());
      const el: El = { tag: open, open: t, kids: [], leaf };
      stack[stack.length - 1].kids.push(el);
      if (!leaf) stack.push(el);
      continue;
    }
    // text run or comment — kept verbatim, the indenter folds it
    stack[stack.length - 1].kids.push(t);
  }

  const emit = (el: El): string => {
    if (DATA_DEMO.test(el.open)) return "";
    const open = cleanTag(el.open);
    if (el.leaf) return open;
    const inner = el.kids.map((k) => (typeof k === "string" ? k : emit(k))).join("");
    /* an anonymous div wrapping exactly one element was furniture —
       unwraps repeat outward until something real stops them; wrappers
       carrying text or several children group real content */
    const sig = el.kids.filter(
      (k) =>
        (typeof k === "string" && k.trim()) ||
        (typeof k !== "string" && !DATA_DEMO.test(k.open)),
    );
    if (el.tag === "div" && open === "<div>" && sig.length === 1 && typeof sig[0] !== "string") {
      return inner;
    }
    return `${open}${inner}</${el.tag}>`;
  };
  return root.kids.map((k) => (typeof k === "string" ? k : emit(k))).join("");
};

// indent by nesting depth — tag and text tokens are split cleanly, so
// `<i></i> 14px` keeps its close tag on the same line and `<x>text</x>`
// folds into one line when nothing was pushed between open and close
const indentMarkup = (code: string): string => {
  const toks = (code.match(/<[^>]*>|[^<]+/g) ?? [])
    .map((s) => s.trim())
    .filter(Boolean);
  const lines: string[] = [];
  const stack: { tag: string; line: number }[] = [];
  for (const t of toks) {
    const open = /^<([\w-]+)/.exec(t)?.[1];
    const close = /^<\/([\w-]+)>$/.exec(t)?.[1];
    if (close) {
      const top = stack[stack.length - 1];
      if (top?.tag === close) {
        stack.pop();
        if (top.line === lines.length - 1) {
          lines[top.line] += t;
          continue;
        }
      }
      lines.push("  ".repeat(stack.length) + t);
      continue;
    }
    if (open && !/\/>$/.test(t) && !VOID.has(open)) {
      lines.push("  ".repeat(stack.length) + t);
      stack.push({ tag: open, line: lines.length - 1 });
      continue;
    }
    if (open) {
      // void / self-closing tag — own line, nothing to close
      lines.push("  ".repeat(stack.length) + t);
      continue;
    }
    // text run — content glues onto the open element's line; text after
    // a folded element trails that line with a space
    const top = stack[stack.length - 1];
    if (top?.line === lines.length - 1) lines[top.line] += t;
    else if (lines.length) lines[lines.length - 1] += " " + t;
    else lines.push(t);
  }
  return lines.join("\n");
};

export const showMarkup = (code: string): string =>
  indentMarkup(fold(stripShells(code)));

// markup display — the demo's code panel runs the shown source through
// a tiny tokenizer instead of a full highlighter: sl-* attribute names
// get the accent color, quoted values get a pill, tag scaffold stays
// plain. Escaping happens per-token, so the output is safe for v-html.
// input is already-normalized markup (showMarkup's output)
const escHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const hlSpan = (cls: string, s: string): string =>
  `<span class="${cls}">${escHtml(s)}</span>`;

export const highlightMarkup = (src: string): string => {
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
