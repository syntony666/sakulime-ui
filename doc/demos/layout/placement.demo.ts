import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

// no layout parent needed — the mark works on any block-level child that
// is narrower than its container
export const FlowCenter: Demo = {
  render: () =>
    `<div sl-stack sl-flow>` +
    `<div sl-card style="width: 18rem" sl-center>sl-center 置中</div>` +
    `</div>`,
};

export const RowEnd: Demo = {
  render: () =>
    `<div sl-row>` +
    cell("一般子層") +
    cell("一般子層") +
    `<div class="demo-cell" sl-end>sl-end 推到行尾</div>` +
    `</div>`,
};

// inside a stack the mark doubles as alignment — the child shrinks back
// to its content width instead of stretching edge to edge
export const StackMarks: Demo = {
  render: () =>
    `<div sl-stack>` +
    cell("不標：拉滿") +
    `<div class="demo-cell" sl-center>sl-center</div>` +
    `<div class="demo-cell" sl-end>sl-end</div>` +
    `</div>`,
};

// block-axis marks in a tall stack — sl-middle centres vertically and
// pushes the others apart, sl-end stays pinned to the right edge
export const StackMiddleEnd: Demo = {
  render: () =>
    `<div sl-stack style="height: 12rem">` +
    cell("一般子層") +
    `<div class="demo-cell" sl-middle>sl-middle 垂直置中</div>` +
    `<div class="demo-cell" sl-end>sl-end 靠右</div>` +
    `</div>`,
};

// all three marks on grid items — the tracks keep their size and each
// item shrinks to content width, pinned to its own cell's edge
export const GridCell: Demo = {
  render: () =>
    `<div sl-grid sl-cols="3">` +
    `<div class="demo-cell" sl-start>sl-start</div>` +
    `<div class="demo-cell" sl-center>sl-center</div>` +
    `<div class="demo-cell" sl-end>sl-end</div>` +
    `</div>`,
};
