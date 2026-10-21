import type { Meta, StoryObj } from "@storybook/html-vite";
import { icon } from "../icons/index";

const meta = {
  title: "Modifiers",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const TONES = ["primary", "secondary", "success", "warning", "danger"];
const SIZES = ["sm", "md", "lg"];

const row = (html: string) =>
  `<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${html}</div>`;

export const Tones: Story = {
  render: () =>
    row(
      TONES.map(
        (t) => `<button sl-button sl-tone="${t}" sl-size="md">${t}</button>`,
      ).join(""),
    ),
};

export const TonesInvert: Story = {
  render: () =>
    row(
      TONES.map(
        (t) =>
          `<button sl-button sl-tone="${t}" sl-size="md" sl-invert>${t}</button>`,
      ).join(""),
    ),
};

export const Sizes: Story = {
  render: () =>
    row(
      SIZES.map(
        (s) => `<button sl-button sl-tone="primary" sl-size="${s}">${s}</button>`,
      ).join("") +
        SIZES.map((s) =>
          icon("info", { "sl-tone": "primary", "sl-size": s }),
        ).join(""),
    ),
};

export const Variants: Story = {
  render: () =>
    row(
      `<button sl-button sl-tone="primary" sl-variant="ghost">ghost</button>` +
        `<button sl-button sl-tone="primary" sl-variant="underline">underline</button>` +
        `<button sl-button sl-tone="danger" sl-variant="underline">underline</button>`,
    ),
};

export const Radius: Story = {
  render: () =>
    row(
      ["none", "sm", "md", "lg", "full"]
        .map(
          (r) =>
            `<button sl-button sl-tone="primary" sl-size="md" sl-radius="${r}">${r}</button>`,
        )
        .join(""),
    ),
};
