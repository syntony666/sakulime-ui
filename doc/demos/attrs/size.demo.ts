import type { Meta, DemoObj } from "../util/types";
import { axis, attr } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Sizes: Demo = {
  render: () =>
    axis(["sm", "md", "lg"], (v) =>
      frame(
        `sl-size="${v}"`,
        `<div sl-wrap>` +
          `<button sl-button${attr("sl-size", v)}>按鈕</button>` +
          `<span sl-chip${attr("sl-size", v)}>膠囊</span>` +
        `</div>`
      )
    ),
};
