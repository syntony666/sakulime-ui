import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = (n = 3) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w">${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Gaps: Demo = {
  render: () =>
    axis(["xs", "md", "3xl"], (v) =>
      frame(`sl-stack="${v}"`, `<div sl-stack="${v}">${cells()}</div>`)
    ),
};

// generic sl-gap works on any gap-reading element — here it feeds the
// bare sl-stack, since sl-stack itself carries no value to win over it
export const GenericGap: Demo = {
  render: () =>
    `<div sl-stack sl-gap="3xl">${cells()}</div>`,
};
