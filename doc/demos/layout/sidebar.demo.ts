import type { Meta, DemoObj } from "../util/types";
import { axis, attr } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

const frame = (caption: string, inner: string) =>
  `<div class="demo-cell"><span class="demo-w" data-demo>${caption}</span>` +
  `<div style="margin-top: var(--sl-sm)">${inner}</div></div>`;

const sidebar = (attrs: string) =>
  `<div sl-sidebar${attrs}>` +
  `<aside sl-sidebar--rail>${cell("側邊欄")}</aside>` +
  `<div>${cell("主欄")}</div>` +
  `</div>`;

export const SidebarStart: Demo = {
  render: () =>
    `<div sl-sidebar>` +
    `<aside sl-sidebar--rail>${cell("側邊欄")}</aside>` +
    `<div>${cell("主欄")}</div>` +
    `</div>`,
};

export const SidebarEnd: Demo = {
  render: () =>
    `<div sl-sidebar>` +
    `<div>${cell("主欄")}</div>` +
    `<aside sl-sidebar--rail>${cell("側邊欄")}</aside>` +
    `</div>`,
};

export const SidebarBoth: Demo = {
  render: () =>
    `<div sl-sidebar>` +
    `<aside sl-sidebar--rail>${cell("左欄")}</aside>` +
    `<div>${cell("主欄")}</div>` +
    `<aside sl-sidebar--rail>${cell("右欄")}</aside>` +
    `</div>`,
};

export const Widths: Demo = {
  render: () =>
    axis(
      ["12rem", "16rem", "20rem"],
      (w) =>
        frame(
          `--sl-sidebar-w: ${w}`,
          sidebar(` style="--sl-sidebar-w: ${w}"`)
        ),
      true
    ),
};

export const Gaps: Demo = {
  render: () =>
    axis(
      ["-", "sm", "md", "lg"],
      (v) =>
        frame(
          v === "-" ? "未標示 → 預設 lg" : `sl-gap="${v}"`,
          sidebar(attr("sl-gap", v))
        ),
      true
    ),
};
