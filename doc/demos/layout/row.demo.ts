import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = (n = 4) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

export const Gaps: Demo = {
  render: () =>
    axis(
      ["xs", "md", "3xl"],
      (v) =>
        `<div class="demo-cell"><span class="demo-w" data-demo>sl-row sl-gap="${v}"</span>` +
        `<div sl-row sl-gap="${v}" style="margin-top: var(--sl-sm)">${cells()}</div></div>`,
      true
    ),
};
