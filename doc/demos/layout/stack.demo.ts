import type { Meta, DemoObj } from "../util/types";
import { axis, attr } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = (n = 3) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Rhythm: Demo = {
  render: () =>
    `<div sl-stack>` +
    `<h3>標題自身的 margin 已清除</h3>` +
    `<p>段落也一樣，相鄰子層之間只剩 sl-gap 的距離。</p>` +
    `<div sl-card>子層寬度與容器同寬</div>` +
    `</div>`,
};

export const Align: Demo = {
  render: () =>
    axis(
      ["-", "start", "center", "end", "stretch"],
      (v) =>
        frame(
          v === "-" ? "未標示" : `sl-align="${v}"`,
          `<div sl-stack${attr("sl-align", v)}>${cells()}</div>`
        ),
      true
    ),
};

export const Justify: Demo = {
  render: () =>
    axis(
      ["-", "start", "center", "end", "between", "around", "evenly"],
      (v) =>
        frame(
          v === "-" ? "未標示 → 預設 start" : `sl-justify="${v}"`,
          `<div sl-stack${attr("sl-justify", v)} style="height: 10rem">${cells()}</div>`
        ),
      true
    ),
};

export const Gaps: Demo = {
  render: () =>
    axis(
      ["-", "none", "sm", "md", "lg", "xl"],
      (v) =>
        frame(
          v === "-" ? "未標示 → 預設 md" : `sl-gap="${v}"`,
          `<div sl-stack${attr("sl-gap", v)}>${cells()}</div>`
        ),
      true
    ),
};
