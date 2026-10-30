import type { Meta, DemoObj } from "../util/types";
import { showMarkup } from "../util/docs-source";
import { axis, axisArg, attr } from "../util/axis";
import { registerPack } from "@sakulime-ui/core/icons";
import lucide from "@iconify-json/lucide/icons.json";

// icon packs are consumer-registered — the package ships the lookup
// machinery only; here the demo feeds it lucide's Iconify JSON
registerPack("lucide", lucide);

type IconArgs = {
  name: string;
  tone: string;
};

const TONES = ["-", "primary", "secondary", "success", "warning", "danger"];
const NAMES = ["zap", "heart", "star", "rocket", "check", "arrow-right", "trash", "plus"];

const meta = {
  title: "Core/Icon 圖示",
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
    name: "zap",
    tone: "-",
  },
  argTypes: {
    name: axisArg("sl-icon", "圖示名稱", "zap", NAMES),
    tone: axisArg("sl-tone", "顏色", "-", TONES),
  },
} satisfies Meta<IconArgs>;

export default meta;
type Demo = DemoObj<IconArgs>;

export const Icon: Demo = {
  render: (args) =>
    `<i sl-icon="lucide:${args.name}"${attr("sl-tone", args.tone)}></i>`,
};

export const Tones: Demo = {
  render: () =>
    axis(TONES, (v) => `<i sl-icon="lucide:zap"${attr("sl-tone", v)}></i>`),
};

// 1em — the icon tracks the font-size of whatever it sits inside
const SIZES = [14, 16, 20, 28];
export const Sizes: Demo = {
  render: () =>
    axis(SIZES, (v) =>
      `<span style="font-size: ${v}px"><i sl-icon="lucide:zap"></i> ${v}px</span>`,
    ),
};

// mid-sentence — the icon rides the text baseline
export const Inline: Demo = {
  render: () =>
    `<p>狀態 <i sl-icon="lucide:zap" sl-tone="success"></i> 正常，` +
    `點 <i sl-icon="lucide:arrow-right"></i> 看詳細內容。</p>`,
};

// icons inside real components inherit their ink
export const InContext: Demo = {
  render: () =>
    axis(["plus", "trash"], (v) =>
      `<button sl-button${v === "trash" ? '="invert" sl-tone="danger"' : ""}>` +
      `<i sl-icon="lucide:${v}"></i> ${v === "trash" ? "刪除" : "新增"}` +
      `</button>`,
    ),
};

// card + corner + icon — the corner's tone colors the badge icon,
// and a plain icon in the title just rides the heading ink
export const InCard: Demo = {
  render: () =>
    `<div sl-card style="width: 300px">` +
    `<span sl-card-corner="end indicator" sl-tone="success"><i sl-icon="lucide:zap"></i></span>` +
    `<strong><i sl-icon="lucide:rocket"></i> 功能上線</strong>` +
    `<p>角落標記與標題都能直接放圖示。</p></div>`,
};
