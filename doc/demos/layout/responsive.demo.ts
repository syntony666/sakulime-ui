import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

// live demo — the stage follows the real viewport, so shrinking the
// browser window shows the tiers kick in and the span clamp to a row
export const Cols: Demo = {
  render: () =>
    `<div class="demo-cell"><span class="demo-w">sl-cols="4" sl-cols-md="2" sl-cols-sm="1"</span>` +
    `<div sl-grid sl-cols="4" sl-cols-md="2" sl-cols-sm="1" style="margin-top: var(--sl-sm)">` +
    `<div class="demo-cell" sl-span="2">跨兩欄 sl-span="2"</div>` +
    `<div class="demo-cell">1</div>` +
    `<div class="demo-cell">2</div>` +
    `<div class="demo-cell">3</div>` +
    `<div class="demo-cell">4</div>` +
    `<div class="demo-cell">5</div>` +
    `</div></div>`,
};

// same slot, two card variants — the md breakpoint swaps them
export const Card: Demo = {
  render: () =>
    `<div sl-card sl-hide-md>` +
    `<div sl-card-section>` +
    `<strong>桌面版卡片</strong><p>60rem 以上輪到這張，資訊量可以放得比較滿。</p>` +
    `</div></div>` +
    `<div sl-card sl-show-md>` +
    `<div sl-card-section>` +
    `<strong>手機版卡片</strong><p>60rem 以下換這張上場，內容精簡。</p>` +
    `</div></div>`,
};

export const Hide: Demo = {
  render: () =>
    `<div sl-grid sl-cols="3">` +
    `<div class="demo-cell" sl-show-md>sl-show-md</div>` +
    `<div class="demo-cell">常駐</div>` +
    `<div class="demo-cell" sl-hide-md>sl-hide-md</div>` +
    `</div>`,
};
