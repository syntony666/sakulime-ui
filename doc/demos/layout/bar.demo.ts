import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const BarTop: Demo = {
  render: () =>
    `<div sl-bar="top" style="position: static">` +
    `<div sl-bar--start class="demo-cell">Logo</div>` +
    `<div sl-bar--end sl-wrap class="demo-cell"><span>連結</span><span>連結</span></div>` +
    `</div>`,
};

export const BarBare: Demo = {
  render: () =>
    `<div sl-bar>` +
    `<div sl-bar--start class="demo-cell">Logo</div>` +
    `<div sl-bar--end class="demo-cell"><span>連結</span></div>` +
    `</div>`,
};

export const BarSpread: Demo = {
  render: () =>
    `<div sl-bar="top" style="position: static">` +
    `<div sl-bar--start class="demo-cell">Logo</div>` +
    `<div sl-bar--center class="demo-cell">中央</div>` +
    `<div sl-bar--end class="demo-cell">終點</div>` +
    `</div>`,
};

export const BarBottom: Demo = {
  render: () =>
    `<div sl-bar="bottom" sl-pad="lg" style="position: static">${cell("頁尾內容")}</div>`,
};

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

export const Gaps: Demo = {
  render: () =>
    axis(
      ["sm", "md", "lg"],
      (v) =>
        frame(
          `sl-gap="${v}"`,
          `<div sl-bar="top" sl-gap="${v}" style="position: static">` +
            `<div sl-bar--start class="demo-cell">Logo</div>` +
            `<div sl-bar--center class="demo-cell">中央</div>` +
            `<div sl-bar--end class="demo-cell">終點</div>` +
            `</div>`
        ),
      true
    ),
};
