import type { Meta, StoryObj } from "../util/types";
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

// a half-scale page — the real containers still center and edge-fill;
// the same --sl-container-* override the docs describe does the scaling
export const ContainerWidths: Story = {
  render: () =>
    `<div class="demo-viewport">` +
    ["sm", "md", "lg"].map((v) => box(`sl-container-${v}`, `sl-container-${v}`)).join("") +
    `</div>`,
};
