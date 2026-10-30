import type { Meta, DemoObj } from "../util/types";
import { showMarkup } from "../util/docs-source";

const meta = {
  title: "Layout/Container 容器",
  // demos feed the md page; hide them from the sidebar
  tags: ["!dev"],
  parameters: {
    docs: {
      source: {
        type: "dynamic",
        transform: showMarkup,
      },
    },
  },
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
