import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr } from "../util/axis";

type PlayArgs = { pad: string };

const PADS = ["-", "none", "sm", "md", "lg"];

const meta = {
  args: { pad: "-" },
  argTypes: { pad: axisArg("sl-pad", "內距", PADS) },
} satisfies Meta<PlayArgs>;
export default meta;
type Demo = DemoObj<PlayArgs>;

export const Play: Demo = {
  render: (a = { pad: "-" }) =>
    `<div sl-card${attr("sl-pad", a.pad)}>卡片</div>`,
};

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Cards: Demo = {
  render: () =>
    axis(["none", "sm", "md", "lg"], (v) =>
      frame(
        `sl-pad="${v}"`,
        `<div sl-card${attr("sl-pad", v)} style="width: 9rem">卡片內容</div>`
      )
    ),
};

export const Notices: Demo = {
  render: () =>
    axis(
      ["none", "sm", "md", "lg"],
      (v) =>
        frame(
          `sl-pad="${v}"`,
          `<div sl-notice sl-tone="secondary"${attr("sl-pad", v)}>公告訊息</div>`
        ),
      true
    ),
};
