import type { Meta, DemoObj } from "../util/types";
import { axis, attr, TONES } from "../util/axis";
import "../util/icons";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

// one value, five elements — the cross-element consistency is the point
export const Tones: Demo = {
  render: () =>
    axis(TONES, (v) =>
      frame(
        `sl-tone="${v}"`,
        `<div sl-row>` +
          `<button sl-button${attr("sl-tone", v)}>按鈕</button>` +
          `<span sl-chip${attr("sl-tone", v)}>膠囊</span>` +
          `<i sl-dot${attr("sl-tone", v)}></i>` +
          `<i sl-icon="lucide:star"${attr("sl-tone", v)}></i>` +
          `</div>`
      )
    ),
};
