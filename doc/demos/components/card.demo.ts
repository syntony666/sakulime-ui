import type { Meta, DemoObj } from "../util/types";
import { showMarkup } from "../util/docs-source";
import { axis, axisArg, attr, boolArg, label } from "../util/axis";
import { registerPack } from "@sakulime-ui/core/icons";
import lucide from "@iconify-json/lucide/icons.json";

// icon packs are consumer-registered — the package ships the lookup
// machinery only; here the demo feeds it lucide's Iconify JSON
registerPack("lucide", lucide);

type CardArgs = {
  pad: string;
  radius: string;
  variant: string;
  indicate: string;
  tone: string;
  interactive: string;
};

type CornerArgs = {
  position: string;
  type: string;
  tone: string;
};

type SectionArgs = {
  inset: string;
  corner: boolean;
  pad: string;
};

const PADS = ["-", "sm", "md", "lg"];
const RADII = ["-", "none", "sm", "md", "lg"];
const VARIANTS = ["-", "hollow", "plain", "blank"];
const INDICATES = ["-", "top", "bottom", "start", "end"];
const CORNERS = ["-", "start", "end"];
const CORNER_TYPES = ["-", "text-xs", "text-sm", "indicator"];
const TONES = ["-", "primary", "secondary", "success", "warning", "danger"];
const INTERACTIVES = ["-", "grow", "lift", "raise", "press"];
const INSETS = ["-", "top", "middle", "bottom"];

const meta = {
  title: "Core/Card 卡片",
  // demos feed the md page; hide them from the sidebar
  tags: ["!dev"],
  parameters: {
    docs: {
      // opt back into the TOC (disabled globally for prose pages)
      toc: { disable: false },
      source: {
        // evaluated markup, not the .map() render source
        type: "dynamic",
        transform: showMarkup,
      },
    },
  },
  args: {
    pad: "-",
    radius: "-",
    variant: "-",
    indicate: "-",
    tone: "-",
    interactive: "-",
  },
  argTypes: {
    pad: axisArg("sl-pad", "內距", "md", PADS),
    radius: axisArg("sl-radius", "圓角", "md", RADII),
    variant: axisArg("sl-card", "型態", "-", VARIANTS),
    indicate: axisArg("sl-card-indicate", "標記邊緣", "-", INDICATES),
    tone: axisArg("sl-tone", "顏色（搭配標記）", "primary", TONES),
    interactive: axisArg("sl-interactive", "互動（滑鼠移過去）", "grow", INTERACTIVES),
  },
} satisfies Meta<CardArgs>;

export default meta;
type Demo = DemoObj<CardArgs>;

const card = (attrs: string, content: string, w = 320) =>
  `<div sl-card${attrs} style="width: ${w}px">${content}</div>`;

// the marker itself carries the variant value — bare = default frame
const cardMarker = (v: string) => (v === "-" ? "sl-card" : `sl-card="${v}"`);

const vcard = (v: string, content: string, w = 320) =>
  `<div ${cardMarker(v)} style="width: ${w}px">${content}</div>`;

// shared content parts — playground cards and section demos
const sec = (inner: string) => `<div sl-card-section>${inner}</div>`;
const media = `<div sl-card-section="inset" class="demo-media"></div>`;
const TITLE = `<strong>卡片標題</strong><p>卡片內容文字，描述這張卡片在展示什麼。</p>`;
const FOOT = `<small>底部資訊</small>`;

// one card per axis value
const byAxis = (name: string) => (v: string) =>
  card(attr(name, v), `<strong>${label(v)}</strong><p>內容文字</p>`);

export const Card: Demo = {
  render: (args) =>
    `<div ${cardMarker(args.variant)}` +
    attr("sl-pad", args.pad) +
    attr("sl-radius", args.radius) +
    attr("sl-card-indicate", args.indicate) +
    attr("sl-tone", args.tone) +
    attr("sl-interactive", args.interactive) +
    ` style="max-width: 360px">` +
    `<div>${TITLE}</div>` +
    `</div>`,
};

export const Pads: Demo = {
  render: () => axis(PADS, byAxis("sl-pad")),
};

export const Radius: Demo = {
  render: () => axis(RADII, byAxis("sl-radius")),
};

export const Variants: Demo = {
  render: () =>
    axis(VARIANTS, (v) => vcard(v, `<strong>${label(v)}</strong><p>內容文字</p>`)),
};

// position axis — the tone axis lives on Indicated in the tone section
export const Indicates: Demo = {
  render: () =>
    axis(["top", "bottom", "start", "end"], (v) =>
      card(
        attr("sl-card-indicate", v) + attr("sl-tone", "secondary"),
        `<strong>${label(v)}</strong><p>內容文字</p>`,
      ),
    ),
};

export const Indicated: Demo = {
  render: () =>
    axis(TONES, (v) =>
      card(
        attr("sl-card-indicate", "start") + attr("sl-tone", v),
        `<strong>${label(v)}</strong><p>內容文字</p>`,
      ),
    ),
};

