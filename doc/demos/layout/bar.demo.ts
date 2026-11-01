import type { Meta, DemoObj } from "../util/types";

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

// three zones in one bar — the 1fr/auto/1fr grid makes sl-place="center"
// the true bar center; "end" pins the far edge regardless of source order
export const BarZones: Demo = {
  render: () =>
    `<div sl-bar="top" style="position: static">` +
    `${cell("Logo")}${cell("中間").replace('class="demo-cell"', 'class="demo-cell" sl-place="center"')}${cell("右邊").replace('class="demo-cell"', 'class="demo-cell" sl-place="end"')}` +
    `</div>`,
};

// bottom edge — hairline flips to the top; sl-pad layers the fat-footer
// look on the same primitive
export const BarBottom: Demo = {
  render: () =>
    `<div sl-bar="bottom" sl-pad="lg" style="position: static">${cell("頁尾內容")}</div>`,
};
