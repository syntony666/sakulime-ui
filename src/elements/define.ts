type ModifierSpec = string | { class?: string; default?: string; omit?: string };

export interface ElementConfig {
  /** Tag to wrap children in (e.g. "button"); omit to render into the host */
  wrap?: string;
  /** Base class name, e.g. "sl-button" */
  class: string;
  /**
   * attr → `.{namespace}--{value}` class.
   * Value: string = default, or { class, default, omit }.
   * `class` overrides the namespace (generic modifiers like "sl-tone");
   * omit it to use config.class.
   */
  modifiers?: Record<string, ModifierSpec>;
  /** Boolean attrs → `.is-{attr}` */
  states?: string[];
  /** Attrs forwarded to the wrapped element. Value: string = default when absent */
  forwardAttrs?: Record<string, string | true>;
  /** Extra attrs to observe (re-sync on change, no class mapping) */
  watch?: string[];
  /** Render hook, runs after class/attr sync */
  render?: (el: HTMLElement) => void;
}

export function defineElement(
  name: string,
  config: ElementConfig,
): CustomElementConstructor {
  const modifiers = Object.entries(config.modifiers ?? {}).map(([attr, spec]) => {
    const s: { class?: string; default?: string; omit?: string } =
      typeof spec === "string" ? { default: spec } : spec;
    return {
      attr,
      namespace: s.class ?? config.class,
      default: s.default,
      omit: s.omit,
    };
  });
  const states = config.states ?? [];
  const forwards = Object.entries(config.forwardAttrs ?? {}).map(
    ([attr, spec]) => ({ attr, default: spec === true ? null : spec }),
  );
  const namespaces = new Set(modifiers.map((m) => m.namespace));

  const isManagedClass = (cls: string): boolean =>
    cls === config.class ||
    cls.startsWith("is-") ||
    [...namespaces].some((ns) => cls.startsWith(`${ns}--`));

  class SlElement extends HTMLElement {
    static observedAttributes = [
      ...modifiers.map((m) => m.attr),
      ...states,
      ...forwards.map((f) => f.attr),
      ...(config.watch ?? []),
    ];

    private innerEl: HTMLElement | null = null;

    connectedCallback(): void {
      this.wrapChildren();
      this.sync();
    }

    attributeChangedCallback(): void {
      this.sync();
    }

    private wrapChildren(): void {
      if (!config.wrap || this.innerEl) return;
      const inner = document.createElement(config.wrap);
      while (this.firstChild) inner.appendChild(this.firstChild);
      this.appendChild(inner);
      this.innerEl = inner;
    }

    private sync(): void {
      if (config.wrap && !this.innerEl) return;
      this.syncClasses();
      this.syncAttrs();
      config.render?.(this);
    }

    private syncClasses(): void {
      const classes = [config.class];
      for (const mod of modifiers) {
        const value = this.getAttribute(mod.attr) ?? mod.default;
        if (value && value !== mod.omit) {
          classes.push(`${mod.namespace}--${value}`);
        }
      }
      for (const state of states) {
        if (this.hasAttribute(state)) classes.push(`is-${state}`);
      }

      if (this.innerEl) {
        this.innerEl.className = classes.join(" ");
        return;
      }
      const own = this.className
        .split(" ")
        .filter((c) => c && !isManagedClass(c));
      this.className = [...own, ...classes].join(" ");
    }

    private syncAttrs(): void {
      if (!this.innerEl) return;
      for (const fwd of forwards) {
        const value = this.getAttribute(fwd.attr) ?? fwd.default;
        if (value === null) this.innerEl.removeAttribute(fwd.attr);
        else this.innerEl.setAttribute(fwd.attr, value);
      }
    }
  }

  if (!customElements.get(name)) customElements.define(name, SlElement);
  return SlElement;
}
