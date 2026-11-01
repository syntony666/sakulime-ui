import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = (n = 3) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Gaps: Demo = {
  render: () =>
    axis(["xs", "md", "3xl"], (v) =>
      frame(`sl-stack="${v}"`, `<div sl-stack="${v}">${cells()}</div>`)
    ),
};

// the prose mode — children keep their own margins and natural widths,
// so the gap is a floor rather than a fixed measure
export const Flow: Demo = {
  render: () =>
    `<article sl-stack="lg" sl-flow>` +
    `<h3>文件標題</h3>` +
    `<p>標題跟段落保留自己的 margin，所以這裡的距離是兩者取大的；卡片跟通知沒有 margin，距離就是間距本身。</p>` +
    `<div sl-card>卡片內容</div>` +
    `<div sl-notice>通知內容</div>` +
    `</article>`,
};

// multicol — content flows through balanced text columns; sl-span makes
// a child cross all of them
export const Cols: Demo = {
  render: () =>
    `<div sl-stack sl-cols="2">` +
    `<div class="demo-cell" sl-span>標題跨滿兩欄</div>` +
    `<p>多欄模式不是 flex，是文字多欄：內容由上到下排滿一欄才接下一欄，欄數固定所以高度會自動平衡。</p>` +
    `<p>子層自己的 margin 保留，相鄰子層之間照樣有間距——文流模式跟多欄共用同一套節奏。</p>` +
    `<p>欄間距跟行間距吃的是同一個間距值，改一個變數就兩邊同步。</p>` +
    `</div>`,
};
