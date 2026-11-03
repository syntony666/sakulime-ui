import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

export const Rhythm: Demo = {
  render: () =>
    `<article sl-content sl-gap="lg">` +
    `<h3>文件標題</h3>` +
    `<p>標題與段落保留自身的 margin，相鄰子層之間另補間距；卡片與通知不帶 margin，間距即為兩者距離。</p>` +
    `<div sl-card>卡片內容</div>` +
    `<div sl-notice>通知內容</div>` +
    `</article>`,
};
