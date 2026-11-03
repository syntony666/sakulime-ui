import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cells = () =>
  `<div class="demo-cell" style="min-height:1.5rem">a</div>` +
  `<div class="demo-cell" style="min-height:3rem">b</div>` +
  `<div class="demo-cell" style="min-height:2rem">c</div>`;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const AlignWrap: Demo = {
  render: () =>
    axis(["start", "center", "end", "stretch"], (v) =>
      frame(`sl-align="${v}"`, `<div sl-wrap sl-align="${v}">${cells()}</div>`)
    ),
};

export const AlignStack: Demo = {
  render: () =>
    axis(["start", "center", "end"], (v) =>
      frame(
        `sl-align="${v}"`,
        `<div sl-stack sl-align="${v}"><div class="demo-cell">短</div><div class="demo-cell">比較長的項目</div></div>`
      )
    ),
};

export const AlignChild: Demo = {
  render: () =>
    `<div sl-stack>` +
    `<div class="demo-cell">與容器同寬（預設）</div>` +
    `<div class="demo-cell" sl-align="end">只有這項靠右</div>` +
    `<div class="demo-cell">與容器同寬（預設）</div>` +
    `</div>`,
};
