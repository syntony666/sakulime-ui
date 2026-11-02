import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

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
