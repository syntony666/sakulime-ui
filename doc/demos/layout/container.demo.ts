import type { Meta, DemoObj } from "../util/types";
import { axis } from "../util/axis";

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

export const Pads: Demo = {
  render: () =>
    axis(
      ["none", "sm", "md", "lg"],
      (v) =>
        frame(
          `sl-pad="${v}"`,
          `<div sl-container sl-pad="${v}" class="demo-frame">` +
            `<span data-demo>內容區塊</span>` +
            `</div>`
        ),
      true
    ),
};