// hover affordances — one card per axis value; "-" shows a static card
export const Interactive: Demo = {
  render: () =>
    axis(INTERACTIVES, (v) =>
      card(
        attr("sl-interactive", v),
        `<strong>${label(v)}</strong><p>滑鼠移過去看效果</p>`,
      ),
    ),
};

export const InteractiveLink: Demo = {
  render: () =>
    `<a sl-card sl-interactive href="#" style="width: 320px">` +
    `<strong>可點卡片</strong><p>整張卡片是一個連結，滑鼠移過去會放大。</p></a>`,
};

// position and type tokens merge into the corner's single attr value
export const Corner: DemoObj<CornerArgs> = {
  args: { position: "-", type: "-", tone: "-" },
  argTypes: {
    position: axisArg("sl-card-corner", "位置", "end", ["-", "start", "end"]),
    type: axisArg("sl-card-corner", "類型", "text-sm", CORNER_TYPES),
    tone: axisArg("sl-tone", "顏色", "primary", TONES),
  },
  render: (args) => {
    const v = [args.position, args.type].filter((t) => t !== "-").join(" ");
    const inner =
      args.type === "indicator" ? `<i sl-icon="lucide:zap"></i>` : "100ms";
    return (
      `<div sl-card style="max-width: 360px">` +
      `<span sl-card-corner${v ? `="${v}"` : ""}${attr("sl-tone", args.tone)}>${inner}</span>` +
      `<strong>卡片標題</strong><p>卡片內容文字，描述這張卡片在展示什麼。</p></div>`
    );
  },
};

export const CornerPositions: Demo = {
  render: () =>
    axis(CORNERS, (v) =>
      card(
        attr("sl-tone", "secondary"),
        (v !== "-" ? `<span sl-card-corner="${v}">NEW</span>` : "") +
          `<strong>${label(v)}</strong><p>內容文字</p>`,
      ),
    ),
};

export const CornerTypes: Demo = {
  render: () =>
    axis(CORNER_TYPES, (v) =>
      card(
        attr("sl-tone", "success"),
        (v !== "-"
          ? `<span sl-card-corner="end ${v}">100ms</span>` +
            (v === "indicator"
              ? `<span sl-card-corner="start indicator"><i sl-icon="lucide:zap"></i></span>`
              : "")
          : "") + `<strong>${label(v)}</strong><p>內容文字</p>`,
      ),
    ),
};

// bare sections — header/content/footer hairlines without inset media;
// content stays inline like the fence example (a lone <p> would carry
// browser margins and sit visibly low in the section)
export const BasicSections: Demo = {
  render: () =>
    card("", [sec(`<strong>標題</strong>`), sec(`內容`), sec(FOOT)].join(""), 320),
};

// carries its own args/argTypes so the md can bind it as a standalone
// playground (story doubles as the Playground meta prop)
export const Sections: DemoObj<SectionArgs> = {
  args: { inset: "top", corner: false, pad: "-" },
  argTypes: {
    inset: axisArg('sl-card-section="inset"', "貼邊區塊位置", "-", INSETS),
    corner: boolArg("sl-card-corner", "角落標記（疊在貼邊內容上）"),
    pad: axisArg("sl-pad", "內距", "md", PADS),
  },
  render: (args) => {
    const parts =
      args.inset === "top"
        ? [media, sec(TITLE), sec(FOOT)]
        : args.inset === "middle"
          ? [sec(TITLE), media, sec(FOOT)]
          : args.inset === "bottom"
            ? [sec(TITLE), sec(FOOT), media]
            : [sec(TITLE), sec(FOOT)];
    return card(
      attr("sl-pad", args.pad),
      (args.corner ? `<span sl-card-corner="end text-sm">200ms</span>` : "") +
        parts.join(""),
      360,
    );
  },
};

export const Insets: Demo = {
  render: () =>
    axis(["top", "middle", "bottom"], (v) => {
      const text = `<div sl-card-section><strong>${label(v)}</strong><p>內容</p></div>`;
      const parts =
        v === "top" ? [media, text] : v === "bottom" ? [text, media] : [text, media, text];
      return card("", parts.join(""), 240);
    }),
};

// blank — borderless centered block; the shell variant picks the frame
export const Blank: Demo = {
  render: () =>
    axis(["-", "hollow", "blank"], (v) =>
      vcard(
        v,
        `<div sl-card-section="blank">` +
          `<strong>${v === "hollow" ? "上傳檔案" : v === "blank" ? "查無結果" : "沒有內容"}</strong>` +
          `<p>${v === "hollow" ? "拖拉檔案至此" : "說明文字"}</p>` +
          (v === "-" ? `<button sl-button>建立</button>` : "") +
          `</div>`,
        200,
      ),
    ),
};

// section value axis — emphasis, selected state, hover, alignment
export const SectionKinds: Demo = {
  render: () =>
    card(
      "",
      [
        sec(`預設區塊`),
        `<div sl-card-section="secondary">secondary：次要內容</div>`,
        `<div sl-card-section="active">active：目前選取</div>`,
        `<div sl-card-section="center">center：文字置中</div>`,
      ].join(""),
      320,
    ),
};
