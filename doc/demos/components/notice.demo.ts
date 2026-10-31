import type { Meta, DemoObj } from "../util/types";
import { showMarkup } from "../util/docs-source";
import { axis, axisArg, attr, label } from "../util/axis";
import "../util/icons";

type NoticeArgs = {
  tone: string;
  variant: string;
  pad: string;
  radius: string;
  align: string;
  action: string;
};

const TONES = ["-", "primary", "secondary", "success", "warning", "danger"];
const VARIANTS = ["-", "fit"];
const PADS = ["-", "sm", "md", "lg"];
const RADII = ["-", "sm", "md", "lg", "full", "none"];
const ALIGNS = ["-", "end"];
const ACTIONS = ["-", "end", "start", "both"];

const meta = {
  title: "Core/Notice 通知",
  tags: ["!dev"],
  parameters: {
    docs: {
      toc: { disable: false },
      source: {
        type: "dynamic",
        transform: showMarkup,
      },
    },
  },
  args: {
    tone: "-",
    variant: "-",
    pad: "-",
    radius: "-",
    align: "-",
  },
  argTypes: {
    tone: axisArg("sl-tone", "顏色", "-", TONES),
    variant: axisArg("sl-notice", "寬度", "-", VARIANTS),
    pad: axisArg("sl-pad", "厚度", "-", PADS),
    radius: axisArg("sl-radius", "圓角", "-", RADII),
    align: axisArg("sl-notice-align", "對齊", "-", ALIGNS),
  },
} satisfies Meta<NoticeArgs>;

export default meta;
type Demo = DemoObj<NoticeArgs>;

// marker values: "-" means the bare attribute, not an absent one
const marker = (v: string) => (v === "-" ? "sl-notice" : `sl-notice="${v}"`);

const BODY = `<i sl-icon="lucide:info"></i> 系統將於 11/2 02:00–03:00 例行維護`;

export const Notice: Demo = {
  render: (a) =>
    `<div ${marker(a.variant)}${attr("sl-tone", a.tone)}${attr("sl-pad", a.pad)}${attr("sl-radius", a.radius)}${attr("sl-notice-align", a.align)}>${BODY}</div>`,
};

export const Tones: Demo = {
  render: () =>
    axis(
      TONES,
      (v) =>
        `<div sl-notice${attr("sl-tone", v)}><i sl-icon="lucide:info"></i> ${label(v)} 通知訊息</div>`,
      true,
    ),
};

// fill (default) vs fit — the only width concern the component owns
export const Widths: Demo = {
  render: () =>
    axis(
      ["-", "fit"],
      (v) =>
        `<div ${marker(v)} sl-tone="success"><i sl-icon="lucide:check"></i> ${v === "-" ? "全寬" : "內容寬"}</div>`,
      true,
    ),
};

// no icon — text starts flush at the padding edge, the flex gap
// only exists between items
export const NoIcon: Demo = {
  render: () =>
    axis(["-", "fit"], (v) =>
      `<div ${marker(v)} sl-tone="secondary">${v === "-" ? "全寬" : "內容寬"}純文字通知</div>`,
      true,
    ),
};

export const Pads: Demo = {
  render: () =>
    axis(
      PADS,
      (v) =>
        `<div sl-notice sl-tone="warning"${attr("sl-pad", v)}>${label(v)} 厚度</div>`,
      true,
    ),
};

export const Radius: Demo = {
  render: () =>
    axis(
      RADII,
      (v) =>
        `<div sl-notice sl-tone="secondary"${attr("sl-radius", v)}>${label(v)} 圓角</div>`,
      true,
    ),
};

// sl-notice-align moves the copy, not the frame — "end" parks it at
// the trailing edge (no visible effect under fit, nothing to push)
export const Aligns: Demo = {
  render: () =>
    axis(
      ["-", "end"],
      (v) =>
        `<div sl-notice sl-tone="secondary"${attr("sl-notice-align", v)}><i sl-icon="lucide:info"></i> ${v === "-" ? "靠左（預設）" : "靠右"}的訊息</div>`,
      true,
    ),
};

// action playground for the 子元素 section — placement × width
const X_BTN = `<button sl-button="ghost" sl-size="sm" sl-notice-action aria-label="關閉"><i sl-icon="lucide:x" sl-icon-size="lg"></i></button>`;
const BELL_BTN = `<button sl-button="ghost" sl-size="sm" sl-notice-action="start" aria-label="靜音"><i sl-icon="lucide:bell-off" sl-icon-size="lg"></i></button>`;

