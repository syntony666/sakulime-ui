/* docs.source transform — shown code should read like real usage, not
   the render implementation: drop wrapper divs, data-demo chrome,
   demo-* classes and mechanism-only inline styles */
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

const KEEP_DECL =
  /^--|^font-size$|^list-style$|^(?:(?:min|max)-)?(?:width|height|inline-size|block-size)$/;

const filterStyle = (decls: string): string =>
  decls
    .split(";")
    .map((d) => d.trim())
    .filter((d) => KEEP_DECL.test(d.slice(0, d.indexOf(":")).trim()))
    .join("; ");

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

const DATA_DEMO = /\sdata-demo(?:[\s=/>]|$)/;

type El = { tag: string; open: string; kids: (El | string)[]; leaf: boolean };

// context a flat regex can't see (data-demo subtrees, single-child
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
    stack[stack.length - 1].kids.push(t);
  }

  const emit = (el: El): string => {
    if (DATA_DEMO.test(el.open)) return "";
    const open = cleanTag(el.open);
    if (el.leaf) return open;
    const inner = el.kids.map((k) => (typeof k === "string" ? k : emit(k))).join("");
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
      lines.push("  ".repeat(stack.length) + t);
      continue;
    }
    const top = stack[stack.length - 1];
    if (top?.line === lines.length - 1) lines[top.line] += t;
    else if (lines.length) lines[lines.length - 1] += " " + t;
    else lines.push(t);
  }
  return lines.join("\n");
};

export const showMarkup = (code: string): string =>
  indentMarkup(fold(stripShells(code)));

const escHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

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
