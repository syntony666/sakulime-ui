import type { Meta, StoryObj } from "@storybook/html-vite";

type LayoutArgs = {
  primitive: string;
  gap: string;
  count: number;
};

const meta = {
  title: "Layout",
  args: {
    primitive: "sl-cluster",
    gap: "md",
    count: 6,
  },
  argTypes: {
    primitive: {
      control: "select",
      options: ["sl-cluster", "sl-flex", "sl-grid", "sl-stack"],
    },
    gap: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    count: {
      control: { type: "range", min: 2, max: 12, step: 1 },
    },
  },
} satisfies Meta<LayoutArgs>;

export default meta;
type Story = StoryObj<LayoutArgs>;

export const Playground: Story = {
  render: (args) => {
    const cells = Array.from(
      { length: args.count },
      (_, i) =>
        `<div style="background:var(--sl-surface);border:1px solid var(--sl-border);border-radius:var(--sl-radius-md);padding:var(--sl-space-md)">cell ${i + 1}</div>`,
    ).join("");
    const cols =
      args.primitive === "sl-grid"
        ? ' style="grid-template-columns:repeat(3,1fr)"'
        : "";
    return `<div class="${args.primitive} sl-gap-${args.gap}"${cols}>${cells}</div>`;
  },
};
