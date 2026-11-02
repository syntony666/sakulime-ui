import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

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
