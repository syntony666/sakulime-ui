import type { Meta, DemoObj } from "../util/types";
import { axis, attr } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Rhythm: Demo = {
  render: () =>
    `<article sl-content sl-gap="lg">` +
    `<h3>文件標題</h3>` +
    `<p>標題與段落保留自身的 margin，相鄰子層之間另補間距；卡片與通知不帶 margin，間距即為兩者距離。</p>` +
    `<div sl-card>卡片內容</div>` +
    `<div sl-notice>通知內容</div>` +
    `</article>`,
};

export const Gaps: Demo = {
  render: () =>
    axis(
      ["-", "sm", "md", "lg"],
      (v) =>
        frame(
          v === "-" ? "未標示 → 預設 md" : `sl-gap="${v}"`,
          `<article sl-content${attr("sl-gap", v)}>` +
            `<h3>標題</h3>` +
            `<p>段落內容，示範相鄰子層之間的間距。</p>` +
            `<div sl-card>卡片內容</div>` +
            `</article>`
        ),
      true
    ),
};
