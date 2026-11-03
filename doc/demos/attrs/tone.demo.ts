import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr, TONES } from "../util/axis";

type PlayArgs = { tone: string };

const meta = {
  args: { tone: "-" },
  argTypes: { tone: axisArg("sl-tone", "色調", TONES) },
} satisfies Meta<PlayArgs>;
export default meta;
type Demo = DemoObj<PlayArgs>;

export const Play: Demo = {
  render: (a = { tone: "-" }) =>
    `<button sl-button${attr("sl-tone", a.tone)}>按鈕</button>`,
};

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Tones: Demo = {
  render: () =>
    axis(TONES, (v) =>
      frame(
        v === "-" ? "未標示" : `sl-tone="${v}"`,
        `<button sl-button${attr("sl-tone", v)}>按鈕</button>`
      )
    ),
};
