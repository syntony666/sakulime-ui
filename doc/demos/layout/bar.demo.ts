import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

// position is overridden to static — a live sticky bar inside the demo
// would pin to the real viewport while scrolling the page
export const BarTop: Demo = {
  render: () =>
    `<div sl-bar="top" style="position: static">` +
    `${cell("Logo")}${cell("連結")}${cell("連結")}` +
    `</div>`,
};

// space-between spreads children across the band — the first hugs the
// leading edge, the last the trailing edge, the middle floats between
export const BarSpread: Demo = {
  render: () =>
    `<div sl-bar="top" style="position: static">` +
    `${cell("Logo")}${cell("中間")}${cell("右邊")}` +
    `</div>`,
};

// bottom edge — hairline flips to the top; sl-pad layers the fat-footer
// look on the same primitive
export const BarBottom: Demo = {
  render: () =>
    `<div sl-bar="bottom" sl-pad="lg" style="position: static">${cell("頁尾內容")}</div>`,
};

// positioning — an edge bar is sticky by default; sl-bar-fixed pins it
// to the viewport. A live fixed bar would pin to the real viewport, so
// the stage overrides position; the attrs shown are the real API
export const Positions: Demo = {
  render: () =>
    axis(
      ["-", "sl-bar-fixed"],
      (v) =>
        `<div sl-bar="top"${v === "-" ? "" : ` ${v}`} style="position: static">` +
        `${cell(v === "-" ? "sticky（預設）" : v)}</div>`,
      true
    ),
};
