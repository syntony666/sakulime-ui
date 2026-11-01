import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr, TONES } from "../util/axis";
import "../util/icons";

type ChipArgs = {
  tone: string;
  size: string;
};

const SIZES = ["-", "sm", "md", "lg"];

const meta = {
  args: {
    tone: "-",
    size: "-",
  },
  argTypes: {
    tone: axisArg("sl-tone", "顏色", TONES),
    size: axisArg("sl-size", "大小", SIZES),
  },
} satisfies Meta<ChipArgs>;

export default meta;
type Demo = DemoObj<ChipArgs>;

export const Chip: Demo = {
  render: (a) =>
    `<span sl-chip${attr("sl-tone", a.tone)}${attr("sl-size", a.size)}>標籤</span>`,
};

// the chip is em-based — it tracks the font-size of whatever it sits inside
const FONT_SIZES = [14, 16, 20, 28];
export const Sizes: Demo = {
  render: () =>
    axis(FONT_SIZES, (v) =>
      `<span style="font-size: ${v}px"><span sl-chip>${v}px 標籤</span></span>`,
    ),
};

const WITH_ICON = [
  ["star", "release"],
  ["tag", "0.3.0"],
  ["check", "docs"],
];
export const WithIcon: Demo = {
  render: () =>
    axis(
      WITH_ICON,
      ([name, t]) =>
        `<span sl-chip><i sl-icon="lucide:${name}"></i> ${t}</span>`,
    ),
};

export const MetaRow: Demo = {
  render: () =>
    `<div>` +
    `<span sl-chip><i sl-icon="lucide:calendar"></i> 2026-10-30</span> ` +
    `<span sl-chip sl-tone="primary"><i sl-icon="lucide:tag"></i> release</span> ` +
    `<span sl-chip sl-tone="success"><i sl-icon="lucide:check"></i> 已發佈</span>` +
    `</div>`,
};

// sl-card--corner pins the chip to a card corner — metric labels,
// badges; same element carries both attrs
export const InCorner: Demo = {
  render: () =>
    `<div sl-card style="width: 240px">` +
    `<span sl-card--corner sl-chip sl-tone="primary">200ms</span>` +
    `<strong>回應時間</strong><p>過去一小時的 p95。</p></div>`,
};
