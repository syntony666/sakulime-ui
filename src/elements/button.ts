import { defineElement } from "./define";

export const SlButton = defineElement("sl-button", {
  wrap: "button",
  class: "sl-button",
  modifiers: {
    tone: { class: "sl-tone", default: "primary" },
    size: { class: "sl-size", default: "md" },
    variant: { class: "sl-variant", omit: "normal" },
  },
  states: ["invert"],
  forwardAttrs: {
    disabled: true,
    type: "button",
  },
});
