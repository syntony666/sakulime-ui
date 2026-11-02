import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = (n = 3) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

// sl-gap alone produces nothing — the children here read no gap, so marked
// and unmarked render identically
export const Alone: Demo = {
  render: () =>
    `<div class="axis-row col">` +
    frame(
      'div 標示 sl-gap="2xl"',
      `<div sl-gap="2xl">${cells()}</div>`
    ) +
    frame("沒標示", `<div>${cells()}</div>`) +
    `</div>`,
};

// sl-gap on the wrapper feeds every gap-reading child that did not write
// its own value; the xs stack keeps its own
export const Region: Demo = {
  render: () =>
    `<div sl-stack sl-gap="2xl">` +
    frame("sl-stack 沒給 → 用 2xl", `<div sl-stack>${cells()}</div>`) +
    frame("sl-wrap 沒給 → 用 2xl", `<div sl-wrap>${cells()}</div>`) +
    frame("sl-grid 沒給 → 用 2xl", `<div sl-grid style="--sl-grid-min: 6rem">${cells()}</div>`) +
    frame("sl-stack 自己給 sl-gap=\"xs\" → 還是 xs", `<div sl-stack sl-gap="xs">${cells()}</div>`) +
    `</div>`,
};

// the whole scale at once — each frame is a two-cell stack spaced by
// its own value; "none" and the unmarked default bracket the ramp
export const Scale: Demo = {
  render: () =>
    `<div class="axis-row col">` +
    ["-", "none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"]
      .map(
        (v) =>
          frame(
            v === "-" ? "未標示（預設 md）" : `sl-gap="${v}"`,
            `<div sl-stack${v === "-" ? "" : ` sl-gap="${v}"`}>${cells(2)}</div>`
          )
      )
      .join("") +
    `</div>`,
};
