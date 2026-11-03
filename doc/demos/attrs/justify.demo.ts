import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr } from "../util/axis";

type PlayArgs = { justify: string };

const JUSTIFIES = ["-", "start", "center", "end", "between", "around", "evenly"];

const meta = {
  args: { justify: "-" },
  argTypes: { justify: axisArg("sl-justify", "主軸對齊", JUSTIFIES) },
} satisfies Meta<PlayArgs>;
export default meta;
type Demo = DemoObj<PlayArgs>;

export const Play: Demo = {
  render: (a = { justify: "-" }) =>
    `<div sl-wrap${attr("sl-justify", a.justify)}>` + cells() + `</div>`,
};

const cells = (n = 3) =>
  Array.from({ length: n }, (_, i) => `<div class="demo-cell">項目 ${i + 1}</div>`).join("");

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Justify: Demo = {
  render: () =>
    axis(["start", "center", "end", "between", "around", "evenly"], (v) =>
      frame(
        `sl-justify="${v}"`,
        `<div sl-wrap sl-justify="${v}" style="width: 20rem">${cells()}</div>`
      )
    ),
};
