import type { Meta, DemoObj } from "../util/types";
import { axis, attr } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = () =>
  `<div class="demo-cell" style="min-height: 1.5rem">項目 1</div>` +
  `<div class="demo-cell" style="min-height: 3rem">項目 2</div>` +
  `<div class="demo-cell" style="min-height: 2rem">項目 3</div>`;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Flow: Demo = {
  render: () =>
    `<div sl-wrap style="max-inline-size: 22rem">` +
    `<button sl-button>送出</button>` +
    `<button sl-button="outline">取消</button>` +
    `<span sl-chip>標籤</span>` +
    `<span sl-chip>另一個標籤</span>` +
    `<span sl-chip>比較長的標籤</span>` +
    `<span sl-chip>更多</span>` +
    `</div>`,
};

export const Justify: Demo = {
  render: () =>
    axis(
      ["-", "start", "center", "end", "between", "around", "evenly"],
      (v) =>
        frame(
          v === "-" ? "未標示 → 預設 start" : `sl-justify="${v}"`,
          `<div sl-wrap${attr("sl-justify", v)} style="width: 20rem">${cells()}</div>`
        ),
      true
    ),
};

export const Gaps: Demo = {
  render: () =>
    axis(
      ["-", "sm", "md", "lg"],
      (v) =>
        frame(
          v === "-" ? "未標示 → 預設 md" : `sl-gap="${v}"`,
          `<div sl-wrap${attr("sl-gap", v)}>${cells()}</div>`
        ),
      true
    ),
};

export const Align: Demo = {
  render: () =>
    axis(
      ["-", "start", "center", "end", "stretch"],
      (v) =>
        frame(
          v === "-" ? "未標示" : `sl-align="${v}"`,
          `<div sl-wrap${attr("sl-align", v)}>${cells()}</div>`
        ),
      true
    ),
};
