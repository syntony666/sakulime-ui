import type { Meta, DemoObj } from "../util/types";
import { showMarkup } from "../util/docs-source";
import { axis, axisArg, attr, label } from "../util/axis";

type ButtonArgs = {
  label: string;
  tone: string;
  variant: string;
  size: string;
  radius: string;
  disabled: boolean;
};

const TONES = ["-", "primary", "secondary", "success", "warning", "danger"];
const VARIANTS = ["-", "normal", "invert", "underline", "ghost"];
const SIZES = ["-", "sm", "md", "lg"];
const RADII = ["-", "none", "sm", "md", "lg", "full"];

const meta = {
  title: "Core/Button 按鈕",
  // demos feed the md page; hide them from the sidebar
  tags: ["!dev"],
  parameters: {
    docs: {
      // opt back into the TOC (disabled globally for prose pages)
      toc: { disable: false },
      source: {
        // evaluated markup, not the .map() render source
        type: "dynamic",
        transform: showMarkup,
      },
    },
  },
  args: {
    label: "Button",
    tone: "-",
    variant: "-",
    size: "-",
    radius: "-",
    disabled: false,
  },
  argTypes: {
    tone: axisArg("sl-tone", "顏色", "primary", TONES),
    variant: axisArg("sl-button", "型態", "normal", VARIANTS),
    size: axisArg("sl-size", "大小", "md", SIZES),
    radius: axisArg("sl-radius", "圓角", "md", RADII),
    disabled: {
      description: "停用標記（使用 HTML 原生標籤）",
      table: { type: {}, defaultValue: { summary: "false" } },
      control: "boolean",
    },
    label: {
      description: "按鈕文字",
      table: { type: {}, defaultValue: { summary: '"Button"' } },
    },
  },
} satisfies Meta<ButtonArgs>;

export default meta;
type Demo = DemoObj<ButtonArgs>;

// the marker itself carries the variant value — bare = normal
const marker = (v: string) => (v === "-" ? "sl-button" : `sl-button="${v}"`);

// one button per axis value; a fixed variant rides the marker when given
const btn =
  (name: string, variant = "") =>
  (v: string) =>
    `<button ${variant ? `sl-button="${variant}"` : "sl-button"}${attr(name, v)}>${label(v)}</button>`;

function slAttrs({
  tone,
  variant,
  size,
  radius,
  disabled,
}: ButtonArgs): string {
  return (
    marker(variant) +
    attr("sl-tone", tone) +
    attr("sl-size", size) +
    attr("sl-radius", radius) +
    (disabled ? " disabled" : "")
  );
}

export const Button: Demo = {
  render: (args) => `<button ${slAttrs(args)}>${args.label}</button>`,
};

export const Tones: Demo = {
  render: () => axis(TONES, btn("sl-tone")),
};

export const TonesInvert: Demo = {
  render: () => axis(TONES, btn("sl-tone", "invert")),
};

export const Variants: Demo = {
  render: () =>
    axis(VARIANTS, (v) => `<button ${marker(v)}>${label(v)}</button>`),
};

export const Sizes: Demo = {
  render: () => axis(SIZES, btn("sl-size")),
};

export const Radius: Demo = {
  render: () => axis(RADII, btn("sl-radius")),
};
