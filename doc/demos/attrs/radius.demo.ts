import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr } from "../util/axis";

type PlayArgs = { radius: string };

const RADII = ["-", "none", "sm", "md", "lg", "full"];

const meta = {
  args: { radius: "-" },
  argTypes: { radius: axisArg("sl-radius", "圓角", RADII) },
} satisfies Meta<PlayArgs>;
export default meta;
type Demo = DemoObj<PlayArgs>;

export const Play: Demo = {
  render: (a = { radius: "-" }) =>
    `<div sl-card${attr("sl-radius", a.radius)}>卡片</div>`,
};

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Radius: Demo = {
  render: () =>
    axis(["none", "sm", "md", "lg", "full"], (v) =>
      frame(
        `sl-radius="${v}"`,
        `<div sl-card${attr("sl-radius", v)} style="width: 9rem; text-align: center">${
          v === "full" ? "卡片<br>第二行<br>第三行" : "卡片"
        }</div>`
      )
    ),
};
