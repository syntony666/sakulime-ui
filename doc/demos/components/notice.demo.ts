import type { Meta, DemoObj } from "../util/types";
import { showMarkup } from "../util/docs-source";
import { axis, axisArg, attr, label, TONES, mark } from "../util/axis";
import "../util/icons";

type NoticeArgs = {
  tone: string;
  variant: string;
  pad: string;
  radius: string;
  align: string;
  action: string;
  icon: string;
  count: string;
  lines: string;
};

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


const marker = mark("sl-notice");

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

// long copy wraps inside the capsule — the icon is inline content,
// so wrapped lines flow full width under it
const LONG =
  "系統將於 11/2 02:00–03:00 進行例行維護，期間 API 回應可能延遲，寫入操作會排入佇列，並於維護結束後自動重放，若有長時間執行中的工作請提前儲存。維護完成後會以浮動通知確認，期間如有異常請回報值班工程師。";

// banner playground — a bare notice in document flow; controls cover
// width, icon on/off, single vs wrapped lines, and end alignment.
// the icon is ordinary inline content — no wrapper needed
export const BannerMeta = {
  args: { variant: "-", icon: "有", lines: "單行", align: "-", action: "-" },
  argTypes: {
    variant: axisArg("sl-notice", "寬度", "-", VARIANTS),
    icon: {
      name: "圖示",
      description: "無 icon 文字從邊緣起頭",
      control: { type: "select" as const },
      options: ["有", "無"],
    },
    lines: {
      name: "內容",
      description: "切多行看折行行為",
      control: { type: "select" as const },
      options: ["單行", "多行"],
    },
    align: axisArg("sl-notice-align", "對齊", "-", ALIGNS),
    action: axisArg("sl-notice-action", "動作", "-", ACTIONS),
  },
};

export const BannerPlay: Demo = {
  render: (a) => {
    const text = a.lines === "多行" ? LONG : "排程維護將於 30 分鐘後開始";
    const icon = a.icon === "無" ? "" : `<i sl-icon="lucide:triangle-alert"></i> `;
    return (
      `<div ${marker(a.variant)} sl-tone="warning"${attr("sl-notice-align", a.align)}>` +
      (a.action === "start" || a.action === "both" ? BELL_BTN : "") +
      icon +
      text +
      (a.action === "end" || a.action === "both" ? X_BTN : "") +
      `</div>`
    );
  },
};

// toast playground — the consumer owns the container (.demo-toast);
// stacking N notices in it, per-notice width is the only sl-side knob
const TOASTS = [
  ["success", "check", "已儲存變更"],
  ["warning", "triangle-alert", "部署已排入佇列，前方還有 2 個 build"],
  ["-", "bell", `新版本 v0.3.1 可用 <a href="#">查看更新</a>`],
];

export const ToastMeta = {
  args: { count: "3", variant: "-" },
  argTypes: {
    count: {
      name: "數量",
      description: "容器裡的通知條數",
      control: { type: "select" as const },
      options: ["1", "2", "3"],
    },
    variant: axisArg("sl-notice", "寬度", "-", VARIANTS),
  },
};

export const ToastPlay: Demo = {
  render: (a) =>
    `<div class="demo-toast">` +
    TOASTS.slice(0, Number(a.count))
      .map(
        ([tone, icon, body]) =>
          `<div ${marker(a.variant)}${attr("sl-tone", tone)}><i sl-icon="lucide:${icon}"></i> ${body}</div>`,
      )
      .join("") +
    `</div>`,
};
