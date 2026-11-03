import type { Meta, DemoObj } from "../util/types";
import { axis, attr } from "../util/axis";

const meta = {
} satisfies Meta;

export default meta;
type Demo = DemoObj;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

const box = (attr: string) =>
  `<div ${attr} class="demo-frame"><span data-demo>${attr} <span class="demo-w"></span></span></div>`;

export const ContainerWidths: Demo = {
  render: () =>
    [box("sl-container"), ...["sm", "md", "lg"].map((v) => box(`sl-container="${v}"`))].join(""),
};

export const Pads: Demo = {
  render: () =>
    axis(
      ["-", "none", "sm", "md", "lg"],
      (v) =>
        frame(
          v === "-" ? "未標示 → 預設 md" : `sl-pad="${v}"`,
          `<div sl-container${attr("sl-pad", v)} style="border: 1px dashed var(--sl-border)">` +
            `<div class="demo-cell">內容區塊</div>` +
            `</div>`
        ),
      true
    ),
};

export const Widths: Demo = {
  render: () =>
    axis(
      ["sm", "md", "lg"],
      (v) =>
        frame(
          `sl-container="${v}"`,
          `<div style="background: var(--sl-secondary-bg)">` +
            `<div sl-container="${v}" class="demo-frame">` +
            `<span data-demo>內容區塊</span>` +
            `</div></div>`
        ),
      true
    ),
};
