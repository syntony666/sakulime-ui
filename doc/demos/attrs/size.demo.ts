import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr } from "../util/axis";

type PlayArgs = { size: string };

const SIZES = ["-", "sm", "md", "lg"];

const meta = {
  args: { size: "-" },
  argTypes: { size: axisArg("sl-size", "尺寸", SIZES) },
} satisfies Meta<PlayArgs>;
export default meta;
type Demo = DemoObj<PlayArgs>;

export const Play: Demo = {
  render: (a = { size: "-" }) =>
    `<button sl-button${attr("sl-size", a.size)}>按鈕</button>`,
};

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Sizes: Demo = {
  render: () =>
    axis(["sm", "md", "lg"], (v) =>
      frame(
        `sl-size="${v}"`,
        `<button sl-button${attr("sl-size", v)}>按鈕</button>`
      )
    ),
};
