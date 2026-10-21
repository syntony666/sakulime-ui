import type { Meta, StoryObj } from "@storybook/html-vite";
import { icon, iconNames } from "../icons/index";

type IconArgs = {
  name: string;
  size: string;
  tone: string;
};

const CHECK_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

const meta = {
  title: "Components/Icon",
  args: {
    name: "check",
    size: "md",
    tone: "primary",
  },
  argTypes: {
    name: {
      control: "select",
      options: iconNames,
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    tone: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "danger"],
    },
  },
} satisfies Meta<IconArgs>;

export default meta;
type Story = StoryObj<IconArgs>;

export const Helper: Story = {
  render: (args) =>
    icon(args.name, { "sl-size": args.size, "sl-tone": args.tone }),
};

export const Inline: Story = {
  render: (args) =>
    `<span sl-icon sl-size="${args.size}" sl-tone="${args.tone}">${CHECK_SVG}</span>`,
};
