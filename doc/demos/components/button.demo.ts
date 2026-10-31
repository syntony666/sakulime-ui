import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr, label, TONES, mark } from "../util/axis";

const marker = mark("sl-button");

type ButtonArgs = {
  label: string;
  tone: string;
  variant: string;
  size: string;
  radius: string;
  disabled: boolean;
};

const VARIANTS = ["-", "normal", "invert", "underline", "ghost"];
const SIZES = ["-", "sm", "md", "lg"];
const RADII = ["-", "none", "sm", "md", "lg", "full"];

const meta = {
  args: {
    label: "Button",
    tone: "-",
    variant: "-",
    size: "-",
    radius: "-",
    disabled: false,
  },
  argTypes: {
    tone: axisArg("sl-tone", "顏色", TONES),
    variant: axisArg("sl-button", "型態", VARIANTS),
    size: axisArg("sl-size", "大小", SIZES),
    radius: axisArg("sl-radius", "圓角", RADII),
    disabled: {
      description: "停用（HTML 原生屬性）",
      control: "boolean",
    },
    label: {
      description: "按鈕文字",
    },
  },
} satisfies Meta<ButtonArgs>;

export default meta;
type Demo = DemoObj<ButtonArgs>;


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
