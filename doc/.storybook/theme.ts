import { create } from "storybook/theming/create";
import sl from "./theme.values";

// Chrome stays neutral; the brand palette shows through the canvas
// (vars.css), selected states and accents — tinting every chrome
// surface with product colors is what made it look washed out.
export default create({
  base: "light",

  // Typography
  fontBase: "Inter, ui-sans-serif, system-ui, sans-serif",
  fontCode: "ui-monospace, SFMono-Regular, Menlo, monospace",

  // Brand
  brandTitle: "Sakulime UI",
  brandUrl: "./",
  brandTarget: "_self",

  // brand accents — selected states, docs links, derived light tints
  colorPrimary: sl.primary,
  colorSecondary: sl.secondary,

  // chrome surfaces — all palette-driven, no raw white
  appBg: sl.surface,
  appContentBg: sl.surface,
  appPreviewBg: sl.surface,
  appHoverBg: sl["primary-bg"],
  appBorderColor: sl.border,
  appBorderRadius: 7,

  // --sl-text / --sl-text-invert / --sl-text-muted
  textColor: sl.text,
  textInverseColor: sl["text-invert"],
  textMutedColor: sl["text-muted"],

  // toolbar — surface bar, dark selected, orange hover accent
  barBg: sl.surface,
  barTextColor: sl["text-muted"],
  barSelectedColor: sl["text-strong"],
  barHoverColor: sl.secondary,

  // controls
  buttonBg: sl.surface,
  buttonBorder: sl.border,
  booleanBg: sl["primary-bg"],
  booleanSelectedBg: sl.primary,

  // form
  inputBg: sl.surface,
  inputBorder: sl.border,
  inputTextColor: sl.text,
  inputBorderRadius: 4,
});
