import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: ["../packages/**/*.stories.@(js|ts)"],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/html-vite",
};
export default config;
