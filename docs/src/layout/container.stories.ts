import type { Meta, StoryObj } from "@storybook/html-vite";
import { showMarkup } from "../docs-source";

type ContainerArgs = {
  size: string;
};

const meta = {
  title: "Layout/Container 容器",
  // stories feed the mdx page; hide them from the sidebar
  tags: ["!dev"],
  parameters: {
    docs: {
      source: {
        type: "dynamic",
        transform: showMarkup,
      },
    },
  },
  args: {
    size: "-",
  },
  argTypes: {
    size: {
      name: "sl-container-*",
      description: "寬度",
      table: { type: {} },
      control: { type: "select", labels: { "-": "-" } },
      options: ["-", "sm", "md", "lg"],
    },
  },
} satisfies Meta<ContainerArgs>;

export default meta;
type Story = StoryObj<ContainerArgs>;

const box = (attr: string, label: string) =>
  `<div ${attr} style="border:1px dashed var(--sl-border);border-radius:var(--sl-sm);padding:var(--sl-md);background:var(--sl-surface)">${label}</div>`;

export const Container: Story = {
  render: (args) =>
    box(
      args.size === "-" ? "" : `sl-container-${args.size}`,
      args.size === "-" ? "sl-container-*" : `sl-container-${args.size}`,
    ),
};

// real containers on a 1200px page — lg fills it edge to edge
export const ContainerWidths: Story = {
  render: () =>
    `<div style="overflow-x:auto">` +
    `<div style="width:1200px;display:grid;gap:var(--sl-md)">` +
    ["sm", "md", "lg"].map((v) => box(`sl-container-${v}`, `sl-container-${v}`)).join("") +
    `</div></div>`,
};
