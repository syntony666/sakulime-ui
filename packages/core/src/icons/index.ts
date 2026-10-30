/* icon() is a pure markup helper: packs register Iconify-format data
   ({ icons: { name: { body, width?, height? } }, width?, height? }),
   icon("pack:name") returns an <svg sl-icon> string. No icons ship in
   this package — the registry starts empty and consumers bring packs
   (@iconify-json/*, a fetch URL, or hand-written bodies).

   In a DOM, registering a pack also starts a resolver: elements like
   <i sl-icon="si-github"> get their svg filled in, plus a
   MutationObserver for later additions. Outside a DOM (SSG) the
   resolver never installs — icon() stays a pure lookup. */

type IconifyBody = {
  body: string;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
};

export type IconifyPack = {
  icons: Record<string, IconifyBody>;
  width?: number;
  height?: number;
};

const packs = new Map<string, IconifyPack>();

/* the first whitespace token is "pack:name" — anything after it is a
   modifier token the CSS layer reads (spin, circular, …). A colon
   splits at the first colon (multi-word pack names allowed); without
   one the first dash is the separator, so dash syntax only works for
   single-word prefixes */
const parse = (name: string): [string, string] | null => {
  const head = name.trim().split(/\s+/)[0];
  const c = head.indexOf(":");
  if (c > 0) return [head.slice(0, c), head.slice(c + 1)];
  const d = head.indexOf("-");
  return d > 0 ? [head.slice(0, d), head.slice(d + 1)] : null;
};

/* the emitted svg carries the full spec back as its value — it
   self-documents the source name and lets modifier tokens (spin etc.)
   reach the CSS the same way a hand-written placeholder would */
const markup = (entry: IconifyBody, pack: IconifyPack, spec: string) => {
  const w = entry.width ?? pack.width ?? 24;
  const h = entry.height ?? pack.height ?? 24;
  const x = entry.left ?? 0;
  const y = entry.top ?? 0;
  return `<svg sl-icon="${spec}" viewBox="${x} ${y} ${w} ${h}" aria-hidden="true">${entry.body}</svg>`;
};

export const icon = (name: string): string => {
  const p = parse(name);
  if (!p) {
    console.warn(`sl-icon: bad name "${name}" — expected "pack:name"`);
    return "";
  }
  const [prefix, id] = p;
  const pack = packs.get(prefix);
  const entry = pack?.icons[id];
  if (!entry) {
    console.warn(`sl-icon: unknown icon "${name}"${pack ? "" : ` — pack "${prefix}" not registered`}`);
    return "";
  }
  return markup(entry, pack, name);
};

export const packNames = () => [...packs.keys()];

export const iconNames = (prefix: string) =>
  Object.keys(packs.get(prefix)?.icons ?? {});

/* DOM resolver — fills <i sl-icon="si-github"> placeholders. Elements
   keep their sl-icon value (it documents the icon); resolution is
   marked once via dataset so the observer doesn't loop. */
const TAG = "data-sl-resolved";

/* exported for hosts that render into shadow roots — MutationObserver
   can't see inside them, so the host resolves its own tree (the docs
   Demo component does exactly this after each render) */
export const resolveIcons = (root: ParentNode = document) => {
  root.querySelectorAll<HTMLElement>(`[sl-icon]:not([${TAG}])`).forEach((el) => {
    const name = el.getAttribute("sl-icon");
    if (!name || el instanceof SVGElement) return;
    el.setAttribute(TAG, "");
    // name only — modifier tokens stay on the wrapper; if the filled
    // svg carried them too, transforms would apply twice
    const svg = icon(name.trim().split(/\s+/)[0]);
    if (svg) el.innerHTML = svg;
  });
};

let observer: MutationObserver | undefined;
const installResolver = () => {
  if (typeof document === "undefined" || observer) return;
  resolveIcons(document);
  observer = new MutationObserver((records) => {
    for (const r of records) {
      for (const node of r.addedNodes) {
        if (node instanceof HTMLElement) resolveIcons(node.parentNode ?? node);
      }
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
};

export const registerPack = async (
  prefix: string,
  source: IconifyPack | string,
): Promise<void> => {
  if (typeof source === "string") {
    source = (await (await fetch(source)).json()) as IconifyPack;
  }
  packs.set(prefix, source);
  if (typeof document !== "undefined") {
    installResolver();
    resolveIcons(document);
  }
};
