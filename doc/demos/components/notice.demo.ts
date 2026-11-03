import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr, TONES, mark } from "../util/axis";
import "../util/icons";

type NoticeArgs = {
  tone: string;
  variant: string;
  pad: string;
  radius: string;
  align: string;
  interactive: string;
};

type ActionArgs = { action: string; variant: string };
type BannerArgs = {
  variant: string;
  icon: string;
  lines: string;
  align: string;
  action: string;
};
type ToastArgs = { count: string; variant: string };

const VARIANTS = ["-", "fit"];
const PADS = ["-", "sm", "md", "lg"];
const RADII = ["-", "sm", "md", "lg", "full", "none"];
const ALIGNS = ["-", "start", "center", "end"];
const ACTIONS = ["-", "end", "start", "both"];
const INTERACTIVES = ["-", "grow", "lift", "shadow", "press", "dim"];

const meta = {
  args: {
    tone: "-",
    variant: "-",
    pad: "-",
    radius: "-",
    align: "-",
    interactive: "-",
  },
  argTypes: {
    tone: axisArg("sl-tone", "顏色", TONES),
    variant: axisArg("sl-notice", "寬度", VARIANTS),
    pad: axisArg("sl-pad", "內距", PADS),
    radius: axisArg("sl-radius", "圓角", RADII),
    align: axisArg("sl-notice-align", "對齊", ALIGNS),
    interactive: axisArg("sl-interactive", "互動效果", INTERACTIVES),
  },
} satisfies Meta<NoticeArgs>;

export default meta;
type Demo = DemoObj<NoticeArgs>;

const marker = mark("sl-notice");

const BODY = `<i sl-icon="lucide:info"></i> 系統將於 11月2日 02:00–03:00 例行維護`;

export const Notice: Demo = {
  render: (a) =>
    `<div ${marker(a.variant)}${attr("sl-tone", a.tone)}${attr("sl-pad", a.pad)}${attr("sl-radius", a.radius)}${attr("sl-notice-align", a.align)}${attr("sl-interactive", a.interactive)}>${BODY}</div>`,
};

export const Widths: Demo = {
  render: () =>
    axis(
      ["-", "fit"],
      (v) =>
        `<div ${marker(v)} sl-tone="success"><i sl-icon="lucide:check"></i> ${v === "-" ? "滿版" : "內容寬"}</div>`,
      true,
    ),
};

const ALIGN_LABEL: Record<string, string> = {
  "-": "靠左（預設）",
  start: "靠左",
  center: "置中",
  end: "靠右",
};
export const Aligns: Demo = {
  render: () =>
    axis(
      ["-", "start", "center", "end"],
      (v) =>
        `<div sl-notice sl-tone="secondary"${attr("sl-notice-align", v)}><i sl-icon="lucide:info"></i> ${ALIGN_LABEL[v]}的訊息</div>`,
      true,
    ),
};

const X_BTN = `<button sl-button="ghost" sl-size="sm" sl-notice--action aria-label="關閉"><i sl-icon="lucide:x" sl-icon-size="lg"></i></button>`;
const BELL_BTN = `<button sl-button="ghost" sl-size="sm" sl-notice--action="start" aria-label="靜音"><i sl-icon="lucide:bell-off" sl-icon-size="lg"></i></button>`;
const startBtn = (a: string) => (a === "start" || a === "both" ? BELL_BTN : "");
const endBtn = (a: string) => (a === "end" || a === "both" ? X_BTN : "");

export const ActionPlay: DemoObj<ActionArgs> = {
  args: { action: "both", variant: "-" },
  argTypes: {
    action: axisArg("sl-notice--action", "位置（both 僅供示範，代表同時標兩側）", ACTIONS),
    variant: axisArg("sl-notice", "寬度", VARIANTS),
  },
  render: (a) =>
    `<div ${marker(a.variant)} sl-tone="warning">` +
    startBtn(a.action) +
    `排程維護將於 30 分鐘後開始` +
    endBtn(a.action) +
    `</div>`,
};

const LONG =
  "系統將於 11月2日 02:00–03:00 進行例行維護，期間 API 回應可能延遲，寫入操作會排入佇列，並於維護結束後自動重新執行，若有長時間執行中的工作請提前儲存。維護完成後會以浮動通知確認，期間如有異常請回報值班工程師。";

export const BannerPlay: DemoObj<BannerArgs> = {
  args: { variant: "-", icon: "有", lines: "單行", align: "-", action: "-" },
  argTypes: {
    variant: axisArg("sl-notice", "寬度", VARIANTS),
    icon: {
      name: "圖示",
      description: "無圖示時文字自邊緣開始",
      control: { type: "select" as const },
      options: ["有", "無"],
    },
    lines: {
      name: "內容",
      description: "多行內容的換行表現",
      control: { type: "select" as const },
      options: ["單行", "多行"],
    },
    align: axisArg("sl-notice-align", "對齊", ALIGNS),
    action: axisArg("sl-notice--action", "動作位置（both 僅供示範，代表同時標兩側）", ACTIONS),
  },
  render: (a) => {
    const text = a.lines === "多行" ? LONG : "排程維護將於 30 分鐘後開始";
    const icon = a.icon === "無" ? "" : `<i sl-icon="lucide:triangle-alert"></i> `;
    return (
      `<div ${marker(a.variant)} sl-tone="warning"${attr("sl-notice-align", a.align)}>` +
      startBtn(a.action) +
      icon +
      text +
      endBtn(a.action) +
      `</div>`
    );
  },
};

const TOASTS = [
  ["success", "check", "已儲存變更"],
  ["warning", "triangle-alert", "部署已排入佇列，前方還有 2 個建置"],
  ["-", "bell", `功能更新已上線 <a href="#">查看詳情</a>`],
];

export const ToastPlay: DemoObj<ToastArgs> = {
  args: { count: "3", variant: "-" },
  argTypes: {
    count: {
      name: "數量",
      description: "容器中的通知則數",
      control: { type: "select" as const },
      options: ["1", "2", "3"],
    },
    variant: axisArg("sl-notice", "寬度", VARIANTS),
  },
  render: (a) =>
    `<div sl-float style="position: static">` +
    TOASTS.slice(0, Number(a.count))
      .map(
        ([tone, icon, body]) =>
          `<div ${marker(a.variant)}${attr("sl-tone", tone)}><i sl-icon="lucide:${icon}"></i> ${body}</div>`,
      )
      .join("") +
    `</div>`,
};
