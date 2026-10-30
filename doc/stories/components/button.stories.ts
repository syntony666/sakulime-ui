import type { Meta, StoryObj } from "../util/types";
import { showMarkup } from "../util/docs-source";
import { axis, attr, label } from "../util/axis";

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

// Controls row for an attr axis: name = real attr, shows the "-" option
// and the real default, hides the Type column
const axisArg = (name: string, desc: string, def: string, options: string[]) => ({
  name,
  description: desc,
  table: { type: {}, defaultValue: { summary: `"${def}"` } },
  control: { type: "select" as const, labels: { "-": "-" } },
  options,
});

const meta = {
  title: "Core/Button 按鈕",
  // stories feed the mdx page; hide them from the sidebar
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
type Story = StoryObj<ButtonArgs>;

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

export const Button: Story = {
  render: (args) => `<button ${slAttrs(args)}>${args.label}</button>`,
};

export const Tones: Story = {
  render: () => axis(TONES, btn("sl-tone")),
};

export const TonesInvert: Story = {
  render: () => axis(TONES, btn("sl-tone", "invert")),
};

export const Variants: Story = {
  render: () =>
    axis(VARIANTS, (v) => `<button ${marker(v)}>${label(v)}</button>`),
};

export const Sizes: Story = {
  render: () => axis(SIZES, btn("sl-size")),
};

export const Radius: Story = {
  render: () => axis(RADII, btn("sl-radius")),
};
