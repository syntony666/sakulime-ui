import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr, TONES } from "../util/axis";

type DotArgs = {
  tone: string;
};

const meta = {
  args: {
    tone: "-",
  },
  argTypes: {
    tone: axisArg("sl-tone", "顏色", TONES),
  },
} satisfies Meta<DotArgs>;

export default meta;
type Demo = DemoObj<DotArgs>;

export const Dot: Demo = {
  render: (a) => `<i sl-dot${attr("sl-tone", a.tone)}></i>`,
};

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

export const InCorner: Demo = {
  render: () =>
    `<div sl-card style="width: 240px">` +
    `<i sl-card--corner sl-dot sl-tone="danger"></i>` +
    `<strong>系統狀態</strong><p>有服務異常，需要處理。</p></div>`,
};
