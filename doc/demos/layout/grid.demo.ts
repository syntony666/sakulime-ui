import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = (n = 6) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

export const Gaps: Demo = {
  render: () =>
    axis(
      ["xs", "md", "3xl"],
      (v) =>
        `<div class="demo-cell"><span class="demo-w">sl-grid="${v}"</span>` +
        `<div sl-grid="${v}" style="margin-top: var(--sl-sm)">${cells()}</div></div>`,
      true
    ),
};

export const MinWidth: Demo = {
  render: () =>
    ["8rem", "20rem"]
      .map(
        (min) =>
          `<div class="demo-cell"><span class="demo-w">--sl-grid-min: ${min}</span>` +
          `<div sl-grid style="--sl-grid-min: ${min}; margin-top: var(--sl-sm)">${cells()}</div></div>`
      )
      .join(""),
};
