import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Float: Demo = {
  render: () =>
    `<div sl-float style="position: static">` +
    `<div sl-notice sl-tone="success">已儲存變更</div>` +
    `<div sl-notice>新版本可用</div>` +
    `</div>`,
};

export const Corners: Demo = {
  render: () =>
    `<div style="position: relative; height: 11rem; border: 1px dashed var(--sl-border); border-radius: var(--sl-sm)">` +
    `<div sl-float="top start" sl-align="start" style="position: absolute"><span sl-chip>左上</span></div>` +
    `<div sl-float="top center" sl-align="center" style="position: absolute"><span sl-chip>中上</span></div>` +
    `<div sl-float="top end" sl-align="end" style="position: absolute"><span sl-chip>右上</span></div>` +
    `<div sl-float="bottom start" sl-align="start" style="position: absolute"><span sl-chip>左下</span></div>` +
    `<div sl-float="bottom center" sl-align="center" style="position: absolute"><span sl-chip>中下</span></div>` +
    `<div sl-float="bottom end" sl-align="end" style="position: absolute"><span sl-chip>右下</span></div>` +
    `</div>`,
};

export const Sizes: Demo = {
  render: () =>
    axis(
      ["16rem", "22rem", "28rem"],
      (w) =>
        frame(
          `--sl-float-width: ${w}`,
          `<div sl-float style="position: static; --sl-float-width: ${w}">` +
            `<div sl-notice>通知內容</div>` +
            `</div>`
        ),
      true
    ),
};

export const Gaps: Demo = {
  render: () =>
    axis(
      ["sm", "md", "lg"],
      (v) =>
        frame(
          `sl-gap="${v}"`,
          `<div sl-float sl-gap="${v}" style="position: static">` +
            `<div sl-notice>通知一</div>` +
            `<div sl-notice>通知二</div>` +
            `</div>`
        ),
      true
    ),
};
