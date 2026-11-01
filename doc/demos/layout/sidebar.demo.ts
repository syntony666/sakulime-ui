import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

// the rails are dashed cells so the flex bounds stay visible; narrow the
// stage (or the window) and the content child wraps below the rail
export const SidebarStart: Demo = {
  render: () =>
    `<div sl-with-sidebar>` +
    `<aside sl-sidebar>${cell("側邊欄")}</aside>` +
    `<div>${cell("主欄")}</div>` +
    `</div>`,
};

export const SidebarEnd: Demo = {
  render: () =>
    `<div sl-with-sidebar>` +
    `<div>${cell("主欄")}</div>` +
    `<aside sl-sidebar>${cell("側邊欄")}</aside>` +
    `</div>`,
};

export const SidebarBoth: Demo = {
  render: () =>
    `<div sl-with-sidebar>` +
    `<aside sl-sidebar>${cell("左欄")}</aside>` +
    `<div>${cell("主欄")}</div>` +
    `<aside sl-sidebar>${cell("右欄")}</aside>` +
    `</div>`,
};

// sl-place="end" pins the rail last no matter where it sits in the
// markup — here the rail is first in source order and still lands right
export const SidebarMark: Demo = {
  render: () =>
    `<div sl-with-sidebar>` +
    `<aside sl-sidebar sl-place="end">${cell("標示 sl-place=end 的側邊欄")}</aside>` +
    `<div>${cell("主欄")}</div>` +
    `</div>`,
};
