import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = (n = 3) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div>`;

// the same row distributed four ways — the fixed width makes the
// placement visible inside the frame
export const Place: Demo = {
  render: () =>
    axis(["start", "center", "end", "between"], (v) =>
      frame(
        `sl-place="${v}"`,
        `<div sl-wrap sl-place="${v}" style="width: 20rem">${cells()}</div>`
      )
    ),
};
