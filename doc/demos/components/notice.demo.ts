import type { Meta, DemoObj } from "../util/types";
import { showMarkup } from "../util/docs-source";
import { axis, axisArg, attr, label } from "../util/axis";
import "../util/icons";

type NoticeArgs = {
  tone: string;
  variant: string;
  pad: string;
  radius: string;
};

const TONES = ["-", "primary", "secondary", "success", "warning", "danger"];
const VARIANTS = ["-", "fit"];
const PADS = ["-", "sm", "md", "lg"];
const RADII = ["-", "sm", "md", "lg", "full", "none"];

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
  },
  argTypes: {
    tone: axisArg("sl-tone", "顏色", "-", TONES),
    variant: axisArg("sl-notice", "寬度", "-", VARIANTS),
    pad: axisArg("sl-pad", "厚度", "-", PADS),
    radius: axisArg("sl-radius", "圓角", "-", RADII),
  },
} satisfies Meta<NoticeArgs>;

export default meta;
type Demo = DemoObj<NoticeArgs>;

// marker values: "-" means the bare attribute, not an absent one
const marker = (v: string) => (v === "-" ? "sl-notice" : `sl-notice="${v}"`);

const BODY = `<i sl-icon="lucide:info"></i> 系統將於 11/2 02:00–03:00 例行維護`;

export const Notice: Demo = {
  render: (a) =>
    `<div ${marker(a.variant)}${attr("sl-tone", a.tone)}${attr("sl-pad", a.pad)}${attr("sl-radius", a.radius)}>${BODY}</div>`,
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

// sl-notice-action pushes trailing controls to the far edge —
// a dismiss button or a cta link; the dismiss itself is consumer code
export const WithAction: Demo = {
  render: () =>
    `<div sl-notice sl-tone="danger">` +
    `<i sl-icon="lucide:octagon-alert"></i>` +
    `部署失敗：Build #423 在 migrate 階段逾時。` +
    `<a href="#">查看記錄</a>` +
    `<button sl-button="ghost" sl-size="sm" sl-notice-action aria-label="關閉"><i sl-icon="lucide:x"></i></button>` +
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
