import type { Meta, StoryObj } from "../util/types";
import { showMarkup } from "../util/docs-source";
import { axis, attr, label } from "../util/axis";

type CardArgs = {
  pad: string;
  radius: string;
  variant: string;
  indicate: string;
  tone: string;

  raised: boolean;
};

type SectionArgs = {
  inset: string;
  corner: boolean;
  pad: string;
};

const PADS = ["-", "sm", "md", "lg"];
const RADII = ["-", "none", "sm", "md", "lg"];
const VARIANTS = ["-", "hollow"];
const INDICATES = ["-", "top", "bottom", "start", "end"];
const CORNERS = ["-", "start", "end"];
const CORNER_TYPES = ["-", "text-xs", "text-sm", "indicator"];
const TONES = ["-", "primary", "secondary", "success", "warning", "danger"];
const INSETS = ["-", "top", "middle", "bottom"];

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
      // opt back into the TOC (disabled globally for prose pages)
      toc: { disable: false },
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
  },
  argTypes: {
    pad: axisArg("sl-pad", "內距", "md", PADS),
    radius: axisArg("sl-radius", "圓角", "md", RADII),
    variant: axisArg("sl-variant", "型態", "-", VARIANTS),
    indicate: axisArg("sl-indicate", "標記邊緣", "-", INDICATES),
    tone: axisArg("sl-tone", "顏色（搭配標記）", "primary", TONES),
    raised: {
      description: "浮起陰影 `sl-raised`",
      table: { type: {}, defaultValue: { summary: "false" } },
      control: "boolean",
    },
  },
} satisfies Meta<CardArgs>;

export default meta;
type Story = StoryObj<CardArgs>;

const card = (attrs: string, content: string, w = 320) =>
  `<div sl-card${attrs} style="width: ${w}px">${content}</div>`;

// shared content parts — playground cards and section demos
const sec = (inner: string) => `<div sl-card-section>${inner}</div>`;
const media = `<div sl-card-section="inset" class="demo-media"></div>`;
const TITLE = `<strong>卡片標題</strong><p>卡片內容文字，描述這張卡片在展示什麼。</p>`;
const FOOT = `<small>底部資訊</small>`;

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
    `<div>${TITLE}</div>` +
    `</div>`,
};

export const Pads: Story = {
  render: () => axis(PADS, byAxis("sl-pad")),
};

export const Radius: Story = {
  render: () => axis(RADII, byAxis("sl-radius")),
};

export const Variants: Story = {
  render: () => axis(VARIANTS, byAxis("sl-variant")),
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

const cornerIcon =
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
  `stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
  `<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;

export const Corner: Story = {
  args: { radius: "-", tone: "-" },
  render: (args) =>
    `<div sl-card${attr("sl-radius", args.radius)} style="max-width: 360px">` +
    `<span sl-card-corner${attr("sl-tone", args.tone)}>100ms</span>` +
    `<strong>卡片標題</strong><p>卡片內容文字，描述這張卡片在展示什麼。</p></div>`,
};

export const CornerPositions: Story = {
  render: () =>
    axis(CORNERS, (v) =>
      card(
        attr("sl-tone", "secondary"),
        (v !== "-" ? `<span sl-card-corner="${v}">NEW</span>` : "") +
          `<strong>${label(v)}</strong><p>內容文字</p>`,
      ),
    ),
};

export const CornerTypes: Story = {
  render: () =>
    axis(CORNER_TYPES, (v) =>
      card(
        attr("sl-tone", "success"),
        (v !== "-"
          ? `<span sl-card-corner="end ${v}">100ms</span>` +
            (v === "indicator"
              ? `<span sl-card-corner="start indicator">${cornerIcon}</span>`
              : "")
          : "") + `<strong>${label(v)}</strong><p>內容文字</p>`,
      ),
    ),
};

// carries its own args/argTypes so the md can bind it as a standalone
// playground (story doubles as the Playground meta prop)
export const Sections: StoryObj<SectionArgs> = {
  args: { inset: "top", corner: false, pad: "-" },
  argTypes: {
    inset: axisArg('sl-card-section="inset"', "貼邊區塊位置", "-", INSETS),
    corner: {
      name: "sl-card-corner",
      description: "角落標記（疊在貼邊內容上）",
      table: { type: {}, defaultValue: { summary: "false" } },
      control: "boolean",
    },
    pad: axisArg("sl-pad", "內距", "md", PADS),
  },
  render: (args) => {
    const parts =
      args.inset === "top"
        ? [media, sec(TITLE), sec(FOOT)]
        : args.inset === "middle"
          ? [sec(TITLE), media, sec(FOOT)]
          : args.inset === "bottom"
            ? [sec(TITLE), sec(FOOT), media]
            : [sec(TITLE), sec(FOOT)];
    return card(
      attr("sl-pad", args.pad),
      (args.corner ? `<span sl-card-corner="end text-sm">200ms</span>` : "") +
        parts.join(""),
      360,
    );
  },
};

export const Insets: Story = {
  render: () =>
    axis(["top", "middle", "bottom"], (v) => {
      const text = `<div sl-card-section><strong>${label(v)}</strong><p>內容</p></div>`;
      const parts =
        v === "top" ? [media, text] : v === "bottom" ? [text, media] : [text, media, text];
      return card("", parts.join(""), 240);
    }),
};
