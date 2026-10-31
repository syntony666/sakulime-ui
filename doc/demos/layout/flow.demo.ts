import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = (n = 3) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w">${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Basic: Demo = {
  render: () =>
    `<article sl-flow="lg">` +
    `<h3>文件標題</h3>` +
    `<p>標題跟段落保留自己的 margin，所以這裡的距離是兩者取大的；卡片跟通知沒有 margin，距離就是間距本身。</p>` +
    `<div sl-card>卡片內容</div>` +
    `<div sl-notice>通知內容</div>` +
    `</article>`,
};

export const Gaps: Demo = {
  render: () =>
    axis(["xs", "md", "3xl"], (v) =>
      frame(`sl-flow="${v}"`, `<div sl-flow="${v}">${cells()}</div>`)
    ),
};
