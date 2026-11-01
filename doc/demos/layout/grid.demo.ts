import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = (n = 6) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

export const Gaps: Demo = {
  render: () =>
    axis(
      ["xs", "md", "3xl"],
      (v) =>
        `<div class="demo-cell"><span class="demo-w" data-demo>sl-grid sl-gap="${v}"</span>` +
        `<div sl-grid sl-gap="${v}" style="margin-top: var(--sl-sm)">${cells()}</div></div>`,
      true
    ),
};

// explicit columns + spans — the spanning cells carry real text so the
// reader sees them take two and three tracks respectively
export const Cols: Demo = {
  render: () =>
    `<div class="demo-cell"><span class="demo-w" data-demo>sl-grid-cols="4"</span>` +
    `<div sl-grid sl-grid-cols="4" style="margin-top: var(--sl-sm)">` +
    `<div class="demo-cell" sl-grid--span="2">跨兩欄 sl-grid--span="2"</div>` +
    `<div class="demo-cell">1</div>` +
    `<div class="demo-cell">2</div>` +
    `<div class="demo-cell">3</div>` +
    `<div class="demo-cell" sl-grid--span="3">跨三欄 sl-grid--span="3"</div>` +
    `<div class="demo-cell">4</div>` +
    `<div class="demo-cell">5</div>` +
    `<div class="demo-cell" sl-grid--span>跨滿整列 sl-grid--span</div>` +
    `<div class="demo-cell">6</div>` +
    `</div></div>`,
};

export const MinWidth: Demo = {
  render: () =>
    ["8rem", "20rem"]
      .map(
        (min) =>
          `<div class="demo-cell"><span class="demo-w" data-demo>--sl-grid-min: ${min}</span>` +
          `<div sl-grid style="--sl-grid-min: ${min}; margin-top: var(--sl-sm)">${cells()}</div></div>`
      )
      .join(""),
};
