import type { Preview } from '@storybook/html-vite'
import { addons } from "storybook/preview-api";
import theme from "./theme";
import "./main.css";

// Apply toolbar theme to docs pages too — decorators only wrap stories.
// ready() waits for the real channel; getChannel() too early returns a mock.
addons.ready().then((channel) => {
  channel.on("globalsUpdated", ({ globals }) => {
    if (globals.theme) document.documentElement.dataset.theme = globals.theme;
  });
});

const preview: Preview = {
  parameters: {
    // docs chrome is themed independently from the manager — share the same theme
    docs: { theme, toc: { disable: true } },
    options: {
      storySort: {
        order: [
          "開始使用",
          "主題",
          "Core",
          ["說明", "*"],
          "Layout",
          ["說明", "*"],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme",
      toolbar: {
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "sakulime", title: "Sakulime" },
          { value: "terra", title: "Terra" },
        ],
      },
    },
  },
  initialGlobals: {
    theme: "sakulime",
  },
  decorators: [
    (story, context) => {
      document.documentElement.dataset.theme = context.globals.theme;
      return story();
    },
  ],
};

export default preview;
