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

const parse = (name: string): [string, string] | null => {
  const m = name.match(/^([a-z0-9]+)[-:](.+)$/);
  return m ? [m[1], m[2]] : null;
};

const markup = (entry: IconifyBody, pack: IconifyPack) => {
  const w = entry.width ?? pack.width ?? 24;
  const h = entry.height ?? pack.height ?? 24;
  const x = entry.left ?? 0;
  const y = entry.top ?? 0;
  return `<svg sl-icon viewBox="${x} ${y} ${w} ${h}" aria-hidden="true">${entry.body}</svg>`;
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
  return markup(entry, pack);
};

export const packNames = () => [...packs.keys()];

export const iconNames = (prefix: string) =>
  Object.keys(packs.get(prefix)?.icons ?? {});

/* DOM resolver — fills <i sl-icon="si-github"> placeholders. Split on
   the first dash/colon so "si-x" and "si:x" both work. Elements keep
   their sl-icon value (it documents the icon); resolution is marked
   once via dataset so the observer doesn't loop. */
const TAG = "data-sl-resolved";
const resolveAll = (root: ParentNode) => {
  root.querySelectorAll<HTMLElement>(`[sl-icon]:not([${TAG}])`).forEach((el) => {
    const name = el.getAttribute("sl-icon");
    if (!name || el instanceof SVGElement) return;
    el.setAttribute(TAG, "");
    const svg = icon(name);
    if (svg) el.innerHTML = svg;
  });
};

let observer: MutationObserver | undefined;
const installResolver = () => {
  if (typeof document === "undefined" || observer) return;
  resolveAll(document);
  observer = new MutationObserver((records) => {
    for (const r of records) {
      for (const node of r.addedNodes) {
        if (node instanceof HTMLElement) resolveAll(node.parentNode ?? node);
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
    resolveAll(document);
  }
};
