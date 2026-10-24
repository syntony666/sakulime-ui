import { addons, types, useStorybookApi } from "storybook/manager-api";
import { IconButton } from "storybook/internal/components";
import { SidebarToggleIcon } from "@storybook/icons";
import { createElement } from "react";
import theme from "./theme";

// toolbar button to collapse the sidebar — buries in the settings
// menu by default, so pull it out next to the theme picker
const NavToggle = () => {
  const api = useStorybookApi();
  return createElement(
    IconButton,
    { onClick: () => api.toggleNav(), title: "Toggle sidebar" },
    createElement(SidebarToggleIcon),
  );
};

addons.register("sakulime/nav-toggle", () => {
  addons.add("sakulime/nav-toggle/tool", {
    type: types.TOOL,
    title: "Toggle sidebar",
    render: () => createElement(NavToggle),
  });
});

addons.setConfig({
  theme,
  toolbar: {
    zoom: { hidden: true },
    remount: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
    viewport: { hidden: true },
    backgrounds: { hidden: true },
    measureEnabled: { hidden: true },
    outline: { hidden: true },
    grid: { hidden: true },
  },
});
