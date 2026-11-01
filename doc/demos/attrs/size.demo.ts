import type { Meta, DemoObj } from "../util/types";
import { axis, attr } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w">${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

// button takes height + font-size; chip takes font-size only but scales
// as a whole — side by side the difference shows
export const Sizes: Demo = {
  render: () =>
    axis(["sm", "md", "lg"], (v) =>
      frame(
        `sl-size="${v}"`,
        `<div sl-row>` +
          `<button sl-button${attr("sl-size", v)}>按鈕</button>` +
          `<span sl-chip${attr("sl-size", v)}>膠囊</span>` +
        `</div>`
      )
    ),
};
