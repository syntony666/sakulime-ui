import type { Meta, StoryObj } from "@storybook/html-vite";
import { showMarkup } from "../util/docs-source";

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
} satisfies Meta;

export default meta;
type Story = StoryObj;

const box = (attr: string, label: string) =>
  `<div ${attr} style="border:1px dashed var(--sl-border);border-radius:var(--sl-sm);padding:var(--sl-md);background:var(--sl-surface)">${label}</div>`;

// real containers on a 1200px page — lg fills it edge to edge
export const ContainerWidths: Story = {
  render: () =>
    `<div style="overflow-x:auto">` +
    `<div style="width:1200px;display:grid;gap:var(--sl-md)">` +
    ["sm", "md", "lg"].map((v) => box(`sl-container-${v}`, `sl-container-${v}`)).join("") +
    `</div></div>`,
};
