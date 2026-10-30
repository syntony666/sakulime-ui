/* Shared attr resolver: features register an attr → handler, resolve()
   fans out over a root, and installResolver() arms a single
   MutationObserver for later additions and attribute changes. Features
   call installResolver() at whatever point makes sense for them (icons
   wait for registerPack since resolution is data-driven; self-contained
   enhancements can install at import). Outside a DOM nothing installs. */

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
  /* attributeFilter is computed at install time — resolvers registered
     later still resolve via resolve() passes but aren't observed */
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [...resolvers.keys()],
  });
};
