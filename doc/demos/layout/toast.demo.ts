import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

// position overridden to static — a live fixed container would pin to the
// real viewport; what matters here is the width and the stacking gap
export const Toast: Demo = {
  render: () =>
    `<div sl-toast style="position: static">` +
    `<div sl-notice sl-tone="success">已儲存變更</div>` +
    `<div sl-notice>新版本可用</div>` +
    `</div>`,
};
