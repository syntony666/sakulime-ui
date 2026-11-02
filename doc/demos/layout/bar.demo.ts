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
    `<div sl-bar--start class="demo-cell">Logo</div>` +
    `<div sl-bar--end class="demo-cell"><div sl-wrap><span>連結</span><span>連結</span></div></div>` +
    `</div>`,
};

// the three zones — --center lands dead-center regardless of what the
// side zones hold, since the middle column is auto-width
export const BarSpread: Demo = {
  render: () =>
    `<div sl-bar="top" style="position: static">` +
    `<div sl-bar--start class="demo-cell">Logo</div>` +
    `<div sl-bar--center class="demo-cell">中間</div>` +
    `<div sl-bar--end class="demo-cell">右邊</div>` +
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
