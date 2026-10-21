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
  const modifiers = config.modifiers ?? {};
  const states = config.states ?? [];
  const forwardAttrs = config.forwardAttrs ?? {};
  const namespaces = new Set([config.class]);
  for (const spec of Object.values(modifiers)) {
    if (typeof spec === "object" && spec.class) namespaces.add(spec.class);
  }
  const observed = [
    ...Object.keys(modifiers),
    ...states,
    ...Object.keys(forwardAttrs),
    ...(config.watch ?? []),
  ];

  class SlElement extends HTMLElement {
    static observedAttributes = observed;

    private innerEl: HTMLElement | null = null;

    connectedCallback(): void {
      if (config.wrap && !this.innerEl) {
        const inner = document.createElement(config.wrap);
        while (this.firstChild) inner.appendChild(this.firstChild);
        this.appendChild(inner);
        this.innerEl = inner;
      }
      this.sync();
    }

    attributeChangedCallback(): void {
      this.sync();
    }

    private sync(): void {
      if (config.wrap && !this.innerEl) return;
      const target = this.innerEl ?? this;

      const classes = [config.class];
      for (const [attr, spec] of Object.entries(modifiers)) {
        const s = typeof spec === "string" ? { default: spec } : spec;
        const value = this.getAttribute(attr) ?? s.default;
        if (value && value !== s.omit) classes.push(`${s.class ?? config.class}--${value}`);
      }
      for (const state of states) {
        if (this.hasAttribute(state)) classes.push(`is-${state}`);
      }

      if (this.innerEl) {
        target.className = classes.join(" ");
        for (const [attr, spec] of Object.entries(forwardAttrs)) {
          const value = this.getAttribute(attr) ?? (spec === true ? null : spec);
          if (value === null) this.innerEl.removeAttribute(attr);
          else this.innerEl.setAttribute(attr, value);
        }
      } else {
        const own = this.className
          .split(" ")
          .filter(
            (c) =>
              c &&
              c !== config.class &&
              ![...namespaces].some((ns) => c.startsWith(`${ns}--`)) &&
              !c.startsWith("is-"),
          );
        this.className = [...own, ...classes].join(" ");
      }

      config.render?.(this);
    }
  }

  if (!customElements.get(name)) customElements.define(name, SlElement);
  return SlElement;
}
