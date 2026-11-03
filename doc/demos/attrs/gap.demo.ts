import type { Meta, DemoObj } from "../util/types";
import { axisArg, attr } from "../util/axis";

type PlayArgs = { gap: string };

const GAPS = ["-", "none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];

const meta = {
  args: { gap: "-" },
  argTypes: { gap: axisArg("sl-gap", "間距", GAPS) },
} satisfies Meta<PlayArgs>;
export default meta;
type Demo = DemoObj<PlayArgs>;

export const Play: Demo = {
  render: (a = { gap: "-" }) =>
    `<div sl-stack${attr("sl-gap", a.gap)}>` +
    `<div class="demo-cell">項目</div>`.repeat(3) +
    `</div>`,
};

const cells = (n = 3) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Alone: Demo = {
  render: () =>
    `<div class="axis-row col">` +
    frame(
      'div 標示 sl-gap="2xl" → 無效果',
      `<div sl-gap="2xl">${cells()}</div>`
    ) +
    frame("未標示 → 無效果", `<div>${cells()}</div>`) +
    `</div>`,
};

export const Region: Demo = {
  render: () =>
    `<div sl-stack sl-gap="2xl">` +
    frame("sl-stack 未標示 → 取 2xl", `<div sl-stack>${cells()}</div>`) +
    frame("sl-wrap 未標示 → 取 2xl", `<div sl-wrap>${cells()}</div>`) +
    frame("sl-grid 未標示 → 取 2xl", `<div sl-grid style="--sl-grid-min: 6rem">${cells()}</div>`) +
    frame("sl-stack 自帶 sl-gap=\"xs\" → 仍為 xs", `<div sl-stack sl-gap="xs">${cells()}</div>`) +
    `</div>`,
};

export const Scale: Demo = {
  render: () =>
    `<div class="axis-row col">` +
    ["-", "none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"]
      .map(
        (v) =>
          frame(
            v === "-" ? "未標示 → 預設 md" : `sl-gap="${v}"`,
            `<div sl-stack${v === "-" ? "" : ` sl-gap="${v}"`}>${cells(2)}</div>`
          )
      )
      .join("") +
    `</div>`,
};
