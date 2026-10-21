import { defineElement } from "./define";

export const SlButton = defineElement("sl-button", {
  inner: "button",
  base: "sl-button",
  mods: {
    tone: "primary",
    size: "md",
    variant: { omit: "normal" },
  },
  flags: ["invert"],
  forward: {
    disabled: true,
    type: "button",
  },
});
