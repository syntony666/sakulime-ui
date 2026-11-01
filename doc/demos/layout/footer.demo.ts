import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

export const Footer: Demo = {
  render: () => `<div sl-footer>${cell("頁尾內容")}</div>`,
};

export const FooterZones: Demo = {
  render: () =>
    `<div sl-footer>` +
    `${cell("左邊")}${cell("中間").replace('class="demo-cell"', 'class="demo-cell" sl-center')}${cell("右邊").replace('class="demo-cell"', 'class="demo-cell" sl-end')}` +
    `</div>`,
};
