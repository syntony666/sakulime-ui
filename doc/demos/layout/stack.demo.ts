import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

export const Rhythm: Demo = {
  render: () =>
    `<div sl-stack>` +
    `<h3>標題自帶的 margin 被清掉</h3>` +
    `<p>段落也一樣，相鄰子層之間只剩 sl-gap 的距離。</p>` +
    `<div sl-card>子層寬度一律撐滿容器</div>` +
    `</div>`,
};
