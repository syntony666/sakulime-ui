import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import Demo from "./Demo.vue";
import Playground from "./Playground.vue";
import ThemeSwatches from "./ThemeSwatches.vue";
// self-hosted zh-TW face — Inter (bundled by VP) only covers Latin, and
// Firefox's per-platform zh fallback is inconsistent
import "@fontsource/noto-sans-tc/chinese-traditional-400.css";
import "@fontsource/noto-sans-tc/chinese-traditional-500.css";
import "@fontsource/noto-sans-tc/chinese-traditional-600.css";
import "@fontsource/noto-sans-tc/chinese-traditional-700.css";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("Demo", Demo);
    app.component("Playground", Playground);
    app.component("ThemeSwatches", ThemeSwatches);
  },
};
