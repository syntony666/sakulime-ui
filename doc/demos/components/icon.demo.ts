import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr, boolArg, label, TONES } from "../util/axis";
import "../util/icons";

type IconArgs = {
  name: string;
  tone: string;
  size: string;
  flip: string;
  rotate: string;
  spin: boolean;
  frame: string;
  disabled: boolean;
  space: string;
};

const NAMES = ["star", "zap", "heart", "rocket", "check", "arrow-right", "trash", "plus"];

const meta = {
  args: {
    name: "star",
    tone: "-",
    size: "-",
    flip: "-",
    rotate: "-",
    spin: false,
    frame: "-",
    disabled: false,
    space: "-",
  },
  argTypes: {
    name: axisArg("sl-icon", "圖示名稱", NAMES),
    tone: axisArg("sl-tone", "顏色", TONES),
    size: axisArg("sl-icon-size", "尺寸", ["-", "sm", "lg", "xl", "2xl"]),
    flip: axisArg("sl-icon-flip", "翻轉", ["-", "horizontal", "vertical"]),
    rotate: axisArg("sl-icon-rotate", "旋轉", ["-", "90", "180", "270"]),
    spin: boolArg("sl-icon-spin", "旋轉動畫"),
    frame: axisArg("sl-icon-frame", "外框", ["-", "circular", "rounded"]),
    disabled: boolArg("sl-icon-disabled", "淡化"),
    space: axisArg("sl-icon-space", "間距（both＝裸寫屬性，兩側都加）", ["-", "start", "end", "both"]),
  },
} satisfies Meta<IconArgs>;

export default meta;
type Demo = DemoObj<IconArgs>;

export const Icon: Demo = {
  render: (args) =>
    `<i sl-icon="lucide:${args.name}"` +
    attr("sl-tone", args.tone) +
    attr("sl-icon-size", args.size) +
    attr("sl-icon-flip", args.flip) +
    attr("sl-icon-rotate", args.rotate) +
    (args.spin ? " sl-icon-spin" : "") +
    attr("sl-icon-frame", args.frame) +
    (args.disabled ? " sl-icon-disabled" : "") +
    (args.space === "both" ? " sl-icon-space" : attr("sl-icon-space", args.space)) +
    `></i>`,
};

// 1em — the icon tracks the font-size of whatever it sits inside
const SIZES = [14, 16, 20, 28];
export const Sizes: Demo = {
  render: () =>
    axis(SIZES, (v) =>
      `<span style="font-size: ${v}px"><i sl-icon="lucide:star"></i> ${v}px</span>`,
    ),
};

// pasted SVG — no JS at all: sl-icon on the svg itself makes it ride
// the text baseline at 1em like the <i> placeholders do
export const Svg: Demo = {
  render: () =>
    `<p>圖示庫複製的 SVG ` +
    `<svg sl-icon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>` +
    ` 貼進來就生效</p>`,
};

// mid-sentence — the icon rides the text baseline
export const Inline: Demo = {
  render: () =>
    `<p>他很壞 <i sl-icon="lucide:megaphone" sl-tone="danger"></i>` +
    `<i sl-icon="lucide:zap"></i><i sl-icon="lucide:zap"></i><i sl-icon="lucide:zap"></i>` +
    ` 嘟<i sl-icon="lucide:arrow-up-right"></i> 嘟<i sl-icon="lucide:arrow-right"></i> 嘟<i sl-icon="lucide:arrow-down-right"></i></p>`,
};

// icons inside real components inherit their ink
export const InContext: Demo = {
  render: () =>
    axis(["plus", "trash"], (v) =>
      `<button sl-button${v === "trash" ? '="outline" sl-tone="danger"' : ""}>` +
      `<i sl-icon="lucide:${v}"></i> ${v === "trash" ? "刪除" : "新增"}` +
      `</button>`,
    ),
};

// modifiers — namespaced attrs alongside the marker; "-" is bare
export const ModSizes: Demo = {
  render: () =>
    axis(["-", "sm", "lg", "xl", "2xl"], (v) =>
      `<span>${label(v)} <i sl-icon="lucide:house"${attr("sl-icon-size", v)}></i></span>`,
    ),
};

// trending-up reads clearly under flips and rotations
export const Transforms: Demo = {
  render: () =>
    axis(
      ["-", "flip-horizontal", "flip-vertical", "rotate-90", "rotate-180", "rotate-270"],
      (v) => {
        const [kind, val] = v.split("-");
        const a =
          kind === "flip" ? attr("sl-icon-flip", val) :
          kind === "rotate" ? attr("sl-icon-rotate", val) : "";
        return `<i sl-icon="lucide:trending-up"${a}></i>`;
      },
    ),
};

export const Spin: Demo = {
  render: () =>
    axis(["loader", "loader-circle", "refresh-cw", "cog"], (v) =>
      `<i sl-icon="lucide:${v}" sl-icon-spin></i>`,
    ),
};

export const Frames: Demo = {
  render: () =>
    axis(["-", "circular", "rounded"], (v) =>
      `<i sl-icon="lucide:house"${attr("sl-icon-frame", v)}></i>`,
    ),
};

export const Disabled: Demo = {
  render: () =>
    axis(["-", "disabled"], (v) =>
      `<i sl-icon="lucide:users"${v === "-" ? "" : " sl-icon-disabled"}></i>`,
    ),
};

// lyric line — each icon sits where its margin side reads naturally:
// mid-phrase takes both sides, a line-end icon only needs start, and
// a word-leading icon only needs end
export const Spaced: Demo = {
  render: () =>
    `<p>喔愛<i sl-icon="lucide:heart" sl-icon-space></i>` +
    `蝦咪喜愛<i sl-icon="lucide:circle-question-mark" sl-icon-space></i><br>` +
    `你跨挖ㄟ<i sl-icon="lucide:eye" sl-icon-space="end"></i>眼神，` +
    `那欸價逆<i sl-icon="lucide:heart" sl-icon-space="start"></i>可愛</p>`,
};

// card + corner + icon — the icon pins itself to the corner and
// sl-tone on it recolors; a plain icon in the title just rides the ink
export const InCard: Demo = {
  render: () =>
    `<div sl-card style="width: 300px">` +
    `<i sl-card--corner sl-icon="lucide:star" sl-tone="success"></i>` +
    `<strong><i sl-icon="lucide:rocket" sl-icon-space="end"></i> 學了一些俄語，我想對大家說</strong>` +
    `<p>noʎ ʇɹnɥ puɐ ǝı̣ן ɐ ןןǝʇ ɐuuoƃ ɹǝʌǝN
ǝʎqpooƃ ʎɐs ɐuuoƃ ɹǝʌǝN
ʎɹɔ noʎ ǝʞɐɯ ɐuuoƃ ɹǝʌǝN
noʎ ʇɹǝsǝp puɐ punoɹɐ unɹ ɐuuoƃ ɹǝʌǝN
uʍop noʎ ʇǝן ɐuuoƃ ɹǝʌǝN
dn noʎ ǝʌı̣ƃ ɐuuoƃ ɹǝʌǝN</p></div>`,
};
