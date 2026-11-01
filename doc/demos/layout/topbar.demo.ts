import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

// position is overridden to static — a live sticky bar inside the demo
// would pin to the real viewport while scrolling the page
export const Topbar: Demo = {
  render: () =>
    `<div sl-topbar style="position: static">` +
    `${cell("Logo")}${cell("連結")}${cell("連結")}` +
    `</div>`,
};

// three zones in one bar — the 1fr/auto/1fr grid makes sl-center the
// true bar center; sl-end pins the far edge regardless of source order
export const TopbarZones: Demo = {
  render: () =>
    `<div sl-topbar style="position: static">` +
    `${cell("Logo")}${cell("中間").replace('class="demo-cell"', 'class="demo-cell" sl-center')}${cell("右邊").replace('class="demo-cell"', 'class="demo-cell" sl-end')}` +
    `</div>`,
};
