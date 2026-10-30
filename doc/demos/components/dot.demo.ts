import type { Meta, DemoObj } from "../util/types";
import { showMarkup } from "../util/docs-source";
import { axis, axisArg, attr } from "../util/axis";

type DotArgs = {
  tone: string;
};

const TONES = ["-", "primary", "secondary", "success", "warning", "danger"];

const meta = {
  title: "Core/Dot 狀態點",
  tags: ["!dev"],
  parameters: {
    docs: {
      toc: { disable: false },
      source: {
        type: "dynamic",
        transform: showMarkup,
      },
    },
  },
  args: {
    tone: "-",
  },
  argTypes: {
    tone: axisArg("sl-tone", "顏色", "-", TONES),
  },
} satisfies Meta<DotArgs>;

export default meta;
type Demo = DemoObj<DotArgs>;

export const Dot: Demo = {
  render: (a) => `<i sl-dot${attr("sl-tone", a.tone)}></i>`,
};

export const Tones: Demo = {
  render: () => axis(TONES, (v) => `<i sl-dot${attr("sl-tone", v)}></i>`),
};

// the dot is 0.5em — it tracks the font-size of whatever it sits inside
const SIZES = [14, 16, 20, 28];
export const Sizes: Demo = {
  render: () =>
    axis(SIZES, (v) =>
      `<span style="font-size: ${v}px"><i sl-dot></i> ${v}px</span>`,
    ),
};

const SERVICES = [
  ["success", "API"],
  ["success", "CDN"],
  ["warning", "佇列"],
  ["danger", "資料庫"],
] as const;
export const StatusList: Demo = {
  render: () =>
    `<ul style="list-style: none; padding: 0; margin: 0">` +
    SERVICES.map(
      ([tone, name]) =>
        `<li><i sl-dot sl-tone="${tone}"></i> ${name}</li>`,
    ).join("") +
    `</ul>`,
};
