import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr, boolArg, label, TONES, mark } from "../util/axis";

const marker = mark("sl-button");

type ButtonArgs = {
  label: string;
  tone: string;
  variant: string;
  size: string;
  radius: string;
  disabled: boolean;
};

const VARIANTS = ["-", "normal", "outline", "underline", "ghost"];
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
    disabled: boolArg("disabled", "停用（HTML 原生屬性）"),
    label: {
      description: "按鈕文字",
    },
  },
} satisfies Meta<ButtonArgs>;

export default meta;
type Demo = DemoObj<ButtonArgs>;


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

export const Variants: Demo = {
  render: () =>
    axis(VARIANTS, (v) => `<button ${marker(v)}>${label(v)}</button>`),
};
