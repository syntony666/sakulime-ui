import type { Meta, StoryObj } from "@storybook/html-vite";

type ButtonArgs = {
  label: string;
  tone: string;
  variant: string;
  size: string;
  invert: boolean;
  disabled: boolean;
};

const meta = {
  title: "Components/Button",
  args: {
    label: "Button",
    tone: "primary",
    variant: "normal",
    size: "md",
    invert: false,
    disabled: false,
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "danger"],
    },
    variant: {
      control: "select",
      options: ["normal", "ghost", "underline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    invert: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<ButtonArgs>;

export default meta;
type Story = StoryObj<ButtonArgs>;

function slAttrs({ tone, variant, size, invert, disabled }: ButtonArgs): string {
  return [
    "sl-button",
    `sl-tone="${tone}"`,
    `sl-size="${size}"`,
    variant !== "normal" ? `sl-variant="${variant}"` : "",
    invert ? "sl-invert" : "",
    disabled ? "disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export const Button: Story = {
  render: (args) => `<button ${slAttrs(args)}>${args.label}</button>`,
};

export const Anchor: Story = {
  render: (args) => `<a href="#" ${slAttrs(args)}>${args.label}</a>`,
};
