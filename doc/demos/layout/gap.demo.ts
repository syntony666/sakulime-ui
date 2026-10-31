import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = (n = 3) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w">${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

// sl-gap on the wrapper feeds every gap-reading child that did not write
// its own value; the xs stack keeps its own
export const Region: Demo = {
  render: () =>
    `<div sl-stack sl-gap="2xl">` +
    frame("sl-stack 沒寫值 → 用 2xl", `<div sl-stack>${cells()}</div>`) +
    frame("sl-row 沒寫值 → 用 2xl", `<div sl-row>${cells()}</div>`) +
    frame("sl-grid 沒寫值 → 用 2xl", `<div sl-grid style="--sl-grid-min: 6rem">${cells()}</div>`) +
    frame("sl-stack=\"xs\" 自己寫了 → 還是 xs", `<div sl-stack="xs">${cells()}</div>`) +
    `</div>`,
};
