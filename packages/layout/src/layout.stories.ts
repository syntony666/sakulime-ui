import type { Meta, StoryObj } from "@storybook/html-vite";

const meta = {
  title: "Layout",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const cell = (text: string) =>
  `<div style="background:var(--sl-surface);border:1px solid var(--sl-border);border-radius:var(--sl-radius-md);padding:var(--sl-space-md)">${text}</div>`;

const cells = (n: number) =>
  Array.from({ length: n }, (_, i) => cell(`cell ${i + 1}`)).join("");

export const Stack: Story = {
  render: () => `<div class="sl-stack sl-gap-md">${cells(3)}</div>`,
};

export const Cluster: Story = {
  render: () => `<div class="sl-cluster sl-gap-sm">${cells(5)}</div>`,
};

export const Grid: Story = {
  render: () =>
    `<div class="sl-grid sl-gap-md" style="grid-template-columns:repeat(3,1fr)">${cells(6)}</div>`,
};

export const Container: Story = {
  render: () => `<div class="sl-container">${cell("container")}</div>`,
};

export const Spacing: Story = {
  render: () =>
    ["xs", "sm", "md", "lg", "xl"]
      .map(
        (s) =>
          `<div class="sl-m-${s}" style="background:var(--sl-surface);border:1px solid var(--sl-border)">sl-m-${s}</div>`,
      )
      .join(""),
};
