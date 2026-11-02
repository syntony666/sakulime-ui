import type { Meta, DemoObj } from "../util/types";
import { axis, attr } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Cards: Demo = {
  render: () =>
    axis(["none", "sm", "md", "lg"], (v) =>
      frame(
        `sl-pad="${v}"`,
        `<div sl-card${attr("sl-pad", v)} style="width: 9rem">卡片內容</div>`
      )
    ),
};

export const Notices: Demo = {
  render: () =>
    axis(
      ["none", "sm", "md", "lg"],
      (v) =>
        frame(
          `sl-pad="${v}"`,
          `<div sl-notice sl-tone="secondary"${attr("sl-pad", v)}>公告訊息</div>`
        ),
      true
    ),
};
