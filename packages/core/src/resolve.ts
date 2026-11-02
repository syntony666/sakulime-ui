/* shared attr resolver: features register attr → handler, resolve()
   fans out over a root, installResolver() arms one MutationObserver.
   Outside a DOM nothing installs */

type AttrResolver = (el: HTMLElement) => void;

const resolvers = new Map<string, AttrResolver>();

export const registerResolver = (attr: string, fn: AttrResolver) => {
  resolvers.set(attr, fn);
};

export const resolve = (root: ParentNode = document) => {
  for (const [attr, fn] of resolvers)
    root.querySelectorAll<HTMLElement>(`[${attr}]`).forEach(fn);
};

let observer: MutationObserver | undefined;

export const installResolver = () => {
  if (typeof document === "undefined" || observer) return;
  resolve(document);
  observer = new MutationObserver((records) => {
    for (const r of records) {
      if (r.type === "attributes") {
        const fn = r.attributeName ? resolvers.get(r.attributeName) : undefined;
        if (fn && r.target instanceof HTMLElement) fn(r.target);
        continue;
      }
      for (const node of r.addedNodes) {
        if (node instanceof HTMLElement) resolve(node.parentNode ?? node);
      }
    }
  });
  /* attributeFilter is fixed at install — later registrations resolve
     via resolve() passes but aren't observed */
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [...resolvers.keys()],
  });
};
