import type { Meta, DemoObj } from "./util/types";
import { axis, attr, TONES } from "./util/axis";
import "./util/icons";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w">${caption}</span>` +
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

export const Radius: Demo = {
  render: () =>
    axis(["none", "sm", "md", "lg", "full"], (v) =>
      frame(
        `sl-radius="${v}"`,
        `<div sl-card${attr("sl-radius", v)} sl-pad style="width: 9rem; text-align: center">卡片</div>`
      )
    ),
};

export const Interactive: Demo = {
  render: () =>
    axis(["grow", "lift", "raise", "press"], (v) =>
      frame(
        `sl-interactive="${v}"`,
        `<div sl-card sl-interactive="${v}" sl-pad style="width: 9rem; text-align: center">滑鼠移過來</div>`
      )
    ),
};
