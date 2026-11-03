import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

export const Cols: Demo = {
  render: () =>
    `<div class="demo-cell"><span class="demo-w" data-demo>sl-grid-cols="4" sl-grid-cols-md="2" sl-grid-cols-sm="1"</span>` +
    `<div sl-grid sl-grid-cols="4" sl-grid-cols-md="2" sl-grid-cols-sm="1" style="margin-top: var(--sl-sm)">` +
    `<div class="demo-cell" sl-grid--span="2">跨兩欄</div>` +
    `<div class="demo-cell">1</div>` +
    `<div class="demo-cell">2</div>` +
    `<div class="demo-cell">3</div>` +
    `<div class="demo-cell">4</div>` +
    `<div class="demo-cell">5</div>` +
    `</div></div>`,
};

export const Card: Demo = {
  render: () =>
    `<div sl-card sl-hide-md>` +
    `<div sl-card--section>` +
    `<strong>桌面版卡片</strong><p>60rem 以上由這張呈現，資訊量較大。</p>` +
    `</div></div>` +
    `<div sl-card sl-show-md>` +
    `<div sl-card--section>` +
    `<strong>手機版卡片</strong><p>60rem 以下改由這張呈現，內容精簡。</p>` +
    `</div></div>`,
};

export const Hide: Demo = {
  render: () =>
    `<div sl-grid sl-grid-cols="3">` +
    `<div class="demo-cell" sl-show-md>sl-show-md</div>` +
    `<div class="demo-cell">常駐</div>` +
    `<div class="demo-cell" sl-hide-md>sl-hide-md</div>` +
    `</div>`,
};
