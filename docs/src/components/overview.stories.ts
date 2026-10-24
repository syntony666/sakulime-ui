import type { Meta, StoryObj } from "@storybook/html-vite";

const meta = {
  title: "Core/說明",
  // story feeds the mdx page; hide it from the sidebar
  tags: ["!dev"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const BasicUsage: Story = {
  render: () => `<button sl-button>按鈕</button>`,
};
