import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

// no layout parent needed — the mark works on any block-level child that
// is narrower than its container
export const FlowCenter: Demo = {
  render: () =>
    `<div sl-flow>` +
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

// same marks on a grid item — the track keeps its size and the item
// shrinks to content width, pinned inside its own cell
export const GridCell: Demo = {
  render: () =>
    `<div sl-grid sl-cols="2">` +
    `<div class="demo-cell" sl-center>sl-center</div>` +
    `<div class="demo-cell" sl-end>sl-end</div>` +
    `</div>`,
};
