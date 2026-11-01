import type { Meta, DemoObj } from "../util/types";
import { axis, attr } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

// "-" is the unmarked baseline — a bare sl-button grows on hover all
// by itself while the card stays put; named values are the opt-ins
export const Interactive: Demo = {
  render: () =>
    axis(["-", "grow", "lift", "raise", "press", "dim"], (v) =>
      frame(
        v === "-" ? "未標示" : `sl-interactive="${v}"`,
        `<div sl-row>` +
          `<div sl-card${attr("sl-interactive", v)} style="width: 7rem; text-align: center">滑鼠移過來</div>` +
          `<button sl-button${attr("sl-interactive", v)}>按鈕</button>` +
        `</div>`
      )
    ),
};
