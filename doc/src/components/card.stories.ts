import type { Meta, StoryObj } from "@storybook/html-vite";
import { showMarkup } from "../util/docs-source";
import { axis, attr, label } from "../util/axis";

type CardArgs = {
  pad: string;
  radius: string;
  variant: string;
  indicate: string;
  tone: string;
  raised: boolean;
  media: boolean;
};

const PADS = ["-", "none", "sm", "md", "lg"];
const RADII = ["-", "none", "sm", "md", "lg", "full"];
const VARIANTS = ["-", "horizontal", "hollow"];
const INDICATES = ["-", "top", "bottom", "start", "end"];
const TONES = ["-", "primary", "secondary", "success", "warning", "danger"];

// Controls row for an attr axis: name = real attr, shows the "-" option
// and the real default, hides the Type column
const axisArg = (name: string, desc: string, def: string, options: string[]) => ({
  name,
  description: desc,
  table: { type: {}, defaultValue: { summary: `"${def}"` } },
  control: { type: "select" as const, labels: { "-": "-" } },
  options,
});

const meta = {
  title: "Core/Card 卡片",
  // stories feed the mdx page; hide them from the sidebar
  tags: ["!dev"],
  parameters: {
    docs: {
      source: {
        // evaluated markup, not the .map() render source
        type: "dynamic",
        transform: showMarkup,
      },
    },
  },
  args: {
    pad: "-",
    radius: "-",
    variant: "-",
    indicate: "-",
    tone: "-",
    raised: false,
    media: false,
  },
  argTypes: {
    pad: axisArg("sl-pad", "內距", "md", PADS),
    radius: axisArg("sl-radius", "圓角", "md", RADII),
    variant: axisArg("sl-variant", "型態", "-", VARIANTS),
    indicate: axisArg("sl-indicate", "標記邊緣", "-", INDICATES),
    tone: axisArg("sl-tone", "標記顏色（搭配 sl-indicate）", "primary", TONES),
    raised: {
      description: "浮起陰影 `sl-raised`",
      table: { type: {}, defaultValue: { summary: "false" } },
      control: "boolean",
    },
    media: {
      description: "貼邊圖片 `sl-card-media`",
      table: { type: {}, defaultValue: { summary: "false" } },
      control: "boolean",
    },
  },
} satisfies Meta<CardArgs>;

export default meta;
type Story = StoryObj<CardArgs>;

const media = `<div sl-card-media><img src="https://picsum.photos/seed/sakulime/320/160" alt="" /></div>`;

const card = (attrs: string, content: string) =>
  `<div sl-card${attrs} style="max-width: 320px">${content}</div>`;

// one card per axis value
const byAxis = (name: string) => (v: string) =>
  card(attr(name, v), `<strong>${label(v)}</strong><p>內容文字</p>`);

export const Card: Story = {
  render: (args) =>
    `<div sl-card` +
    attr("sl-pad", args.pad) +
    attr("sl-radius", args.radius) +
    attr("sl-variant", args.variant) +
    attr("sl-indicate", args.indicate) +
    attr("sl-tone", args.tone) +
    (args.raised ? " sl-raised" : "") +
    ` style="max-width: 360px">` +
    (args.media ? media : "") +
    `<div><strong>卡片標題</strong><p>卡片內容文字，描述這張卡片在展示什麼。</p></div>` +
    `</div>`,
};

export const Pads: Story = {
  render: () => axis(PADS, byAxis("sl-pad")),
};

export const Radius: Story = {
  render: () => axis(RADII, byAxis("sl-radius")),
};

export const Variants: Story = {
  render: () =>
    axis(VARIANTS, (v) =>
      card(
        attr("sl-variant", v),
        (v === "horizontal" ? media : "") +
          `<div><strong>${label(v)}</strong><p>內容文字</p></div>`,
      ),
    ),
};

export const Indicated: Story = {
  render: () =>
    axis(TONES, (v) =>
      card(
        attr("sl-indicate", "start") + attr("sl-tone", v),
        `<strong>${label(v)}</strong><p>內容文字</p>`,
      ),
    ),
};

export const Raised: Story = {
  render: () => card(" sl-raised", `<strong>Raised</strong><p>帶陰影的浮起卡片</p>`),
};

export const WithMedia: Story = {
  render: () =>
    card("", media + `<div><strong>連結預覽</strong><p>貼邊圖片加內容</p></div>`),
};
