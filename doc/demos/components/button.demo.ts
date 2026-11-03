import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr, boolArg, label, TONES, mark } from "../util/axis";

const marker = mark("sl-button");

type ButtonArgs = {
  label: string;
  tone: string;
  variant: string;
  size: string;
  radius: string;
  interactive: string;
  disabled: boolean;
};

const VARIANTS = ["-", "normal", "outline", "underline", "ghost"];
const SIZES = ["-", "sm", "md", "lg"];
const RADII = ["-", "none", "sm", "md", "lg", "full"];
const INTERACTIVES = ["-", "grow", "lift", "shadow", "press", "dim"];

const meta = {
  args: {
    label: "按鈕",
    tone: "-",
    variant: "-",
    size: "-",
    radius: "-",
    interactive: "-",
    disabled: false,
  },
  argTypes: {
    tone: axisArg("sl-tone", "顏色", TONES),
    variant: axisArg("sl-button", "型態", VARIANTS),
    size: axisArg("sl-size", "尺寸", SIZES),
    radius: axisArg("sl-radius", "圓角", RADII),
    interactive: axisArg("sl-interactive", "互動效果", INTERACTIVES),
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
  interactive,
  disabled,
}: ButtonArgs): string {
  return (
    marker(variant) +
    attr("sl-tone", tone) +
    attr("sl-size", size) +
    attr("sl-radius", radius) +
    attr("sl-interactive", interactive) +
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

export const Disabled: Demo = {
  render: () =>
    `<button ${marker("-")}>一般</button>
<button ${marker("-")} disabled>disabled</button>
<button ${marker("-")} aria-disabled="true">aria-disabled</button>`,
};
