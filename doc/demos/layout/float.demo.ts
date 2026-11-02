import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

// position overridden to static — a live fixed container would pin to the
// real viewport; what matters here is the width and the stacking gap
export const Float: Demo = {
  render: () =>
    `<div sl-float style="position: static">` +
    `<div sl-notice sl-tone="success">已儲存變更</div>` +
    `<div sl-notice>新版本可用</div>` +
    `</div>`,
};

// the six corners in one stage — position: absolute stands in for
// fixed so the boxes stay inside the demo; real usage pins to the
// viewport edges
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
