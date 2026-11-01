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

// spacing is sl-gap's job — written on the stack itself or an ancestor
export const Gaps: Demo = {
  render: () =>
    axis(["xs", "md", "3xl"], (v) =>
      frame(`sl-stack sl-gap="${v}"`, `<div sl-stack sl-gap="${v}">${cells()}</div>`)
    ),
};
