import type { Meta, StoryObj } from "@storybook/html-vite";
import "../elements/index";

type ButtonArgs = {
  label: string;
  tone: string;
  variant: string;
  size: string;
  invert: boolean;
  disabled: boolean;
};

const meta = {
  title: "Button",
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

function buttonClass({ tone, variant, size, invert }: ButtonArgs): string {
  const classes = ["sl-button", `sl-button--${tone}`, `sl-button--${size}`];
  if (variant !== "normal") classes.push(`sl-button--${variant}`);
  if (invert) classes.push("is-invert");
  return classes.join(" ");
}

export const ClassUsage: Story = {
  render: (args) =>
    `<button class="${buttonClass(args)}" ${args.disabled ? "disabled" : ""}>${args.label}</button>`,
};

export const ElementUsage: Story = {
  render: (args) =>
    `<sl-button tone="${args.tone}" size="${args.size}" variant="${args.variant}"${args.invert ? " invert" : ""}${args.disabled ? " disabled" : ""}>${args.label}</sl-button>`,
};
