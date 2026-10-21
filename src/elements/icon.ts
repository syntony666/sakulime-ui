import { defineElement } from "./define";

const ICONS: Record<string, string> = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>',
  alert: '<path d="M12 3 2 21h20L12 3Z"/><path d="M12 10v4M12 17h.01"/>',
};

export const SlIcon = defineElement("sl-icon", {
  class: "sl-icon",
  modifiers: {
    size: { class: "sl-size", default: "md" },
    tone: { class: "sl-tone" },
  },
  watch: ["name"],
  render(el) {
    const name = el.getAttribute("name") ?? "";
    const body = ICONS[name];
    el.innerHTML = body
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`
      : "";
    if (!body && name) console.warn(`sl-icon: unknown icon "${name}"`);
  },
});
