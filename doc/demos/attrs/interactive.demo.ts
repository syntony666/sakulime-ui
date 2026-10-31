import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w">${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Interactive: Demo = {
  render: () =>
    axis(["grow", "lift", "raise", "press"], (v) =>
      frame(
        `sl-interactive="${v}"`,
        `<div sl-row>` +
          `<div sl-card sl-interactive="${v}" sl-pad style="width: 7rem; text-align: center">滑鼠移過來</div>` +
          `<button sl-button sl-interactive="${v}">按鈕</button>` +
        `</div>`
      )
    ),
};
