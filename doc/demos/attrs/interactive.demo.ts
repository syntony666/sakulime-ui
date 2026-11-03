import type { Meta, DemoObj } from "../util/types";
import { axis, axisArg, attr } from "../util/axis";

type PlayArgs = { interactive: string };

const INTERACTIVES = ["-", "grow", "lift", "shadow", "press", "dim"];

const meta = {
  args: { interactive: "-" },
  argTypes: {
    interactive: axisArg("sl-interactive", "互動效果", INTERACTIVES),
  },
} satisfies Meta<PlayArgs>;
export default meta;
type Demo = DemoObj<PlayArgs>;

export const Play: Demo = {
  render: (a = { interactive: "-" }) =>
    `<div sl-card${attr("sl-interactive", a.interactive)}>滑鼠移入</div>`,
};

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

export const Interactive: Demo = {
  render: () =>
    axis(["-", "grow", "lift", "shadow", "press", "dim"], (v) =>
      frame(
        v === "-" ? "未標示" : `sl-interactive="${v}"`,
        `<div sl-card${attr("sl-interactive", v)} style="width: 7rem; text-align: center">滑鼠移入</div>`
      )
    ),
};
