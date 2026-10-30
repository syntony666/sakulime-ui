/* icon() is a pure markup helper: packs register Iconify-format data
   ({ icons: { name: { body, width?, height? } }, width?, height? }),
   icon("pack:name") returns an <svg sl-icon> string. No icons ship in
   this package — the registry starts empty and consumers bring packs
   (@iconify-json/*, a fetch URL, or hand-written bodies).

   In a DOM, registering a pack also starts a resolver: elements like
   <i sl-icon="si-github"> get their svg filled in, plus a
   MutationObserver for later additions. Outside a DOM (SSG) the
   resolver never installs — icon() stays a pure lookup. */

import { installResolver, registerResolver, resolve } from "../resolve";

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

/* warn once per unique name — failed placeholders stay un-resolved and
   retry on later passes, so repeated lookups must not spam */
const warned = new Set<string>();
const warnOnce = (name: string, msg: string) => {
  if (warned.has(name)) return;
  warned.add(name);
  console.warn(msg);
};

/* "pack:name" — a colon splits at the first colon (multi-word pack
   names allowed); without one the first dash is the separator, so
   dash syntax only works for single-word prefixes */
const parse = (name: string): [string, string] | null => {
  const c = name.indexOf(":");
  if (c > 0) return [name.slice(0, c), name.slice(c + 1)];
  const d = name.indexOf("-");
  return d > 0 ? [name.slice(0, d), name.slice(d + 1)] : null;
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
    warnOnce(name, `sl-icon: bad name "${name}" — expected "pack:name"`);
    return "";
  }
  const [prefix, id] = p;
  const pack = packs.get(prefix);
  const entry = pack?.icons[id];
  if (!entry) {
    warnOnce(name, `sl-icon: unknown icon "${name}"${pack ? "" : ` — pack "${prefix}" not registered`}`);
    return "";
  }
  return markup(entry, pack);
};

export const packNames = () => [...packs.keys()];

export const iconNames = (prefix: string) =>
  Object.keys(packs.get(prefix)?.icons ?? {});

/* DOM resolver — fills <i sl-icon="si-github"> placeholders through the
   shared resolver layer. TAG marks a successful fill only: placeholders
   whose pack isn't registered yet stay open and retry on later passes,
   so a late registerPack still reaches them. */
const TAG = "data-sl-resolved";

const fillIcon = (el: HTMLElement) => {
  if (el instanceof SVGElement || el.hasAttribute(TAG)) return;
  const name = el.getAttribute("sl-icon");
  if (!name) {
    el.setAttribute(TAG, "");
    return;
  }
  const svg = icon(name);
  if (svg) {
    el.innerHTML = svg;
    el.setAttribute(TAG, "");
  }
};

registerResolver("sl-icon", fillIcon);

/* exported for hosts that render into shadow roots — MutationObserver
   can't see inside them, so the host resolves its own tree (the docs
   Demo component does exactly this after each render) */
export const resolveIcons = (root: ParentNode = document) => {
  root.querySelectorAll<HTMLElement>("[sl-icon]").forEach(fillIcon);
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
    // not redundant for the 2nd+ pack: installResolver() early-returns
    // once armed, and this pass fills placeholders that were waiting on
    // exactly this prefix
    resolve(document);
  }
};
