import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import Demo from "./Demo.vue";
import Playground from "./Playground.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("Demo", Demo);
    app.component("Playground", Playground);
  },
};
