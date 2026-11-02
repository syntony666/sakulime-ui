/* icon registry — icon("pack:name") returns an <svg sl-icon> string;
   packs are Iconify-format data brought by the consumer (registry
   starts empty). In a DOM, registerPack also arms the shared resolver
   so <i sl-icon="..."> placeholders fill in; outside a DOM nothing
   installs and icon() stays a pure lookup */

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

const warned = new Set<string>();
const warnOnce = (name: string, msg: string) => {
  if (warned.has(name)) return;
  warned.add(name);
  console.warn(msg);
};

/* "pack:name" splits at the first colon; without one the first dash
   separates, so dash syntax needs a single-word prefix */
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

/* TAG stores the resolved name so a later setAttribute with a
   different name re-fills; unresolved placeholders retry on later
   passes so a late registerPack still reaches them */
const TAG = "data-sl-resolved";

const fillIcon = (el: HTMLElement) => {
  if (el instanceof SVGElement) return;
  const name = el.getAttribute("sl-icon");
  if (!name) {
    el.setAttribute(TAG, "");
    return;
  }
  if (el.getAttribute(TAG) === name) return;
  const svg = icon(name);
  if (svg) {
    el.innerHTML = svg;
    el.setAttribute(TAG, name);
  }
};

registerResolver("sl-icon", fillIcon);

/* for hosts rendering into shadow roots — the observer can't see
   inside them, so the host resolves its own tree */
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
    // needed for the 2nd+ pack: installResolver() early-returns once
    // armed, and this pass fills placeholders waiting on this prefix
    resolve(document);
  }
};
