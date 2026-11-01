import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

// the prose column — children keep their own margins and natural
// widths; sibling rhythm comes from the column, not a flex gap
export const Rhythm: Demo = {
  render: () =>
    `<article sl-content sl-gap="lg">` +
    `<h3>文件標題</h3>` +
    `<p>標題跟段落保留自己的 margin，相鄰子層之間再補上間距節奏；卡片跟通知沒有 margin，距離就是間距本身。</p>` +
    `<div sl-card>卡片內容</div>` +
    `<div sl-notice>通知內容</div>` +
    `</article>`,
};
