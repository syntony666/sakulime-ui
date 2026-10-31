import type { Meta, DemoObj } from "../util/types";

const meta = {
} satisfies Meta;

export default meta;
type Demo = DemoObj;

// the dashed edge is each container's real bounds; .demo-w is stamped
// with the rendered px by Demo's measure prop
const box = (attr: string) =>
  `<div ${attr} class="demo-frame">${attr} <span class="demo-w"></span></div>`;

export const ContainerWidths: Demo = {
  render: () => ["sm", "md", "lg"].map((v) => box(`sl-container-${v}`)).join(""),
};