export const ActionMeta = {
  args: { action: "both", variant: "-" },
  argTypes: {
    action: axisArg("sl-notice-action", "位置", "both", ACTIONS),
    variant: axisArg("sl-notice", "寬度", "-", VARIANTS),
  },
};

export const ActionPlay: Demo = {
  render: (a) =>
    `<div ${marker(a.variant)} sl-tone="warning">` +
    (a.action === "start" || a.action === "both" ? BELL_BTN : "") +
    `排程維護將於 30 分鐘後開始` +
    (a.action === "end" || a.action === "both" ? X_BTN : "") +
    `</div>`,
};

// sl-notice-action sits at the trailing edge in both widths — fill
// pushes it to the container edge, fit keeps it at the content end;
// a spacer slot guarantees air before it either way. the dismiss
// itself is consumer code
export const WithAction: Demo = {
  render: () =>
    `<div class="demo-stack">` +
    `<div sl-notice sl-tone="danger">` +
    `<i sl-icon="lucide:octagon-alert"></i>` +
    `部署失敗：Build #423 在 migrate 階段逾時。` +
    `<a href="#">查看記錄</a>` +
    `<button sl-button="ghost" sl-size="sm" sl-notice-action aria-label="關閉"><i sl-icon="lucide:x" sl-icon-size="lg"></i></button>` +
    `</div>` +
    `<div sl-notice="fit" sl-tone="success">` +
    `<i sl-icon="lucide:check"></i>` +
    `已儲存變更` +
    `<button sl-button="ghost" sl-size="sm" sl-notice-action aria-label="關閉"><i sl-icon="lucide:x" sl-icon-size="lg"></i></button>` +
    `</div>` +
    `<div sl-notice sl-tone="warning">` +
    `<button sl-button="ghost" sl-size="sm" sl-notice-action="start" aria-label="靜音"><i sl-icon="lucide:bell-off" sl-icon-size="lg"></i></button>` +
    `排程維護將於 30 分鐘後開始` +
    `<button sl-button="ghost" sl-size="sm" sl-notice-action aria-label="關閉"><i sl-icon="lucide:x" sl-icon-size="lg"></i></button>` +
    `</div>` +
    `</div>`,
};

// long copy wraps inside the capsule — writing the icon inside a
// text element keeps it inline in the paragraph (wraps flow full
// width under it); a direct-child icon stays its own column item
const LONG =
  "系統將於 11/2 02:00–03:00 進行例行維護，期間 API 回應可能延遲，寫入操作會排入佇列，並於維護結束後自動重放，若有長時間執行中的工作請提前儲存。維護完成後會以浮動通知確認，期間如有異常請回報值班工程師。";

export const Multiline: Demo = {
  render: () =>
    `<div class="demo-stack">` +
    `<div sl-notice sl-tone="primary"><span><i sl-icon="lucide:info"></i> ${LONG}</span></div>` +
    `<div sl-notice sl-tone="warning"><span><i sl-icon="lucide:triangle-alert"></i> ${LONG}</span>` +
    `<button sl-button="ghost" sl-size="sm" sl-notice-action aria-label="關閉"><i sl-icon="lucide:x" sl-icon-size="lg"></i></button>` +
    `</div>` +
    `<div sl-notice sl-notice-align="end" sl-tone="secondary"><span><i sl-icon="lucide:info"></i> ${LONG}</span></div>` +
    `</div>`,
};

// toast is just a notice in a consumer-fixed wrapper — placement
// (corner, stacking, timeout) is consumer CSS, not this package.
// .demo-toast mimics a corner stack inside the demo frame
export const AsToast: Demo = {
  render: () =>
    `<div class="demo-toast">` +
    `<div sl-notice sl-tone="success"><i sl-icon="lucide:check"></i> 已儲存變更</div>` +
    `<div sl-notice sl-tone="warning"><i sl-icon="lucide:triangle-alert"></i> 部署已排入佇列，前方還有 2 個 build</div>` +
    `<div sl-notice="fit"><i sl-icon="lucide:bell"></i> 新版本 v0.3.1 可用 <a href="#">查看更新</a></div>` +
    `</div>`,
};
