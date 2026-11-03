import type { Meta, DemoObj } from "../util/types";
import { axis, attr } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = (n = 6) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Basic: Demo = {
  render: () => `<div sl-grid>${cells(4)}</div>`,
};

export const Spans: Demo = {
  render: () =>
    `<div sl-grid sl-grid-cols="4">` +
    `<div class="demo-cell" sl-grid--span="2">span 2</div>` +
    `<div class="demo-cell" sl-grid--span="full">span full</div>` +
    `<div class="demo-cell">未標示</div>` +
    `<div class="demo-cell" sl-grid--span="3">span 3</div>` +
    `</div>`,
};

export const Cols: Demo = {
  render: () =>
    `<div class="demo-cell"><span class="demo-w" data-demo>sl-grid-cols="4"</span>` +
    `<div sl-grid sl-grid-cols="4" style="margin-top: var(--sl-sm)">` +
    `<div class="demo-cell" sl-grid--span="2">跨兩欄</div>` +
    `<div class="demo-cell">1</div>` +
    `<div class="demo-cell">2</div>` +
    `<div class="demo-cell">3</div>` +
    `<div class="demo-cell" sl-grid--span="3">跨三欄</div>` +
    `<div class="demo-cell">4</div>` +
    `<div class="demo-cell">5</div>` +
    `<div class="demo-cell" sl-grid--span>跨滿整列</div>` +
    `<div class="demo-cell">6</div>` +
    `</div></div>`,
};

export const MinWidth: Demo = {
  render: () =>
    `<div class="axis-row col">` +
    ["8rem", "20rem"]
      .map(
        (min) =>
          `<div class="demo-cell"><span class="demo-w" data-demo>--sl-grid-min: ${min}</span>` +
          `<div sl-grid style="--sl-grid-min: ${min}; margin-top: var(--sl-sm)">${cells()}</div></div>`
      )
      .join("") +
    `</div>`,
};

export const Aligns: Demo = {
  render: () =>
    `<div class="demo-cell"><span class="demo-w" data-demo>sl-grid sl-justify="center" + 一格 sl-justify="end"</span>` +
    `<div sl-grid sl-grid-cols="3" sl-justify="center" style="margin-top: var(--sl-sm)">` +
    `<div class="demo-cell">中</div>` +
    `<div class="demo-cell" sl-justify="end">只有這項靠右</div>` +
    `<div class="demo-cell">中</div>` +
    `</div></div>`,
};

export const Gaps: Demo = {
  render: () =>
    axis(
      ["-", "sm", "md", "lg"],
      (v) =>
        frame(
          v === "-" ? "未標示 → 預設 md" : `sl-gap="${v}"`,
          `<div sl-grid${attr("sl-gap", v)}>${cells(4)}</div>`
        ),
      true
    ),
};
