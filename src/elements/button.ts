import { defineElement } from "./define";

export const SlButton = defineElement("sl-button", {
  wrap: "button",
  class: "sl-button",
  modifiers: {
    tone: "primary",
    size: "md",
    variant: { omit: "normal" },
  },
  states: ["invert"],
  forwardAttrs: {
    disabled: true,
    type: "button",
  },
});
