type ModSpec = string | { default?: string; omit?: string };

export interface ElementConfig {
  /** Wrap children in a real inner element (e.g. "button") */
  inner?: string;
  /** Base class, e.g. "sl-button" */
  base: string;
  /** attr → `.{base}--{value}`. Value: string = default, or { default, omit } */
  mods?: Record<string, ModSpec>;
  /** Boolean attrs → `.is-{attr}` */
  flags?: string[];
  /** Attrs forwarded to the inner element. Value: string = default when absent */
  forward?: Record<string, string | true>;
  /** Extra attrs to observe (re-sync on change, no class mapping) */
  observe?: string[];
  /** Extra render hook, runs after class/attr sync */
  render?: (el: HTMLElement) => void;
}

export function defineElement(
  name: string,
  config: ElementConfig,
): CustomElementConstructor {
  const mods = config.mods ?? {};
  const flags = config.flags ?? [];
  const forward = config.forward ?? {};
  const observed = [
    ...Object.keys(mods),
    ...flags,
    ...Object.keys(forward),
    ...(config.observe ?? []),
  ];

  class SlElement extends HTMLElement {
    static observedAttributes = observed;

    private innerEl: HTMLElement | null = null;

    connectedCallback(): void {
      if (config.inner && !this.innerEl) {
        const inner = document.createElement(config.inner);
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
      if (config.inner && !this.innerEl) return;
      const target = this.innerEl ?? this;

      const classes = [config.base];
      for (const [attr, spec] of Object.entries(mods)) {
        const s = typeof spec === "string" ? { default: spec } : spec;
        const value = this.getAttribute(attr) ?? s.default;
        if (value && value !== s.omit) classes.push(`${config.base}--${value}`);
      }
      for (const flag of flags) {
        if (this.hasAttribute(flag)) classes.push(`is-${flag}`);
      }

      if (this.innerEl) {
        target.className = classes.join(" ");
        for (const [attr, spec] of Object.entries(forward)) {
          const value = this.getAttribute(attr) ?? (spec === true ? null : spec);
          if (value === null) this.innerEl.removeAttribute(attr);
          else this.innerEl.setAttribute(attr, value);
        }
      } else {
        const own = this.className
          .split(" ")
          .filter(
            (c) => c && c !== config.base && !c.startsWith(`${config.base}--`) && !c.startsWith("is-"),
          );
        this.className = [...own, ...classes].join(" ");
      }

      config.render?.(this);
    }
  }

  if (!customElements.get(name)) customElements.define(name, SlElement);
  return SlElement;
}
