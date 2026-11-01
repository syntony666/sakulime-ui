import type { Meta, DemoObj } from "../util/types";
import { axis, attr } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w">${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Radius: Demo = {
  render: () =>
    axis(["none", "sm", "md", "lg", "full"], (v) =>
      frame(
        `sl-radius="${v}"`,
        `<div sl-card${attr("sl-radius", v)} sl-pad style="width: 9rem; text-align: center">卡片</div>`
      )
    ),
};
