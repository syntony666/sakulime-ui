import type { Meta, StoryObj } from "@storybook/html-vite";
import "../elements/index";

type IconArgs = {
  name: string;
  size: string;
  tone: string;
};

const CHECK_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

const meta = {
  title: "Icon",
  args: {
    name: "check",
    size: "md",
    tone: "primary",
  },
  argTypes: {
    name: {
      control: "select",
      options: ["check", "x", "info", "alert"],
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

export const ClassUsage: Story = {
  render: (args) =>
    `<span class="sl-icon sl-size--${args.size} sl-tone--${args.tone}">${CHECK_SVG}</span>`,
};

export const ElementUsage: Story = {
  render: (args) =>
    `<sl-icon name="${args.name}" size="${args.size}" tone="${args.tone}"></sl-icon>`,
};
