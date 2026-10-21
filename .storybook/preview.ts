import type { Preview } from '@storybook/html-vite'
import "./main.css";

const preview: Preview = {
  parameters: {
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
          { value: "sakura", title: "Sakura" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  initialGlobals: {
    theme: "sakura",
  },
  decorators: [
    (story, context) => {
      document.documentElement.dataset.theme = context.globals.theme;
      return story();
    },
  ],
};

export default preview;
